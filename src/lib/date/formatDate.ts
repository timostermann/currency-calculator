export function formatDate(
  isoDateString: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
): string {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat(locale, options).format(date);
}
