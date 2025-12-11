import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  const testDate = "2025-12-10";

  describe("with German locale", () => {
    it("should format date in German (numeric format)", () => {
      const result = formatDate(testDate, "de");
      expect(result).toBe("10.12.2025");
    });

    it("should format date in German with de-DE locale", () => {
      const result = formatDate(testDate, "de-DE");
      expect(result).toBe("10.12.2025");
    });
  });

  describe("with English locale", () => {
    it("should format date in US English", () => {
      const result = formatDate(testDate, "en-US");
      expect(result).toBe("12/10/2025");
    });

    it("should format date in British English", () => {
      const result = formatDate(testDate, "en-GB");
      expect(result).toBe("10/12/2025");
    });
  });

  describe("with other locales", () => {
    it("should format date in French", () => {
      const result = formatDate(testDate, "fr");
      expect(result).toBe("10/12/2025");
    });

    it("should format date in Spanish", () => {
      const result = formatDate(testDate, "es");
      expect(result).toBe("10/12/2025");
    });

    it("should format date in Japanese", () => {
      const result = formatDate(testDate, "ja");
      expect(result).toBe("2025/12/10");
    });
  });

  describe("with custom options", () => {
    it("should format with short month", () => {
      const result = formatDate(testDate, "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      expect(result).toBe("Dec 10, 2025");
    });

    it("should format with numeric month", () => {
      const result = formatDate(testDate, "en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      expect(result).toBe("12/10/2025");
    });

    it("should format with 2-digit values", () => {
      const result = formatDate(testDate, "en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      expect(result).toBe("12/10/2025");
    });

    it("should format date only without year", () => {
      const result = formatDate(testDate, "en-US", {
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("December 10");
    });

    it("should format with weekday", () => {
      const result = formatDate(testDate, "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("Wednesday, December 10, 2025");
    });
  });

  describe("with different dates", () => {
    it("should format start of year", () => {
      const result = formatDate("2025-01-01", "en-US");
      expect(result).toBe("1/1/2025");
    });

    it("should format end of year", () => {
      const result = formatDate("2025-12-31", "en-US");
      expect(result).toBe("12/31/2025");
    });

    it("should format leap year date", () => {
      const result = formatDate("2024-02-29", "en-US");
      expect(result).toBe("2/29/2024");
    });
  });

  describe("without locale parameter", () => {
    it("should default to en-US format", () => {
      const result = formatDate(testDate);
      expect(result).toBe("12/10/2025");
    });
  });

  describe("edge cases", () => {
    it("should handle dates with time component", () => {
      const result = formatDate("2025-12-10T14:30:00Z", "en-US");
      expect(result).toBe("12/10/2025");
    });

    it("should handle old dates", () => {
      const result = formatDate("1990-05-15", "en-US");
      expect(result).toBe("5/15/1990");
    });

    it("should handle future dates", () => {
      const result = formatDate("2099-01-01", "en-US");
      expect(result).toBe("1/1/2099");
    });
  });
});
