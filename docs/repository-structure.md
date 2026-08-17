# Architecture du dépôt cible

```text
open-purchase-cockpit/
├── frontend/              OpenUI5/SAPUI5, tests QUnit/OPA5/Playwright
├── backend/               API REST, IAM, orchestration applicative
├── sap-connectors/        ports, adaptateurs par release, contract tests
├── domain/                modèle et services métier purs
├── rules/                 DSL, schémas, règles et simulations
├── agents/                gateway/outils/evals IA optionnels
├── analytics/             projections, KPI, devises
├── mock-sap/              faux services SAP déterministes
├── docs/                  spécifications, ADR et runbooks
├── tests/                 fixtures et tests cross-composants/E2E/perf
├── docker/                images et configuration locale
├── examples/              dataset et exemples d'intégration
├── .github/               CI, templates, CODEOWNERS, Dependabot
├── docker-compose.yml
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

Le prototype actuel conserve `webapp/` à la racine pour éviter un déplacement prématuré. Le passage vers `frontend/` se fera dans une PR dédiée avec historique Git préservé. Les répertoires applicatifs ne seront créés que lors de leur walking skeleton afin d'éviter des coquilles vides.

## Licence

**Option recommandée : MIT**, simple, permissive et familière à l'écosystème JavaScript; elle facilite adoption et intégration commerciale. **Alternative : Apache-2.0** si la gouvernance souhaite une concession de brevet explicite et des obligations de NOTICE, au prix d'un texte et d'une conformité légèrement plus lourds. Les marques SAP, APIs, SDK et bibliothèques SAP gardent leurs propres conditions; la licence du dépôt ne les relicencie pas.

## Gouvernance proposée

SemVer, Conventional Commits recommandés, releases signées, changelog généré, ADR pour décisions structurantes, CODEOWNERS par composant et mainteneurs multiples. Une DCO peut précéder un éventuel CLA. Les connecteurs indiquent explicitement éditions/releases supportées et n'embarquent aucun artefact propriétaire.
