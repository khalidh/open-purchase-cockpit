sap.ui.define([
  "sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
  "use strict";

  return {
    amount: function (vAmount) {
      return NumberFormat.getFloatInstance({
        minFractionDigits: 2,
        maxFractionDigits: 2
      }).format(vAmount);
    },

    statusText: function (sStatus) {
      const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
      const mKeys = {
        APPROVED: "statusApproved",
        PENDING: "statusPending",
        REJECTED: "statusRejected"
      };
      return oBundle.getText(mKeys[sStatus] || "statusUnknown");
    },

    statusState: function (sStatus) {
      return {
        APPROVED: "Success",
        PENDING: "Warning",
        REJECTED: "Error"
      }[sStatus] || "None";
    }
  };
});
