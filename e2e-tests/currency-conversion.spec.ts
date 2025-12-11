import { test, expect } from "@playwright/test";

test.describe("Currency Conversion Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Currency Calculator" }),
    ).toBeVisible();
  });

  test("should convert amount and display properly formatted outputs", async ({
    page,
  }) => {
    const input = page.getByLabel("Amount in USD");
    const eurOutput = page.locator("output[for='amount-input']").first();
    const chfOutput = page.locator("output[for='amount-input']").last();

    await input.fill("1000");

    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);
    await expect(chfOutput).not.toHaveText(/^CHF\s+0[.,]00$/);
    await expect(eurOutput).toContainText(/€/);
    await expect(chfOutput).toContainText(/CHF/);
    await expect(eurOutput).toContainText(/[.,]/);
    await expect(chfOutput).toContainText(/[.,]/);
  });

  test("should handle various input values", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const eurOutput = page.locator("output[for='amount-input']").first();

    await input.fill("123.45");
    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);

    await input.fill("50000");
    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);

    await input.clear();
    await expect(eurOutput).toHaveText(/€\s*0[.,]00/);
  });

  test("should display exchange rates in converter section", async ({
    page,
  }) => {
    const input = page.getByLabel("Amount in USD");
    await input.fill("100");

    const rateLabels = page
      .getByText("Converted amounts")
      .locator("..")
      .getByText("Rate");
    await expect(rateLabels).toHaveCount(2);

    const eurOutput = page.locator("output[for='amount-input']").first();
    const chfOutput = page.locator("output[for='amount-input']").last();

    await expect(eurOutput).toContainText(/€/);
    await expect(eurOutput).toContainText(/\d/);
    await expect(chfOutput).toContainText(/CHF/);
    await expect(chfOutput).toContainText(/\d/);
  });
});
