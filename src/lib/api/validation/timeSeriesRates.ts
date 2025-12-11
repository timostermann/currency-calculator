import type { TimeSeriesRatesResponse } from "@/lib/api/types";
import { isValidCurrencyCode } from "./currencyCode";
import { isValidISODate } from "./isoDate";
import { isValidExchangeRates } from "./exchangeRates";

export function validateTimeSeriesRatesResponse(
  data: unknown,
): data is TimeSeriesRatesResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const response = data as Partial<TimeSeriesRatesResponse>;

  if (
    typeof response.amount !== "number" ||
    response.amount <= 0 ||
    !isValidCurrencyCode(response.base) ||
    !isValidISODate(response.start_date) ||
    !isValidISODate(response.end_date)
  ) {
    return false;
  }

  if (typeof response.rates !== "object" || response.rates === null) {
    return false;
  }

  const ratesEntries = Object.entries(response.rates);
  if (ratesEntries.length === 0) return false;

  return ratesEntries.every(([date, rates]) => {
    return isValidISODate(date) && isValidExchangeRates(rates);
  });
}
