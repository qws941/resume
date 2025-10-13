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
- `worker.js` is the actual deployed code
- `generate-worker.js` escapes backticks and `$` for template literal compatibility
- Routing: `/` → index.html, `/resume` → resume.html
- Forgetting step 2 will deploy outdated HTML

### Content Hierarchy

- **master/resume_master.md**: Single source of truth (complete career history)
- **master/resume_final.md**: Compressed submission version
- **company-specific/**: Tailored resumes derived from master
- **web/index.html**: Portfolio showcasing 5 production projects

All versions must maintain consistency in:
- Career dates and timeline
- Quantitative metrics (format: "50% 시간 단축 (8시간 → 4시간)")
- Technical stack keywords

### CI/CD Pipeline

**Trigger**: Push to `master` branch

**Workflow** (`.github/workflows/deploy.yml`):
1. `deploy-worker`: Deploys to Cloudflare Workers using `wrangler-action@v3`
2. `generate-deployment-notes`: Calls Gemini API to summarize commit for deployment log

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GEMINI_API_KEY`

**Verification**: `curl -I https://resume.jclee.me` (expect HTTP 200)

### Web Portfolio Design

**Current Design** (commit 59ebf6e, 2025-10-09):
- Minimal 1-column layout with premium visual effects
- Dark mode toggle with localStorage persistence
- Responsive: 5 breakpoints (1200px/1024px/768px/640px/375px)
- SEO: Meta tags, Open Graph, Twitter Card, canonical URL
- Accessibility: ARIA labels, semantic HTML, 44px touch targets
- Animations: Scroll fade-in, counter animations, hover effects with cubic-bezier easing

**Typography**:
- Hero title: Playfair Display 4.8rem
- Section titles: Playfair Display 3.2rem
- Body: Inter with -0.01em letter-spacing

**Color System**:
- Primary gradient: `#7c3aed → #5b21b6 → #2563eb` (darker purple/blue for better contrast)
- Gold gradient: `#f59e0b → #d97706`
- Shadows: Enhanced opacity (0.35-0.5) for depth

## Testing Strategy

This project uses Jest for unit testing and Playwright for E2E testing.

### Unit Tests
- **Location**: `tests/unit/`
- **Focus**: Worker generation, HTML escaping, security headers
- **Key test**: `generate-worker.test.js` validates:
  - worker.js generation
  - Backtick and `$` escaping in template literals
  - Security headers presence
  - Routing logic

### E2E Tests
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Config**: `playwright.config.js`

### Test Before Deploy
Always run tests before deploying:
```bash
npm test && npm run test:e2e
```

## Important Files

- **ENVIRONMENTAL_MAP.md**: Environment configuration (topology, dependencies, workflow)
- **DEPLOYMENT_STATUS.md**: Service deployment status report
- **web/wrangler.toml**: Cloudflare Workers config (name: "resume", main: "worker.js")
- **web/generate-worker.js**: Worker generator (reads HTML, escapes special chars, writes worker.js)
- **tests/unit/generate-worker.test.js**: Worker generation validation
- **package.json**: Scripts, dependencies, Node.js version requirement (>=20.0.0)

## Resume Content Guidelines

### Metrics Format
- Before/after: "작업시간 50% 단축 (8시간 → 4시간)"
- Percentages: "CPU 사용률 30% 개선 (60% → 42%)"
- Availability: "99.9% 가용성 달성"

### Career Timeline
- Total: 8+ years (2017.02 ~ present)
- Current: ㈜아이티센 CTS (2025.03 ~ present)
- Must match across all versions

### Technical Stack
- Security: DDoS, IPS, WAF, NAC, DLP, EDR, APT
- Cloud: AWS, Docker, Kubernetes, Portainer API
- Automation: Python, Ansible, CI/CD
- Compliance: ISMS-P, ISO27001

## Dependencies

- **Node.js**: >=20.0.0 (specified in package.json engines)
- **Key packages**:
  - `wrangler`: Cloudflare Workers CLI (v4.42.2)
  - `@playwright/test`: E2E testing (v1.56.0)
  - `jest`: Unit testing (v30.2.0)
  - `eslint`: Linting (v9.37.0, flat config)
  - `prettier`: Code formatting (v3.6.2)
  - `sharp`: Image processing (v0.34.4)

### Recent Updates
- **2025-10-13**: Repository modernization
  - ESLint 8 → 9 (flat config: `eslint.config.cjs`)
  - Jest 29 → 30 (CommonJS config: `jest.config.cjs`)
  - Wrangler 3 → 4 (major upgrade)
  - All dependencies updated to latest versions
  - Zero security vulnerabilities

## Contact Information

- Email: qws941@kakao.com
- Phone: 010-5757-9592
- GitHub: github.com/qws941
- Address: 경기도 시흥시 장현천로61, 307동 1301호
