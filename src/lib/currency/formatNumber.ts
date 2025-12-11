import { getBrowserLocale } from "@/lib/locale";

export function formatNumber(
  value: number,
  decimals = 4,
  locale?: string,
): string {
  const effectiveLocale = locale || getBrowserLocale();

  return new Intl.NumberFormat(effectiveLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
