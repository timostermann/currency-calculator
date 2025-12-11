import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  describe("default locale (set to de-DE in test setup)", () => {
    it("should format with 4 decimals by default", () => {
      expect(formatNumber(0.8596, 4, "de-DE")).toBe("0,8596");
      expect(formatNumber(0.8042, 4, "de-DE")).toBe("0,8042");
    });

    it("should format with custom decimals", () => {
      expect(formatNumber(1.23456, 2, "de-DE")).toBe("1,23");
      expect(formatNumber(1.23456, 3, "de-DE")).toBe("1,235");
      expect(formatNumber(1.23456, 5, "de-DE")).toBe("1,23456");
    });

    it("should handle integers", () => {
      expect(formatNumber(100, 4, "de-DE")).toBe("100,0000");
      expect(formatNumber(1000, 2, "de-DE")).toBe("1.000,00");
    });

    it("should handle large numbers", () => {
      expect(formatNumber(123456.789, 2, "de-DE")).toBe("123.456,79");
      expect(formatNumber(1234567.89, 4, "de-DE")).toBe("1.234.567,8900");
    });

    it("should handle zero", () => {
      expect(formatNumber(0, 4, "de-DE")).toBe("0,0000");
      expect(formatNumber(0, 2, "de-DE")).toBe("0,00");
    });
  });

  describe("with explicit US locale", () => {
    it("should format with dot as decimal separator", () => {
      expect(formatNumber(0.8596, 4, "en-US")).toBe("0.8596");
      expect(formatNumber(1234.56, 2, "en-US")).toBe("1,234.56");
    });
  });

  describe("edge cases", () => {
    it("should handle very small numbers", () => {
      expect(formatNumber(0.0001, 4, "de-DE")).toBe("0,0001");
      expect(formatNumber(0.000001, 6, "de-DE")).toBe("0,000001");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-123.45, 2, "de-DE")).toBe("-123,45");
      expect(formatNumber(-0.8596, 4, "de-DE")).toBe("-0,8596");
    });
  });
});
