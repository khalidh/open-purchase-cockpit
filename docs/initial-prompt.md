# Prompt initial — Open Purchase Cockpit

> Archive de la demande initiale à l'origine du corpus de spécifications.
>
> Date d'archivage : 2026-08-17  
> Langue : français  
> Statut : référence historique non normative — les documents de spécification et ADR portent les décisions courantes.

---

# Rôle

Tu es un **architecte SAP senior**, spécialisé dans :

* SAP S/4HANA
* SAP MM / Purchasing
* SAP Fiori / SAPUI5
* ABAP et CDS Views
* OData / REST
* SAP BTP
* Clean Core
* architectures Open Source
* UX pour applications métier
* intelligence artificielle et agents IA appliqués aux processus SAP.

Ta mission est de concevoir les **spécifications complètes d'une application open source appelée "Open Purchase Cockpit"**.

# 1. Vision du produit

Open Purchase Cockpit est une application web open source permettant aux acheteurs et responsables achats de disposer d'un cockpit moderne donnant une vue consolidée du processus Purchase-to-Pay provenant de SAP.

L'application doit pouvoir fonctionner comme une couche complémentaire à SAP et ne doit pas nécessiter de modification importante du cœur SAP.

L'architecture doit respecter autant que possible les principes **SAP Clean Core**.

# 2. Objectifs

Le cockpit doit permettre de :

1. visualiser les demandes d'achat ;
2. visualiser les commandes d'achat ;
3. suivre les commandes ouvertes ;
4. identifier les commandes en retard ;
5. suivre les réceptions de marchandises ;
6. suivre les factures fournisseurs ;
7. détecter les écarts commande/réception/facture ;
8. suivre les fournisseurs ;
9. analyser les dépenses ;
10. détecter automatiquement les anomalies et situations nécessitant une intervention.

# 3. Utilisateurs

Identifier les besoins spécifiques des rôles suivants :

* acheteur ;
* responsable achats ;
* approvisionneur ;
* contrôleur de gestion ;
* responsable fournisseur ;
* administrateur ;
* direction achats.

Pour chaque rôle, préciser :

* objectifs ;
* informations nécessaires ;
* actions possibles ;
* indicateurs importants ;
* droits nécessaires.

# 4. Processus métier

Décrire le workflow Purchase-to-Pay :

Besoin d'achat  
→ Demande d'achat  
→ Approbation  
→ Commande d'achat  
→ Envoi fournisseur  
→ Confirmation fournisseur  
→ Réception  
→ Facture  
→ rapprochement commande/réception/facture  
→ paiement.

Identifier les points où Open Purchase Cockpit intervient.

Produire également un diagramme Mermaid du processus.

# 5. Fonctionnalités

Définir précisément les fonctionnalités des modules suivants.

## Dashboard

Afficher notamment :

* montant total des achats ;
* commandes ouvertes ;
* commandes en retard ;
* commandes sans confirmation ;
* livraisons attendues ;
* factures bloquées ;
* dépenses par fournisseur ;
* dépenses par catégorie ;
* évolution mensuelle des achats.

## Purchase Requisitions

Permettre :

* recherche ;
* filtrage ;
* consultation ;
* regroupement ;
* suivi du statut ;
* identification des demandes non transformées en commande.

## Purchase Orders

Afficher notamment :

* numéro de commande ;
* fournisseur ;
* société ;
* organisation d'achat ;
* groupe acheteur ;
* article ;
* quantité ;
* prix ;
* devise ;
* date de commande ;
* date de livraison ;
* quantité commandée ;
* quantité reçue ;
* quantité restante ;
* valeur restante ;
* statut.

## Supplier Cockpit

Afficher :

* informations fournisseur ;
* volume d'achat ;
* commandes ouvertes ;
* commandes en retard ;
* respect des délais ;
* incidents ;
* évolution des prix ;
* principaux articles achetés.

## Delivery Monitoring

Détecter :

* livraisons en retard ;
* livraisons partielles ;
* commandes sans réception ;
* commandes dont la date de livraison approche ;
* commandes présentant un risque de retard.

## Invoice Monitoring

Identifier :

* factures bloquées ;
* différences de quantité ;
* différences de prix ;
* commandes sans facture ;
* factures sans réception correspondante.

## Spend Analytics

Analyser les achats selon :

* fournisseur ;
* article ;
* catégorie ;
* société ;
* organisation d'achat ;
* groupe acheteur ;
* centre de coût ;
* période.

# 6. Sources SAP

Identifier les objets SAP nécessaires.

Pour chaque fonctionnalité, proposer les sources pertinentes parmi :

* tables SAP ;
* CDS Views standard ;
* Business Objects SAP ;
* APIs SAP S/4HANA ;
* services OData.

Examiner notamment les objets liés aux tables :

* EKKO
* EKPO
* EBAN
* EKBE
* LFA1
* LFB1
* MARA
* MARC
* MSEG / MATDOC
* RBKP
* RSEG.

Ne pas recommander un accès direct aux tables si une API ou une CDS View standard appropriée permet de respecter davantage le principe Clean Core.

Créer une matrice :

| Fonction | Données | Objet SAP | API/CDS recommandée | Alternative |
| -------- | ------- | --------- | ------------------- | ----------- |

# 7. Architecture

Proposer au minimum trois architectures.

### Architecture A — SAP native

SAP S/4HANA  
→ CDS Views  
→ OData  
→ SAPUI5 / Fiori

### Architecture B — Open Source

SAP S/4HANA  
→ APIs/OData  
→ Backend open source  
→ PostgreSQL/cache éventuel  
→ SAPUI5/OpenUI5

Le backend peut par exemple utiliser :

* Java / Spring Boot ;
* Node.js / TypeScript ;
* Python / FastAPI.

### Architecture C — SAP BTP

SAP S/4HANA  
→ APIs/CDS  
→ SAP BTP  
→ CAP  
→ SAPUI5/Fiori.

Comparer les trois solutions selon :

* complexité ;
* coût ;
* performance ;
* sécurité ;
* maintenabilité ;
* Clean Core ;
* facilité de déploiement ;
* potentiel open source.

# 8. Architecture recommandée

Choisir ensuite l'architecture la plus pertinente pour construire une véritable application **Open Source SAP Purchase Cockpit**.

Produire un diagramme Mermaid montrant :

SAP S/4HANA  
→ SAP API Layer  
→ Open Purchase Cockpit Backend  
→ Data/Cache Layer  
→ SAPUI5/OpenUI5 Frontend  
→ utilisateur.

# 9. Interface SAPUI5

Définir les écrans principaux.

Exemple :

```text
Home Dashboard
├── Purchase Requisitions
├── Purchase Orders
├── Deliveries
├── Suppliers
├── Invoices
├── Spend Analytics
├── Alerts
└── AI Assistant
```

Pour chaque écran, fournir :

* objectif ;
* utilisateur cible ;
* informations affichées ;
* filtres ;
* tableaux ;
* graphiques ;
* actions ;
* navigation ;
* composants SAPUI5/Fiori recommandés.

# 10. APIs internes

Définir une API REST interne.

Exemples :

```text
GET /api/purchase-orders

GET /api/purchase-orders/{id}

GET /api/purchase-requisitions

GET /api/suppliers

GET /api/suppliers/{id}/performance

GET /api/deliveries/late

GET /api/invoices/blocked

GET /api/spend

GET /api/alerts
```

Pour chaque endpoint préciser :

* paramètres ;
* filtres ;
* données retournées ;
* pagination ;
* gestion des erreurs ;
* autorisations.

# 11. Modèle de données

Créer un modèle métier simplifié comprenant notamment :

PurchaseRequisition

PurchaseOrder

PurchaseOrderItem

Supplier

Material

GoodsReceipt

Invoice

InvoiceItem

Delivery

Buyer

PurchasingOrganization

Alert.

Fournir :

* relations ;
* cardinalités ;
* principaux attributs ;
* diagramme Mermaid ER.

# 12. Intelligence artificielle

Ajouter une couche IA optionnelle.

Proposer des agents spécialisés :

**Purchase Monitoring Agent**

Surveille les commandes ouvertes.

**Late Delivery Agent**

Détecte les risques de retard.

**Supplier Risk Agent**

Analyse les anomalies fournisseurs.

**Invoice Matching Agent**

Analyse le rapprochement :

PO ↔ Goods Receipt ↔ Invoice.

**Spend Analysis Agent**

Analyse les dépenses.

**Procurement Copilot**

Permet des questions en langage naturel comme :

"Quelles commandes sont en retard ?"

"Quels fournisseurs ont le plus de problèmes de livraison ?"

"Quelles commandes supérieures à 50 000 € n'ont pas encore été réceptionnées ?"

"Pourquoi cette facture est-elle bloquée ?"

Préciser pour chaque agent :

* entrées ;
* outils/APIs utilisés ;
* règles métier ;
* sorties ;
* actions autorisées ;
* validation humaine nécessaire.

# 13. Alertes

Définir un moteur de règles permettant par exemple :

```text
IF delivery_date < today
AND received_quantity < ordered_quantity
THEN LateDeliveryAlert

IF invoice_price != purchase_order_price
THEN PriceMismatchAlert

IF invoice_quantity > received_quantity
THEN QuantityMismatchAlert

IF delivery_date - today < 3 days
AND confirmation_missing
THEN DeliveryRiskAlert
```

Prévoir la possibilité d'ajouter des règles sans modifier le cœur de l'application.

# 14. Sécurité

Définir :

* authentification ;
* autorisation ;
* RBAC ;
* OAuth2/OIDC ;
* communication sécurisée avec SAP ;
* gestion des secrets ;
* audit ;
* logs ;
* restrictions par société et organisation d'achat.

# 15. Open Source

Proposer une structure GitHub :

```text
open-purchase-cockpit/
├── frontend/
├── backend/
├── sap-connectors/
├── domain/
├── rules/
├── agents/
├── analytics/
├── docs/
├── tests/
├── docker/
└── examples/
```

Ajouter :

* README.md
* CONTRIBUTING.md
* LICENSE
* SECURITY.md
* docker-compose.yml
* architecture.md
* API documentation.

Proposer une licence open source appropriée et expliquer le choix.

# 16. MVP

Définir un MVP réalisable comprenant prioritairement :

1. Dashboard
2. Purchase Orders
3. Purchase Requisitions
4. Supplier View
5. Late Delivery Monitoring
6. Alerts
7. connexion SAP.

Séparer clairement :

MVP  
→ Version 1  
→ Version 2  
→ fonctionnalités IA avancées.

# 17. User Stories

Produire au minimum 20 User Stories.

Format :

**US-001 — Consulter les commandes en retard**

En tant qu'acheteur,  
je veux afficher les commandes dont la date de livraison est dépassée,  
afin d'identifier les fournisseurs à relancer.

Critères d'acceptation :

Given...

When...

Then...

Utiliser Gherkin pour les critères d'acceptation.

# 18. Exigences non fonctionnelles

Définir les exigences concernant :

* performances ;
* disponibilité ;
* scalabilité ;
* sécurité ;
* observabilité ;
* auditabilité ;
* accessibilité ;
* internationalisation ;
* responsive design ;
* tests ;
* qualité du code.

Associer autant que possible des critères mesurables.

# 19. Tests

Définir la stratégie :

* tests unitaires ;
* tests API ;
* tests SAP connector ;
* tests UI ;
* tests d'intégration ;
* tests end-to-end ;
* tests de sécurité ;
* tests de performance.

Prévoir également un **Mock SAP Server** permettant de développer Open Purchase Cockpit sans disposer d'un système SAP.

# 20. Données de démonstration

Créer un jeu de données fictif contenant :

* 10 fournisseurs ;
* 30 articles ;
* 50 commandes ;
* commandes normales ;
* commandes en retard ;
* livraisons partielles ;
* différences de prix ;
* factures bloquées.

Le dataset doit permettre de démontrer toutes les fonctions principales du cockpit.

# 21. Livrables attendus

Produire les spécifications sous la forme suivante :

1. Executive Summary
2. Vision produit
3. Personas
4. Processus Purchase-to-Pay
5. Exigences fonctionnelles
6. Exigences non fonctionnelles
7. User Stories + Gherkin
8. Modèle de données
9. Mapping SAP
10. APIs SAP utilisées
11. Architecture
12. Architecture SAPUI5
13. API REST interne
14. Sécurité
15. Alertes
16. Architecture IA/Agents
17. Stratégie de tests
18. Architecture GitHub
19. MVP
20. Roadmap
21. Backlog initial
22. Critères permettant de considérer le MVP comme terminé.

Lorsque plusieurs solutions SAP sont possibles, indique clairement :

**Option recommandée / Alternative / Justification.**

Ne suppose pas qu'une API SAP existe : lorsqu'un nom exact d'API ou de CDS View doit être donné, indique s'il doit être vérifié dans la version de SAP S/4HANA ciblée.
