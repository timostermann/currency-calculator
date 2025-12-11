export function hasValidThousandSeparators(
  value: string,
  separator: string,
): boolean {
  const parts = value.split(separator);
  return parts.slice(1).every((part) => part.length === 3);
}
