import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const businessDate = "2026-08-17";
const day = 86_400_000;
const date = (offset) => new Date(Date.parse(`${businessDate}T00:00:00Z`) + offset * day).toISOString().slice(0, 10);
const money = (n) => Number(n.toFixed(2));

const suppliers = Array.from({ length: 10 }, (_, i) => ({
  id: `SUP-${String(i + 1).padStart(3, "0")}`,
  name: ["Alpine Components", "Baltic Office", "Cobalt Tools", "Delta Packaging", "Europa Safety", "Fjord Bearings", "Gaia Electronics", "Helios Services", "Ion Chemicals", "Jade Logistics"][i],
  country: ["FR", "DE", "BE", "NL", "ES", "SE", "IT", "IE", "AT", "PL"][i],
  purchasingOrganizations: [i % 2 ? "2000" : "1000"],
  category: ["MECHANICAL", "OFFICE", "TOOLS", "PACKAGING", "SAFETY"][i % 5]
}));

const materials = Array.from({ length: 30 }, (_, i) => ({
  id: `MAT-${String(i + 1).padStart(4, "0")}`,
  description: `Article de démonstration ${String(i + 1).padStart(2, "0")}`,
  category: ["MECHANICAL", "OFFICE", "TOOLS", "PACKAGING", "SAFETY"][i % 5],
  baseUnit: i % 4 === 0 ? "KG" : "EA",
  plant: i % 2 ? "P200" : "P100"
}));

const goodsReceipts = [];
const invoices = [];
const purchaseOrders = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1;
  const late = n % 5 === 0;
  const partial = n % 7 === 0;
  const noReceipt = n % 9 === 0;
  const noConfirmation = n % 6 === 0;
  const priceMismatch = n % 8 === 0;
  const quantityMismatch = n % 10 === 0;
  const supplier = suppliers[i % suppliers.length];
  const companyCode = i % 2 ? "2000" : "1000";
  const deliveryOffset = late ? -10 - (i % 10) : noConfirmation ? 2 : 5 + (i % 20);
  const items = [1, 2].map((itemIndex) => {
    const material = materials[(i * 2 + itemIndex - 1) % materials.length];
    const orderedQuantity = 20 + ((i + itemIndex) % 9) * 10;
    const receivedQuantity = noReceipt ? 0 : partial || late ? orderedQuantity / 2 : orderedQuantity;
    const netPrice = 10 + ((i * 7 + itemIndex * 3) % 90);
    const itemNo = String(itemIndex * 10).padStart(5, "0");
    if (receivedQuantity > 0) {
      goodsReceipts.push({
        id: `GR-${String(n).padStart(4, "0")}-${itemNo}`,
        purchaseOrderId: `4500${String(n).padStart(6, "0")}`,
        itemNo, postingDate: date(deliveryOffset + (late ? 0 : -1)),
        quantity: receivedQuantity, unit: material.baseUnit, movementType: "101", reversed: false
      });
    }
    return {
      itemNo, materialId: material.id, description: material.description, category: material.category,
      plant: material.plant, orderedQuantity, receivedQuantity,
      remainingQuantity: orderedQuantity - receivedQuantity, unit: material.baseUnit,
      netPrice, priceUnit: 1, deliveryDate: date(deliveryOffset),
      confirmationStatus: noConfirmation ? "MISSING" : "CONFIRMED"
    };
  });
  const netValue = money(items.reduce((sum, item) => sum + item.orderedQuantity * item.netPrice, 0));
  const invoiceQuantityFactor = quantityMismatch ? 1.2 : 1;
  const invoicePriceFactor = priceMismatch ? 1.08 : 1;
  const blocked = priceMismatch || quantityMismatch || n % 11 === 0;
  invoices.push({
    id: `5100${String(n).padStart(6, "0")}`, fiscalYear: 2026,
    supplierId: supplier.id, companyCode, purchaseOrderId: `4500${String(n).padStart(6, "0")}`,
    invoiceDate: date(Math.min(deliveryOffset + 2, -1)), currency: "EUR", blocked,
    blockReasons: [priceMismatch && "PRICE", quantityMismatch && "QUANTITY", n % 11 === 0 && "MANUAL"].filter(Boolean),
    items: items.map((item) => ({
      itemNo: item.itemNo,
      quantity: money(item.receivedQuantity * invoiceQuantityFactor),
      unitPrice: money(item.netPrice * invoicePriceFactor)
    }))
  });
  const received = items.reduce((s, x) => s + x.receivedQuantity, 0);
  const ordered = items.reduce((s, x) => s + x.orderedQuantity, 0);
  return {
    id: `4500${String(n).padStart(6, "0")}`, supplierId: supplier.id, companyCode,
    purchasingOrganization: companyCode, purchasingGroup: `G${(i % 4) + 1}0`,
    orderDate: date(-60 + i), currency: "EUR", netValue,
    status: late && received < ordered ? "LATE" : received === 0 ? "OPEN" : received < ordered ? "PARTIAL" : "DELIVERED",
    items
  };
});

const purchaseRequisitions = Array.from({ length: 25 }, (_, i) => ({
  id: `1000${String(i + 1).padStart(6, "0")}`,
  itemNo: "00010", materialId: materials[i % materials.length].id,
  requestedQuantity: 10 + (i % 8) * 5, unit: materials[i % materials.length].baseUnit,
  requestedDate: date(3 + (i % 20)), requester: `REQUESTER-${(i % 5) + 1}`,
  companyCode: i % 2 ? "2000" : "1000", purchasingGroup: `G${(i % 4) + 1}0`,
  approvalStatus: i % 6 === 0 ? "PENDING" : "APPROVED",
  purchaseOrderRefs: i % 4 === 0 ? [] : [purchaseOrders[i].id]
}));

const payload = {
  meta: {
    schemaVersion: "1.0.0", businessDate, generated: true, sourceSystem: "MOCK-S4",
    description: "Données entièrement fictives pour Open Purchase Cockpit"
  },
  suppliers, materials, purchaseRequisitions, purchaseOrders, goodsReceipts, invoices,
  quality: {
    suppliers: suppliers.length, materials: materials.length, purchaseOrders: purchaseOrders.length,
    lateOrders: purchaseOrders.filter((x) => x.status === "LATE").length,
    partialOrders: purchaseOrders.filter((x) => x.status === "PARTIAL").length,
    ordersWithoutReceipt: purchaseOrders.filter((x) => x.items.every((y) => y.receivedQuantity === 0)).length,
    blockedInvoices: invoices.filter((x) => x.blocked).length,
    priceMismatches: invoices.filter((x) => x.blockReasons.includes("PRICE")).length,
    quantityMismatches: invoices.filter((x) => x.blockReasons.includes("QUANTITY")).length
  }
};

mkdirSync(here, { recursive: true });
writeFileSync(resolve(here, "demo-data.json"), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(JSON.stringify(payload.quality));
