"use client";

import cn from "classnames";
import type { ComponentPropsWithoutRef } from "react";

type PresetButtonProps = ComponentPropsWithoutRef<"button"> & {
  isActive?: boolean;
};

export function PresetButton({
  isActive = false,
  className,
  children,
  ...props
}: PresetButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={cn(
        "flex-1 rounded-lg border px-4 py-2 text-white transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none",
        {
          "border-blue-500 bg-blue-600 hover:bg-blue-700": isActive,
          "border-gray-600 bg-gray-700 hover:bg-gray-600": !isActive,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

PresetButton.displayName = "PresetButton";
