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

## Analyse du code source (jury technique, hors notation design)

Ce volet est un **gate bloquant** : une anomalie critique empêche la publication, quelle que soit la note design.

### Rôle ajouté au jury
- **Relecteur code** : développeur back-end ou sécurité, distinct du juré front-end.

### Contrôles automatisés (outils libres)

| Contrôle | Outil libre | Seuil bloquant |
|---|---|---|
| Secrets dans le dépôt ou l'historique | gitleaks | Tout secret détecté |
| Dépendances vulnérables | npm audit ou osv-scanner | Vulnérabilité critique ou haute non corrigée |
| Failles de code (injection, XSS, CORS) | semgrep (règles open source) | Finding haut ou critique non justifié |
| Qualité et erreurs évidentes | eslint (ou équivalent) | Erreur bloquante, pas un avertissement de style |
| Scripts shell | shellcheck | Erreur de sécurité |

### Revue manuelle (relecteur code)

- **Entrées** : toute donnée venue d'un tiers (CV, champs de formulaire) est validée et bornée en taille.
- **Injection de prompt** : le texte utilisateur est traité comme donnée, jamais comme instruction ; la sortie du modèle est validée par schéma avant affichage.
- **Erreurs** : aucun détail technique renvoyé à l'utilisateur ; les erreurs sont journalisées sans contenu de CV.
- **Journaux** : aucune donnée personnelle dans les logs.
- **Secrets** : clés lues depuis l'environnement, jamais codées en dur ; fichiers de configuration en lecture restreinte.
- **Dépendances** : chaque bibliothèque externe est nécessaire, versionnée, et provient d'une source reconnue.
- **Tests** : les cas nominaux, les entrées vides, les entrées trop longues et les sorties malformées sont couverts.
- **Licence** : chaque dépendance a une licence compatible avec l'usage commercial prévu.

### Critères de décision technique

- **Passe** : aucun secret, aucune vulnérabilité critique ou haute non corrigée, revue manuelle sans point bloquant.
- **Bloque** : au moins un point bloquant. La publication est suspendue jusqu'à correction et nouvelle revue.

### Traçabilité

- Les résultats des outils sont joints à la PR, avec la version du dépôt analysé.
- Une revue de code ne vaut que pour le commit analysé : toute modification ultérieure demande une nouvelle revue.

## Volet réseau, serveur et flux (jury d'infrastructure, hors notation design)

Gate bloquant pour toute mise en production.

### Rôle ajouté : Directeur administration réseau (agent IA)

- Ports exposés sur le VPS : seuls 80 et 443 sont accessibles publiquement, SSH limité par clé et par liste d'adresses.
- Pare-feu : règles par défaut « tout refuser », exceptions documentées.
- Services : aucun service inutile en écoute, la configuration reste sauvegardée.
- Ressources : CPU, mémoire et swap sous des seuils définis (l'utilisation actuelle du swap doit être résolue avant publication).
- Processus : aucun processus orphelin ou zombie persistant.
- Mises à jour de sécurité automatiques, fail2ban sur SSH.

### Agence de cybersécurité (agents IA, rôles)

Les rôles ci-dessous sont des agents IA qui produisent une revue et des recommandations. Ils ne remplacent ni un audit qualifié, ni la décision humaine.

- **RSSI** : politique de sécurité, gestion des risques, priorisation.
- **DPO** : conformité RGPD, données traitées, durée de conservation, sous-traitants (dont le fournisseur d'IA).
- **Architecte sécurité** : segmentation, flux, principe de moindre privilège, Zero Trust.
- **Pentester** : tests sur le périmètre autorisé uniquement. Scans passifs par défaut, tests actifs seulement après validation humaine écrite.
- **Hacker éthique** : revue offensive sur le même périmètre. Aucune exploitation destructive, aucune donnée réelle extraite.
- **Analyste SOC** : journaux, détection d'anomalies, alertes, temps de réaction.
- **Directeur sécurité** : décision finale, à arbitrer par un humain.

### Périmètre autorisé (écrit)

- Le VPS de production et ses services.
- L'API d'analyse et son domaine.
- Le site publié sur GitHub Pages.
- Aucun tiers, aucun service qui ne nous appartient pas.

### Flux à documenter et vérifier

Chaque flux doit être minimal, chiffré et documenté :
1. Navigateur → GitHub Pages (HTTPS).
2. Navigateur → API d'analyse (HTTPS, CORS limité à l'origine autorisée).
3. API → fournisseur d'IA (HTTPS, clé côté serveur uniquement).
4. Serveur → journaux (sans contenu de CV).

### Optimisation

- Latence de l'API mesurée, objectif défini avec l'équipe.
- Consommation mémoire et CPU mesurée sous charge réelle.
- Limitation de débit (rate limit) validée par test.

### Règles d'exécution

- Les agents ne modifient jamais la production : ils produisent des recommandations.
- Chaque action est journalisée.
- Tout test actif est validé par un humain avant exécution.

### Limite à rappeler

Une revue par agents IA est un outil interne d'amélioration. Elle ne vaut ni audit externe qualifié, ni attestation de sécurité. Un audit par un prestataire qualifié reste requis avant la mise en ligne publique.

## Fiches des membres (rôles fictifs, pas de personnes réelles)

Chaque membre a une mission, des points précis à vérifier, un droit de veto éventuel et des limites. Le veto bloque la publication jusqu'à correction. Un veto ne peut être levé que par le président, après nouvelle revue du point concerné.

| Membre | Mission | Vérifie précisément | Veto | Limite |
|---|---|---|---|---|
| **Président (design)** | Arbitrer la note design et trancher les écarts | Cohérence globale, respect de la grille, compte rendu | Non | Ne peut pas lever un veto sécurité ou conformité |
| **Juré UX / accessibilité** | Juger le parcours et l'accessibilité | Parcours en moins de 30 s, contrastes, clavier, lecteur d'écran, mobile | Oui, si un contenu est inaccessible à un utilisateur | Ne juge pas le fond métier |
| **Juré front-end** | Juger la qualité technique de l'interface | États vides, erreurs, performance, rendu sur mobile réel | Non | Ne modifie pas le code de production |
| **Juré RH (recrutement)** | Vérifier la justesse des conseils par secteur | Conseils conformes aux normes du secteur, aucune promesse d'embauche, aucun critère discriminant | Oui, si un conseil est faux ou discriminant | Doit citer la source du référentiel utilisé |
| **Juré impact social** | Vérifier l'accès équitable et l'absence de nuisance | Public visé, biais selon âge, origine, genre, handicap, honnêteté du mode démo | Oui, si le produit peut nuire à un utilisateur | Ne décide pas de la stratégie commerciale |
| **Relecteur code** | Contrôler le code source | Résultats de gitleaks, npm audit, semgrep, eslint, shellcheck, revue manuelle | Oui, si un point critique reste ouvert | Ne réécrit pas le code, il le signale |
| **Directeur administration réseau (IA)** | Contrôler l'exposition réseau et le serveur | Ports, pare-feu, SSH, ressources, processus, mises à jour | Oui, si un service sensible est exposé | Ne modifie rien sans validation humaine |
| **RSSI (IA)** | Gouverner les risques de sécurité | Politique, risques priorisés, plan de correction | Oui, sur un risque critique non accepté | Ne valide pas seul un risque accepté |
| **DPO (IA)** | Contrôler la conformité des données | Données traitées, conservation, sous-traitants, droits des personnes | Oui, si un traitement n'est pas conforme | Ne donne pas d'avis juridique : il signale au juriste |
| **Architecte sécurité (IA)** | Contrôler la conception des flux | Flux minimaux et chiffrés, segmentation, moindre privilège | Oui, sur une architecture non sûre | Ne déploie rien |
| **Pentester (IA)** | Tester les vulnérabilités sur le périmètre autorisé | Surface exposée, failles connues, configuration | Oui, sur une faille exploitable | Scans passifs par défaut, tests actifs seulement après validation écrite |
| **Hacker éthique (IA)** | Revue offensive du périmètre autorisé | Chaînes d'attaque, injection de prompt, abus de l'API | Oui, sur une chaîne d'attaque réelle | Aucune exploitation destructive, aucune donnée réelle extraite |
| **Analyste SOC (IA)** | Contrôler la surveillance et la détection | Journaux présents, alertes, temps de réaction, absence de contenu de CV dans les journaux | Non | Ne supprime aucun journal |
| **Directeur sécurité (IA)** | Décider du passage en production | Synthèse des vetos, risques résiduels | Non | La décision finale reste humaine |

## Règles de fonctionnement du jury

- Un membre ne note pas un domaine hors de son rôle.
- Un veto est motivé par écrit, avec la référence du point concerné.
- Les membres IA produisent des recommandations. Aucun ne modifie la production.
- La composition est fictive et sert à structurer la revue. Elle ne doit pas être présentée comme une instance réelle ou une certification.

## Membres complémentaires (rôles fictifs)

Ajoutés pour couvrir les angles absents des fiches précédentes.

| Membre | Mission | Vérifie précisément | Veto | Limite |
|---|---|---|---|---|
| **Juriste (droit numérique et consommation)** | Contrôler le cadre légal de l'offre | CGU, CGV, politique de confidentialité, droit de rétractation, mentions légales | Oui, sur une clause illégale ou trompeuse | Signale le risque, ne rédige pas de contrat engageant |
| **Évaluateur de qualité IA** | Mesurer la fiabilité des sorties du modèle | Hallucinations, incohérences avec le CV, conseils contradictoires, réponses hors sujet, sur un jeu de CV fictifs | Oui, si le taux d'erreur dépasse le seuil défini par l'équipe | Ne juge pas le fond métier, ce rôle est celui du juré RH |
| **Testeur QA fonctionnel** | Vérifier que l'appli fait ce qu'elle annonce | Chaque parcours, chaque bouton, chaque format de fichier (PDF, TXT, HTML), cas limites, cas d'erreur | Oui, sur un parcours cassé | Ne corrige pas le code |
| **Chercheur UX (tests utilisateurs)** | Observer les vrais utilisateurs et leurs blocages | Points d'abandon, questions posées, incompréhensions, temps pour obtenir un premier résultat | Non | Ne décide pas seul des changements, il alimente le juré UX |
| **Expert accessibilité cognitive** | Vérifier que le résultat est compréhensible sans effort | Langage clair, phrases courtes, pas de jargon non expliqué, structure lisible, ton non anxiogène | Oui, si un résultat peut décourager ou désorienter | Ne traite pas l'accessibilité technique, ce rôle est celui du juré UX |
| **Analyste financier (rentabilité)** | Appliquer la porte go / no-go sur des chiffres mesurés | Coût par analyse, marge brute, point mort, coût par utilisateur gratuit | Oui, sur une formule non rentable | Ne prédit rien sans données mesurées |

## Règles des membres complémentaires

- Le juriste et l'analyste financier ne notent pas le design : leur rôle est un gate, pas une note.
- L'évaluateur de qualité IA n'utilise que des CV fictifs, jamais de vrais CV.
- Le chercheur UX ne reçoit que des données anonymisées de sessions consenties.
- Le veto de l'évaluateur IA et du QA est motivé par écrit, avec un exemple reproductible.

## Membres création visuelle (rôles fictifs)

| Membre | Mission | Vérifie précisément | Veto | Limite |
|---|---|---|---|---|
| **Graphiste (identité visuelle)** | Garantir la cohérence de la marque | Logo en petite taille et en monochrome, charte (2 polices, couleurs et tokens), visuels des réseaux, export vectoriel (SVG) et PNG | Oui, si une identité visuelle est incohérente ou contrefaite | Ne crée pas de nouvelle marque sans validation du fondateur |
| **Motion designer** | Juger les animations et les transitions | Durées (150 à 300 ms), absence de clignotement (au plus 3 flashs par seconde, WCAG 2.3.1), respect de `prefers-reduced-motion`, animation qui explique un état | Oui, si une animation peut provoquer une gêne ou un malaise | N'ajoute pas d'animation décorative en boucle |

## Règles des membres création visuelle

- Le graphiste et le motion designer notent dans la grille design, au même titre que le président et les jurés UX et front.
- Le veto du motion designer sur le clignotement est non négociable : c'est une règle de sécurité pour les personnes photosensibles.
- Les fichiers de marque sont versionnés dans le dépôt, avec leur date et leur source.

## Experts JavaScript (rôles fictifs)

| Membre | Mission | Vérifie précisément | Veto | Limite |
|---|---|---|---|---|
| **Expert JavaScript front-end** | Garantir un code navigateur fiable et maintenable | Gestion des événements, fuites mémoire, rendu sans `innerHTML` non échappé, états d'erreur, `async/await` sans exception non gérée, code mort | Oui, sur une injection XSS ou une fuite de données dans le DOM | Ne réécrit pas le code, il le signale |
| **Expert Node.js back-end** | Garantir le serveur d'analyse (sans dépendance, HTTP natif) | Validation des entrées, limite de taille du corps de requête, délais d'attente, arrêt propre, journaux sans contenu de CV, gestion des erreurs du fournisseur d'IA | Oui, sur un déni de service possible ou une fuite de donnée | Ne déploie pas en production |
| **Expert performance et chargement JavaScript** | Réduire le poids et le temps de chargement | Scripts externes chargés à la demande, **intégrité des scripts CDN (attribut `integrity` SRI)**, taille des ressources, bloquage du rendu | Oui, sur un script externe chargé sans contrôle d'intégrité | Ne sacrifie pas la lisibilité du code pour quelques millisecondes |

## Constat à traiter (Expert performance et chargement)

- `index.html` charge pdf.js depuis `cdnjs.cloudflare.com` sans attribut `integrity`. Si le CDN est compromis ou si la version change, le navigateur exécute du code non vérifié.
- Correction attendue : ajouter `integrity` (hash SRI) et `crossorigin="anonymous"` aux balises `<script>` externes, avec la version figée. Le hash doit être calculé à partir du fichier officiel de la version utilisée, pas recopié d'une source non vérifiée.

## Règles des experts JavaScript

- Ils relisent le code en même temps que le relecteur code, sans le remplacer.
- Toute dépendance JavaScript ajoutée est listée avec sa version, sa licence et son intégrité.
- Un veto sur un point XSS ou une fuite de donnée est motivé par une ligne de code précise.
