import { readFileSync } from "node:fs";
import yaml from "js-yaml";

const requiredDocs = [
  "docs/product-specification.md", "docs/architecture.md", "docs/sap-integration.md",
  "docs/api.md", "docs/openapi.yaml", "docs/security.md", "docs/ai-and-rules.md",
  "docs/user-stories.md", "docs/quality-and-testing.md", "docs/roadmap.md"
];
for (const file of requiredDocs) {
  if (!readFileSync(file, "utf8").trim()) throw new Error(`${file} is missing or empty`);
}
yaml.load(readFileSync("docs/openapi.yaml", "utf8"));
yaml.load(readFileSync("docker-compose.yml", "utf8"));

const stories = readFileSync("docs/user-stories.md", "utf8").match(/^### US-\d{3}/gm) ?? [];
if (stories.length < 20) throw new Error(`Expected at least 20 user stories, got ${stories.length}`);

const data = JSON.parse(readFileSync("examples/demo-data.json", "utf8"));
const expected = { suppliers: 10, materials: 30, purchaseOrders: 50 };
for (const [key, count] of Object.entries(expected)) {
  if (data[key]?.length !== count) throw new Error(`Expected ${count} ${key}, got ${data[key]?.length}`);
}
for (const scenario of ["lateOrders", "partialOrders", "ordersWithoutReceipt", "blockedInvoices", "priceMismatches", "quantityMismatches"]) {
  if (!(data.quality[scenario] > 0)) throw new Error(`Dataset does not cover ${scenario}`);
}

const uiData = JSON.parse(readFileSync("webapp/model/purchases.json", "utf8"));
for (const collection of ["orders", "requisitions", "suppliers", "deliveries", "invoices", "alerts"]) {
  if (!Array.isArray(uiData[collection]) || uiData[collection].length === 0) {
    throw new Error(`Browser demo collection ${collection} is empty`);
  }
}
const dashboardView = readFileSync("webapp/view/Dashboard.view.xml", "utf8");
const tileTargets = dashboardView.match(/press="\.onTilePress"/g) ?? [];
if (tileTargets.length < 8) throw new Error(`Expected at least 8 navigable dashboard tiles, got ${tileTargets.length}`);
for (const key of ["dashboard", "orders", "requisitions", "deliveries", "suppliers", "invoices", "spend", "alerts", "assistant"]) {
  if (!dashboardView.includes(`key="${key}"`)) throw new Error(`Browser demo is missing the ${key} workspace`);
}

console.log(`Specifications valid: ${stories.length} stories; datasets and ${tileTargets.length} dashboard tiles OK`);
