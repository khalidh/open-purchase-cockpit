# Contribuer

Merci de contribuer à Open Purchase Cockpit. Les discussions et pull requests peuvent être en français ou en anglais; le code, les identifiants API et les messages de commit sont de préférence en anglais.

## Avant une contribution

1. Ouvrir une issue décrivant problème, utilisateur, valeur et risque pour tout changement notable.
2. Pour une architecture ou dépendance structurante, proposer un ADR dans `docs/adr/`.
3. Ne jamais joindre données SAP réelles, secrets, captures contenant des données métier ou artefacts propriétaires.
4. Vérifier qu'une API/CDS SAP est released dans l'édition/release ciblée; documenter le résultat sans présenter une hypothèse comme un fait.

## Développement

```bash
npm ci
npm run lint
npm run build
```

Régénérez les données avec `node examples/generate-demo-data.mjs`. Une modification fonctionnelle doit relier une `US-xxx`/`FR-xxx`, adapter OpenAPI et ajouter les tests appropriés.

## Pull request

- changement focalisé et relisible, issue/story liée;
- tests, sécurité, accessibilité, i18n, observabilité et migrations considérés;
- aucun secret ni donnée réelle; scans locaux passés;
- documentation/ADR/changelog adaptés;
- preuve de test et stratégie de rollback pour un changement risqué.

Les règles, politiques d'autorisation, migrations et connecteurs SAP demandent deux approbations. En contribuant, vous acceptez de publier votre contribution sous la licence MIT du projet et certifiez être autorisé à le faire.

## Conduite

Soyez respectueux, précis et accueillant. Le harcèlement, la discrimination et la divulgation de données confidentielles ne sont pas tolérés. Les mainteneurs peuvent modérer les échanges et retirer tout contenu dangereux.
