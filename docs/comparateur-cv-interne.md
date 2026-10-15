# Comparateur de CV interne (fonctionnalité)

## Objectif

Donner au candidat plusieurs points de vue sur son CV, sans envoyer ses données à un tiers :
- une note par critère, selon la grille du secteur choisi ;
- une explication pour chaque critère, avec la phrase du CV qui la justifie ;
- la comparaison entre la version actuelle et une version corrigée du même CV.

## Principe

Le comparateur est **interne** : une seule évaluation, fondée sur la grille du jury et sur le référentiel du secteur. Aucun CV n'est transmis à un site tiers.

## Fonctionnement

1. Le candidat choisit le secteur et le poste.
2. Le serveur charge la grille du secteur (critères, poids, seuils).
3. L'évaluateur note chaque critère, de 0 à 5, avec la phrase justificative.
4. La note globale est calculée par la formule pondérée de la grille, pas par le modèle.
5. Si le candidat fournit une version corrigée, le comparateur affiche l'écart critère par critère.

## Garanties

- **Pas de stockage du CV** : évaluation en mémoire, rien n'est conservé après la réponse.
- **Pas de tiers** : aucun appel à un site externe d'évaluation.
- **Note reproductible** : le calcul global est déterministe ; la partie texte du modèle est vérifiée par schéma.
- **Mode démo signalé** tant que l'API n'est pas branchée.

## Limites affichées à l'utilisateur

- La note est une aide à la préparation, pas une prédiction d'embauche.
- Elle ne mesure pas la qualité de l'entreprise visée ni la motivation du candidat.
- Elle n'est comparable à aucune autre note publique.

## Validation avant mise en production

- Jeu de CV fictifs couvrant plusieurs secteurs, avec une note attendue par un relecteur humain.
- Écart toléré entre la note de l'appli et la note du relecteur : à fixer avec l'équipe avant publication.
- Test de reproductibilité : même CV, même grille, écart de note nul sur la partie calculée.
- Revue par le juriste (mention de limite) et par le juré RH (justesse des critères).

## Hors périmètre

- Envoi du CV à des sites tiers, même avec accord, tant qu'un contrat de sous-traitance n'existe pas.
- Automatisation de soumissions sur des sites qui interdisent les accès automatisés.
