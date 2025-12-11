import { describe, it, expect, vi, afterEach } from "vitest";
import type { TimeSeriesRatesResponse } from "@/lib/api/types";
import { getTimeSeriesRates } from "./getTimeSeriesRates";

describe("getTimeSeriesRates", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should fetch time series rates successfully", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
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

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    const result = await getTimeSeriesRates(startDate, endDate, "USD", [
      "EUR",
      "CHF",
    ]);

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/2025-10-30..2025-11-13?from=USD&to=EUR,CHF",
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("should use custom base URL when provided", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "2025-10-30",
      end_date: "2025-11-13",
      rates: {
        "2025-10-30": { EUR: 0.8658 },
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    await getTimeSeriesRates(startDate, endDate, "USD", ["EUR"], {
      baseUrl: "https://custom.api.com",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://custom.api.com/2025-10-30..2025-11-13?from=USD&to=EUR",
      expect.any(Object),
    );
  });

  it("should throw error on HTTP error", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    await expect(
      getTimeSeriesRates(startDate, endDate, "USD", ["EUR"]),
    ).rejects.toThrow("HTTP 400: Bad Request");
  });

  it("should throw error on invalid response", async () => {
    const invalidResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "invalid",
      end_date: "2025-11-13",
      rates: {},
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => invalidResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    await expect(
      getTimeSeriesRates(startDate, endDate, "USD", ["EUR"]),
    ).rejects.toThrow("Invalid response format from API");
  });

  it("should throw error on timeout", async () => {
    const mockFetch = vi.fn().mockImplementation(
      (_url, options) =>
        new Promise((_resolve, reject) => {
          options.signal.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    await expect(
      getTimeSeriesRates(startDate, endDate, "USD", ["EUR"], { timeout: 10 }),
    ).rejects.toThrow("Request timeout after 10ms");
  });

  it("should format dates correctly", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "2025-01-01",
      end_date: "2025-01-03",
      rates: {
        "2025-01-01": { EUR: 0.8658 },
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-01-01T10:30:00Z");
    const endDate = new Date("2025-01-03T15:45:00Z");

    await getTimeSeriesRates(startDate, endDate, "USD", ["EUR"]);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/2025-01-01..2025-01-03?from=USD&to=EUR",
      expect.any(Object),
    );
  });

  it("should use custom from currency when provided", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "EUR",
      start_date: "2025-10-30",
      end_date: "2025-11-13",
      rates: {
        "2025-10-30": { USD: 1.1658, CHF: 0.93565 },
        "2025-10-31": { USD: 1.16379, CHF: 0.9355 },
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const startDate = new Date("2025-10-30");
    const endDate = new Date("2025-11-13");

    await getTimeSeriesRates(startDate, endDate, "EUR", ["USD", "CHF"]);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/2025-10-30..2025-11-13?from=EUR&to=USD,CHF",
      expect.any(Object),
    );
  });
});
