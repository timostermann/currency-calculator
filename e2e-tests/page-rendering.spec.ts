import { test, expect } from "@playwright/test";

test.describe("Page Rendering & Static Content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Currency Calculator", level: 1 }),
    ).toBeVisible();
  });

  test("should display main heading and subtitle", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Currency Calculator", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByText("USD to EUR & CHF Exchange Rates"),
    ).toBeVisible();
  });

  test("should display all three main sections", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Current Exchange Rates" }),
    ).toBeVisible();
    await expect(page.getByText("Last updated:")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Currency Converter" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "14-Day Exchange Rate Trend" }),
    ).toBeVisible();
  });

  test("should display exchange rate cards with values", async ({ page }) => {
    await expect(
      page.getByRole("paragraph").filter({ hasText: "USD to EUR" }).first(),
    ).toBeVisible();
    await expect(page.getByText("🇪🇺").first()).toBeVisible();

    await expect(
      page.getByRole("paragraph").filter({ hasText: "USD to CHF" }).first(),
    ).toBeVisible();
    await expect(page.getByText("🇨🇭").first()).toBeVisible();

    const eurRateCard = page
      .getByRole("paragraph")
      .filter({ hasText: "USD to EUR" })
      .first()
      .locator("..")
      .locator("..");
    await expect(eurRateCard).toContainText(/\d/);
    await expect(eurRateCard).not.toContainText("N/A");

    const chfRateCard = page
      .getByRole("paragraph")
      .filter({ hasText: "USD to CHF" })
      .first()
      .locator("..")
      .locator("..");
    await expect(chfRateCard).toContainText(/\d/);
    await expect(chfRateCard).not.toContainText("N/A");
  });

  test("should display converter with input and preset buttons", async ({
    page,
  }) => {
    await expect(page.getByLabel("Amount in USD")).toBeVisible();
    await expect(page.getByLabel("Amount in USD")).toBeEditable();
    await expect(page.getByRole("button", { name: /100 USD/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /1000 USD/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /10000 USD/ })).toBeVisible();
  });

  test("should display output elements for EUR and CHF", async ({ page }) => {
    const outputs = page.locator("output[for='amount-input']");
    await expect(outputs).toHaveCount(2);

    const rateLabels = page
      .getByText("Converted amounts")
      .locator("..")
      .getByText("Rate");
    await expect(rateLabels).toHaveCount(2);
  });
});
