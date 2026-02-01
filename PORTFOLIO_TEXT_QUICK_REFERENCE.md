# Portfolio Copy - Quick Reference Guide
**Last Updated**: 2025-02-01

---

## 🎯 PRIMARY SOURCES

| Component | File | JSON Path | Lines |
|-----------|------|-----------|-------|
| **Meta/SEO** | `index.html` | N/A | 1-200 |
| **Hero Section** | `data.json` | `.hero` | 315-319 |
| **Career/Experience** | `data.json` | `.resume[]` | 7-93 |
| **Projects** | `data.json` | `.projects[]` | 94-195 |
| **Skills** | `data.json` | `.skills` | 229-313 |
| **Infrastructure** | `data.json` | `.infrastructure[]` | 334-362 |

---

## 📝 CORE MESSAGING

### Job Title (Hero)
```
Badge: AIOps / ML Platform Engineer
Title: 이재철
Subtitle: 
  - Grafana/Prometheus/Loki 기반 모니터링 구축 경험
  - 금융권 보안 인프라 운영
```

### Elevator Pitch (Meta Description)
```
AIOps/ML Platform 엔지니어 이재철 | Observability 스택 설계, 
AI 에이전트 운영, 금융권 인프라 구축
```

---

## 💼 CURRENT COMPANY (HIGHLIGHTED)

**Company**: (주)아이티센 CTS  
**Icon**: 🏦  
**Period**: 2025.03 ~ 현재  
**Description**:
```
대한민국 최초 ATS 보안 운영 체계를 구축하고 24/7 관제 중. 
Splunk SIEM 로그 분석 및 인시던트 대응, FortiGate 정책 운영
```
**Stats**: 보안관제, 컴플라이언스, DR

---

## 🚀 TOP 5 PROJECTS

### 1️⃣ AIOps Agent Platform
- **Tagline**: AI 에이전트 오케스트레이션 플랫폼
- **Impact**: 개발 생산성 40% 향상
- **Key Metrics**: 17개 MCP 서버, 5개 LLM 프로바이더, 24/7 운영

### 2️⃣ Enterprise Observability Platform
- **Tagline**: Full-Stack Observability Platform
- **Impact**: 장애 탐지 시간 90% 단축
- **Key Metrics**: 12개 대시보드, 20+ 서비스, 50+ 알림

### 3️⃣ Security AIOps Pipeline
- **Tagline**: Security Event Pipeline with AIOps
- **Impact**: 보안 관제 효율 80% 향상
- **Key Metrics**: 3대 방화벽, 정책 배포 5분 → 30초

### 4️⃣ IT Operations Automation
- **Tagline**: AIOps Workflow Automation Platform
- **Impact**: 반복 업무 주 10시간 절감
- **Key Metrics**: 30+ 워크플로우, 일 500회 실행, 99.9% 가용성

### 5️⃣ GitLab Self-hosting
- **Tagline**: GitLab EE 셀프호스팅 운영
- **Key Metrics**: 50+ 프로젝트, 월 200+ 파이프라인, 일 2회 백업

---

## 🛠️ TOP SKILLS (BY CATEGORY)

```
AIOps & ML Platform (6 items)
├─ LLM Integration
├─ AI Agent Orchestration
├─ MCP Protocol
├─ Prompt Engineering
├─ Vector DB
└─ RAG Pipeline

Observability & AIOps (8 items)
├─ Grafana Stack
├─ Prometheus
├─ Loki
├─ Tempo
├─ Splunk
├─ ELK
├─ Anomaly Detection
└─ Alert Automation

Cloud & DevOps (15 items)
├─ AWS (EC2, VPC, IAM, S3, EKS)
├─ Docker, Kubernetes
├─ Cloudflare Workers
├─ GitLab CI/CD, GitHub Actions
└─ Terraform, Jenkins

Security & Compliance (10 items)
├─ FortiGate
├─ WAF, IPS, NAC, DLP, EDR
├─ ISMS-P, ISO27001
└─ 금융감독원 감사 대응
```

---

## 📊 INFRASTRUCTURE (4 ITEMS)

All running 24/7:

| Name | Description | URL |
|------|-------------|-----|
| **Grafana** | Prometheus + Loki 기반 풀스택 모니터링 | grafana.jclee.me |
| **GitLab** | Self-hosted Git + CI/CD + Registry | gitlab.jclee.me |
| **n8n** | 워크플로우 자동화 (배포/동기화/스케줄) | n8n.jclee.me |
| **Portfolio Metrics** | 포트폴리오 성능 메트릭 (Prometheus) | resume.jclee.me/metrics |

---

## 🎓 CERTIFICATIONS (6 ITEMS)

- CCNP (Cisco, 2020.08)
- RHCSA (Red Hat, 2019.01)
- CompTIA Linux+ (2019.02)
- LPIC Level 1 (2019.02)
- 사무자동화산업기사 (한국산업인력공단, 2019.12)
- 리눅스마스터 2급 (한국정보통신진흥협회, 2019.01)

---

## 📞 CONTACT

```
Email:    qws941@kakao.com
Phone:    010-5757-9592
GitHub:   github.com/qws941
Website:  resume.jclee.me
Monitor:  grafana.jclee.me/public-dashboards/...
```

---

## 🎯 COPY HIGHLIGHTS

### Power Words (Most Used)
- **구축했다** (built) - appears 15+ times
- **달성했다** (achieved) - appears 8+ times
- **운영 중** (currently operating) - appears 12+ times
- **통합** (integrated) - appears 6+ times
- **자동화** (automation) - appears 8+ times

### Quantified Metrics
- **Infrastructure scale**: 1,000대 서버, 500명 동시 접속
- **Team output**: 50+ 프로젝트, 200+ 파이프라인
- **Performance**: 99.5-99.9% 가용성, 90% improvement
- **Time savings**: 70% 단축, 주 10시간 절감

### Most Common Industries
1. **금융** (Finance/FinTech) - 5+ projects
2. **제조** (Manufacturing) - referenced
3. **교육** (Education) - referenced
4. **통신** (Telecom) - referenced

---

## 📋 CONTENT STRUCTURE

```
Portfolio hierarchy:
├─ Meta/SEO (search visibility)
├─ Hero (instant value prop)
├─ Career History (credibility)
│  └─ Current role (highlighted)
├─ Projects (proof of skills)
│  └─ Business impact metrics
├─ Skills (capability list)
├─ Infrastructure (live proof)
├─ Certifications (credentials)
└─ Contact (CTA)
```

---

## 🔄 HOW TO UPDATE

### For Quick Changes
```bash
# Edit main data file
nano typescript/portfolio-worker/data.json

# Rebuild worker.js
npm run build

# Deploy
npm run deploy
```

### For Structural Changes
1. Edit `index.html` (HTML structure)
2. Edit `data.json` (content)
3. Update `generate-worker.js` (build logic)
4. Run: `npm run build && npm run deploy`

---

## ✅ VALIDATION CHECKLIST

Before deployment, verify:
- [ ] All career descriptions quantified (metrics included)
- [ ] Project taglines are compelling (not just technical)
- [ ] Business impact stated for all projects
- [ ] No typos in Korean text
- [ ] Links are working (URLs in data.json)
- [ ] Meta tags match actual content
- [ ] JSON is valid (use `npm run validate`)

