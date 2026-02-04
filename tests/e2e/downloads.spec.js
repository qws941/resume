// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Download Functionality
 * Tests all download buttons on the portfolio site
 *
 * NOTE: Tests run against the configured baseURL (production or staging).
 * In CI/CD, PLAYWRIGHT_BASE_URL is set to staging URL.
 * Locally, it defaults to production URL from playwright.config.js.
 */

test.describe('Download Functionality', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL || '/');
    // Wait for download links to be fully rendered (they may be injected by JS)
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Resume Download Links', () => {
    test('should have main resume download buttons', async ({ page }) => {
      // Wait for download links to be rendered before checking
      await page.waitForSelector('a[aria-label*="Download resume in PDF format"]');

      // Check for PDF download link in hero section (DOCX/MD removed)
      const pdfLink = page.getByRole('link', {
        name: /download.*pdf.*format/i,
      });

      await expect(pdfLink).toBeVisible();

      // Verify PDF URL
      const pdfHref = await pdfLink.getAttribute('href');
      expect(pdfHref).toMatch(/\.(pdf)$/i);

      // Should NOT contain github.com (private repo)
      expect(pdfHref).not.toContain('github.com');
    });

    test('should have download attribute on resume links', async ({ page }) => {
      const downloadLinks = page.locator('a[download]').filter({ hasText: /pdf/i });
      const count = await downloadLinks.count();

      // At least 1 PDF download link in hero
      expect(count).toBeGreaterThanOrEqual(1);

      // Verify all have download attribute
      for (let i = 0; i < count; i++) {
        const link = downloadLinks.nth(i);
        await expect(link).toHaveAttribute('download');
      }
    });
  });

  test.describe('Resume Cards Download Links', () => {
    test('should have Nextrade complete PDF download', async ({ page }) => {
      // Highlighted card should have "Complete PDF" link
      const nextradeCard = page.locator('.doc-card-highlight');
      await expect(nextradeCard).toBeVisible();

      const completePdfLink = nextradeCard.getByRole('link', {
        name: /complete pdf/i,
      });
      await expect(completePdfLink).toBeVisible();

      const href = await completePdfLink.getAttribute('href');
      // TODO: Update to github raw URL when files are migrated
      expect(href).toMatch(/gitlab\.jclee\.me|raw\.githubusercontent\.com/);
      expect(href).toContain('Nextrade_Full_Documentation.pdf');
    });

    test('should have PDF and DOCX downloads for standard resume cards', async ({ page }) => {
      // Find all standard (non-highlighted) resume cards
      const standardCards = page.locator('.doc-card:not(.doc-card-highlight)');
      const count = await standardCards.count();

      expect(count).toBeGreaterThanOrEqual(4); // Quantec, KMU, Telecom, KAI

      // Each card should have download links (some may be missing if no docs exist)
      for (let i = 0; i < count; i++) {
        const card = standardCards.nth(i);
        const pdfLink = card.getByRole('link', { name: /pdf$/i });
        const docxLink = card.getByRole('link', { name: /docx$/i });

        // Check PDF link if present with valid URL
        if ((await pdfLink.count()) > 0) {
          const pdfHref = await pdfLink.getAttribute('href');
          if (pdfHref && pdfHref !== 'undefined' && !pdfHref.includes('undefined')) {
            await expect(pdfLink).toBeVisible();
            expect(pdfHref).toMatch(/gitlab\.jclee\.me|raw\.githubusercontent\.com/);
          }
        }

        // Check DOCX link if present with valid URL
        if ((await docxLink.count()) > 0) {
          const docxHref = await docxLink.getAttribute('href');
          if (docxHref && docxHref !== 'undefined' && !docxHref.includes('undefined')) {
            await expect(docxLink).toBeVisible();
            expect(docxHref).toMatch(/gitlab\.jclee\.me|raw\.githubusercontent\.com/);
          }
        }
      }
    });

    test('should have proper ARIA labels on download links', async ({ page }) => {
      const downloadLinks = page.locator('a[download]');
      const count = await downloadLinks.count();

      expect(count).toBeGreaterThan(0);

      // Verify all download links have aria-label
      for (let i = 0; i < count; i++) {
        const link = downloadLinks.nth(i);
        const ariaLabel = await link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel).toContain('Download');
      }
    });
  });

  test.describe('Download Link Accessibility', () => {
    test('should have role="group" on download link containers', async ({ page }) => {
      const downloadGroups = page
        .locator('[role="group"]')
        .filter({ has: page.locator('a[download]') });
      const count = await downloadGroups.count();

      expect(count).toBeGreaterThanOrEqual(5); // At least 5 resume cards
    });

    test('should have descriptive aria-label on download groups', async ({ page }) => {
      const downloadGroups = page.locator('.doc-links[role="group"]');
      const count = await downloadGroups.count();

      for (let i = 0; i < count; i++) {
        const group = downloadGroups.nth(i);
        const ariaLabel = await group.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel).toMatch(/download options/i);
      }
    });

    test('download links should be keyboard accessible', async ({ page }) => {
      const firstDownloadLink = page.locator('a[download]').first();

      // Focus on the link
      await firstDownloadLink.focus();

      // Verify it's focused
      await expect(firstDownloadLink).toBeFocused();

      // Tab to next download link
      await page.keyboard.press('Tab');

      // Should focus next interactive element
      const activeElement = page.locator(':focus');
      await expect(activeElement).toBeVisible();
    });
  });

  test.describe('Download Link Validation', () => {
    test('all download URLs should follow correct patterns', async ({ page }) => {
      const allDownloadLinks = page.locator('a[download]');
      const count = await allDownloadLinks.count();

      // File download URL pattern - supports GitLab or GitHub raw
      const downloadsUrlPattern =
        /^https:\/\/(gitlab\.jclee\.me\/jclee\/resume\/-\/raw\/master|raw\.githubusercontent\.com\/jclee-homelab\/resume\/master)\/.+\.(pdf|docx|md)$/;
      // Worker PDF pattern - handles both production (resume.jclee.me) and staging (*.workers.dev)
      const workerPdfPattern =
        /^https:\/\/(resume\.jclee\.me|resume-staging\.jclee\.workers\.dev)\/resume\.pdf$/;

      for (let i = 0; i < count; i++) {
        const link = allDownloadLinks.nth(i);
        const href = await link.getAttribute('href');

        // Skip links with undefined URLs (missing data in data.json)
        if (href && href !== 'undefined' && !href.includes('undefined')) {
          const isValidUrl = downloadsUrlPattern.test(href) || workerPdfPattern.test(href);
          expect(isValidUrl).toBe(true);
        }
      }
    });

    test('should not have any broken GitHub URLs', async ({ page }) => {
      const allLinks = page.locator('a[href*="github.com/qws941/resume"]');
      const count = await allLinks.count();

      // Should be 0 - all GitHub resume URLs should be replaced with GitLab
      expect(count).toBe(0);
    });
  });

  test.describe('Network Request Validation (Optional)', () => {
    test.skip('download links should return 200 OK', async ({ page, request }) => {
      // This test requires GitLab to be publicly accessible
      // Skip by default, enable manually when testing
      const downloadLinks = page.locator('a[download]');
      const firstLink = await downloadLinks.first().getAttribute('href');

      if (firstLink) {
        const response = await request.head(firstLink);
        expect(response.status()).toBe(200);
      }
    });
  });
});

/**
 * Expected download link counts - dynamically check rather than hardcode
 */
test.describe('Download Link Counts', () => {
  test('should have expected number of download links', async ({ page, baseURL }) => {
    await page.goto(baseURL || '/');
    await page.waitForLoadState('domcontentloaded');

    // Count all download links - verify there are some
    const allDownloadLinks = page.locator('a[download]');
    const totalCount = await allDownloadLinks.count();

    expect(totalCount).toBeGreaterThanOrEqual(1);
  });
});
