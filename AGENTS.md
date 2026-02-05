# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-05
**Commit:** 3d9015d
**Branch:** master
**Build System:** Bazel + npm (Google3-style hybrid)

## OVERVIEW

Google3-style monorepo (TypeScript/Cloudflare Workers) for Resume Portfolio & Job Automation.

| Application      | Domain          | Technology          | Purpose                  |
| ---------------- | --------------- | ------------------- | ------------------------ |
| portfolio-worker | resume.jclee.me | Cloudflare Worker   | Edge-deployed portfolio  |
| job-automation   | job.jclee.me    | MCP Server + Worker | Stealth job application  |
| resume-cli       | (local)         | Commander.js        | Deployment orchestration |

**Key Principles:**

- **SSoT**: All data flows from `typescript/data/resumes/master/resume_data.json`
- **Bazel Facade**: Bazel coordinates, npm executes (hybrid Google3)
- **Zero-Runtime I/O**: Portfolio worker inlines all assets at build time
- **Stealth-First**: Job automation uses anti-detection crawlers

## STRUCTURE

```
resume/
├── typescript/                    # Language-based source directory
│   ├── cli/                       # Deployment CLI (Commander.js)
│   ├── data/                      # SSoT: Resume JSONs & schemas
│   ├── job-automation/            # MCP Server + Dashboard Worker
│   │   ├── src/                   # Core application
│   │   │   ├── crawlers/          # Anti-bot stealth crawlers
│   │   │   ├── shared/            # Cross-cutting services
│   │   │   └── tools/             # MCP tool implementations
│   │   └── workers/               # Dashboard Cloudflare Worker
│   └── portfolio-worker/          # Edge portfolio worker
│       ├── lib/                   # Stateless modules (security-headers.js)
│       └── src/styles/            # Modular CSS (animations, components)
├── tools/                         # Build, deploy, CI scripts
│   ├── scripts/build/             # npm script wrappers
│   └── ci/                        # affected.sh, CI helpers
├── tests/                         # Jest unit + Playwright E2E
├── infrastructure/                # Grafana/Elasticsearch/Prometheus/n8n
├── third_party/                   # npm deps (One Version Rule)
├── docs/                          # Documentation hub
├── BUILD.bazel                    # Root build aliases
├── MODULE.bazel                   # Bzlmod configuration
└── OWNERS                         # Root code owners
```

## ENTRY POINTS

| Component        | Entry Point                                       | Notes                     |
| ---------------- | ------------------------------------------------- | ------------------------- |
| MCP Server       | `typescript/job-automation/src/index.js`          | Fastify + MCP tools       |
| Portfolio Build  | `typescript/portfolio-worker/generate-worker.js`  | HTML → Worker compiler    |
| Dashboard Worker | `typescript/job-automation/workers/src/index.js`  | Cloudflare Worker entry   |
| CLI Tool         | `typescript/cli/bin/run.js`                       | `resume-cli` Commander.js |
| Resume Data      | `typescript/data/resumes/master/resume_data.json` | Canonical SSoT            |

## CODE MAP

| Component             | Location                                                 | Purpose                     |
| --------------------- | -------------------------------------------------------- | --------------------------- |
| `BaseCrawler`         | `typescript/job-automation/src/crawlers/base-crawler.js` | Anti-bot stealth base class |
| `UnifiedApplySystem`  | `typescript/job-automation/src/shared/services/apply/`   | Centralized job application |
| `SessionManager`      | `typescript/job-automation/src/shared/services/session/` | Session persistence         |
| `WantedClient`        | `typescript/job-automation/src/shared/clients/wanted/`   | Wanted.co.kr API client     |
| `generate-worker.js`  | `typescript/portfolio-worker/generate-worker.js`         | HTML → worker.js compiler   |
| `security-headers.js` | `typescript/portfolio-worker/lib/security-headers.js`    | CSP baseline, HSTS          |
| `sync-resume-data.js` | `tools/scripts/utils/sync-resume-data.js`                | SSoT propagation script     |
| `terminalCommands`    | `typescript/portfolio-worker/index.html`                 | Interactive CLI commands    |

## BAZEL TARGETS

```bash
# Query all targets
bazel query "//..."

# Build portfolio (triggers npm under hood)
bazel build //typescript/portfolio-worker:build

# Run tests
bazel build //typescript/job-automation:test

# Deploy all applications
bazel build //tools:deploy

# Find affected targets (CI)
./tools/ci/affected.sh origin/master
```

**Note:** Bazel wraps npm scripts. For direct execution:

```bash
npm run build:all     # Build all
npm run test:all      # Run all tests
npm run sync:data     # Propagate SSoT changes
```

## ANTI-PATTERNS

| Anti-Pattern                   | Why                        | Do Instead                          |
| ------------------------------ | -------------------------- | ----------------------------------- |
| Edit `worker.js` directly      | Regenerated on build       | Edit `generate-worker.js` or HTML   |
| `trim()` before CSP hash       | Whitespace affects SHA-256 | Hash exact source string            |
| Naked Puppeteer/Playwright     | Bot detection              | Use `BaseCrawler` with stealth      |
| Cross-client imports           | Circular dependencies      | Each client isolated in own dir     |
| Hardcode secrets               | Security violation         | Use `.env` or `wrangler secret`     |
| Skip OWNERS review             | Breaks code ownership      | Get OWNERS approval                 |
| Edit resume in multiple places | Data inconsistency         | Edit only `resume_data.json` (SSoT) |
| Duplicate shared code          | workers/ vs shared/ drift  | Keep business logic in shared/      |

## REFACTORING CANDIDATES

| File                 | Lines | Issue            | Recommended Fix                    |
| -------------------- | ----- | ---------------- | ---------------------------------- |
| `webhooks.js`        | 1129  | God Object       | Split into handlers/ by event type |
| `resume-sync.js`     | 955   | 450-line switch  | Command pattern                    |
| `generate-worker.js` | 1156  | Monolithic build | Extract CSP/routing modules        |

## BUILD PIPELINE

### Portfolio Worker

```
typescript/data/resumes/master/resume_data.json  (SSoT)
    ↓ sync-resume-data.js
typescript/portfolio-worker/index.html
    ↓ generate-worker.js (escape backticks, compute CSP hashes)
typescript/portfolio-worker/worker.js  (NEVER EDIT)
    ↓ wrangler deploy
resume.jclee.me (Cloudflare Edge)
```

### Job Automation

```
MCP Server: src/index.js → Fastify HTTP + MCP tools
    ├── Crawlers: BaseCrawler → platform-specific (Wanted, Saramin, etc.)
    └── Services: UnifiedApplySystem → SessionManager → Clients

Dashboard Worker: workers/src/index.js → Cloudflare Worker
    └── job.jclee.me (analytics dashboard)
```

## CI/CD PIPELINE

**Manual Deployment (Primary):**

```bash
# Deploy portfolio worker
source ~/.env && cd typescript/portfolio-worker && \
  CLOUDFLARE_API_KEY="$CLOUDFLARE_API_KEY" \
  CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL" \
  npx wrangler deploy --env production
```

**Historical Note:** GitHub Actions configuration was removed. Some docs may reference old pipeline stages.

## TESTING

| Type   | Framework  | Location      | Coverage Floor |
| ------ | ---------- | ------------- | -------------- |
| Unit   | Jest       | `tests/unit/` | 90%            |
| E2E    | Playwright | `tests/e2e/`  | Critical paths |
| Visual | Playwright | `*.spec.js`   | 5% pixel diff  |

**Special Requirements:**

- `generate-worker.js` requires 100% coverage
- All tests data-driven from `typescript/data` SSoT
- E2E defaults to production URL
- E2E uses `domcontentloaded` wait strategy for portfolio

## CONVENTIONS

### Google3 Style

- **Language Directories**: `typescript/`, not `apps/` or `packages/`
- **OWNERS Files**: Every package has code ownership
- **BUILD.bazel**: Explicit dependency declarations
- **Visibility**: Default private, explicit exports

### Code Style

- ESM modules (`type: "module"` in package.json)
- No ESLint/Prettier configs (scripts exist, configs missing)
- JSDoc for public APIs

### Scripts

- All scripts assume `pwd` is project root
- Use `npm run <script>` from root, not subdirectories

## FILES

| File           | Purpose                            |
| -------------- | ---------------------------------- |
| `MODULE.bazel` | Bzlmod deps (rules_shell)          |
| `WORKSPACE`    | Legacy Bazel compat                |
| `.bazelrc`     | Build configurations               |
| `BUILD.bazel`  | Package build rules (root aliases) |
| `OWNERS`       | Root code ownership                |
| `package.json` | npm workspaces root                |

## AGENTS.MD HIERARCHY

Subdirectory AGENTS.md files provide domain-specific context:

| Path                                    | Focus                                       |
| --------------------------------------- | ------------------------------------------- |
| `typescript/cli/AGENTS.md`              | CLI tool usage, Wrangler wrapper            |
| `typescript/data/AGENTS.md`             | SSoT schema, sync process                   |
| `typescript/job-automation/AGENTS.md`   | MCP server, crawlers, workers               |
| `typescript/portfolio-worker/AGENTS.md` | Terminal UI, CLI, build pipeline, CSP       |
| `tests/AGENTS.md`                       | Test patterns, coverage reqs, wait strategy |
| `tools/AGENTS.md`                       | Build scripts, CI utilities                 |
| `infrastructure/AGENTS.md`              | Observability stack (Grafana)               |

See subdirectory AGENTS.md for deeper context on each component.
