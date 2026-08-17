# API REST interne

Base `/api/v1`, JSON UTF-8, dates RFC 3339, dates métier `YYYY-MM-DD`, montants en chaînes décimales avec devise ISO 4217. L'OpenAPI normative est `openapi.yaml`.

## Conventions

- Authentification Bearer OIDC; scopes `opc.read`, `opc.alerts.write`, `opc.admin`, `opc.ai.use`.
- Autorisation objet : rôle **et** périmètre `companyCodes`, `purchasingOrganizations`, `purchasingGroups`, éventuellement fournisseurs.
- Pagination curseur : `page[size]` (défaut 50, max 200), `page[after]`; réponse `meta.nextCursor`, `meta.hasMore`.
- Filtres répétés ou CSV documentés; tri `sort=deliveryDate,-netValue`; recherche `q` bornée à 200 caractères.
- `fields`/`include` en allowlist pour prévenir extraction excessive.
- `X-Correlation-ID` accepté/généré; `ETag` et `If-Match` pour mutation d'alerte/règle.
- Erreurs RFC 9457 `application/problem+json`: `type`, `title`, `status`, `detail`, `instance`, `code`, `correlationId`, `invalidParams`.
- `400` syntaxe, `401` non authentifié, `403` scope/périmètre, `404` absent ou masqué, `409` état, `412` ETag, `422` filtre valide mais incohérent, `429`, `503` source indisponible.

## Catalogue

| Méthode et chemin | Paramètres/filtres | Retour/pagination | Autorisation |
|---|---|---|---|
| `GET /dashboard` | période, companyCode, purchasingOrg, purchasingGroup, reportCurrency | KPI, séries, ventilations, fraîcheur | `opc.read`; agrégats scopés |
| `GET /purchase-orders` | q, status, supplierId, orgs, dates, min/maxValue, overdueOnly; page/sort | résumé PO/postes selon `view`; curseur | `opc.read` + scope PO |
| `GET /purchase-orders/{id}` | `include=items,deliveries,receipts,invoices,alerts` | détail et liens | idem; 404 si hors scope |
| `GET /purchase-requisitions` | q, status, converted, requester, orgs, dates | PR paginées | `opc.read` + scope PR |
| `GET /suppliers` | q, country, category, hasLateOrders | fournisseurs paginés et résumé | `opc.read` + intersection portefeuille/org |
| `GET /suppliers/{id}/performance` | from, to, companyCode, purchasingOrg | spend, OTIF, retards, incidents, prix | idem |
| `GET /deliveries` | status, dueFrom/dueTo, riskLevel, supplierId, poId | échéanciers paginés | `opc.read` + scope PO |
| `GET /deliveries/late` | mêmes filtres; alias `status=LATE` | retards + calcul/preuve | idem |
| `GET /invoices` | status, blocked, mismatchType, supplierId, poId, dates | factures/écarts paginés | `opc.read`, rôle invoice + scope company |
| `GET /invoices/blocked` | alias `blocked=true` | factures bloquées | idem |
| `GET /spend` | dimensions[], measures[], période, devise, filtres; page | cellules agrégées + taux/fraîcheur | `opc.read`, rôle analytics; seuil anti-inférence |
| `GET /alerts` | status, type, severity, owner, entity, dates | alertes paginées | `opc.read` + scope entité |
| `PATCH /alerts/{id}` | ETag; status, ownerId, comment, snoozeUntil | alerte mise à jour + ETag | `opc.alerts.write` + scope |
| `GET /exports/{id}` | id de job | état puis URL signée courte | créateur ou admin |
| `POST /exports` | type, filtres, format | `202` job | `opc.export` + scope |
| `GET /admin/connectors` | source | capabilities, santé, watermark | `opc.admin` |
| `POST /admin/rules/{id}/simulate` | version, période/échantillon | résultats sans mutation | `opc.admin` |
| `POST /ai/questions` | question, contexte/filtres | réponse, sources, avertissements | `opc.ai.use`; feature flag |

Toutes les listes retournent `meta.generatedAt`, `meta.dataFreshness`, `meta.appliedScope` (sans révéler de droits cachés) et `links`. Une limite de plage temporelle et un quota par utilisateur sont configurables. Les exports importants sont asynchrones, chiffrés, expirent et sont audités.

## Exemple

```json
{
  "data": [{
    "id": "4500000042",
    "supplier": {"id": "SUP-004", "name": "Nordic Bearings"},
    "companyCode": "1000",
    "purchasingOrganization": "1000",
    "orderDate": "2026-07-01",
    "deliveryDate": "2026-07-30",
    "orderedQuantity": "100.000",
    "receivedQuantity": "40.000",
    "remainingQuantity": "60.000",
    "remainingValue": {"amount": "7200.00", "currency": "EUR"},
    "status": "LATE"
  }],
  "meta": {
    "hasMore": false,
    "nextCursor": null,
    "generatedAt": "2026-08-17T10:00:00Z",
    "dataFreshness": "2026-08-17T09:55:00Z"
  }
}
```

## Compatibilité

Ajouts de champs optionnels sont rétrocompatibles. Suppression, renommage ou changement sémantique exige une nouvelle version majeure et une période de dépréciation publiée. Les consommateurs ignorent les champs inconnus. Les enums peuvent s'étendre; un état `UNKNOWN` est prévu.
