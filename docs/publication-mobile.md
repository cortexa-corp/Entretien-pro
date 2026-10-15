# Publication mobile (Play Store) — checklist

## Ce qui est prêt dans le dépôt (PR)
- `manifest.json` : nom, couleurs, icônes, mode plein écran.
- `sw.js` : cache de la coque du site uniquement. Les appels à l'API d'analyse ne sont jamais mis en cache.
- Icônes PNG 192 et 512 px, icône maskable 512 px, icône SVG.
- Balises de manifeste et d'icône dans `index.html`.

## Point bloquant : le domaine
Pour que l'application Android affiche le site sans barre d'adresse, Google exige un fichier `/.well-known/assetlinks.json` à la **racine** du domaine.
- `cortexa-corp.github.io/Entretien-pro/` ne suffit pas : la racine du domaine appartient à un autre dépôt.
- Il faut un **domaine propre** (par exemple `entretien-pro.fr`), que tu contrôles, pointant vers le site.

## Étapes à faire par toi
1. Acheter le domaine et le relier au site (GitHub Pages ou autre hébergement statique).
2. Créer un compte **Google Play Console** (frais uniques, vérification d'identité à faire toi-même). Vérifie le montant sur le site officiel.
3. Générer le paquet Android avec **Bubblewrap** (outil officiel Google), à partir du manifeste.
4. Publier le fichier `assetlinks.json` sur le domaine, avec l'empreinte de signature de l'application.
5. Préparer la fiche : description, captures d'écran réelles, icône 512 px, URL de la politique de confidentialité.
6. Remplir le formulaire « Sécurité des données » : ce qui est collecté (texte du CV, transmis pour l'analyse, non conservé), à décrire fidèlement.

## Règles à respecter
- Politique de confidentialité en ligne, complète, avec les informations de l'entreprise.
- Pas de publication tant que l'analyse réelle n'est pas fonctionnelle : une démo ne doit pas être présentée comme un produit fini.
- Aucune capture d'écran fausse, aucun faux témoignage dans la fiche.

## Vérifications avant soumission
- Test sur un téléphone Android réel, en Wi-Fi et en 4G.
- Test hors connexion : le site doit afficher un message, pas une page blanche.
- Les exigences et frais de Google Play évoluent : les confirmer sur le site officiel au moment de la soumission.
