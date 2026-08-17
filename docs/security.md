# Sécurité, confidentialité et audit

## Modèle de confiance

Le navigateur n'accède jamais directement à SAP ni à la base. L'API est le point d'application des politiques. Tout réseau est non fiable; TLS 1.2+ (1.3 préféré), validation stricte des certificats et mTLS vers SAP lorsque possible. Le MVP est mono-tenant logique par déploiement; tout futur multi-tenant exige isolation par `tenant_id`, tests anti-fuite et clés séparées.

## Authentification et sessions

- OAuth 2.1 / OpenID Connect, Authorization Code + PKCE; MFA imposée selon politique IdP.
- Tokens courts (≤15 min recommandé), audience/issuer/signature/temps validés; refresh token protégé par BFF ou cookie `HttpOnly Secure SameSite` si ce mode est retenu.
- Aucun token dans localStorage, URL ou logs. CSRF protégé pour sessions cookie; CORS en allowlist.
- Comptes techniques distincts par environnement et source; OAuth client credentials ou mTLS selon API SAP. Aucun mot de passe SAP utilisateur stocké.

## RBAC et périmètres

| Permission | Buyer | Manager | Planner | Controller | Supplier Mgr | Admin | Direction |
|---|---:|---:|---:|---:|---:|---:|---:|
| `opc.read.procurement` | ✓ | ✓ | ✓ | ✓ | ✓ | —* | ✓ |
| `opc.read.invoice` | limité | ✓ | limité | ✓ | limité | —* | agrégé |
| `opc.alerts.write` | ✓ | ✓ | ✓ | limité | ✓ | —* | — |
| `opc.export` | ✓ | ✓ | ✓ | ✓ | ✓ | —* | ✓ |
| `opc.rules.admin` | — | — | — | — | — | ✓ | — |
| `opc.connectors.admin` | — | — | — | — | — | ✓ | — |
| `opc.ai.use` | option | option | option | option | option | — | option |

`—*` : un administrateur technique n'obtient pas de lecture métier par son rôle admin. Les politiques ABAC intersectent société, organisation d'achat, groupe acheteur, plant et portefeuille fournisseur. Elles sont appliquées dans chaque query/repository, jamais seulement dans l'UI. Les agrégats appliquent un seuil minimal pour limiter l'inférence.

## Secrets et données

- Coffre de secrets externe, rotation, accès workload identity; fichiers `.env` réels interdits au dépôt.
- Chiffrement au repos des bases, sauvegardes et exports; URL d'export signée et courte.
- Minimisation : pas de coordonnées bancaires, données fiscales détaillées, pièces jointes facture ou PII sans besoin approuvé.
- Rétention configurable : projections selon besoin métier; audit ≥1 an recommandé à valider; exports ≤24 h; prompts IA selon politique et désactivés par défaut.
- Masquage/pseudonymisation en non-production; dataset de démonstration entièrement fictif.

## Audit

Événements immuables : login/échec, refus d'accès, consultation sensible configurable, export, mutation d'alerte, publication/simulation de règle, changement de rôle/périmètre, action admin, appel IA/outils, synchronisation et accès secret. Chaque événement contient UTC, acteur/service, action, ressource, résultat, périmètre, correlation ID et avant/après expurgé; jamais token ou payload sensible.

## Menaces et contrôles

| Menace | Contrôles clés |
|---|---|
| IDOR/fuite inter-société | policy query-level, tests matrice scopes, 404 masqué |
| Injection OData/SQL | allowlist filtres/tri/expand, requêtes paramétrées, limites |
| SSRF via connecteur | destinations administrées, egress allowlist, pas d'URL utilisateur |
| Vol de token/secret | PKCE/BFF, CSP, coffre, rotation, redaction logs |
| Supply chain | lockfiles, SBOM, signatures/provenance, scan dépendances/images |
| Prompt injection | retrieval autorisé, séparation instructions/données, outils allowlist, validation humaine |
| Déni de service/extraction | quotas, pagination max, timeouts, circuit breaker, exports async |
| Règle malveillante | DSL non Turing-complet, sandbox, revue à quatre yeux, simulation et rollback |

## Réponse aux incidents

`SECURITY.md` définit le canal privé. Runbooks : secret compromis, fuite de données, vulnérabilité dépendance, indisponibilité SAP et résultat IA dangereux. Préserver preuves, révoquer/rotater, contenir, notifier selon obligations applicables, corriger puis réaliser une rétrospective sans blâme.
