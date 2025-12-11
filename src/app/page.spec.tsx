import { render, screen } from "@testing-library/react/pure";
import { vi } from "vitest";
import type {
  LatestRatesResponse,
  TimeSeriesRatesResponse,
} from "@/lib/api/types";
import { getLatestRates, getLast14DaysRates } from "@/lib/api";
import { getServerLocale } from "@/lib/locale/getServerLocale";
import Home from "./page";

vi.mock("@/lib/api", () => ({
  getLatestRates: vi.fn(),
  getLast14DaysRates: vi.fn(),
}));
vi.mock("@/lib/locale/getServerLocale", () => ({
  getServerLocale: vi.fn(),
}));

describe("Home Page", () => {
  const mockLatestRates: LatestRatesResponse = {
    amount: 1,
    base: "USD",
    date: "2024-12-11",
    rates: {
      EUR: 0.92,
      CHF: 0.88,
    },
  };

  const mockTimeSeriesData: TimeSeriesRatesResponse = {
    amount: 1,
    base: "USD",
    start_date: "2024-11-27",
    end_date: "2024-12-11",
    rates: {
      "2024-11-27": { EUR: 0.91, CHF: 0.85 },
      "2024-11-28": { EUR: 0.92, CHF: 0.86 },
      "2024-11-29": { EUR: 0.91, CHF: 0.85 },
      "2024-11-30": { EUR: 0.93, CHF: 0.87 },
      "2024-12-01": { EUR: 0.92, CHF: 0.86 },
      "2024-12-02": { EUR: 0.91, CHF: 0.85 },
      "2024-12-03": { EUR: 0.92, CHF: 0.86 },
      "2024-12-04": { EUR: 0.93, CHF: 0.87 },
      "2024-12-05": { EUR: 0.91, CHF: 0.85 },
      "2024-12-06": { EUR: 0.92, CHF: 0.86 },
      "2024-12-07": { EUR: 0.93, CHF: 0.87 },
      "2024-12-08": { EUR: 0.92, CHF: 0.86 },
      "2024-12-09": { EUR: 0.91, CHF: 0.85 },
      "2024-12-10": { EUR: 0.92, CHF: 0.86 },
      "2024-12-11": { EUR: 0.92, CHF: 0.88 },
    },
  };

  beforeEach(() => {
    vi.mocked(getLatestRates).mockResolvedValue(mockLatestRates);
    vi.mocked(getLast14DaysRates).mockResolvedValue(mockTimeSeriesData);
    vi.mocked(getServerLocale).mockResolvedValue("en-US");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  itPassesStandardComponentTests(<Home />, {
    waitFor: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
  });

  it("fetches and displays latest rates", async () => {
    render(await Home());

    expect(getLatestRates).toHaveBeenCalledWith("USD", ["EUR", "CHF"]);

    expect(screen.getByText("USD to EUR")).toBeInTheDocument();
    expect(screen.getByText("USD to CHF")).toBeInTheDocument();
    expect(screen.getAllByText("0.9200").length).toBeGreaterThan(0);
    expect(screen.getAllByText("0.8800").length).toBeGreaterThan(0);
  });

  it("fetches and renders time series data", async () => {
    render(await Home());

    expect(getLast14DaysRates).toHaveBeenCalledWith("USD", ["EUR", "CHF"]);

    expect(screen.getByText("14-Day Exchange Rate Trend")).toBeInTheDocument();
  });

  it("displays page title and subtitle", async () => {
    render(await Home());

    expect(screen.getByText("Currency Calculator")).toBeInTheDocument();
    expect(
      screen.getByText("USD to EUR & CHF Exchange Rates"),
    ).toBeInTheDocument();
  });

  it("renders CurrencyCalculator component", async () => {
    render(await Home());

    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount in USD")).toBeInTheDocument();
  });

  it("renders ExchangeRateChart component", async () => {
    const { container } = render(await Home());

    expect(
      container.querySelector(".recharts-responsive-container"),
    ).toBeInTheDocument();
  });

  it("displays last updated date", async () => {
    render(await Home());

    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it("displays historical date range", async () => {
    render(await Home());

    expect(screen.getByText(/Historical rates from/)).toBeInTheDocument();
  });

  it("uses server locale for formatting", async () => {
    vi.mocked(getServerLocale).mockResolvedValue("de-DE");

    render(await Home());

    expect(getServerLocale).toHaveBeenCalled();
  });

  it("handles missing EUR rate gracefully", async () => {
    vi.mocked(getLatestRates).mockResolvedValue({
      amount: 1,
      base: "USD",
      date: "2024-12-11",
      rates: {
        CHF: 0.88,
      },
    });

    render(await Home());

    expect(screen.getByText("USD to EUR")).toBeInTheDocument();
    expect(screen.getAllByText("N/A")[0]).toBeInTheDocument();
    expect(screen.getByText("USD to CHF")).toBeInTheDocument();
    expect(screen.getAllByText("0.8800").length).toBeGreaterThan(0);
  });

  it("handles missing CHF rate gracefully", async () => {
    vi.mocked(getLatestRates).mockResolvedValue({
      amount: 1,
      base: "USD",
      date: "2024-12-11",
      rates: {
        EUR: 0.92,
      },
    });

    render(await Home());

    expect(screen.getByText("USD to EUR")).toBeInTheDocument();
    expect(screen.getAllByText("0.9200")[0]).toBeInTheDocument();
    expect(screen.getByText("USD to CHF")).toBeInTheDocument();
    expect(screen.getAllByText("N/A")[0]).toBeInTheDocument();
  });
});
