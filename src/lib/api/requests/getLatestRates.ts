import type { CurrencyCode, LatestRatesResponse } from "@/lib/api/types";
import type { FetchOptions } from "@/lib/api/utils/fetch";
import { fetchWithTimeout } from "@/lib/api/utils/fetch";
import { validateLatestRatesResponse } from "@/lib/api/validation/latestRates";

export async function getLatestRates(
  from: CurrencyCode = "USD",
  to: CurrencyCode[] = ["EUR", "CHF"],
  options: FetchOptions = {},
): Promise<LatestRatesResponse> {
  const currencies = to.join(",");
  const url = `/latest?from=${from}&to=${currencies}`;

  const data = await fetchWithTimeout(url, options);

  if (!validateLatestRatesResponse(data)) {
    throw new Error("Invalid response format from API");
  }

  return data;
}
