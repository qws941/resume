# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal resume management system for infrastructure and security engineer with 8+ years of experience. Manages multiple resume versions (master, company-specific) and provides a web portfolio deployed on Cloudflare Workers.

**Live Site**: https://resume.jclee.me (Cloudflare Workers)

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
# Run all unit tests
npm test

# Watch mode for development
npm test:watch

# Coverage report
npm test:coverage

# E2E tests (Playwright)
npm run test:e2e

# E2E with UI
npm run test:e2e:ui

# E2E headed mode (visible browser)
npm run test:e2e:headed

# Run all tests before deployment
npm test && npm run test:e2e
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
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

1. **Edit HTML**: Modify `web/index.html` or `web/resume.html`
2. **Generate Worker**: Run `node generate-worker.js` (embeds HTML into `worker.js` as template literals)
3. **Deploy**: Push to `master` branch (GitHub Actions auto-deploys) OR run `wrangler deploy` manually

**Why this matters**:
- `worker.js` is the actual deployed code (referenced in `wrangler.toml`)
- `generate-worker.js` performs critical transformations:
  - **HTML Minification**: 15% size reduction using `html-minifier-terser`
  - **CSP Hash Generation**: Extracts `<script>` and `<style>` tags, generates SHA-256 hashes
  - **Template Literal Escaping**: Escapes backticks (`) and dollar signs ($) for JavaScript embedding
  - **Deployment Timestamp**: Injects `DEPLOYED_AT` from environment (set by CI/CD)
- Routing: `/` → index.html, `/resume` → resume.html, `/health` → health check, `/metrics` → Prometheus metrics
- Forgetting step 2 will deploy outdated HTML

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

- **master/resume_master.md**: Single source of truth (complete career history)
- **master/resume_final.md**: Compressed submission version
- **company-specific/**: Tailored resumes derived from master
- **web/index.html**: Portfolio showcasing 5 production projects
- **web/resume.html**: HTML version of resume
- **resume/nextrade/**: Technical documentation (Architecture, DR, SOC) for download

All versions must maintain consistency in:
- Career dates and timeline
- Quantitative metrics (format: "50% 시간 단축 (8시간 → 4시간)")
- Technical stack keywords

### CI/CD Pipeline

**Trigger**: Push to `master` branch

**Workflow** (`.github/workflows/deploy.yml`):
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

- **ENVIRONMENTAL_MAP.md**: Environment configuration (topology, dependencies, workflow)
- **DEPLOYMENT_STATUS.md**: Service deployment status report (last updated 2025-10-18)
- **web/wrangler.toml**: Cloudflare Workers config (name: "resume", main: "worker.js")
- **web/generate-worker.js**: Worker generator with CSP hash calculation (DO NOT trim inline content!)
- **web/worker.js**: Generated worker code (auto-generated, do not edit directly)
- **tests/unit/generate-worker.test.js**: Worker generation validation
- **package.json**: Scripts, dependencies, Node.js version requirement (>=20.0.0)
- **.github/workflows/deploy.yml**: CI/CD pipeline with deployment timestamp injection

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

- **Node.js**: >=20.0.0 (specified in package.json engines)
- **Key packages**:
  - `wrangler`: Cloudflare Workers CLI (v4.42.2+)
  - `@playwright/test`: E2E testing (v1.56.0)
  - `jest`: Unit testing (v30.2.0)
  - `eslint`: Linting (v9.37.0, flat config: `eslint.config.cjs`)
  - `prettier`: Code formatting (v3.6.2)
  - `html-minifier-terser`: HTML minification (v7.2.0)
  - `sharp`: Image processing (v0.34.4)

### Recent Updates
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

### Editing HTML Content

When updating portfolio content:

1. **Edit HTML files** (`web/index.html` or `web/resume.html`)
2. **Regenerate worker**: `npm run build`
3. **Test locally**: `npm run dev` (Wrangler dev server)
4. **Run tests**: `npm test && npm run test:e2e`
5. **Deploy**: `git push origin master` (auto-deploys via GitHub Actions)

**IMPORTANT**: Never edit `web/worker.js` directly - it's auto-generated.

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

### Worker.js Not Updating After HTML Changes

**Problem**: Deployed site shows old HTML content
**Cause**: Forgot to run `generate-worker.js`
**Solution**:
```bash
npm run build  # Regenerates worker.js
cd web && wrangler deploy
```

### CSP Violations in Browser Console

**Problem**: "Refused to execute inline script because it violates CSP"
**Cause**: CSP hash mismatch (likely due to HTML changes)
**Solution**:
```bash
npm run build  # Recalculates CSP hashes
cd web && wrangler deploy
```

**Root Cause**: If hashes still don't match, verify `generate-worker.js` does NOT trim inline content before hashing (commit f67b5eb)

### Deployment Timestamp Shows Build Time Instead of Deploy Time

**Problem**: `/health` endpoint shows incorrect `deployed_at`
**Cause**: `DEPLOYED_AT` environment variable not set
**Solution**: GitHub Actions automatically sets this. For local deployment:
```bash
DEPLOYED_AT=$(date -u +'%Y-%m-%dT%H:%M:%SZ') npm run build
cd web && wrangler deploy
```

### Tests Failing After HTML Changes

**Problem**: Unit tests fail after modifying HTML
**Cause**: Tests validate generated `worker.js` structure
**Solution**:
1. Regenerate worker: `npm run build`
2. Check if tests need updating (e.g., new routes, changed escaping)
3. Run tests: `npm test`

## Contact Information

- Email: qws941@kakao.com
- Phone: 010-5757-9592
- GitHub: github.com/qws941
- Address: 경기도 시흥시 장현천로61, 307동 1301호
