import { test, expect } from "@playwright/test";

test.describe("Preset Buttons", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Currency Calculator" }),
    ).toBeVisible();
  });

  test("should update input and outputs when clicking preset buttons", async ({
    page,
  }) => {
    const input = page.getByLabel("Amount in USD");
    const eurOutput = page.locator("output[for='amount-input']").first();

    await page.getByRole("button", { name: /Set amount to 100 USD/i }).click();
    await expect(input).toHaveValue("100");
    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);

    await page.getByRole("button", { name: /Set amount to 1000 USD/i }).click();
    await expect(input).toHaveValue("1000");
    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);

    await page
      .getByRole("button", { name: /Set amount to 10000 USD/i })
      .click();
    await expect(input).toHaveValue("10000");
    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);
  });

  test("should manage active state correctly", async ({ page }) => {
    const button100 = page.getByRole("button", {
      name: /Set amount to 100 USD/i,
    });
    const button1000 = page.getByRole("button", {
      name: /Set amount to 1000 USD/i,
    });

    await button100.click();
    await expect(button100).toHaveAttribute("aria-label", /currently active/i);

    await button1000.click();
    await expect(button1000).toHaveAttribute("aria-label", /currently active/i);
    await expect(button100).not.toHaveAttribute(
      "aria-label",
      /currently active/i,
    );
  });

  test("should clear active state when manually editing input", async ({
    page,
  }) => {
    const button100 = page.getByRole("button", {
      name: /Set amount to 100 USD/i,
    });
    const input = page.getByLabel("Amount in USD");

    await button100.click();
    await expect(button100).toHaveAttribute("aria-label", /currently active/i);

    await input.fill("250");
    await expect(button100).not.toHaveAttribute(
      "aria-label",
      /currently active/i,
    );
  });

  test("should update both EUR and CHF outputs", async ({ page }) => {
    const eurOutput = page.locator("output[for='amount-input']").first();
    const chfOutput = page.locator("output[for='amount-input']").last();

    await page.getByRole("button", { name: /Set amount to 1000 USD/i }).click();

    await expect(eurOutput).not.toHaveText(/^€\s*0[.,]00$/);
    await expect(chfOutput).not.toHaveText(/^CHF\s+0[.,]00$/);
  });
});
