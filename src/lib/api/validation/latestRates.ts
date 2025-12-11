import type { LatestRatesResponse } from "@/lib/api/types";
import { isValidCurrencyCode } from "./currencyCode";
import { isValidISODate } from "./isoDate";
import { isValidExchangeRates } from "./exchangeRates";

export function validateLatestRatesResponse(
  data: unknown,
): data is LatestRatesResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const response = data as Partial<LatestRatesResponse>;

  return (
    typeof response.amount === "number" &&
    response.amount > 0 &&
    isValidCurrencyCode(response.base) &&
    isValidISODate(response.date) &&
    isValidExchangeRates(response.rates)
  );
}
