"use client";
import cn from "classnames";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  errorId?: string;
};

export function Input({
  label,
  prefix,
  suffix,
  error,
  errorId,
  id = "numeric-input",
  type = "text",
  inputMode = "decimal",
  className,
  ...props
}: InputProps) {
  const computedErrorId = errorId ?? `${id}-error`;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative min-h-14">
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              {prefix}
            </span>
          )}
          <input
            id={id}
            type={type}
            inputMode={inputMode}
            aria-invalid={!!error}
            aria-describedby={error ? computedErrorId : undefined}
            className={cn(
              "w-full rounded-lg border bg-gray-700 py-3 text-lg text-white placeholder-gray-500 focus:ring-2 focus:outline-none",
              {
                "border-red-500 focus:border-red-500 focus:ring-red-500": error,
                "border-gray-600 focus:border-blue-500 focus:ring-blue-500":
                  !error,
                "pl-8": prefix,
                "pr-8": suffix,
                "px-4": !prefix && !suffix,
              },
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
              {suffix}
            </span>
          )}
        </div>
        <p
          id={computedErrorId}
          className={cn(
            "absolute top-full left-0 mt-1 text-sm text-red-400 transition-opacity",
            {
              "opacity-100": error,
              "pointer-events-none opacity-0": !error,
            },
          )}
          role={error ? "alert" : undefined}
          aria-live={error ? "polite" : undefined}
        >
          {error || "\u00A0"}
        </p>
      </div>
    </div>
  );
}

Input.displayName = "Input";
