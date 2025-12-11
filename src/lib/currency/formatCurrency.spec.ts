import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  describe("German locale (default)", () => {
    it("should format EUR with German locale", () => {
      expect(formatCurrency(1234.56, "EUR")).toBe("1.234,56\u00A0€");
    });

    it("should format USD with German locale", () => {
      expect(formatCurrency(1234.56, "USD")).toBe("1.234,56\u00A0$");
    });

    it("should format CHF with German locale", () => {
      expect(formatCurrency(1234.56, "CHF")).toBe("1.234,56\u00A0CHF");
    });
  });

  describe("US locale", () => {
    it("should format EUR with US locale", () => {
      expect(formatCurrency(1234.56, "EUR", "en-US")).toBe("€1,234.56");
    });

    it("should format USD with US locale", () => {
      expect(formatCurrency(1234.56, "USD", "en-US")).toBe("$1,234.56");
    });

    it("should format CHF with US locale", () => {
      expect(formatCurrency(1234.56, "CHF", "en-US")).toBe("CHF\u00A01,234.56");
    });
  });

  describe("edge cases", () => {
    it("should format zero", () => {
      expect(formatCurrency(0, "EUR")).toBe("0,00\u00A0€");
    });

    it("should format small amounts", () => {
      expect(formatCurrency(0.01, "EUR")).toBe("0,01\u00A0€");
      expect(formatCurrency(0.99, "EUR")).toBe("0,99\u00A0€");
    });

    it("should format large amounts", () => {
      expect(formatCurrency(1000000, "EUR")).toBe("1.000.000,00\u00A0€");
      expect(formatCurrency(999999999, "EUR")).toBe("999.999.999,00\u00A0€");
    });

    it("should format negative amounts", () => {
      expect(formatCurrency(-100, "EUR")).toBe("-100,00\u00A0€");
      expect(formatCurrency(-1234.56, "EUR")).toBe("-1.234,56\u00A0€");
    });

    it("should always show 2 decimal places", () => {
      expect(formatCurrency(100, "EUR")).toBe("100,00\u00A0€");
      expect(formatCurrency(100.1, "EUR")).toBe("100,10\u00A0€");
      expect(formatCurrency(100.5, "EUR")).toBe("100,50\u00A0€");
    });

    it("should round to 2 decimal places", () => {
      expect(formatCurrency(100.125, "EUR")).toBe("100,13\u00A0€");
      expect(formatCurrency(100.124, "EUR")).toBe("100,12\u00A0€");
    });
  });
});
