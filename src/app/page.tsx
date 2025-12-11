import { getLatestRates, getLast14DaysRates } from "@/lib/api";
import { ExchangeRateChart } from "@/components/ExchangeRateChart";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";
import { getServerLocale } from "@/lib/locale/getServerLocale";
import { formatNumber } from "@/lib/currency";
import { formatDate } from "@/lib/date";

export default async function Home() {
  const [ratesData, timeSeriesData, locale] = await Promise.all([
    getLatestRates("USD", ["EUR", "CHF"]),
    getLast14DaysRates("USD", ["EUR", "CHF"]),
    getServerLocale(),
  ]);

  return (
    <>
      <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Current Exchange Rates
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Last updated: {formatDate(ratesData.date, locale)}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700 bg-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">USD to EUR</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {ratesData.rates.EUR
                    ? formatNumber(ratesData.rates.EUR, 4, locale)
                    : "N/A"}
                </p>
              </div>
              <div className="text-4xl">🇪🇺</div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">USD to CHF</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {ratesData.rates.CHF
                    ? formatNumber(ratesData.rates.CHF, 4, locale)
                    : "N/A"}
                </p>
              </div>
              <div className="text-4xl">🇨🇭</div>
            </div>
          </div>
        </div>
      </div>

      <CurrencyCalculator rates={ratesData.rates} locale={locale} />

      <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            14-Day Exchange Rate Trend
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Historical rates from{" "}
            {formatDate(timeSeriesData.start_date, locale)} to{" "}
            {formatDate(timeSeriesData.end_date, locale)}
          </p>
        </div>

        <ExchangeRateChart data={timeSeriesData} />
      </div>
    </>
  );
}
