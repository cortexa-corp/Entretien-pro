// EntretienPro — API d'analyse de CV (côté serveur)
// Aucune dépendance npm. Node >= 18. La clé API ne quitte jamais le serveur.
import http from 'node:http';

const PORT = Number(process.env.PORT || 8790);
const API_KEY = process.env.ANTHROPIC_API_KEY || '';
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '');
const MODEL = process.env.MODEL || 'claude-haiku-5-5';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://cortexa-corp.github.io';
const MAX_CHARS = 20000;          // taille max du CV reçu
const RATE_LIMIT = 10;            // requêtes / IP / heure
const hits = new Map();           // ip -> [timestamps]

function clientIp(req) {
  // derrière nginx : X-Forwarded-For ; on prend la dernière adresse ajoutée par le proxy
  const xff = (req.headers['x-forwarded-for'] || '').split(',').map(s => s.trim()).filter(Boolean);
  return xff.at(-1) || req.socket.remoteAddress || 'unknown';
}

function rateOk(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 3600_000);
  if (arr.length >= RATE_LIMIT) { hits.set(ip, arr); return false; }
  arr.push(now); hits.set(ip, arr);
  return true;
}

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too_large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const SYSTEM = `Tu es un agent DRH expérimenté. Analyse le CV fourni pour le poste indiqué.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format :
{"scores":{"global":0-10,"presentation":0-10,"adequation":0-10,"experience":0-10},
 "verdict_global":"string","points_forts":["string"],"points_faibles":["string"],
 "questions":[{"question":"string","objectif":"string","bonne_reponse":"string"}]}
Ne fais jamais de promesse d'embauche. Ne déduis aucune donnée sensible (âge, origine, santé, situation familiale).`;

function extractJson(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('no_json');
  return JSON.parse(m[0]);
}

function validate(r) {
  const n = v => typeof v === 'number' && v >= 0 && v <= 10;
  if (!r || !r.scores || !n(r.scores.global)) throw new Error('bad_shape');
  if (!Array.isArray(r.points_forts) || !Array.isArray(r.questions)) throw new Error('bad_shape');
  return r;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.url !== '/api/analyze' || req.method !== 'POST') return send(res, 404, { error: 'not_found' });
  if (!API_KEY) return send(res, 503, { error: 'server_not_configured' });

  const ip = clientIp(req);
  if (!rateOk(ip)) return send(res, 429, { error: 'rate_limited', message: 'Trop de demandes, réessayez plus tard.' });

  let data;
  try {
    const raw = await readBody(req, MAX_CHARS + 2000);
    data = JSON.parse(raw);
  } catch (e) {
    return send(res, 400, { error: e.message === 'too_large' ? 'too_large' : 'bad_request' });
  }
  const cv = String(data.cv || '').slice(0, MAX_CHARS).trim();
  const poste = String(data.poste || 'poste non spécifié').slice(0, 200);
  if (!cv) return send(res, 400, { error: 'empty_cv' });

  try {
    const upstream = await fetch(`${BASE_URL}/v1/messages`, {
      method: 'POST',
      headers: { 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: MODEL, max_tokens: 2000, system: SYSTEM,
        messages: [{ role: 'user', content: `Poste : ${poste}\n\nCV :\n${cv}` }],
      }),
    });
    if (!upstream.ok) { console.error('upstream', upstream.status); return send(res, 502, { error: 'upstream_error' }); }
    const j = await upstream.json();
    const text = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const result = validate(extractJson(text));
    return send(res, 200, result);
  } catch (e) {
    console.error('analyze_failed', e.message);
    return send(res, 502, { error: 'analysis_failed' });
  }
});

server.listen(PORT, '127.0.0.1', () => console.log(`EntretienPro API sur 127.0.0.1:${PORT}`));
