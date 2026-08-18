import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html?sap-ui-language=fr");
  await expect(page.getByText("Bonjour Marie, voici vos priorités achats")).toBeVisible({ timeout: 30000 });
});

test("E2E-001 les huit tuiles sont visibles et navigables", async ({ page }) => {
  const tileGrid = page.locator(".tileGrid");
  await expect(tileGrid.locator(".sapMGT")).toHaveCount(8);
  await page.locator('[id$="--ordersTile"]').click();
  await expect(page.locator('[id$="--ordersTable"]')).toBeVisible();
  await expect(page.getByText("4500000042", { exact: true })).toBeVisible();
});

test("E2E-002 recherche et filtre les commandes", async ({ page }) => {
  await page.locator('[id$="--ordersTile"]').click();
  await page.locator('[id$="--orderSearch-I"]').fill("Fjord");
  await expect(page.getByText("Fjord Bearings", { exact: true })).toBeVisible();
  await expect(page.getByText("Gaia Electronics", { exact: true })).toBeHidden();
});

test("E2E-003 filtre les demandes non transformées", async ({ page }) => {
  await page.locator('[id$="--requisitionsTab"]').click();
  await page.locator('[id$="--unconvertedSwitch"]').click();
  await expect(page.getByText("1000000101", { exact: true })).toBeVisible();
  await expect(page.getByText("1000000103", { exact: true })).toBeHidden();
});

test("E2E-004 affiche les livraisons à risque", async ({ page }) => {
  await page.locator('[id$="--deliveriesTab"]').click();
  await page.getByRole("option", { name: "À risque", exact: true }).click();
  await expect(page.getByText("4500000043", { exact: true })).toBeVisible();
  await expect(page.getByText("4500000042", { exact: true })).toBeHidden();
});

test("E2E-005 ouvre la performance fournisseur", async ({ page }) => {
  await page.locator('[id$="--suppliersTab"]').click();
  await page.getByText("Delta Packaging", { exact: true }).click();
  await expect(page.getByText(/Performance · Delta Packaging/)).toBeVisible();
  await expect(page.getByText(/OTIF : 76 %/)).toBeVisible();
});

test("E2E-006 explique une facture bloquée", async ({ page }) => {
  await page.locator('[id$="--invoicesTab"]').click();
  await page.getByText("5100000081", { exact: true }).click();
  await expect(page.getByText(/Validation humaine : Obligatoire/)).toBeVisible();
});

test("E2E-008 acquitte une alerte", async ({ page }) => {
  await page.locator('[id$="--alertsTab"]').click();
  const firstRow = page.getByRole("row").filter({ hasText: "Commande 4500000042 en retard" });
  await firstRow.getByRole("button", { name: "Acquitter" }).click();
  await expect(firstRow.getByText("ACKNOWLEDGED", { exact: true })).toBeVisible();
  await expect(firstRow.getByText("Marie Dubois", { exact: true })).toBeVisible();
});

test("E2E-009 le copilote fournit une réponse sourcée", async ({ page }) => {
  await page.locator('[id$="--assistantTab"]').click();
  await page.getByRole("button", { name: /commandes > 50 000/ }).click();
  await expect(page.getByText(/4500000045/)).toBeVisible();
  await expect(page.getByText(/Source : Purchase Orders/)).toBeVisible();
});

test("E2E-A11Y-001 aucune violation critique ou sérieuse sur l’accueil", async ({ page }) => {
  const results = await new AxeBuilder({ page })
    // OpenUI5 1.120 génère ces clones invisibles sans nom, tandis que les contrôles visibles sont labellisés.
    // Les exclusions sont limitées à ces artefacts de framework et seront réévaluées à chaque montée de version.
    .exclude(".sapMSelectList")
    .exclude(".sapMTBHiddenElement")
    .analyze();
  const blocking = results.violations.filter((item) => ["critical", "serious"].includes(item.impact));
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test("E2E-RWD-001 @responsive les tuiles restent utilisables sur mobile", async ({ page }) => {
  await expect(page.locator(".tileGrid .sapMGT")).toHaveCount(8);
  await page.locator('[id$="--lateOrdersTile"]').click();
  await expect(page.locator('[id$="--deliveriesTable"]')).toBeVisible();
});
