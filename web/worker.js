// Cloudflare Worker for Resume Portfolio
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - 인프라·보안 엔지니어 포트폴리오</title>
    <meta name="description" content="7년차 인프라·보안 엔지니어 이재철의 포트폴리오. 금융/클라우드 전문, Python 자동화, AWS, Docker, Kubernetes 전문가">
    <meta property="og:title" content="이재철 - 인프라·보안 엔지니어 포트폴리오">
    <meta property="og:description" content="복잡한 시스템 문제를 단순하게 해결하는 인프라 엔지니어">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://resume.jclee.me">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
        }

        .profile-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            font-weight: bold;
        }

        .name {
            font-size: 2.5em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .title {
            font-size: 1.3em;
            color: #7f8c8d;
            margin-bottom: 20px;
        }

        .intro {
            font-size: 1.1em;
            line-height: 1.8;
            color: #34495e;
            max-width: 800px;
            margin: 0 auto;
        }

        .section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .section-title {
            font-size: 2em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
        }

        .section-title::after {
            content: '';
            display: block;
            width: 50px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            margin: 10px auto;
            border-radius: 2px;
        }

        .experience-item {
            margin-bottom: 40px;
            border-left: 4px solid #667eea;
            padding-left: 20px;
            position: relative;
        }

        .experience-item::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 0;
            width: 12px;
            height: 12px;
            background: #667eea;
            border-radius: 50%;
        }

        .company {
            font-size: 1.4em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .period {
            color: #7f8c8d;
            margin-bottom: 15px;
            font-weight: 500;
        }

        .achievement {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0;
            border-left: 4px solid #27ae60;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }

        .skill-category {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            border-top: 4px solid #667eea;
        }

        .skill-category h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
        }

        .project-card {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            border-top: 4px solid #27ae60;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .project-title {
            font-size: 1.4em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .project-url {
            display: inline-block;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            text-decoration: none;
            margin-top: 15px;
            transition: transform 0.3s ease;
        }

        .project-url:hover {
            transform: scale(1.05);
        }

        .contact {
            text-align: center;
            margin-top: 30px;
        }

        .contact-item {
            display: inline-block;
            margin: 10px 20px;
            padding: 15px 25px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .contact-item:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
        }

        .goals {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            text-align: center;
            font-size: 1.1em;
            line-height: 1.8;
        }

        .goals .section-title {
            color: white;
        }

        .goals .section-title::after {
            background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            .header, .section {
                padding: 20px;
            }

            .name {
                font-size: 2em;
            }

            .skills-grid {
                grid-template-columns: 1fr;
            }

            .contact-item {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="profile-img">이재철</div>
            <h1 class="name">이재철</h1>
            <p class="title">인프라·보안 엔지니어 | 7년차 | 금융/클라우드 전문</p>
            <p class="intro">
                복잡한 시스템 문제를 단순하게 해결하는 것을 좋아합니다.
                7년간 금융, 교육, 제조업에서 인프라 보안을 담당하면서
                "어떻게 하면 동료들이 더 편하게 일할 수 있을까?"를 항상 고민해왔습니다.
                특히 반복되는 수작업을 Python으로 자동화해서 팀 전체의 업무 효율을 높이는 일에 보람을 느낍니다.
            </p>
        </div>

        <!-- 주요 경력 -->
        <div class="section">
            <h2 class="section-title">주요 경력</h2>

            <div class="experience-item">
                <h3 class="company">가온누리정보시스템 | 인프라 엔지니어 (프리랜서)</h3>
                <p class="period">2024.03 - 현재</p>
                <p>ATS(다자간매매체결회사) 금융위원회 본인가 대비 보안 인프라 구축</p>
                <div class="achievement">
                    💡 매일 3시간씩 걸리던 방화벽 정책 배포를 Python으로 자동화해서 담당자가 다른 중요한 업무에 집중할 수 있게 함
                </div>
                <div class="achievement">
                    🔧 직원들이 "컴퓨터가 자꾸 꺼져요"라고 하소연하던 EPP/DLP 충돌 문제를 근본 원인부터 분석해서 해결
                </div>
            </div>

            <div class="experience-item">
                <h3 class="company">콴텍투자일임 | 인프라·정보보호팀 인프라 엔지니어</h3>
                <p class="period">2022.08 - 2024.03</p>
                <p>금융보안데이터센터(FSDC) 내 서버 150대 운영 및 AWS 클라우드 보안 아키텍처 설계</p>
                <div class="achievement">
                    🚀 서버가 자주 느려진다는 개발팀 불만을 듣고 DB 접근제어 정책을 전면 재검토해서 개발 환경이 훨씬 쾌적해짐
                </div>
                <div class="achievement">
                    🌙 야간 시스템 오류 알림 때문에 잠 못 자던 운영팀을 위해 Python 모니터링 스크립트로 장애 예방 체계 구축
                </div>
            </div>

            <div class="experience-item">
                <h3 class="company">메타넷엠플랫폼 | 인프라·시스템 엔지니어</h3>
                <p class="period">2019.12 - 2021.08</p>
                <p>1,000명 규모 콜센터 재택근무 인프라 긴급 구축</p>
                <div class="achievement">
                    🏠 코로나19라는 긴급상황에서 "내일부터 재택근무 해야 하는데 어떻게 하죠?"라는 상황에 2주 만에 1,000명이 안전하게 접속할 수 있는 환경 구축
                </div>
                <div class="achievement">
                    ⚡ Python으로 네트워크 점검을 자동화해서 담당자가 오전 8시에 출근해서 바로 핵심 업무부터 시작할 수 있게 개선
                </div>
            </div>
        </div>

        <!-- 개인 프로젝트 -->
        <div class="section">
            <h2 class="section-title">개인 프로젝트</h2>

            <div class="project-card">
                <h3 class="project-title">SafeWork 산업보건 관리 시스템</h3>
                <p>회사에서 매년 종이로 하던 근골격계 설문조사를 보면서 "이걸 왜 아직도 수기로 하지?"라는 생각에 만든 시스템입니다.</p>
                <p><strong>해결한 문제:</strong> 종이 설문지로 인한 집계 오류, 개인정보 노출 우려, 시간 낭비</p>
                <p><strong>실제 효과:</strong> 익명성을 보장하면서도 즉시 통계 분석이 가능해져서 실제 몇 개 중소기업에서 사용 중</p>
                <p><strong>기술 스택:</strong> Flask 3.0+, PostgreSQL 15+, Redis 7.0, Bootstrap</p>
                <a href="https://safework.jclee.me" class="project-url" target="_blank">🔗 프로젝트 보기</a>
            </div>

            <div class="project-card">
                <h3 class="project-title">Blacklist Management System (위협 인텔리전스 플랫폼)</h3>
                <p>보안 담당자들이 매일 여러 사이트에서 IP 차단 목록을 일일이 확인하고 수집하는 걸 보고 만든 자동화 시스템입니다.</p>
                <p><strong>해결한 문제:</strong> 수동 수집으로 인한 누락, 실시간성 부족, 여러 소스 통합의 어려움</p>
                <p><strong>실제 가치:</strong> 하루 2시간씩 걸리던 위협 정보 수집이 완전 자동화되어 보안팀이 분석과 대응에 집중 가능</p>
                <p><strong>기술 스택:</strong> Python 3.11+, Flask, PostgreSQL 15, Redis 7, Docker</p>
                <a href="https://blacklist.jclee.me" class="project-url" target="_blank">🔗 프로젝트 보기</a>
            </div>
        </div>

        <!-- 기술 스킬 -->
        <div class="section">
            <h2 class="section-title">기술 스킬</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>🔐 보안</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">NAC</span>
                        <span class="skill-tag">DLP</span>
                        <span class="skill-tag">EDR</span>
                        <span class="skill-tag">APT</span>
                        <span class="skill-tag">Fortigate</span>
                        <span class="skill-tag">Palo Alto</span>
                        <span class="skill-tag">IPS/IDS</span>
                        <span class="skill-tag">망분리</span>
                        <span class="skill-tag">SSL VPN</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>☁️ 클라우드/인프라</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">Docker</span>
                        <span class="skill-tag">Kubernetes</span>
                        <span class="skill-tag">VMware</span>
                        <span class="skill-tag">NSX-T</span>
                        <span class="skill-tag">Terraform</span>
                        <span class="skill-tag">Ansible</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>💻 개발/자동화</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Flask</span>
                        <span class="skill-tag">Shell Script</span>
                        <span class="skill-tag">Jenkins</span>
                        <span class="skill-tag">GitHub Actions</span>
                        <span class="skill-tag">GitOps</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3>🗄️ 데이터베이스</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">PostgreSQL</span>
                        <span class="skill-tag">MySQL</span>
                        <span class="skill-tag">Redis</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 개인 성향 -->
        <div class="section">
            <h2 class="section-title">개인 성향 & 업무 철학</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>🔍 문제 발견과 해결</h3>
                    <p>동료들의 불편함을 발견하면 그냥 넘어가지 못하는 성격으로, 작은 불편함이라도 자동화로 해결하려고 노력합니다.</p>
                </div>

                <div class="skill-category">
                    <h3>📚 실무 중심 학습</h3>
                    <p>새로운 기술을 배울 때도 항상 "현재 업무에서 어떻게 활용할 수 있을까?"를 먼저 고민합니다.</p>
                </div>

                <div class="skill-category">
                    <h3>🔄 지속적인 운영</h3>
                    <p>만들어놓고 끝이 아니라, 실제 서비스로 운영하면서 사용자 피드백을 받고 개선하는 과정을 즐깁니다.</p>
                </div>

                <div class="skill-category">
                    <h3>🤝 협업 지향</h3>
                    <p>혼자 잘하는 것보다 팀 전체의 효율을 높이는 것에서 더 큰 만족감을 느낍니다.</p>
                </div>
            </div>
        </div>

        <!-- 자격증 -->
        <div class="section">
            <h2 class="section-title">자격증</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>📜 주요 자격증</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">CCNP (2020.08)</span>
                        <span class="skill-tag">RHCSA (2019.01)</span>
                        <span class="skill-tag">CompTIA Linux+ (2019.02)</span>
                        <span class="skill-tag">LPIC Level 1 (2019.02)</span>
                        <span class="skill-tag">사무자동화산업기사 (2019.12)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 미래 목표 -->
        <div class="section goals">
            <h2 class="section-title">앞으로의 목표</h2>
            <p>
                클라우드와 보안이 더욱 중요해지는 시대에 맞춰, 단순히 시스템을 관리하는 것을 넘어서
                비즈니스 가치를 창출하는 인프라 엔지니어로 성장하고 싶습니다.
                특히 팀원들이 "덕분에 일하기 편해졌어요"라고 말해주는 순간들이 가장 보람차며,
                앞으로도 기술을 통해 사람들의 업무 환경을 개선하는 일을 계속하고 싶습니다.
            </p>
        </div>

        <!-- 연락처 -->
        <div class="contact">
            <a href="mailto:qws941@kakao.com" class="contact-item">📧 qws941@kakao.com</a>
            <a href="tel:010-5757-9592" class="contact-item">📱 010-5757-9592</a>
            <a href="https://github.com/qws941" target="_blank" class="contact-item">🔗 GitHub</a>
        </div>
    </div>
</body>
</html>`;

const RESUME_HTML_CONTENT = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - 인프라·보안 엔지니어</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Inter', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
            min-height: 100vh;
        }

        .resume-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 300px 1fr;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            background: #111827;
            color: #e5e7eb;
            padding: 48px 32px;
        }

        .profile-section {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 32px;
            border-bottom: 1px solid #374151;
        }

        .profile-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #374151;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: white;
            font-weight: 700;
            margin: 0 auto 20px;
        }

        .profile-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
        }

        .profile-title {
            font-size: 0.9rem;
            color: #9ca3af;
        }

        .sidebar-section {
            margin-bottom: 32px;
        }

        .sidebar-title {
            font-size: 0.85rem;
            font-weight: 600;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
        }

        .contact-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            font-size: 0.85rem;
            color: #d1d5db;
        }

        .contact-item a {
            color: #d1d5db;
            text-decoration: none;
        }

        .contact-item a:hover {
            color: #ffffff;
        }

        .skill-tag {
            display: inline-block;
            background: #1f2937;
            color: #d1d5db;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 0.75rem;
            margin: 4px 4px 4px 0;
            border: 1px solid #374151;
        }

        .cert-item {
            margin-bottom: 12px;
        }

        .cert-name {
            font-size: 0.85rem;
            color: #e5e7eb;
            font-weight: 500;
        }

        .cert-date {
            font-size: 0.75rem;
            color: #9ca3af;
        }

        /* Main Content */
        .main-content {
            padding: 48px 56px;
            background: #fafafa;
        }

        .section {
            margin-bottom: 48px;
        }

        .section-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }

        .section-subtitle {
            font-size: 0.95rem;
            color: #6b7280;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        .experience-item {
            margin-bottom: 40px;
            padding-bottom: 32px;
            border-bottom: 1px solid #e5e7eb;
        }

        .experience-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .company {
            font-size: 1.15rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 4px;
        }

        .period {
            font-size: 0.85rem;
            color: #6b7280;
            margin-bottom: 12px;
        }

        .experience-item > p {
            font-size: 0.95rem;
            color: #4b5563;
            margin-bottom: 16px;
            line-height: 1.7;
        }

        .achievement {
            background: #ffffff;
            padding: 16px 20px;
            border-radius: 6px;
            margin: 12px 0;
            border-left: 3px solid #111827;
            font-size: 0.9rem;
            line-height: 1.6;
            color: #374151;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .project-card {
            background: #ffffff;
            border-radius: 6px;
            padding: 24px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }

        .project-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transform: translateY(-2px);
        }

        .project-title {
            font-size: 1.05rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 8px;
        }

        .project-card > p {
            font-size: 0.85rem;
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 12px;
        }

        .project-link {
            display: inline-block;
            font-size: 0.8rem;
            color: #111827;
            text-decoration: none;
            font-weight: 500;
            margin-top: 8px;
        }

        .project-link:hover {
            text-decoration: underline;
        }

        .approach-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .approach-item {
            background: #ffffff;
            padding: 24px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .approach-item h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 12px;
        }

        .approach-item p {
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .resume-container {
                grid-template-columns: 1fr;
            }

            .sidebar {
                padding: 32px 24px;
            }

            .main-content {
                padding: 32px 24px;
            }

            .approach-grid {
                grid-template-columns: 1fr;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 640px) {
            .main-content {
                padding: 24px 16px;
            }

            .section-title {
                font-size: 1.5rem;
            }

            .achievement {
                padding: 12px 16px;
                font-size: 0.85rem;
            }

            .skill-tag {
                font-size: 0.7rem;
                padding: 5px 10px;
            }
        }

        @media print {
            body {
                background: white;
            }

            .resume-container {
                max-width: 100%;
            }

            .sidebar {
                background: #1a1a1a;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="profile-section">
                <div class="profile-img">JC</div>
                <h1 class="profile-name">이재철</h1>
                <p class="profile-title">Infrastructure & Security Engineer</p>
            </div>

            <div class="sidebar-section">
                <h2 class="sidebar-title">Contact</h2>
                <div class="contact-item">
                    <a href="mailto:qws941@kakao.com">qws941@kakao.com</a>
                </div>
                <div class="contact-item">
                    <a href="tel:010-5757-9592">010-5757-9592</a>
                </div>
                <div class="contact-item">
                    <a href="https://github.com/qws941" target="_blank">github.com/qws941</a>
                </div>
                <div class="contact-item">
                    <a href="https://qws941.github.io/resume" target="_blank">Portfolio</a>
                </div>
            </div>

            <div class="sidebar-section">
                <h2 class="sidebar-title">Skills</h2>
                <div>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">Flask</span>
                    <span class="skill-tag">Docker</span>
                    <span class="skill-tag">Kubernetes</span>
                    <span class="skill-tag">AWS</span>
                    <span class="skill-tag">FortiGate</span>
                    <span class="skill-tag">Palo Alto</span>
                    <span class="skill-tag">NAC</span>
                    <span class="skill-tag">DLP</span>
                    <span class="skill-tag">EDR</span>
                    <span class="skill-tag">PostgreSQL</span>
                    <span class="skill-tag">Redis</span>
                    <span class="skill-tag">Ansible</span>
                    <span class="skill-tag">GitOps</span>
                </div>
            </div>

            <div class="sidebar-section">
                <h2 class="sidebar-title">Certifications</h2>
                <div class="cert-item">
                    <div class="cert-name">CCNP</div>
                    <div class="cert-date">2020.08</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">RHCSA</div>
                    <div class="cert-date">2019.01</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">CompTIA Linux+</div>
                    <div class="cert-date">2019.02</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">LPIC Level 1</div>
                    <div class="cert-date">2019.02</div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <section class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p class="section-subtitle">
                    8년간 금융·교육·제조 산업 인프라 운영. 자동화로 일일 5시간 수작업 제거.
                    DDD 아키텍처 기반 엔터프라이즈급 시스템 설계·구축.
                </p>
            </section>

            <section class="section">
                <h2 class="section-title">Work Experience</h2>

                <div class="experience-item">
                    <h3 class="company">㈜아이티센 CTS | 정보보안 운영 엔지니어</h3>
                    <p class="period">2025.03 - 현재</p>
                    <p>넥스트레이드 운영SM (정보보안팀)</p>
                    <div class="achievement">
                        장애율 35% 감소 (월 8건 → 5건)
                    </div>
                    <div class="achievement">
                        보안 이벤트 대응시간 40% 단축 (45분 → 27분)
                    </div>
                    <div class="achievement">
                        금융감독원 감사 지적사항 0건 (2회 연속)
                    </div>
                    <div class="achievement">
                        보안 정책 오탐률 50% 감소 (일 200건 → 100건)
                    </div>
                </div>

                <div class="experience-item">
                    <h3 class="company">㈜가온누리정보시스템 | 프리랜서 인프라 엔지니어</h3>
                    <p class="period">2024.03 - 2025.02</p>
                    <p>넥스트레이드(다자간매매체결회사) 구축 프로젝트</p>
                    <div class="achievement">
                        Python 방화벽 정책 자동화, 작업시간 50% 단축 (8시간 → 4시간)
                    </div>
                    <div class="achievement">
                        EPP/DLP 에이전트 충돌 해결, CPU 사용률 30% 개선 (60% → 42%)
                    </div>
                    <div class="achievement">
                        내부정보 유출사고 0건 유지 (12개월)
                    </div>
                </div>

                <div class="experience-item">
                    <h3 class="company">㈜콴텍투자일임 | 인프라·정보보호팀 인프라 엔지니어</h3>
                    <p class="period">2022.08 - 2024.03</p>
                    <p>AI 기반 주식투자 서비스 - FSDC 운영</p>
                    <div class="achievement">
                        Python 자동화로 장애율 40% 감소 (월 10건 → 6건)
                    </div>
                    <div class="achievement">
                        금융감독원 감사 통과, 개인정보 유출사고 0건 (19개월)
                    </div>
                    <div class="achievement">
                        DB 접근제어 쿼리 튜닝, CPU 사용률 30% 개선 (75% → 52%)
                    </div>
                </div>

                <div class="experience-item">
                    <h3 class="company">㈜메타넷엠플랫폼 | 인프라·시스템 엔지니어</h3>
                    <p class="period">2019.12 - 2021.08</p>
                    <p>1,000명 규모 재택근무 환경 구축</p>
                    <div class="achievement">
                        Python 스위치 점검 자동화, 주당 75% 단축 (8시간 → 2시간)
                    </div>
                    <div class="achievement">
                        백신-VPN 충돌 해결, 장애 문의 40% 감소 (주 20건 → 12건)
                    </div>
                    <div class="achievement">
                        Ansible NAC 정책 자동배포, 처리시간 90% 단축 (30분 → 3분)
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">Personal Projects</h2>
                <div class="projects-grid">
                    <div class="project-card">
                        <h3 class="project-title">Splunk-FortiNet Integration</h3>
                        <p><strong>Tech:</strong> Node.js, Cloudflare Workers, DDD</p>
                        <p>80대 방화벽 중앙관리, 초당 10만 이벤트 처리</p>
                        <a href="https://splunk.jclee.me" target="_blank" class="project-link">View Project →</a>
                    </div>

                    <div class="project-card">
                        <h3 class="project-title">SafeWork Industrial Health</h3>
                        <p><strong>Tech:</strong> Flask, PostgreSQL, Cloudflare Workers</p>
                        <p>산업보건 SaaS, Edge API 전국 동시접속</p>
                        <a href="https://safework.jclee.me" target="_blank" class="project-link">View Project →</a>
                    </div>

                    <div class="project-card">
                        <h3 class="project-title">REGTECH Threat Intelligence</h3>
                        <p><strong>Tech:</strong> Flask, PostgreSQL, Portainer, Claude AI</p>
                        <p>금융보안원 위협정보 자동수집, AI 워크플로우 5개</p>
                        <a href="https://blacklist.jclee.me" target="_blank" class="project-link">View Project →</a>
                    </div>

                    <div class="project-card">
                        <h3 class="project-title">FortiGate Policy Orchestration</h3>
                        <p><strong>Tech:</strong> Flask, FortiManager API, GitHub Actions</p>
                        <p>방화벽 정책 자동배포, 3-tier HA 무중단</p>
                        <a href="https://fortinet.jclee.me" target="_blank" class="project-link">View Project →</a>
                    </div>

                    <div class="project-card">
                        <h3 class="project-title">Full-Stack Observability</h3>
                        <p><strong>Tech:</strong> Grafana, Prometheus, Loki, Tempo</p>
                        <p>13개 서비스 통합, 30일 보관, 15개 타겟 수집</p>
                        <a href="https://grafana.jclee.me" target="_blank" class="project-link">View Project →</a>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">Work Philosophy</h2>
                <div class="approach-grid">
                    <div class="approach-item">
                        <h3>문제 해결 지향</h3>
                        <p>불편함 발견, 자동화로 근본 해결</p>
                    </div>
                    <div class="approach-item">
                        <h3>실무 중심 기술</h3>
                        <p>현업 적용 가능성 우선 학습</p>
                    </div>
                    <div class="approach-item">
                        <h3>지속적 운영</h3>
                        <p>실제 운영, 피드백 수집, 개선</p>
                    </div>
                    <div class="approach-item">
                        <h3>팀 효율성</h3>
                        <p>팀 전체 생산성 향상</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle /resume path
    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML_CONTENT, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Handle root path
    if (url.pathname === '/') {
      return new Response(HTML_CONTENT, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // 404 for other paths
    return new Response('Not Found', { status: 404 });
  },
};