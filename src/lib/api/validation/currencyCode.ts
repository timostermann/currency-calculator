import { CURRENCY_CODES } from "@/lib/api/types";
import type { CurrencyCode } from "@/lib/api/types";

export function isValidCurrencyCode(code: unknown): code is CurrencyCode {
  return (
    typeof code === "string" && CURRENCY_CODES.includes(code as CurrencyCode)
  );
}
