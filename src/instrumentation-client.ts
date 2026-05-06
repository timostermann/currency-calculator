import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
  dsn: isDev ? "https://spotlight@local/0" : process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: isDev ? 1.0 : 0.05,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.02,
  enableLogs: true,
  integrations: [
    Sentry.replayIntegration(),
    ...(isDev ? [Sentry.spotlightBrowserIntegration()] : []),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
