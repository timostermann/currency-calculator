import type { TimeSeriesRatesResponse } from "@/lib/api/types";
import { getLast14DaysRates } from "./getLast14DaysRates";

describe("getLast14DaysRates", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should fetch last 14 days of rates", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "2025-11-26",
      end_date: "2025-12-10",
      rates: {
        "2025-11-26": { EUR: 0.8658, CHF: 0.8035 },
        "2025-12-10": { EUR: 0.85955, CHF: 0.80419 },
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const result = await getLast14DaysRates("USD", ["EUR", "CHF"]);

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalled();

    const call = mockFetch.mock.calls[0][0] as string;
    const match = call.match(/(\d{4}-\d{2}-\d{2})\.\.(\d{4}-\d{2}-\d{2})/);
    expect(match).toBeTruthy();

    if (match) {
      const startDate = new Date(match[1]);
      const endDate = new Date(match[2]);
      const diffDays = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      // eslint-disable-next-line vitest/no-conditional-expect
      expect(diffDays).toBe(14);
    }
  });

  it("should use custom from currency when provided", async () => {
    const mockResponse: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "EUR",
      start_date: "2025-11-26",
      end_date: "2025-12-10",
      rates: {
        "2025-11-26": { USD: 1.1658, CHF: 0.93565 },
        "2025-12-10": { USD: 1.16355, CHF: 0.9365 },
      },
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    vi.stubGlobal("fetch", mockFetch);

    const result = await getLast14DaysRates("EUR", ["USD", "CHF"]);

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalled();

    const call = mockFetch.mock.calls[0][0] as string;
    expect(call).toContain("from=EUR");
    expect(call).toContain("to=USD,CHF");
  });
});
