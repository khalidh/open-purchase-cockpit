# Dataset de démonstration

Le fichier `examples/demo-data.json` est généré de façon déterministe par `examples/generate-demo-data.mjs`. Il contient exactement 10 fournisseurs, 30 articles, 50 commandes à deux postes, les réceptions et factures associées. La date métier fixe est `2026-08-17`, ce qui rend les démonstrations et tests reproductibles.

## Couverture

| Scénario | Convention de génération |
|---|---|
| Normal/reçu/facturé | commandes dont l'index n'entre dans aucun cas d'exception |
| En retard | index multiple de 5, date passée et reliquat |
| Livraison partielle | index multiple de 7, réception à 50 % |
| Sans confirmation / risque | index multiple de 6, date proche et confirmation absente |
| Sans réception | index multiple de 9 |
| Écart de prix | index multiple de 8, facture à +8 % |
| Écart de quantité | index multiple de 10, facturé > reçu |
| Facture bloquée | tout écart prix/quantité et index multiple de 11 |

Le dataset est synthétique : noms, identifiants et montants ne représentent aucune personne ou entreprise réelle. Les assertions dans `quality` permettent de vérifier les comptes et la présence des scénarios.

## Régénération

```bash
node examples/generate-demo-data.mjs
```

Ne changez pas l'algorithme sans adapter les tests et la documentation. Pour simuler le temps, le Mock SAP utilise `meta.businessDate`, pas l'horloge réelle.
