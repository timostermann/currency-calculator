import type {
  TimeSeriesRatesResponse,
  TimeSeriesDataPoint,
} from "@/lib/api/types";

export function parseTimeSeriesData(
  response: TimeSeriesRatesResponse,
): TimeSeriesDataPoint[] {
  return Object.entries(response.rates)
    .map(([date, rates]) => ({
      date,
      rates,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
