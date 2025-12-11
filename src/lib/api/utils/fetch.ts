export type FetchOptions = {
  baseUrl?: string;
  timeout?: number;
};

const BASE_URL = "https://api.frankfurter.app";
const DEFAULT_TIMEOUT = 10000;

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {},
): Promise<unknown> {
  const { baseUrl = BASE_URL, timeout = DEFAULT_TIMEOUT } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(
      url.startsWith("http") ? url : `${baseUrl}${url}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    const isAbortError =
      (error instanceof Error && error.name === "AbortError") ||
      (error instanceof DOMException && error.name === "AbortError") ||
      (error instanceof Error && error.message === "Aborted");

    if (isAbortError) {
      throw new Error(`Request timeout after ${timeout}ms`);
    }

    throw error;
  }
}
