import cn from "classnames";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded bg-gray-700", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

type SkeletonTextProps = {
  variant?: "h2" | "p-sm" | "p-lg" | "text-3xl";
  width?: string;
  className?: string;
};

export function SkeletonText({
  variant = "p-sm",
  width = "w-full",
  className,
  ...props
}: SkeletonTextProps) {
  const heights = {
    h2: "h-7",
    "p-sm": "h-5",
    "p-lg": "h-7",
    "text-3xl": "h-9",
  };

  return (
    <Skeleton className={cn(heights[variant], width, className)} {...props} />
  );
}

type SkeletonCardProps = {
  children: ReactNode;
  className?: string;
};

export function SkeletonCard({
  children,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn("rounded-lg bg-gray-800 p-8 shadow-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type SkeletonHeaderProps = {
  titleWidth?: string;
  subtitleWidth?: string;
};

export function SkeletonHeader({
  titleWidth = "w-64",
  subtitleWidth = "w-48",
  ...props
}: SkeletonHeaderProps) {
  return (
    <div className="mb-6 border-b pb-4" {...props}>
      <SkeletonText variant="h2" width={titleWidth} />
      <SkeletonText variant="p-sm" width={subtitleWidth} className="mt-1" />
    </div>
  );
}
