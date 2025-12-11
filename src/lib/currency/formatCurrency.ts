/**
 * Format a number as currency using Intl.NumberFormat
 * @param value - The number to format
 * @param currency - The currency code (e.g., "EUR", "USD", "CHF")
 * @param locale - The locale to use for formatting (defaults to "de-DE")
 * @returns The formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: string,
  locale = "de-DE",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
