# Configuration GitHub requise

Les fichiers du dépôt mettent en œuvre la boucle, mais les règles suivantes doivent être activées dans **Settings → Rules → Rulesets** par un administrateur du dépôt.

## Ruleset `main-protection`

- Cible : branche par défaut `main`.
- Interdire les suppressions et force pushes.
- Exiger une pull request avant fusion.
- Exiger au moins 1 approbation; 2 pour fichiers couverts par règles/connecteurs/sécurité selon `AGENTS.md`.
- Révoquer les approbations après nouveau commit.
- Exiger la revue CODEOWNERS.
- Exiger la résolution des conversations.
- Exiger une branche à jour avant fusion.
- Status checks obligatoires : `pr-metadata`, `validate`, `browser-validation`.
- Autoriser uniquement squash merge ou rebase selon la gouvernance choisie.
- Appliquer la règle aux administrateurs, sauf procédure break-glass auditée.

## Fonctionnalités du dépôt

- Activer **Private vulnerability reporting**.
- Activer Dependabot alerts et security updates.
- Activer secret scanning et push protection si disponibles.
- Conserver Actions en permissions `read` par défaut; élargir par job uniquement.
- Créer un environnement `staging` puis `production` avec approbateurs distincts lorsque le déploiement existe.

## Labels minimaux

`validation`, `needs-triage`, `enhancement`, `needs-discovery`, `data-quality`, `BLOCKER`, `MAJOR`, `MINOR`, `COSMETIC`, `security`, `sap-connector`, `rules`, `accessibility`.

## Vérification après configuration

Ouvrir une PR factice sans identifiant : `pr-metadata` doit échouer. Ajouter `US-001` : il doit passer. Faire échouer un test E2E : la fusion doit rester impossible et l'artefact `browser-validation-evidence` doit être téléchargeable.

Cette configuration n'est pas entièrement déclarable par Git sans application GitHub dédiée; son activation et sa date doivent être consignées dans le premier rapport de validation administrateur.
