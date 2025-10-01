# 이재철 | Platform Engineer (Automation & Scale Focus)

**Phone** 010-5757-9592
**Email** qws941@kakao.com
**GitHub** github.com/qws941
**Portfolio** resume.jclee.me

---

## 💡 Summary

7년간 **비동기 확장 아키텍처와 Full Observability 체계**를 구축하여 시스템의 본질적인 안정성과 개발 효율을 극대화해왔습니다. **초당 10만 이벤트를 처리하는 Redis 기반 고성능 데이터 파이프라인**을 설계하고, **Python/Kotlin 기반 비동기 멀티프로세싱**으로 작업시간을 50~75% 단축했습니다.

### 차별화된 강점

#### 1. 확장 가능한 시스템 설계 역량
- **Redis 비동기 큐 + Celery Worker 병렬 처리**로 초당 1,000건 이상 정책 조회 검증
- **멱등성(Idempotency) 키 적용**으로 중복 요청 방어, 데이터 정합성 보장
- **API 응답시간 100ms 이하** 달성 (3~5초 → 100ms, 5분 캐싱 전략)

#### 2. Full Observability 구축 경험
- **Prometheus + Grafana + Loki + Tempo** 통합 모니터링 플랫폼 구축
- 11개 대시보드 운영 (121개 패널), 초당 10만+ 로그 이벤트 처리
- 자동 롤백 시스템 (30초 내 복구), AI 기반 장애 분석

#### 3. 실용주의 & 빠른 실행
- **Python 비동기 멀티프로세싱**으로 방화벽 정책 100건+ 자동 배포 (작업시간 50% 단축)
- Ansible로 1,000대 VPN을 3일 내 배포, 배포 표준(Standard)으로 채택
- GitHub Actions CI/CD 파이프라인 - 코드 푸시 → 자동 테스트 → Grafana 검증 → 배포 전체 자동화

#### 4. 데이터베이스 최적화 경험
- **DB 접근제어 정책 쿼리 튜닝** - 성능 병목 해소 및 응답 속도 개선
- PostgreSQL, MySQL, MongoDB, Redis - 쿼리 튜닝, 인덱스 최적화 경험
- 150대 서버 실시간 헬스 체크 자동화

### 핵심 역량
- **Kotlin/Spring (학습 중)** - Spring Webflux 기반 비동기 API 구축 경험 (개인 프로젝트)
- **Python, Node.js** - 7년 실무 경험, Flask/Express.js 기반 고성능 백엔드 개발
- **대규모 이벤트 처리** - Redis 비동기 큐, Celery Worker, 초당 10만 이벤트 검증
- **Platform Engineering** - Prometheus, Grafana, Loki, Tempo 통합 Full Observability
- **자동화 파이프라인** - Ansible, GitHub Actions, Docker/Kubernetes 오케스트레이션
- **데이터베이스** - PostgreSQL, MySQL, MongoDB, Redis, 쿼리 튜닝 및 성능 개선

### 주요 성과
- **자동화로 작업시간 50~75% 단축**
- **초당 10만 이벤트 처리 플랫폼 구축** (Redis 비동기 큐 + Celery 병렬 처리)
- **Ansible로 1,000대 규모 VPN 자동 배포** (3일 완료, 배포 표준 채택)
- **API 응답시간 100ms 이하** 달성 (3~5초 → 100ms, 80% API 호출 감소)
- 대규모 인프라 운영 (단말 1,000대+, 서버 150대+)
- **보안사고 0건 유지** (금융권 운영 20개월+)

---

## 💼 Work Experience

### ㈜아이티센 CTS
**정보보안 운영 엔지니어** | 2025.03 ~ 현재 (7개월)

**넥스트레이드 운영SM (정보보안팀)**

#### 담당 업무
- 금융위원회 본인가 이후 **운영 보안 체계 안정화**
- **15종 이상 보안 솔루션 통합 운영** 및 정책 최적화
- **보안 이벤트 모니터링 및 장애 대응** (24/7)
- 정기 보안 점검 및 취약점 관리

#### 주요 성과
- **보안 솔루션 통합 운영 안정화** - 15종 솔루션 정책 자동화 파이프라인 구축
- **보안 이벤트 24/7 실시간 모니터링 및 대응**
- **금융감독원 정기 감사 지적사항 0건** (12개월 연속)
- Python 기반 자동화로 점검 시간 단축

**Tech Stack** DDoS, IPS, WAF, NAC, DLP, EDR, APT, VPN, WIPS

**토스페이먼츠 연관성**
→ **많은 요청과 변화하는 조건 속에서도 안정성과 예측 가능성을 유지**하는 경험. 실시간 금융거래 환경에서 24/7 모니터링 및 즉시 대응 체계 구축.

---

### ㈜가온누리정보시스템
**프리랜서 인프라 엔지니어** | 2024.03 ~ 2025.02 (11개월)

**넥스트레이드 구축 프로젝트**

#### 담당 업무
- 금융위원회 본인가 대비 **망분리 및 보안 체계 구축**
- **15종 이상 보안 솔루션 통합 운영**
- NAC, DLP, SSL 복호화, APT 솔루션 도입 및 최적화

#### 주요 성과
- **Python 기반 비동기 멀티프로세싱**으로 방화벽 정책 100건+ 자동 배포, **작업시간 50% 단축**
- **EPP/DLP 충돌 문제 해결** (프로세스 격리를 통한 시스템 안정성 확보)
- **금융규제 요건 100% 충족**, 본인가 심사 통과
- 15종 보안 솔루션 통합 및 정책 자동화 파이프라인 구축

**Tech Stack** Python, Ansible, Fortigate, NAC, DLP, APT, SSL VPN, 망분리

**토스페이먼츠 연관성**
→ **복잡한 도메인을 단순하고 일관된 구조로 정리**하고, **자동화를 통해 안정성과 확장성을 함께 고려**한 경험.

---

### ㈜콴텍투자일임
**인프라·정보보호팀 인프라 엔지니어** | 2022.08 ~ 2024.03 (1년 7개월)

**AI 기반 주식투자 서비스**

#### 담당 업무
- **금융보안데이터센터(FSDC) 운영**
- **150대 이상 서버 및 스토리지 형상관리**
- 망분리 환경 내 DLP, DB 접근제어, VPN 정책 관리
- AWS 클라우드 보안 구성

#### 주요 성과
- **Python 기반 모니터링 자동화 구축** (150대 서버 실시간 헬스 체크)
- **금융감독원 정기 감사 통과, 보안사고 0건** (20개월+)
- **DB 접근제어 정책 쿼리 튜닝** - 성능 병목 해소 및 응답 속도 개선
- PB 플랫폼 POC 성능 검증 완료 (대규모 트래픽 시뮬레이션)

**Tech Stack** AWS, Python, Terraform, MySQL, PostgreSQL, DLP, DB 접근제어

**토스페이먼츠 연관성**
→ **데이터베이스 최적화** 및 **대규모 시스템 안정 운영** 경험. 금융 서비스 환경에서의 **정합성과 안정성 확보**.

---

### ㈜메타엠
**인프라 엔지니어** | 2019.12 ~ 2021.08 (1년 8개월)

**대규모 재택근무 환경 구축**

#### 담당 업무
- **1,000명 규모 VPN 재택근무 환경 긴급 구축**
- **Fortigate SSL VPN + Ansible 자동 배포**
- NAC 실시간 모니터링 및 위험 단말 격리

#### 주요 성과
- **Ansible로 VPN 1,000대 자동 배포 (3일 완료)** - 멱등성 기반 배포 표준(Standard) 채택, 기술 부채 예방
- **VPN-백신 충돌 해결** (Wireshark RTT 패턴 분석, NDIS 6.0 경쟁 조건 발견 및 프로세스 격리)
- **Python 점검 스크립트로 점검시간 75% 단축**
- **보안사고 0건** (20개월)
- 동일 자동화 스크립트 재사용으로 3개월간 150시간 절감

**Tech Stack** Fortigate SSL VPN, NAC, Ansible, Python, Cisco

**토스페이먼츠 연관성**
→ **대규모 자동화 배포 경험**과 **예외 상황 처리** (체계적 진단 능력). **변화에 유연하게 대응**하는 시스템 설계.

---

### ㈜엠티데이타
**서버 엔지니어** | 2017.02 ~ 2018.10 (1년 8개월)

**한국항공우주산업(KAI) 서버 운영**

#### 담당 업무
- **Linux 서버 50대 운영관리**
- 방화벽/IDS 로그분석 및 취약점 스캐닝
- **Shell 스크립트 기반 방화벽 정책 버전관리**

#### 주요 성과
- **보안사고 0건** (20개월)
- **방화벽 정책 롤백 자동화** (Shell Script)
- **방화벽 중복정책 정리**

**Tech Stack** Linux, Shell Script, iptables, IDS/IPS

**토스페이먼츠 연관성**
→ **정책 구조를 단순화하고 자동화**하여 운영 효율 개선. **안정성과 예측 가능성 유지**.

---

## 🚀 Projects

### Splunk-FortiNet Integration Platform
**Production** | 2024 ~ 현재
**URL** splunk.jclee.me | **GitHub** github.com/qws941/splunk-fortinet

**초당 10만 이벤트 및 80대 방화벽을 <100ms 응답성으로 통합 처리하는 Redis 기반 고성능 데이터 파이프라인**

**Tech Stack** Python Flask, Splunk API, FortiManager JSON-RPC, Cloudflare Workers, Redis 7, Docker

#### 핵심 아키텍처 및 성과
- **초당 10만 이벤트 처리 검증** - Redis 기반 비동기 작업 큐 + Celery Worker 병렬 처리
- **API 응답 시간 < 100ms** - 5분 캐싱 전략으로 불필요한 API 호출 80% 감소
- **80대 방화벽 동시 관리** - 각 방화벽 정책을 독립 워커로 병렬 처리
- **75,000% 확장 여유 확보** - 수평 확장 가능한 워커 아키텍처 설계
- **멱등성 키 적용**으로 중복 요청 방어, 데이터 정합성 보장

#### 토스페이먼츠 연관성
→ **대규모 트래픽 환경에서 빠른 응답성과 높은 정합성을 동시에 만족**하는 확장 가능한 시스템 설계 경험.

---

### REGTECH Blacklist Intelligence Platform
**Production** | 2024 ~ 현재
**URL** blacklist.jclee.me | **GitHub** github.com/qws941/blacklist

**REGTECH 포털 자동 수집 및 위협 인텔리전스 플랫폼**

**Tech Stack** Python Flask, PostgreSQL 15, Redis 7, Docker, GitHub Actions, Prometheus, Grafana

#### 주요 성과
- **자동 롤백 시스템** (30초 내 복구)
- **AI 기반 장애 분석 시스템** (Claude Code, LLM 활용)
- **AI로 로그 패턴 자동 분류 및 이상 탐지** (월 평균 오탐 알림 500건→25건 감소)
- **GitHub Actions CI/CD 파이프라인**
- **Prometheus + Grafana 모니터링**

#### 토스페이먼츠 연관성
→ **"지금 잘 작동하는 것"에서 멈추지 않고 "나중에도 잘 작동할 수 있게" 설계**한 시스템. 자동 롤백과 장애 분석을 통해 **안정성과 예측 가능성 확보**.

---

### FortiGate Policy Orchestration Platform
**Production** | 2024 ~ 현재
**URL** fortinet.jclee.me | **GitHub** github.com/qws941/fortinet

**FortiManager 정책 관리 자동화 플랫폼**

**Tech Stack** Python Flask, FortiManager JSON-RPC, Docker, GitHub Actions

#### 주요 성과
- **정책 검증 자동화**
- **서비스 중단 0건**
- **감사 대응 문서 자동 생성**
- **3-Port HA 아키텍처**

#### 토스페이먼츠 연관성
→ **복잡한 정책 관리를 단순하고 일관된 구조로 정리**하고, **자동화로 운영 효율 개선**.

---

### Full-Stack Observability Platform
**Production** | 2024 ~ 현재
**URL** grafana.jclee.me | **GitHub** github.com/qws941/grafana

**Prometheus + Grafana + Loki + Tempo 통합 모니터링 플랫폼**

**Tech Stack** Prometheus, Grafana, Loki, Tempo, Promtail, Traefik, Docker Compose

#### 주요 성과
- **11개 대시보드 운영** (121개 패널)
- **초당 10만+ 로그 이벤트 처리**
- **24/7 실시간 모니터링**
- **5개 Production 시스템 메트릭 수집**

#### 토스페이먼츠 연관성
→ **시스템 전반의 품질과 속도를 함께 책임**지는 모니터링 체계. **Full Observability 구축 경험**.

---

### SafeWork Industrial Health Platform
**Production** | 2024 ~ 현재
**URL** safework.jclee.me | **GitHub** github.com/qws941/safework

**산업보건 관리 시스템 (13개 관리 패널)**

**Tech Stack** Flask 3.0, PostgreSQL 15, Redis 7, Cloudflare Workers, Bootstrap

#### 주요 성과
- **전국 동시 접속 처리**
- **집계 로직 오류 수정** (데이터 정합성 100% 보장)
- **다수 중소기업 실운영**
- **GitHub Actions 자동 배포** (배포 시간 67% 단축)

#### 토스페이먼츠 연관성
→ **사용자와 셀러에게 직접 닿는 제품**을 만든 경험. **데이터 정합성 확보** 및 **배포 자동화**.

---

## 🎓 Education

**한양사이버대학교** | 컴퓨터공학과 | 2024.03 ~ 재학중

---

## 📜 Certifications

- **CCNP** (Cisco Certified Network Professional) | Cisco Systems | 2020.08
- **RHCSA** (Red Hat Certified System Administrator) | RED HAT | 2019.01
- **CompTIA Linux+** | CompTIA | 2019.02
- **LPIC Level 1** | LINUX | 2019.02

---

## 🎯 토스페이먼츠 시니어 플랫폼 엔지니어 포지션 적합성

### 요구사항 매칭

#### ✅ 빠른 응답성과 높은 정합성이 동시에 요구되는 시스템 설계·운영
- **초당 10만 이벤트 처리** 플랫폼 구축 (API 응답 시간 < 100ms)
- **멱등성 키 적용**으로 중복 요청 방어, 데이터 정합성 보장
- **자동 롤백 시스템** (30초 내 복구) 구축
- 금융권 실시간 거래 환경에서 **무중단 운영** 달성

#### ✅ 안정성과 예측 가능성을 유지할 수 있는 구조 고민
- **Full Observability 구축** (Prometheus, Grafana, Loki, Tempo)
- **보안 솔루션 통합 운영 안정화** (15종 솔루션 정책 자동화)
- **자동 롤백 시스템** (30초 내 복구) 및 **AI 기반 장애 분석**
- **금융감독원 정기 감사 지적사항 0건** (12개월 연속)

#### ✅ 복잡한 도메인을 단순하고 일관된 구조로 정리
- **Python 비동기 멀티프로세싱**으로 방화벽 정책 100건+ 자동 배포 (작업시간 50% 단축)
- **정책 검증 자동화** (FortiGate Policy Orchestration)
- **복잡한 충돌 상황 구조화 및 자동 해결** (EPP/DLP 충돌 → 프로세스 격리)

#### ✅ 시간이 지날수록 더 나아질 수 있는 구조 고민
- **수평 확장 가능한 워커 아키텍처** 설계 (75,000% 확장 여유 확보)
- **3-Port HA 아키텍처** (무중단 서비스 지속)
- **재사용 가능한 자동화 파이프라인** 설계 (Ansible, GitHub Actions)
- **배포 표준(Standard) 채택**으로 기술 부채 예방

#### ✅ 문제 정의 및 구조화 능력
- **EPP/DLP 충돌 문제**를 데이터 기반으로 분석하고 **프로세스 격리로 해결**
- **Wireshark RTT 패턴 분석**으로 VPN-백신 충돌의 근본 원인 규명
- **보안 정책 재설계**로 안정성 확보 (문제 재정의 → 효율 개선)
- **신규 보안 솔루션 15종 통합** 및 안정화 (금융 본인가 심사 통과)

---

### 토스페이먼츠 기술 스택 매칭

| 토스 요구사항 | 보유 기술 | 경험 수준 |
|------------|---------|---------|
| **Kotlin, Spring** | **Kotlin/Spring (학습 중)** - Spring Webflux 기반 비동기 API 구축 경험 (개인 프로젝트) | 학습 중 (Python/Node.js 기반 서버 개발 7년) |
| **Python, Node.js, Go** | **Python, Node.js** | **7년 (실무 중심)** |
| **MySQL, MongoDB, Redis** | **PostgreSQL, MySQL, MongoDB, Redis** | **7년 (실무 중심)** - 쿼리 튜닝, 캐싱 전략 |
| **ElasticSearch, Kafka, Hadoop** | **Splunk, ELK Stack** (Kafka 유사 구조) | **3년 (실무 중심)** - 초당 10만 이벤트 처리 검증 |
| **GenAI** | **Claude Code, LLM 기반 자동화 시스템** | **1년 (실무 적용)** - AI 기반 장애 분석 |

---

### 토스페이먼츠 팀별 적합성 분석

#### AI·자동화 영역 (최우선 희망)
✅ **반복적인 운영 업무를 기술로 치환**
- Python 자동화로 작업시간 50~75% 단축
- Ansible로 VPN 1,000대 자동 배포 (3일 완료)

✅ **예외 상황을 안정적으로 처리**
- EPP/DLP 충돌 해결 (프로세스 격리)
- VPN-백신 충돌 해결 (Wireshark 패턴 분석)
- 보안 정책 재설계로 안정성 확보

✅ **운영 효율을 높이는 시스템 설계**
- 정책 검증 자동화 구축
- 감사 대응 문서 자동 생성
- 배포 표준(Standard) 채택

#### 주문·결제·프로모션 영역
✅ **정합성 있는 시스템 설계**
- 금융권 실시간 거래 환경에서 무중단 운영
- 멱등성 키 적용으로 중복 요청 방어
- 데이터 정합성 확보 (집계 로직 오류 수정)

✅ **다양한 할인 정책, 정산 가능한 가격 구조**
- 복잡한 정책 관리 자동화 (FortiGate Policy Orchestration)
- DB 접근제어 쿼리 튜닝 (성능 개선)

#### 상점·상품 영역
✅ **상품 수명주기 정의 및 안정적 운영**
- 신규 솔루션 15종 통합 및 안정화
- 형상관리 및 버전관리 자동화 (150대 서버)

---

### 함께 만들고 싶은 것

토스페이먼츠는 **"이미 정의된 문제를 푸는 것"보다 "문제를 정의하고, 나아갈 방향을 함께 만드는 것"**을 중요하게 생각합니다.

저는 7년간 **보안사고 0건을 유지하면서도 작업시간을 50~75% 단축**한 경험이 있습니다. 이는 단순히 주어진 문제를 해결한 것이 아니라, **"어떻게 하면 안정성과 효율을 동시에 확보할 수 있을까?"**라는 질문에서 출발한 결과입니다.

토스페이먼츠의 시니어 플랫폼 엔지니어로서, **확장 가능한 시스템 설계와 자동화 플랫폼 구축**을 통해 빠른 응답성과 높은 정합성을 동시에 만족하는 시스템을 만들고 싶습니다. 특히 **AI·자동화 영역에서 반복적인 운영 업무를 기술로 치환**하고, **예외 상황을 안정적으로 처리하는 구조**를 만드는 데 기여하고 싶습니다.

---

### 마무리

"**지금 잘 작동하는 시스템보다, 시간이 지날수록 더 나아질 수 있는 구조를 고민하는 분**"

이 한 문장이 저의 지난 7년을 가장 잘 설명합니다.
토스페이먼츠에서 함께 만들어갈 기회를 기대합니다.
