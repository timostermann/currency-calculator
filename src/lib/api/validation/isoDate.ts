export function isValidISODate(date: unknown): date is string {
  if (typeof date !== "string") return false;
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}
