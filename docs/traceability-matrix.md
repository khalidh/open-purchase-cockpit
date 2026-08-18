# Matrice de traçabilité et validation

Cette matrice est un quality gate. Toute nouvelle capacité doit ajouter ou mettre à jour une ligne. `Auto` désigne la preuve automatisée; `Métier` le rôle qui prononce l'acceptation.

| Exigence | Story | Écran / contrat | Test automatisé | Recette navigateur | Propriétaire métier | État |
|---|---|---|---|---|---|---|
| FR-DAS-001..004 | US-002 | Dashboard | E2E-001, validation 8 tuiles | BT-001, BT-002 | Responsable achats | READY_FOR_UAT |
| FR-PO-001..004 | US-001,003,004,010 | Commandes | E2E-002, OPA-001 | BT-003, BT-004 | Acheteur | READY_FOR_UAT |
| FR-PR-001..004 | US-005,006 | Demandes | E2E-003 | BT-005 | Acheteur | READY_FOR_UAT |
| FR-DEL-001..003 | US-008 | Livraisons | E2E-004 | BT-002, BT-006 | Approvisionneur | READY_FOR_UAT |
| FR-SUP-001..003 | US-007 | Fournisseurs | E2E-005 | BT-007 | Responsable fournisseur | READY_FOR_UAT |
| FR-INV-001..003 | US-013,014,015 | Factures | E2E-006 | BT-008 | Contrôleur de gestion | READY_FOR_UAT |
| FR-SPD-001..003 | US-016,017 | Spend | E2E-007 | BT-010 | Contrôleur de gestion | READY_FOR_UAT |
| FR-ALT-001..002 | US-008,009 | Alertes | E2E-008 | BT-009 | Acheteur | READY_FOR_UAT |
| AI optionnelle | US-022,023,024 | Assistant | E2E-009 | BT-011 | Acheteur + Sécurité | READY_FOR_UAT |
| NFR-ACC-001 | transversal | Tous écrans | E2E-A11Y-001 PASS | contrôles clavier/zoom à signer | Référent accessibilité | READY_FOR_UAT |
| NFR-RWD-001 | transversal | Tous écrans | E2E-RWD-001 PASS desktop/mobile | mobile 390×844 à signer | Product Owner | READY_FOR_UAT |
| NFR-SEC-001 | US-020,023 | API/IA | futur test ABAC/BOLA | non applicable démo locale | Sécurité | SPECIFIED |

## États autorisés

`SPECIFIED → IMPLEMENTED → READY_FOR_UAT → ACCEPTED` ou `REJECTED`. `PARTIAL` signifie qu'une preuve automatique ou métier manque. Seul le propriétaire métier peut passer une ligne à `ACCEPTED`; la référence du rapport doit alors être ajoutée.
