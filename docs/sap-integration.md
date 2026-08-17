# Intégration SAP et Clean Core

## 1. Politique

Ordre de préférence : (1) API released SAP Business Accelerator Hub, (2) CDS View released et service OData publié, (3) événement released, (4) vue custom `ZC_` construite sur interfaces released, (5) RFC/BAPI released. L'accès direct EKKO/EKPO/etc. est une solution de dernier recours on-premise, isolée derrière un connecteur, en lecture seule et validée par l'équipe SAP; il est exclu pour S/4HANA Cloud Public Edition.

Les noms commerciaux et techniques SAP évoluent selon édition et release. Toute API/CDS citée ci-dessous est un **candidat à vérifier** dans SAP Business Accelerator Hub, View Browser/API Catalog et la liste des objets released du système cible. Le fit-to-standard consigne version, scope item, champs, pagination, delta, autorisations et limites.

## 2. Matrice fonctionnelle

| Fonction | Données | Objet/table de référence | API/CDS recommandée (à vérifier) | Alternative / justification |
|---|---|---|---|---|
| PR | entête/postes, statut, PO liée | EBAN | API Purchase Requisition (`API_PURCHASEREQ_PROCESS_SRV`) ou vues released `I_PurchaseRequisition*` | Vue custom sur interfaces released; EBAN direct seulement exception on-prem |
| PO | entête/postes/échéances | EKKO, EKPO, EKET | API Purchase Order (`API_PURCHASEORDER_PROCESS_SRV`) et vues `I_PurchaseOrderAPI01`, `I_PurchaseOrderItemAPI01` candidates | API read-only/ODP released selon release; tables directes non recommandées |
| Confirmation | confirmation/échéance | EKES, EKET | API/CDS de confirmation fournisseur released disponible dans la release cible | Extension custom side-by-side ou événement; vérifier couverture standard |
| Historique PO | GR/IR, montants | EKBE | CDS released d'historique PO ou APIs documents matière/factures | Composer GR et factures; EKBE en fallback contrôlé |
| Réception | document matériel, mouvement | MATDOC; MSEG historique/compatibilité | API Material Document (`API_MATERIAL_DOCUMENT_SRV`) / CDS released `I_MaterialDocumentItem*` | Ne pas modéliser S/4 comme ECC MSEG; vérifier MATDOC/release |
| Facture | entête/postes, blocage | RBKP, RSEG | API Supplier Invoice (`API_SUPPLIERINVOICE_PROCESS_SRV`) / `I_SupplierInvoice*` released | CDS analytique released; RBKP/RSEG fallback on-prem |
| Fournisseur | BP, société, achats | BUT000/LFA1/LFB1/LFM1 | Business Partner API (`API_BUSINESS_PARTNER`) et vues BP/Supplier released | Ne pas dépendre uniquement de LFA1 en S/4; BP est le BO maître |
| Article | base/plant/groupe | MARA, MARC | Product/Material API (`API_PRODUCT_SRV` ou successeur selon release), vues `I_Product*` | Vues released; accès MARA/MARC en dernier recours |
| Spend | valeur PO/facture, dimensions | EKKO/EKPO/RBKP/RSEG | CDS analytique released Procurement/Purchasing Spend ou composition APIs | Projection OPC si extraction autorisée; nom exact à valider |
| Organisation | société, org, groupe, plant | T001/T024E/T024/T001W | APIs/configuration ou CDS released d'organisations | Configuration OPC synchronisée et gouvernée |
| Utilisateurs/acheteurs | groupe acheteur, identité | T024/Business User | IdP + CDS/API business user released | Minimiser données personnelles; mapping administré |
| Workflow PR | approbation/statut | workflow/EBAN | APIs de workflow/situation ou champs released PR | Deep-link vers My Inbox; pas de réplication du workflow |

Les noms `API_*_SRV` ci-dessus sont des identifiants couramment rencontrés mais **ne constituent pas une garantie de disponibilité, de version ni de couverture de champs**. Pour OData V4 ou API successeur, privilégier la version released recommandée par la release cible.

## 3. Mapping canonique minimal

| Champ canonique | Sémantique SAP candidate | Normalisation |
|---|---|---|
| `purchaseOrder.id` | EKKO-EBELN / propriété API correspondante | chaîne, zéros conservés |
| `item.itemNo` | EKPO-EBELP | chaîne |
| `supplier.id` | EKKO-LIFNR / Business Partner | clé source + mandant |
| `companyCode` | EKKO-BUKRS | scope d'autorisation |
| `purchasingOrganization` | EKKO-EKORG | scope d'autorisation |
| `purchasingGroup` | EKKO-EKGRP | scope et Buyer mapping |
| `material.id` | EKPO-MATNR / Product | chaîne canonique sans perdre format source |
| `orderedQuantity` | EKPO-MENGE | décimal + unité ISO/SAP |
| `netPrice` | EKPO-NETPR, avec PEINH | prix normalisé par unité, origine conservée |
| `deliveryDate` | échéancier EKET-EINDT | date métier; timezone non applicable |
| `receivedQuantity` | mouvements GR non annulés | signe selon mouvement/reversal |
| `invoiceBlocked` | statut blocage RBKP/RSEG/API | booléen + motifs bruts autorisés |

## 4. Contrat de connecteur

Chaque adaptateur implémente `PurchaseRequisitionPort`, `PurchaseOrderPort`, `SupplierPort`, `MaterialDocumentPort`, `SupplierInvoicePort` et `MasterDataPort`. Il doit :

- exposer capabilities et version au démarrage;
- prendre `tenant/sourceSystem`, filtres, curseur et watermark;
- supporter pagination stable, reprise idempotente, timeouts, backoff avec jitter et circuit breaker;
- ne jamais loguer jeton, secret ou payload complet sensible;
- produire des erreurs canoniques (`SAP_AUTH`, `SAP_RATE_LIMIT`, `SAP_MAPPING`, `SAP_UNAVAILABLE`);
- conserver un échantillon expurgé/quarantaine pour erreur de mapping;
- mesurer appels, latence, throttling, fraîcheur, objets lus/rejetés;
- passer les contract tests communs contre Mock SAP et sandbox SAP cible.

## 5. Qualification par système cible

Checklist obligatoire avant sprint connecteur : édition (Public/Private/on-prem), release/FPS, scope items, protocole OData v2/v4, service activé, communication arrangement/destination, auth OAuth2 mTLS ou propagation, champs/associations, `$filter/$select/$expand/$orderby`, limite page, delta/last-change, ETag, timezone/devise/unités, rôles SAP, volumes, fenêtre batch et deep links.

## 6. Stratégie de synchronisation

- Bootstrap paginé par plage de dernière modification ou clé; point de reprise persisté.
- Delta via mécanisme API lorsqu'il existe; sinon high-water mark avec recouvrement temporel et déduplication.
- Upsert transactionnel par page, boîte de réception idempotente et dead-letter expurgée.
- Réconciliation nocturne d'un échantillon et complète périodique configurable.
- Suppression logique, retours et documents annulés réévaluent agrégats/alertes.
- SLO de fraîcheur visible; aucune donnée « temps réel » sans preuve de timestamp.
