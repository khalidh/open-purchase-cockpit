# Guide de recette navigateur

## Préparation

```bash
npm ci
npm test
npm run build
npm start
```

Ouvrir `http://localhost:8080/index.html`. Résolution recommandée : desktop 1440×900, tablette 768×1024 puis mobile 390×844. La date métier des données est le 17 août 2026.

## Parcours de smoke test

| ID | Action | Résultat attendu |
|---|---|---|
| BT-001 | Charger l'accueil | Shell bleu, statut Mock SAP, 8 tuiles, tendances mensuelles et catégories visibles |
| BT-002 | Cliquer « Commandes en retard » | Onglet Livraisons sélectionné, lignes retard/risque visibles |
| BT-003 | Cliquer « Commandes ouvertes » puis chercher `Fjord` | Une commande correspondante; ouverture affiche quantités, date, confirmation et source |
| BT-004 | Filtrer statut `En retard` | Seules les commandes `LATE` restent visibles |
| BT-005 | Ouvrir Demandes et activer « Non transformées » | Les demandes transformées disparaissent |
| BT-006 | Filtrer Livraisons avec « À risque » | Les commandes 4500000043 et 4500000045 sont visibles |
| BT-007 | Ouvrir un fournisseur | La synthèse affiche spend, OTIF, incidents et tendance prix |
| BT-008 | Activer « Factures bloquées » puis ouvrir une facture | Seules les factures bloquées; explication 3-way match et validation humaine obligatoire |
| BT-009 | Ouvrir Alertes et acquitter ALT-001 | Statut devient `ACKNOWLEDGED`, responsable Marie Dubois, bouton désactivé |
| BT-010 | Exporter les dépenses | Téléchargement `open-purchase-cockpit-spend-demo.csv` |
| BT-011 | Poser une question suggérée au Copilot | Réponse sourcée avec identifiants, fraîcheur et mention lecture seule |
| BT-012 | Recharger la page | État de démonstration réinitialisé, aucune donnée externe modifiée |

## Contrôles UX et accessibilité

- Naviguer au clavier dans les onglets, tuiles, tableaux et boutons; le focus doit rester visible.
- Zoomer à 200 % sans perte de contenu essentiel.
- Vérifier que les statuts ne reposent pas uniquement sur la couleur.
- Sur mobile, les colonnes secondaires passent en pop-in et les tuiles restent cliquables.
- Vérifier les états sans résultat en recherchant une valeur inexistante.

Le contrôle axe-core exclut uniquement deux clones invisibles générés par OpenUI5 1.120 (`.sapMSelectList` et `.sapMTBHiddenElement`). Les contrôles visibles restent analysés. Ces exclusions doivent être réévaluées et idéalement supprimées lors de chaque montée de version OpenUI5.

## Limites assumées de la démo

Le backend, OIDC, PostgreSQL, synchronisation SAP et moteur IA réel sont représentés par des données et actions locales. Ils disposent de contrats et spécifications dans `docs/`, mais leur implémentation production suit la roadmap. L'interface ne doit pas être utilisée avec des données réelles avant réalisation des contrôles de sécurité et connecteurs.
