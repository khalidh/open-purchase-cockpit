# MVP, roadmap et backlog de réalisation

## Découpage produit

| Phase | Capacités | Critère de passage |
|---|---|---|
| Inception (2–4 sem.) | fit-to-standard SAP, ADR, UX research, threat model, data dictionary, sandbox | APIs/champs et périmètres validés sur la release cible |
| MVP (env. 12–16 sem., à estimer) | connexion SAP read-only, dashboard, PO, PR, fournisseur, retards, alertes, Mock SAP | critères MVP ci-dessous, pilote accepté |
| Version 1 | GR/factures/3-way match, spend, exports, variantes, règles administrables | tolérances finance validées et audit opérationnel |
| Version 2 | confirmations avancées, incidents, événements, multi-source, optimisation/performance | SLO production et connecteurs additionnels qualifiés |
| IA avancée | copilote sourcé, risque retard/fournisseur, agents d'analyse | évaluation, conformité, human-in-loop et kill switch approuvés |

La durée est une hypothèse de planification, pas un engagement; elle dépend surtout de l'accès SAP, des APIs released et de la qualité des données.

## Backlog initial par epic

| Epic | Stories | Principaux travaux | Dépendances |
|---|---|---|---|
| E01 Foundation | US-012 | monorepo, containers, CI, OpenAPI, mock, observabilité | aucune |
| E02 Identity | US-020 | OIDC, scopes, policies org, audit | IdP et matrice rôles |
| E03 SAP connector | US-011 | discovery, PO/PR/supplier ports, delta, mapping | sandbox SAP/release |
| E04 Purchase Orders | US-001,003,004,010 | projection, calculs, liste/détail/deep-link | E02/E03 |
| E05 Requisitions | US-005,006 | projection, conversion PR→PO | E02/E03 |
| E06 Dashboard | US-002 | KPI/dimensions, drill-down | E04/E05 |
| E07 Suppliers | US-007 | agrégats OTIF, fiche | E04 |
| E08 Alerts | US-008,009,019 | DSL, worker, lifecycle, UI | E04 |
| E09 Invoices | US-013–015,024 | GR/IR ports, 3-way match | validation finance |
| E10 Analytics | US-016–018 | cube/projections, taux, exports | data governance |
| E11 AI | US-021–024 | gateway, tools, evals, guardrails | données stables + sécurité |

## Ordre MVP suggéré

1. Walking skeleton : UI → API → projection → Mock, OIDC simulé, télémétrie.
2. AuthN/AuthZ et politiques de périmètre avec tests antagonistes.
3. Connecteur SAP PO puis PR/fournisseur, ingestion idempotente et fraîcheur.
4. Liste/détail PO, PR, deep links et UX erreurs/empty/loading.
5. Dashboard et Supplier View avec définitions KPI approuvées.
6. Règles retard/confirmation, cycle d'alerte et audit.
7. Performance, accessibilité, sécurité, reprise, documentation et pilote.

## Critères permettant de considérer le MVP terminé

- US-001 à US-012 acceptées sur staging et traçables aux tests; aucun défaut bloquant/majeur ouvert.
- Au moins une release S/4HANA cible qualifiée avec APIs released documentées; aucun accès table direct en chemin nominal.
- PO, PR et fournisseurs synchronisés de façon idempotente; réconciliation et reprise démontrées; fraîcheur cible mesurée sur 5 jours ouvrés.
- Dashboard, listes et détails donnent les mêmes chiffres sur un échantillon métier signé; règles retard/risque explicables et sans doublon.
- RBAC et périmètres société/org/groupe validés par tests négatifs; audit export/mutation/admin complet.
- Objectifs NFR MVP atteints lors d'un test représentatif; restauration et mode SAP indisponible testés.
- WCAG AA contrôlée, FR/EN, Chrome/Edge supportés et responsive à 360 px.
- OpenAPI, runbooks, mapping SAP, threat model, SBOM, licences et guides installation/contribution à jour.
- Scan sans Critical/High non accepté et pentest/DAST sans finding bloquant.
- Déploiement reproductible, rollback validé, monitoring/alerting opérationnels et support formé.
- Pilote acheteur + approvisionneur + administrateur donne son acceptation formelle.

## Risques principaux

| Risque | Réduction |
|---|---|
| API SAP absente/incomplète selon release | spike fit-to-standard, capability matrix, vue custom released en alternative |
| Qualité confirmation/échéance | afficher source, règles configurables, mesure de complétude |
| KPI contestés | dictionnaire signé et jeux de réconciliation SAP |
| Charge SAP | delta, projection, quotas, fenêtres et tests de charge |
| Fuite organisationnelle | policy-as-code et tests BOLA systématiques |
| Surpromesse IA | IA après données stables, sources, abstention et humain obligatoire |
