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
});
