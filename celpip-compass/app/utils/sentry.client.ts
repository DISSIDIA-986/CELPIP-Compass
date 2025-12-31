import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || 'https://your-sentry-dsn',
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
    release: process.env.npm_package_version || '1.0.0',
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          React.useRouter
        )
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true
      })
    ],
    beforeSend(event) {
      // Filter out certain types of events
      if (event.request?.url?.includes('/health')) {
        return null;
      }
      return event;
    }
  });
}

export { Sentry };