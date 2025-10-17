# Resume Management System

Personal resume and portfolio management system built with modern web technologies and automated deployment pipeline.

## 🚀 Live Demo

- **Portfolio**: https://resume.jclee.me
- **Features**: Responsive design, dark mode, SEO optimized, accessibility compliant

## 📦 Project Structure

```
resume/
├── master/                   # Master resume versions
│   ├── resume_master.md     # Complete career history
│   └── resume_final.md      # Compressed submission version
├── company-specific/         # Company-tailored resumes
├── resume/                   # Technical documentation
│   └── nextrade/            # Nextrade project docs (Architecture, DR, SOC)
├── web/                      # Web portfolio
│   ├── index.html           # Main portfolio page
│   ├── resume.html          # Resume HTML version
│   ├── worker.js            # Cloudflare Worker
│   ├── generate-worker.js   # Worker generator script
│   └── downloads/           # Downloadable documents (PDF/DOCX)
├── archive/                  # Historical versions
├── data/                     # Extracted data and templates
├── assets/                   # Images and resources
└── scripts/                  # Automation scripts
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Cloudflare Workers (Serverless)
- **CI/CD**: GitHub Actions
- **Testing**: Jest (unit), Playwright (E2E)
- **Code Quality**: ESLint, Prettier
- **Documentation**: Markdown, Pandoc (PDF generation)

## 🔧 Development

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Wrangler CLI (for Cloudflare deployment)

### Local Development

```bash
# Install dependencies
npm install

# Serve portfolio locally
cd web
python3 -m http.server 8000
# → http://localhost:8000/index.html

# Run tests
npm test

# E2E tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

### Worker Generation

**CRITICAL**: After editing HTML files, regenerate `worker.js`:

```bash
# Generate worker.js from HTML
npm run build
# OR: cd web && node generate-worker.js

# Deploy to Cloudflare Workers
npm run deploy
# OR: cd web && wrangler deploy

# Local preview with Wrangler
npm run dev
```

### PDF Generation

```bash
# Convert Markdown to PDF (requires pandoc, texlive-xetex)
cd toss
./pdf-convert.sh

# Or use Python script
python scripts/generate_pdf.py
```

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

Push to `master` branch triggers automatic deployment:

1. **Build**: Generate `worker.js` from HTML
2. **Test**: Run unit tests and E2E tests
3. **Deploy**: Deploy to Cloudflare Workers
4. **Notify**: Send Slack notification (if configured)
5. **Summary**: Generate AI-powered deployment notes (Gemini API)

### Manual Deployment

```bash
# Deploy to Cloudflare Workers
cd web && wrangler deploy

# Check deployment status
wrangler deployments list
```

### Environment Variables

Required for deployment:

```bash
# .env.example
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
GEMINI_API_KEY=your_gemini_key
SLACK_WEBHOOK_URL=your_slack_webhook
```

## 📊 Architecture

### Cloudflare Worker Design

- **Static HTML serving**: HTML files embedded in `worker.js` as template literals
- **Routing**: `/` → index.html, `/resume` → resume.html
- **Security headers**: CSP, HSTS, X-Frame-Options
- **Performance**: Global CDN, zero cold start

### Worker Generation Pipeline

```
HTML files (index.html, resume.html)
  → generate-worker.js (escape backticks and $)
  → worker.js (embedded template literals)
  → wrangler deploy (to Cloudflare)
```

## 📊 Observability

### Monitoring Endpoints

**Health Check**:
```bash
curl https://resume.jclee.me/health
```

Returns JSON with service status, version, uptime, and request metrics:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "deployed_at": "2025-10-17T09:45:00.000Z",
  "uptime_seconds": 3600,
  "metrics": {
    "requests_total": 1234,
    "requests_success": 1230,
    "requests_error": 4,
    "vitals_received": 56
  }
}
```

**Prometheus Metrics**:
```bash
curl https://resume.jclee.me/metrics
```

Prometheus exposition format for Grafana integration:
```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{job="resume"} 1234

# HELP http_requests_success Successful HTTP requests
# TYPE http_requests_success counter
http_requests_success{job="resume"} 1230

# HELP http_requests_error Failed HTTP requests
# TYPE http_requests_error counter
http_requests_error{job="resume"} 4

# HELP http_response_time_seconds Average response time
# TYPE http_response_time_seconds gauge
http_response_time_seconds{job="resume"} 0.05

# HELP web_vitals_received Total Web Vitals data points received
# TYPE web_vitals_received counter
web_vitals_received{job="resume"} 56
```

**Web Vitals Endpoint**:
```bash
curl -X POST https://resume.jclee.me/api/vitals \
  -H "Content-Type: application/json" \
  -d '{"lcp": 1250, "fid": 50, "cls": 0.05}'
```

### Grafana Integration

All metrics and logs are automatically sent to the centralized observability stack:

- **Metrics**: Prometheus scrapes `/metrics` endpoint
- **Logs**: All requests logged to Loki at `https://grafana.jclee.me/loki/api/v1/push`
- **Dashboard**: View real-time metrics at `https://grafana.jclee.me`

**Log Format** (Loki):
```json
{
  "job": "resume-worker",
  "level": "INFO",
  "path": "/",
  "method": "GET",
  "event": "request",
  "response_time_ms": 45
}
```

### Performance Budgets (Lighthouse CI)

Automated performance testing on every deployment:

- **Performance**: ≥90 score
- **Accessibility**: ≥95 score
- **Best Practices**: ≥95 score
- **SEO**: ≥95 score

**Web Vitals Targets**:
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1
- FCP (First Contentful Paint): <1.8s
- TTFB (Time to First Byte): <0.8s

### Security Headers

Enhanced Content Security Policy with SHA-256 hashes (no `unsafe-inline`):

```
Content-Security-Policy:
  default-src 'self';
  font-src 'self' https://fonts.gstatic.com;
  style-src 'self' 'sha256-...' https://fonts.googleapis.com;
  script-src 'self' 'sha256-...';
  img-src 'self' data:;
  connect-src 'self' https://grafana.jclee.me
```

Additional security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 🧪 Testing

```bash
# Unit tests (Jest)
npm test
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report

# E2E tests (Playwright)
npm run test:e2e        # Headless
npm run test:e2e:ui     # With UI
npm run test:e2e:headed # Visible browser

# All tests before deployment
npm test && npm run test:e2e
```

## 📚 Documentation

- **Deployment**: `docs/DEPLOYMENT_STATUS.md`
- **Environment**: `ENVIRONMENTAL_MAP.md`
- **Slack Integration**: `docs/SLACK_INTEGRATION.md`
- **Monitoring**: `docs/MONITORING_GUIDE.md`
- **Troubleshooting**: `docs/TS_SESSION_TROUBLESHOOTING.md`

## 🎨 Portfolio Features

- **Responsive Design**: 5 breakpoints (375px - 1200px+)
- **Dark Mode**: Toggle with localStorage persistence
- **SEO Optimized**: Meta tags, Open Graph, Twitter Card
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Preconnect, lazy loading, optimized animations
- **Projects Showcase**: 5 production projects with live demos
- **Technical Documentation**: Nextrade project docs (PDF/DOCX downloads)

## 🔄 Recent Updates

### 2025.10.16
- Add Nextrade technical documentation download section
- Implement modern UI with gradient animations
- 4 doc cards with floating icons and hover effects
- Color-coded PDF/DOCX download buttons

### 2025.10.13
- Slack integration for deployment notifications
- tmux-based deployment monitoring
- TS session improvements with auto-attach fix
- ESLint warning fixes, backup file cleanup

### 2025.10.12
- UI/UX improvements (better color contrast)
- GitHub repository links for all projects
- Remove unrealistic metrics

### 2025.09.30
- Complete responsive redesign (5 breakpoints)
- SEO and accessibility improvements
- Touch device optimization
- GitHub project showcase

## 📝 License

This project is for personal use and portfolio demonstration.

## 🔗 Links

- **GitHub**: https://github.com/qws941/resume
- **Live Site**: https://resume.jclee.me
- **Documentation**: Comprehensive technical docs in `/resume/nextrade/`
