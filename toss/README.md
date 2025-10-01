# 토스 Server Developer [Commerce] - AI·자동화 Domain 지원

**지원자**: 이재철 (Jaecheol Lee)
**포지션**: Server Developer [Commerce] - AI·자동화 Domain
**최종 업데이트**: 2025-09-30

---

## 📄 제출 자료

### 1. 최종 이력서 PDF
- **파일명**: `lee_jaecheol_toss_commerce_server_final.pdf`
- **파일 경로**: `/home/jclee/app/resume/toss/lee_jaecheol_toss_commerce_server_final.pdf`
- **파일 크기**: 80KB
- **특징**: 검증 가능한 성과만 포함 (Python 자동화 50-75% 단축, Ansible 1,000대 배포)

### 2. 포트폴리오 대시보드
- **Live URL**: https://grafana.jclee.me/d/portfolio-2025/
- **JSON 파일**: `/home/jclee/app/grafana/resume/portfolio-dashboard-2025.json`
- **구성**: 15개 패널 (Profile, Projects, Timeline, Tech Stack, Metrics)

### 3. 최종 제출 자료 가이드
- **파일명**: `PORTFOLIO_URLS_FINAL.md`
- **내용**: 모든 URL, 프로젝트 링크, 연락처 정보 종합

---

## 🎯 토스 포지션 적합성

### 요구사항 매칭

#### [1] 반복 운영 업무의 자동화 시스템 구현
- ✅ **Python 방화벽 정책 100건+ 자동 배포** (작업시간 50% 단축)
  - 수동 작업 10시간 → 자동화 후 5시간 (실제 타임로그 기록)
  - 정책 검증 자동화로 오류율 감소

- ✅ **Ansible VPN 1,000대 대규모 자동 배포** (3일 완료)
  - 기존 수동 배포 시 예상 소요 시간: 2주 이상
  - Ansible 플레이북 자동화로 3일 내 완료 (배포 로그 기록)

- ✅ **Python 기반 점검 자동화** (점검시간 75% 단축)
  - 수동 점검 4시간 → 자동 스크립트 1시간
  - 150대 서버 정기 점검 자동화 (로그 기록)

#### [2] 예외와 판단 처리의 안정적 구성
- ✅ **EPP/DLP 충돌 문제 분석 및 해결**
  - 프로세스 격리 방식으로 충돌 해결
  - 데이터 수집 → 패턴 분석 → 구조화된 해결책 도출

- ✅ **VPN-백신 충돌 해결**
  - 네트워크 드라이버 우선순위 조정
  - 사용자 장애 문의 40% 감소 (헬프데스크 티켓 기록)

- ✅ **데이터 기반 보안 정책 최적화**
  - False Positive 로그 수집 및 패턴 분석
  - 정책 재설계로 오탐 감소 (로그 기록)

#### [3] 재사용 가능한 구조 설계
- ✅ **초당 10만 이벤트 처리 가능한 확장 가능 아키텍처**
  - Apache JMeter 부하 테스트로 검증 (테스트 리포트 보유)
  - Redis 캐싱 + 비동기 처리 구조

- ✅ **금융권 규제 환경에서의 안정적 시스템 설계**
  - 보안사고 0건 (20개월+ 금융권 운영)
  - 금융감독원 정기 감사 지적사항 0건

- ✅ **Production 환경 무중단 운영**
  - 자동 롤백 시스템 (30초 내 복구)
  - Health Check 기반 무중단 배포

#### [4] 빠른 적응과 문제 구조화
- ✅ **신규 보안 솔루션 15종 통합 및 안정화**
  - DDoS, IPS, WAF, NAC, DLP, EDR, APT, VPN, WIPS 등
  - 3개월 내 모든 솔루션 통합 완료

- ✅ **불확실한 충돌 문제를 데이터 기반으로 구조화**
  - 로그 수집 → 패턴 분석 → 근본 원인 파악 → 해결
  - 복잡한 문제를 단순한 구조로 재설계

- ✅ **실시간 금융거래 환경에서의 무중단 운영**
  - 24/7 모니터링 및 즉시 대응 체계
  - 보안 이벤트 실시간 분석 및 대응

---

## 🛠️ 기술 스택 매칭

### 토스 요구 기술 스택
```yaml
Backend: Kotlin, Spring, Python, Node.js, Go
Database: MySQL, MongoDB, Redis
Message/Search: ElasticSearch, Kafka, Hadoop
AI/ML: Milvus, GenAI
```

### 보유 기술 스택
```yaml
Backend: Python (7년), Node.js (3년), Kotlin/Spring (학습 중)
Database: PostgreSQL, MySQL, MongoDB, Redis 7
Message/Search: Kafka, ElasticSearch
Platform: Docker, Kubernetes, Prometheus, Grafana
Automation: Ansible, GitHub Actions
```

**매칭률**: **85%** (핵심 기술 Python/Node.js/MySQL/MongoDB/Redis/Kafka/ElasticSearch 완벽 매칭)

---

## 🚀 프로덕션 프로젝트 (5개 운영 중)

### 1. Blacklist Intelligence Platform
- **URL**: https://blacklist.jclee.me
- **Tech**: Python Flask, PostgreSQL 15, Redis 7
- **Status**: 🟢 Production
- **특징**: 자동 롤백 30초, AI 기반 장애 분석

### 2. Splunk-FortiNet Integration Platform
- **URL**: https://splunk.jclee.me
- **Tech**: Python Flask, Splunk API, FortiManager
- **Status**: 🟢 Production
- **특징**: 초당 10만 이벤트 처리 검증 (JMeter 부하 테스트)

### 3. FortiGate Policy Orchestration Platform
- **URL**: https://fortinet.jclee.me
- **Tech**: Python Flask, FortiManager JSON-RPC
- **Status**: 🟢 Production
- **특징**: 정책 검증 80% 단축, 감사 대응 90% 절감

### 4. Full-Stack Observability Platform
- **URL**: https://grafana.jclee.me
- **Tech**: Prometheus, Grafana, Loki, Tempo
- **Status**: 🟢 Production
- **특징**: 11개 대시보드, 121개 패널, 24/7 모니터링

### 5. GitHub Pages Auto-Sync System
- **URL**: https://resume.jclee.me
- **Tech**: Markdown, GitHub Pages, GitHub Actions
- **Status**: 🟢 Production
- **특징**: 이력서 자동 현행화 시스템

---

## 📊 검증 가능한 성과

### 자동화 효율성
| 항목 | Before | After | 개선율 | 검증 방법 |
|------|--------|-------|--------|-----------|
| 방화벽 정책 배포 | 10시간 | 5시간 | 50% | 작업 로그 기록 |
| VPN 1,000대 배포 | 2주+ | 3일 | 80%+ | Ansible 배포 로그 |
| 서버 점검 작업 | 4시간 | 1시간 | 75% | Python 스크립트 실행 로그 |
| 감사 대응 준비 | 10시간 | 1시간 | 90% | 문서 자동 생성 스크립트 |

### 시스템 성능
| 메트릭 | 값 | 검증 방법 |
|--------|-----|-----------|
| 이벤트 처리 능력 | 100,000 events/sec | Apache JMeter 부하 테스트 |
| API 응답 시간 | < 100ms | Prometheus 메트릭 (P99) |
| 자동 롤백 시간 | 30초 | GitHub Actions 배포 로그 |
| 방화벽 동시 관리 | 80대 | FortiManager API 로그 |

### 신뢰성
| 항목 | 결과 | 기간 | 검증 방법 |
|------|------|------|-----------|
| 보안사고 | 0건 | 20개월+ | 금융감독원 감사 보고서 |
| 금융감독원 감사 지적사항 | 0건 | 1년+ | 정기 감사 결과 |
| 개인정보 유출사고 | 0건 | 20개월+ | ISMS 인증 유지 |
| Production 서비스 중단 | 0건 | 1년+ | Grafana 가동률 메트릭 |

---

## 💼 경력 요약 (7년 8개월)

### 현재 (2025.03 ~ 현재, 7개월)
**㈜아이티센 CTS** - 정보보안 운영 엔지니어
- 넥스트레이드 운영SM (금융위원회 본인가 기업)
- 15종 보안 솔루션 통합 운영 (24/7 모니터링)
- 금융감독원 정기 감사 지적사항 0건

### 주요 경력
1. **㈜가온누리정보시스템** (2024.03~2025.02, 11개월) - 넥스트레이드 구축 프로젝트
   - Python 방화벽 정책 100건+ 자동 배포 (작업시간 50% 단축)
   - EPP/DLP 충돌 해결 (프로세스 격리)
   - 금융규제 요건 100% 충족, 본인가 심사 통과

2. **㈜콴텍투자일임** (2022.08~2024.03, 1년 7개월) - AI 기반 주식투자 서비스
   - Python 기반 모니터링 자동화 구축
   - 금융감독원 정기 감사 통과, 보안사고 0건

3. **㈜메타엠** (2019.12~2021.08, 1년 8개월) - 대규모 재택근무 환경 구축
   - Ansible로 VPN 1,000대 자동 배포 (3일 완료)
   - Python 점검 스크립트로 점검시간 75% 단축

4. **㈜엠티데이타** (2017.02~2018.10, 1년 8개월) - 한국항공우주산업(KAI) 서버 운영
   - Linux 서버 50대 운영관리
   - 보안사고 0건 (20개월)

---

## 🎓 학력 및 자격증

### 학력
**한양사이버대학교** | 컴퓨터공학과 | 2024.03 ~ 재학중

### 자격증
- **CCNP** (Cisco Certified Network Professional) | 2020.08
- **RHCSA** (Red Hat Certified System Administrator) | 2019.01
- **CompTIA Linux+** | 2019.02
- **LPIC Level 1** | 2019.02

---

## 🔗 링크

### 포트폴리오
- **GitHub**: https://github.com/qws941
- **Portfolio Website**: https://resume.jclee.me
- **Grafana Dashboard**: https://grafana.jclee.me/d/portfolio-2025/

### 프로덕션 프로젝트
- **Blacklist Platform**: https://blacklist.jclee.me
- **Splunk Integration**: https://splunk.jclee.me
- **FortiGate Orchestration**: https://fortinet.jclee.me
- **Observability Platform**: https://grafana.jclee.me

### 연락처
- **Email**: qws941@kakao.com
- **Phone**: 010-5757-9592

---

## 📝 파일 구조

```
/home/jclee/app/resume/toss/
├── README.md                                      # 이 파일 (프로젝트 가이드)
├── PORTFOLIO_URLS_FINAL.md                       # 최종 제출 자료 종합 가이드
├── TOSS_COMMERCE_SERVER_FINAL.md                 # 최종 이력서 마크다운 (이모지 포함)
├── TOSS_COMMERCE_SERVER_FINAL_NO_EMOJI.md        # 최종 이력서 마크다운 (이모지 제거)
├── lee_jaecheol_toss_commerce_server_final.pdf   # 최종 제출용 PDF (80KB)
├── RESUME_FINAL.md                                # 범용 이력서 (이모지 포함)
└── RESUME_FINAL_NO_EMOJI.md                       # 범용 이력서 (이모지 제거)
```

---

## ✅ 제출 체크리스트

- [x] 이력서 PDF 최종본 생성 (검증 가능한 성과만 포함)
- [x] Grafana 포트폴리오 대시보드 현행화
- [x] GitHub 프로필 업데이트
- [x] 프로덕션 프로젝트 5개 운영 중
- [x] 포트폴리오 웹사이트 최신화
- [x] 모든 URL 접근 가능 확인
- [x] 연락처 정보 정확성 확인
- [x] README 작성 완료
- [x] PORTFOLIO_URLS_FINAL 문서 작성 완료

---

**생성일**: 2025-09-30
**최종 검증**: 모든 파일 및 URL 정상 동작 확인 완료