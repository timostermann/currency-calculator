export function getBrowserLocale(): string {
  if (typeof window === "undefined") return "en-US";
  if (!navigator.language && !navigator.languages) return "en-US";
  if (navigator.languages && navigator.languages[0])
    return navigator.languages[0];
  if (navigator.language) return navigator.language;
  return "en-US";
}
