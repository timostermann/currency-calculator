"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parseTimeSeriesData } from "@/lib/api/utils/parseTimeSeriesData";
import { getBrowserLocale } from "@/lib/locale";
import { formatNumber } from "@/lib/currency";
import type { TimeSeriesRatesResponse } from "@/lib/api/types";

type ExchangeRateChartProps = {
  data: TimeSeriesRatesResponse;
};

export function ExchangeRateChart({ data }: ExchangeRateChartProps) {
  const locale = getBrowserLocale();

  const chartData = useMemo(
    () =>
      parseTimeSeriesData(data).map((point) => ({
        date: new Date(point.date).toLocaleDateString(locale, {
          month: "short",
          day: "numeric",
        }),
        EUR: point.rates.EUR,
        CHF: point.rates.CHF,
      })),
    [data, locale],
  );

  const formatYAxis = (value: number) => formatNumber(value, 2, locale);
  const formatTooltip = (value: number) => formatNumber(value, 4, locale);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="date" tick={{ fill: "var(--color-gray-200)" }} />
          <YAxis
            tick={{ fill: "var(--color-gray-200)" }}
            domain={["auto", "auto"]}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: 600 }}
            formatter={formatTooltip}
          />
          <Legend
            wrapperStyle={{ paddingTop: "1rem" }}
            iconType="line"
            formatter={(value) => `USD to ${value}`}
          />
          <Line
            type="monotone"
            dataKey="EUR"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
            name="EUR"
          />
          <Line
            type="monotone"
            dataKey="CHF"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
            name="CHF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

ExchangeRateChart.displayName = "ExchangeRateChart";
