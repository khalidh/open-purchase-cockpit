# Open Purchase Cockpit

Application open source de pilotage Purchase-to-Pay connectable à SAP S/4HANA selon les principes Clean Core. Le dépôt contient actuellement un prototype SAPUI5 freestyle et un corpus complet de spécifications permettant de construire le produit avec un SDLC traçable.

## Spécifications

Le point d'entrée est [docs/README.md](docs/README.md). Il référence la vision, les personas, le workflow P2P, les exigences, 24 user stories Gherkin, le mapping SAP, les architectures comparées, le modèle ER, OpenAPI, la sécurité, les règles/agents IA, les tests, le MVP, la roadmap et ses critères de sortie.

Artefacts directement exploitables :

- contrat API : `docs/openapi.yaml` ;
- données synthétiques : `examples/demo-data.json` (10 fournisseurs, 30 articles, 50 commandes) ;
- générateur reproductible : `examples/generate-demo-data.mjs` ;
- environnement local : `docker-compose.yml` ;
- gouvernance : `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`.

## Prérequis

- Node.js 20.11 ou supérieur
- npm 8 ou supérieur

## Démarrage

```bash
npm install
npm start
```

L'application est alors disponible sur `http://localhost:8080/index.html`.

## Commandes

```bash
npm run lint     # analyse statique
npm run build    # build optimisé dans dist/
npm run serve    # serveur sans ouverture du navigateur
npm run test:unit        # ouvre les tests QUnit
npm run test:integration # ouvre les tests Opa5
```

Tests manuels via le serveur local :

- unitaires : `/test/unit/unitTests.qunit.html`
- intégration : `/test/integration/opaTests.qunit.html`

## Structure

```text
webapp/
├── controller/      Contrôleurs MVC
├── css/             Styles de l'application
├── i18n/            Textes traduisibles
├── model/           Modèles, formatters et données mockées
├── test/            Tests QUnit et Opa5
├── view/            Vues XML
├── Component.js     Point d'entrée du composant UI5
├── index.html       Bootstrap local
└── manifest.json    Descripteur, modèles et routage
```

Pour brancher une API OData, remplacez le modèle JSON par une source de données et un modèle OData dans `webapp/manifest.json`.

## Statut

Le frontend est un prototype, pas encore l'implémentation du contrat cible. SAP reste le système d'enregistrement. Les noms exacts d'API/CDS doivent être vérifiés sur l'édition et la release S/4HANA ciblées avant développement d'un connecteur.

## Licence

Code et documentation sont proposés sous licence MIT. Les marques SAP et composants SAPUI5 restent soumis à leurs droits respectifs; OpenUI5 est recommandé pour une distribution entièrement ouverte.
