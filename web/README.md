# 이재철 - 이력서 (공개용)

**포지션**: Platform Engineer / DevOps Engineer / Infrastructure Engineer
**업데이트**: 2025년 9월 30일

---

## 🔗 빠른 링크

- **GitHub Pages**: https://resume.jclee.me
- **GitHub**: https://github.com/qws941
- **Email**: qws941@kakao.com
- **Phone**: 010-5757-9592

---

## 📂 파일 구조

```
web/
├── index.html          # GitHub Pages 메인 이력서 (HTML)
├── resume.html         # 이전 버전 이력서
├── resume-public.md    # Markdown 공개용 이력서 (NEW)
└── README.md           # This file
```

---

## 🎯 GitHub Pages 배포

### 자동 배포
- **브랜치**: `master`
- **경로**: `/web/` 디렉토리
- **URL**: https://resume.jclee.me

### 수동 업데이트
```bash
# 1. 이력서 수정
vi resume-public.md

# 2. HTML 생성 (pandoc)
pandoc resume-public.md -o index.html \
  --standalone \
  --metadata title="이재철 - Platform Engineer" \
  --css=style.css

# 3. Git commit & push
git add -A
git commit -m "docs: 이력서 업데이트"
git push origin master
```

---

## 📊 주요 프로젝트

### 1. Full-Stack Observability Platform
- **URL**: https://grafana.jclee.me
- **GitHub**: https://github.com/qws941/grafana
- **기술**: Grafana, Prometheus, Loki, Tempo, Traefik, Docker

### 2. REGTECH Blacklist Intelligence Platform
- **URL**: https://blacklist.jclee.me
- **GitHub**: https://github.com/qws941/blacklist
- **기술**: Flask, PostgreSQL, Redis, Docker, Cloudflare Workers

### 3. FortiGate Policy Orchestration Platform
- **URL**: https://fortinet.jclee.me
- **GitHub**: https://github.com/qws941/fortinet
- **기술**: Flask, FortiManager API, Docker, 3-Port HA

### 4. SafeWork Industrial Health Platform
- **URL**: https://safework.jclee.me
- **GitHub**: https://github.com/qws941/safework
- **기술**: Flask, PostgreSQL, Redis, Cloudflare Workers

### 5. Splunk-FortiNet Integration Platform
- **URL**: https://splunk.jclee.me
- **GitHub**: https://github.com/qws941/splunk-fortinet
- **기술**: Python, Splunk API, FortiManager API, Redis

---

## 🛠 기술 스택

### Platform & Infrastructure
- **Container**: Docker, Kubernetes (POC), Portainer
- **Monitoring**: Prometheus, Grafana, Loki, Tempo
- **Cloud**: AWS (EC2, S3, VPC, IAM, CloudTrail)
- **Proxy**: Traefik, Cloudflare Workers

### Backend & Database
- **Language**: Python, Node.js, Shell Script
- **Framework**: Flask, Express.js
- **Database**: PostgreSQL, Redis
- **API**: REST API, JSON-RPC, GraphQL

### DevOps & Automation
- **CI/CD**: GitHub Actions, Docker Build
- **IaC**: Ansible, Docker Compose
- **Automation**: Python, Bash, Cron

### Security
- **Solutions**: DDoS, IPS, WAF, NAC, DLP, EDR, APT
- **Compliance**: ISMS-P, ISO27001, 금융감독원 감사
- **Network**: Fortigate, VPN, SSL, 망분리

---

## 📞 연락처

- **Email**: qws941@kakao.com
- **Phone**: 010-5757-9592
- **GitHub**: https://github.com/qws941
- **Portfolio**: https://resume.jclee.me

---

**Last Updated**: 2025년 9월 30일
**Version**: 1.0.0