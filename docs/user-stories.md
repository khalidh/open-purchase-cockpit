# Backlog initial — User Stories et Gherkin

Priorités : `M` MVP, `V1`, `V2`, `AI`. Les critères communs imposent périmètre RBAC, fraîcheur, i18n et erreurs définis dans les NFR.

## M — MVP

### US-001 — Consulter les commandes en retard

En tant qu'acheteur, je veux afficher les commandes échues non entièrement reçues afin de relancer les fournisseurs.

```gherkin
Scenario: Une réception partielle après échéance est en retard
  Given une commande de 100 unités livrable le 2026-08-10 et 40 unités reçues
  And la date métier est le 2026-08-17
  When j'ouvre la vue "Commandes en retard"
  Then la commande apparaît avec un reliquat de 60 et la date utilisée pour le calcul
```

### US-002 — Voir les KPI du dashboard

En tant que responsable achats, je veux voir les KPI consolidés afin de piloter les priorités.

```gherkin
Scenario: Les KPI respectent les filtres globaux
  Given mon périmètre inclut la société 1000
  When je filtre le mois courant et la société 1000
  Then les tuiles et graphiques utilisent les mêmes filtres
  And l'heure de fraîcheur et la devise de reporting sont affichées
```

### US-003 — Rechercher une commande

En tant qu'acheteur, je veux rechercher par numéro, fournisseur ou article afin de trouver rapidement un dossier.

```gherkin
Scenario Outline: Recherche supportée
  Given des commandes visibles dans mon périmètre
  When je recherche par <critere>
  Then seuls les résultats correspondants et autorisés sont affichés
  Examples:
    | critere |
    | numéro 4500000042 |
    | fournisseur SUP-004 |
    | article MAT-0012 |
```

### US-004 — Consulter le détail d'une commande

En tant qu'approvisionneur, je veux voir postes, échéances, reçus, factures et alertes afin de comprendre son état.

```gherkin
Scenario: Navigation de la liste au détail
  Given une commande visible avec réception partielle
  When j'ouvre son détail
  Then les quantités commandée, reçue et restante sont cohérentes
  And chaque document source possède une référence traçable
```

### US-005 — Filtrer les demandes non transformées

En tant qu'acheteur, je veux isoler les PR sans PO afin de réduire le backlog.

```gherkin
Scenario: Filtre non transformée
  Given une PR approuvée sans référence de PO et une PR transformée
  When j'active "Non transformée"
  Then seule la PR sans référence de PO apparaît
```

### US-006 — Consulter une demande d'achat

En tant qu'acheteur, je veux voir son statut et ses postes afin d'identifier le prochain traitement.

```gherkin
Scenario: Statut d'approbation visible
  Given une PR en attente d'approbation
  When j'ouvre la PR
  Then son statut, demandeur, quantités, date souhaitée et éventuelles PO liées sont affichés
```

### US-007 — Voir le cockpit fournisseur

En tant que responsable fournisseur, je veux voir volume, commandes ouvertes, retards et OTIF afin de préparer une revue.

```gherkin
Scenario: Performance sur une période
  Given un fournisseur avec livraisons ponctuelles et tardives
  When je choisis une période
  Then l'OTIF affiche numérateur, dénominateur, tolérance et période
```

### US-008 — Détecter une absence de confirmation

En tant qu'approvisionneur, je veux identifier les échéances proches sans confirmation afin d'anticiper.

```gherkin
Scenario: Risque à trois jours ouvrés
  Given une livraison due dans 3 jours ouvrés et une confirmation requise absente
  When les règles sont évaluées
  Then une DeliveryRiskAlert unique est ouverte avec les preuves
```

### US-009 — Gérer une alerte

En tant qu'acheteur, je veux acquitter et m'assigner une alerte afin de coordonner son traitement.

```gherkin
Scenario: Acquittement concurrent protégé
  Given une alerte ouverte avec un ETag courant
  When je l'assigne et l'acquitte avec cet ETag
  Then son statut devient ACKNOWLEDGED et l'audit contient l'action
```

### US-010 — Accéder au document SAP

En tant qu'acheteur, je veux ouvrir le document dans l'application SAP autorisée afin d'effectuer une action métier.

```gherkin
Scenario: Deep-link contrôlé
  Given une commande provenant du système S4P
  When je sélectionne "Ouvrir dans SAP"
  Then une destination administrée construit le lien sans secret ni paramètre libre
```

### US-011 — Synchroniser les commandes SAP

En tant qu'administrateur, je veux une synchronisation incrémentale reprenable afin de maintenir le cockpit frais.

```gherkin
Scenario: Reprise après une erreur de page
  Given une synchronisation interrompue après un checkpoint
  When le worker redémarre
  Then il reprend au checkpoint sans dupliquer de commande
```

### US-012 — Développer sans SAP

En tant que développeur, je veux un Mock SAP Server avec scénarios déterministes afin de travailler localement.

```gherkin
Scenario: Scénario de retard local
  Given la stack locale et l'horloge mockée au 2026-08-17
  When l'API interroge le Mock SAP Server
  Then le dataset retourne au moins une PO normale, tardive, partielle et une erreur configurable
```

## V1 — Contrôle facture et analytique

### US-013 — Identifier les factures bloquées

En tant que contrôleur, je veux filtrer les factures bloquées afin de traiter les exceptions.

```gherkin
Scenario: Facture bloquée SAP
  Given une facture visible portant un indicateur de blocage
  When j'ouvre "Factures bloquées"
  Then elle apparaît avec motif disponible et lien vers PO/GR
```

### US-014 — Expliquer un écart de prix

En tant qu'acheteur, je veux comparer prix PO et facture normalisés afin de comprendre le blocage.

```gherkin
Scenario: Écart supérieur à tolérance
  Given un prix PO de 100 EUR et un prix facture de 106 EUR par même unité
  And la tolérance active est 5 pour cent
  When le rapprochement est calculé
  Then un écart de 6 pour cent est affiché avec la règle et sa version
```

### US-015 — Détecter un écart de quantité

En tant que contrôleur, je veux voir les factures dépassant les reçus afin d'éviter un paiement indu.

```gherkin
Scenario: Quantité facturée supérieure au reçu
  Given 80 unités reçues et 100 facturées avec tolérance zéro
  When les règles sont évaluées
  Then une QuantityMismatchAlert indique un écart de 20 unités
```

### US-016 — Analyser les dépenses

En tant que direction achats, je veux ventiler le spend par fournisseur et mois afin d'observer les tendances.

```gherkin
Scenario: Agrégation et conversion transparentes
  Given des PO en EUR et USD
  When je demande le spend mensuel en EUR
  Then les montants sont agrégés en EUR et la source/date des taux est disponible
```

### US-017 — Exporter une analyse

En tant que contrôleur, je veux exporter les lignes autorisées afin de poursuivre une analyse.

```gherkin
Scenario: Export asynchrone et scoppé
  Given un filtre société 1000 et un périmètre limité à 1000
  When je demande un export CSV
  Then un job audité est créé sans données d'une autre société
  And son lien signé expire
```

### US-018 — Enregistrer une variante de filtres

En tant qu'acheteur, je veux mémoriser mes filtres afin de retrouver ma vue quotidienne.

```gherkin
Scenario: Variante personnelle
  Given des filtres valides
  When j'enregistre une variante personnelle "Mes retards"
  Then elle est restaurée à ma prochaine session sans modifier les variantes d'autrui
```

### US-019 — Administrer une règle sans coder

En tant qu'administrateur, je veux simuler puis publier une règle déclarative afin d'adapter les seuils.

```gherkin
Scenario: Publication à quatre yeux
  Given une règle draft simulée sur un historique
  When son auteur tente seul de la publier
  Then la publication est refusée jusqu'à approbation d'un second administrateur autorisé
```

### US-020 — Restreindre par organisation d'achat

En tant que responsable sécurité, je veux appliquer le périmètre aux détails et agrégats afin d'éviter toute fuite.

```gherkin
Scenario: Document hors périmètre
  Given un utilisateur limité à l'organisation 1000
  And une PO appartient uniquement à l'organisation 2000
  When il appelle son URL de détail
  Then l'API retourne 404 et audite le refus sans révéler le document
```

## V2 et IA

### US-021 — Prioriser un risque de retard

En tant qu'approvisionneur, je veux un risque expliqué afin de concentrer mes relances.

```gherkin
Scenario: Prédiction explicable
  Given un modèle actif et des données suffisamment fraîches
  When un poste est classé à risque élevé
  Then le score, les principaux facteurs, la version et une incertitude sont affichés
  And aucune relance n'est envoyée automatiquement
```

### US-022 — Interroger le copilote

En tant qu'acheteur, je veux demander quelles commandes >50000 EUR ne sont pas reçues afin d'obtenir une liste sourcée.

```gherkin
Scenario: Réponse fondée sur les outils
  Given mon périmètre et la couche IA activée
  When je pose la question en langage naturel
  Then la réponse utilise le filtre valeur >50000 et reliquat >0
  And elle cite les commandes visibles, les filtres et la fraîcheur
```

### US-023 — Refuser une question hors périmètre

En tant que responsable sécurité, je veux que le copilote respecte les mêmes politiques afin d'empêcher l'exfiltration.

```gherkin
Scenario: Prompt demandant une autre société
  Given un utilisateur limité à la société 1000
  When il demande les fournisseurs confidentiels de la société 2000
  Then aucune donnée 2000 n'est retournée et le refus est audité
```

### US-024 — Diagnostiquer une facture bloquée

En tant que contrôleur, je veux une explication sourcée du 3-way match afin d'accélérer le diagnostic.

```gherkin
Scenario: Explication sans action autonome
  Given une facture bloquée pour prix et quantité
  When je demande pourquoi elle est bloquée
  Then la réponse distingue chaque écart et cite PO, GR, facture et tolérances
  And elle ne libère pas la facture
```
