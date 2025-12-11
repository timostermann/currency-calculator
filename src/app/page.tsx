import { getLatestRates } from "@/lib/api";

export default async function Home() {
  const ratesData = await getLatestRates("USD", ["EUR", "CHF"]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-950 dark:to-gray-800">
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Currency Calculator
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            USD to EUR & CHF Exchange Rates
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Current Exchange Rates
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {ratesData.date}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    USD to EUR
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {ratesData.rates.EUR?.toFixed(4) ?? "N/A"}
                  </p>
                </div>
                <div className="text-4xl">🇪🇺</div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    USD to CHF
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {ratesData.rates.CHF?.toFixed(4) ?? "N/A"}
                  </p>
                </div>
                <div className="text-4xl">🇨🇭</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
