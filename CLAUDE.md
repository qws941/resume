# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal resume management system for infrastructure and security engineer with 8+ years of experience. The repository manages multiple resume versions (master, company-specific) and provides a web portfolio deployed on Cloudflare Workers with responsive design.

**Live Site**: https://resume.jclee.me (Cloudflare Workers)

## Directory Structure

```
resume/
├── master/              # Master resume files (source of truth)
│   ├── resume_master.md     # Complete career history
│   ├── resume_final.md      # Compressed version for submission
│   └── wanted_resume.md     # Wanted platform format
├── company-specific/    # Company-tailored resumes (Toss, Kakaobank, DayOne, Furiosa)
├── toss/               # Toss-specific application materials
├── web/                # Web portfolio (Cloudflare Workers deployment)
│   ├── index.html          # Main portfolio (1-column minimal design)
│   ├── resume.html         # Resume HTML version
│   ├── worker.js           # Generated Cloudflare Worker (deployed)
│   ├── generate-worker.js  # Worker generator script
│   └── wrangler.toml       # Cloudflare Workers config
├── demo/               # Demo resources (as per constitution: all projects need /demo/)
├── data/               # Data processing
│   ├── extracted/          # Extracted resume data (JSON)
│   └── analysis/          # Content analysis reports
├── archive/            # Historical versions by company
├── DEPLOYMENT_STATUS.md # Service deployment status report
└── ENVIRONMENTAL_MAP.md # Environment configuration (topology, dependencies, workflow)
```

## Key Commands

### Development & Testing

```bash
# Serve web portfolio locally
cd web
python3 -m http.server 8000
# → http://localhost:8000/index.html

# Generate worker.js from HTML files (MUST run after editing index.html or resume.html)
cd web
node generate-worker.js
# → Creates web/worker.js with embedded HTML

# Cloudflare Workers deployment
cd web
wrangler deploy
# → Deploys to https://resume.jclee.me

# Check deployment status
wrangler deployments list

# Generate PDF from markdown (Pandoc method)
cd toss
./pdf-convert.sh
# → Creates lee_jaecheol_toss_commerce_resume.pdf
# Requires: pandoc, texlive-xetex, texlive-lang-korean

# Extract content from DOCX files
cd data/extracted
python3 extract_resume.py
# → Creates extracted_content.json
```

### Content Management

```bash
# Update master resume
vim master/resume_master.md

# Create submission version (manual copy)
cp master/resume_master.md master/resume_final.md
```

## Architecture & Design Patterns

### Content Hierarchy
- **Master Resume** (`master/resume_master.md`) is the single source of truth containing complete career history
- **Company-Specific Resumes** are derived from master by extracting relevant sections
- **Web Portfolio** (`web/index.html`) showcases 5 production projects with live demo links
- All versions must maintain consistency in career dates, quantitative metrics

### Web Portfolio Features
- **Modern Minimal Design**: 1-column layout with clean typography (commit ee4fbee, 2025-10-04)
- **Responsive Design**: 5 breakpoints (1200px/1024px/768px/640px/375px)
- **SEO**: Meta tags, Open Graph, Twitter Card, canonical URL
- **Accessibility**: ARIA labels, semantic HTML, 44px minimum touch targets
- **Performance**: Cloudflare Workers edge deployment, preconnect, smooth scrolling
- **Deployment**: Cloudflare Workers with custom domain (resume.jclee.me)

### Worker Code Generation
- **Critical Step**: After editing `web/index.html` or `web/resume.html`, MUST run `node generate-worker.js`
- **Purpose**: Embeds HTML files into `web/worker.js` as template literals
- **Escaping**: Handles backticks and dollar signs for template literal compatibility
- **Routing**:
  - `/` → serves index.html (portfolio)
  - `/resume` → serves resume.html (resume)
- **Deployment**: `worker.js` is what gets deployed to Cloudflare, not the HTML files directly

### CI/CD Pipeline
- **Trigger**: Push to `master` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Jobs**:
  1. `deploy-worker`: Deploys to Cloudflare Workers using `wrangler-action@v3`
  2. `generate-deployment-notes`: Uses Gemini API to summarize commit changes
- **Secrets Required**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `GEMINI_API_KEY`
- **Verification**: GitHub Actions automatically deploys, verify with `curl https://resume.jclee.me`

### PDF Generation Strategy
**Pandoc Method** (`toss/pdf-convert.sh`):
- Engine: XeLaTeX for precise typography
- Font: Noto Serif CJK KR for Korean support
- Geometry: 2cm margins, 11pt font, 1.3 line stretch
- Auto-checks for dependencies and provides fallback instructions

### Data Extraction Pipeline
- DOCX files → `data/extracted/extract_resume.py` → JSON
- Extracts paragraphs and tables from multiple DOCX versions
- Outputs to `extracted_content.json` for analysis

## Resume Content Guidelines

### Quantitative Metrics Format
All achievements must include before/after metrics:
- "작업시간 50% 단축 (8시간 → 4시간)"
- "CPU 사용률 30% 개선 (60% → 42%)"
- "99.9% 가용성 달성"

### Career Timeline Consistency
- Total experience: 8+ years (2017.02 ~ present)
- Current role: ㈜아이티센 CTS (2025.03 ~ present)
- All dates must match across master/company-specific versions

### Technical Stack Keywords
- Security: DDoS, IPS, WAF, NAC, DLP, EDR, APT
- Cloud: AWS, Docker, Kubernetes, Portainer API
- Automation: Python, Ansible, CI/CD
- Financial compliance: ISMS-P, ISO27001

## Important Notes

### File Naming Convention
- Master files use English names: `resume_master.md`, `resume_final.md`
- Company-specific may use Korean: `토스커머스_Server_Developer_Platform_이재철.md`
- PDF outputs use English: `lee_jaecheol_toss_commerce_resume.pdf`

### Web Portfolio Deployment
- Primary URL: `https://resume.jclee.me` (canonical)
- Dev URL: `resume-portfolio.jclee.workers.dev`
- **Critical**: Must run `node generate-worker.js` before deployment if HTML changed
- All external links verified (5 production projects)

### Contact Information
- Email: qws941@kakao.com
- Phone: 010-5757-9592
- GitHub: github.com/qws941
- Address: 경기도 시흥시 장현천로61, 307동 1301호

### Deployment Infrastructure
- **Platform**: Cloudflare Workers (Serverless)
- **Primary Domain**: resume.jclee.me
- **Deploy Command**: `wrangler deploy` (from /web directory)
- **Config File**: web/wrangler.toml
- **Last Deploy**: 2025-10-09 (auto via GitHub Actions)
- **Status Dashboard**: See DEPLOYMENT_STATUS.md for full service status

## Recent Updates (2025-10-09)

### Infrastructure
- Added ENVIRONMENTAL_MAP.md for environment configuration (commit c504fc8)
- Fixed Cloudflare Worker to serve actual portfolio HTML (commit 39a0093)
- Worker generation workflow now properly embeds index.html and resume.html

### Design (2025-10-04)
- **Commit ee4fbee**: Completely new minimal 1-column design
  - Simplified layout with focus on content
  - Removed profile image
  - Modern typography and spacing

### Content Updates
- Career years updated to 8+ (commit 95ea9cd)
- Address updated to 경기도 시흥시 장현천로61, 307동 1301호 (commit d911f6c)
- Grafana project modernized with concrete metrics (commit ac03403)