# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-03
**Commit:** 213ab0f
**Branch:** master
**Build System:** Bazel + npm

## OVERVIEW

Google3-style MCP Server for stealth job automation.
Hybrid strategy: Chaos API (Wanted internal) + Stealth Crawlers (Playwright).
Integrates with Cloudflare D1 for persistence and n8n for scheduling.

## STRUCTURE

```
job-automation/
├── src/
│   ├── shared/                # Hexagonal core domain logic
│   │   ├── services/          # Business logic (Apply, Matching, Session)
│   │   └── clients/           # Infrastructure adapters (API, D1)
│   ├── tools/                 # MCP entry points for OpenCode
│   ├── auto-apply/            # Playwright-based auto-apply logic
│   └── server/                # Fastify management API
├── platforms/                 # Stealth-hardened crawlers (Saramin, LinkedIn, etc.)
├── workers/                   # Cloudflare Worker: Job Dashboard
├── scripts/                   # Auth, sync, and maintenance utilities
├── BUILD.bazel                # Bazel build rules
└── OWNERS                     # Package code owners
```

## WHERE TO LOOK

| Task                  | Location                        | Notes                          |
| --------------------- | ------------------------------- | ------------------------------ |
| **MCP Entry Point**   | `src/index.js`                  | 9 tools, 1 resource, 3 prompts |
| **Platform Crawlers** | `platforms/`                    | Inherit from `BaseCrawler`     |
| **Apply System**      | `src/shared/services/apply/`    | `UnifiedApplySystem`           |
| **Dashboard UI**      | `workers/src/views/`            | Refactored styles & scripts    |
| **Auth Automation**   | `scripts/auth-sync.js`          | OAuth + Cookie synchronization |
| **Matching Engine**   | `src/shared/services/matching/` | AI & Keyword-based scoring     |

## CODE MAP

| Component            | Location                           | Bazel Target                    |
| -------------------- | ---------------------------------- | ------------------------------- |
| `UnifiedApplySystem` | `src/shared/services/apply/`       | `//typescript/job-automation:*` |
| `SessionManager`     | `src/shared/services/session/`     | `//typescript/job-automation:*` |
| `BaseCrawler`        | `src/crawlers/base-crawler.js`     | `//typescript/job-automation:*` |
| `JobMatcher`         | `src/shared/services/matching/`    | `//typescript/job-automation:*` |
| `LokiLogger`         | `workers/src/utils/loki-logger.js` | `//typescript/job-automation:*` |

## BAZEL TARGETS

```bash
# Build the automation package
bazel build //typescript/job-automation:build

# Run all tests (unit + integration)
bazel test //typescript/job-automation:test

# Deploy the dashboard worker
bazel run //typescript/job-automation/workers:deploy
```

## CONVENTIONS

### Stealth & Evasion

- **BaseCrawler**: All browser-based tasks MUST inherit from `BaseCrawler` to use hardened headers and evasion patches.
- **WAF Awareness**: Avoid high-frequency requests to Wanted/Saramin to prevent CloudFront blocking.

### Auth & Persistence

- **Session Storage**: Wanted session cookies stored in `~/.OpenCode/data/wanted-session.json`.
- **D1 Database**: Application tracking and analytics stored in `job-dashboard-db`.
- **Secrets**: `LOKI_API_KEY` and `AUTH_SYNC_SECRET` must be set via `wrangler secret put --env production`.

### Development

- **Hexagonal Architecture**: Keep business logic in `services/` and infrastructure in `clients/`.
- **Dry Run**: Always implement `dryRun` mode for application and sync tools.

## ANTI-PATTERNS

| Anti-Pattern      | Why              | Do Instead                            |
| ----------------- | ---------------- | ------------------------------------- |
| Naked Playwright  | 403 Forbidden    | Use `BaseCrawler`                     |
| Direct API Write  | 500 Internal Err | Use sync scripts/Chaos API            |
| Environment Drift | Deployment fail  | Always use `--env production`         |
| Hardcoded IDs     | Brittle code     | Resolve IDs dynamically via tools     |
| Global State      | Testing hell     | Use dependency injection              |
| Skills v2 API     | 404 Not Found    | Use v1 with `text` field (not `name`) |
| Duplicate clients | Sync drift       | workers/ duplicates shared/ code      |

## API QUIRKS

| Section | API Version | Field Name | Notes                              |
| ------- | ----------- | ---------- | ---------------------------------- |
| Skills  | **v1**      | `text`     | Others use v2 with `name`          |
| Links   | v2          | -          | **Broken** (500 error, Wanted bug) |

## CRON SCHEDULES

| Schedule  | Task         | Trigger             |
| --------- | ------------ | ------------------- |
| 09:00 KST | Job search   | n8n webhook         |
| 18:00 KST | Daily report | n8n webhook → Slack |

## COMMANDS

```bash
# === Automation ===
npm run auto-apply:dry           # Test application logic without submission
npm run sync:resume              # Sync local resume JSON to Wanted
npm run auth:sync                # Synchronize OAuth cookies to Worker

# === Dashboard ===
npm run dashboard:dev            # Local development server for UI
npm run deploy:prod              # Deploy dashboard to production

# === Testing ===
npm test                         # Run all tests
npm run test:crawlers            # Run platform-specific crawler tests
```
