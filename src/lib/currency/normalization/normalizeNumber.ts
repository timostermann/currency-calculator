import { normalizeWithBothSeparators } from "./normalizeWithBothSeparators";
import { normalizeWithSingleSeparator } from "./normalizeWithSingleSeparator";

export function normalizeNumber(
  value: string,
  lastComma: number,
  lastDot: number,
): string | null {
  const hasComma = lastComma !== -1;
  const hasDot = lastDot !== -1;

  if (hasComma && hasDot)
    return normalizeWithBothSeparators(value, lastComma, lastDot);
  if (hasComma) return normalizeWithSingleSeparator(value, ",");
  if (hasDot) return normalizeWithSingleSeparator(value, ".");

  return value;
}
