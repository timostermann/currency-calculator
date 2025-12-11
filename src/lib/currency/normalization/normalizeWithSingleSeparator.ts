import { hasValidThousandSeparators } from "./hasValidThousandSeparators";

export function normalizeWithSingleSeparator(
  value: string,
  separator: string,
): string | null {
  const count = (value.match(new RegExp(`\\${separator}`, "g")) || []).length;

  if (count === 1 && separator === ",") return value.replace(",", ".");
  if (count === 1) return value;

  if (!hasValidThousandSeparators(value, separator)) return null;

  return value.replace(new RegExp(`\\${separator}`, "g"), "");
}
