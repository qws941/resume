// @ts-check
const { test, expect } = require('@playwright/test');

// Test Constants
const SELECTORS = {
  HERO_TITLE: '.hero-title',
  PROJECT_CARD: '.project-card',
  STAT_CARD: '.stat-card',
  THEME_TOGGLE: '#themeToggle',
  SCROLL_TO_TOP: '#scrollToTop',
  PROJECT_LINK_PRIMARY: '.project-link.link-primary',
};

const EXPECTED_COUNTS = {
  PROJECTS: 5,
  STATS: 4,
};

const REGEX_PATTERNS = {
  // Korean name and job title for title assertion
  TITLE: /이재철.*Infrastructure.*Security.*Engineer/,
  RESUME_TITLE: /Resume|이력서/,
};

// Helper Functions
async function navigateToHome(page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

async function navigateToResume(page) {
  await page.goto('/resume');
  await page.waitForLoadState('networkidle');
}

async function checkElementVisible(page, selector) {
  await expect(page.locator(selector)).toBeVisible();
}

async function scrollToPosition(page, yPosition) {
  await page.evaluate((y) => window.scrollTo(0, y), yPosition);
  await page.waitForTimeout(100); // Wait for scroll event
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
    await expect(page.locator(SELECTORS.HERO_TITLE)).toContainText('Infrastructure');
  });

  test('should display 5 project cards', async ({ page }) => {
    const projectCards = page.locator(SELECTORS.PROJECT_CARD);
    await expect(projectCards).toHaveCount(EXPECTED_COUNTS.PROJECTS);
  });

  test('should display statistics section', async ({ page }) => {
    const statCards = page.locator(SELECTORS.STAT_CARD);
    await expect(statCards).toHaveCount(EXPECTED_COUNTS.STATS);

    // Check specific stats
    await expect(page.locator('.stat-card').filter({ hasText: '95' })).toBeVisible();
    await expect(page.locator('.stat-card').filter({ hasText: '15' })).toBeVisible();
    await expect(page.locator('.stat-card').filter({ hasText: '99.9' })).toBeVisible();
  });

  test('should have working dark mode toggle', async ({ page }) => {
    const themeToggle = page.locator('#themeToggle');
    await expect(themeToggle).toBeVisible();

    // Get initial theme
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    // Toggle dark mode
    await themeToggle.click();

    // Verify theme changed
    const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage updated
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(newTheme);
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check ARIA labels
    await expect(page.locator('[aria-label="다크모드 토글"]')).toBeVisible();
    await expect(page.locator('[aria-label="맨 위로 이동"]')).toBeVisible();

    // Check hero CTA buttons have labels
    const ctaButtons = page.locator('.hero-cta a');
    for (const button of await ctaButtons.all()) {
      await expect(button).toHaveAttribute('aria-label');
    }
  });

  test('should have working scroll to top button', async ({ page }) => {
    const scrollButton = page.locator(SELECTORS.SCROLL_TO_TOP);

    // Initially hidden
    await expect(scrollButton).not.toHaveClass(/visible/);

    // Scroll down
    await scrollToPosition(page, 500);

    // Should be visible now
    await expect(scrollButton).toHaveClass(/visible/);

    // Click to scroll to top
    await scrollButton.click();
    await page.waitForTimeout(500); // Wait for scroll animation

    // Should be near top
    const scrollY = await page.evaluate(() => window.pageYOffset);
    expect(scrollY).toBeLessThan(100);
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

test.describe('Resume Page', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToResume(page);
  });

  test('should load resume page', async ({ page }) => {
    await expect(page).toHaveTitle(REGEX_PATTERNS.RESUME_TITLE);
  });

  test('should display resume content', async ({ page }) => {
    // Check for typical resume elements
    const content = await page.textContent('body');
    expect(content).toContain('이재철');
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
    await expect(projectCards).toHaveCount(5);
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

  test('should have no console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    expect(consoleErrors).toHaveLength(0);
  });
});

test.describe('Security Headers', () => {
  test('should have security headers', async ({ request }) => {
    const response = await request.get('/');

    // Check security headers
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['x-frame-options']).toBe('DENY');
    expect(response.headers()['x-xss-protection']).toBe('1; mode=block');
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(response.headers()['content-security-policy']).toBeTruthy();
  });
});
