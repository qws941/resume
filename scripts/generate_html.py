#!/usr/bin/env python3
"""
GitHub Pages 이력서 HTML 생성 스크립트
"""

import json
from pathlib import Path
from datetime import datetime

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
RESUME_JSON = PROJECT_ROOT / "scripts" / "resume-data.json"
TARGET_HTML = PROJECT_ROOT / "docs" / "index.html"

# Read resume data
resume_data = json.loads(RESUME_JSON.read_text(encoding='utf-8'))

# Generate HTML
html_content = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{resume_data['profile']['name']} - {resume_data['profile']['title']}</title>

    <!-- SEO -->
    <meta name="description" content="{resume_data['summary']['intro'][:150]}">
    <meta name="keywords" content="인프라 엔지니어, 보안 엔지니어, DevOps, Platform Engineer, 이재철">
    <meta name="author" content="{resume_data['profile']['name']}">
    <meta name="robots" content="index, follow">

    <!-- Open Graph -->
    <meta property="og:title" content="{resume_data['profile']['name']} - {resume_data['profile']['title']}">
    <meta property="og:description" content="{resume_data['summary']['intro'][:150]}">
    <meta property="og:url" content="https://resume.jclee.me">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{resume_data['profile']['name']} - Infrastructure & Security Engineer">

    <link rel="canonical" href="https://resume.jclee.me">

    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Malgun Gothic', sans-serif;
            line-height: 1.7;
            color: #1f2937;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            padding: 60px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }}

        header {{
            border-bottom: 4px solid #667eea;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 12px 12px 0 0;
            margin: -60px -60px 40px -60px;
        }}

        h1 {{
            font-size: 2.8em;
            margin-bottom: 10px;
            font-weight: 700;
        }}

        .subtitle {{
            font-size: 1.3em;
            margin-bottom: 25px;
            opacity: 0.95;
        }}

        .contact {{
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            opacity: 0.9;
        }}

        .contact-item {{
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.05em;
        }}

        .contact-item a {{
            color: white;
            text-decoration: underline;
        }}

        section {{
            margin-bottom: 50px;
        }}

        h2 {{
            font-size: 2em;
            color: #111827;
            margin-bottom: 25px;
            padding-bottom: 12px;
            border-bottom: 3px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .summary-box {{
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 5px solid #667eea;
        }}

        .summary-box p {{
            font-size: 1.15em;
            line-height: 1.8;
            margin-bottom: 15px;
        }}

        .experience-item, .project-item {{
            margin-bottom: 35px;
            padding: 25px;
            background: #f9fafb;
            border-radius: 12px;
            border-left: 5px solid #667eea;
            transition: transform 0.2s, box-shadow 0.2s;
        }}

        .experience-item:hover, .project-item:hover {{
            transform: translateX(5px);
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
        }}

        .experience-header {{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }}

        .company {{
            font-size: 1.4em;
            font-weight: 700;
            color: #111827;
        }}

        .period {{
            color: #6b7280;
            font-size: 1em;
            font-weight: 600;
        }}

        .position {{
            color: #667eea;
            font-weight: 600;
            font-size: 1.1em;
            margin-bottom: 10px;
        }}

        .project-meta {{
            color: #6b7280;
            margin-bottom: 15px;
            font-size: 0.95em;
        }}

        ul {{
            margin-left: 25px;
            margin-top: 12px;
        }}

        li {{
            margin-bottom: 10px;
            color: #4b5563;
            line-height: 1.6;
        }}

        .tech-stack {{
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }}

        .tech-badge {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 0.9em;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }}

        .skills-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }}

        .skill-category {{
            background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb30 100%);
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
        }}

        .skill-category h3 {{
            color: #667eea;
            margin-bottom: 12px;
            font-size: 1.2em;
        }}

        .skill-category p {{
            color: #4b5563;
            line-height: 1.8;
        }}

        footer {{
            text-align: center;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
        }}

        a {{
            color: #667eea;
            text-decoration: none;
            transition: color 0.2s;
        }}

        a:hover {{
            color: #764ba2;
            text-decoration: underline;
        }}

        .achievement-badge {{
            background: #10b981;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            margin-right: 5px;
        }}

        @media print {{
            body {{ background: white; padding: 0; }}
            .container {{ box-shadow: none; padding: 40px; }}
            header {{ background: #667eea; }}
        }}

        @media (max-width: 768px) {{
            .container {{ padding: 30px 20px; }}
            header {{ padding: 30px 20px; margin: -30px -20px 30px -20px; }}
            h1 {{ font-size: 2em; }}
            .experience-header {{ flex-direction: column; }}
            .skills-grid {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{resume_data['profile']['name']} <span style="font-size:0.65em;opacity:0.9;">({resume_data['profile']['nameEn']})</span></h1>
            <div class="subtitle">{resume_data['profile']['title']}</div>
            <div class="contact">
                <div class="contact-item">📱 {resume_data['profile']['phone']}</div>
                <div class="contact-item">📧 {resume_data['profile']['email']}</div>
                <div class="contact-item">💻 <a href="https://{resume_data['profile']['github']}" target="_blank">{resume_data['profile']['github']}</a></div>
                <div class="contact-item">🌐 <a href="https://{resume_data['profile']['portfolio']}" target="_blank">{resume_data['profile']['portfolio']}</a></div>
            </div>
        </header>

        <section>
            <h2>💡 경력 요약</h2>
            <div class="summary-box">
                <p><strong>총 경력:</strong> {resume_data['summary']['totalYears']} ({resume_data['summary']['period']})</p>
                <p>{resume_data['summary']['intro']}</p>
            </div>

            <h3 style="margin-top:30px;margin-bottom:15px;color:#111827;font-size:1.3em;">핵심 역량</h3>
            <ul>
                {''.join([f"<li><strong>{skill.split('(')[0].strip()}</strong> {'(' + skill.split('(')[1] if '(' in skill else ''}</li>" for skill in resume_data['summary']['keySkills']])}
            </ul>

            <h3 style="margin-top:30px;margin-bottom:15px;color:#111827;font-size:1.3em;">검증된 성과</h3>
            <ul>
                {''.join([f'<li><span class="achievement-badge">✅</span>{achievement}</li>' for achievement in resume_data['summary']['achievements']])}
            </ul>
        </section>

        <section>
            <h2>💼 경력사항</h2>
            {''.join([f'''
            <div class="experience-item">
                <div class="experience-header">
                    <div>
                        <div class="company">{exp['company']}</div>
                        <div class="position">{exp['position']}</div>
                    </div>
                    <div class="period">{exp['period']}<br><span style="font-size:0.9em;">({exp['duration']})</span></div>
                </div>
                <div class="project-meta"><strong>프로젝트:</strong> {exp['project']}</div>

                <h4 style="margin-top:20px;margin-bottom:10px;color:#111827;font-size:1.1em;">주요 업무</h4>
                <ul>
                    {''.join([f"<li>{resp}</li>" for resp in exp['responsibilities']])}
                </ul>

                <h4 style="margin-top:20px;margin-bottom:10px;color:#111827;font-size:1.1em;">주요 성과</h4>
                <ul>
                    {''.join([f'<li><span class="achievement-badge">✅</span>{ach}</li>' for ach in exp['achievements']])}
                </ul>

                <div class="tech-stack">
                    {''.join([f'<span class="tech-badge">{tech}</span>' for tech in exp['techStack']])}
                </div>
            </div>
            ''' for exp in resume_data['experience']])}
        </section>

        <section>
            <h2>🚀 주요 프로젝트</h2>
            {''.join([f'''
            <div class="project-item">
                <div class="experience-header">
                    <div>
                        <div class="company">{proj['name']}</div>
                        <div class="position"><span style="background:#10b981;color:white;padding:3px 10px;border-radius:4px;font-size:0.85em;margin-right:10px;">{proj['status']}</span>{proj['description']}</div>
                    </div>
                    <div class="period">{proj['period']}</div>
                </div>

                <div style="margin:15px 0;padding:15px;background:white;border-radius:8px;">
                    <div style="margin-bottom:8px;"><strong>🔗 GitHub:</strong> <a href="https://{proj['github']}" target="_blank">{proj['github']}</a></div>
                    <div><strong>🔗 Live Demo:</strong> <a href="https://{proj['url']}" target="_blank">{proj['url']}</a></div>
                </div>

                <h4 style="margin-top:20px;margin-bottom:10px;color:#111827;font-size:1.1em;">핵심 성과</h4>
                <ul>
                    {''.join([f'<li><span class="achievement-badge">✅</span>{ach}</li>' for ach in proj['achievements']])}
                </ul>

                <div class="tech-stack">
                    {''.join([f'<span class="tech-badge">{tech}</span>' for tech in proj['techStack']])}
                </div>
            </div>
            ''' for proj in resume_data['projects']])}
        </section>

        <section>
            <h2>🛠 기술 스택</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <h3>⚙️ Platform & Infrastructure</h3>
                    <p>{', '.join(resume_data['skills']['platform'])}</p>
                </div>
                <div class="skill-category">
                    <h3>💻 Backend & Database</h3>
                    <p><strong>Backend:</strong> {', '.join(resume_data['skills']['backend'])}</p>
                    <p style="margin-top:10px;"><strong>Database:</strong> {', '.join(resume_data['skills']['database'])}</p>
                </div>
                <div class="skill-category">
                    <h3>🔄 DevOps & Automation</h3>
                    <p>{', '.join(resume_data['skills']['devops'])}</p>
                </div>
                <div class="skill-category">
                    <h3>🔒 Security</h3>
                    <p>{', '.join(resume_data['skills']['security'][:10])}</p>
                </div>
                <div class="skill-category">
                    <h3>☁️ Cloud</h3>
                    <p>{', '.join(resume_data['skills']['cloud'][:8])}</p>
                </div>
                <div class="skill-category">
                    <h3>🌐 Network</h3>
                    <p>{', '.join(resume_data['skills']['network'])}</p>
                </div>
            </div>
        </section>

        <section>
            <h2>🎓 학력</h2>
            {''.join([f'''
            <div style="margin-bottom:20px;padding:20px;background:#f9fafb;border-radius:8px;">
                <div style="font-size:1.2em;font-weight:600;margin-bottom:5px;">{edu['school']}</div>
                <div style="color:#667eea;font-weight:600;">{edu.get('major', '')}</div>
                <div style="color:#6b7280;margin-top:8px;">{edu['period']} · {edu['status']}</div>
            </div>
            ''' for edu in resume_data['education']])}
        </section>

        <section>
            <h2>📜 자격증</h2>
            <ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:15px;">
                {''.join([f'''
                <li style="background:#f9fafb;padding:15px;border-radius:8px;list-style:none;margin:0;">
                    <strong style="color:#111827;font-size:1.05em;">{cert['name']}</strong>
                    <div style="color:#6b7280;font-size:0.95em;margin-top:5px;">{cert['issuer']} · {cert['date']}</div>
                </li>
                ''' for cert in resume_data['certifications']])}
            </ul>
        </section>

        <footer>
            <p style="font-size:1.05em;"><strong>Last Updated:</strong> {datetime.now().strftime('%Y년 %m월 %d일')} | <strong>Version:</strong> 1.0.0</p>
            <p style="margin-top:15px;">이 이력서는 <a href="https://github.com/qws941/resume" target="_blank"><strong>GitHub</strong></a>에서 관리됩니다.</p>
            <p style="margin-top:10px;font-size:0.9em;opacity:0.8;">© 2025 {resume_data['profile']['name']}. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>"""

# Write HTML
TARGET_HTML.write_text(html_content, encoding='utf-8')
print(f"✅ HTML generated successfully: {TARGET_HTML}")
print(f"📍 URL: https://resume.jclee.me/resume/")