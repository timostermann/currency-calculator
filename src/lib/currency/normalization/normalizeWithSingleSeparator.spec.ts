import { normalizeWithSingleSeparator } from "./normalizeWithSingleSeparator";

describe("normalizeWithSingleSeparator", () => {
  describe("single comma (decimal)", () => {
    it("should treat single comma as decimal separator", () => {
      expect(normalizeWithSingleSeparator("123,45", ",")).toBe("123.45");
      expect(normalizeWithSingleSeparator("1,5", ",")).toBe("1.5");
      expect(normalizeWithSingleSeparator("0,99", ",")).toBe("0.99");
    });
  });

  describe("single dot (already decimal)", () => {
    it("should keep single dot as-is", () => {
      expect(normalizeWithSingleSeparator("123.45", ".")).toBe("123.45");
      expect(normalizeWithSingleSeparator("1.5", ".")).toBe("1.5");
      expect(normalizeWithSingleSeparator("0.99", ".")).toBe("0.99");
    });
  });

  describe("multiple commas (thousands)", () => {
    it("should treat single comma as decimal (not thousands)", () => {
      // Note: Single separators are ambiguous, so we treat them as decimals
      expect(normalizeWithSingleSeparator("1,234", ",")).toBe("1.234");
    });

    it("should remove valid comma thousand separators", () => {
      expect(normalizeWithSingleSeparator("1,234,567", ",")).toBe("1234567");
      expect(normalizeWithSingleSeparator("12,345,678", ",")).toBe("12345678");
    });

    it("should reject invalid comma thousand separators", () => {
      // Single comma is treated as decimal, so this is actually "12.34"
      expect(normalizeWithSingleSeparator("12,34", ",")).toBe("12.34");
      expect(normalizeWithSingleSeparator("12,34,56", ",")).toBe(null);
      expect(normalizeWithSingleSeparator("1,23,456", ",")).toBe(null);
    });
  });

  describe("multiple dots (thousands)", () => {
    it("should treat single dot as decimal (not thousands)", () => {
      // Note: Single separators are ambiguous, so we keep dot as-is (decimal)
      expect(normalizeWithSingleSeparator("1.234", ".")).toBe("1.234");
    });

    it("should remove valid dot thousand separators", () => {
      expect(normalizeWithSingleSeparator("1.234.567", ".")).toBe("1234567");
      expect(normalizeWithSingleSeparator("12.345.678", ".")).toBe("12345678");
    });

    it("should reject invalid dot thousand separators", () => {
      // Single dot is kept as-is (decimal), so this is valid
      expect(normalizeWithSingleSeparator("12.34", ".")).toBe("12.34");
      expect(normalizeWithSingleSeparator("12.34.56", ".")).toBe(null);
      expect(normalizeWithSingleSeparator("1.23.456", ".")).toBe(null);
    });
  });
});
