import { test, expect } from "@playwright/test";

test.describe("Health Check", () => {
  test("should successfully connect to app", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);

    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});
