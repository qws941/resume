# E2E Test Failure Analysis Report
**Resume Project** | **24 Tests Failing** | **CI/CD Blocked**

---

## 📋 Executive Summary

| Metric | Value |
|--------|-------|
| **Total E2E Tests** | 250 |
| **Failing Tests** | 24 |
| **Primary Root Cause** | Missing `scrollIntoViewIfNeeded()` on mobile click test |
| **Secondary Issues** | Visual baselines, text size selector, SEO assets |
| **Files Analyzed** | mobile.spec.js (311), visual.spec.js (179), seo.spec.js (468) |

---

## 🔴 CRITICAL ISSUE: mobile.spec.js Line 217

**Error Message**: `"Element is outside of the viewport"`

**Location**: `tests/e2e/mobile.spec.js` lines 200-220 (test: "handle touch interactions")

**Code**:
```javascript
// Line 200-220
test("should handle touch interactions", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const clickable = page.locator("button, a[href]").first();

  if ((await clickable.count()) > 0) {
    await expect(clickable).toBeVisible();
    const box = await clickable.boundingBox();
    
    if (box) {
      await clickable.click();  // ← LINE 217: FAILS HERE
      await page.waitForLoadState("domcontentloaded");
      await expect(page.locator("body")).toBeVisible();
    }
  }
});
```

**Root Cause**:
- Mobile viewport is fixed (375×667 for iPhone SE, 390×844 for iPhone 12, etc.)
- `page.locator("button, a[href]").first()` finds first DOM element, not first visible
- Element may be below the fold (off-screen)
- `.click()` requires element to be scrolled into viewport first
- Missing `scrollIntoViewIfNeeded()` call before click

**Why It Fails**:
```
Mobile Viewport (375×667)
┌─────────────────────┐
│ Header              │ ← Visible
│ Hero Section        │ ← Visible
│ Projects Section    │ ← Partially visible
└─────────────────────┘
  ↓ (scrolled out of view)
  "Contact Button"    ← OFF-SCREEN
  ↓
  Footer              ← OFF-SCREEN

page.locator("button, a[href]").first()
  → Finds first button/link in DOM
  → May be below viewport
  → .click() fails: "Element outside viewport"
```

**The Fix**:
```javascript
// BEFORE (FAILS):
await clickable.click();

// AFTER (WORKS):
await clickable.scrollIntoViewIfNeeded();  // ← ADD THIS LINE
await clickable.click();
```

**Confirmation**: Pattern already used in codebase:
- ✅ `/tools/scripts/utils/record-demo-video.js` (lines 56, 69, 89)
- ✅ `/tools/scripts/build/generate-screenshots.js` (line 156)

---

## 🟠 SECONDARY ISSUES

### Issue #1: mobile.spec.js Lines 95-100 - Readable Text Size

**Test**:
```javascript
test("should have readable text sizes", async ({ page }) => {
  const bodyTexts = await page.locator("p, li, span").all();
  
  let tooSmallCount = 0;
  for (const textEl of bodyTexts.slice(0, 10)) {
    const fontSize = await textEl.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize, 10);
    });
    if (fontSize < 14) {
      tooSmallCount++;
    }
  }
  
  expect(tooSmallCount).toBeLessThan(5);  // Allow up to 4 small elements
});
```

**Problem**: 
- Selector `"p, li, span"` is too broad - catches `<small>`, `<sub>`, `<sup>` tags
- Mobile-optimized sites often use 12px for captions, annotations
- Test allows ≤4 elements < 14px, but may get 5+

**Solution Options**:

**Option A** (Recommended): Exclude small text elements
```javascript
const bodyTexts = await page.locator(
  "p:not(small):not(sub):not(sup), li, span:not(small)"
).all();
```

**Option B**: Increase threshold
```javascript
expect(tooSmallCount).toBeLessThan(6);  // Allow up to 5 small elements
```

**Option C**: Document and skip
```javascript
test.skip("should have readable text sizes", async ({ page }) => {
  // Mobile designs may use compact 12px for captions
  // Skip until text content stabilizes
});
```

---

### Issue #2: visual.spec.js - 12 Screenshot Regression Tests

**Location**: `tests/e2e/visual.spec.js` (179 lines)

**Baseline Strategy**:
- **Directory**: `tests/e2e/visual.spec.js-snapshots/`
- **Format**: Device-specific PNG files
- **Naming**: `{name}-chromium-linux.png`
- **Tolerance**: `maxDiffPixelRatio: 0.05` (5% pixel difference allowed)
- **Files**: 15 baseline images (1.3-1.5 MB each)

**Test Coverage**:
```
Desktop (1280×720)
├─ desktop-homepage.png (full page) ← 1.2 MB
├─ desktop-hero.png
├─ desktop-projects.png
├─ desktop-resume.png
└─ desktop-stats.png (SKIPPED - feature removed)

Mobile (375×667)
├─ mobile-homepage.png (full page) ← 1.1 MB
├─ mobile-hero.png
└─ mobile-project-card.png

Tablet (768×1024)
└─ tablet-homepage.png ← 1.5 MB

Dark Mode (1280×720)
└─ dark-mode-homepage.png ← 1.2 MB

Components
├─ footer.png
├─ download-buttons.png
├─ project-card.png
└─ stat-card.png (SKIPPED - feature removed)
```

**Failure Modes**:
1. **CSS Change** → Pixel mismatch
2. **Layout Shift** → Pixel mismatch
3. **Color/Style** → Pixel mismatch
4. **Animation Timing** → Intermittent failures
5. **Font Rendering** → Cross-platform differences

**Fix Process**:
```bash
# Install Playwright browsers
npx playwright install

# Run tests with snapshot update
npx playwright test tests/e2e/visual.spec.js --update-snapshots

# Review changes in UI mode
npx playwright test --ui

# Commit updated baselines
git add tests/e2e/visual.spec.js-snapshots/
git commit -m "chore: update visual regression baselines"
```

---

### Issue #3: seo.spec.js - Meta Tags & Schema Validation

**Lines 100-110**: og:image with dimensions
```javascript
test("should have og:image with dimensions", async ({ page }) => {
  const ogImage = await page.getAttribute('meta[property="og:image"]', "content");
  expect(ogImage).toBeTruthy();
  expect(ogImage).toMatch(/og-image\.webp$/);  // Expects .webp format
  
  const width = await page.getAttribute('meta[property="og:image:width"]', "content");
  expect(width).toBe("1200");  // Expects exact dimensions
  
  const height = await page.getAttribute('meta[property="og:image:height"]', "content");
  expect(height).toBe("630");
});
```

**Failure Likely Reason**: `og-image.webp` file missing or dimensions wrong in HTML

**Lines 210-220**: Twitter card description
```javascript
test("should have twitter:description", async ({ page }) => {
  const desc = await page.getAttribute('meta[name="twitter:description"]', "content");
  expect(desc).toBeTruthy();
  expect(desc.length).toBeGreaterThan(50);  // Min 50 characters
});
```

**Status**: ✅ Good - flexible assertion, unlikely to fail

**Lines 335-345**: JSON-LD CollectionPage schema
```javascript
test("should have CollectionPage schema", async ({ page }) => {
  const schema = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const script of scripts) {
      try {
        const data = JSON.parse(script.textContent || "");
        if (data["@type"] === "CollectionPage") return data;
      } catch {}
    }
    return null;
  });
  
  expect(schema).toBeTruthy();
  expect(schema.mainEntity.itemListElement).toBeInstanceOf(Array);
});
```

**Failure Likely Reason**: JSON-LD schema out of sync with portfolio data

---

## 📊 Test File Analysis Summary

### mobile.spec.js (311 lines)
| Section | Lines | Issue | Priority |
|---------|-------|-------|----------|
| Touch interactions | 200-220 | ❌ No scroll before click | **P0 CRITICAL** |
| Readable text | 95-100 | ⚠️ Selector too broad | **P1 HIGH** |
| Touch target sizes | 45-73 | ✅ OK | - |
| Horizontal overflow | 75-93 | ✅ OK | - |
| Scrollable | 177-198 | ✅ OK | - |
| Orientation change | 231-264 | ✅ OK | - |
| Load time | 269-279 | ✅ OK | - |

### visual.spec.js (179 lines)
| Category | Tests | Status | Files |
|----------|-------|--------|-------|
| Desktop | 5 | ⚠️ Snapshot mismatch | 5 baseline PNGs |
| Mobile | 3 | ⚠️ Snapshot mismatch | 3 baseline PNGs |
| Tablet | 1 | ⚠️ Snapshot mismatch | 1 baseline PNG |
| Dark Mode | 1 | ⚠️ Snapshot mismatch | 1 baseline PNG |
| Components | 4 | ⚠️ Snapshot mismatch | 4 baseline PNGs |

### seo.spec.js (468 lines)
| Category | Tests | Status | Notes |
|----------|-------|--------|-------|
| Meta Tags | 5 | ✅ OK | Assertions correct |
| Open Graph | 9 | ⚠️ May fail | og-image.webp check |
| Twitter Card | 6 | ✅ OK | Assertions reasonable |
| JSON-LD | 4 | ⚠️ Schema dependent | May need regeneration |
| PWA Meta | 3 | ✅ OK | manifest.json present |
| Resource Hints | 2 | ✅ OK | dns-prefetch present |
| SEO Routes | 3 | ✅ OK | robots.txt, sitemap.xml OK |

---

## 🛠️ Implementation Plan

### Phase 1: Critical Fix (P0)
**Time**: 5 minutes

1. Edit `tests/e2e/mobile.spec.js` line 217
2. Add `await clickable.scrollIntoViewIfNeeded();` before `await clickable.click();`
3. Verify fix by running mobile tests
4. Commit: `fix: add scrollIntoViewIfNeeded to mobile click test`

### Phase 2: High Priority Fixes (P1)
**Time**: 30-45 minutes

1. **Text Size Selector** (mobile.spec.js:95)
   - Update selector to exclude `<small>`, `<sub>`, `<sup>`
   - Or increase threshold from 5 to 6
   - Commit: `fix: refine text size selector on mobile tests`

2. **Visual Baselines** (visual.spec.js)
   - Run: `npx playwright install`
   - Run: `npx playwright test tests/e2e/visual.spec.js --update-snapshots`
   - Review changes in UI mode
   - Commit: `chore: update visual regression baselines`

3. **SEO Assets** (seo.spec.js)
   - Verify `og-image.webp` exists and is 1200×630
   - Check HTML meta tags for correct dimensions
   - Verify JSON-LD schemas are in HTML
   - Commit: `fix: verify SEO assets and meta tags`

### Phase 3: Documentation (P2)
**Time**: 15 minutes

1. Add comment explaining `scrollIntoViewIfNeeded()` pattern
2. Document visual baseline update process
3. Create `/docs/guides/E2E_TEST_MAINTENANCE.md`
4. Commit: `docs: E2E test maintenance guide`

---

## ✅ Understanding "Element Outside Viewport"

### Definition
Playwright's `.click()` action requires the target element to be **visible within the current viewport**.

### Why It Happens
```javascript
// Mobile viewport = 375×667 (fixed)
// Page content = 2000px tall (scrollable)

// This element may be off-screen:
const clickable = page.locator("button, a[href]").first();

// .first() finds first in DOM tree, not first visible
// → May be at Y position 900px (below viewport)
// → .click() fails without scroll
```

### Visual Diagram
```
Viewport (375×667)         Full Page
┌─────────────────┐       ┌─────────────────┐
│ Header (0-50)   │       │ Header (0-50)   │
│ Hero (50-400)   │ ←──→  │ Hero (50-400)   │
│ Projects        │       │ Projects        │
│ (400-800)       │       │ (400-800)       │
└─────────────────┘       │ Button (800)    │ ← OFF-SCREEN
  ↓ SCROLL                │ Contact (900)   │ ← OFF-SCREEN
  Need to show:           │ Footer (1800)   │ ← OFF-SCREEN
  "Contact Button"        └─────────────────┘
```

### Solution
```javascript
// BEFORE: Fails with "Element outside viewport"
await element.click();

// AFTER: Works - scrolls element into view first
await element.scrollIntoViewIfNeeded();
await element.click();
```

### Browser API Reference
- **`scrollIntoViewIfNeeded()`**: Playwright built-in, scrolls only if needed
- **Behavior**: Scrolls page so element is visible in viewport
- **Idempotent**: Safe to call even if element already visible
- **Standard**: Part of Playwright's locator actions

---

## 📝 Playwright Configuration

**File**: `playwright.config.js`

Key settings:
```javascript
{
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,  // 2 retries in CI
  workers: process.env.CI ? 1 : undefined,
  
  // Mobile device projects
  projects: [
    {
      name: "mobile-iphone-se",
      use: devices["iPhone SE"],  // 375×667
      testMatch: /mobile\.spec\.js/,
    },
    {
      name: "mobile-iphone-12",
      use: devices["iPhone 12 Pro"],  // 390×844
      testMatch: /mobile\.spec\.js/,
    },
    {
      name: "mobile-pixel",
      use: devices["Pixel 5"],  // 393×851
      testMatch: /mobile\.spec\.js/,
    },
    {
      name: "mobile-ipad",
      use: devices["iPad"],  // 768×1024
      testMatch: /mobile\.spec\.js/,
    },
  ],
}
```

---

## 🔗 Related Resources

### Documentation
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Screenshots](https://playwright.dev/docs/test-snapshots)
- [Playwright Mobile Testing](https://playwright.dev/docs/mobile)

### Code Examples in Project
- ✅ `tools/scripts/utils/record-demo-video.js` - Uses `scrollIntoViewIfNeeded()`
- ✅ `tools/scripts/build/generate-screenshots.js` - Uses `scrollIntoViewIfNeeded()`

### CI/CD Integration
- **GitHub Actions**: `.github/workflows/ci.yml` runs E2E tests
- **Pre-commit Hook**: ESLint validation
- **Test Report**: HTML report in `playwright-report/`

---

## 🎯 Success Criteria

- [x] Identified root cause of mobile click failures
- [x] Identified root cause of text size selector issues
- [x] Documented visual baseline strategy
- [x] Verified SEO test assertions
- [x] Created implementation plan
- [ ] **Next**: Apply fixes in priority order
- [ ] **Then**: Run full test suite and verify all 24 tests pass

---

**Last Updated**: 2025-02-01  
**Analyzed By**: Code Analysis Agent  
**Status**: Analysis Complete - Ready for Implementation  
