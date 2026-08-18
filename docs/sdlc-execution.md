# Exécution du SDLC — Démonstration 1.1.0

Ce document relie les étapes du cycle de vie aux artefacts réellement présents. Il distingue la démonstration navigateur livrée de l'implémentation production encore planifiée.

| Étape | Activités exécutées | Preuves | État démo |
|---|---|---|---|
| 1. Discovery | vision P2P, acteurs, douleurs, périmètre/hors périmètre | `product-specification.md`, prompt archivé | Terminé |
| 2. Requirements | FR/NFR, 24 stories Gherkin, critères MVP | `user-stories.md`, `quality-and-testing.md`, `roadmap.md` | Terminé |
| 3. Architecture | comparaison A/B/C, décision OSS, ER, SAP API-first, sécurité, IA | `architecture.md`, `sap-integration.md`, `security.md`, ADR | Terminé pour le cadrage |
| 4. UX/UI Design | architecture d'information, shell, tuiles KPI, tables, responsive | prototype OpenUI5, CSS, guide de recette | Terminé pour la démo |
| 5. Implementation | 9 espaces, filtres, détails, alertes, export, copilote simulé | `webapp/`, données `MOCK-S4` | Terminé pour la démo |
| 6. Verification | lint, validation specs/datasets/tuiles, build, smoke HTTP, scénarios OPA5/QUnit | `npm test`, `npm run build`, `browser-test-guide.md` | Automatisé hors exécution navigateur CI |
| 7. Security review | modèle de menace, read-only, données fictives, aucune URL SAP/secrets | `security.md`, `SECURITY.md` | Adapté à la démo |
| 8. Release | SemVer 1.1.0, changelog, commit, CI GitHub, artefact UI5 | `CHANGELOG.md`, workflow CI | Prêt |
| 9. Deployment | serveur UI5 local et Compose; instructions reproductibles | `README.md`, `docker-compose.yml` | Local uniquement |
| 10. Operations | SLI/SLO, logs/audit/runbooks spécifiés | `quality-and-testing.md`, `security.md` | À implémenter avec le backend |
| 11. Feedback | recette acheteur/approvisionneur/admin et collecte d'écarts | grille BT-001 à BT-012 | À réaliser par le testeur |

## Gates franchies pour la démo

- Données fictives uniquement et source/fraîcheur visibles.
- Huit tuiles KPI navigables et neuf espaces fonctionnels.
- Build OpenUI5 1.120 reproductible sans dépendance SAP.
- Lint et validateur de corpus/datasets réussis.
- Application et données accessibles via le serveur local.
- Aucune écriture SAP, aucun secret et aucune décision IA autonome.

## Gates restant avant une production SAP

- Valider édition/release S/4HANA et APIs released sur un sandbox.
- Implémenter backend, OIDC/RBAC/ABAC, PostgreSQL et connecteurs avec contract tests.
- Exécuter QUnit/OPA5/E2E dans des navigateurs CI supportés et produire les rapports.
- Réaliser tests charge, résilience, accessibilité WCAG, DAST et pentest.
- Valider les KPI avec les métiers, les tolérances avec Finance et la réconciliation avec SAP.
- Déployer staging, tester restauration/rollback, mettre en place SLO, alertes et runbooks.
- Obtenir l'acceptation formelle du pilote selon les critères MVP.

## Boucle de recette

Pour chaque anomalie navigateur : créer une issue avec identifiant `BT-xxx`, résultat observé, attendu, navigateur/résolution et capture sans donnée réelle. Relier la correction à une US/FR, ajouter le test de non-régression, repasser `npm test` et `npm run build`, puis consigner le changement dans le changelog.
