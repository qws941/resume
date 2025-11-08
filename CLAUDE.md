# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal resume management system for infrastructure and security engineer with 8+ years of experience. Manages multiple resume versions (master, company-specific) and provides a web portfolio deployed on Cloudflare Workers.

**Live Site**: https://resume.jclee.me (Cloudflare Workers)

**Key Concept**: This is a **source-to-worker pipeline** where source files (HTML/CSS/JSON) are transformed into a single deployable Cloudflare Worker. Direct HTML editing doesn't affect production - you must regenerate `worker.js` via `npm run build`.

## Key Commands

### Web Portfolio Development

```bash
# Serve portfolio locally
cd web
python3 -m http.server 8000
# → http://localhost:8000/index.html

# CRITICAL: Generate worker.js after editing HTML
npm run build
# OR: cd web && node generate-worker.js
# → Creates web/worker.js with embedded HTML (MUST run before deployment)

# Deploy to Cloudflare Workers (includes build)
npm run deploy
# OR: cd web && wrangler deploy

# Local development with Wrangler
npm run dev
# → http://localhost:8787

# Check deployment status
cd web && wrangler deployments list
```

### Testing

```bash
# Run all unit tests (Jest)
npm test

# Watch mode for development
npm test:watch

# Coverage report
npm test:coverage

# E2E tests (Playwright - requires worker.js to be built)
npm run test:e2e

# E2E with UI (interactive debugging)
npm run test:e2e:ui

# E2E headed mode (visible browser)
npm run test:e2e:headed

# Run all tests before deployment (recommended)
npm run build && npm test && npm run test:e2e
```

**Important**: E2E tests validate the generated `worker.js`, so always run `npm run build` before E2E testing if you've changed source files.

### Code Quality

```bash
# Lint code (ESLint 9 with flat config)
npm run lint

# Format code (Prettier)
npm run format

# Run single test file
npm test -- tests/unit/generate-worker.test.js

# Run tests matching pattern
npm test -- --testNamePattern="CSP hash"
```

### PDF Generation

```bash
# Pandoc method (Korean font support)
cd toss
./pdf-convert.sh
# Requires: pandoc, texlive-xetex, texlive-lang-korean
# → Creates lee_jaecheol_toss_commerce_resume.pdf

# Python method (if available)
python scripts/generate_pdf.py
```

### Content Management

```bash
# Update master resume (single source of truth)
vim master/resume_master.md

# Create submission version
cp master/resume_master.md master/resume_final.md
```

## Architecture

### Critical Worker Generation Workflow

**IMPORTANT**: The portfolio uses Cloudflare Workers, but the HTML files are NOT directly deployed.

**Phase 1: CSS Separation** (Completed 2025-11-07)
- `web/styles.css` contains all CSS (758 lines)
- `web/index.html` has CSS placeholder: `<!-- CSS_PLACEHOLDER -->`
- Build script injects CSS at build time

**Phase 2: Data-Driven Templates** (Completed 2025-11-07)
- `web/data.json` contains all project data (resume cards + project cards)
- `web/index.html` has placeholders: `<!-- RESUME_CARDS_PLACEHOLDER -->` and `<!-- PROJECT_CARDS_PLACEHOLDER -->`
- Build script generates HTML from JSON at build time

**Build Pipeline** (3 phases):
1. **Edit Content**: Modify `web/data.json` (project data) OR `web/index.html` (structure) OR `web/styles.css` (styling)
2. **Generate Worker**: Run `npm run build` (performs 6 transformations)
3. **Deploy**: Push to `master` branch (GitHub Actions auto-deploys) OR run `wrangler deploy` manually

**6 Critical Transformations** (`web/generate-worker.js`):
1. **CSS Injection**: Reads `styles.css`, replaces `<!-- CSS_PLACEHOLDER -->` (758 lines → inline CSS)
2. **Data Injection**: Reads `data.json`, generates HTML cards from templates (resume + projects)
3. **HTML Minification**: 15% size reduction using `html-minifier-terser` (whitespace removal, tag optimization)
4. **CSP Hash Generation**: Extracts `<script>` and `<style>` tags, generates SHA-256 hashes (CRITICAL: no trim())
5. **Template Literal Escaping**: Escapes backticks (`) and dollar signs ($) for safe JavaScript embedding
6. **Deployment Timestamp**: Injects `DEPLOYED_AT` from environment variable (ISO 8601 UTC)

**Worker Routing**:
- `/` → Embedded index.html (minified)
- `/health` → Health check JSON (status, metrics, uptime)
- `/metrics` → Prometheus exposition format
- `/api/vitals` → Web Vitals POST endpoint (Loki logging)

**Common Mistake**: Editing `worker.js` directly or deploying without running `npm run build` will result in outdated production code.

**Template Functions** (`web/generate-worker.js`):
- `generateResumeCards(data)`: Creates resume project cards (lines 62-84)
- `generateProjectCards(data)`: Creates portfolio project cards (lines 86-130)
- Special handling for Grafana project with multiple dashboard links

**CRITICAL CSP Hash Calculation**:
- CSP hashes MUST be calculated from **original HTML before escaping** (web/generate-worker.js:61-78)
- **DO NOT use `.trim()`** on extracted inline scripts/styles before hashing
- Browsers calculate CSP hashes with **exact whitespace** as rendered in HTML
- Commit f67b5eb fixed this: removed `trim()` from hash calculation to match browser behavior

### Observability Endpoints

The Cloudflare Worker exposes three monitoring endpoints:

**1. Health Check** (`/health`):
```bash
curl https://resume.jclee.me/health
```
Returns JSON with service status, version, deployment time, uptime, and metrics:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "deployed_at": "2025-10-18T09:45:00.000Z",
  "uptime_seconds": 3600,
  "metrics": {
    "requests_total": 1234,
    "requests_success": 1230,
    "requests_error": 4,
    "vitals_received": 56
  }
}
```

**2. Prometheus Metrics** (`/metrics`):
```bash
curl https://resume.jclee.me/metrics
```
Returns Prometheus exposition format for Grafana integration:
```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{job="resume"} 1234

# HELP http_response_time_seconds Average response time
# TYPE http_response_time_seconds gauge
http_response_time_seconds{job="resume"} 0.05
```

**3. Web Vitals Collection** (`/api/vitals`):
```bash
curl -X POST https://resume.jclee.me/api/vitals \
  -H "Content-Type: application/json" \
  -d '{"lcp": 1250, "fid": 50, "cls": 0.05}'
```
Accepts POST requests with Web Vitals data (LCP, FID, CLS, FCP, TTFB), logs to Grafana Loki.

**Loki Integration**:
- All requests logged to `https://grafana.jclee.me/loki/api/v1/push`
- Fire-and-forget async logging (non-blocking, doesn't delay response)
- Log labels: `job="resume-worker"`, `level="INFO|ERROR"`, `path="/..."`, `method="GET"`
- Failed Loki writes are silently caught (logged to console but don't block request)

### Content Hierarchy

**Source Files**:
- **master/resume_master.md**: Single source of truth (complete career history)
- **master/resume_final.md**: Compressed submission version (downloadable from portfolio)
- **company-specific/**: Tailored resumes derived from master
- **web/data.json**: Portfolio project data (resume cards + project cards)
- **web/styles.css**: All CSS styles (758 lines)
- **web/index.html**: HTML structure with placeholders (200 lines)
- **resume/nextrade/**: Technical documentation (Architecture, DR, SOC) for download

**Generated Files** (do not edit directly):
- **web/worker.js**: Cloudflare Worker with embedded HTML (30.57 KB, auto-generated)

**Data Structure** (`web/data.json`):
```json
{
  "resume": [
    {
      "icon": "🏦",
      "title": "Project Title",
      "description": "Project description",
      "stats": ["Tag1", "Tag2"],
      "highlight": true,  // Optional, for featured projects
      "pdfUrl": "...",    // For standard resume cards
      "docxUrl": "...",   // For standard resume cards
      "completePdfUrl": "..."  // For highlighted resume cards
    }
  ],
  "projects": [
    {
      "icon": "🔥",
      "title": "Project Title",
      "tech": "Tech Stack",
      "description": "Description",
      "liveUrl": "...",   // For standard projects
      "githubUrl": "...", // For standard projects
      "dashboards": [...], // For Grafana project with multiple links
      "documentationUrl": "..."  // For projects with docs
    }
  ]
}
```

All versions must maintain consistency in:
- Career dates and timeline
- Quantitative metrics (format: "50% 시간 단축 (8시간 → 4시간)")
- Technical stack keywords

### Git Repository

**Primary**: GitLab (ssh://git@192.168.50.215:2222/jclee/resume.git)
**Mirror**: GitHub (https://github.com/qws941/resume.git)

**Remotes Configuration**:
```bash
origin  ssh://git@192.168.50.215:2222/jclee/resume.git  # GitLab
github  https://github.com/qws941/resume.git           # GitHub
```

**Multi-Push Workflow**:
```bash
# Push to both remotes
git push origin master  # GitLab
git push github master  # GitHub
```

### CI/CD Pipeline

#### GitHub Actions (`.github/workflows/deploy.yml`)

**Trigger**: Push to `master` branch on GitHub

**Workflow**:
1. **deploy-worker**:
   - Checkout code
   - Install Node.js 20 and Wrangler
   - Set `DEPLOYED_AT` environment variable (ISO 8601 UTC timestamp)
   - Generate worker.js with embedded timestamp
   - Deploy using `cloudflare/wrangler-action@v3`

2. **generate-deployment-notes**:
   - Fetch latest commit message
   - Call Gemini API to summarize commit for deployment log
   - Print concise 1-2 sentence summary

3. **notify-slack** (optional, if `SLACK_WEBHOOK_URL` secret exists):
   - Send rich Slack notification with deployment status
   - Include commit info, links to live site and workflow
   - Uses Slack Block Kit for formatting

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GEMINI_API_KEY`
- `SLACK_WEBHOOK_URL` (optional)

#### GitLab CI/CD (`.gitlab-ci.yml`)

**Trigger**: Tag creation (semantic versioning: `v1.0.0`)

**Pipeline** (Release-Only):
1. **validate**: Tag format validation
2. **build**: Create release package (.tar.gz)
3. **release**: Publish GitLab release
4. **notify**: Send Slack notification (optional)

**Usage**:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

**Note**: Regular commits do NOT trigger GitLab CI/CD (release-only pipeline)

**Verification**:
```bash
curl -I https://resume.jclee.me  # Expect HTTP 200
curl https://resume.jclee.me/health  # Check deployment timestamp
```

### Web Portfolio Design

**Current Design** (Updated 2025-10-18):
- Minimal 1-column layout with premium visual effects
- Dark mode toggle with localStorage persistence
- Responsive: 5 breakpoints (1200px/1024px/768px/640px/375px)
- SEO: Meta tags, Open Graph, Twitter Card, canonical URL
- Accessibility: ARIA labels, semantic HTML, 44px touch targets
- Animations: Scroll fade-in, counter animations, hover effects with cubic-bezier easing
- **NEW**: Nextrade technical documentation download section (4 docs with PDF/DOCX options)

**Typography**:
- Hero title: Playfair Display 4.8rem
- Section titles: Playfair Display 3.2rem
- Body: Inter with -0.01em letter-spacing

**Color System**:
- Primary gradient: `#7c3aed → #5b21b6 → #2563eb` (darker purple/blue for better contrast)
- Gold gradient: `#f59e0b → #d97706`
- Shadows: Enhanced opacity (0.35-0.5) for depth

**Security Headers**:
- Content-Security-Policy with SHA-256 hashes (NO `unsafe-inline`)
- Strict-Transport-Security with HSTS preload
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Testing Strategy

### Unit Tests
- **Location**: `tests/unit/`
- **Framework**: Jest 30.2.0 (CommonJS config: `jest.config.cjs`)
- **Focus**: Worker generation, HTML escaping, security headers
- **Key test**: `generate-worker.test.js` validates:
  - worker.js generation and minification
  - Backtick and `$` escaping in template literals
  - CSP hash generation for inline scripts/styles
  - Security headers presence
  - Routing logic

### Integration Tests
- **Location**: `tests/integration/`
- **Focus**: Worker HTML serving, routing, health endpoints

### E2E Tests
- **Location**: `tests/e2e/`
- **Framework**: Playwright 1.56.0
- **Browsers**: Chromium, Firefox, WebKit
- **Config**: `playwright.config.js`

### Performance Tests
- **Lighthouse CI**: `.github/workflows/lighthouse-ci.yml`
- **Budgets**:
  - Performance: ≥90 score
  - Accessibility: ≥95 score
  - Best Practices: ≥95 score
  - SEO: ≥95 score
- **Web Vitals Targets**:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1
  - FCP: <1.8s
  - TTFB: <0.8s

## Important Files

**Source Files** (edit these):
- **web/data.json**: Project data (resume cards + project cards) - Edit to add/update projects
- **web/styles.css**: All CSS styles (758 lines) - Edit to change styling
- **web/index.html**: HTML structure with placeholders (200 lines) - Edit to change layout

**Configuration Files**:
- **ENVIRONMENTAL_MAP.md**: Environment configuration (topology, dependencies, workflow)
- **DEPLOYMENT_STATUS.md**: Service deployment status report (last updated 2025-10-18)
- **web/wrangler.toml**: Cloudflare Workers config (name: "resume", main: "worker.js")
- **package.json**: Scripts, dependencies, Node.js version requirement (>=20.0.0)
- **.github/workflows/deploy.yml**: CI/CD pipeline with deployment timestamp injection

**Build System**:
- **web/generate-worker.js**: Worker generator with template system and CSP hash calculation (DO NOT trim inline content!)

**Generated Files** (do not edit):
- **web/worker.js**: Generated worker code (auto-generated, 30.57 KB)

**Tests**:
- **tests/unit/generate-worker.test.js**: Worker generation validation

## Resume Content Guidelines

### Metrics Format
- Before/after: "작업시간 50% 단축 (8시간 → 4시간)"
- Percentages: "CPU 사용률 30% 개선 (60% → 42%)"
- Availability: "99.9% 가용성 달성"

### Career Timeline
- Total: 8+ years (2017.02 ~ present)
- Current: ㈜아이티센 CTS (2025.03 ~ present) - Nextrade Securities Exchange
- Must match across all versions

### Technical Stack
- Security: DDoS, IPS, WAF, NAC, DLP, EDR, APT
- Cloud: AWS, Docker, Kubernetes, Portainer API
- Automation: Python, Ansible, CI/CD
- Compliance: ISMS-P, ISO27001

## Dependencies

### Runtime Requirements
- **Node.js**: >=20.0.0 (enforced in package.json engines)
- **npm**: Package manager (comes with Node.js)

### Key DevDependencies
- `wrangler@^4.42.2`: Cloudflare Workers CLI and local dev server
- `@playwright/test@^1.56.0`: E2E testing framework (Chromium, Firefox, WebKit)
- `jest@^30.2.0`: Unit testing framework (CommonJS config)
- `eslint@^9.37.0`: Linting (flat config: `eslint.config.cjs`)
- `prettier@^3.6.2`: Code formatting
- `html-minifier-terser@^7.2.0`: HTML minification in build pipeline
- `sharp@^0.34.4`: Image processing utilities

### Configuration Files
- `jest.config.cjs`: Jest 30 CommonJS configuration
- `eslint.config.cjs`: ESLint 9 flat config (modern syntax)
- `playwright.config.js`: Playwright E2E test configuration
- `web/wrangler.toml`: Cloudflare Workers deployment config

### Recent Updates

- **2025-11-07**: Phase 2 Refactoring - Data-Driven Templates
  - Extracted project data to `web/data.json` (resume cards + project cards)
  - Added template generation functions in `generate-worker.js`
  - Reduced `index.html` from 445 to 200 lines (245 lines of data separated)
  - Single source of truth for all project content
  - Easy project updates: edit JSON, not HTML
  - Commits: `b67d623` (Phase 1), `eb3edb4` (Phase 2)

- **2025-11-07**: Phase 1 Refactoring - CSS Separation
  - Extracted CSS to `web/styles.css` (758 lines)
  - Modified `generate-worker.js` to inject CSS during build
  - Reduced `index.html` from 1,204 to 445 lines (760 lines of CSS separated)
  - Build verified: CSP hashes correct (1 script, 1 style)
  - Final worker.js size: 30.57 KB

- **2025-10-18**: Test fixes & CI deployment timestamp
  - Dollar sign escape test accuracy improvement
  - Route pattern test aligned with actual implementation
  - GitHub Actions injects `DEPLOYED_AT` environment variable
  - 24/24 tests passing (100% success rate)

- **2025-10-13**: Repository modernization
  - ESLint 8 → 9 (flat config: `eslint.config.cjs`)
  - Jest 29 → 30 (CommonJS config: `jest.config.cjs`)
  - Wrangler 3 → 4 (major upgrade)
  - All dependencies updated to latest versions
  - Zero security vulnerabilities

## Advanced Deployment Features

### Slack Notifications

**Setup** (requires `SLACK_WEBHOOK_URL` secret in GitHub):
1. Create Slack Incoming Webhook in workspace
2. Add as GitHub repository secret
3. Notifications automatically sent on deployment

**Features**:
- Deployment success/failure status
- Commit information and links
- Rich formatting with Slack Block Kit
- Conditional execution (only if webhook configured)

**Reference**: `docs/SLACK_INTEGRATION.md`

### Local Deployment Monitoring

**Quick start**:
```bash
# Deploy with monitoring
./scripts/deploy-with-monitoring.sh

# Or monitor existing deployment
./scripts/monitor-deployment.sh
```

**4 Monitoring Modes**:
1. **Attach** (interactive): Full control with tmux
2. **Stream** (2-sec refresh): Real-time hands-off monitoring
3. **Snapshot**: Quick status check (last 50 lines)
4. **Error Search**: Grep for errors/warnings in logs

**Session Config**:
- Name: `resume-deploy`
- Scrollback: 50,000 lines
- 4-step deployment (build → test → deploy → verify)

**Reference**: `docs/MONITORING_GUIDE.md`

### TS Session Integration

**Troubleshooting**: If `ts create system` doesn't auto-attach:
```bash
# Manual attach
ts attach system

# Or direct tmux
tmux -S /home/jclee/.tmux/sockets/system attach-session -t system

# Sync database with sessions
ts sync
```

**Reference**: `docs/TS_SESSION_TROUBLESHOOTING.md`

## Common Development Patterns

### Editing Portfolio Content

**To add/update projects** (recommended approach):

1. **Edit `web/data.json`**: Add/modify project entries
2. **Regenerate worker**: `npm run build`
3. **Test locally**: `npm run dev` (Wrangler dev server)
4. **Run tests**: `npm test && npm run test:e2e`
5. **Deploy**: `git push origin master` (auto-deploys via GitHub Actions)

**To modify HTML structure**:

1. **Edit `web/index.html`**: Change layout/structure (keep placeholders intact)
2. Follow steps 2-5 above

**To update styles**:

1. **Edit `web/styles.css`**: Modify CSS rules
2. Follow steps 2-5 above

**IMPORTANT**:
- Never edit `web/worker.js` directly - it's auto-generated
- Keep placeholders intact: `<!-- CSS_PLACEHOLDER -->`, `<!-- RESUME_CARDS_PLACEHOLDER -->`, `<!-- PROJECT_CARDS_PLACEHOLDER -->`
- Template functions expect specific JSON structure (see Content Hierarchy section)

### Adding New Monitoring Metrics

To add new metrics to `/metrics` endpoint:

1. **Update metrics object** in `web/generate-worker.js` (line 116-123)
2. **Update `generateMetrics()` function** (line 182-206)
3. **Increment metrics** in request handler
4. **Regenerate worker**: `npm run build`
5. **Test**: Check `/metrics` endpoint returns new metric

### Updating Security Headers

To modify CSP or other security headers:

1. **Edit `SECURITY_HEADERS`** in `web/generate-worker.js` (line 126-135)
2. **CSP hashes are auto-generated** from inline content (do not manually edit)
3. **Regenerate worker**: `npm run build`
4. **Test CSP**: Check browser console for violations

## Troubleshooting

### Worker.js Not Updating After Source Changes

**Problem**: Deployed site shows old HTML/CSS/data content
**Cause**: Forgot to run build step - `worker.js` not regenerated
**Solution**:
```bash
npm run build  # Regenerates worker.js from source files
npm test       # Verify worker.js is valid
cd web && wrangler deploy
```

**Prevention**: Always run `npm run deploy` (includes build) instead of manual `wrangler deploy`

### CSP Violations in Browser Console

**Problem**: "Refused to execute inline script because it violates CSP"
**Cause**: CSP hash mismatch after HTML/CSS changes
**Solution**:
```bash
npm run build  # Recalculates CSP hashes
npm test       # Verify hashes are correct
cd web && wrangler deploy
```

**Critical**: `generate-worker.js` must NOT trim inline content before hashing (commit f67b5eb). Browsers calculate CSP hashes with exact whitespace.

### E2E Tests Failing But Unit Tests Pass

**Problem**: Playwright tests fail while Jest tests pass
**Cause**: E2E tests validate `worker.js` but it wasn't regenerated after source changes
**Solution**:
```bash
npm run build           # Regenerate worker.js
npm run test:e2e        # Re-run E2E tests
```

**Always**: Run build before E2E tests: `npm run build && npm run test:e2e`

### Deployment Timestamp Shows Build Time Instead of Deploy Time

**Problem**: `/health` endpoint shows incorrect `deployed_at`
**Cause**: `DEPLOYED_AT` environment variable not set
**Solution**:
- **GitHub Actions**: Automatically set (no action needed)
- **Local deployment**:
```bash
DEPLOYED_AT=$(date -u +'%Y-%m-%dT%H:%M:%SZ') npm run build
cd web && wrangler deploy
```

### Local Development Server Not Reflecting Changes

**Problem**: `npm run dev` shows old content
**Cause**: Wrangler caches worker code
**Solution**:
```bash
# Stop Wrangler (Ctrl+C)
npm run build           # Regenerate worker.js
npm run dev             # Restart dev server
```

### Tests Pass Locally But Fail in CI

**Problem**: CI/CD pipeline fails tests that pass locally
**Cause**: Missing `npm run build` step or stale dependencies
**Solution**:
```bash
# Clean install and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
npm test && npm run test:e2e
```

## Contact Information

- Email: qws941@kakao.com
- Phone: 010-5757-9592
- GitHub: github.com/qws941
- Address: 경기도 시흥시 장현천로61, 307동 1301호
