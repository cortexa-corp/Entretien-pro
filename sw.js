// Service worker minimal : met en cache uniquement la coque du site.
// Les appels à l'API d'analyse ne sont jamais mis en cache (données personnelles).
const CACHE = 'entretien-pro-shell-v1';
const SHELL = ['./', './index.html', './mentions-legales.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Uniquement les fichiers du site, en GET. Tout le reste (API, CDN, polices) passe directement au réseau.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    // Pages : réseau d'abord, cache en secours hors connexion
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }
  // Ressources statiques : cache d'abord
  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
});
