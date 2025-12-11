import { isValidCurrencyCode } from "./currencyCode";
import { isValidISODate } from "./isoDate";
import { isValidExchangeRates } from "./exchangeRates";
import { validateLatestRatesResponse } from "./latestRates";
import { validateTimeSeriesRatesResponse } from "./timeSeriesRates";

describe("validation", () => {
  describe("isValidCurrencyCode", () => {
    it("should validate valid currency codes", () => {
      expect(isValidCurrencyCode("USD")).toBe(true);
      expect(isValidCurrencyCode("EUR")).toBe(true);
      expect(isValidCurrencyCode("CHF")).toBe(true);
    });

    it("should reject invalid currency codes", () => {
      expect(isValidCurrencyCode("GBP")).toBe(false);
      expect(isValidCurrencyCode("usd")).toBe(false);
      expect(isValidCurrencyCode("")).toBe(false);
      expect(isValidCurrencyCode(123)).toBe(false);
      expect(isValidCurrencyCode(null)).toBe(false);
      expect(isValidCurrencyCode(undefined)).toBe(false);
    });
  });

  describe("isValidISODate", () => {
    it("should validate valid ISO date strings", () => {
      expect(isValidISODate("2025-12-10")).toBe(true);
      expect(isValidISODate("2025-01-01")).toBe(true);
      expect(isValidISODate("2025-12-31")).toBe(true);
    });

    it("should reject invalid date strings", () => {
      expect(isValidISODate("2025-13-01")).toBe(false);
      expect(isValidISODate("2025-12-32")).toBe(false);
      expect(isValidISODate("25-12-10")).toBe(false);
      expect(isValidISODate("2025/12/10")).toBe(false);
      expect(isValidISODate("not-a-date")).toBe(false);
      expect(isValidISODate("")).toBe(false);
      expect(isValidISODate(123)).toBe(false);
      expect(isValidISODate(null)).toBe(false);
      expect(isValidISODate(undefined)).toBe(false);
    });
  });

  describe("isValidExchangeRates", () => {
    it("should validate valid exchange rates", () => {
      expect(isValidExchangeRates({ EUR: 0.85955, CHF: 0.80419 })).toBe(true);
      expect(isValidExchangeRates({ EUR: 1.0 })).toBe(true);
      expect(isValidExchangeRates({ USD: 1, EUR: 0.85955 })).toBe(true);
    });

    it("should reject invalid exchange rates", () => {
      expect(isValidExchangeRates({})).toBe(false);
      expect(isValidExchangeRates({ GBP: 0.75 })).toBe(false);
      expect(isValidExchangeRates({ EUR: -0.85 })).toBe(false);
      expect(isValidExchangeRates({ EUR: 0 })).toBe(false);
      expect(isValidExchangeRates({ EUR: "0.85" })).toBe(false);
      expect(isValidExchangeRates(null)).toBe(false);
      expect(isValidExchangeRates(undefined)).toBe(false);
      expect(isValidExchangeRates("not an object")).toBe(false);
    });
  });

  describe("validateLatestRatesResponse", () => {
    it("should validate valid response", () => {
      const validResponse = {
        amount: 1.0,
        base: "USD",
        date: "2025-12-10",
        rates: {
          EUR: 0.85955,
          CHF: 0.80419,
        },
      };

      expect(validateLatestRatesResponse(validResponse)).toBe(true);
    });

    it("should reject response with invalid amount", () => {
      expect(
        validateLatestRatesResponse({
          amount: -1,
          base: "USD",
          date: "2025-12-10",
          rates: { EUR: 0.85955 },
        }),
      ).toBe(false);

      expect(
        validateLatestRatesResponse({
          amount: "1.0",
          base: "USD",
          date: "2025-12-10",
          rates: { EUR: 0.85955 },
        }),
      ).toBe(false);
    });

    it("should reject response with invalid base currency", () => {
      expect(
        validateLatestRatesResponse({
          amount: 1.0,
          base: "GBP",
          date: "2025-12-10",
          rates: { EUR: 0.85955 },
        }),
      ).toBe(false);
    });

    it("should reject response with invalid date", () => {
      expect(
        validateLatestRatesResponse({
          amount: 1.0,
          base: "USD",
          date: "invalid-date",
          rates: { EUR: 0.85955 },
        }),
      ).toBe(false);
    });

    it("should reject response with invalid rates", () => {
      expect(
        validateLatestRatesResponse({
          amount: 1.0,
          base: "USD",
          date: "2025-12-10",
          rates: {},
        }),
      ).toBe(false);

      expect(
        validateLatestRatesResponse({
          amount: 1.0,
          base: "USD",
          date: "2025-12-10",
          rates: { EUR: -0.85955 },
        }),
      ).toBe(false);
    });

    it("should reject null, undefined, and non-objects", () => {
      expect(validateLatestRatesResponse(null)).toBe(false);
      expect(validateLatestRatesResponse(undefined)).toBe(false);
      expect(validateLatestRatesResponse("not an object")).toBe(false);
      expect(validateLatestRatesResponse(123)).toBe(false);
    });
  });

  describe("validateTimeSeriesRatesResponse", () => {
    it("should validate valid response", () => {
      const validResponse = {
        amount: 1.0,
        base: "USD",
        start_date: "2025-10-30",
        end_date: "2025-11-13",
        rates: {
          "2025-10-30": { CHF: 0.80355, EUR: 0.8658 },
          "2025-10-31": { CHF: 0.80379, EUR: 0.8655 },
          "2025-11-03": { CHF: 0.80754, EUR: 0.86851 },
        },
      };

      expect(validateTimeSeriesRatesResponse(validResponse)).toBe(true);
    });

    it("should reject response with invalid amount", () => {
      expect(
        validateTimeSeriesRatesResponse({
          amount: 0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "2025-11-13",
          rates: { "2025-10-30": { EUR: 0.8658 } },
        }),
      ).toBe(false);
    });

    it("should reject response with invalid dates", () => {
      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "invalid-date",
          end_date: "2025-11-13",
          rates: { "2025-10-30": { EUR: 0.8658 } },
        }),
      ).toBe(false);

      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "not-a-date",
          rates: { "2025-10-30": { EUR: 0.8658 } },
        }),
      ).toBe(false);
    });

    it("should reject response with empty rates", () => {
      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "2025-11-13",
          rates: {},
        }),
      ).toBe(false);
    });

    it("should reject response with invalid rate dates", () => {
      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "2025-11-13",
          rates: {
            "invalid-date": { EUR: 0.8658 },
          },
        }),
      ).toBe(false);
    });

    it("should reject response with invalid rate values", () => {
      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "2025-11-13",
          rates: {
            "2025-10-30": {},
          },
        }),
      ).toBe(false);

      expect(
        validateTimeSeriesRatesResponse({
          amount: 1.0,
          base: "USD",
          start_date: "2025-10-30",
          end_date: "2025-11-13",
          rates: {
            "2025-10-30": { EUR: -0.8658 },
          },
        }),
      ).toBe(false);
    });

    it("should reject null, undefined, and non-objects", () => {
      expect(validateTimeSeriesRatesResponse(null)).toBe(false);
      expect(validateTimeSeriesRatesResponse(undefined)).toBe(false);
      expect(validateTimeSeriesRatesResponse("not an object")).toBe(false);
    });
  });
});
