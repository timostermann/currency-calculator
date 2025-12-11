import { describe, it, expect } from "vitest";
import { validateAmount } from "./validateAmount";

describe("validateAmount", () => {
  describe("empty/valid inputs", () => {
    it("should return undefined for empty string", () => {
      expect(validateAmount("")).toBeUndefined();
    });

    it("should return undefined for whitespace only", () => {
      expect(validateAmount("   ")).toBeUndefined();
    });

    it("should return undefined for valid number", () => {
      expect(validateAmount("123.45")).toBeUndefined();
    });
  });

  describe("invalid format", () => {
    it("should return error for non-numeric string", () => {
      expect(validateAmount("abc")).toBe("Please enter a valid number");
    });

    it("should return error for invalid format", () => {
      expect(validateAmount("12.34.56")).toBe("Please enter a valid number");
    });
  });

  describe("default bounds (0 to 1 billion)", () => {
    it("should accept zero", () => {
      expect(validateAmount("0")).toBeUndefined();
    });

    it("should accept positive numbers", () => {
      expect(validateAmount("100")).toBeUndefined();
      expect(validateAmount("1000")).toBeUndefined();
      expect(validateAmount("999999999")).toBeUndefined();
    });

    it("should reject negative numbers", () => {
      expect(validateAmount("-1")).toBe("Amount must be at least 0");
      expect(validateAmount("-100")).toBe("Amount must be at least 0");
    });

    it("should reject numbers over 1 billion", () => {
      expect(validateAmount("1000000001")).toBe("Amount is too large");
      expect(validateAmount("9999999999")).toBe("Amount is too large");
    });

    it("should accept numbers at the boundary", () => {
      expect(validateAmount("1000000000")).toBeUndefined();
    });
  });

  describe("custom bounds", () => {
    it("should respect custom minimum", () => {
      expect(validateAmount("5", { min: 10 })).toBe(
        "Amount must be at least 10",
      );
      expect(validateAmount("10", { min: 10 })).toBeUndefined();
      expect(validateAmount("15", { min: 10 })).toBeUndefined();
    });

    it("should respect custom maximum", () => {
      expect(validateAmount("100", { max: 50 })).toBe("Amount is too large");
      expect(validateAmount("50", { max: 50 })).toBeUndefined();
      expect(validateAmount("25", { max: 50 })).toBeUndefined();
    });

    it("should respect both custom min and max", () => {
      const options = { min: 10, max: 100 };
      expect(validateAmount("5", options)).toBe("Amount must be at least 10");
      expect(validateAmount("10", options)).toBeUndefined();
      expect(validateAmount("50", options)).toBeUndefined();
      expect(validateAmount("100", options)).toBeUndefined();
      expect(validateAmount("150", options)).toBe("Amount is too large");
    });
  });

  describe("locale formats", () => {
    it("should validate US format numbers", () => {
      expect(validateAmount("1,234.56")).toBeUndefined();
    });

    it("should validate German format numbers", () => {
      expect(validateAmount("1.234,56")).toBeUndefined();
    });

    it("should validate numbers with spaces", () => {
      expect(validateAmount("1 234 567")).toBeUndefined();
    });
  });
});
