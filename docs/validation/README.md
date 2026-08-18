# Gouvernance de validation

## Cadence

- À chaque PR : validation automatique et revue de la traçabilité.
- À chaque release candidate : campagne navigateur complète et rapport signé.
- Après release : revue des métriques et anomalies à J+7 puis lors de chaque cycle produit.

## Rôles

| Rôle | Responsabilité |
|---|---|
| Auteur | critères, implémentation, tests, preuve et matrice |
| Reviewer technique | qualité, architecture, sécurité et reproductibilité |
| Propriétaire métier | exécute/valide la recette de son périmètre |
| Product Owner | arbitre sévérité, risque accepté et décision de release |
| Release Manager | vérifie gates, changelog, version, rollback et rapport |

## Sévérité

- `BLOCKER` : fuite de données, sécurité critique, perte/corruption, application inutilisable; release interdite.
- `MAJOR` : parcours principal ou KPI incorrect sans contournement acceptable; release normalement interdite.
- `MINOR` : défaut circonscrit avec contournement; décision PO documentée.
- `COSMETIC` : présentation sans perte fonctionnelle/accessibilité.

## Preuves acceptables

Rapport CI lié, résultat de test versionné, capture/vidéo expurgée, export synthétique comparé à l'attendu, ou signature métier dans un rapport. Une déclaration sans artefact n'est pas une preuve.

Les rapports finalisés sont copiés dans `docs/validation/reports/` à partir du modèle. Les brouillons locaux ne doivent contenir aucune donnée réelle.

La protection de branche et les fonctionnalités de sécurité à activer sur GitHub sont décrites dans `github-configuration.md`.
