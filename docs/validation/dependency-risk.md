# Registre du risque dépendances

## DEP-001 — Vulnérabilités transitives de l'outillage UI5

- Date d'analyse : 2026-08-18
- Portée : dépendances de développement uniquement
- Composant racine : `@ui5/cli 4.0.62`
- Chaîne : `@ui5/project → pacote → sigstore → @sigstore/*`
- Résultat production : `npm audit --omit=dev` — 0 vulnérabilité
- Résultat complet : 7 alertes transitives (3 moderate, 4 high)
- Exposition runtime : aucune; ces paquets ne sont pas inclus dans l'application UI5 construite
- Mesure compensatoire : lockfile, CI isolée, permissions GitHub minimales, audit production bloquant, Dependabot hebdomadaire
- Décision : accepter temporairement pour la démo; ne pas exécuter `npm audit fix --force`
- Justification : la proposition automatique installe `@ui5/cli 3.0.0`, changement majeur/régression potentielle
- Propriétaire : mainteneur technique
- Réexamen : à chaque mise à jour UI5 CLI, au plus tard 2026-09-18

Ce risque doit être fermé dès qu'une version UI5 CLI compatible corrige la chaîne. Toute exposition de ces dépendances dans un artefact runtime annule l'acceptation.
