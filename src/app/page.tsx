import { getLatestRates, getLast14DaysRates } from "@/lib/api";
import { ExchangeRateChart } from "@/components/ExchangeRateChart";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";

export default async function Home() {
  const [ratesData, timeSeriesData] = await Promise.all([
    getLatestRates("USD", ["EUR", "CHF"]),
    getLast14DaysRates("USD", ["EUR", "CHF"]),
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-950 to-gray-800 p-4">
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Currency Calculator</h1>
          <p className="mt-2 text-lg text-gray-300">
            USD to EUR & CHF Exchange Rates
          </p>
        </div>

        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              Current Exchange Rates
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Last updated: {ratesData.date}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-700 bg-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    USD to EUR
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {ratesData.rates.EUR?.toFixed(4) ?? "N/A"}
                  </p>
                </div>
                <div className="text-4xl">🇪🇺</div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    USD to CHF
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {ratesData.rates.CHF?.toFixed(4) ?? "N/A"}
                  </p>
                </div>
                <div className="text-4xl">🇨🇭</div>
              </div>
            </div>
          </div>
        </div>

        <CurrencyCalculator rates={ratesData.rates} />

        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              14-Day Exchange Rate Trend
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Historical rates from {timeSeriesData.start_date} to{" "}
              {timeSeriesData.end_date}
            </p>
          </div>

          <ExchangeRateChart data={timeSeriesData} />
        </div>
      </main>
    </div>
  );
}
