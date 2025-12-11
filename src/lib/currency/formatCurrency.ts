import { getBrowserLocale } from "@/lib/locale";

export function formatCurrency(
  value: number,
  currency: string,
  locale?: string,
  decimals?: number,
): string {
  const effectiveLocale = locale || getBrowserLocale();
  const effectiveDecimals = decimals ?? 2;

  return new Intl.NumberFormat(effectiveLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: effectiveDecimals,
    maximumFractionDigits: effectiveDecimals,
  }).format(value);
}
