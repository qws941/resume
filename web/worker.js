// Cloudflare Worker - Auto-generated
const INDEX_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - Infrastructure & Security Engineer | 프리미엄 포트폴리오</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어 이재철의 프리미엄 포트폴리오. 15종 이상 보안 솔루션 운영, 업무 자동화 50~95% 시간 단축, 프로덕션 시스템 99.9% 가용성 달성.">
    <meta name="keywords" content="인프라 엔지니어, 보안 엔지니어, DevOps, 클라우드, Docker, Kubernetes, Python, 자동화, 포트폴리오">
    <meta name="author" content="이재철 (Jaecheol Lee)">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="이재철 - Infrastructure & Security Engineer">
    <meta property="og:description" content="8년 8개월 경력 인프라·보안 엔지니어. 복잡한 인프라를 단순하게, 반복 업무를 자동화로.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://resume.jclee.me">
    <meta property="og:site_name" content="이재철 포트폴리오">
    <meta property="og:locale" content="ko_KR">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="이재철 - Infrastructure & Security Engineer">
    <meta name="twitter:description" content="8년 8개월 경력 인프라·보안 엔지니어. 복잡한 인프라를 단순하게, 반복 업무를 자동화로.">
    <meta name="twitter:site" content="@jclee">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://resume.jclee.me">

    <!-- Performance Optimization: Resource Hints -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="dns-prefetch" href="https://grafana.jclee.me">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Premium Color System */
            --color-primary-50: #faf5ff;
            --color-primary-100: #f3e8ff;
            --color-primary-200: #e9d5ff;
            --color-primary-300: #d8b4fe;
            --color-primary-400: #c084fc;
            --color-primary-500: #a855f7;
            --color-primary-600: #9333ea;
            --color-primary-700: #7e22ce;
            --color-primary-800: #6b21a8;
            --color-primary-900: #581c87;

            --color-secondary-50: #eff6ff;
            --color-secondary-100: #dbeafe;
            --color-secondary-200: #bfdbfe;
            --color-secondary-300: #93c5fd;
            --color-secondary-400: #60a5fa;
            --color-secondary-500: #3b82f6;
            --color-secondary-600: #2563eb;
            --color-secondary-700: #1d4ed8;
            --color-secondary-800: #1e40af;
            --color-secondary-900: #1e3a8a;

            --color-accent-gold: #f59e0b;
            --color-accent-rose: #f43f5e;
            --color-accent-emerald: #10b981;

            /* Neutral Colors */
            --color-gray-50: #fafafa;
            --color-gray-100: #f4f4f5;
            --color-gray-200: #e4e4e7;
            --color-gray-300: #d4d4d8;
            --color-gray-400: #a1a1aa;
            --color-gray-500: #71717a;
            --color-gray-600: #52525b;
            --color-gray-700: #3f3f46;
            --color-gray-800: #27272a;
            --color-gray-900: #18181b;

            /* Semantic Colors */
            --bg-primary: #ffffff;
            --bg-secondary: #fafafa;
            --bg-tertiary: #f4f4f5;
            --text-primary: #18181b;
            --text-secondary: #52525b;
            --text-tertiary: #71717a;

            /* Gradients */
            --gradient-primary: linear-gradient(135deg, #a855f7 0%, #7e22ce 50%, #3b82f6 100%);
            --gradient-secondary: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
            --gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            --gradient-hero: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);

            /* Shadows */
            --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
            --shadow-sm: 0 2px 4px rgba(0,0,0,0.06);
            --shadow-md: 0 4px 8px rgba(0,0,0,0.08);
            --shadow-lg: 0 8px 16px rgba(0,0,0,0.10);
            --shadow-xl: 0 12px 24px rgba(0,0,0,0.12);
            --shadow-2xl: 0 20px 40px rgba(0,0,0,0.15);
            --shadow-primary: 0 8px 24px rgba(168, 85, 247, 0.3);
            --shadow-secondary: 0 8px 24px rgba(59, 130, 246, 0.3);

            /* Typography Scale */
            --font-display: 'Playfair Display', serif;
            --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;

            --text-xs: 0.75rem;      /* 12px */
            --text-sm: 0.875rem;     /* 14px */
            --text-base: 1rem;       /* 16px */
            --text-lg: 1.125rem;     /* 18px */
            --text-xl: 1.25rem;      /* 20px */
            --text-2xl: 1.5rem;      /* 24px */
            --text-3xl: 1.875rem;    /* 30px */
            --text-4xl: 2.25rem;     /* 36px */
            --text-5xl: 3rem;        /* 48px */
            --text-6xl: 3.75rem;     /* 60px */
            --text-7xl: 4.5rem;      /* 72px */
            --text-8xl: 6rem;        /* 96px */

            /* Spacing Scale */
            --space-1: 0.25rem;   /* 4px */
            --space-2: 0.5rem;    /* 8px */
            --space-3: 0.75rem;   /* 12px */
            --space-4: 1rem;      /* 16px */
            --space-5: 1.25rem;   /* 20px */
            --space-6: 1.5rem;    /* 24px */
            --space-8: 2rem;      /* 32px */
            --space-10: 2.5rem;   /* 40px */
            --space-12: 3rem;     /* 48px */
            --space-16: 4rem;     /* 64px */
            --space-20: 5rem;     /* 80px */
            --space-24: 6rem;     /* 96px */
            --space-32: 8rem;     /* 128px */

            /* Border Radius */
            --radius-sm: 0.375rem;   /* 6px */
            --radius-md: 0.5rem;     /* 8px */
            --radius-lg: 0.75rem;    /* 12px */
            --radius-xl: 1rem;       /* 16px */
            --radius-2xl: 1.5rem;    /* 24px */
            --radius-full: 9999px;

            /* Transitions */
            --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] {
            --bg-primary: #18181b;
            --bg-secondary: #27272a;
            --bg-tertiary: #3f3f46;
            --text-primary: #fafafa;
            --text-secondary: #d4d4d8;
            --text-tertiary: #a1a1aa;
        }

        body {
            font-family: var(--font-body);
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            font-size: var(--text-base);
            font-weight: 400;
            letter-spacing: -0.011em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--color-gray-200);
            transition: all var(--transition-base);
        }

        .nav.scrolled {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: var(--shadow-sm);
        }

        .nav-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: var(--space-4) var(--space-6);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-logo {
            font-family: var(--font-display);
            font-size: var(--text-xl);
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: var(--space-8);
            align-items: center;
        }

        .nav-link {
            font-size: var(--text-sm);
            font-weight: 500;
            color: var(--text-secondary);
            text-decoration: none;
            transition: color var(--transition-fast);
            position: relative;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-primary);
            transition: width var(--transition-base);
        }

        .nav-link:hover {
            color: var(--text-primary);
        }

        .nav-link:hover::after {
            width: 100%;
        }

        /* Theme Toggle */
        .theme-toggle {
            width: 40px;
            height: 40px;
            border-radius: var(--radius-full);
            border: 1px solid var(--color-gray-200);
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all var(--transition-fast);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            border-color: var(--color-primary-300);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-20) var(--space-6);
            background: var(--bg-primary);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: var(--gradient-hero);
            animation: rotate 30s linear infinite;
            opacity: 0.3;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .hero-content {
            max-width: 1100px;
            width: 100%;
            position: relative;
            z-index: 1;
            text-align: center;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-4);
            background: var(--gradient-primary);
            border-radius: var(--radius-full);
            color: white;
            font-size: var(--text-sm);
            font-weight: 600;
            margin-bottom: var(--space-8);
            animation: fadeInUp 0.6s ease-out;
        }

        .hero-title {
            font-family: var(--font-display);
            font-size: var(--text-7xl);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: var(--space-6);
            animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .hero-title .gradient-text {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: var(--text-2xl);
            color: var(--text-secondary);
            font-weight: 400;
            line-height: 1.6;
            max-width: 700px;
            margin: 0 auto var(--space-10);
            animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .hero-cta {
            display: flex;
            gap: var(--space-4);
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Buttons */
        .btn {
            padding: var(--space-4) var(--space-8);
            border-radius: var(--radius-xl);
            font-size: var(--text-base);
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            transition: all var(--transition-base);
            border: none;
            cursor: pointer;
        }

        .btn-primary {
            background: var(--gradient-primary);
            color: white;
            box-shadow: var(--shadow-primary);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl), var(--shadow-primary);
        }

        .btn-secondary {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--color-gray-200);
        }

        .btn-secondary:hover {
            background: var(--bg-primary);
            border-color: var(--color-gray-300);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        /* Section */
        .section {
            padding: var(--space-32) var(--space-6);
        }

        .section-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto var(--space-20);
        }

        .section-badge {
            display: inline-block;
            padding: var(--space-2) var(--space-4);
            background: var(--color-primary-50);
            color: var(--color-primary-600);
            border-radius: var(--radius-full);
            font-size: var(--text-sm);
            font-weight: 600;
            margin-bottom: var(--space-4);
        }

        .section-title {
            font-family: var(--font-display);
            font-size: var(--text-5xl);
            font-weight: 800;
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin-bottom: var(--space-6);
        }

        .section-description {
            font-size: var(--text-lg);
            color: var(--text-secondary);
            line-height: 1.7;
        }

        /* Container */
        .container {
            max-width: 1280px;
            margin: 0 auto;
        }

        /* Stats Section */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-6);
        }

        .stat-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-2xl);
            padding: var(--space-10);
            text-align: center;
            transition: all var(--transition-slow);
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform var(--transition-slow);
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
            border-color: var(--color-primary-200);
        }

        .stat-card:hover::before {
            transform: scaleX(1);
        }

        .stat-icon {
            font-size: var(--text-5xl);
            margin-bottom: var(--space-4);
            display: block;
        }

        .stat-number {
            font-family: var(--font-display);
            font-size: var(--text-6xl);
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            margin-bottom: var(--space-3);
        }

        .stat-label {
            font-size: var(--text-base);
            color: var(--text-secondary);
            font-weight: 500;
        }

        /* Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: var(--space-8);
        }

        .project-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-2xl);
            overflow: hidden;
            transition: all var(--transition-slower);
            position: relative;
        }

        .project-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
            border-color: var(--color-primary-200);
        }

        .project-header {
            height: 200px;
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .project-card:nth-child(1) .project-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .project-card:nth-child(2) .project-header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .project-card:nth-child(3) .project-header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .project-card:nth-child(4) .project-header {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .project-card:nth-child(5) .project-header {
            background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
        }

        .project-icon {
            font-size: var(--text-6xl);
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
        }

        .project-body {
            padding: var(--space-8);
        }

        .project-title {
            font-size: var(--text-2xl);
            font-weight: 700;
            margin-bottom: var(--space-3);
            color: var(--text-primary);
        }

        .project-tech {
            font-size: var(--text-sm);
            color: var(--color-primary-600);
            font-weight: 600;
            margin-bottom: var(--space-4);
        }

        .project-description {
            font-size: var(--text-base);
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: var(--space-6);
        }

        .project-features {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
            margin-bottom: var(--space-6);
        }

        .feature-badge {
            padding: var(--space-2) var(--space-3);
            background: var(--color-gray-100);
            border-radius: var(--radius-md);
            font-size: var(--text-xs);
            font-weight: 600;
            color: var(--text-primary);
        }

        .project-links {
            display: flex;
            gap: var(--space-3);
        }

        .project-link {
            flex: 1;
            padding: var(--space-3) var(--space-4);
            border-radius: var(--radius-lg);
            text-align: center;
            text-decoration: none;
            font-size: var(--text-sm);
            font-weight: 600;
            transition: all var(--transition-base);
        }

        .project-link-primary {
            background: var(--gradient-primary);
            color: white;
        }

        .project-link-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .project-link-secondary {
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--color-gray-200);
        }

        .project-link-secondary:hover {
            background: var(--bg-primary);
            border-color: var(--color-gray-300);
        }

        /* Dashboard Section */
        .dashboards-categories {
            display: grid;
            gap: var(--space-16);
        }

        .dashboard-category {
            animation: fadeInUp 0.6s ease-out both;
        }

        .dashboard-category-header {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            margin-bottom: var(--space-8);
        }

        .dashboard-category-icon {
            font-size: var(--text-4xl);
        }

        .dashboard-category-title {
            font-family: var(--font-display);
            font-size: var(--text-3xl);
            font-weight: 700;
            color: var(--text-primary);
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: var(--space-6);
        }

        .dashboard-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            transition: all var(--transition-slow);
            position: relative;
            overflow: hidden;
        }

        .dashboard-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform var(--transition-slow);
        }

        .dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
            border-color: var(--color-primary-300);
        }

        .dashboard-card:hover::before {
            transform: scaleX(1);
        }

        .dashboard-header {
            display: flex;
            align-items: flex-start;
            gap: var(--space-4);
            margin-bottom: var(--space-4);
        }

        .dashboard-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: var(--radius-lg);
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-2xl);
            flex-shrink: 0;
        }

        .dashboard-info {
            flex: 1;
        }

        .dashboard-title {
            font-size: var(--text-lg);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-2);
            line-height: 1.3;
        }

        .dashboard-uid {
            font-size: var(--text-xs);
            color: var(--text-tertiary);
            font-family: 'Monaco', 'Courier New', monospace;
        }

        .dashboard-description {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: var(--space-4);
        }

        .dashboard-link {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-4);
            background: var(--gradient-primary);
            color: white;
            text-decoration: none;
            border-radius: var(--radius-lg);
            font-size: var(--text-sm);
            font-weight: 600;
            transition: all var(--transition-base);
        }

        .dashboard-link:hover {
            transform: translateX(4px);
            box-shadow: var(--shadow-md);
        }

        /* Dashboard Screenshot */
        .dashboard-preview {
            margin-top: var(--space-12);
            text-align: center;
        }

        .dashboard-preview-title {
            font-family: var(--font-display);
            font-size: var(--text-3xl);
            font-weight: 700;
            margin-bottom: var(--space-6);
        }

        .dashboard-preview-image {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            border-radius: var(--radius-2xl);
            box-shadow: var(--shadow-2xl);
            border: 1px solid var(--color-gray-200);
            transition: transform var(--transition-slow);
        }

        .dashboard-preview-image:hover {
            transform: scale(1.02);
        }

        /* Tech Stack Section */
        .tech-categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--space-8);
        }

        .tech-category {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-2xl);
            padding: var(--space-8);
            transition: all var(--transition-slow);
            position: relative;
            overflow: hidden;
        }

        .tech-category::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform var(--transition-slow);
        }

        .tech-category:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
            border-color: var(--color-primary-200);
        }

        .tech-category:hover::before {
            transform: scaleX(1);
        }

        .tech-category-header {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            margin-bottom: var(--space-6);
        }

        .tech-category-icon {
            width: 56px;
            height: 56px;
            border-radius: var(--radius-xl);
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-3xl);
        }

        .tech-category-title {
            font-size: var(--text-xl);
            font-weight: 700;
            color: var(--text-primary);
        }

        .tech-items {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
        }

        .tech-item {
            padding: var(--space-2) var(--space-4);
            background: var(--color-gray-100);
            border-radius: var(--radius-lg);
            font-size: var(--text-sm);
            font-weight: 600;
            color: var(--text-primary);
            transition: all var(--transition-fast);
        }

        .tech-item:hover {
            background: var(--gradient-primary);
            color: white;
            transform: translateY(-2px);
        }

        /* Experience Timeline */
        .timeline {
            position: relative;
            max-width: 900px;
            margin: 0 auto;
            padding: var(--space-8) 0;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--gradient-primary);
            transform: translateX(-50%);
        }

        .timeline-item {
            position: relative;
            margin-bottom: var(--space-12);
            animation: fadeInUp 0.6s ease-out both;
        }

        .timeline-item:nth-child(odd) {
            padding-right: calc(50% + var(--space-8));
        }

        .timeline-item:nth-child(even) {
            padding-left: calc(50% + var(--space-8));
        }

        .timeline-marker {
            position: absolute;
            left: 50%;
            top: 0;
            width: 20px;
            height: 20px;
            border-radius: var(--radius-full);
            background: var(--gradient-primary);
            transform: translateX(-50%);
            box-shadow: 0 0 0 6px var(--bg-primary), var(--shadow-primary);
            z-index: 2;
        }

        .timeline-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-2xl);
            padding: var(--space-8);
            transition: all var(--transition-slow);
            position: relative;
        }

        .timeline-card::before {
            content: '';
            position: absolute;
            top: 12px;
            width: 0;
            height: 0;
            border: 12px solid transparent;
        }

        .timeline-item:nth-child(odd) .timeline-card::before {
            right: -24px;
            border-left-color: var(--color-gray-200);
        }

        .timeline-item:nth-child(even) .timeline-card::before {
            left: -24px;
            border-right-color: var(--color-gray-200);
        }

        .timeline-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
            border-color: var(--color-primary-200);
        }

        .timeline-period {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-3);
            background: var(--gradient-gold);
            color: white;
            border-radius: var(--radius-full);
            font-size: var(--text-xs);
            font-weight: 700;
            margin-bottom: var(--space-4);
        }

        .timeline-company {
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-2);
        }

        .timeline-position {
            font-size: var(--text-base);
            font-weight: 600;
            color: var(--color-primary-600);
            margin-bottom: var(--space-4);
        }

        .timeline-description {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            .timeline::before {
                left: 20px;
            }

            .timeline-marker {
                left: 20px;
            }

            .timeline-item:nth-child(odd),
            .timeline-item:nth-child(even) {
                padding-right: 0;
                padding-left: calc(20px + var(--space-8) + var(--space-4));
            }

            .timeline-card::before {
                display: none;
            }
        }

        /* Certifications Section */
        .certifications-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: var(--space-6);
        }

        .cert-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-2xl);
            padding: var(--space-8);
            transition: all var(--transition-slow);
            position: relative;
            overflow: hidden;
        }

        .cert-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-gold);
            transform: scaleX(0);
            transition: transform var(--transition-slow);
        }

        .cert-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
            border-color: var(--color-accent-gold);
        }

        .cert-card:hover::before {
            transform: scaleX(1);
        }

        .cert-header {
            display: flex;
            align-items: flex-start;
            gap: var(--space-4);
            margin-bottom: var(--space-4);
        }

        .cert-icon-wrapper {
            width: 64px;
            height: 64px;
            border-radius: var(--radius-xl);
            background: var(--gradient-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-3xl);
            flex-shrink: 0;
            box-shadow: var(--shadow-md);
        }

        .cert-info {
            flex: 1;
        }

        .cert-name {
            font-size: var(--text-xl);
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--space-2);
            line-height: 1.3;
        }

        .cert-issuer {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            font-weight: 500;
            margin-bottom: var(--space-1);
        }

        .cert-date {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-1) var(--space-3);
            background: var(--color-accent-gold);
            color: white;
            border-radius: var(--radius-full);
            font-size: var(--text-xs);
            font-weight: 700;
        }

        /* Footer */
        .footer {
            padding: var(--space-20) var(--space-6);
            background: var(--bg-secondary);
            text-align: center;
        }

        .footer-title {
            font-family: var(--font-display);
            font-size: var(--text-4xl);
            font-weight: 800;
            margin-bottom: var(--space-6);
        }

        .footer-description {
            font-size: var(--text-lg);
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto var(--space-10);
        }

        .footer-links {
            display: flex;
            gap: var(--space-6);
            justify-content: center;
            margin-bottom: var(--space-10);
        }

        .footer-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: var(--text-base);
            font-weight: 500;
            transition: color var(--transition-fast);
        }

        .footer-link:hover {
            color: var(--text-primary);
        }

        .footer-copyright {
            font-size: var(--text-sm);
            color: var(--text-tertiary);
        }

        /* Scroll to Top */
        .scroll-top {
            position: fixed;
            bottom: var(--space-6);
            right: var(--space-6);
            width: 48px;
            height: 48px;
            border-radius: var(--radius-full);
            background: var(--gradient-primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
            box-shadow: var(--shadow-primary);
            z-index: 99;
        }

        .scroll-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-top:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .hero-title {
                font-size: var(--text-6xl);
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: var(--text-5xl);
            }

            .hero-subtitle {
                font-size: var(--text-lg);
            }

            .section-title {
                font-size: var(--text-4xl);
            }

            .nav-links {
                gap: var(--space-4);
            }

            .nav-link {
                font-size: var(--text-xs);
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
            .hero-title {
                font-size: var(--text-4xl);
            }

            .section-title {
                font-size: var(--text-3xl);
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .hero-cta {
                flex-direction: column;
            }

            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>

    <!-- Structured Data (JSON-LD) for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "이재철 (Jaecheol Lee)",
        "jobTitle": "Infrastructure & Security Engineer",
        "description": "8년 8개월 경력 인프라·보안 엔지니어. 복잡한 인프라를 단순하게, 반복 업무를 자동화로.",
        "url": "https://resume.jclee.me",
        "email": "qws941@kakao.com",
        "telephone": "+82-10-5757-9592",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "시흥시",
            "addressRegion": "경기도",
            "addressCountry": "KR"
        },
        "sameAs": [
            "https://github.com/qws941"
        ],
        "knowsAbout": [
            "Infrastructure Engineering",
            "Security Engineering",
            "DevOps",
            "Cloud Computing",
            "Docker",
            "Kubernetes",
            "Python",
            "Automation",
            "Network Security",
            "System Administration"
        ],
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "name": "CCNP (Cisco Certified Network Professional)",
                "credentialCategory": "Professional Certification",
                "recognizedBy": {
                    "@type": "Organization",
                    "name": "Cisco Systems"
                },
                "dateCreated": "2020-08"
            },
            {
                "@type": "EducationalOccupationalCredential",
                "name": "RHCSA (Red Hat Certified System Administrator)",
                "credentialCategory": "Professional Certification",
                "recognizedBy": {
                    "@type": "Organization",
                    "name": "Red Hat"
                },
                "dateCreated": "2019-01"
            }
        ],
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Professional Training"
        }
    }
    </script>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav" id="nav">
        <div class="nav-container">
            <div class="nav-logo">JC LEE</div>
            <div class="nav-links">
                <a href="#tech-stack" class="nav-link">Tech Stack</a>
                <a href="#experience" class="nav-link">Experience</a>
                <a href="#certifications" class="nav-link">Certifications</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#dashboards" class="nav-link">Dashboards</a>
                <a href="resume.html" class="nav-link">Resume</a>
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                    <span id="themeIcon">🌙</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-badge">
                <span>⚡</span>
                <span>8+ Years of Excellence</span>
            </div>
            <h1 class="hero-title">
                Building<br>
                <span class="gradient-text">Infrastructure</span><br>
                That Scales
            </h1>
            <p class="hero-subtitle">
                복잡한 인프라를 단순하게, 반복 업무를 자동화로.<br>
                업무 시간 50~95% 단축, 시스템 가용성 99.9% 달성.
            </p>
            <div class="hero-cta">
                <a href="#projects" class="btn btn-primary">
                    <span>View Projects</span>
                    <span>→</span>
                </a>
                <a href="resume.html" class="btn btn-secondary">
                    <span>Download Resume</span>
                    <span>📄</span>
                </a>
                <a href="https://github.com/qws941" target="_blank" class="btn btn-secondary">
                    <span>GitHub</span>
                    <span>↗</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="section" id="stats" style="background: var(--bg-secondary);">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-icon">⚡</span>
                    <div class="stat-number" data-target="95">0</div>
                    <div class="stat-label">업무 시간 단축률 (%)</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">🛡️</span>
                    <div class="stat-number" data-target="15">0</div>
                    <div class="stat-label">보안 솔루션 운영 (종)</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">📈</span>
                    <div class="stat-number" data-target="99.9">0</div>
                    <div class="stat-label">시스템 가용성 (%)</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">🚀</span>
                    <div class="stat-number" data-target="80">0</div>
                    <div class="stat-label">방화벽 중앙관리 (대)</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="section" id="tech-stack">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Technical Expertise</span>
                <h2 class="section-title">Tech Stack</h2>
                <p class="section-description">
                    8년 8개월간 운영한 15종 이상 보안 솔루션 및 인프라 기술 스택
                </p>
            </div>

            <div class="tech-categories">
                <!-- Security Solutions -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">🛡️</div>
                        <h3 class="tech-category-title">Security Solutions</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">Fortigate</span>
                        <span class="tech-item">Palo Alto</span>
                        <span class="tech-item">Cisco ASA</span>
                        <span class="tech-item">DDoS</span>
                        <span class="tech-item">IPS/IDS</span>
                        <span class="tech-item">WAF</span>
                        <span class="tech-item">NAC</span>
                        <span class="tech-item">DLP</span>
                        <span class="tech-item">EDR/EPP</span>
                        <span class="tech-item">MDM</span>
                        <span class="tech-item">APT</span>
                    </div>
                </div>

                <!-- Cloud & Containers -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">☁️</div>
                        <h3 class="tech-category-title">Cloud & Containers</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">AWS VPC</span>
                        <span class="tech-item">AWS IAM</span>
                        <span class="tech-item">AWS GuardDuty</span>
                        <span class="tech-item">AWS S3</span>
                        <span class="tech-item">AWS CloudTrail</span>
                        <span class="tech-item">Docker</span>
                        <span class="tech-item">Kubernetes</span>
                        <span class="tech-item">VMware</span>
                        <span class="tech-item">Portainer</span>
                    </div>
                </div>

                <!-- Automation & Development -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">⚙️</div>
                        <h3 class="tech-category-title">Automation & Development</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">Python</span>
                        <span class="tech-item">Node.js</span>
                        <span class="tech-item">Flask</span>
                        <span class="tech-item">Shell Script</span>
                        <span class="tech-item">Ansible</span>
                        <span class="tech-item">Terraform</span>
                        <span class="tech-item">Jenkins</span>
                        <span class="tech-item">GitLab CI/CD</span>
                        <span class="tech-item">GitHub Actions</span>
                    </div>
                </div>

                <!-- Networking -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">🌐</div>
                        <h3 class="tech-category-title">Networking</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">OSPF</span>
                        <span class="tech-item">BGP</span>
                        <span class="tech-item">VLAN</span>
                        <span class="tech-item">VxLAN</span>
                        <span class="tech-item">MPLS</span>
                        <span class="tech-item">Load Balancing</span>
                        <span class="tech-item">SSL/TLS</span>
                        <span class="tech-item">VPN</span>
                        <span class="tech-item">Traefik</span>
                    </div>
                </div>

                <!-- Monitoring & Observability -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">📊</div>
                        <h3 class="tech-category-title">Monitoring & Observability</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">Grafana</span>
                        <span class="tech-item">Prometheus</span>
                        <span class="tech-item">Loki</span>
                        <span class="tech-item">Tempo</span>
                        <span class="tech-item">ELK Stack</span>
                        <span class="tech-item">Splunk</span>
                        <span class="tech-item">Zabbix</span>
                        <span class="tech-item">Nagios</span>
                    </div>
                </div>

                <!-- Database & Storage -->
                <div class="tech-category">
                    <div class="tech-category-header">
                        <div class="tech-category-icon">💾</div>
                        <h3 class="tech-category-title">Database & Storage</h3>
                    </div>
                    <div class="tech-items">
                        <span class="tech-item">PostgreSQL</span>
                        <span class="tech-item">MySQL</span>
                        <span class="tech-item">MongoDB</span>
                        <span class="tech-item">Redis</span>
                        <span class="tech-item">SQLite</span>
                        <span class="tech-item">Synology NAS</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Experience Timeline Section -->
    <section class="section" id="experience" style="background: var(--bg-secondary);">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Career Journey</span>
                <h2 class="section-title">Experience Timeline</h2>
                <p class="section-description">
                    8년 8개월간의 인프라·보안 엔지니어 경력 여정
                </p>
            </div>

            <div class="timeline">
                <!-- Item 1: Current Position -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📍</span>
                            <span>2025.03 ~ 현재 (8개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜아이티센 CTS</h3>
                        <div class="timeline-position">정보보안 운영 엔지니어 | 넥스트레이드 운영SM (정보보안팀)</div>
                        <p class="timeline-description">
                            금융위원회 본인가 이후 운영 보안 체계 안정화. 15종 이상 보안 솔루션 통합 운영, 보안 이벤트 모니터링 및 장애 대응(24/7). 보안 솔루션 튜닝으로 장애율 35% 감소, 대응 시간 40% 단축, 금감원 정기 감사 지적 0건 달성.
                        </p>
                    </div>
                </div>

                <!-- Item 2 -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📅</span>
                            <span>2024.03 ~ 2025.02 (11개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜가온누리정보시스템</h3>
                        <div class="timeline-position">프리랜서 인프라 엔지니어 | 넥스트레이드 구축 프로젝트</div>
                        <p class="timeline-description">
                            금융위원회 본인가 대비 망분리 및 보안 체계 구축. DDoS, IPS, WAF, VPN, NAC, DLP, SSL 복호화, APT 등 15종 보안 솔루션 통합 운영. Python 자동화로 작업시간 50% 단축, 본인가 심사 보안 이슈 0건.
                        </p>
                    </div>
                </div>

                <!-- Item 3 -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📅</span>
                            <span>2022.08 ~ 2024.03 (1년 7개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜콴텍투자일임</h3>
                        <div class="timeline-position">인프라 엔지니어 | 인프라·정보보호팀</div>
                        <p class="timeline-description">
                            금융보안데이터센터(FSDC) 운영. 150대 이상 서버 및 스토리지 형상관리, AWS 클라우드 보안 구성. Python 자동화로 장애율 40% 감소, 금감원 정기 감사 통과, 개인정보 유출사고 0건.
                        </p>
                    </div>
                </div>

                <!-- Item 4 -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📅</span>
                            <span>2022.05 ~ 2022.07 (3개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜펀엔씨</h3>
                        <div class="timeline-position">DevOps 엔지니어 | 클라우드 인프라</div>
                        <p class="timeline-description">
                            AWS 클라우드 아키텍처 구축 (EC2, Auto Scaling, VPC, Route 53, S3). Python/Shell 기반 백업·복구 자동화로 MTTR 50% 단축. CI/CD 파이프라인에 보안 스캔 단계 추가, 취약점 조기 발견율 80% 향상.
                        </p>
                    </div>
                </div>

                <!-- Item 5 -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📅</span>
                            <span>2021.09 ~ 2022.04 (8개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜조인트리</h3>
                        <div class="timeline-position">인프라·시스템 엔지니어 | 국민대학교 차세대 정보시스템</div>
                        <p class="timeline-description">
                            Fortigate UTM, VMware NSX-T 기반 네트워크 세분화. NAC, DLP, APT 등 보안 솔루션 통합 운영. 네트워크 세분화 및 모니터링 강화로 장애율 25% 감소, 서비스 가용률 99.9% 유지.
                        </p>
                    </div>
                </div>

                <!-- Item 6 -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>📅</span>
                            <span>2019.12 ~ 2021.08 (1년 9개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜메타넷엠플랫폼</h3>
                        <div class="timeline-position">인프라·시스템 엔지니어 | 대규모 콜센터 인프라</div>
                        <p class="timeline-description">
                            1,000명 규모 재택근무 환경 구축. Fortigate SSL VPN, NAC 솔루션 통합, Ansible 기반 정책 자동 배포. Python으로 Cisco 스위치 점검 자동화, 주당 소요시간 75% 단축.
                        </p>
                    </div>
                </div>

                <!-- Item 7: First Position -->
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <span class="timeline-period">
                            <span>🚀</span>
                            <span>2017.02 ~ 2018.10 (1년 9개월)</span>
                        </span>
                        <h3 class="timeline-company">㈜엠티데이타</h3>
                        <div class="timeline-position">서버·시스템 엔지니어 | 한국항공우주산업(KAI)</div>
                        <p class="timeline-description">
                            Linux 서버 50대 이상 운영 및 보안 패치. 방화벽, IDS 정책 관리 및 로그 분석. 방화벽 정책 재설계로 중복 룰 30% 제거, 치명적 취약점 2주 내 100% 조치, 내부정보 유출사고 0건.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="section" id="certifications">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Professional Credentials</span>
                <h2 class="section-title">Certifications</h2>
                <p class="section-description">
                    네트워크·보안·시스템 분야 전문 자격증 6개 보유
                </p>
            </div>

            <div class="certifications-grid">
                <!-- CCNP -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>🏅</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">CCNP</h3>
                            <div class="cert-issuer">Cisco Systems</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2020.08</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- RHCSA -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>🎖️</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">RHCSA</h3>
                            <div class="cert-issuer">Red Hat</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2019.01</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- CompTIA Linux+ -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>🏆</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">CompTIA Linux+</h3>
                            <div class="cert-issuer">CompTIA</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2019.02</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- LPIC Level 1 -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>🥇</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">LPIC Level 1</h3>
                            <div class="cert-issuer">Linux Professional Institute</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2019.02</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 사무자동화산업기사 -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>📜</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">사무자동화산업기사</h3>
                            <div class="cert-issuer">한국산업인력공단</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2019.12</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 리눅스마스터 2급 -->
                <div class="cert-card">
                    <div class="cert-header">
                        <div class="cert-icon-wrapper">
                            <span>🎓</span>
                        </div>
                        <div class="cert-info">
                            <h3 class="cert-name">리눅스마스터 2급</h3>
                            <div class="cert-issuer">한국정보통신진흥협회</div>
                            <span class="cert-date">
                                <span>📅</span>
                                <span>2019.01</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="section" id="projects">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Featured Work</span>
                <h2 class="section-title">Production Systems</h2>
                <p class="section-description">
                    실제 운영 중인 프로덕션 시스템 · 검증된 성과와 비즈니스 임팩트
                </p>
            </div>

            <div class="projects-grid">
                <!-- Splunk Project -->
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-icon">🛡️</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">Splunk-FortiNet Integration</h3>
                        <div class="project-tech">Node.js · Cloudflare Workers · DDD Architecture</div>
                        <p class="project-description">
                            80대 방화벽 실시간 중앙관리 플랫폼. DDD Level 3로 9개 도메인 분리 설계, FortiManager/FortiAnalyzer 직접 API 연동. 초당 10만 이벤트 처리 및 75,000% 확장 여유로 엔터프라이즈 검증 완료.
                        </p>
                        <div class="project-features">
                            <span class="feature-badge">100K+ Events/Sec</span>
                            <span class="feature-badge">AI Threat Analysis</span>
                            <span class="feature-badge">80+ Devices</span>
                            <span class="feature-badge">9 Domain Architecture</span>
                        </div>
                        <div class="project-links">
                            <a href="https://splunk.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://grafana.jclee.me/d/splunk" target="_blank" class="project-link project-link-secondary">📊 Dashboard</a>
                            <a href="https://github.com/qws941/splunk" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- SafeWork Project -->
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-icon">🏥</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">SafeWork Industrial Health</h3>
                        <div class="project-tech">Flask 3.0 · PostgreSQL 15 · Cloudflare Edge</div>
                        <p class="project-description">
                            산업보건 설문조사 SaaS 플랫폼. Cloudflare Workers Edge API로 전국 동시 접속 처리, Flask 3.0 하이브리드 아키텍처. 종이 설문 디지털 전환으로 집계 오류 100% 제거.
                        </p>
                        <div class="project-features">
                            <span class="feature-badge">Hybrid Architecture</span>
                            <span class="feature-badge">Edge Processing</span>
                            <span class="feature-badge">Zero Error Rate</span>
                            <span class="feature-badge">Real-time Analytics</span>
                        </div>
                        <div class="project-links">
                            <a href="https://safework.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://grafana.jclee.me/d/safework" target="_blank" class="project-link project-link-secondary">📊 Dashboard</a>
                            <a href="https://github.com/qws941/safework" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Blacklist Project -->
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-icon">🔒</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">REGTECH Threat Intelligence</h3>
                        <div class="project-tech">Flask · PostgreSQL · Portainer · Claude AI</div>
                        <p class="project-description">
                            금융보안원 IP 블랙리스트 자동 수집·관리·배포 시스템. Claude AI 통합 CI/CD로 배포 자동화, Portainer API 기반 무중단 배포. 수동 수집 대비 95% 시간 단축.
                        </p>
                        <div class="project-features">
                            <span class="feature-badge">95% Time Reduction</span>
                            <span class="feature-badge">Auto-Rollback</span>
                            <span class="feature-badge">99.9% Uptime</span>
                            <span class="feature-badge">AI CI/CD</span>
                        </div>
                        <div class="project-links">
                            <a href="https://blacklist.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://grafana.jclee.me/d/blacklist" target="_blank" class="project-link project-link-secondary">📊 Dashboard</a>
                            <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- FortiGate Project -->
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-icon">🔥</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">FortiGate Policy Orchestration</h3>
                        <div class="project-tech">Flask · FortiManager API · GitHub Actions</div>
                        <p class="project-description">
                            FortiGate 방화벽 정책 통합 모니터링 및 자동 배포 시스템. 3-Port 배포 전략으로 고가용성 보장, FortiManager API 직접 연동. 정책 검증 시간 80% 단축.
                        </p>
                        <div class="project-features">
                            <span class="feature-badge">3-Port HA</span>
                            <span class="feature-badge">80% Time Saved</span>
                            <span class="feature-badge">Zero Downtime</span>
                            <span class="feature-badge">API Integration</span>
                        </div>
                        <div class="project-links">
                            <a href="https://fortinet.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://grafana.jclee.me/d/fortinet" target="_blank" class="project-link project-link-secondary">📊 Dashboard</a>
                            <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>

                <!-- Grafana Project -->
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-icon">📊</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">Full-Stack Observability</h3>
                        <div class="project-tech">Grafana · Prometheus · Loki · Tempo · Traefik</div>
                        <p class="project-description">
                            Full-Stack 관측성 플랫폼. Prometheus·Loki·Tempo 3종 통합으로 메트릭·로그·트레이스 단일화. Traefik SSL 자동화, NAS 영구저장, 인프라 전체 가시성 확보.
                        </p>
                        <div class="project-features">
                            <span class="feature-badge">Metrics·Logs·Traces</span>
                            <span class="feature-badge">SSL Termination</span>
                            <span class="feature-badge">Persistent Storage</span>
                            <span class="feature-badge">Auto Alerting</span>
                        </div>
                        <div class="project-links">
                            <a href="https://grafana.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="https://prometheus.jclee.me" target="_blank" class="project-link project-link-secondary">📊 Prometheus</a>
                            <a href="https://github.com/qws941/grafana" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Monitoring Dashboards Section -->
    <section class="section" id="dashboards" style="background: var(--bg-secondary);">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Observability</span>
                <h2 class="section-title">Monitoring Dashboards</h2>
                <p class="section-description">
                    Grafana 기반 Full-Stack 관측성 플랫폼 · 실시간 메트릭·로그·트레이스 통합 모니터링
                </p>
            </div>

            <div class="dashboards-categories">
                <!-- Core Monitoring -->
                <div class="dashboard-category">
                    <div class="dashboard-category-header">
                        <span class="dashboard-category-icon">🎯</span>
                        <h3 class="dashboard-category-title">Core Monitoring</h3>
                    </div>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>💚</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Monitoring Stack Health</h4>
                                    <span class="dashboard-uid">monitoring-stack-health</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                Prometheus, Loki, Tempo 모니터링 스택 헬스 체크. 데이터 수집률, 쿼리 성능, 스토리지 상태 실시간 추적.
                            </p>
                            <a href="https://grafana.jclee.me/d/monitoring-stack-health" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>⚡</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Query Performance</h4>
                                    <span class="dashboard-uid">query-performance</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                Prometheus 쿼리 성능 분석. 느린 쿼리 탐지, 실행 시간 트렌드, 메모리 사용량 최적화 인사이트.
                            </p>
                            <a href="https://grafana.jclee.me/d/query-performance" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>🏥</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Service Health</h4>
                                    <span class="dashboard-uid">service-health</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                전체 서비스 가용성 및 헬스 상태 통합 뷰. Uptime, 응답 시간, 에러율 SLA 모니터링.
                            </p>
                            <a href="https://grafana.jclee.me/d/service-health" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Infrastructure -->
                <div class="dashboard-category">
                    <div class="dashboard-category-header">
                        <span class="dashboard-category-icon">🏗️</span>
                        <h3 class="dashboard-category-title">Infrastructure</h3>
                    </div>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>📊</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">System Metrics (USE)</h4>
                                    <span class="dashboard-uid">infrastructure-metrics</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                USE Method 기반 인프라 모니터링. CPU·메모리·디스크·네트워크 Utilization/Saturation/Errors 추적.
                            </p>
                            <a href="https://grafana.jclee.me/d/infrastructure-metrics" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>🐳</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Container Performance</h4>
                                    <span class="dashboard-uid">container-performance</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                Docker 컨테이너 리소스 사용률. cAdvisor 기반 실시간 CPU/메모리/네트워크 모니터링 및 제한 임계값 추적.
                            </p>
                            <a href="https://grafana.jclee.me/d/container-performance" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Applications -->
                <div class="dashboard-category">
                    <div class="dashboard-category-header">
                        <span class="dashboard-category-icon">🚀</span>
                        <h3 class="dashboard-category-title">Applications</h3>
                    </div>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>📱</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Application Monitoring</h4>
                                    <span class="dashboard-uid">application-monitoring</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                애플리케이션 레이어 성능 모니터링. HTTP 요청률, 응답 시간, 에러율, 처리량 RED Metrics 추적.
                            </p>
                            <a href="https://grafana.jclee.me/d/application-monitoring" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>🤖</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">n8n Workflow Automation</h4>
                                    <span class="dashboard-uid">n8n-workflow-automation-reds</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                n8n 워크플로우 자동화 모니터링. 실행 성공률, 처리 시간, 노드별 에러 추적, REDS 메트릭 분석.
                            </p>
                            <a href="https://grafana.jclee.me/d/n8n-workflow-automation-reds" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Logging & Alerting -->
                <div class="dashboard-category">
                    <div class="dashboard-category-header">
                        <span class="dashboard-category-icon">📝</span>
                        <h3 class="dashboard-category-title">Logging & Alerting</h3>
                    </div>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>🔍</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Log Analysis</h4>
                                    <span class="dashboard-uid">log-analysis</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                Loki 기반 통합 로그 분석. 에러 패턴 탐지, 로그 볼륨 트렌드, 서비스별 로그 필터링 및 검색.
                            </p>
                            <a href="https://grafana.jclee.me/d/log-analysis" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                        <div class="dashboard-card">
                            <div class="dashboard-header">
                                <div class="dashboard-icon-wrapper">
                                    <span>🚨</span>
                                </div>
                                <div class="dashboard-info">
                                    <h4 class="dashboard-title">Alert Overview</h4>
                                    <span class="dashboard-uid">alert-overview</span>
                                </div>
                            </div>
                            <p class="dashboard-description">
                                Alertmanager 통합 알림 현황. 활성 알림, 억제 규칙, 알림 히스토리, 채널별 전송 상태 관리.
                            </p>
                            <a href="https://grafana.jclee.me/d/alert-overview" target="_blank" class="dashboard-link">
                                <span>View Dashboard</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dashboard Preview -->
            <div class="dashboard-preview">
                <h3 class="dashboard-preview-title">Dashboard Preview</h3>
                <img src="assets/dashboards/blacklist-dashboard.png"
                     alt="Blacklist Management Dashboard Preview"
                     class="dashboard-preview-image"
                     loading="lazy">
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <h2 class="footer-title">Let's Build Something Great</h2>
            <p class="footer-description">
                복잡한 인프라 문제를 자동화로 해결하고, 팀의 생산성을 극대화합니다.
            </p>
            <div class="footer-links">
                <a href="mailto:qws941@kakao.com" class="footer-link">Email</a>
                <a href="https://github.com/qws941" target="_blank" class="footer-link">GitHub</a>
                <a href="tel:010-5757-9592" class="footer-link">Phone</a>
            </div>
            <p class="footer-copyright">
                © 2025 Jaecheol Lee. All rights reserved.
            </p>
        </div>
    </footer>

    <!-- Scroll to Top -->
    <button class="scroll-top" id="scrollTop" aria-label="Scroll to top">
        <span>↑</span>
    </button>

    <script>
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Navigation Scroll Effect
        const nav = document.getElementById('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Scroll to Top Button
        const scrollTop = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Stats Counter Animation
        function animateCounter(element, target) {
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            const isDecimal = target % 1 !== 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                    clearInterval(timer);
                } else {
                    element.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                }
            }, 16);
        }

        // Intersection Observer for Stats
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseFloat(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('#stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Smooth Scroll for Anchor Links
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

        // Card Hover Effect
        const cards = document.querySelectorAll('.project-card, .stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
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
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Design System - Same as index */
            --color-primary-600: #9333ea;
            --color-primary-700: #7e22ce;
            --color-secondary-600: #2563eb;
            --color-gray-50: #fafafa;
            --color-gray-100: #f4f4f5;
            --color-gray-200: #e4e4e7;
            --color-gray-700: #3f3f46;
            --color-gray-800: #27272a;
            --color-gray-900: #18181b;

            --bg-primary: #ffffff;
            --bg-secondary: #fafafa;
            --text-primary: #18181b;
            --text-secondary: #52525b;
            --text-tertiary: #71717a;

            --gradient-primary: linear-gradient(135deg, #a855f7 0%, #7e22ce 50%, #3b82f6 100%);

            --shadow-sm: 0 2px 4px rgba(0,0,0,0.06);
            --shadow-md: 0 4px 8px rgba(0,0,0,0.08);
            --shadow-lg: 0 8px 16px rgba(0,0,0,0.10);

            --font-display: 'Playfair Display', serif;
            --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;

            --space-2: 0.5rem;
            --space-3: 0.75rem;
            --space-4: 1rem;
            --space-6: 1.5rem;
            --space-8: 2rem;
            --space-10: 2.5rem;
            --space-12: 3rem;
            --space-16: 4rem;

            --radius-md: 0.5rem;
            --radius-lg: 0.75rem;
            --radius-xl: 1rem;
            --radius-2xl: 1.5rem;
            --radius-full: 9999px;

            --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
            font-family: var(--font-body);
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            -webkit-font-smoothing: antialiased;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--color-gray-200);
            box-shadow: var(--shadow-sm);
        }

        .nav-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: var(--space-4) var(--space-6);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-logo {
            font-family: var(--font-display);
            font-size: 1.25rem;
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-decoration: none;
        }

        .nav-back {
            padding: 0.5rem 1rem;
            background: var(--bg-secondary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-lg);
            text-decoration: none;
            color: var(--text-primary);
            font-size: 0.875rem;
            font-weight: 600;
            transition: all var(--transition-base);
        }

        .nav-back:hover {
            background: var(--bg-primary);
            box-shadow: var(--shadow-md);
        }

        /* Resume Container */
        .resume-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 120px 1.5rem 4rem;
        }

        /* Header */
        .resume-header {
            background: var(--gradient-primary);
            border-radius: var(--radius-2xl);
            padding: var(--space-16) var(--space-12);
            color: white;
            text-align: center;
            margin-bottom: var(--space-12);
            position: relative;
            overflow: hidden;
        }

        .resume-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
            animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        .resume-name {
            font-family: var(--font-display);
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: var(--space-3);
            position: relative;
            z-index: 1;
        }

        .resume-title {
            font-size: 1.5rem;
            font-weight: 300;
            opacity: 0.95;
            margin-bottom: var(--space-6);
            position: relative;
            z-index: 1;
        }

        .resume-contact {
            display: flex;
            gap: var(--space-6);
            justify-content: center;
            flex-wrap: wrap;
            font-size: 0.95rem;
            position: relative;
            z-index: 1;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        .contact-item a {
            color: white;
            text-decoration: none;
            transition: opacity var(--transition-base);
        }

        .contact-item a:hover {
            opacity: 0.8;
        }

        /* Section */
        .section {
            margin-bottom: var(--space-16);
        }

        .section-title {
            font-family: var(--font-display);
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: var(--space-8);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: var(--space-3);
        }

        .section-icon {
            font-size: 2rem;
        }

        /* Summary */
        .summary-text {
            font-size: 1.125rem;
            line-height: 1.8;
            color: var(--text-secondary);
            background: var(--bg-secondary);
            padding: var(--space-8);
            border-radius: var(--radius-xl);
            border-left: 4px solid var(--color-primary-600);
        }

        /* Experience */
        .experience-item {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            margin-bottom: var(--space-6);
            transition: all var(--transition-base);
        }

        .experience-item:hover {
            box-shadow: var(--shadow-lg);
            transform: translateY(-2px);
        }

        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: var(--space-4);
            flex-wrap: wrap;
            gap: var(--space-4);
        }

        .company-name {
            font-size: 1.375rem;
            font-weight: 700;
            color: var(--text-primary);
        }

        .period {
            font-size: 0.875rem;
            color: var(--text-tertiary);
            font-weight: 600;
            padding: var(--space-2) var(--space-4);
            background: var(--color-gray-100);
            border-radius: var(--radius-full);
        }

        .role {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: var(--space-4);
        }

        .achievement {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
            border-left: 3px solid var(--color-primary-600);
            padding: var(--space-4);
            border-radius: var(--radius-md);
            margin: var(--space-3) 0;
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-primary);
        }

        /* Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: var(--space-6);
        }

        .project-card {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            transition: all var(--transition-base);
        }

        .project-card:hover {
            box-shadow: var(--shadow-lg);
            transform: translateY(-4px);
        }

        .project-name {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: var(--space-2);
            color: var(--text-primary);
        }

        .project-tech {
            font-size: 0.8rem;
            color: var(--color-primary-600);
            font-weight: 600;
            margin-bottom: var(--space-3);
        }

        .project-description {
            font-size: 0.9rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin-bottom: var(--space-4);
        }

        .project-links {
            display: flex;
            gap: var(--space-3);
        }

        .project-link {
            font-size: 0.8rem;
            color: var(--color-primary-600);
            text-decoration: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        .project-link:hover {
            text-decoration: underline;
        }

        /* Skills */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--space-6);
        }

        .skill-category {
            background: var(--bg-primary);
            border: 1px solid var(--color-gray-200);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
        }

        .skill-category-title {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }

        .skill-category-icon {
            font-size: 1.5rem;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
        }

        .skill-tag {
            padding: var(--space-2) var(--space-3);
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-secondary);
            transition: all var(--transition-base);
            cursor: pointer;
        }

        .skill-tag:hover {
            background: var(--gradient-primary);
            color: white;
            transform: translateY(-2px);
        }

        /* Certifications */
        .cert-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: var(--space-4);
        }

        .cert-item {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--space-4);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all var(--transition-base);
        }

        .cert-item:hover {
            background: var(--bg-primary);
            box-shadow: var(--shadow-md);
        }

        .cert-name {
            font-weight: 600;
            color: var(--text-primary);
        }

        .cert-date {
            font-size: 0.85rem;
            color: var(--text-tertiary);
            font-weight: 600;
        }

        /* Print Styles */
        @media print {
            .nav, .nav-back {
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

        /* Responsive */
        @media (max-width: 768px) {
            .resume-name {
                font-size: 2.5rem;
            }

            .resume-title {
                font-size: 1.125rem;
            }

            .resume-contact {
                flex-direction: column;
                align-items: center;
                gap: var(--space-3);
            }

            .section-title {
                font-size: 1.5rem;
            }

            .experience-header {
                flex-direction: column;
                gap: var(--space-2);
            }

            .projects-grid,
            .skills-grid,
            .cert-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">JC LEE</a>
            <a href="index.html" class="nav-back">← Back to Portfolio</a>
        </div>
    </nav>

    <!-- Resume Container -->
    <div class="resume-container">
        <!-- Header -->
        <header class="resume-header">
            <h1 class="resume-name">이재철 (Jaecheol Lee)</h1>
            <p class="resume-title">Infrastructure & Security Engineer</p>
            <div class="resume-contact">
                <div class="contact-item">
                    <span>📧</span>
                    <a href="mailto:qws941@kakao.com">qws941@kakao.com</a>
                </div>
                <div class="contact-item">
                    <span>📱</span>
                    <a href="tel:010-5757-9592">010-5757-9592</a>
                </div>
                <div class="contact-item">
                    <span>💼</span>
                    <a href="https://github.com/qws941" target="_blank">github.com/qws941</a>
                </div>
                <div class="contact-item">
                    <span>🌐</span>
                    <a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a>
                </div>
            </div>
        </header>

        <!-- Professional Summary -->
        <section class="section">
            <h2 class="section-title">
                <span class="section-icon">👨‍💻</span>
                Professional Summary
            </h2>
            <div class="summary-text">
                8년 8개월간 금융·교육·제조 산업에서 인프라·보안 운영. 자동화로 일일 5시간 수작업 제거, DDD 아키텍처 기반 엔터프라이즈급 시스템 설계·구축.
                15종 이상 보안 솔루션 통합 운영 및 프로덕션 시스템 99.9% 가용성 달성.
            </div>
        </section>

        <!-- Work Experience -->
        <section class="section">
            <h2 class="section-title">
                <span class="section-icon">💼</span>
                Work Experience
            </h2>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜아이티센 CTS</h3>
                    <span class="period">2025.03 - 현재</span>
                </div>
                <p class="role">정보보안 운영 엔지니어 | 넥스트레이드 운영SM (정보보안팀)</p>
                <div class="achievement">
                    ⚡ 보안 이벤트 대응시간 40% 단축 (45분 → 27분)
                </div>
                <div class="achievement">
                    🛡️ 금융감독원 감사 지적사항 0건 (2회 연속)
                </div>
                <div class="achievement">
                    📊 보안 정책 오탐률 50% 감소 (일 200건 → 100건)
                </div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜가온누리정보시스템</h3>
                    <span class="period">2024.03 - 2025.02</span>
                </div>
                <p class="role">프리랜서 인프라 엔지니어 | 넥스트레이드 구축 프로젝트</p>
                <div class="achievement">
                    🔥 Python 방화벽 정책 자동화, 작업시간 50% 단축 (8시간 → 4시간)
                </div>
                <div class="achievement">
                    🖥️ EPP/DLP 에이전트 충돌 해결, CPU 사용률 30% 개선 (60% → 42%)
                </div>
                <div class="achievement">
                    🔒 내부정보 유출사고 0건 유지 (12개월)
                </div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜콴텍투자일임</h3>
                    <span class="period">2022.08 - 2024.03</span>
                </div>
                <p class="role">인프라·정보보호팀 인프라 엔지니어 | AI 기반 주식투자 서비스 FSDC 운영</p>
                <div class="achievement">
                    🏦 금융감독원 감사 통과, 개인정보 유출사고 0건 (19개월)
                </div>
                <div class="achievement">
                    📈 DB 접근제어 쿼리 튜닝, CPU 사용률 30% 개선 (75% → 52%)
                </div>
            </div>

            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="company-name">㈜메타넷엠플랫폼</h3>
                    <span class="period">2019.12 - 2021.08</span>
                </div>
                <p class="role">인프라·시스템 엔지니어 | 1,000명 규모 재택근무 환경 구축</p>
                <div class="achievement">
                    🐍 Python 스위치 점검 자동화, 주당 75% 단축 (8시간 → 2시간)
                </div>
                <div class="achievement">
                    ⚙️ Ansible NAC 정책 자동배포, 처리시간 90% 단축 (30분 → 3분)
                </div>
            </div>
        </section>

        <!-- Personal Projects -->
        <section class="section">
            <h2 class="section-title">
                <span class="section-icon">🚀</span>
                Personal Projects
            </h2>

            <div class="projects-grid">
                <div class="project-card">
                    <h3 class="project-name">Splunk-FortiNet Integration</h3>
                    <div class="project-tech">Node.js · Cloudflare Workers · DDD</div>
                    <p class="project-description">
                        80대 방화벽 중앙관리, 초당 10만 이벤트 처리, DDD Level 3 아키텍처
                    </p>
                    <div class="project-links">
                        <a href="https://splunk.jclee.me" target="_blank" class="project-link">
                            <span>Live Demo</span>
                            <span>→</span>
                        </a>
                        <a href="https://github.com/qws941/splunk" target="_blank" class="project-link">
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">SafeWork Industrial Health</h3>
                    <div class="project-tech">Flask · PostgreSQL · Cloudflare Workers</div>
                    <p class="project-description">
                        산업보건 SaaS, Edge API 전국 동시접속, 집계 오류 100% 제거
                    </p>
                    <div class="project-links">
                        <a href="https://safework.jclee.me" target="_blank" class="project-link">
                            <span>Live Demo</span>
                            <span>→</span>
                        </a>
                        <a href="https://github.com/qws941/safework" target="_blank" class="project-link">
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">REGTECH Threat Intelligence</h3>
                    <div class="project-tech">Flask · PostgreSQL · Portainer · Claude AI</div>
                    <p class="project-description">
                        금융보안원 위협정보 자동수집, 95% 시간 단축, AI CI/CD
                    </p>
                    <div class="project-links">
                        <a href="https://blacklist.jclee.me" target="_blank" class="project-link">
                            <span>Live Demo</span>
                            <span>→</span>
                        </a>
                        <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link">
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">FortiGate Policy Orchestration</h3>
                    <div class="project-tech">Flask · FortiManager API · GitHub Actions</div>
                    <p class="project-description">
                        방화벽 정책 자동배포, 3-tier HA 무중단, 80% 시간 단축
                    </p>
                    <div class="project-links">
                        <a href="https://fortinet.jclee.me" target="_blank" class="project-link">
                            <span>Live Demo</span>
                            <span>→</span>
                        </a>
                        <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link">
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                <div class="project-card">
                    <h3 class="project-name">Full-Stack Observability</h3>
                    <div class="project-tech">Grafana · Prometheus · Loki · Tempo</div>
                    <p class="project-description">
                        13개 서비스 통합, 메트릭·로그·트레이스 단일화, 30일 보관
                    </p>
                    <div class="project-links">
                        <a href="https://grafana.jclee.me" target="_blank" class="project-link">
                            <span>Live Demo</span>
                            <span>→</span>
                        </a>
                        <a href="https://github.com/qws941/grafana" target="_blank" class="project-link">
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills -->
        <section class="section">
            <h2 class="section-title">
                <span class="section-icon">🛠️</span>
                Technical Skills
            </h2>

            <div class="skills-grid">
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">🛡️</span>
                        Security Solutions
                    </h3>
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
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">☁️</span>
                        Cloud & Virtualization
                    </h3>
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
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">⚙️</span>
                        Automation & Development
                    </h3>
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
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">📊</span>
                        Monitoring & Observability
                    </h3>
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
            <h2 class="section-title">
                <span class="section-icon">🏅</span>
                Certifications
            </h2>

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

    <script>
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.experience-item, .project-card, .skill-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    </script>
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

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML, {
        headers: SECURITY_HEADERS,
      });
    }

    return new Response(INDEX_HTML, {
      headers: SECURITY_HEADERS,
    });
  },
};
