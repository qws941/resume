// @ts-check
const { test, expect } = require('@playwright/test');

// Auto-sync with data.json
const projectData = require('../../typescript/portfolio-worker/data.json');

const EXPECTED = {
  RESUMES: projectData.resume.length, // 7
  PROJECTS: projectData.projects.length, // 6
  NAV_LINKS: 6, // 경력, 프로젝트, 기술, 자격증, 연락처, 언어
  CONTACT_ITEMS: 5, // Email, Phone, GitHub, Website, Monitoring
  DOWNLOAD_LINKS: 1, // PDF (hero section - single download button)
};

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display logo', async ({ page }) => {
    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('JC LEE');
    await expect(logo).toHaveAttribute('aria-label', 'Homepage');
  });

  test('should have all navigation links', async ({ page }) => {
    const navLinks = page.locator('.nav-link');
    await expect(navLinks).toHaveCount(EXPECTED.NAV_LINKS);

    await expect(navLinks.nth(0)).toHaveAttribute('href', '#resume');
    await expect(navLinks.nth(0)).toHaveAttribute('data-i18n', 'nav.resume');

    await expect(navLinks.nth(1)).toHaveAttribute('href', '#projects');
    await expect(navLinks.nth(1)).toHaveAttribute('data-i18n', 'nav.projects');

    await expect(navLinks.nth(2)).toHaveAttribute('href', '#infrastructure');
    await expect(navLinks.nth(2)).toHaveAttribute('data-i18n', 'nav.infrastructure');

    await expect(navLinks.nth(3)).toHaveAttribute('href', '#skills');
    await expect(navLinks.nth(3)).toHaveAttribute('data-i18n', 'nav.skills');

    await expect(navLinks.nth(4)).toHaveAttribute('href', '#certifications');
    await expect(navLinks.nth(4)).toHaveAttribute('data-i18n', 'nav.certifications');

    await expect(navLinks.nth(5)).toHaveAttribute('href', '#contact');
    await expect(navLinks.nth(5)).toHaveAttribute('data-i18n', 'nav.contact');
  });

  test('should have theme toggle button', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', 'Toggle dark mode');
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
  });

  test('navigation links should scroll to sections', async ({ page }) => {
    // Click 경력 link
    await page.click('a[href="#resume"]');
    await page.waitForTimeout(500);
    const resumeSection = page.locator('#resume');
    await expect(resumeSection).toBeInViewport();

    // Click 프로젝트 link
    await page.click('a[href="#projects"]');
    await page.waitForTimeout(500);
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();

    // Click 연락처 link
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(500);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // Click 기술 link
    await page.click('a[href="#skills"]');
    await page.waitForTimeout(500);
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeInViewport();

    // Click 자격증 link
    await page.click('a[href="#certifications"]');
    await page.waitForTimeout(500);
    const certificationsSection = page.locator('#certifications');
    await expect(certificationsSection).toBeInViewport();
  });
});

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero badge', async ({ page }) => {
    const badge = page.locator('.hero-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('data-i18n', 'hero.subtitle');
  });

  test('should display hero title', async ({ page }) => {
    const title = page.locator('.hero-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('AIOps');
  });

  test('should display hero subtitle with experience', async ({ page }) => {
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toBeVisible();
    const text = await subtitle.textContent();
    expect(text.length).toBeGreaterThan(20);
  });

  test('should have two CTA buttons', async ({ page }) => {
    const primaryBtn = page.locator('.btn-primary');
    const secondaryBtn = page.locator('.btn-secondary');

    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toHaveAttribute('href', '#resume');

    await expect(secondaryBtn).toBeVisible();
    await expect(secondaryBtn).toHaveAttribute('href', '#projects');
  });

  test('should have download links', async ({ page }) => {
    const downloadLinks = page.locator('.hero-download .download-link');
    await expect(downloadLinks).toHaveCount(EXPECTED.DOWNLOAD_LINKS);

    const pdfLink = downloadLinks.first();
    await expect(pdfLink).toContainText('PDF');
    const pdfHref = await pdfLink.getAttribute('href');
    expect(pdfHref).toMatch(/\.pdf$/i);
  });
});

test.describe('Resume Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have section header', async ({ page }) => {
    const badge = page.locator('#resume .section-badge');
    const title = page.locator('#resume-heading');
    const description = page.locator('#resume .section-description');

    await expect(badge).toBeVisible();
    await expect(title).toBeVisible();
    await expect(description).toBeVisible();
  });

  test('should display all resume cards', async ({ page }) => {
    const resumeCards = page.locator('#resume .doc-card');
    await expect(resumeCards).toHaveCount(EXPECTED.RESUMES);
  });

  test('should verify each resume card content', async ({ page }) => {
    for (let i = 0; i < projectData.resume.length; i++) {
      const resume = projectData.resume[i];
      const card = page.locator('#resume .doc-card').nth(i);

      // Verify icon
      const icon = card.locator('.doc-icon');
      await expect(icon).toContainText(resume.icon);

      // Verify title
      const title = card.locator('.doc-title');
      await expect(title).toContainText(resume.title);

      // Verify description
      const description = card.locator('.doc-description');
      await expect(description).toBeVisible();

      // Verify stats/tags
      const stats = card.locator('.doc-stats .doc-stat');
      await expect(stats).toHaveCount(resume.stats.length);
    }
  });

  test('should have valid document links', async ({ page }) => {
    const docLinks = page.locator('#resume .doc-link');
    const linkCount = await docLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const href = await docLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have section header', async ({ page }) => {
    const badge = page.locator('#projects .section-badge');
    const title = page.locator('#projects-heading');
    const description = page.locator('#projects .section-description');

    await expect(badge).toBeVisible();
    await expect(title).toBeVisible();
    await expect(description).toBeVisible();
  });

  test('should display all project cards', async ({ page }) => {
    const projectCards = page.locator('#projects .project-card');
    await expect(projectCards).toHaveCount(EXPECTED.PROJECTS);
  });

  test('should verify each project card content', async ({ page }) => {
    for (let i = 0; i < projectData.projects.length; i++) {
      const project = projectData.projects[i];
      const card = page.locator('#projects .project-card').nth(i);

      // Verify icon (in project-header, not project-icon)
      const icon = card.locator('.project-header');
      await expect(icon).toContainText(project.icon);

      // Verify title
      const title = card.locator('.project-title');
      await expect(title).toContainText(project.title);

      // Verify tech stack
      const tech = card.locator('.project-tech');
      await expect(tech).toContainText(project.tech);

      // Verify description
      const description = card.locator('.project-description');
      await expect(description).toBeVisible();
    }
  });

  test('should have valid project links', async ({ page }) => {
    for (let i = 0; i < projectData.projects.length; i++) {
      const project = projectData.projects[i];
      const card = page.locator('#projects .project-card').nth(i);
      const links = card.locator('.project-link');

      // Check live URL if exists
      if (project.liveUrl) {
        const liveLink = links
          .filter({ hasText: /라이브|Live/i })
          .or(links.locator('.link-primary').first());
        const linkCount = await liveLink.count();
        if (linkCount > 0) {
          const href = await liveLink.first().getAttribute('href');
          expect(href).toBe(project.liveUrl);
        }
      }

      // Check Repository URL if exists
      if (project.repoUrl) {
        const repoLink = links
          .filter({ hasText: /GitHub|코드/i })
          .or(links.locator('.link-secondary').first());
        const linkCount = await repoLink.count();
        if (linkCount > 0) {
          const href = await repoLink.first().getAttribute('href');
          expect(href).toBe(project.repoUrl);
        }
      }
    }
  });
});

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have section header', async ({ page }) => {
    const badge = page.locator('#contact .section-badge');
    const title = page.locator('#contact-heading');

    await expect(badge).toBeVisible();
    await expect(title).toBeVisible();
  });

  test('should display all contact items', async ({ page }) => {
    const contactItems = page.locator('.contact-item');
    await expect(contactItems).toHaveCount(EXPECTED.CONTACT_ITEMS);
  });

  test('should have valid email link', async ({ page }) => {
    const emailItem = page.locator('.contact-item').filter({ hasText: 'Email' });
    const emailLink = emailItem.locator('a');

    await expect(emailLink).toHaveAttribute('href', 'mailto:qws941@kakao.com');
    await expect(emailLink).toContainText('qws941@kakao.com');
  });

  test('should have valid phone link', async ({ page }) => {
    const phoneItem = page.locator('.contact-item').filter({ hasText: 'Phone' });
    const phoneLink = phoneItem.locator('a');

    await expect(phoneLink).toHaveAttribute('href', 'tel:010-5757-9592');
    await expect(phoneLink).toContainText('010-5757-9592');
  });

  test('should have valid GitHub link', async ({ page }) => {
    const githubItem = page.locator('.contact-item').filter({ hasText: 'GitHub' });
    const githubLink = githubItem.locator('a');

    await expect(githubLink).toHaveAttribute('href', 'https://github.com/qws941');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have valid website link', async ({ page }) => {
    const websiteItem = page.locator('.contact-item').filter({ hasText: 'Website' });
    const websiteLink = websiteItem.locator('a');

    await expect(websiteLink).toHaveAttribute('href', 'https://resume.jclee.me');
    await expect(websiteLink).toHaveAttribute('target', '_blank');
  });
});

test.describe('Footer', () => {
  test('should display footer with copyright', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveAttribute('role', 'contentinfo');

    const footerText = page.locator('.footer-text');
    await expect(footerText).toContainText('© 2026 Jaecheol Lee');
    await expect(footerText).toContainText('All rights reserved');
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const themeToggle = page.locator('.theme-toggle');

    // Initial state should be light
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

    // Toggle to dark
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');

    // Toggle back to light
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
  });

  test('should persist theme in localStorage', async ({ page }) => {
    await page.goto('/');

    // Toggle to dark mode
    await page.click('.theme-toggle');

    // Check localStorage
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe('dark');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should still be dark mode
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('External Links Validation', () => {
  test('all external links should have proper attributes', async ({ page }) => {
    await page.goto('/');

    // Find all external links (starting with http)
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      await link.getAttribute('href'); // Check href exists

      // Skip download links (they don't need target="_blank")
      const isDownload = await link.getAttribute('download');
      if (isDownload !== null) continue;

      // External links should open in new tab
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');

      if (target === '_blank') {
        // Should have security attributes
        expect(rel).toMatch(/noopener/);
      }
    }
  });
});

test.describe('Data Consistency', () => {
  test('resume count should match data.json', async ({ page }) => {
    await page.goto('/');
    const resumeCards = page.locator('#resume .doc-card');
    await expect(resumeCards).toHaveCount(projectData.resume.length);
  });

  test('project count should match data.json', async ({ page }) => {
    await page.goto('/');
    const projectCards = page.locator('#projects .project-card');
    await expect(projectCards).toHaveCount(projectData.projects.length);
  });

  test('resume titles should match data.json order', async ({ page }) => {
    await page.goto('/');

    for (let i = 0; i < projectData.resume.length; i++) {
      const expected = projectData.resume[i].title;
      const actual = page.locator('#resume .doc-card').nth(i).locator('.doc-title');
      await expect(actual).toContainText(expected);
    }
  });

  test('project titles should match data.json order', async ({ page }) => {
    await page.goto('/');

    for (let i = 0; i < projectData.projects.length; i++) {
      const expected = projectData.projects[i].title;
      const actual = page.locator('#projects .project-card').nth(i).locator('.project-title');
      await expect(actual).toContainText(expected);
    }
  });
});
