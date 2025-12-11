"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="rounded-lg bg-gray-800 p-8 text-center shadow-lg">
      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">Something went wrong</h1>
        <p className="mt-2 text-lg text-gray-300">
          We encountered an error while loading the exchange rates.
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-gray-700 p-4">
        <p className="text-sm font-medium text-gray-300">Error Details:</p>
        <p className="mt-2 text-sm text-gray-400">
          {error.message || "An unexpected error occurred"}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={reset}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
        >
          Try again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
        >
          Reload page
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <p>If the problem persists, please try:</p>
        <ul className="mt-2 space-y-1 text-left">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Checking your internet connection</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Refreshing the page in a few moments</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Clearing your browser cache</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
