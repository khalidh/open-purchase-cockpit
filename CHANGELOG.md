# Changelog

Toutes les évolutions notables sont consignées ici selon Keep a Changelog et Semantic Versioning.

## [1.2.0] — 2026-08-18

### Added

- `AGENTS.md` racine imposant la boucle de validation et la Definition of Done.
- Matrice exigences→stories→tests→propriétaires et gouvernance de recette.
- Formulaires GitHub pour écarts de validation, évolutions et anomalies KPI.
- Tests Playwright desktop/mobile et axe-core avec archivage des preuves CI.
- Gate de métadonnées PR et audit bloquant des dépendances de production.
- Bouton de signalement GitHub prérempli dans l'application.

### Fixed

- Contraste des huit tuiles et noms accessibles des indicateurs.
- Stabilité des sélecteurs UI et filtres hors menus overflow pour les tests automatisés.

### Security

- Audit runtime sans vulnérabilité; risque transitif de l'outillage UI5 documenté sous DEP-001.

## [1.1.0] — 2026-08-18

### Added

- Dashboard responsive avec huit tuiles KPI colorées et navigables.
- Espaces Commandes, Demandes, Livraisons, Fournisseurs, Factures, Spend, Alertes et Assistant IA.
- Recherche, filtres, détails explicatifs, acquittement d'alerte et export CSV de démonstration.
- Données UI fictives `MOCK-S4`, fraîcheur et provenance visibles.
- Guide de recette navigateur en 12 scénarios et matrice d'exécution SDLC.
- Contrôles automatiques de présence des datasets, espaces et tuiles.

### Changed

- Runtime de développement aligné sur OpenUI5 1.120 pour une distribution ouverte.
- Build limité à l'application pour produire rapidement un artefact déployable.

## [1.0.0] — 2026-08-17

### Added

- Prototype SAPUI5 initial.
- Corpus complet de spécifications produit, SAP, architecture, API, sécurité, IA, tests et roadmap.
- Contrat OpenAPI et dataset de référence de 50 commandes.
