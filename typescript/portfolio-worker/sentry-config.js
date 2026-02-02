// Sentry configuration - loads AFTER Sentry SDK
Sentry.init({
  dsn: 'https://0aff8c4399157caf0dc92e63a9401d67@sentry.jclee.me/3',
  environment: 'production',
  tracesSampleRate: 0.1,
  // Only capture unhandled errors
  integrations: function (integrations) {
    return integrations.filter(function (integration) {
      return integration.name !== 'TryCatch';
    });
  },
  beforeSend: function (event) {
    // Filter out browser extension errors
    if (event.exception && event.exception.values) {
      var dominated = event.exception.values.some(function (ex) {
        return (
          ex.stacktrace &&
          ex.stacktrace.frames &&
          ex.stacktrace.frames.some(function (frame) {
            return (
              frame.filename &&
              (frame.filename.indexOf('chrome-extension://') !== -1 ||
                frame.filename.indexOf('moz-extension://') !== -1)
            );
          })
        );
      });
      if (dominated) return null;
    }
    return event;
  },
});
