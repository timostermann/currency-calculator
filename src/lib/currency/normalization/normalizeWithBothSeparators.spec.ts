import { describe, it, expect } from "vitest";
import { normalizeWithBothSeparators } from "./normalizeWithBothSeparators";

describe("normalizeWithBothSeparators", () => {
  describe("German format (comma is decimal)", () => {
    it("should normalize when comma comes after dot", () => {
      const value = "1.234,56";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "1234.56",
      );
    });

    it("should handle multiple thousand separators", () => {
      const value = "1.234.567,89";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "1234567.89",
      );
    });
  });

  describe("US format (dot is decimal)", () => {
    it("should normalize when dot comes after comma", () => {
      const value = "1,234.56";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "1234.56",
      );
    });

    it("should handle multiple thousand separators", () => {
      const value = "1,234,567.89";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "1234567.89",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle small numbers", () => {
      const value = "1,2.3";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "12.3",
      );
    });

    it("should handle when separators are adjacent", () => {
      const value = "1,.23";
      const lastComma = value.lastIndexOf(",");
      const lastDot = value.lastIndexOf(".");
      expect(normalizeWithBothSeparators(value, lastComma, lastDot)).toBe(
        "1.23",
      );
    });
  });
});
