"use client";

import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import {
  parseLocaleNumber,
  validateAmount,
  formatCurrency,
} from "@/lib/currency";
import { Input } from "./Input";
import { PresetButton } from "./PresetButton";

type CurrencyCalculatorProps = {
  rates: {
    EUR?: number;
    CHF?: number;
  };
};

const PRESET_VALUES = [100, 1000, 10000];

export function CurrencyCalculator({ rates }: CurrencyCalculatorProps) {
  const [amount, setAmount] = useState("");
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const error = useMemo(() => validateAmount(amount), [amount]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);

    if (activePreset !== null) setActivePreset(null);
  };

  const handlePresetClick = (value: number) => {
    setAmount(value.toString());
    setActivePreset(value);
  };

  const numericAmount = parseLocaleNumber(amount) ?? 0;
  const eurAmount = rates.EUR ? numericAmount * rates.EUR : 0;
  const chfAmount = rates.CHF ? numericAmount * rates.CHF : 0;
  const hasValidAmount = !error && numericAmount > 0;

  return (
    <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-100">
          Currency Converter
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Enter an amount in USD to convert
        </p>
      </div>

      <div className="space-y-6">
        <Input
          id="amount-input"
          label="Amount in USD"
          prefix="$"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          error={error}
        />

        <div>
          <p className="mb-2 text-sm font-medium text-gray-300">Quick values</p>
          <div className="flex gap-2">
            {PRESET_VALUES.map((presetValue) => (
              <PresetButton
                key={presetValue}
                isActive={activePreset === presetValue}
                onClick={() => handlePresetClick(presetValue)}
                aria-label={`Set amount to ${presetValue} USD${
                  activePreset === presetValue ? ", currently active" : ""
                }`}
              >
                ${presetValue.toLocaleString("de-DE")}
              </PresetButton>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-300">
            Converted amounts
          </p>
          <div className="space-y-3">
            {rates.EUR !== undefined && (
              <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-700 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    🇪🇺
                  </span>
                  <div>
                    <p className="text-sm text-gray-400">EUR</p>
                    <output
                      htmlFor="amount-input"
                      className="text-xl font-semibold text-white"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {hasValidAmount
                        ? formatCurrency(eurAmount, "EUR")
                        : "€0,00"}
                    </output>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Rate</p>
                  <p className="text-sm text-gray-400">
                    {rates.EUR.toFixed(4)}
                  </p>
                </div>
              </div>
            )}

            {rates.CHF !== undefined && (
              <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-700 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    🇨🇭
                  </span>
                  <div>
                    <p className="text-sm text-gray-400">CHF</p>
                    <output
                      htmlFor="amount-input"
                      className="text-xl font-semibold text-white"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {hasValidAmount
                        ? formatCurrency(chfAmount, "CHF")
                        : "CHF 0,00"}
                    </output>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Rate</p>
                  <p className="text-sm text-gray-400">
                    {rates.CHF.toFixed(4)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CurrencyCalculator.displayName = "CurrencyCalculator";
