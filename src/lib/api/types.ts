export const CURRENCY_CODES = ["USD", "EUR", "CHF"] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export type ExchangeRates = Partial<Record<CurrencyCode, number>>;

export type LatestRatesResponse = {
  amount: number;
  base: CurrencyCode;
  date: string; // ISO date string (YYYY-MM-DD)
  rates: ExchangeRates;
};

export type TimeSeriesRatesResponse = {
  amount: number;
  base: CurrencyCode;
  start_date: string; // ISO date string (YYYY-MM-DD)
  end_date: string; // ISO date string (YYYY-MM-DD)
  rates: {
    [date: string]: ExchangeRates; // date in YYYY-MM-DD format
  };
};

export type TimeSeriesDataPoint = {
  date: string;
  rates: ExchangeRates;
};
