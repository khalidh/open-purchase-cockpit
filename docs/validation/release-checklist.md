# Checklist de release

- [ ] Version SemVer et changelog à jour
- [ ] Commit/tag correspondant au rapport de validation
- [ ] `npm ci`, `npm test`, `npm run build`, `npm run test:e2e` réussis
- [ ] Matrice de traçabilité sans ligne de scope en `REJECTED` ou `PARTIAL`
- [ ] Rapport de validation présent et décision `GO` ou `GO_WITH_CONDITIONS`
- [ ] Aucun défaut `BLOCKER`; aucun `MAJOR` sans décision formelle
- [ ] SBOM/scans/licences vérifiés
- [ ] Configuration, secrets et périmètres validés pour l'environnement
- [ ] Sauvegarde/migration/rollback testés si applicables
- [ ] Monitoring, alertes et runbooks prêts
- [ ] Notes de release publiées et parties prenantes informées
