sap.ui.define([
  "sap/ui/test/opaQunit",
  "./pages/Dashboard"
], function (opaTest) {
  "use strict";

  QUnit.module("Cockpit de démonstration");

  opaTest("affiche les tuiles et navigue vers les commandes", function (Given, When, Then) {
    Given.iStartMyAppInAFrame("../../../index.html");
    Then.onTheDashboard.iShouldSeeTheTileDashboard();
    When.onTheDashboard.iOpenTheOrdersTile();
    Then.onTheDashboard.iShouldSeeThePurchaseOrders();
    Then.iTeardownMyAppFrame();
  });
});
