function formatISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

import type { CurrencyCode, TimeSeriesRatesResponse } from "@/lib/api/types";
import type { FetchOptions } from "@/lib/api/utils/fetch";
import { fetchWithTimeout } from "@/lib/api/utils/fetch";
import { validateTimeSeriesRatesResponse } from "@/lib/api/validation/timeSeriesRates";

export async function getTimeSeriesRates(
  startDate: Date,
  endDate: Date,
  from: CurrencyCode = "USD",
  to: CurrencyCode[] = ["EUR", "CHF"],
  options: FetchOptions = {},
): Promise<TimeSeriesRatesResponse> {
  const start = formatISODate(startDate);
  const end = formatISODate(endDate);
  const currencies = to.join(",");
  const url = `/${start}..${end}?from=${from}&to=${currencies}`;

  const data = await fetchWithTimeout(url, options);

  if (!validateTimeSeriesRatesResponse(data)) {
    throw new Error("Invalid response format from API");
  }

  return data;
}
