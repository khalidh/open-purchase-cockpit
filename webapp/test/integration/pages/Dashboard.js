sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/actions/Press",
  "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, Press, PropertyStrictEquals) {
  "use strict";

  Opa5.createPageObjects({
    onTheDashboard: {
      actions: {
        iPressTheFirstOrder: function () {
          return this.waitFor({
            id: "purchaseTable",
            viewName: "Dashboard",
            actions: new Press()
          });
        }
      },
      assertions: {
        iShouldSeeThePurchaseTable: function () {
          return this.waitFor({
            id: "purchaseTable",
            viewName: "Dashboard",
            matchers: new PropertyStrictEquals({ name: "visible", value: true }),
            success: function () {
              Opa5.assert.ok(true, "Le tableau des commandes est visible");
            }
          });
        }
      }
    }
  });
});
