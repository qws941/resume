// Cloudflare Worker - Auto-generated
const INDEX_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - Infrastructure & Security Engineer</title>

    <!-- SEO -->
    <meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어. 복잡한 인프라를 단순하게, 반복 업무를 자동화로.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://resume.jclee.me">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --color-black: #000000;
            --color-white: #ffffff;
            --color-gray-50: #fafafa;
            --color-gray-100: #f5f5f5;
            --color-gray-200: #e5e5e5;
            --color-gray-300: #d4d4d4;
            --color-gray-400: #a3a3a3;
            --color-gray-500: #737373;
            --color-gray-600: #525252;
            --color-gray-700: #404040;
            --color-gray-800: #262626;
            --color-gray-900: #171717;

            --color-cyan: #06b6d4;
            --color-cyan-dark: #0891b2;
            --color-violet: #8b5cf6;
            --color-violet-dark: #7c3aed;

            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

            --shadow-brutal: 6px 6px 0 var(--color-black);
            --shadow-brutal-lg: 10px 10px 0 var(--color-black);

            --border-width: 3px;
            --border-radius: 0;

            --transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: var(--font-sans);
            line-height: 1.5;
            color: var(--color-black);
            background: var(--color-white);
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }

        /* Container */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--color-white);
            border-bottom: var(--border-width) solid var(--color-black);
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: 900;
            color: var(--color-black);
            text-decoration: none;
            letter-spacing: -0.05em;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-link {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-black);
            text-decoration: none;
            transition: var(--transition);
            padding: 0.5rem 1rem;
        }

        .nav-link:hover {
            color: var(--color-cyan);
        }

        /* Hero */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 8rem 0 4rem;
            position: relative;
        }

        .hero-content {
            max-width: 900px;
        }

        .hero-badge {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: var(--color-cyan);
            color: var(--color-white);
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border: var(--border-width) solid var(--color-black);
            box-shadow: var(--shadow-brutal);
            margin-bottom: 3rem;
        }

        .hero-title {
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.04em;
            margin-bottom: 2rem;
        }

        .hero-subtitle {
            font-size: clamp(1.25rem, 3vw, 2rem);
            font-weight: 400;
            color: var(--color-gray-600);
            margin-bottom: 3rem;
            line-height: 1.4;
        }

        .hero-cta {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.25rem 2.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            border: var(--border-width) solid var(--color-black);
            transition: var(--transition);
            cursor: pointer;
            white-space: nowrap;
        }

        .btn-primary {
            background: var(--color-black);
            color: var(--color-white);
            box-shadow: var(--shadow-brutal);
        }

        .btn-primary:hover {
            transform: translate(6px, 6px);
            box-shadow: none;
        }

        .btn-secondary {
            background: var(--color-white);
            color: var(--color-black);
            box-shadow: var(--shadow-brutal);
        }

        .btn-secondary:hover {
            transform: translate(6px, 6px);
            box-shadow: none;
        }

        /* Section */
        .section {
            padding: 6rem 0;
        }

        .section-header {
            margin-bottom: 4rem;
        }

        .section-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--color-gray-100);
            border: var(--border-width) solid var(--color-black);
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1.5rem;
        }

        .section-title {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: 1.5rem;
        }

        .section-description {
            font-size: 1.25rem;
            color: var(--color-gray-600);
            max-width: 700px;
        }

        /* Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .stat-card {
            padding: 3rem 2rem;
            background: var(--color-white);
            border: var(--border-width) solid var(--color-black);
            box-shadow: var(--shadow-brutal);
            transition: var(--transition);
        }

        .stat-card:hover {
            transform: translate(-6px, -6px);
            box-shadow: var(--shadow-brutal-lg);
        }

        .stat-number {
            font-size: 4rem;
            font-weight: 900;
            line-height: 1;
            color: var(--color-cyan);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--color-black);
        }

        /* Projects */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 2.5rem;
        }

        .project-card {
            background: var(--color-white);
            border: var(--border-width) solid var(--color-black);
            overflow: hidden;
            transition: var(--transition);
        }

        .project-card:hover {
            transform: translate(-10px, -10px);
            box-shadow: var(--shadow-brutal-lg);
        }

        .project-header {
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            border-bottom: var(--border-width) solid var(--color-black);
        }

        .project-card:nth-child(1) .project-header {
            background: #fef3c7;
        }

        .project-card:nth-child(2) .project-header {
            background: #ddd6fe;
        }

        .project-card:nth-child(3) .project-header {
            background: #ccfbf1;
        }

        .project-card:nth-child(4) .project-header {
            background: #fecaca;
        }

        .project-card:nth-child(5) .project-header {
            background: #bfdbfe;
        }

        .project-body {
            padding: 2rem;
        }

        .project-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 0.75rem;
        }

        .project-tech {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-gray-600);
            margin-bottom: 1rem;
        }

        .project-description {
            font-size: 1rem;
            color: var(--color-gray-600);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .project-links {
            display: flex;
            gap: 1rem;
        }

        .project-link {
            flex: 1;
            padding: 0.875rem;
            text-align: center;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 700;
            border: var(--border-width) solid var(--color-black);
            transition: var(--transition);
        }

        .project-link-primary {
            background: var(--color-black);
            color: var(--color-white);
        }

        .project-link-primary:hover {
            background: var(--color-cyan);
        }

        .project-link-secondary {
            background: var(--color-white);
            color: var(--color-black);
        }

        .project-link-secondary:hover {
            background: var(--color-gray-100);
        }

        /* Contact */
        .contact-card {
            background: var(--color-black);
            color: var(--color-white);
            padding: 4rem;
            border: var(--border-width) solid var(--color-black);
            box-shadow: var(--shadow-brutal);
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .contact-item {
            padding: 2rem;
            background: var(--color-gray-900);
            border: 2px solid var(--color-gray-800);
        }

        .contact-label {
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-gray-400);
            margin-bottom: 0.5rem;
        }

        .contact-value {
            font-size: 1.125rem;
            font-weight: 600;
        }

        .contact-value a {
            color: var(--color-white);
            text-decoration: none;
        }

        .contact-value a:hover {
            color: var(--color-cyan);
        }

        /* Footer */
        .footer {
            padding: 3rem 0;
            border-top: var(--border-width) solid var(--color-black);
            text-align: center;
        }

        .footer-text {
            font-size: 1rem;
            color: var(--color-gray-600);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 0 1.5rem;
            }

            .nav-container {
                padding: 1rem 1.5rem;
            }

            .nav-links {
                gap: 1rem;
            }

            .nav-link {
                font-size: 0.875rem;
                padding: 0.5rem;
            }

            .hero {
                padding: 6rem 0 3rem;
            }

            .hero-badge {
                font-size: 0.75rem;
                padding: 0.625rem 1.25rem;
                margin-bottom: 2rem;
            }

            .hero-cta {
                flex-direction: column;
            }

            .btn {
                width: 100%;
                justify-content: center;
                padding: 1rem 2rem;
                font-size: 1rem;
            }

            .section {
                padding: 4rem 0;
            }

            .section-header {
                margin-bottom: 3rem;
            }

            .stats-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .stat-card {
                padding: 2rem 1.5rem;
            }

            .stat-number {
                font-size: 3rem;
            }

            .projects-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .project-header {
                height: 150px;
                font-size: 3rem;
            }

            .project-body {
                padding: 1.5rem;
            }

            .project-links {
                flex-direction: column;
            }

            .contact-card {
                padding: 2.5rem 1.5rem;
            }

            .contact-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .contact-item {
                padding: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .hero-title {
                font-size: 2.5rem;
            }

            .hero-subtitle {
                font-size: 1.125rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .section-description {
                font-size: 1rem;
            }

            .stat-number {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-container">
            <a href="#" class="nav-logo">JC LEE</a>
            <div class="nav-links">
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#contact" class="nav-link">Contact</a>
                <a href="resume.html" class="nav-link">Resume</a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">Infrastructure & Security Engineer</div>
                <h1 class="hero-title">
                    복잡한 인프라를<br>
                    단순하게.
                </h1>
                <p class="hero-subtitle">
                    8년 8개월 경력. 15종 이상 보안 솔루션 운영. 업무 자동화로 50~95% 시간 단축.
                    프로덕션 시스템 99.9% 가용성 달성.
                </p>
                <div class="hero-cta">
                    <a href="#projects" class="btn btn-primary">
                        <span>프로젝트 보기</span>
                        <span>→</span>
                    </a>
                    <a href="resume.html" class="btn btn-secondary">
                        <span>이력서 다운로드</span>
                        <span>↓</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="section">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">8.8+</div>
                    <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Security Solutions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">50~95%</div>
                    <div class="stat-label">Time Saved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">99.9%</div>
                    <div class="stat-label">Uptime Achieved</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section class="section" id="projects">
        <div class="container">
            <div class="section-header">
                <div class="section-badge">Portfolio</div>
                <h2 class="section-title">Production Projects</h2>
                <p class="section-description">
                    실제 운영 중인 프로덕션 시스템. 모든 프로젝트는 실시간 모니터링 및 자동화된 CI/CD를 통해 관리됩니다.
                </p>
            </div>

            <div class="projects-grid">
                <!-- Project 1 -->
                <div class="project-card">
                    <div class="project-header">🔥</div>
                    <div class="project-body">
                        <h3 class="project-title">Splunk-FortiNet Integration</h3>
                        <div class="project-tech">Node.js · Cloudflare Workers · DDD</div>
                        <p class="project-description">
                            80대 방화벽 중앙관리, 초당 10만 이벤트 처리, DDD Level 3 아키텍처 기반 엔터프라이즈급 시스템
                        </p>
                        <div class="project-links">
                            <a href="https://splunk.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/splunk" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Project 2 -->
                <div class="project-card">
                    <div class="project-header">🏭</div>
                    <div class="project-body">
                        <h3 class="project-title">SafeWork Industrial Health</h3>
                        <div class="project-tech">Flask · PostgreSQL · Cloudflare Workers</div>
                        <p class="project-description">
                            산업보건 SaaS, Edge API 전국 동시접속 지원, 집계 오류 100% 제거, 실시간 대시보드
                        </p>
                        <div class="project-links">
                            <a href="https://safework.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/safework" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Project 3 -->
                <div class="project-card">
                    <div class="project-header">🛡️</div>
                    <div class="project-body">
                        <h3 class="project-title">REGTECH Threat Intelligence</h3>
                        <div class="project-tech">Flask · PostgreSQL · Claude AI</div>
                        <p class="project-description">
                            금융보안원 위협정보 자동수집, 95% 시간 단축, AI 기반 CI/CD, Portainer API 자동배포
                        </p>
                        <div class="project-links">
                            <a href="https://blacklist.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Project 4 -->
                <div class="project-card">
                    <div class="project-header">🚀</div>
                    <div class="project-body">
                        <h3 class="project-title">FortiGate Policy Orchestration</h3>
                        <div class="project-tech">Flask · FortiManager API · GitHub Actions</div>
                        <p class="project-description">
                            방화벽 정책 자동배포, 3-tier HA 무중단, 80% 시간 단축, RESTful API 기반 오케스트레이션
                        </p>
                        <div class="project-links">
                            <a href="https://fortinet.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Project 5 -->
                <div class="project-card">
                    <div class="project-header">📊</div>
                    <div class="project-body">
                        <h3 class="project-title">Full-Stack Observability</h3>
                        <div class="project-tech">Grafana · Prometheus · Loki · Tempo</div>
                        <p class="project-description">
                            13개 서비스 통합 모니터링, 메트릭·로그·트레이스 단일화, 30일 보관, 실시간 알림
                        </p>
                        <div class="project-links">
                            <a href="https://grafana.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/grafana" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
        <div class="container">
            <div class="section-header">
                <div class="section-badge">Get In Touch</div>
                <h2 class="section-title">Let's Work Together</h2>
                <p class="section-description">
                    인프라 자동화, 보안 아키텍처, DevOps 전환에 대해 논의하고 싶으신가요? 연락주세요.
                </p>
            </div>

            <div class="contact-card">
                <div class="contact-grid">
                    <div class="contact-item">
                        <div class="contact-label">Email</div>
                        <div class="contact-value">
                            <a href="mailto:qws941@kakao.com">qws941@kakao.com</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">Phone</div>
                        <div class="contact-value">
                            <a href="tel:010-5757-9592">010-5757-9592</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">GitHub</div>
                        <div class="contact-value">
                            <a href="https://github.com/qws941" target="_blank">github.com/qws941</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">Website</div>
                        <div class="contact-value">
                            <a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p class="footer-text">© 2025 Jaecheol Lee. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Nav scroll effect
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                nav.style.boxShadow = 'var(--shadow-brutal)';
            } else {
                nav.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    </script>
</body>
</html>
`;
const RESUME_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - 이력서 | Infrastructure & Security Engineer</title>

    <!-- SEO -->
    <meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어 이재철의 상세 이력서. 금융·교육·제조 산업 프로덕션 운영 경험.">
    <meta name="robots" content="index, follow">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --color-black: #000000;
            --color-white: #ffffff;
            --color-gray-50: #fafafa;
            --color-gray-100: #f5f5f5;
            --color-gray-200: #e5e5e5;
            --color-gray-600: #525252;
            --color-gray-900: #171717;
            --color-cyan: #06b6d4;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            --shadow-brutal: 6px 6px 0 var(--color-black);
            --border-width: 3px;
            --transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
            font-family: var(--font-sans);
            line-height: 1.5;
            color: var(--color-black);
            background: var(--color-white);
            -webkit-font-smoothing: antialiased;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--color-white);
            border-bottom: var(--border-width) solid var(--color-black);
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: 900;
            color: var(--color-black);
            text-decoration: none;
        }

        .nav-back {
            padding: 0.75rem 1.5rem;
            background: var(--color-black);
            color: var(--color-white);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 700;
            border: var(--border-width) solid var(--color-black);
            box-shadow: var(--shadow-brutal);
            transition: var(--transition);
        }

        .nav-back:hover {
            transform: translate(6px, 6px);
            box-shadow: none;
        }

        /* Container */
        .resume-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 120px 2rem 4rem;
        }

        /* Header */
        .resume-header {
            background: var(--color-cyan);
            border: var(--border-width) solid var(--color-black);
            box-shadow: var(--shadow-brutal);
            padding: 4rem 3rem;
            margin-bottom: 3rem;
        }

        .resume-name {
            font-size: 4rem;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 1rem;
        }

        .resume-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }

        .resume-contact {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            font-size: 0.95rem;
            font-weight: 600;
        }

        .contact-item a {
            color: var(--color-black);
            text-decoration: none;
        }

        .contact-item a:hover {
            text-decoration: underline;
        }

        /* Section */
        .section {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 2rem;
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: var(--color-black);
            color: var(--color-white);
            border: var(--border-width) solid var(--color-black);
        }

        /* Summary */
        .summary-text {
            font-size: 1.125rem;
            line-height: 1.7;
            padding: 2rem;
            background: var(--color-gray-100);
            border: var(--border-width) solid var(--color-black);
            border-left: 8px solid var(--color-black);
        }

        /* Experience */
        .experience-item {
            background: var(--color-white);
            border: var(--border-width) solid var(--color-black);
            padding: 2.5rem;
            margin-bottom: 2rem;
            transition: var(--transition);
        }

        .experience-item:hover {
            transform: translate(-6px, -6px);
            box-shadow: var(--shadow-brutal);
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .company-name {
            font-size: 1.5rem;
            font-weight: 900;
        }

        .period {
            font-size: 0.875rem;
            font-weight: 700;
            padding: 0.5rem 1rem;
            background: var(--color-black);
            color: var(--color-white);
        }

        .role {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-gray-600);
            margin-bottom: 1.5rem;
        }

        .achievement {
            background: var(--color-gray-50);
            border-left: 4px solid var(--color-cyan);
            padding: 1rem 1.5rem;
            margin: 0.75rem 0;
            font-size: 0.95rem;
            font-weight: 500;
            line-height: 1.6;
        }

        /* Projects */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: var(--color-white);
            border: var(--border-width) solid var(--color-black);
            padding: 2rem;
            transition: var(--transition);
        }

        .project-card:hover {
            transform: translate(-6px, -6px);
            box-shadow: var(--shadow-brutal);
        }

        .project-name {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .project-tech {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--color-cyan);
            margin-bottom: 1rem;
        }

        .project-description {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--color-gray-600);
            margin-bottom: 1.5rem;
        }

        .project-links {
            display: flex;
            gap: 1rem;
        }

        .project-link {
            flex: 1;
            padding: 0.75rem;
            text-align: center;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 700;
            border: var(--border-width) solid var(--color-black);
            transition: var(--transition);
        }

        .project-link:first-child {
            background: var(--color-black);
            color: var(--color-white);
        }

        .project-link:first-child:hover {
            background: var(--color-cyan);
        }

        .project-link:last-child {
            background: var(--color-white);
            color: var(--color-black);
        }

        .project-link:last-child:hover {
            background: var(--color-gray-100);
        }

        /* Skills */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
        }

        .skill-category {
            background: var(--color-white);
            border: var(--border-width) solid var(--color-black);
            padding: 2rem;
        }

        .skill-category-title {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .skill-tag {
            padding: 0.5rem 1rem;
            background: var(--color-gray-100);
            font-size: 0.875rem;
            font-weight: 600;
            border: 2px solid var(--color-black);
            transition: var(--transition);
            cursor: pointer;
        }

        .skill-tag:hover {
            background: var(--color-black);
            color: var(--color-white);
            transform: translateY(-2px);
        }

        /* Certifications */
        .cert-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.5rem;
        }

        .cert-item {
            background: var(--color-gray-100);
            border: var(--border-width) solid var(--color-black);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: var(--transition);
        }

        .cert-item:hover {
            background: var(--color-black);
            color: var(--color-white);
        }

        .cert-name {
            font-weight: 700;
        }

        .cert-date {
            font-size: 0.875rem;
            font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .resume-container {
                padding: 100px 1.5rem 3rem;
            }

            .nav-container {
                padding: 1rem 1.5rem;
            }

            .resume-header {
                padding: 2.5rem 2rem;
            }

            .resume-name {
                font-size: 2.5rem;
            }

            .resume-title {
                font-size: 1.125rem;
            }

            .resume-contact {
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }

            .section-title {
                font-size: 1.5rem;
            }

            .experience-header {
                flex-direction: column;
                gap: 0.5rem;
            }

            .company-name {
                font-size: 1.25rem;
            }

            .projects-grid,
            .skills-grid {
                grid-template-columns: 1fr;
            }

            .cert-grid {
                grid-template-columns: 1fr;
            }
        }

        @media print {
            .nav {
                display: none;
            }

            .resume-container {
                padding-top: 0;
            }

            .experience-item,
            .project-card,
            .skill-category {
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">JC LEE</a>
            <a href="index.html" class="nav-back">← Back</a>
        </div>
    </nav>

    <!-- Resume Container -->
    <div class="resume-container">
        <!-- Header -->
        <header class="resume-header">
            <h1 class="resume-name">이재철 (Jaecheol Lee)</h1>
            <p class="resume-title">Infrastructure & Security Engineer</p>
            <div class="resume-contact">
                <div class="contact-item">📧 <a href="mailto:qws941@kakao.com">qws941@kakao.com</a></div>
                <div class="contact-item">📱 <a href="tel:010-5757-9592">010-5757-9592</a></div>
                <div class="contact-item">💼 <a href="https://github.com/qws941" target="_blank">github.com/qws941</a></div>
                <div class="contact-item">🌐 <a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a></div>
            </div>
        </header>

        <!-- Summary -->
        <section class="section">
            <h2 class="section-title">Summary</h2>
            <div class="summary-text">
                8년 8개월간 금융·교육·제조 산업에서 인프라·보안 운영. 자동화로 일일 5시간 수작업 제거, DDD 아키텍처 기반 엔터프라이즈급 시스템 설계·구축.
                15종 이상 보안 솔루션 통합 운영 및 프로덕션 시스템 99.9% 가용성 달성.
            </div>
        </section>

        <!-- Experience -->
        <section class="section">
            <h2 class="section-title">Experience</h2>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜아이티센 CTS</h3>
                    <span class="period">2025.03 - 현재</span>
                </div>
                <p class="role">정보보안 운영 엔지니어 | 넥스트레이드 운영SM (정보보안팀)</p>
                <div class="achievement">⚡ 보안 이벤트 대응시간 40% 단축 (45분 → 27분)</div>
                <div class="achievement">🛡️ 금융감독원 감사 지적사항 0건 (2회 연속)</div>
                <div class="achievement">📊 보안 정책 오탐률 50% 감소 (일 200건 → 100건)</div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜가온누리정보시스템</h3>
                    <span class="period">2024.03 - 2025.02</span>
                </div>
                <p class="role">프리랜서 인프라 엔지니어 | 넥스트레이드 구축 프로젝트</p>
                <div class="achievement">🔥 Python 방화벽 정책 자동화, 작업시간 50% 단축 (8시간 → 4시간)</div>
                <div class="achievement">🖥️ EPP/DLP 에이전트 충돌 해결, CPU 사용률 30% 개선 (60% → 42%)</div>
                <div class="achievement">🔒 내부정보 유출사고 0건 유지 (12개월)</div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜콴텍투자일임</h3>
                    <span class="period">2022.08 - 2024.03</span>
                </div>
                <p class="role">인프라·정보보호팀 인프라 엔지니어 | AI 기반 주식투자 서비스 FSDC 운영</p>
                <div class="achievement">🏦 금융감독원 감사 통과, 개인정보 유출사고 0건 (19개월)</div>
                <div class="achievement">📈 DB 접근제어 쿼리 튜닝, CPU 사용률 30% 개선 (75% → 52%)</div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜메타넷엠플랫폼</h3>
                    <span class="period">2019.12 - 2021.08</span>
                </div>
                <p class="role">인프라·시스템 엔지니어 | 1,000명 규모 재택근무 환경 구축</p>
                <div class="achievement">🐍 Python 스위치 점검 자동화, 주당 75% 단축 (8시간 → 2시간)</div>
                <div class="achievement">⚙️ Ansible NAC 정책 자동배포, 처리시간 90% 단축 (30분 → 3분)</div>
            </div>
        </section>

        <!-- Projects -->
        <section class="section">
            <h2 class="section-title">Projects</h2>

            <div class="projects-grid">
                <div class="project-card">
                    <h3 class="project-name">Splunk-FortiNet Integration</h3>
                    <div class="project-tech">Node.js · Cloudflare Workers · DDD</div>
                    <p class="project-description">
                        80대 방화벽 중앙관리, 초당 10만 이벤트 처리, DDD Level 3 아키텍처
                    </p>
                    <div class="project-links">
                        <a href="https://splunk.jclee.me" target="_blank" class="project-link">Live</a>
                        <a href="https://github.com/qws941/splunk" target="_blank" class="project-link">Code</a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">SafeWork Industrial Health</h3>
                    <div class="project-tech">Flask · PostgreSQL · Cloudflare Workers</div>
                    <p class="project-description">
                        산업보건 SaaS, Edge API 전국 동시접속, 집계 오류 100% 제거
                    </p>
                    <div class="project-links">
                        <a href="https://safework.jclee.me" target="_blank" class="project-link">Live</a>
                        <a href="https://github.com/qws941/safework" target="_blank" class="project-link">Code</a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">REGTECH Threat Intelligence</h3>
                    <div class="project-tech">Flask · PostgreSQL · Claude AI</div>
                    <p class="project-description">
                        금융보안원 위협정보 자동수집, 95% 시간 단축, AI CI/CD
                    </p>
                    <div class="project-links">
                        <a href="https://blacklist.jclee.me" target="_blank" class="project-link">Live</a>
                        <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link">Code</a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">FortiGate Policy Orchestration</h3>
                    <div class="project-tech">Flask · FortiManager API · GitHub Actions</div>
                    <p class="project-description">
                        방화벽 정책 자동배포, 3-tier HA 무중단, 80% 시간 단축
                    </p>
                    <div class="project-links">
                        <a href="https://fortinet.jclee.me" target="_blank" class="project-link">Live</a>
                        <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link">Code</a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">Full-Stack Observability</h3>
                    <div class="project-tech">Grafana · Prometheus · Loki · Tempo</div>
                    <p class="project-description">
                        13개 서비스 통합, 메트릭·로그·트레이스 단일화, 30일 보관
                    </p>
                    <div class="project-links">
                        <a href="https://grafana.jclee.me" target="_blank" class="project-link">Live</a>
                        <a href="https://github.com/qws941/grafana" target="_blank" class="project-link">Code</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills -->
        <section class="section">
            <h2 class="section-title">Skills</h2>

            <div class="skills-grid">
                <div class="skill-category">
                    <h3 class="skill-category-title">🛡️ Security Solutions</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">FortiGate</span>
                        <span class="skill-tag">Palo Alto</span>
                        <span class="skill-tag">NAC</span>
                        <span class="skill-tag">DLP</span>
                        <span class="skill-tag">EDR/EPP</span>
                        <span class="skill-tag">APT</span>
                        <span class="skill-tag">WAF</span>
                        <span class="skill-tag">IPS/IDS</span>
                        <span class="skill-tag">SIEM</span>
                        <span class="skill-tag">Splunk</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3 class="skill-category-title">☁️ Cloud & Virtualization</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">Docker</span>
                        <span class="skill-tag">Kubernetes</span>
                        <span class="skill-tag">VMware vSphere</span>
                        <span class="skill-tag">NSX-T</span>
                        <span class="skill-tag">Portainer</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3 class="skill-category-title">⚙️ Automation & Development</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Node.js</span>
                        <span class="skill-tag">Shell Script</span>
                        <span class="skill-tag">Ansible</span>
                        <span class="skill-tag">Terraform</span>
                        <span class="skill-tag">GitHub Actions</span>
                        <span class="skill-tag">GitLab CI</span>
                    </div>
                </div>

                <div class="skill-category">
                    <h3 class="skill-category-title">📊 Monitoring & Observability</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Grafana</span>
                        <span class="skill-tag">Prometheus</span>
                        <span class="skill-tag">Loki</span>
                        <span class="skill-tag">Tempo</span>
                        <span class="skill-tag">ELK Stack</span>
                        <span class="skill-tag">Wazuh</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Certifications -->
        <section class="section">
            <h2 class="section-title">Certifications</h2>

            <div class="cert-grid">
                <div class="cert-item">
                    <span class="cert-name">CCNP</span>
                    <span class="cert-date">2020.08</span>
                </div>
                <div class="cert-item">
                    <span class="cert-name">RHCSA</span>
                    <span class="cert-date">2019.01</span>
                </div>
                <div class="cert-item">
                    <span class="cert-name">CompTIA Linux+</span>
                    <span class="cert-date">2019.02</span>
                </div>
                <div class="cert-item">
                    <span class="cert-name">LPIC Level 1</span>
                    <span class="cert-date">2019.02</span>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
`;

// Security headers
const SECURITY_HEADERS = {
  'Content-Type': 'text/html;charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'",
};

// Route mapping for scalability
const ROUTES = {
  '/': INDEX_HTML,
  '/resume': RESUME_HTML,
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const content = ROUTES[url.pathname] || INDEX_HTML;

    return new Response(content, {
      headers: SECURITY_HEADERS,
    });
  },
};
