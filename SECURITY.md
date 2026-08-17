# Politique de sécurité

## Signaler une vulnérabilité

Ne créez pas d'issue publique. Utilisez la fonctionnalité **Private vulnerability reporting** du dépôt GitHub. Si elle n'est pas activée, contactez en privé les mainteneurs indiqués dans le profil du projet avant toute divulgation. Un canal dédié devra être publié avant la première release.

Incluez version/commit, impact, prérequis, étapes minimales, preuve expurgée et suggestion éventuelle. N'utilisez jamais de données SAP réelles et ne testez pas une installation tierce sans autorisation.

Objectifs de réponse après mise en place de l'équipe : accusé sous 3 jours ouvrés, triage sous 7 jours, puis calendrier communiqué selon sévérité. Une divulgation coordonnée sera convenue avec le rapporteur.

## Versions supportées

Avant `1.0`, seule la dernière version publiée reçoit les correctifs. Après `1.0`, la matrice sera maintenue ici. Le prototype actuel ne doit pas être exposé à Internet ni connecté à une production SAP.

## Périmètre

API, frontend, connecteurs, règles, images et chaîne CI sont concernés. Les produits SAP, IdP, runtimes cloud et dépendances tierces doivent être signalés à leurs éditeurs, avec notification à OPC si l'intégration est affectée.

La conception sécurité normative est dans `docs/security.md`.
