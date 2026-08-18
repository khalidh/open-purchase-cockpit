import { existsSync, readFileSync } from "node:fs";
import yaml from "js-yaml";

const required = [
  "AGENTS.md",
  "docs/traceability-matrix.md",
  "docs/validation/README.md",
  "docs/validation/validation-report-template.md",
  "docs/validation/release-checklist.md",
  "docs/validation/github-configuration.md",
  "docs/validation/dependency-risk.md",
  "docs/validation/reports/1.2.0.md",
  ".github/ISSUE_TEMPLATE/validation.yml",
  ".github/ISSUE_TEMPLATE/feature.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  "playwright.config.js",
  "tests/e2e/cockpit.spec.js"
];
for (const file of required) {
  if (!existsSync(file) || !readFileSync(file, "utf8").trim()) throw new Error(`Validation-loop artifact missing: ${file}`);
}

for (const file of [
  ".github/workflows/ci.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/validation.yml",
  ".github/ISSUE_TEMPLATE/feature.yml",
  ".github/ISSUE_TEMPLATE/data-kpi.yml"
]) {
  yaml.load(readFileSync(file, "utf8"));
}

const agents = readFileSync("AGENTS.md", "utf8");
for (const phrase of ["Boucle de validation obligatoire", "Commandes minimales avant commit", "Definition of Done"]) {
  if (!agents.includes(phrase)) throw new Error(`AGENTS.md is missing section: ${phrase}`);
}

const matrix = readFileSync("docs/traceability-matrix.md", "utf8");
for (const area of ["FR-DAS", "FR-PO", "FR-PR", "FR-DEL", "FR-SUP", "FR-INV", "FR-SPD", "FR-ALT", "NFR-ACC", "NFR-RWD"]) {
  if (!matrix.includes(area)) throw new Error(`Traceability matrix is missing area ${area}`);
}

const e2e = readFileSync("tests/e2e/cockpit.spec.js", "utf8");
for (const id of ["E2E-001", "E2E-002", "E2E-003", "E2E-004", "E2E-005", "E2E-006", "E2E-008", "E2E-009", "E2E-A11Y-001", "E2E-RWD-001"]) {
  if (!e2e.includes(id)) throw new Error(`Browser evidence is missing ${id}`);
}

console.log("Validation loop artifacts and traceability are coherent");
