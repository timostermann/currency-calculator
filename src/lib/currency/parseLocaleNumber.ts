import { normalizeNumber } from "./normalization/normalizeNumber";

export function parseLocaleNumber(value: string): number | null {
  if (!value || value.trim() === "") return null;

  const cleaned = value.replace(/\s/g, "");
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");

  const normalized = normalizeNumber(cleaned, lastComma, lastDot);

  if (!normalized || !/^-?\d+(\.\d+)?$/.test(normalized)) return null;

  const parsed = parseFloat(normalized);

  if (isNaN(parsed)) return null;
  return parsed;
}
