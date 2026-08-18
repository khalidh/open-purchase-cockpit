sap.ui.define([
  "open/purchase/cockpit/model/formatter"
], function (formatter) {
  "use strict";

  QUnit.module("Formatter de statut");

  QUnit.test("retourne l'état UI5 correspondant", function (assert) {
    assert.strictEqual(formatter.statusState("APPROVED"), "Success");
    assert.strictEqual(formatter.statusState("PENDING"), "Warning");
    assert.strictEqual(formatter.statusState("REJECTED"), "Error");
    assert.strictEqual(formatter.statusState("OTHER"), "None");
  });

  QUnit.test("formate un montant compact pour les graphiques", function (assert) {
    assert.ok(formatter.compactAmount(142500).includes("142"), "Le montant est converti en milliers");
    assert.ok(formatter.compactAmount(142500).includes("k€"), "L'unité est explicite");
  });
});
