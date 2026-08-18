sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/actions/Press",
  "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, Press, PropertyStrictEquals) {
  "use strict";

  Opa5.createPageObjects({
    onTheDashboard: {
      actions: {
        iOpenTheOrdersTile: function () {
          return this.waitFor({
            id: "ordersTile",
            viewName: "Dashboard",
            actions: new Press(),
            errorMessage: "La tuile des commandes est introuvable"
          });
        }
      },
      assertions: {
        iShouldSeeTheTileDashboard: function () {
          return this.waitFor({
            id: "lateOrdersTile",
            viewName: "Dashboard",
            matchers: new PropertyStrictEquals({ name: "visible", value: true }),
            success: function () {
              Opa5.assert.ok(true, "Le dashboard et ses tuiles sont visibles");
            }
          });
        },
        iShouldSeeThePurchaseOrders: function () {
          return this.waitFor({
            id: "ordersTable",
            viewName: "Dashboard",
            matchers: new PropertyStrictEquals({ name: "visible", value: true }),
            success: function (oTable) {
              Opa5.assert.ok(oTable.getItems().length > 0, "La liste des commandes contient des données");
            }
          });
        }
      }
    }
  });
});
