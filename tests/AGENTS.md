# TEST SUITE (tests/)

**Reason:** Shared test suite
**Generated:** 2026-01-30
**Commit:** 0b7a931e

## OVERVIEW

Centralized verification hub for the project. Provides shared validation logic across apps, browser-based E2E stability checks, and integration tests for cross-service connectivity (n8n, Grafana, Cloudflare).

## STRUCTURE

```
tests/
├── unit/               # JEST: Shared logic & worker generation
│   └── lib/            # Mirror of typescript/portfolio-worker/lib/
├── e2e/                # PLAYWRIGHT: Browser-based validation
│   └── visual.spec.js-snapshots/  # Visual regression baselines
├── integration/        # INTEGRATION: Cross-service flow tests
└── n8n-webhook-test.sh # N8N: Connectivity verification script
```

## WHERE TO LOOK

| Task              | Location                       | Notes                                  |
| ----------------- | ------------------------------ | -------------------------------------- |
| **Core Logic**    | `unit/lib/`                    | Logic shared across portfolio workers  |
| **Worker Gen**    | `unit/generate-worker.test.js` | Validates HTML-to-Worker pipeline      |
| **Browser Tests** | `e2e/`                         | Run against production URLs by default |
| **Snapshots**     | `e2e/*.snapshots/`             | Device-specific visual baselines       |
| **Integrations**  | `integration/`                 | n8n and service-level verification     |

## CONVENTIONS

- **Coverage Floor**: 90% floor for shared libs; 100% for `generate-worker.js`.
- **E2E Environment**: Defaults to production; use `BASE_URL` env to override.
- **Visual Threshold**: Snapshot tolerance `maxDiffPixelRatio: 0.05`.
- **Naming Patterns**: `*.test.js` (Unit), `*.spec.js` (E2E).
- **Data Integrity**: Expectations must derive from `typescript/data/` source of truth.
- **Test Framework**: Jest for unit tests; `node:test` used at depth 5 for some modules.
- **Device Projects**: Playwright configured for Desktop Chrome, Mobile Safari (see playwright.config.js).

## ANTI-PATTERNS

- **Brittle Selectors**: Use `aria-label` or semantic classes over raw XPath/CSS.
- **Arbitrary Sleeps**: Use `networkidle` or `waitForSelector` for stability.
- **Global Pollution**: Integration tests must be idempotent and cleanup state.
- **Blind Snapshots**: Verify diffs in UI mode before updating baselines.
- **Side Effects**: Tests should not modify production data without explicit intent.
