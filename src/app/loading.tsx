import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonHeader,
} from "@/components/Skeleton";

function ExchangeRateCardSkeleton({ flag }: { flag: string }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <SkeletonText variant="p-sm" width="w-24" className="bg-gray-600" />
          <SkeletonText
            variant="text-3xl"
            width="w-32"
            className="mt-2 bg-gray-600"
          />
        </div>
        <div className="text-4xl opacity-50">{flag}</div>
      </div>
    </div>
  );
}

function ConvertedAmountSkeleton() {
  return <Skeleton className="h-20.5 w-full rounded-lg" />;
}

export default function Loading() {
  return (
    <>
      {/* Current Exchange Rates */}
      <SkeletonCard>
        <SkeletonHeader titleWidth="w-64" subtitleWidth="w-48" />

        <div className="grid gap-4 md:grid-cols-2">
          <ExchangeRateCardSkeleton flag="🇪🇺" />
          <ExchangeRateCardSkeleton flag="🇨🇭" />
        </div>
      </SkeletonCard>

      {/* Currency Converter */}
      <SkeletonCard>
        <SkeletonHeader titleWidth="w-56" subtitleWidth="w-64" />

        <div className="space-y-6">
          <div>
            <SkeletonText variant="p-sm" width="w-32" className="mb-2" />
            <div className="relative min-h-14">
              <Skeleton className="h-[54px] w-full rounded-lg border border-transparent" />
            </div>
          </div>

          <div>
            <SkeletonText variant="p-sm" width="w-24" className="mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-[42px] flex-1 rounded-lg border border-transparent" />
              <Skeleton className="h-[42px] flex-1 rounded-lg border border-transparent" />
              <Skeleton className="h-[42px] flex-1 rounded-lg border border-transparent" />
            </div>
          </div>

          <div>
            <SkeletonText variant="p-sm" width="w-40" className="mb-3" />
            <div className="space-y-3">
              <ConvertedAmountSkeleton />
              <ConvertedAmountSkeleton />
            </div>
          </div>
        </div>
      </SkeletonCard>

      {/* Chart */}
      <SkeletonCard>
        <SkeletonHeader titleWidth="w-72" subtitleWidth="w-80" />
        <Skeleton className="h-[400px] w-full rounded" />
      </SkeletonCard>
    </>
  );
}
