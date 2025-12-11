import type { TimeSeriesRatesResponse } from "@/lib/api/types";
import { parseTimeSeriesData } from "./parseTimeSeriesData";

describe("parseTimeSeriesData", () => {
  it("should parse time series response into sorted data points", () => {
    const response: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "2025-10-30",
      end_date: "2025-11-03",
      rates: {
        "2025-11-03": { CHF: 0.80754, EUR: 0.86851 },
        "2025-10-30": { CHF: 0.80355, EUR: 0.8658 },
        "2025-10-31": { CHF: 0.80379, EUR: 0.8655 },
      },
    };

    const result = parseTimeSeriesData(response);

    expect(result).toHaveLength(3);
    expect(result[0].date).toBe("2025-10-30");
    expect(result[1].date).toBe("2025-10-31");
    expect(result[2].date).toBe("2025-11-03");
    expect(result[0].rates).toEqual({ CHF: 0.80355, EUR: 0.8658 });
    expect(result[1].rates).toEqual({ CHF: 0.80379, EUR: 0.8655 });
    expect(result[2].rates).toEqual({ CHF: 0.80754, EUR: 0.86851 });
  });

  it("should handle single data point", () => {
    const response: TimeSeriesRatesResponse = {
      amount: 1.0,
      base: "USD",
      start_date: "2025-10-30",
      end_date: "2025-10-30",
      rates: {
        "2025-10-30": { EUR: 0.8658 },
      },
    };

    const result = parseTimeSeriesData(response);

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe("2025-10-30");
    expect(result[0].rates).toEqual({ EUR: 0.8658 });
  });
});
