import { defineConfig, devices } from "@playwright/test";

const webServerBase = process.env.E2E_BASE_URL || "http://localhost:3000";

const desktopViewport = { viewport: { width: 1280, height: 2000 } };

export default defineConfig({
  testDir: "./e2e-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,
  reporter: "html",
  use: {
    baseURL: process.env.E2E_EXTERNAL_BASE_URL || webServerBase,
    trace: "on-first-retry",
    video: process.env.CI
      ? undefined
      : {
          mode: "on",
          size: {
            width: 1280,
            height: 2000,
          },
        },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], ...desktopViewport },
      testMatch: "e2e-tests/**/*.spec.ts",
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], ...desktopViewport },
      testMatch: "e2e-tests/**/*.spec.ts",
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], ...desktopViewport },
      testMatch: "e2e-tests/**/*.spec.ts",
    },
  ],
  timeout: 120000,
  reportSlowTests: {
    threshold: 120000,
    max: 5,
  },
  expect: {
    timeout: 60000,
  },
  webServer: process.env.E2E_EXTERNAL_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: webServerBase,
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
      },
});
