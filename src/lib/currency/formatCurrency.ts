import { getBrowserLocale } from "@/lib/locale";

export function formatCurrency(
  value: number,
  currency: string,
  locale: string = getBrowserLocale(),
  decimals: number = 2,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
