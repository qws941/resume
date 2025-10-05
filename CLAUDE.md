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
│   ├── worker.js           # Cloudflare Workers handler
│   └── wrangler.toml       # Cloudflare Workers config
├── demo/               # Demo resources (as per constitution: all projects need /demo/)
├── data/               # Data processing
│   ├── extracted/          # Extracted resume data (JSON)
│   └── analysis/          # Content analysis reports
├── scripts/            # Automation scripts
│   ├── generate_pdf.py     # Markdown → PDF converter
│   └── generate_html.py    # HTML generator
├── archive/            # Historical versions by company
├── DEPLOYMENT_STATUS.md # Service deployment status report
└── wrangler.toml       # Root Cloudflare Pages config
```

## Key Commands

### Development & Testing

```bash
# Serve web portfolio locally
cd web
python3 -m http.server 8000
# → http://localhost:8000/index.html

# Cloudflare Workers deployment
cd web
wrangler deploy
# → Deploys to https://resume.jclee.me

# Check deployment status
wrangler deployments list

# Generate PDF from markdown (all formats)
python3 scripts/generate_pdf.py

# Convert specific markdown to PDF (Pandoc)
cd toss
./pdf-convert.sh

# Extract content from DOCX files
cd data/extracted
python3 extract_resume.py
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
- **Modern Minimal Design**: 1-column layout with clean typography
- **Responsive Design**: 5 breakpoints (1200px/1024px/768px/640px/375px)
- **SEO**: Meta tags, Open Graph, Twitter Card, canonical URL
- **Accessibility**: ARIA labels, semantic HTML, 44px minimum touch targets
- **Performance**: Cloudflare Workers edge deployment, preconnect, smooth scrolling
- **Dark Mode**: CSS variables with theme toggle
- **Deployment**: Cloudflare Workers with custom domain (resume.jclee.me)

### PDF Generation Strategy
1. **Python Script** (`scripts/generate_pdf.py`): Uses WeasyPrint for Korean font support
   - Requires: `markdown`, `weasyprint`, `beautifulsoup4`
   - Auto-installs dependencies if missing
   - Applies custom CSS for professional layout

2. **Pandoc Script** (`toss/pdf-convert.sh`): XeLaTeX engine for precise typography
   - Requires: `pandoc`, `texlive-xetex`, `texlive-lang-korean`
   - Uses Noto Serif CJK KR font
   - Geometry: 2cm margins, 11pt font, 1.3 line stretch

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
- GitHub Pages compatible
- All external links verified (5 production projects)

### PDF Generation Dependencies
If PDF generation fails, scripts provide fallback instructions for:
1. Manual package installation commands
2. Online converter URLs (https://www.markdowntopdf.com/)

### Contact Information
- Email: qws941@kakao.com
- Phone: 010-5757-9592
- GitHub: github.com/qws941
- Address: 경기도 시흥시 장현천로61, 307동 1301호

### Deployment Infrastructure
- **Platform**: Cloudflare Workers (Serverless)
- **Primary Domain**: resume.jclee.me
- **Dev URL**: resume-portfolio.jclee.workers.dev
- **Deploy Command**: `wrangler deploy` (from /web directory)
- **Config File**: web/wrangler.toml
- **Last Deploy**: 2025-10-03 15:07:45 UTC (auto via wrangler)
- **Status Dashboard**: See DEPLOYMENT_STATUS.md for full service status

## Recent Updates (2025-10-04)

### Design Overhaul
- **Commit ee4fbee**: Completely new minimal 1-column design
  - Simplified layout with focus on content
  - Removed profile image
  - Modern typography and spacing

### Content Updates
- **Commit 85c91e6**: All resume files updated
- **Commit ac03403**: Grafana project description modernized
  - Concrete metrics added: 13 services, 30-day retention, 15 targets
- **Commit 95ea9cd**: Career years updated to 8+
- **Commit d911f6c**: Address updated to 경기도 시흥시 장현천로61, 307동 1301호

### Infrastructure
- Cloudflare Workers deployment active
- Multiple company-specific resumes: Toss, Kakaobank, DayOne, Furiosa
- Deployment status monitoring system (DEPLOYMENT_STATUS.md)
