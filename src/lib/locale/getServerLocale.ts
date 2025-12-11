"server-only";

import { headers } from "next/headers";

export async function getServerLocale(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (!acceptLanguage) {
    return "en-US";
  }

  const locales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1]) : 1.0;
      return { locale: locale.trim(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  return locales[0]?.locale || "en-US";
}
