sap.ui.define([
  "sap/ui/test/opaQunit",
  "./pages/Dashboard"
], function (opaTest) {
  "use strict";

  QUnit.module("Tableau de bord");

  opaTest("affiche la liste des commandes", function (Given, When, Then) {
    Given.iStartMyAppInAFrame("../../../index.html");
    Then.onTheDashboard.iShouldSeeThePurchaseTable();
    Then.iTeardownMyAppFrame();
  });
});
