# AGENTS.md — Open Purchase Cockpit

Ce fichier s'applique à l'ensemble du dépôt. Tout agent automatisé ou contributeur assisté par IA doit le lire avant de modifier un fichier.

## Mission

Construire un cockpit Purchase-to-Pay open source, testable sans SAP et intégrable à SAP S/4HANA selon Clean Core. SAP reste le système d'enregistrement. La sécurité, la traçabilité et l'explicabilité priment sur la rapidité d'implémentation.

## Sources normatives

1. Les ADR acceptés dans `docs/adr/`.
2. Les spécifications `docs/product-specification.md`, `docs/architecture.md`, `docs/sap-integration.md`, `docs/security.md` et `docs/api.md`.
3. Le contrat `docs/openapi.yaml`.
4. Les exigences et stories identifiées dans `docs/user-stories.md` et la matrice `docs/traceability-matrix.md`.
5. Le code et les exemples. Le prompt initial est historique, non normatif.

En cas de contradiction, ne pas improviser : documenter l'écart dans la PR et proposer un ADR ou une correction de spécification.

## Boucle de validation obligatoire

Toute modification fonctionnelle suit cette boucle :

1. **Relier** le changement à au moins une issue et un identifiant `FR-*`, `NFR-*`, `US-*` ou `BT-*`.
2. **Spécifier** le comportement attendu en Given/When/Then avant ou avec le code.
3. **Implémenter** le plus petit changement cohérent, sans élargir le périmètre.
4. **Tester** au niveau approprié : unité, contrat, intégration et/ou navigateur.
5. **Tracer** le test dans `docs/traceability-matrix.md` et joindre une preuve expurgée.
6. **Valider** avec le rôle métier propriétaire indiqué dans la matrice.
7. **Corriger** tout écart via une issue de validation et ajouter un test de non-régression.
8. **Publier** seulement après les quality gates CI et l'approbation requise.
9. **Mesurer** après livraison et réinjecter les observations dans le backlog.

Une case cochée sans preuve n'est pas une validation.

## Commandes minimales avant commit

```bash
npm ci
npm test
npm run build
npm run test:e2e
```

Si un test navigateur ne peut pas être exécuté localement, indiquer la raison dans la PR et laisser le job CI produire la preuve. Ne jamais annoncer un test comme réussi s'il n'a pas été exécuté.

## Règles de traçabilité

- Une nouvelle fonction nécessite un identifiant d'exigence/story, des critères d'acceptation et au moins un test.
- Un correctif nécessite une issue `VAL-*`/bug et un test qui échouait avant la correction.
- Une modification de règle métier consigne règle/version, exemples, tolérances, propriétaire et résultat de simulation.
- Une modification SAP consigne édition, release, API/CDS released vérifiée et solution alternative.
- Une modification d'API met à jour OpenAPI et les contract tests.
- Une décision structurante crée ou met à jour un ADR.
- Le changelog est mis à jour pour tout changement visible ou opérationnel.

## Données et sécurité

- Interdiction absolue de committer données SAP réelles, secrets, tokens, cookies, exports métier ou captures non expurgées.
- Utiliser uniquement `MOCK-S4` et les données synthétiques versionnées.
- Ne jamais recommander un accès direct aux tables SAP si une API/CDS released répond au besoin.
- Toute lecture applique rôle et périmètre; toute mutation sensible exige audit et validation humaine.
- L'IA reste sourcée, bornée par les droits et en lecture seule par défaut.
- Ne pas ajouter de télémétrie externe ou de dépendance SaaS sans ADR et validation sécurité.

## Qualité UI et accessibilité

- Conserver navigation clavier, focus visible, libellés accessibles et statut compréhensible sans couleur.
- Maintenir les parcours desktop, tablette et mobile.
- Ajouter tous les textes utilisateur à i18n; aucun texte métier en dur sans justification.
- Afficher source, date de fraîcheur et limites pour les données ou réponses IA.
- Les tuiles du dashboard doivent rester navigables et avoir un test associé.

## Git et revue

- Ne modifier que les fichiers nécessaires; préserver les changements utilisateur non liés.
- Ne pas committer `dist/`, secrets, fichiers locaux ou données de production.
- Utiliser des commits focalisés de type Conventional Commits.
- Deux approbations sont requises pour autorisations, connecteurs SAP, règles, migrations, sécurité ou changements de KPI.
- Une release exige un rapport dans `docs/validation/reports/`, une checklist de release et une décision `GO`, `GO_WITH_CONDITIONS` ou `NO_GO`.

## Definition of Done

Une tâche est terminée uniquement si : critères acceptés, tests passants, matrice à jour, sécurité/accessibilité/i18n considérées, documentation et changelog à jour, preuve disponible, CI verte et aucune anomalie bloquante ouverte.
