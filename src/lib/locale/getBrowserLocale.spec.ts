import { getBrowserLocale } from "./getBrowserLocale";

describe("getBrowserLocale", () => {
  it("should return browser locale when available", () => {
    const locale = getBrowserLocale();
    expect(typeof locale).toBe("string");
    expect(locale.length).toBeGreaterThan(0);
  });

  it("should return a valid locale format", () => {
    const locale = getBrowserLocale();
    expect(locale).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/);
  });
});
