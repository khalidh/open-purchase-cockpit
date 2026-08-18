sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "open/purchase/cockpit/model/formatter"
], function (Controller, JSONModel, Filter, FilterOperator, MessageBox, MessageToast, formatter) {
  "use strict";

  return Controller.extend("open.purchase.cockpit.controller.Dashboard", {
    formatter: formatter,

    onInit: function () {
      this._orderQuery = "";
      this._orderStatus = "ALL";
      this.getView().setModel(new JSONModel({
        selectedSection: "dashboard",
        assistantQuestion: "",
        assistantAnswer: "Bonjour Marie. Je peux analyser les données de démonstration du cockpit. Chaque réponse indique les documents utilisés et reste en lecture seule.",
        assistantTimestamp: "Données Mock SAP · 09:55 UTC"
      }), "ui");
    },

    onTabSelect: function (oEvent) {
      this.getView().getModel("ui").setProperty("/selectedSection", oEvent.getParameter("key"));
    },

    onTilePress: function (oEvent) {
      const sTarget = oEvent.getSource().data("target");
      this.byId("mainTabs").setSelectedKey(sTarget);
      this.getView().getModel("ui").setProperty("/selectedSection", sTarget);
    },

    onOpenAlerts: function () {
      this.byId("mainTabs").setSelectedKey("alerts");
    },

    onRefresh: function () {
      const oModel = this.getOwnerComponent().getModel();
      oModel.setProperty("/meta/freshness", "à l'instant · Mock SAP");
      MessageToast.show(this._text("refreshSuccess"));
    },

    onCompanyChange: function (oEvent) {
      const sKey = oEvent.getParameter("selectedItem").getKey();
      const oFilter = sKey === "ALL" ? [] : [new Filter("companyCode", FilterOperator.EQ, sKey)];
      this.byId("ordersTable").getBinding("items").filter(oFilter, "Application");
      MessageToast.show(sKey === "ALL" ? this._text("allCompaniesSelected") : this._text("companySelected", [sKey]));
    },

    onOrderSearch: function (oEvent) {
      this._orderQuery = oEvent.getParameter("newValue") || "";
      this._applyOrderFilters();
    },

    onOrderStatusChange: function (oEvent) {
      this._orderStatus = oEvent.getParameter("selectedItem").getKey();
      this._applyOrderFilters();
    },

    _applyOrderFilters: function () {
      const aFilters = [];
      if (this._orderQuery) {
        aFilters.push(new Filter({
          filters: ["id", "supplier", "material", "description", "buyer"].map(function (sPath) {
            return new Filter(sPath, FilterOperator.Contains, this._orderQuery);
          }.bind(this)),
          and: false
        }));
      }
      if (this._orderStatus !== "ALL") {
        aFilters.push(new Filter("status", FilterOperator.EQ, this._orderStatus));
      }
      this.byId("ordersTable").getBinding("items").filter(aFilters, "Control");
    },

    onRequisitionSearch: function (oEvent) {
      this._filterTable("requisitionsTable", oEvent.getParameter("newValue"), ["id", "description", "requester"]);
    },

    onUnconvertedChange: function (oEvent) {
      const aFilters = oEvent.getParameter("state") ? [new Filter("converted", FilterOperator.EQ, false)] : [];
      this.byId("requisitionsTable").getBinding("items").filter(aFilters, "Application");
    },

    onSupplierSearch: function (oEvent) {
      this._filterTable("suppliersTable", oEvent.getParameter("newValue"), ["id", "name", "country"]);
    },

    onDeliveryStatusChange: function (oEvent) {
      const sKey = oEvent.getParameter("item").getKey();
      const aFilters = sKey === "ALL" ? [] : [new Filter("status", FilterOperator.EQ, sKey)];
      this.byId("deliveriesTable").getBinding("items").filter(aFilters);
    },

    onBlockedInvoices: function (oEvent) {
      const oButton = oEvent.getSource();
      const bActive = !oButton.data("active");
      oButton.data("active", bActive);
      oButton.setText(this._text(bActive ? "showAll" : "blockedOnly"));
      this.byId("invoicesTable").getBinding("items").filter(bActive ? [new Filter("status", FilterOperator.EQ, "BLOCKED")] : []);
    },

    onOrderPress: function (oEvent) {
      const o = oEvent.getSource().getBindingContext().getObject();
      this._showDetails(this._text("orderDetailTitle", [o.id]), [
        [this._text("supplier"), o.supplier],
        [this._text("material"), `${o.material} · ${o.description}`],
        [this._text("ordered"), `${o.ordered} ${o.unit}`],
        [this._text("received"), `${o.received} ${o.unit}`],
        [this._text("remaining"), `${o.remaining} ${o.unit}`],
        [this._text("deliveryDate"), o.deliveryDate],
        [this._text("confirmation"), o.confirmation],
        [this._text("source"), "MOCK-S4 · projection 09:55 UTC"]
      ]);
    },

    onDeliveryPress: function (oEvent) {
      const o = oEvent.getSource().getBindingContext().getObject();
      this._showDetails(this._text("deliveryDetailTitle", [o.poId]), [
        [this._text("supplier"), o.supplier],
        [this._text("description"), o.description],
        [this._text("dueDate"), o.dueDate],
        [this._text("risk"), o.risk],
        [this._text("remaining"), String(o.remaining)],
        [this._text("ruleEvidence"), `${o.received} / ${o.ordered} reçues`]
      ]);
    },

    onSupplierPress: function (oEvent) {
      const o = oEvent.getSource().getBindingContext().getObject();
      this._showDetails(this._text("supplierDetailTitle", [o.name]), [
        [this._text("country"), o.country],
        [this._text("spend"), `${formatter.amount(o.spend)} EUR`],
        [this._text("openOrders"), String(o.openOrders)],
        [this._text("lateOrders"), String(o.lateOrders)],
        ["OTIF", `${o.otif} %`],
        [this._text("incidents"), String(o.incidents)],
        [this._text("priceTrend"), o.trend]
      ]);
    },

    onInvoicePress: function (oEvent) {
      const o = oEvent.getSource().getBindingContext().getObject();
      this._showDetails(this._text("invoiceDetailTitle", [o.id]), [
        [this._text("orderId"), o.poId],
        [this._text("supplier"), o.supplier],
        [this._text("amount"), `${formatter.amount(o.amount)} ${o.currency}`],
        [this._text("matchingResult"), o.mismatch],
        [this._text("status"), formatter.statusText.call(this, o.status)],
        [this._text("humanValidation"), this._text("required")]
      ]);
    },

    onGenericItemPress: function (oEvent) {
      const o = oEvent.getSource().getBindingContext().getObject();
      this._showDetails(`${this._text("requisition")} ${o.id}`, [
        [this._text("description"), o.description],
        [this._text("requester"), o.requester],
        [this._text("requestedDate"), o.requestedDate],
        [this._text("estimatedValue"), `${formatter.amount(o.value)} EUR`],
        [this._text("conversion"), o.converted ? this._text("converted") : this._text("notConverted")]
      ]);
    },

    onAcknowledgeAlert: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const oModel = oContext.getModel();
      oModel.setProperty(`${oContext.getPath()}/status`, "ACKNOWLEDGED");
      oModel.setProperty(`${oContext.getPath()}/owner`, "Marie Dubois");
      MessageToast.show(this._text("alertAcknowledged"));
    },

    onSuggestedQuestion: function (oEvent) {
      this.getView().getModel("ui").setProperty("/assistantQuestion", oEvent.getSource().getText());
      this.onAskAssistant();
    },

    onAskAssistant: function () {
      const oUiModel = this.getView().getModel("ui");
      const sQuestion = (oUiModel.getProperty("/assistantQuestion") || "").trim().toLowerCase();
      if (!sQuestion) {
        MessageToast.show(this._text("enterQuestion"));
        return;
      }
      let sAnswer;
      if (sQuestion.includes("fournisseur")) {
        sAnswer = "Delta Packaging présente le taux OTIF le plus faible (76 %, 4 incidents), suivi de Fjord Bearings (81 %, 3 incidents). Source : Supplier Performance, période courante, fraîcheur 09:55 UTC.";
      } else if (sQuestion.includes("50 000") || sQuestion.includes("50000")) {
        sAnswer = "Deux commandes supérieures à 50 000 EUR ont encore un reliquat : 4500000045 (56 800 EUR, 80 EA) et 4500000047 (73 200 EUR, 60 EA). Source : Purchase Orders, MOCK-S4, fraîcheur 09:55 UTC.";
      } else if (sQuestion.includes("facture") || sQuestion.includes("bloqu")) {
        sAnswer = "Quatre factures sont bloquées. Les causes visibles sont : écart de prix, quantité facturée supérieure à la réception, réception incomplète et absence de réception. Ouvrez l'onglet Factures pour le 3-way match. Aucune libération automatique n'est autorisée.";
      } else {
        sAnswer = "Trois commandes de l'échantillon sont en retard : 4500000042 (60 EA restantes), 4500000044 (250 EA) et 4500000048 (120 KG). Source : Delivery Monitoring, règle LateDeliveryAlert v1.0, fraîcheur 09:55 UTC.";
      }
      oUiModel.setProperty("/assistantAnswer", sAnswer);
      oUiModel.setProperty("/assistantTimestamp", this._text("answerGeneratedNow"));
      oUiModel.setProperty("/assistantQuestion", "");
    },

    onExport: function () {
      const aRows = this.getOwnerComponent().getModel().getProperty("/categorySpend");
      const sCsv = ["category;amount;currency"].concat(aRows.map(function (o) {
        return `${o.name};${o.amount};EUR`;
      })).join("\n");
      const oBlob = new Blob([sCsv], { type: "text/csv;charset=utf-8" });
      const sUrl = URL.createObjectURL(oBlob);
      const oLink = document.createElement("a");
      oLink.href = sUrl;
      oLink.download = "open-purchase-cockpit-spend-demo.csv";
      oLink.click();
      URL.revokeObjectURL(sUrl);
      MessageToast.show(this._text("exportCreated"));
    },

    _filterTable: function (sTableId, sValue, aFields) {
      const aFilters = sValue ? [new Filter({
        filters: aFields.map(function (sField) {
          return new Filter(sField, FilterOperator.Contains, sValue);
        }),
        and: false
      })] : [];
      this.byId(sTableId).getBinding("items").filter(aFilters, "Control");
    },

    _showDetails: function (sTitle, aRows) {
      MessageBox.information(aRows.map(function (aRow) {
        return `${aRow[0]} : ${aRow[1]}`;
      }).join("\n"), {
        title: sTitle,
        actions: [MessageBox.Action.CLOSE]
      });
    },

    _text: function (sKey, aArgs) {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
    }
  });
});
