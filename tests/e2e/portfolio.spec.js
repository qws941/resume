// @ts-check
const { test, expect } = require('@playwright/test');

// Test Constants
const SELECTORS = {
  HERO_TITLE: '.hero-title',
  PROJECT_CARD: '.project-card',
  STAT_CARD: '.stat-card',
  PROJECT_LINK_PRIMARY: '.project-link.link-primary',
};

const EXPECTED_COUNTS = {
  PROJECTS: 14, // Updated to match current data.json (2025-11-13)
  STATS: 8, // Updated to match live site
};

const REGEX_PATTERNS = {
  // Korean name and job title for title assertion
  TITLE: /이재철.*Infrastructure.*Security.*Engineer/,
};

// Helper Functions
async function navigateToHome(page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

async function checkElementVisible(page, selector) {
  await expect(page.locator(selector)).toBeVisible();
}

test.describe('Portfolio Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page);
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(REGEX_PATTERNS.TITLE);
  });

  test('should display hero section', async ({ page }) => {
    await checkElementVisible(page, SELECTORS.HERO_TITLE);
    await expect(page.locator(SELECTORS.HERO_TITLE)).toContainText('인프라');
  });

  test('should display 5 project cards', async ({ page }) => {
    const projectCards = page.locator(SELECTORS.PROJECT_CARD);
    await expect(projectCards).toHaveCount(EXPECTED_COUNTS.PROJECTS);
  });

  test('should display statistics section', async ({ page }) => {
    const statCards = page.locator(SELECTORS.STAT_CARD);
    await expect(statCards).toHaveCount(EXPECTED_COUNTS.STATS);
  });

  test('project links should be valid', async ({ page }) => {
    const projectLinks = page.locator(SELECTORS.PROJECT_LINK_PRIMARY);

    for (const link of await projectLinks.all()) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});

test.describe('Responsive Design', () => {
  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check mobile-specific behavior
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    // Verify project cards stack vertically on mobile
    const projectCards = page.locator('.project-card');
    const firstCard = projectCards.first();
    const secondCard = projectCards.nth(1);

    const firstCardBox = await firstCard.boundingBox();
    const secondCardBox = await secondCard.boundingBox();

    // Cards should be vertically stacked (second card below first)
    expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height);
  });

  test('should be tablet responsive', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const projectCards = page.locator('.project-card');
    await expect(projectCards).toHaveCount(14);
    await expect(projectCards.first()).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should load without critical errors', async ({ page }) => {
    const criticalErrors = [];
    page.on('console', msg => {
      // Only catch critical errors, not CSP warnings
      if (msg.type() === 'error' && !msg.text().includes('Content Security Policy')) {
        criticalErrors.push(msg.text());
      }
    });

    await page.goto('/');

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Security Headers', () => {
  test('should have security headers', async ({ request }) => {
    const response = await request.get('/');

    // Check security headers (match production site)
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['x-frame-options']).toMatch(/SAMEORIGIN|DENY/);
    expect(response.headers()['x-xss-protection']).toBe('1; mode=block');
    expect(response.headers()['referrer-policy']).toMatch(/same-origin|strict-origin-when-cross-origin/);
    expect(response.headers()['content-security-policy']).toBeTruthy();
  });
});
