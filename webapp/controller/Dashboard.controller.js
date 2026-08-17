sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast",
  "open/purchase/cockpit/model/formatter"
], function (Controller, Filter, FilterOperator, MessageToast, formatter) {
  "use strict";

  return Controller.extend("open.purchase.cockpit.controller.Dashboard", {
    formatter: formatter,

    onInit: function () {
      this._sSearchQuery = "";
      this._sStatus = "ALL";
    },

    onSearch: function (oEvent) {
      this._sSearchQuery = oEvent.getParameter("query") ?? oEvent.getParameter("newValue") ?? "";
      this._applyFilters();
    },

    onStatusChange: function (oEvent) {
      this._sStatus = oEvent.getParameter("selectedItem").getKey();
      this._applyFilters();
    },

    onOrderPress: function (oEvent) {
      const sOrderId = oEvent.getSource().getBindingContext().getProperty("id");
      const sMessage = this.getOwnerComponent().getModel("i18n")
        .getResourceBundle().getText("orderSelected", [sOrderId]);
      MessageToast.show(sMessage);
    },

    _applyFilters: function () {
      const aFilters = [];

      if (this._sSearchQuery) {
        aFilters.push(new Filter({
          filters: [
            new Filter("id", FilterOperator.Contains, this._sSearchQuery),
            new Filter("supplier", FilterOperator.Contains, this._sSearchQuery),
            new Filter("buyer", FilterOperator.Contains, this._sSearchQuery)
          ],
          and: false
        }));
      }

      if (this._sStatus !== "ALL") {
        aFilters.push(new Filter("status", FilterOperator.EQ, this._sStatus));
      }

      this.byId("purchaseTable").getBinding("items").filter(aFilters);
    }
  });
});
