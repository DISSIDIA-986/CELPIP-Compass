import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || 'https://your-sentry-dsn',
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
    release: process.env.npm_package_version || '1.0.0',
    integrations: [
      new Sentry.Integrations.Http({
        tracing: true,
        ignoredRequestUrls: [/\/health$/] // Ignore health check endpoints
      }),
      new Sentry.Integrations.Express(),
      new Sentry.Integrations.ReactRouterV6()
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