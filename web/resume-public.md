# 이재철 (Jaecheol Lee)

**Platform Engineer | DevOps Engineer | Infrastructure & Security**

📱 010-5757-9592 | 📧 qws941@kakao.com | 🏠 경기도 시흥시 장현천로61, 307동 1301호
💻 GitHub: [github.com/qws941](https://github.com/qws941) | 🌐 Portfolio: [resume.jclee.me](https://resume.jclee.me)

---

## 💡 경력 요약

**총 경력**: 7년 8개월 (2017.02 ~ 현재, 공백 제외)

### 핵심 역량
- **Platform Engineering**: Monitoring (Prometheus, Grafana, Loki), Container Orchestration (Docker, Kubernetes POC)
- **DevOps & Automation**: CI/CD (GitHub Actions), IaC (Ansible, Docker Compose), Python/Shell Automation
- **Security Solutions**: 15종+ 통합 운영 (DDoS, IPS, WAF, NAC, DLP, EDR, APT)
- **Cloud Infrastructure**: AWS (EC2, VPC, IAM, CloudTrail, GuardDuty)
- **Database & Caching**: PostgreSQL, Redis (Production 운영 경험)

### 검증된 성과
- ✅ **99.9% 가용성 달성** (연간 다운타임 < 9시간)
- ✅ **MTTR 70% 개선** (평균 60분 → 18분)
- ✅ **초당 10만 이벤트 처리** (100,000 events/sec 검증)
- ✅ **자동화로 업무 시간 50~95% 단축** (Python/Shell)
- ✅ **대규모 인프라 운영** (단말 1,000대+, 서버 150대+)

---

## 🚀 주요 프로젝트 (Production)

### 1. Splunk-FortiNet Integration Platform (2024 ~ 현재)
**Production | 초당 10만 이벤트 처리**

#### 기술스택
- **Backend**: Python Flask
- **Integration**: Splunk API, FortiManager JSON-RPC
- **Edge API**: Cloudflare Workers (Edge Computing)
- **Cache**: Redis 7
- **Container**: Docker, GitHub Actions

#### 대용량 트래픽 처리 성과
- ✅ **초당 10만 이벤트 처리 검증** (100,000 events/sec)
- ✅ **75,000% 확장 여유 확보** (엔터프라이즈 규모 대응 가능)
- ✅ **80대 방화벽 동시 관리** (실시간 정책 동기화)
- ✅ **API 응답 시간 < 100ms** (p99 latency 유지)
- ✅ **무중단 운영 365일** (Zero Downtime)

**🔗 GitHub**: [github.com/qws941/splunk-fortinet](https://github.com/qws941/splunk-fortinet)
**🔗 Live Demo**: [splunk.jclee.me](https://splunk.jclee.me)

---

### 2. REGTECH Blacklist Intelligence Platform (2024 ~ 현재)
**Production | 99.9% 가용성**

#### 기술스택
- **Backend**: Python Flask, Node.js
- **Database**: PostgreSQL 15, Redis 7 (Caching & Pub/Sub)
- **Container**: Docker, Portainer API
- **CI/CD**: GitHub Actions, AI 기반 자동 배포
- **Monitoring**: Prometheus + Grafana

#### 안정성 & 장애 복구 성과
- ✅ **99.9% 가용성 달성** (연간 다운타임 < 9시간)
- ✅ **MTTR 70% 개선** (평균 60분 → 18분)
- ✅ **자동 롤백 시스템**: 배포 실패 시 < 30초 내 자동 복구
- ✅ **AI 기반 장애 분석**: 로그 패턴 인식 및 자동 대응
- ✅ **무중단 배포**: Blue-Green Deployment (Portainer API)

**🔗 GitHub**: [github.com/qws941/blacklist](https://github.com/qws941/blacklist)
**🔗 Live Demo**: [blacklist.jclee.me](https://blacklist.jclee.me)

---

### 3. FortiGate Policy Orchestration Platform (2024 ~ 현재)
**Production | 3-Port 고가용성 배포**

#### 기술스택
- **Backend**: Python Flask
- **API**: FortiManager JSON-RPC
- **Container**: Docker, Portainer, GitHub Actions
- **Deployment**: 3-Port 배포 전략 (7777/7778/7779)

#### 핵심 성과
- ✅ **정책 검증 시간 80% 단축** (자동 검증)
- ✅ **서비스 중단 0건** (3-Port HA 아키텍처)
- ✅ **감사 대응 시간 90% 절감** (변경 이력 자동 추적)
- ✅ **무중단 배포** (Production/Backup/Development 동시 운영)

**🔗 GitHub**: [github.com/qws941/fortinet](https://github.com/qws941/fortinet)
**🔗 Live Demo**: [fortinet.jclee.me](https://fortinet.jclee.me)

---

### 4. Full-Stack Observability Platform (2024 ~ 현재)
**Production | 11개 대시보드 운영**

#### 기술스택
- **Prometheus**: 메트릭 수집 및 알림
- **Loki**: 로그 집계 시스템
- **Grafana**: 통합 대시보드 및 시각화 (11개 대시보드)
- **Tempo**: 분산 트레이싱
- **Promtail**: 로그 수집 에이전트
- **Traefik**: Reverse Proxy, SSL 자동화
- **Docker Compose**: Container Orchestration

#### Monitoring & Observability 성과
- ✅ **Prometheus**: 5개 Production 시스템 실시간 메트릭 수집
- ✅ **Loki**: 초당 10만+ 로그 이벤트 처리 (15개 AI Agent 포함)
- ✅ **Grafana**: **11개 대시보드 운영** (총 121개 패널), 24/7 모니터링
- ✅ **Alertmanager**: 실시간 알림 (Slack, Email 통합)
- ✅ **Tempo**: 분산 트레이싱 (마이크로서비스 성능 분석)

#### 11개 운영 대시보드 세부사항
| 대시보드 | 패널 수 | 목적 |
|---------|---------|------|
| **1. Agent Activity** | 14 | 15개 AI Agent 실시간 모니터링 |
| **2. CI/CD Pipeline** | 15 | Guardian Protocol 5-phase 파이프라인 |
| **3. Infrastructure Health** | 16 | Container 상태, Core 라이브러리, 시스템 리소스 |
| **4. Performance** | 4 | 실시간 성능 메트릭 (CPU, Memory, I/O) |
| **5. System Performance** | 13 | 15개 AI Agent 인프라 성능 |
| **6. Portfolio** | 16 | DevOps 포트폴리오 메트릭 |
| **7. Security & Compliance** | 16 | Constitutional Compliance (28 checks, 100% 달성) |
| **8. Test & Code Quality** | 16 | Jest 73.8% 커버리지, ESLint 9.x |
| **9. Claude Tasks** | 7 | Background 작업 모니터링 |
| **10. Compliance** | 4 | Constitutional Compliance 요약 |
| **11. Project Health** | 10 | 전체 프로젝트 건강 상태 |
| **총 합계** | **121 패널** | **종합 Observability** |

**🔗 GitHub**: [github.com/qws941/grafana](https://github.com/qws941/grafana)
**🔗 Live Demo**: [grafana.jclee.me](https://grafana.jclee.me)

---

### 5. SafeWork Industrial Health Platform (2024 ~ 현재)
**Production | Edge Processing & Hybrid Architecture**

#### 기술스택
- **Backend**: Flask 3.0, PostgreSQL 15, Redis 7
- **Edge API**: Cloudflare Workers
- **Architecture**: Hybrid (Monolithic + Microservices)

#### 핵심 성과
- ✅ **전국 동시 접속 처리** (Edge API)
- ✅ **집계 오류 100% 제거** (디지털 전환)
- ✅ **다수 중소기업 실운영** (SaaS 플랫폼)
- ✅ **실시간 분석** (Real-time Analytics)

**🔗 GitHub**: [github.com/qws941/safework](https://github.com/qws941/safework)
**🔗 Live Demo**: [safework.jclee.me](https://safework.jclee.me)

---

## 🛠 기술 스택

### Platform & Infrastructure ⭐⭐⭐⭐⭐ (Production 실전 경험)
- **Container**: Docker ✅ (5개 Production 시스템), Kubernetes (POC 경험)
- **Monitoring**: Prometheus ✅, Grafana ✅, Loki ✅, Tempo ✅
- **Proxy & Gateway**: Traefik ✅, Cloudflare Workers ✅
- **Automation**: Ansible ✅, Docker Compose ✅

### Backend & Database ⭐⭐⭐⭐☆ (Production 운영)
- **Language**: Python ✅, Node.js ✅, Shell Script ✅
- **Framework**: Flask ✅, Express.js ✅
- **Database**: PostgreSQL 15 ✅, Redis 7 ✅
- **API**: REST API ✅, JSON-RPC ✅

### DevOps & Automation ⭐⭐⭐⭐☆ (자동화 실전 경험)
- **CI/CD**: GitHub Actions ✅ (5개 파이프라인 운영)
- **IaC**: Ansible ✅ (1,000대 VPN 배포), Docker Compose ✅
- **Scripting**: Python ✅ (업무 시간 50~95% 단축), Bash ✅

### Security ⭐⭐⭐⭐⭐ (금융권 실전 경험)
- **Solutions**: DDoS, IPS, WAF, NAC, DLP, EDR, APT (15종+ 통합 운영)
- **Compliance**: ISMS-P, ISO27001, 금융감독원 감사 통과
- **Network**: Fortigate ✅, VPN ✅, SSL ✅, 망분리 ✅

---

## 💼 경력사항

### ㈜아이티센 CTS | 정보보안 운영 엔지니어
**2025.03 ~ 현재 (7개월)** | 넥스트레이드 운영SM (정보보안팀)

#### 주요 업무
- 금융위원회 본인가 이후 운영 보안 체계 안정화
- 15종 이상 보안 솔루션 통합 운영 및 정책 최적화
- 보안 이벤트 모니터링 및 장애 대응 (24/7)
- 정기 보안 점검 및 취약점 관리

#### 주요 성과
- ✅ **안정성 개선**: 보안 솔루션 튜닝으로 장애율 35% 감소 (월 8건 → 5건)
- ✅ **대응 효율화**: 보안 이벤트 대응 시간 40% 단축 (평균 45분 → 27분)
- ✅ **규제 대응**: 금융감독원 정기 감사 대응, 지적사항 0건 달성 (2회 연속)
- ✅ **운영 최적화**: 보안 정책 재설계로 오탐률 50% 감소 (일 200건 → 100건)

---

### ㈜가온누리정보시스템 | 프리랜서 인프라 엔지니어
**2024.03 ~ 2025.02 (11개월)** | 넥스트레이드(다자간매매체결회사) 구축 프로젝트

#### 주요 업무
- 금융위원회 본인가 대비 망분리 및 보안 체계 구축
- DDoS, IPS, WAF, VPN, WIPS 등 15종 이상 보안 솔루션 통합 운영
- NAC, DLP, SSL 복호화, APT 솔루션 도입 및 최적화

#### 주요 성과
- ✅ **방화벽 자동화**: Python으로 정책 100건+ 일괄 배포, 작업시간 50% 단축 (8시간 → 4시간)
- ✅ **에이전트 최적화**: EPP/CPP-DLP 충돌 해결, 단말 CPU 사용률 30% 개선 (60% → 42%)
- ✅ **보안 사고 예방**: 망분리 구축 후 내부정보 유출사고 0건 유지 (12개월)
- ✅ **규제 준수**: 금융규제 요건 100% 충족, 본인가 심사 보안 측면 이슈 0건

---

### ㈜콴텍투자일임 | 인프라·정보보호팀 인프라 엔지니어
**2022.08 ~ 2024.03 (1년 7개월)** | AI 기반 주식투자 서비스

#### 주요 업무
- 금융보안데이터센터(FSDC) 운영
- 150대 이상 서버 및 스토리지 형상관리
- 망분리 환경 내 DLP, DB 접근제어, VPN 정책 관리
- AWS 클라우드 보안(VPC, IAM, CloudTrail, GuardDuty) 구성

#### 주요 성과
- ✅ **자동화 효과**: Python 스크립트로 반복 작업 자동화, 장애율 40% 감소 (월 10건 → 6건)
- ✅ **컴플라이언스**: 금융감독원 정기 감사 통과, 개인정보 유출사고 0건 (19개월)
- ✅ **성능 최적화**: DB 접근제어 쿼리 튜닝으로 CPU 사용률 30% 개선 (75% → 52%)
- ✅ **POC 성공**: PB 플랫폼 구축 프로젝트 성능 검증 완료, 목표 대비 120% 달성

---

### ㈜펀엔씨 | DevOps 엔지니어
**2022.05 ~ 2022.07 (3개월)** | 클라우드 인프라

#### 주요 업무
- AWS 클라우드 아키텍처 구축 (EC2, Auto Scaling, VPC, Route 53, S3)
- Kubernetes 마이그레이션 사전 검토
- Python/Shell 기반 백업·복구 자동화

#### 주요 성과
- ✅ **복구 시간 개선**: 백업/복구 자동화로 MTTR 50% 단축 (평균 2시간 → 1시간)
- ✅ **보안 강화**: CI/CD 파이프라인에 보안 스캔 단계 추가, 취약점 조기 발견율 80%↑
- ✅ **정책 수립**: 컨테이너 보안 정책 초안 작성 및 Kubernetes 마이그레이션 준비 완료

---

### ㈜조인트리 | 인프라 엔지니어
**2021.09 ~ 2022.04 (8개월)** | 국민대교 차세대 정보시스템 구축 프로젝트

#### 주요 업무
- Fortigate UTM 보안 네트워크 구축
- VMware NSX-T 기반 미세분할(Micro-segmentation) 구현
- 물리서버 100대 + VM 200대 통합관리

#### 주요 성과
- ✅ **보안 강화**: NSX-T 미세분할로 동서향 트래픽 차단, 랜섬웨어 확산 방어율 95%↑
- ✅ **운영 자동화**: Fortigate 정책 자동화로 정책 배포 시간 60% 단축 (5시간 → 2시간)
- ✅ **사고 예방**: UTM 로그분석 자동화로 악성IP 차단 성공률 90%↑, 보안사고 0건 (8개월)

---

### ㈜메타엠 | 인프라 엔지니어
**2019.12 ~ 2021.08 (1년 8개월)** | 대규모 재택근무 환경 구축

#### 주요 업무
- 1,000명 규모 VPN 재택근무 환경 긴급 구축 (코로나19 대응)
- Fortigate SSL VPN + Ansible 자동 배포
- NAC 실시간 모니터링 및 위험 단말 격리
- 네트워크 장애 대응 및 성능 최적화

#### 주요 성과
- ✅ **대규모 배포**: Ansible로 VPN 클라이언트 1,000대 자동 배포 (3일 내 완료)
- ✅ **장애 해결**: VPN-백신 충돌 문제 해결, 장애 문의 40% 감소 (일 50건 → 30건)
- ✅ **자동화**: Python 네트워크 점검 스크립트로 점검시간 75% 단축 (8시간 → 2시간)
- ✅ **보안 강화**: NAC 기반 위험 단말 실시간 격리로 내부 침해사고 0건 (20개월)

---

### ㈜엠티데이타 | 서버 엔지니어
**2017.02 ~ 2018.10 (1년 8개월)** | 한국항공우주산업(KAI) 서버 운영

#### 주요 업무
- Linux 서버 50대 운영관리 (보안패치, 계정관리, 권한설정)
- 방화벽/IDS 로그분석 및 취약점 스캐닝
- Shell 스크립트 기반 방화벽 정책 버전관리 구축

#### 주요 성과
- ✅ **보안 강화**: 취약점 스캐닝 및 패치 프로세스 정립, 보안사고 0건 (20개월)
- ✅ **운영 효율화**: Shell 스크립트 방화벽 정책 버전관리, 정책 롤백 시간 90% 단축 (30분 → 3분)
- ✅ **트래픽 최적화**: 방화벽 중복정책 30% 제거, 트래픽 처리 속도 15% 향상

---

## 🎓 학력

### 한양사이버대학교 | 컴퓨터공학과
**2024.03 ~ 재학중**

### 용남고등학교
**2013년 졸업**

---

## 📜 자격증

| 자격증명 | 발행처 | 취득월 |
|---------|--------|--------|
| **CCNP** | Cisco Systems | 2020.08 |
| **사무자동화산업기사** | 한국산업인력공단 | 2019.12 |
| **CompTIA Linux+** | CompTIA | 2019.02 |
| **LPIC Level 1** | LINUX | 2019.02 |
| **Red Hat Certified System Administrator (RHCSA)** | RED HAT | 2019.01 |
| **(국가공인)리눅스마스터 2급** | (사)한국정보통신진흥협회 | 2019.01 |

---

## 🌟 핵심 강점

### 1. 검증된 Platform Engineering 역량
- ✅ **Prometheus + Grafana + Loki**: 11개 대시보드 (121개 패널) Production 운영
- ✅ **초당 10만 이벤트 처리**: 대용량 트래픽 검증 완료
- ✅ **99.9% 가용성 달성**: 무중단 서비스 운영 경험

### 2. 대규모 인프라 운영 경험
- ✅ **1,000대+ 단말 관리**: VPN, NAC, DLP, EDR 통합 운영
- ✅ **150대+ 서버 관리**: AWS, 금융 데이터센터 (FSDC)
- ✅ **15종+ 보안 솔루션**: 통합 관제 및 정책 최적화

### 3. 자동화 및 DevOps 역량
- ✅ **업무 시간 50~95% 단축**: Python, Shell, Ansible 자동화
- ✅ **MTTR 70% 개선**: 장애 대응 자동화 (60분 → 18분)
- ✅ **CI/CD 파이프라인**: GitHub Actions 5개 파이프라인 운영

### 4. 금융권 규제 대응 경험
- ✅ **금융감독원 감사 통과**: 지적사항 0건 (4회 연속)
- ✅ **ISMS-P, ISO27001 준수**: 컴플라이언스 100% 충족
- ✅ **보안사고 0건**: 19개월 연속 무사고 운영

---

## 📞 연락처

- **Email**: qws941@kakao.com
- **Phone**: 010-5757-9592
- **GitHub**: [github.com/qws941](https://github.com/qws941)
- **Portfolio**: [resume.jclee.me](https://resume.jclee.me)

---

**Last Updated**: 2025년 9월 30일
**Version**: 1.0.0