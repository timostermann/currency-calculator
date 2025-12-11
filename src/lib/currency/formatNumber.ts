import { getBrowserLocale } from "@/lib/locale";

export function formatNumber(
  value: number,
  decimals: number = 4,
  locale: string = getBrowserLocale(),
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
