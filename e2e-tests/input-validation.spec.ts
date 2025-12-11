import { test, expect } from "@playwright/test";

test.describe("Input Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Currency Calculator" }),
    ).toBeVisible();
  });

  test("should show zero outputs when input is empty", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const errorMessage = page.locator("#amount-input-error");
    const eurOutput = page.locator("output[for='amount-input']").first();
    const chfOutput = page.locator("output[for='amount-input']").last();

    await expect(input).toHaveValue("");
    await expect(errorMessage).toBeEmpty();
    await expect(eurOutput).toHaveText(/€\s*0[.,]00/);
    await expect(chfOutput).toHaveText(/CHF\s+0[.,]00/);
  });

  test("should show errors for invalid inputs", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const errorMessage = page.locator("#amount-input-error");

    await input.fill("-100");
    await expect(errorMessage).not.toBeEmpty();

    await input.fill("abc");
    await expect(errorMessage).not.toBeEmpty();

    await input.fill("100.50.25");
    await expect(errorMessage).not.toBeEmpty();
  });

  test("should clear error when entering valid amount", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const errorMessage = page.locator("#amount-input-error");

    await input.fill("-50");
    await expect(errorMessage).not.toBeEmpty();

    await input.fill("100");
    await expect(errorMessage).toBeEmpty();
  });

  test("should accept valid inputs without error", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const errorMessage = page.locator("#amount-input-error");
    const eurOutput = page.locator("output[for='amount-input']").first();

    await input.fill("0");
    await expect(errorMessage).toBeEmpty();
    await expect(eurOutput).toHaveText(/€\s*0[.,]00/);

    await input.fill("123.45");
    await expect(errorMessage).toBeEmpty();

    await input.fill("123,45");
    await expect(errorMessage).toBeEmpty();

    await input.fill("50000");
    await expect(errorMessage).toBeEmpty();
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    const input = page.getByLabel("Amount in USD");
    const errorMessage = page.locator("#amount-input-error");

    await input.fill("100");
    await expect(input).toHaveAttribute("aria-invalid", "false");

    await input.fill("-100");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute(
      "aria-describedby",
      "amount-input-error",
    );
    await expect(errorMessage).toHaveAttribute("role", "alert");
  });
});
