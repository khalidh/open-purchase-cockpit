## Besoin et solution

Issue liée :
Identifiants `FR/NFR/US/BT` :
Rôle métier propriétaire :

## Critères d'acceptation

```gherkin
Given
When
Then
```

## Preuves

- [ ] `npm test` passe
- [ ] `npm run build` passe
- [ ] `npm run test:e2e` passe, ou le job CI est identifié comme preuve
- [ ] Matrice `docs/traceability-matrix.md` mise à jour
- [ ] Test de non-régression ajouté pour un correctif
- [ ] OpenAPI, documentation, ADR et changelog mis à jour si nécessaire
- [ ] RBAC/périmètres, erreurs, accessibilité, i18n et observabilité vérifiés
- [ ] Aucun secret, donnée SAP réelle, capture sensible ou artefact propriétaire
- [ ] Risque, migration et rollback décrits si applicables

Liens vers rapports CI, captures/vidéos expurgées ou rapport de recette :

## Impact SAP / Clean Core

Édition/release et API/CDS released vérifiée, ou `Aucun impact SAP` :

## Risque et rollback

Risque :
Rollback :

## Décision métier

`PENDING | ACCEPTED | REJECTED`

Validateur et référence du rapport :
