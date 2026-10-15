# Revue de design interne — EntretienPro

> Exercice interne et fictif. Les rôles ci-dessous sont des fonctions, pas des personnes réelles.
> Rien de ce document ne constitue un prix, une distinction ou une accréditation, et ne doit pas être présenté comme tel.

## Composition du jury (rôles)

- **Président** : designer produit senior
- **Juré 1** : expert UX, spécialiste de l'accessibilité
- **Juré 2** : développeur front-end
- **Juré 3** : expert RH (recrutement)
- **Juré 4** : spécialiste de l'impact social et de l'inclusion

## Grille de notation (1 à 5 par critère)

| Critère | Pondération | Question du jury |
|---|---|---|
| Clarté du parcours | 20 % | Un utilisateur sait-il quoi faire en moins de 30 secondes ? |
| Qualité visuelle | 15 % | Couleurs, polices et espaces sont-ils cohérents et lisibles ? |
| Accessibilité | 15 % | Contrastes, clavier, lecteur d'écran, mobile : tout fonctionne-t-il ? |
| Fiabilité technique | 15 % | Pas d'erreur visible, temps de réponse acceptable, sécurité de base ? |
| Honnêteté du produit | 15 % | Le mode démo, les limites et l'absence de promesse fausse sont-ils clairs ? |
| Utilité sociale | 20 % | Aide-t-elle réellement les personnes qui en ont besoin, sans discrimination ? |

Note pondérée = somme (note × pondération), ramenée sur 5.

## Déroulé

1. Chaque juré note seul, sans discuter.
2. Le président compile les notes et signale tout écart supérieur à 2 points.
3. La discussion ne porte que sur les écarts.
4. Le compte rendu écrit contient : trois forces, trois corrections prioritaires, et une décision parmi :
   - **Publier** : aucune correction bloquante, note pondérée ≥ 4 sur chaque critère.
   - **Corriger puis revoir** : au moins un critère sous 3, ou une correction bloquante.
   - **Ne pas publier** : problème de sécurité, de conformité ou de désinformation.

## Règles d'usage

- Les notes servent à corriger le produit. Elles ne sont jamais présentées comme une distinction.
- Les données utilisées pour la revue sont des CV fictifs ou anonymisés.
- Le compte rendu est versionné dans le dépôt, avec la date et la version de l'appli testée.

## Porte de rentabilité (go / no-go, hors notation)

Cette porte ne fait pas partie de la note design. Elle se vérifie avec des chiffres mesurés, jamais avec des estimations. Tant qu'elle n'est pas validée, l'appli ne se vend pas.

### Chiffres à mesurer (pas à supposer)

| Indicateur | Comment le mesurer | Valeur |
|---|---|---|
| Coût variable par analyse | Tokens entrée + sortie × tarif du modèle, relevé sur la console du fournisseur sur au moins 50 analyses réelles | à mesurer |
| Frais de paiement | Conditions du prestataire de paiement retenu | à mesurer |
| Coût d'hébergement | Facture réelle du VPS et des services, ramenée par mois | à mesurer |
| Taux de conversion gratuit → payant | Analyses gratuites et achats, sur une période définie | à mesurer |
| Coût d'acquisition client | Dépense marketing ÷ clients payants obtenus | à mesurer |
| Durée de vie client | Durée moyenne d'abonnement × revenu mensuel | à mesurer |

### Calculs

- **Coût par analyse** = (tokens entrée × tarif entrée + tokens sortie × tarif sortie) ÷ 1 000 000
- **Marge brute par analyse** = prix moyen encaissé − coût par analyse − frais de paiement
- **Point mort** = coûts fixes mensuels ÷ marge brute moyenne par client
- **Coût par utilisateur gratuit** = coût par analyse × analyses gratuites autorisées. Ce coût doit rester sous un plafond fixé par l'équipe.

### Critères de décision

- **Rentable** : marge brute positive sur chaque formule vendue, point mort atteignable avec le trafic mesuré, coût par utilisateur gratuit sous le plafond.
- **À revoir** : marge positive mais point mort hors de portée. Ajuster prix, limites gratuites ou coût du modèle.
- **Non rentable** : marge négative sur une formule. Ne pas la vendre en l'état.

### Points à valider avant toute vente

- Conditions générales de vente et politique de remboursement.
- Promesses commerciales : aucune garantie d'embauche, aucune comparaison chiffrée non sourcée.
- Pour un public de particuliers, la conformité des paiements et des abonnements (droit de la consommation) est à confirmer par un professionnel.
