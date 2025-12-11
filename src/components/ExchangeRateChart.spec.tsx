import type { TimeSeriesRatesResponse } from "@/lib/api/types";
import { ExchangeRateChart } from "./ExchangeRateChart";

describe("ExchangeRateChart", () => {
  const mockData: TimeSeriesRatesResponse = {
    amount: 1,
    base: "USD",
    start_date: "2024-01-01",
    end_date: "2024-01-14",
    rates: {
      "2024-01-01": { EUR: 0.91, CHF: 0.85 },
      "2024-01-02": { EUR: 0.92, CHF: 0.86 },
      "2024-01-03": { EUR: 0.91, CHF: 0.85 },
      "2024-01-04": { EUR: 0.93, CHF: 0.87 },
      "2024-01-05": { EUR: 0.92, CHF: 0.86 },
      "2024-01-06": { EUR: 0.91, CHF: 0.85 },
      "2024-01-07": { EUR: 0.92, CHF: 0.86 },
      "2024-01-08": { EUR: 0.93, CHF: 0.87 },
      "2024-01-09": { EUR: 0.91, CHF: 0.85 },
      "2024-01-10": { EUR: 0.92, CHF: 0.86 },
      "2024-01-11": { EUR: 0.93, CHF: 0.87 },
      "2024-01-12": { EUR: 0.92, CHF: 0.86 },
      "2024-01-13": { EUR: 0.91, CHF: 0.85 },
      "2024-01-14": { EUR: 0.92, CHF: 0.86 },
    },
  };

  itPassesStandardComponentTests(<ExchangeRateChart data={mockData} />, {
    rules: {
      "no-inline-style": ["off"],
    },
  });
});
