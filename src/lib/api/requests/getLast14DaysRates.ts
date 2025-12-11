import type { CurrencyCode, TimeSeriesRatesResponse } from "@/lib/api/types";
import type { FetchOptions } from "@/lib/api/utils/fetch";
import { getTimeSeriesRates } from "./getTimeSeriesRates";

export async function getLast14DaysRates(
  from: CurrencyCode = "USD",
  to: CurrencyCode[] = ["EUR", "CHF"],
  options: FetchOptions = {},
): Promise<TimeSeriesRatesResponse> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 14);

  return getTimeSeriesRates(startDate, endDate, from, to, options);
}
