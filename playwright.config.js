import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "test-results/artifacts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["line"], ["html", { outputFolder: "test-results/playwright-report", open: "never" }], ["junit", { outputFile: "test-results/junit.xml" }]]
    : [["list"], ["html", { outputFolder: "test-results/playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:8080",
    locale: "fr-FR",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    command: "npm run serve -- --accept-remote-connections",
    url: "http://127.0.0.1:8080/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 5"] }, grep: /@responsive/ }
  ]
});
