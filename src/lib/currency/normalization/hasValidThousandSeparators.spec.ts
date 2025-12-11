import { hasValidThousandSeparators } from "./hasValidThousandSeparators";

describe("hasValidThousandSeparators", () => {
  describe("valid thousand separators", () => {
    it("should accept comma separators at correct intervals", () => {
      expect(hasValidThousandSeparators("1,234", ",")).toBe(true);
      expect(hasValidThousandSeparators("1,234,567", ",")).toBe(true);
      expect(hasValidThousandSeparators("12,345,678", ",")).toBe(true);
    });

    it("should accept dot separators at correct intervals", () => {
      expect(hasValidThousandSeparators("1.234", ".")).toBe(true);
      expect(hasValidThousandSeparators("1.234.567", ".")).toBe(true);
      expect(hasValidThousandSeparators("12.345.678", ".")).toBe(true);
    });
  });

  describe("invalid thousand separators", () => {
    it("should reject comma separators at incorrect intervals", () => {
      expect(hasValidThousandSeparators("12,34", ",")).toBe(false);
      expect(hasValidThousandSeparators("12,34,56", ",")).toBe(false);
      expect(hasValidThousandSeparators("1,23,456", ",")).toBe(false);
    });

    it("should reject dot separators at incorrect intervals", () => {
      expect(hasValidThousandSeparators("12.34", ".")).toBe(false);
      expect(hasValidThousandSeparators("12.34.56", ".")).toBe(false);
      expect(hasValidThousandSeparators("1.23.456", ".")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle single group (no actual thousands)", () => {
      expect(hasValidThousandSeparators("123", ",")).toBe(true);
    });

    it("should handle mixed valid/invalid in sequence", () => {
      expect(hasValidThousandSeparators("1,234,56", ",")).toBe(false);
      expect(hasValidThousandSeparators("1,23,567", ",")).toBe(false);
    });
  });
});
