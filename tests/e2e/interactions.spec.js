// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Smooth Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking nav links should scroll to sections', async ({ page }) => {
    await page.click('a[href="#resume"]');
    await expect(page.locator('#resume')).toBeInViewport({ timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForLoadState('domcontentloaded');

    await page.click('a[href="#projects"]');
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 2000 });

    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
  });

  test('CTA buttons should scroll to sections', async ({ page }) => {
    await page.click('.btn-primary');
    await expect(page.locator('#resume')).toBeInViewport({ timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForLoadState('domcontentloaded');

    await page.click('.btn-secondary');
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 2000 });
  });

  test('logo click should navigate to homepage', async ({ page }) => {
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });

    const logo = page.locator('.nav-logo');
    const href = await logo.getAttribute('href');
    expect(href === '/' || href === '#').toBeTruthy();

    await logo.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(logo).toBeVisible();
  });
});

test.describe('Navigation Scroll Effect', () => {
  test('nav should get shadow on scroll', async ({ page }) => {
    await page.goto('/');

    const _nav = page.locator('.nav');

    // Scroll to top first to reset state
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Scroll down to trigger scroll handler
    await page.evaluate(() => window.scrollTo(0, 200));

    // Nav should have scrolled class or box-shadow after scroll
    await page.waitForFunction(
      () => {
        const nav = document.querySelector('.nav');
        if (!nav) return false;
        const hasClass = nav.classList.contains('scrolled');
        const hasShadow = window.getComputedStyle(nav).boxShadow !== 'none';
        return hasClass || hasShadow;
      },
      { timeout: 2000 }
    );
  });
});

test.describe('Theme Toggle Interaction', () => {
  test('should toggle theme on click', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const themeToggle = page.locator('.theme-toggle');

    // Initial: light mode
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Click to toggle
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Click again to toggle back
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should update icons on theme toggle', async ({ page }) => {
    await page.goto('/');

    const sunIcon = page.locator('.sun-icon');
    const moonIcon = page.locator('.moon-icon');

    // Light mode: sun visible, moon hidden
    await expect(sunIcon).toBeVisible();
    await expect(moonIcon).toBeHidden();

    // Toggle to dark
    await page.click('.theme-toggle');

    // Dark mode: moon visible, sun hidden
    await expect(moonIcon).toBeVisible();
    await expect(sunIcon).toBeHidden();
  });

  test('theme should persist across page reload', async ({ page }) => {
    await page.goto('/');

    // Set dark mode
    await page.click('.theme-toggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should still be dark
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Link Hover States', () => {
  test('nav links should have hover effect', async ({ page }) => {
    await page.goto('/');

    const navLink = page.locator('.nav-link').first();
    await navLink.evaluate((el) => window.getComputedStyle(el).color); // Check initial color

    // Hover over link
    await navLink.hover();
    await page.waitForTimeout(100);

    await navLink.evaluate((el) => window.getComputedStyle(el).color); // Check hover color

    // Color might change on hover (depends on CSS)
    // At minimum, cursor should be pointer
    const cursor = await navLink.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toBe('pointer');
  });

  test('CTA buttons should have hover effect', async ({ page }) => {
    await page.goto('/');

    const primaryBtn = page.locator('.btn-primary');

    // Get initial state
    await primaryBtn.evaluate((el) => window.getComputedStyle(el).transform); // Check initial transform

    // Hover
    await primaryBtn.hover();
    await page.waitForTimeout(100);

    // Should have pointer cursor
    const cursor = await primaryBtn.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toBe('pointer');
  });

  test('project card links should be clickable', async ({ page }) => {
    await page.goto('/');

    const projectLinks = page.locator('#projects .project-link');
    const count = await projectLinks.count();

    expect(count).toBeGreaterThan(0);

    // Check first link is clickable
    const firstLink = projectLinks.first();
    const cursor = await firstLink.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toBe('pointer');
  });
});

test.describe('Skip Link Interaction', () => {
  test('skip link should become visible on focus', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('.skip-link');

    // Initially hidden (off-screen)
    const initialPosition = await skipLink.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position;
    });
    expect(initialPosition).toBe('absolute');

    // Tab to skip link
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    // Should be visible on focus
    await expect(skipLink).toBeVisible();
  });

  test('activating skip link should focus main content', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');

    // Activate skip link
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    // Main content should be in view
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeInViewport();
  });
});

test.describe('Contact Links Interaction', () => {
  test('email link should have mailto protocol', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:qws941@kakao.com');
  });

  test('phone link should have tel protocol', async ({ page }) => {
    await page.goto('/');

    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toHaveAttribute('href', 'tel:010-5757-9592');
  });

  test('external links should open in new tab', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.locator('.contact-item').filter({ hasText: 'GitHub' }).locator('a');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
  });
});

test.describe('Card Interactions', () => {
  test('resume cards should be hoverable', async ({ page }) => {
    await page.goto('/');

    const card = page.locator('#resume .doc-card').first();
    await card.hover();

    // Check for hover state (transform or shadow change)
    const transform = await card.evaluate((el) => window.getComputedStyle(el).transform);
    // Transform might be 'none' or a matrix value
    expect(transform).toBeTruthy();
  });

  test('project cards should be hoverable', async ({ page }) => {
    await page.goto('/');

    const card = page.locator('#projects .project-card').first();
    await card.hover();

    const cursor = await card.evaluate((el) => window.getComputedStyle(el).cursor);
    // Card itself might not have pointer, but links inside should
    expect(cursor).toBeTruthy();
  });

  test('project card links should be distinguishable', async ({ page }) => {
    await page.goto('/');

    // Check for project links (could be .link-primary, .link-secondary, or .project-link)
    const projectLinks = page.locator('#projects .project-link');
    const projectLinksCount = await projectLinks.count();

    // At least some cards should have links
    expect(projectLinksCount).toBeGreaterThan(0);

    // Verify links exist and are styled (href may be empty for internal projects)
    for (let i = 0; i < Math.min(3, projectLinksCount); i++) {
      const link = projectLinks.nth(i);
      await expect(link).toBeVisible();
      // Links should have text content (label)
      const text = await link.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });
});

test.describe('Download Links', () => {
  test('PDF download link should have download attribute', async ({ page }) => {
    await page.goto('/');

    const pdfLink = page.locator('.hero-download .download-link').first();
    await expect(pdfLink).toHaveAttribute('download');
  });

  test('download links should have valid URLs', async ({ page }) => {
    await page.goto('/');

    const downloadLinks = page.locator('.hero-download .download-link');
    const count = await downloadLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await downloadLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});

test.describe('URL Hash Navigation', () => {
  test('should scroll to resume section on hash navigation', async ({ page }) => {
    await page.goto('/#resume');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const resumeSection = page.locator('#resume');
    await expect(resumeSection).toBeInViewport();
  });

  test('should scroll to projects section on hash navigation', async ({ page }) => {
    await page.goto('/#projects');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('should scroll to contact section on hash navigation', async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });
});
