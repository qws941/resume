# 📄 이재철 이력서 관리 시스템

## 📁 폴더 구조

```
resume/
├── master/                   # 마스터 이력서 (최신 통합본)
│   ├── resume_master.md     # 마스터 이력서 (전체 경력)
│   ├── resume_final.md      # 제출용 이력서 (압축 버전)
│   ├── resume_archived.md   # 이전 버전 아카이브
│   ├── wanted_resume.md     # 원티드 형식 이력서
│   └── resume_improvement_analysis.md  # 개선사항 분석
├── company-specific/         # 회사별 맞춤 이력서
├── archive/                  # 회사별 이전 버전 아카이브
│   ├── 11번가/
│   ├── Coupangpay/
│   ├── Toss/
│   ├── 스마일게이트/
│   ├── 현대오토에버/
│   ├── 배민/
│   ├── 당근/
│   ├── 프리랜서/
│   └── 기타/
├── web/                      # 웹 포트폴리오
│   ├── index.html           # 메인 포트폴리오 (반응형, SEO 최적화)
│   ├── resume.html          # 이력서 HTML 버전
│   └── worker.js            # 웹 워커 스크립트
├── data/                     # 데이터 파일
│   ├── extracted/           # 추출된 이력서 데이터 (JSON)
│   ├── analysis/            # 콘텐츠 분석 리포트
│   └── templates/           # 이력서 템플릿
├── assets/                   # 이미지, 로고 등 리소스
└── scripts/                  # 자동화 스크립트
    ├── generators/          # 이력서 생성 스크립트
    └── *.py                 # Python 유틸리티
```

## 🚀 주요 기능

### 1. 마스터 이력서
- **위치**: `master/resume_master.md`
- **특징**:
  - 모든 경력과 기술을 포함한 통합본
  - Markdown 형식으로 버전 관리 용이
  - GitHub 프로필과 연동
  - 정량적 성과 지표 중심 작성

### 2. 웹 포트폴리오 (2025.09 현행화)
- **위치**: `web/index.html`
- **주요 개선사항**:
  - 완전 반응형 디자인 (Desktop → Tablet → Mobile 최적화)
  - SEO 최적화 (Meta Tags, Open Graph, Twitter Card)
  - 웹 접근성 개선 (ARIA Labels, Semantic HTML)
  - 터치 디바이스 최적화 (44px 터치 타겟, 모바일 인터랙션)
  - 성능 최적화 (Preconnect, Smooth Scrolling)
  - 5개 프로덕션 프로젝트 쇼케이스 (Live Demo 링크 포함)

### 3. 회사별 맞춤 이력서
- 각 회사의 요구사항에 맞춘 커스터마이징
- 마스터에서 필요한 부분만 추출하여 구성

### 4. 자동화 및 CI/CD
- **PDF 변환**: `pandoc`을 사용하여 Markdown 이력서를 PDF로 자동 변환합니다.
- **버전 관리**: Git을 통해 모든 문서의 변경 이력을 체계적으로 관리합니다.
- **CI/CD (GitHub Actions)**:
  - `master` 브랜치에 변경 사항이 푸시되면, GitHub Actions가 자동으로 Cloudflare Worker에 웹 포트폴리오를 배포합니다.
  - 배포가 완료되면, **Gemini API**를 호출하여 최신 커밋 메시지를 바탕으로 배포 요약 노트를 생성하고 워크플로우 로그에 기록하여 변경 사항 추적을 용이하게 합니다.
- **키워드 최적화**: 주요 기술 및 성과에 대한 키워드를 분석하고 최적화합니다.

## 📊 경력 요약

- **총 경력**: 8년 7개월 (2017.02 ~ 현재)
- **현재 직무**: ㈜아이티센 CTS 정보보안 운영 엔지니어
- **핵심 분야**: 인프라·보안 엔지니어
- **주요 성과**:
  - 15종 이상 보안 솔루션 통합 운영
  - 업무 자동화로 50~95% 시간 단축
  - 프로덕션 시스템 99.9% 가용성 달성
- **주요 기술**:
  - 보안 솔루션 (DDoS, IPS, WAF, NAC, DLP, EDR, APT)
  - 클라우드 & 컨테이너 (AWS, Docker, Kubernetes, Portainer API)
  - 자동화 (Python, Ansible, CI/CD)

## 🎯 사용 방법

### 마스터 이력서 업데이트
```bash
# 마스터 이력서 편집
vim master/resume_master.md

# 제출용 이력서 생성 (압축 버전)
cp master/resume_master.md master/resume_final.md
```

### 웹 포트폴리오 로컬 테스트
```bash
# 웹 서버 실행 (Python 3)
cd web
python3 -m http.server 8000

# 브라우저에서 확인
# http://localhost:8000/index.html
```

### PDF 생성
```bash
# Markdown to PDF 변환
python scripts/generate_pdf.py
```

### 회사별 이력서 생성
```bash
# 특정 회사용 이력서 생성
python scripts/generate_company_resume.py --company="회사명"
```

## 🚀 고급 기능

### Slack 통합
- 배포 성공/실패 알림을 Slack으로 자동 전송
- GitHub Actions 워크플로우와 통합
- 설정 방법: `docs/SLACK_INTEGRATION.md` 참고

### 배포 모니터링 (tmux)
- 실시간 배포 프로세스 모니터링
- 4가지 모니터링 모드 (attach, stream, snapshot, error search)
- 사용 방법: `docs/MONITORING_GUIDE.md` 참고

```bash
# 모니터링과 함께 배포
./scripts/deploy-with-monitoring.sh

# 배포 모니터링
./scripts/monitor-deployment.sh
```

## 🔄 업데이트 이력

- **2025.10.13**: 고도화 및 통합 (Phase 2)
  - **이슈 스캔**:
    - ESLint 경고 4개 수정 (미사용 변수 제거)
    - 백업 파일 제거 (CLAUDE.md v11.10 No-Backup Policy 준수)
  - **Slack 연동**:
    - GitHub Actions에 Slack 알림 추가
    - 배포 성공/실패 상태, 커밋 정보, 라이브 사이트 링크 포함
    - Rich formatting with Slack Block Kit
  - **ts 세션 스트림**:
    - tmux 기반 배포 모니터링 스크립트 추가
    - 4가지 모니터링 모드 (interactive, stream, snapshot, error search)
    - 50,000줄 scrollback 지원
  - **TS 명령어 개선**:
    - 세션 생성 후 auto-attach 실패 감지 및 명확한 피드백 제공
    - 세션 안정화를 위한 0.5초 검증 대기 추가
    - 수동 접속 방법 가이드 (`ts attach <name>`) 제공
    - 종합 트러블슈팅 가이드 (`docs/TS_SESSION_TROUBLESHOOTING.md`)
    - 코드 개선 패치 파일 (`docs/TS_SESSION_FIX.patch`)
- **2025.10.12**: 가시성 개선 및 GitHub 통합 강화
  - **UI/UX 개선**:
    - 파란색 가시성 개선 (더 밝은 색상으로 변경: #3b82f6, #8b5cf6, #6d28d9)
    - 색상 대비 향상으로 사용자 경험 개선
  - **콘텐츠 현실화**:
    - 비현실적 장애율 데이터 전체 제거
    - 더 신뢰할 수 있는 표현으로 개선 ("시스템 안정성 개선" 등)
  - **GitHub 연동 강화**:
    - 모든 개인 프로젝트에 GitHub 저장소 링크 추가
    - Live Demo + GitHub 링크 병행 표시로 접근성 향상
- **2025.09.30**: 이력서 전면 현행화 및 웹 포트폴리오 고도화
  - **이력서 콘텐츠**:
    - 최신 경력 추가 (아이티센 CTS, 2025.03~)
    - GitHub 프로젝트 5종 추가 (Splunk, SafeWork, Blacklist, FortiGate, Grafana)
    - 모든 성과를 정량적 지표로 강화 (Before/After 수치 명시)
    - 기술 스택 현행화 (Portainer API, 컨테이너 오케스트레이션)
  - **웹 포트폴리오 개선**:
    - 완전 반응형 디자인 구현 (5단계 브레이크포인트: 1200px/1024px/768px/640px/375px)
    - SEO 최적화 (Meta Description, Keywords, Open Graph, Twitter Card)
    - 웹 접근성 개선 (ARIA Labels, Semantic HTML, Role 속성)
    - 터치 디바이스 최적화 (44px 최소 터치 타겟, Active State)
    - 성능 최적화 (Preconnect, Smooth Scrolling, Print CSS)
  - **파일 구조 정리**:
    - 한글 파일명을 영문으로 변경 (resume_master.md, resume_final.md 등)
    - README 업데이트 (웹 포트폴리오 테스트 가이드 추가)
- **2024.09.30**: 프로젝트 구조 고도화 (web, data, archive 세분화)
- **2024.09.26**: 마스터 이력서 통합본 생성
- **2024.09.26**: 폴더 구조 재정비
- **2024.09.26**: GitHub 프로필 정보 연동

## 📞 연락처

- **이메일**: qws941@kakao.com
- **전화**: 010-5757-9592
- **GitHub**: [github.com/qws941](https://github.com/qws941)\n# CI/CD Workflow Test
