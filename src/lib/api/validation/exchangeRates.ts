import type { ExchangeRates } from "@/lib/api/types";
import { isValidCurrencyCode } from "./currencyCode";

export function isValidExchangeRates(rates: unknown): rates is ExchangeRates {
  if (typeof rates !== "object" || rates === null) return false;

  const entries = Object.entries(rates);
  if (entries.length === 0) return false;

  return entries.every(([key, value]) => {
    return isValidCurrencyCode(key) && typeof value === "number" && value > 0;
  });
}
