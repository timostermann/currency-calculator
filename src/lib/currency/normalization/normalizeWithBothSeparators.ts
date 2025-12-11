export function normalizeWithBothSeparators(
  value: string,
  lastComma: number,
  lastDot: number,
): string {
  if (lastComma > lastDot) return value.replace(/\./g, "").replace(",", ".");
  return value.replace(/,/g, "");
}
