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
console.log(`Specifications valid: ${stories.length} stories; demo dataset coverage OK`);
