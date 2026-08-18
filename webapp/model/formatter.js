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

    compactAmount: function (vAmount) {
      return `${NumberFormat.getFloatInstance({
        minFractionDigits: 1,
        maxFractionDigits: 1
      }).format(Number(vAmount) / 1000)} k€`;
    },

    statusText: function (sStatus) {
      const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
      const mKeys = {
        APPROVED: "statusApproved",
        PENDING: "statusPending",
        REJECTED: "statusRejected",
        OPEN: "statusOpen",
        LATE: "statusLate",
        AT_RISK: "statusAtRisk",
        DELIVERED: "statusDelivered",
        BLOCKED: "statusBlocked",
        MATCHED: "statusMatched",
        ACKNOWLEDGED: "statusAcknowledged",
        IN_PROGRESS: "statusInProgress"
      };
      return oBundle.getText(mKeys[sStatus] || "statusUnknown");
    },

    statusState: function (sStatus) {
      return {
        APPROVED: "Success",
        PENDING: "Warning",
        REJECTED: "Error",
        OPEN: "Information",
        LATE: "Error",
        AT_RISK: "Warning",
        DELIVERED: "Success",
        BLOCKED: "Error",
        MATCHED: "Success",
        ACKNOWLEDGED: "Information",
        IN_PROGRESS: "Warning"
      }[sStatus] || "None";
    }
  };
});
