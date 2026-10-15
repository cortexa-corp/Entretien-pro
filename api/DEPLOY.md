# Déploiement de l'API EntretienPro (VPS)

1. Copier le dossier : `/opt/entretienpro-api/server.mjs` (et ce dossier)
2. Créer la config : `cp entretienpro-api.env.example /etc/entretienpro-api.env`, puis y mettre la vraie clé. `chmod 600 /etc/entretienpro-api.env`
3. Installer le service : `cp entretienpro-api.service /etc/systemd/system/` puis `systemctl daemon-reload && systemctl enable --now entretienpro-api`
4. Vérifier : `systemctl status entretienpro-api` et `curl -s http://127.0.0.1:8790/autre` (doit renvoyer 404)
5. nginx : ajouter `limit_req_zone $binary_remote_addr zone=api:10m rate=10r/h;` dans le bloc `http {}` de nginx.conf, puis coller `nginx-snippet.conf` dans le bon `server {}`. Puis `nginx -t && systemctl reload nginx`
6. Tester depuis l'extérieur : `curl -s -X POST https://VOTRE_DOMAINE/api/analyze -H 'content-type: application/json' -d '{"cv":"test","poste":"dev"}'`

Note : la page GitHub Pages (public) ne peut pas appeler cette API en l'état tant que `index.html` n'utilise pas `fetch('/api/analyze')`. Ce changement est à faire séparément, après validation.
