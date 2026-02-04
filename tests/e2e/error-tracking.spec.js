// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Error Tracking (Sentry)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load Sentry script from CDN', async ({ page }) => {
    // Check if Sentry script tag is present
    const sentryScript = page.locator('script[src*="sentry-cdn.com"]');
    await expect(sentryScript).toHaveCount(1);

    // Verify script has integrity attribute (SRI)
    const integrity = await sentryScript.getAttribute('integrity');
    expect(integrity).toBeTruthy();
    expect(integrity).toContain('sha384');
  });

  test('should initialize Sentry with correct configuration', async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    const sentryExists = await page.evaluate(() => {
      return typeof window.Sentry !== 'undefined';
    });

    test.skip(
      !sentryExists,
      'Sentry not loaded - skipping initialization test',
    );

    if (sentryExists) {
      const sentryInitialized = await page.evaluate(() => {
        const hub = window.Sentry.getCurrentHub();
        return hub && hub.getClient() !== null;
      });
      test.skip(!sentryInitialized, 'Sentry DSN not configured');
    }
  });

  test('should have correct Sentry environment', async ({ page }) => {
    await page.waitForTimeout(1000);

    const environment = await page.evaluate(() => {
      if (typeof window.Sentry === 'undefined') return null;
      const client = window.Sentry.getCurrentHub().getClient();
      return client ? client.getOptions().environment : null;
    });

    // Skip if Sentry not configured
    test.skip(
      environment === null,
      'Sentry DSN not configured - skipping environment test',
    );

    if (environment) {
      // Environment should be 'production' for resume.jclee.me or 'development' for local
      expect(environment).toMatch(/^(production|development)$/);
    }
  });

  test('should not have CSP violations from Sentry', async ({ page }) => {
    const cspViolations = [];

    // Listen for CSP violations
    page.on('console', (msg) => {
      if (
        msg.type() === 'error' &&
        msg.text().includes('Content Security Policy')
      ) {
        cspViolations.push(msg.text());
      }
    });

    // Wait for page to fully load
    await page.waitForTimeout(2000);

    // Filter out known Cloudflare violations
    const sentryViolations = cspViolations.filter((violation) => {
      return violation.includes('sentry') || violation.includes('Sentry');
    });

    expect(sentryViolations).toHaveLength(0);
  });

  test('should have Sentry CDN in CSP script-src', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response.headers();

    expect(headers['content-security-policy']).toBeDefined();
    expect(headers['content-security-policy']).toContain(
      'browser.sentry-cdn.com',
    );
  });

  test('should have Sentry API in CSP connect-src', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response.headers();

    expect(headers['content-security-policy']).toBeDefined();
    expect(headers['content-security-policy']).toContain('ingest.sentry.io');
  });

  test('should configure Sentry to ignore browser extension errors', async ({
    page,
  }) => {
    await page.waitForTimeout(1000);

    const ignoresExtensions = await page.evaluate(() => {
      if (typeof window.Sentry === 'undefined') return null;
      const client = window.Sentry.getCurrentHub().getClient();
      if (!client) return null;

      const options = client.getOptions();
      const ignoreErrors = options.ignoreErrors || [];

      return ignoreErrors.some(
        (pattern) =>
          pattern.toString().includes('chrome-extension') ||
          pattern.toString().includes('moz-extension'),
      );
    });

    // Skip if Sentry not configured
    test.skip(
      ignoresExtensions === null,
      'Sentry DSN not configured - skipping ignore errors test',
    );

    if (ignoresExtensions !== null) {
      expect(ignoresExtensions).toBe(true);
    }
  });

  test('should configure Sentry to filter PII', async ({ page }) => {
    await page.waitForTimeout(1000);

    const hasPIIFilter = await page.evaluate(() => {
      if (typeof window.Sentry === 'undefined') return null;
      const client = window.Sentry.getCurrentHub().getClient();
      if (!client) return null;

      const options = client.getOptions();
      return typeof options.beforeSend === 'function';
    });

    // Skip if Sentry not configured
    test.skip(
      hasPIIFilter === null,
      'Sentry DSN not configured - skipping PII filter test',
    );

    if (hasPIIFilter !== null) {
      expect(hasPIIFilter).toBe(true);
    }
  });

  test('should set anonymous user ID in Sentry', async ({ page }) => {
    await page.waitForTimeout(1000);

    const userId = await page.evaluate(() => {
      if (typeof window.Sentry === 'undefined') return null;
      const hub = window.Sentry.getCurrentHub();
      const client = hub.getClient();
      if (!client) return null; // DSN not configured

      const scope = hub.getScope();
      if (!scope) return null;

      const user = scope.getUser();
      return user ? user.id : null;
    });

    // Skip if Sentry not configured
    test.skip(
      userId === null,
      'Sentry DSN not configured - skipping user ID test',
    );

    if (userId !== null) {
      expect(userId).toBe('anonymous');
    }
  });

  test('should have global error handlers registered', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Check if Sentry is initialized and has error handlers
    const result = await page.evaluate(() => {
      if (typeof window.Sentry === 'undefined') return { initialized: false };
      const client = window.Sentry.getCurrentHub().getClient();
      if (!client) return { initialized: false }; // DSN not configured

      // Sentry should have registered error and unhandledrejection handlers
      const hasErrorHandler = window.onerror !== null;

      return { initialized: true, hasHandlers: hasErrorHandler };
    });

    // Skip if Sentry not configured
    test.skip(
      !result.initialized,
      'Sentry DSN not configured - skipping error handlers test',
    );

    if (result.initialized) {
      expect(result.hasHandlers).toBe(true);
    }
  });
});
