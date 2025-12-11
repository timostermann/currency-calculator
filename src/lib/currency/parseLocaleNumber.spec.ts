import { parseLocaleNumber } from "./parseLocaleNumber";

describe("parseLocaleNumber", () => {
  describe("empty/invalid inputs", () => {
    it("should return null for empty string", () => {
      expect(parseLocaleNumber("")).toBe(null);
    });

    it("should return null for whitespace only", () => {
      expect(parseLocaleNumber("   ")).toBe(null);
    });

    it("should return null for non-numeric string", () => {
      expect(parseLocaleNumber("abc")).toBe(null);
    });

    it("should return null for invalid format", () => {
      expect(parseLocaleNumber("12.34.56")).toBe(null);
    });
  });

  describe("US format (dot as decimal separator)", () => {
    it("should parse simple integer", () => {
      expect(parseLocaleNumber("123")).toBe(123);
    });

    it("should parse number with decimal point", () => {
      expect(parseLocaleNumber("123.45")).toBe(123.45);
    });

    it("should parse number with comma as thousand separator", () => {
      expect(parseLocaleNumber("1,234.56")).toBe(1234.56);
    });

    it("should parse number with multiple thousand separators", () => {
      expect(parseLocaleNumber("1,234,567.89")).toBe(1234567.89);
    });
  });

  describe("German format (comma as decimal separator)", () => {
    it("should parse number with comma as decimal", () => {
      expect(parseLocaleNumber("123,45")).toBe(123.45);
    });

    it("should parse number with dot as thousand separator", () => {
      expect(parseLocaleNumber("1.234,56")).toBe(1234.56);
    });

    it("should parse number with multiple thousand separators", () => {
      expect(parseLocaleNumber("1.234.567,89")).toBe(1234567.89);
    });
  });

  describe("edge cases", () => {
    it("should handle zero", () => {
      expect(parseLocaleNumber("0")).toBe(0);
    });

    it("should handle decimal zero", () => {
      expect(parseLocaleNumber("0.00")).toBe(0);
      expect(parseLocaleNumber("0,00")).toBe(0);
    });

    it("should handle very small numbers", () => {
      expect(parseLocaleNumber("0.01")).toBe(0.01);
      expect(parseLocaleNumber("0,01")).toBe(0.01);
    });

    it("should handle very large numbers", () => {
      expect(parseLocaleNumber("1000000")).toBe(1000000);
      expect(parseLocaleNumber("1,000,000")).toBe(1000000);
      expect(parseLocaleNumber("1.000.000")).toBe(1000000);
    });

    it("should handle numbers with spaces", () => {
      expect(parseLocaleNumber("1 234 567")).toBe(1234567);
      expect(parseLocaleNumber("1 234 567.89")).toBe(1234567.89);
      expect(parseLocaleNumber("1 234 567,89")).toBe(1234567.89);
    });

    it("should handle negative numbers", () => {
      expect(parseLocaleNumber("-123")).toBe(-123);
      expect(parseLocaleNumber("-123.45")).toBe(-123.45);
      expect(parseLocaleNumber("-123,45")).toBe(-123.45);
    });
  });

  describe("ambiguous cases", () => {
    it("should treat dot as decimal when only dot present", () => {
      expect(parseLocaleNumber("123.45")).toBe(123.45);
    });

    it("should treat comma as decimal when only comma present", () => {
      expect(parseLocaleNumber("123,45")).toBe(123.45);
    });

    it("should use last separator as decimal when both present", () => {
      // US format: 1,234.56 -> dot is last, so dot is decimal
      expect(parseLocaleNumber("1,234.56")).toBe(1234.56);
      // German format: 1.234,56 -> comma is last, so comma is decimal
      expect(parseLocaleNumber("1.234,56")).toBe(1234.56);
    });
  });
});
