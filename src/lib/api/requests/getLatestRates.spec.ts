import { describe, it, expect, vi, afterEach } from "vitest";
import type { LatestRatesResponse } from "@/lib/api/types";
import { getLatestRates } from "./getLatestRates";

describe("getLatestRates", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should fetch latest rates successfully", async () => {
    const mockResponse: LatestRatesResponse = {
      amount: 1.0,
      base: "USD",
      date: "2025-12-10",
      rates: {
        CHF: 0.80419,
        EUR: 0.85955,
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const result = await getLatestRates("USD", ["EUR", "CHF"]);

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/latest?from=USD&to=EUR,CHF",
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("should use custom base URL when provided", async () => {
    const mockResponse: LatestRatesResponse = {
      amount: 1.0,
      base: "USD",
      date: "2025-12-10",
      rates: { EUR: 0.85955 },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    await getLatestRates("USD", ["EUR"], {
      baseUrl: "https://custom.api.com",
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://custom.api.com/latest?from=USD&to=EUR",
      expect.any(Object),
    );
  });

  it("should throw error on HTTP error", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    vi.stubGlobal("fetch", mockFetch);

    await expect(getLatestRates("USD", ["EUR"])).rejects.toThrow(
      "HTTP 404: Not Found",
    );
  });

  it("should throw error on invalid response", async () => {
    const invalidResponse = {
      amount: 1.0,
      base: "INVALID",
      date: "2025-12-10",
      rates: {},
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => invalidResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    await expect(getLatestRates("USD", ["EUR"])).rejects.toThrow(
      "Invalid response format from API",
    );
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

    await expect(
      getLatestRates("USD", ["EUR"], { timeout: 10 }),
    ).rejects.toThrow("Request timeout after 10ms");
  });

  it("should throw error on network error", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));

    vi.stubGlobal("fetch", mockFetch);

    await expect(getLatestRates("USD", ["EUR"])).rejects.toThrow(
      "Network error",
    );
  });

  it("should handle default currency parameters", async () => {
    const mockResponse: LatestRatesResponse = {
      amount: 1.0,
      base: "USD",
      date: "2025-12-10",
      rates: { EUR: 0.85955, CHF: 0.80419 },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    await getLatestRates();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/latest?from=USD&to=EUR,CHF",
      expect.any(Object),
    );
  });

  it("should use custom from currency when provided", async () => {
    const mockResponse: LatestRatesResponse = {
      amount: 1.0,
      base: "EUR",
      date: "2025-12-10",
      rates: { USD: 1.16355, CHF: 0.93565 },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    await getLatestRates("EUR", ["USD", "CHF"]);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.frankfurter.app/latest?from=EUR&to=USD,CHF",
      expect.any(Object),
    );
  });
});
