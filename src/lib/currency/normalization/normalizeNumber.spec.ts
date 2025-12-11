import { normalizeNumber } from "./normalizeNumber";

describe("normalizeNumber", () => {
  describe("both separators present", () => {
    it("should normalize German format", () => {
      expect(normalizeNumber("1.234,56", 5, 1)).toBe("1234.56");
      expect(normalizeNumber("1.234.567,89", 9, 5)).toBe("1234567.89");
    });

    it("should normalize US format", () => {
      expect(normalizeNumber("1,234.56", 1, 5)).toBe("1234.56");
      expect(normalizeNumber("1,234,567.89", 5, 9)).toBe("1234567.89");
    });
  });

  describe("only comma present", () => {
    it("should normalize single comma as decimal", () => {
      expect(normalizeNumber("123,45", 3, -1)).toBe("123.45");
    });

    it("should normalize multiple commas as thousands", () => {
      expect(normalizeNumber("1,234,567", 5, -1)).toBe("1234567");
    });

    it("should return null for invalid comma placement", () => {
      expect(normalizeNumber("12,34,56", 5, -1)).toBe(null);
    });
  });

  describe("only dot present", () => {
    it("should keep single dot as-is", () => {
      expect(normalizeNumber("123.45", -1, 3)).toBe("123.45");
    });

    it("should normalize multiple dots as thousands", () => {
      expect(normalizeNumber("1.234.567", -1, 5)).toBe("1234567");
    });

    it("should return null for invalid dot placement", () => {
      expect(normalizeNumber("12.34.56", -1, 5)).toBe(null);
    });
  });

  describe("no separators", () => {
    it("should return value as-is", () => {
      expect(normalizeNumber("12345", -1, -1)).toBe("12345");
      expect(normalizeNumber("1", -1, -1)).toBe("1");
    });
  });
});
