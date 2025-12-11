import { parseLocaleNumber } from "@/lib/currency/parseLocaleNumber";

export function validateAmount(
  value: string,
  options: {
    min?: number;
    max?: number;
  } = {},
): string | undefined {
  const { min = 0, max = 1_000_000_000 } = options;

  if (!value || value.trim() === "") return undefined;

  const parsed = parseLocaleNumber(value);

  if (parsed === null) return "Please enter a valid number";
  if (parsed < min) return `Amount must be at least ${min}`;
  if (parsed > max) return "Amount is too large";

  return undefined;
}
