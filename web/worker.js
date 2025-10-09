// Cloudflare Worker - Auto-generated
const INDEX_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이재철 - Infrastructure & Security Engineer | 8년 8개월 경력 포트폴리오</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어 이재철의 포트폴리오. 15종 이상 보안 솔루션 운영, 업무 자동화 50~95% 시간 단축, 프로덕션 시스템 99.9% 가용성 달성.">
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
    <meta name="twitter:description" content="8년 8개월 경력 인프라·보안 엔지니어 포트폴리오">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://resume.jclee.me">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://github.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: #fafafa;
            --bg-secondary: #f5f5f7;
            --bg-hero: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #2d2d44 100%);
            --bg-footer: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #2d2d44 100%);
            --text-primary: #1a1a1a;
            --text-secondary: #4a4a4a;
            --text-tertiary: #757575;
            --text-hero: #ffffff;
            --text-hero-sub: #c4c4c4;
            --text-hero-desc: #e0e0e0;
            --border-color: #e8e8e8;
            --card-bg: #ffffff;
            --card-hover-shadow: rgba(0,0,0,0.15);
            --gradient-primary: linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #2563eb 100%);
            --gradient-gold: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            --gradient-premium: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(91, 33, 182, 0.1) 100%);
        }

        [data-theme="dark"] {
            --bg-primary: #111827;
            --bg-secondary: #1f2937;
            --bg-hero: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            --bg-footer: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-tertiary: #9ca3af;
            --text-hero: #ffffff;
            --text-hero-sub: #d1d5db;
            --text-hero-desc: #e5e7eb;
            --border-color: #374151;
            --card-bg: #1f2937;
            --card-hover-shadow: rgba(0,0,0,0.3);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
            line-height: 1.7;
            color: var(--text-primary);
            background: var(--bg-primary);
            min-height: 100vh;
            transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 400;
            letter-spacing: -0.01em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Dark Mode Toggle */
        .theme-toggle {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1000;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 50%;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .theme-toggle-icon {
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        .theme-toggle:hover .theme-toggle-icon {
            transform: rotate(20deg);
        }

        /* Scroll to Top Button */
        .scroll-to-top {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            background: var(--gradient-primary);
            border: none;
            border-radius: 50%;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.45);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.65);
        }

        .scroll-to-top span {
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: bold;
            transition: transform 0.3s ease;
        }

        .scroll-to-top:hover span {
            transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 24px;
            background: var(--bg-hero);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }

        .hero-content {
            max-width: 1000px;
            width: 100%;
            position: relative;
            z-index: 1;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 4.5rem;
            font-weight: 700;
            color: var(--text-hero);
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            line-height: 1.15;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            color: var(--text-hero-sub);
            margin-bottom: 32px;
            font-weight: 300;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-size: 0.95rem;
            opacity: 0.9;
        }

        .hero-description {
            font-size: 1.125rem;
            color: var(--text-hero-desc);
            line-height: 1.8;
            max-width: 700px;
            margin-bottom: 48px;
        }

        .hero-cta {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }

        .cta-button {
            padding: 14px 32px;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            display: inline-block;
        }

        .cta-primary {
            background: var(--gradient-primary);
            color: #ffffff;
            box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
            position: relative;
            overflow: hidden;
        }

        .cta-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .cta-primary:hover::before {
            left: 100%;
        }

        .cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.5);
        }

        .cta-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            border: 2px solid rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(15px);
            position: relative;
            overflow: hidden;
        }

        .cta-secondary::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
        }

        .cta-secondary:hover::before {
            transform: scaleX(1);
        }

        .cta-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.6);
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        /* Projects Section */
        .projects-section {
            padding: 120px 24px;
            background: var(--bg-secondary);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 80px;
        }

        .section-label {
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-tertiary);
            margin-bottom: 16px;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 20px;
            letter-spacing: -0.015em;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            display: inline-block;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: var(--gradient-gold);
            border-radius: 2px;
        }

        .section-description {
            font-size: 1.125rem;
            color: var(--text-tertiary);
            max-width: 600px;
            margin: 0 auto;
        }

        /* Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 32px;
        }

        .project-card {
            background: var(--card-bg);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            backdrop-filter: blur(10px);
            position: relative;
        }

        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-premium);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 0;
        }

        .project-card:hover::before {
            opacity: 1;
        }

        .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(124, 58, 237, 0.25);
            border-color: rgba(124, 58, 237, 0.35);
        }

        .project-image {
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .project-card:nth-child(1) .project-image {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .project-card:nth-child(2) .project-image {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .project-card:nth-child(3) .project-image {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .project-card:nth-child(4) .project-image {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .project-card:nth-child(5) .project-image {
            background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
        }

        .project-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        }

        .project-icon {
            font-size: 3.5rem;
            color: rgba(255, 255, 255, 1);
            z-index: 1;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
        }

        .project-content {
            padding: 28px;
        }

        .project-header {
            margin-bottom: 16px;
        }

        .project-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 10px;
            letter-spacing: -0.02em;
        }

        .project-tech {
            font-size: 0.85rem;
            color: #2563eb;
            font-weight: 700;
            letter-spacing: 0.02em;
        }

        .project-description {
            font-size: 0.95rem;
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 20px;
        }

        .project-features {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .feature-item {
            font-size: 0.8rem;
            color: var(--text-primary);
            background: var(--bg-secondary);
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: 500;
        }

        .project-links {
            display: flex;
            gap: 10px;
        }

        .project-link {
            padding: 11px 24px;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            flex: 1;
            text-align: center;
        }

        .link-primary {
            background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%);
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
        }

        .link-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
        }

        .link-secondary {
            background: var(--bg-secondary);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
        }

        .link-secondary:hover {
            background: var(--card-bg);
            border-color: var(--text-tertiary);
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        /* Skills Section */
        .skills-section {
            padding: 100px 24px;
            background: var(--bg-primary);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .skill-category {
            background: var(--card-bg);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .skill-category::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-premium);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
        }

        .skill-category:hover::before {
            opacity: 1;
        }

        .skill-category:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 48px rgba(124, 58, 237, 0.18), 0 0 0 1px rgba(124, 58, 237, 0.15);
            border-color: rgba(124, 58, 237, 0.25);
        }

        .skill-category-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
            letter-spacing: -0.01em;
        }

        .skill-category-icon {
            font-size: 1.5rem;
        }

        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            font-size: 0.875rem;
            color: var(--text-secondary);
            background: var(--bg-secondary);
            padding: 10px 20px;
            border-radius: 24px;
            font-weight: 500;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            position: relative;
            z-index: 1;
            cursor: pointer;
        }

        .skill-tag:hover {
            background: var(--gradient-primary);
            color: #ffffff;
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.35);
            border-color: rgba(124, 58, 237, 0.25);
        }

        /* Footer */
        .footer {
            padding: 80px 24px;
            background: var(--bg-footer);
            text-align: center;
        }

        .footer-content {
            max-width: 600px;
            margin: 0 auto;
        }

        .footer-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .footer-text {
            font-size: 1.125rem;
            color: #9ca3af;
            margin-bottom: 32px;
        }

        .footer-links {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin-bottom: 32px;
        }

        .footer-link {
            color: #d1d5db;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            padding-bottom: 4px;
        }

        .footer-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-gold);
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-link:hover {
            color: #ffffff;
            transform: translateY(-2px);
        }

        .footer-link:hover::after {
            width: 100%;
        }

        .footer-copyright {
            font-size: 0.875rem;
            color: #6b7280;
        }

        /* Stats Section */
        .stats-section {
            padding: 80px 24px;
            background: var(--bg-primary);
            position: relative;
            overflow: hidden;
        }

        .stats-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .stat-card {
            background: var(--card-bg);
            padding: 48px 32px;
            border-radius: 24px;
            text-align: center;
            border: 1px solid var(--border-color);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-gold);
            transform: scaleX(0);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-premium);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
        }

        .stat-card:hover::before {
            transform: scaleX(1);
        }

        .stat-card:hover::after {
            opacity: 1;
        }

        .stat-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 24px 60px rgba(124, 58, 237, 0.25), 0 0 0 1px rgba(124, 58, 237, 0.15);
            border-color: rgba(124, 58, 237, 0.35);
        }

        .stat-icon {
            font-size: 3.5rem;
            margin-bottom: 20px;
            filter: grayscale(0.2);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 1;
            text-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .stat-card:hover .stat-icon {
            filter: grayscale(0) drop-shadow(0 8px 16px rgba(124, 58, 237, 0.35));
            transform: scale(1.15) translateY(-4px);
        }

        .stat-number {
            font-family: 'Playfair Display', serif;
            font-size: 4rem;
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
            line-height: 1;
            position: relative;
            z-index: 1;
            letter-spacing: -0.02em;
        }

        .stat-label {
            font-size: 0.95rem;
            color: var(--text-secondary);
            font-weight: 500;
            margin-bottom: 4px;
        }

        .stat-unit {
            font-size: 0.85rem;
            color: var(--text-tertiary);
            font-weight: 600;
        }

        /* Contact Section */
        .contact-section {
            padding: 100px 24px;
            background: var(--bg-secondary);
        }

        .contact-container {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 60px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .contact-item {
            background: var(--card-bg);
            padding: 28px;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            gap: 20px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .contact-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-premium);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
        }

        .contact-item:hover::before {
            opacity: 1;
        }

        .contact-item:hover {
            transform: translateX(12px) scale(1.02);
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.25), 0 0 0 1px rgba(124, 58, 237, 0.15);
            border-color: rgba(124, 58, 237, 0.35);
        }

        .contact-item-icon {
            font-size: 2rem;
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gradient-primary);
            border-radius: 16px;
            flex-shrink: 0;
            position: relative;
            z-index: 1;
            box-shadow: 0 8px 24px rgba(124, 58, 237, 0.35);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-item:hover .contact-item-icon {
            transform: rotate(-5deg) scale(1.1);
            box-shadow: 0 12px 32px rgba(124, 58, 237, 0.45);
        }

        .contact-item-content {
            flex: 1;
        }

        .contact-item-title {
            font-size: 0.875rem;
            color: var(--text-tertiary);
            margin-bottom: 4px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .contact-item-link {
            font-size: 1.1rem;
            color: var(--text-primary);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s ease;
        }

        .contact-item-link:hover {
            color: #7c3aed;
        }

        /* Contact Form */
        .contact-form {
            background: var(--card-bg);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px rgba(0,0,0,0.08);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }

        .contact-form::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-gold);
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .form-input,
        .form-textarea {
            width: 100%;
            padding: 16px 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            color: var(--text-primary);
            font-family: inherit;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-input:focus,
        .form-textarea:focus {
            outline: none;
            border-color: rgba(124, 58, 237, 0.6);
            background: var(--card-bg);
            box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12), 0 4px 20px rgba(124, 58, 237, 0.18);
            transform: translateY(-2px);
        }

        .form-textarea {
            resize: vertical;
            min-height: 120px;
        }

        .form-submit {
            width: 100%;
            padding: 18px 32px;
            background: var(--gradient-primary);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
            position: relative;
            overflow: hidden;
        }

        .form-submit::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }

        .form-submit:hover::before {
            left: 100%;
        }

        .form-submit:hover {
            transform: translateY(-3px) scale(1.01);
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.55);
        }

        .form-submit:active {
            transform: translateY(-1px) scale(0.99);
        }

        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .projects-grid {
                grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                gap: 28px;
            }
        }

        @media (max-width: 1024px) {
            .hero-title {
                font-size: 3.5rem;
            }

            .projects-grid {
                grid-template-columns: 1fr;
                gap: 32px;
            }

            .project-card {
                max-width: 600px;
                margin: 0 auto;
            }
        }

        @media (max-width: 768px) {
            .hero {
                padding: 60px 20px;
                min-height: 90vh;
            }

            .hero-title {
                font-size: 2.5rem;
                margin-bottom: 12px;
            }

            .hero-subtitle {
                font-size: 1.25rem;
                margin-bottom: 24px;
            }

            .hero-description {
                font-size: 1rem;
                line-height: 1.7;
                margin-bottom: 40px;
            }

            .section-title {
                font-size: 2rem;
            }

            .section-description {
                font-size: 1rem;
            }

            .hero-cta {
                flex-direction: column;
                gap: 12px;
            }

            .cta-button {
                width: 100%;
                text-align: center;
                padding: 16px 32px;
            }

            .stats-section {
                padding: 60px 20px;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }

            .stat-number {
                font-size: 2.5rem;
            }

            .projects-section {
                padding: 80px 20px;
            }

            .section-header {
                margin-bottom: 48px;
            }

            .project-image {
                height: 160px;
            }

            .project-icon {
                font-size: 3rem;
            }

            .contact-section {
                padding: 80px 20px;
            }

            .contact-container {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .contact-form {
                padding: 32px 24px;
            }

            .footer {
                padding: 60px 20px;
            }

            .footer-links {
                flex-direction: column;
                gap: 16px;
            }
        }

        @media (max-width: 640px) {
            .hero {
                padding: 50px 16px;
            }

            .hero-title {
                font-size: 2rem;
                letter-spacing: -0.03em;
            }

            .hero-subtitle {
                font-size: 1.1rem;
            }

            .hero-description {
                font-size: 0.95rem;
                line-height: 1.6;
            }

            .section-title {
                font-size: 1.75rem;
            }

            .section-label {
                font-size: 0.8rem;
            }

            .stats-section {
                padding: 50px 16px;
            }

            .stats-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .stat-card {
                padding: 32px 20px;
            }

            .stat-number {
                font-size: 2.5rem;
            }

            .projects-section {
                padding: 60px 16px;
            }

            .project-content {
                padding: 20px;
            }

            .project-title {
                font-size: 1.2rem;
            }

            .project-tech {
                font-size: 0.8rem;
            }

            .project-description {
                font-size: 0.9rem;
                line-height: 1.6;
            }

            .feature-item {
                font-size: 0.75rem;
                padding: 5px 12px;
            }

            .project-links {
                flex-direction: column;
                gap: 8px;
            }

            .project-link {
                width: 100%;
                text-align: center;
                padding: 12px 20px;
                font-size: 0.85rem;
            }

            .contact-section {
                padding: 60px 16px;
            }

            .contact-form {
                padding: 28px 20px;
            }

            .footer {
                padding: 50px 16px;
            }

            .footer-title {
                font-size: 1.5rem;
            }

            .footer-text {
                font-size: 1rem;
            }
        }

        @media (max-width: 375px) {
            .hero-title {
                font-size: 1.75rem;
            }

            .hero-subtitle {
                font-size: 1rem;
            }

            .section-title {
                font-size: 1.5rem;
            }

            .project-image {
                height: 140px;
            }

            .project-icon {
                font-size: 2.5rem;
            }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
            .cta-button,
            .project-link,
            .footer-link {
                min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .project-card:hover {
                transform: none;
            }

            .project-card:active {
                transform: scale(0.98);
                transition: transform 0.1s ease;
            }
        }

        /* Print styles */
        @media print {
            .hero,
            .footer {
                background: white;
                color: black;
            }

            .cta-button,
            .project-link {
                border: 1px solid #333;
                color: #333;
                background: white;
            }
        }
    </style>
</head>
<body>
    <!-- Dark Mode Toggle -->
    <button class="theme-toggle" id="themeToggle" aria-label="다크모드 토글">
        <span class="theme-toggle-icon" id="themeIcon">🌙</span>
    </button>

    <!-- Scroll to Top Button -->
    <button class="scroll-to-top" id="scrollToTop" aria-label="맨 위로 이동">
        <span>↑</span>
    </button>

    <!-- Hero Section -->
    <section class="hero" aria-label="소개">
        <div class="hero-content">
            <h1 class="hero-title">Infrastructure<br>& Security Engineer</h1>
            <p class="hero-subtitle">Jaecheol Lee · 8+ Years Experience</p>
            <p class="hero-description">
                복잡한 인프라를 단순하게, 반복 업무를 자동화로. 8년 8개월간 금융·교육·제조 산업에서 업무 시간 50~95% 단축 달성,
                15종 이상 보안 솔루션 통합 운영 및 프로덕션 시스템 99.9% 가용성 유지.
            </p>
            <nav class="hero-cta" aria-label="주요 링크">
                <a href="resume.html" class="cta-button cta-primary" aria-label="이력서 보기">View Resume</a>
                <a href="../master/resume_final.md" download="이재철_이력서.md" class="cta-button cta-secondary" aria-label="이력서 PDF 다운로드">📄 Download Resume</a>
                <a href="https://github.com/qws941" target="_blank" rel="noopener noreferrer" class="cta-button cta-secondary" aria-label="GitHub 프로필 방문">GitHub</a>
                <a href="mailto:qws941@kakao.com" class="cta-button cta-secondary" aria-label="이메일 연락하기">Contact</a>
            </nav>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section" aria-label="성과 통계">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">⚡</div>
                    <div class="stat-number" data-target="95">0</div>
                    <div class="stat-label">업무 시간 단축률</div>
                    <div class="stat-unit">%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🛡️</div>
                    <div class="stat-number" data-target="15">0</div>
                    <div class="stat-label">보안 솔루션 운영</div>
                    <div class="stat-unit">종</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-number" data-target="99.9">0</div>
                    <div class="stat-label">시스템 가용성</div>
                    <div class="stat-unit">%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🚀</div>
                    <div class="stat-number" data-target="80">0</div>
                    <div class="stat-label">방화벽 중앙관리</div>
                    <div class="stat-unit">대</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section" aria-label="프로젝트">
        <div class="container">
            <header class="section-header">
                <p class="section-label">Featured Work</p>
                <h2 class="section-title">Production Systems</h2>
                <p class="section-description">
                    실제 운영 중인 프로덕션 시스템 · 검증된 성과와 비즈니스 임팩트
                </p>
            </header>

            <div class="projects-grid" role="list">
                <!-- Splunk Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="Splunk-FortiNet Integration 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">🛡️</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">Splunk-FortiNet Integration</h3>
                            <p class="project-tech">Node.js · Cloudflare Workers · JavaScript · Splunk API · FortiManager/FortiOS API</p>
                        </div>
                        <p class="project-description">
                            80대 방화벽 실시간 중앙관리 플랫폼. DDD Level 3로 9개 도메인 분리 설계, FortiManager/FortiAnalyzer 직접 API 연동. 초당 10만 이벤트 처리 및 75,000% 확장 여유로 엔터프라이즈 검증 완료.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">100K+ Events/Sec</span>
                            <span class="feature-item">AI Threat Analysis</span>
                            <span class="feature-item">80+ Device Management</span>
                            <span class="feature-item">9 Domain Architecture</span>
                        </div>
                        <div class="project-links">
                            <a href="https://splunk.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/splunk" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>

                <!-- SafeWork Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="SafeWork Industrial Health Platform 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">🏥</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">SafeWork Industrial Health Platform</h3>
                            <p class="project-tech">Flask 3.0 · PostgreSQL 15 · Redis 7 · Cloudflare Workers</p>
                        </div>
                        <p class="project-description">
                            산업보건 설문조사 SaaS 플랫폼. Cloudflare Workers Edge API로 전국 동시 접속 처리, Flask 3.0 하이브리드 아키텍처. 종이 설문 디지털 전환으로 집계 오류 100% 제거, 다수 중소기업 실운영 중.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">Hybrid Architecture</span>
                            <span class="feature-item">Edge Processing</span>
                            <span class="feature-item">Zero Error Rate</span>
                            <span class="feature-item">Real-time Analytics</span>
                        </div>
                        <div class="project-links">
                            <a href="https://safework.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/safework" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>

                <!-- SafeWork Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="SafeWork Industrial Health Platform 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">🏥</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">SafeWork Industrial Health Platform</h3>
                            <p class="project-tech">Flask 3.0 · PostgreSQL 15 · Redis 7 · Cloudflare Workers</p>
                        </div>
                        <p class="project-description">
                            산업보건 설문조사 SaaS 플랫폼. Cloudflare Workers Edge API로 전국 동시 접속 처리, Flask 3.0 하이브리드 아키텍처. 종이 설문 디지털 전환으로 집계 오류 100% 제거, 다수 중소기업 실운영 중.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">Hybrid Architecture</span>
                            <span class="feature-item">Edge Processing</span>
                            <span class="feature-item">Zero Error Rate</span>
                            <span class="feature-item">Real-time Analytics</span>
                        </div>
                        <div class="project-links">
                            <a href="https://safework.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/safework" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>

                <!-- Blacklist Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="REGTECH Threat Intelligence 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">🔒</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">REGTECH Threat Intelligence</h3>
                            <p class="project-tech">Flask · PostgreSQL 15 · Redis 7 · Portainer API · Claude AI CI/CD</p>
                        </div>
                        <p class="project-description">
                            금융보안원 IP 블랙리스트 자동 수집·관리·배포 시스템. Claude AI 통합 CI/CD로 배포 자동화, Portainer API 기반 무중단 배포 및 자동 롤백. 수동 수집 대비 95% 시간 단축 (1시간 → 3분), 99.9% 가용성 달성.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">95% Time Reduction</span>
                            <span class="feature-item">Auto-Rollback</span>
                            <span class="feature-item">99.9% Uptime</span>
                            <span class="feature-item">AI CI/CD</span>
                        </div>
                        <div class="project-links">
                            <a href="https://blacklist.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>

                <!-- Fortinet Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="FortiGate Policy Orchestration 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">🔥</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">FortiGate Policy Orchestration</h3>
                            <p class="project-tech">Flask · FortiManager JSON-RPC API · Portainer · GitHub Actions</p>
                        </div>
                        <p class="project-description">
                            FortiGate 방화벽 정책 통합 모니터링 및 자동 배포 시스템. 3-Port 배포 전략(7777/7778/7779)으로 고가용성 보장, FortiManager API 직접 연동. 정책 검증 시간 80% 단축, 서비스 중단 0건 달성.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">3-Port HA</span>
                            <span class="feature-item">80% Time Saved</span>
                            <span class="feature-item">Zero Downtime</span>
                            <span class="feature-item">API Integration</span>
                        </div>
                        <div class="project-links">
                            <a href="https://fortinet.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>

                <!-- Grafana Project -->
                <article class="project-card" role="listitem">
                    <div class="project-image" role="img" aria-label="Full-Stack Observability Platform 프로젝트 아이콘">
                        <div class="project-icon" aria-hidden="true">📊</div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">Full-Stack Observability Platform</h3>
                            <p class="project-tech">Grafana · Prometheus · Loki · Tempo · Traefik · Docker · Watchtower</p>
                        </div>
                        <p class="project-description">
                            Full-Stack 관측성 플랫폼. Prometheus·Loki·Tempo 3종 통합으로 메트릭·로그·트레이스 단일화. Traefik SSL 자동화, NAS 영구저장, Node Exporter·cAdvisor로 인프라 전체 가시성 확보. Watchtower 기반 Docker 컨테이너 자동 업데이트 및 무중단 배포.
                        </p>
                        <div class="project-features">
                            <span class="feature-item">Metrics·Logs·Traces</span>
                            <span class="feature-item">SSL Termination</span>
                            <span class="feature-item">Persistent Storage</span>
                            <span class="feature-item">Auto Alerting</span>
                            <span class="feature-item">Auto-Update & Zero Downtime</span>
                        </div>
                        <div class="project-links">
                            <a href="https://grafana.jclee.me" target="_blank" class="project-link link-primary">Live Demo</a>
                            <a href="https://github.com/qws941/grafana" target="_blank" class="project-link link-secondary">GitHub</a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section" aria-label="기술 스택">
        <div class="container">
            <header class="section-header">
                <p class="section-label">Tech Stack</p>
                <h2 class="section-title">Core Skills</h2>
                <p class="section-description">
                    8년 8개월간 축적한 인프라·보안 기술 스택
                </p>
            </header>

            <div class="skills-grid">
                <!-- Security Solutions -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">🛡️</span>
                        Security Solutions
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">Fortigate</span>
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

                <!-- Cloud & Virtualization -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">☁️</span>
                        Cloud & Virtualization
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">Docker</span>
                        <span class="skill-tag">Kubernetes</span>
                        <span class="skill-tag">VMware vSphere</span>
                        <span class="skill-tag">NSX-T</span>
                        <span class="skill-tag">Portainer</span>
                    </div>
                </div>

                <!-- Automation & Development -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">⚙️</span>
                        Automation & Development
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">Node.js</span>
                        <span class="skill-tag">Shell Script</span>
                        <span class="skill-tag">Ansible</span>
                        <span class="skill-tag">Terraform</span>
                        <span class="skill-tag">GitHub Actions</span>
                        <span class="skill-tag">GitLab CI</span>
                    </div>
                </div>

                <!-- AI/ML & Automation -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">🧠</span>
                        AI/ML & Automation
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">Claude Code</span>
                        <span class="skill-tag">GitHub Copilot</span>
                        <span class="skill-tag">ChatGPT API</span>
                        <span class="skill-tag">MCP Protocol</span>
                        <span class="skill-tag">SlashCommand System</span>
                    </div>
                </div>

                <!-- Container & Orchestration -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">🐳</span>
                        Container & Orchestration
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">Docker</span>
                        <span class="skill-tag">Kubernetes</span>
                        <span class="skill-tag">Portainer API</span>
                        <span class="skill-tag">Docker Compose</span>
                        <span class="skill-tag">Private Registry</span>
                        <span class="skill-tag">Multi-Port Deployment</span>
                    </div>
                </div>

                <!-- Monitoring & Observability -->
                <div class="skill-category">
                    <h3 class="skill-category-title">
                        <span class="skill-category-icon">📊</span>
                        Monitoring & Observability
                    </h3>
                    <div class="skill-list">
                        <span class="skill-tag">Grafana</span>
                        <span class="skill-tag">Prometheus</span>
                        <span class="skill-tag">Loki</span>
                        <span class="skill-tag">Tempo</span>
                        <span class="skill-tag">ELK Stack</span>
                        <span class="skill-tag">Wazuh</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section" aria-label="연락처">
        <div class="container">
            <header class="section-header">
                <p class="section-label">Get In Touch</p>
                <h2 class="section-title">Contact Me</h2>
                <p class="section-description">
                    새로운 프로젝트나 협업 기회에 대해 이야기 나눠요
                </p>
            </header>

            <div class="contact-container">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-item-icon">📧</div>
                        <div class="contact-item-content">
                            <h3 class="contact-item-title">Email</h3>
                            <a href="mailto:qws941@kakao.com" class="contact-item-link">qws941@kakao.com</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-item-icon">💼</div>
                        <div class="contact-item-content">
                            <h3 class="contact-item-title">GitHub</h3>
                            <a href="https://github.com/qws941" target="_blank" class="contact-item-link">github.com/qws941</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-item-icon">📱</div>
                        <div class="contact-item-content">
                            <h3 class="contact-item-title">Phone</h3>
                            <a href="tel:010-5757-9592" class="contact-item-link">010-5757-9592</a>
                        </div>
                    </div>
                </div>

                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" id="name" name="name" class="form-input" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-input" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="message" class="form-label">Message</label>
                        <textarea id="message" name="message" class="form-textarea" rows="5" placeholder="Tell me about your project..." required></textarea>
                    </div>
                    <button type="submit" class="form-submit">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <h2 class="footer-title">Let's Build Something Great</h2>
            <p class="footer-text">
                복잡한 인프라 문제를 자동화로 해결하고, 팀의 생산성을 극대화합니다.
            </p>
            <div class="footer-links">
                <a href="mailto:qws941@kakao.com" class="footer-link">Email</a>
                <a href="https://github.com/qws941" target="_blank" class="footer-link">GitHub</a>
                <a href="tel:010-5757-9592" class="footer-link">Phone</a>
            </div>
            <p class="footer-copyright">
                © 2024 Jaecheol Lee. All rights reserved.
            </p>
        </div>
    </footer>

    <script>
        // Dark Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        // Check for saved theme preference or default to 'light' mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        // Theme toggle function
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade-in animation on scroll
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

        // Observe all project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = \`opacity 0.6s ease \${index * 0.1}s, transform 0.6s ease \${index * 0.1}s\`;
            observer.observe(card);
        });

        // Stats Counter Animation
        function animateCounter(element, target, duration = 2000) {
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

        // Trigger stats animation when stats section is in view
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

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Contact Form Handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                };

                // Create mailto link (since we don't have a backend)
                const subject = encodeURIComponent(\`Portfolio Contact from \${data.name}\`);
                const body = encodeURIComponent(\`Name: \${data.name}\nEmail: \${data.email}\n\nMessage:\n\${data.message}\`);
                const mailtoLink = \`mailto:qws941@kakao.com?subject=\${subject}&body=\${body}\`;

                // Open default email client
                window.location.href = mailtoLink;

                // Reset form
                contactForm.reset();

                // Show success message (optional)
                alert('Thank you for your message! Your default email client will open.');
            });
        }

        // Add smooth scroll offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80; // Adjust based on header height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to Top Button
        const scrollToTopButton = document.getElementById('scrollToTop');

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Prevent scroll to top button from blocking content on mobile
        if (window.innerWidth < 768) {
            scrollToTopButton.style.bottom = '80px';
        }
    </script>
</body>
</html>`;
const RESUME_HTML = `<!DOCTYPE html>
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
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    
    return new Response(INDEX_HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
