// Cloudflare Worker - Auto-generated
const INDEX_HTML = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>이재철 - Infrastructure & Security Engineer</title><meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어. 금융·제조 산업 인프라 운영 및 보안 솔루션 관리 경험."><meta name="robots" content="index, follow"><link rel="canonical" href="https://resume.jclee.me"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}:root{--color-black:#000000;--color-white:#ffffff;--color-gray-50:#fafafa;--color-gray-100:#f5f5f5;--color-gray-200:#e5e5e5;--color-gray-300:#d4d4d4;--color-gray-400:#a3a3a3;--color-gray-500:#737373;--color-gray-600:#525252;--color-gray-700:#404040;--color-gray-800:#262626;--color-gray-900:#171717;--color-cyan:#06b6d4;--color-cyan-dark:#0891b2;--color-violet:#8b5cf6;--color-violet-dark:#7c3aed;--font-sans:'Inter',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;--shadow-brutal:6px 6px 0 var(--color-black);--shadow-brutal-lg:10px 10px 0 var(--color-black);--border-width:3px;--border-radius:0;--transition:all 0.15s cubic-bezier(0.4, 0, 0.2, 1)}html{scroll-behavior:smooth}body{font-family:var(--font-sans);line-height:1.5;color:var(--color-black);background:var(--color-white);-webkit-font-smoothing:antialiased;overflow-x:hidden}.container{max-width:1400px;margin:0 auto;padding:0 2rem}.nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--color-white);border-bottom:var(--border-width) solid var(--color-black)}.nav-container{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;max-width:1400px;margin:0 auto}.nav-logo{font-size:1.5rem;font-weight:900;color:var(--color-black);text-decoration:none;letter-spacing:-.05em}.nav-links{display:flex;gap:2rem;align-items:center}.nav-link{font-size:1rem;font-weight:600;color:var(--color-black);text-decoration:none;transition:var(--transition);padding:.5rem 1rem}.nav-link:hover{color:var(--color-cyan)}.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 0 4rem;position:relative}.hero-content{max-width:900px}.hero-badge{display:inline-block;padding:.75rem 1.5rem;background:var(--color-cyan);color:var(--color-white);font-size:.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);margin-bottom:3rem}.hero-title{font-size:clamp(3rem, 10vw, 7rem);font-weight:900;line-height:1;letter-spacing:-.04em;margin-bottom:2rem}.hero-subtitle{font-size:clamp(1.25rem, 3vw, 2rem);font-weight:400;color:var(--color-gray-600);margin-bottom:3rem;line-height:1.4}.hero-cta{display:flex;gap:1.5rem;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;gap:.75rem;padding:1.25rem 2.5rem;font-size:1.125rem;font-weight:700;text-decoration:none;border:var(--border-width) solid var(--color-black);transition:var(--transition);cursor:pointer;white-space:nowrap}.btn-primary{background:var(--color-black);color:var(--color-white);box-shadow:var(--shadow-brutal)}.btn-primary:hover{transform:translate(6px,6px);box-shadow:none}.btn-secondary{background:var(--color-white);color:var(--color-black);box-shadow:var(--shadow-brutal)}.btn-secondary:hover{transform:translate(6px,6px);box-shadow:none}.section{padding:6rem 0}.section-header{margin-bottom:4rem}.section-badge{display:inline-block;padding:.5rem 1rem;background:var(--color-gray-100);border:var(--border-width) solid var(--color-black);font-size:.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:1.5rem}.section-title{font-size:clamp(2.5rem, 6vw, 4rem);font-weight:900;line-height:1.1;letter-spacing:-.03em;margin-bottom:1.5rem}.section-description{font-size:1.25rem;color:var(--color-gray-600);max-width:700px}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem}.stat-card{padding:3rem 2rem;background:var(--color-white);border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);transition:var(--transition)}.stat-card:hover{transform:translate(-6px,-6px);box-shadow:var(--shadow-brutal-lg)}.stat-number{font-size:4rem;font-weight:900;line-height:1;color:var(--color-cyan);margin-bottom:.5rem}.stat-label{font-size:1.125rem;font-weight:600;color:var(--color-black)}.docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;margin-top:3rem}.doc-card{background:linear-gradient(135deg,var(--color-white) 0,var(--color-gray-50) 100%);border:var(--border-width) solid var(--color-black);padding:2.5rem;transition:var(--transition);position:relative;overflow:hidden}.doc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--color-cyan) 0,var(--color-violet) 100%);transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.4, 0, .2, 1)}.doc-card:hover::before{transform:scaleX(1)}.doc-card:hover{transform:translateY(-8px);box-shadow:var(--shadow-brutal-lg)}.doc-card-highlight{background:linear-gradient(135deg,#fef3c7 0,#fcd34d 100%);border-color:var(--color-black)}.doc-card-highlight::before{background:linear-gradient(90deg,#f59e0b 0,#d97706 100%)}.doc-icon{font-size:3rem;margin-bottom:1.5rem;display:inline-block;animation:float 3s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.doc-title{font-size:1.5rem;font-weight:800;margin-bottom:1rem;color:var(--color-black)}.doc-description{font-size:1rem;color:var(--color-gray-600);line-height:1.6;margin-bottom:1.5rem}.doc-stats{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}.doc-stat{display:inline-block;padding:.5rem 1rem;background:var(--color-white);border:2px solid var(--color-black);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em}.doc-card-highlight .doc-stat{background:var(--color-white);border-color:#d97706}.doc-links{display:flex;gap:.75rem}.doc-link-docx,.doc-link-pdf,.doc-link-pdf-full{flex:1;padding:1rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;text-transform:uppercase;border:var(--border-width) solid var(--color-black);transition:var(--transition);cursor:pointer}.doc-link-pdf{background:#dc2626;color:var(--color-white)}.doc-link-pdf:hover{background:#991b1b;transform:translateY(-3px)}.doc-link-docx{background:#2563eb;color:var(--color-white)}.doc-link-docx:hover{background:#1e40af;transform:translateY(-3px)}.doc-link-pdf-full{background:#059669;color:var(--color-white)}.doc-link-pdf-full:hover{background:#047857;transform:translateY(-3px)}.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:2.5rem}.project-card{background:var(--color-white);border:var(--border-width) solid var(--color-black);overflow:hidden;transition:var(--transition)}.project-card:hover{transform:translate(-10px,-10px);box-shadow:var(--shadow-brutal-lg)}.project-header{height:200px;display:flex;align-items:center;justify-content:center;font-size:4rem;border-bottom:var(--border-width) solid var(--color-black)}.project-card:first-child .project-header{background:#fef3c7}.project-card:nth-child(2) .project-header{background:#ddd6fe}.project-card:nth-child(3) .project-header{background:#ccfbf1}.project-card:nth-child(4) .project-header{background:#fecaca}.project-card:nth-child(5) .project-header{background:#bfdbfe}.project-body{padding:2rem}.project-title{font-size:1.5rem;font-weight:800;margin-bottom:.75rem}.project-tech{font-size:.875rem;font-weight:600;color:var(--color-gray-600);margin-bottom:1rem}.project-description{font-size:1rem;color:var(--color-gray-600);line-height:1.6;margin-bottom:1.5rem}.project-links{display:flex;gap:1rem}.project-link{flex:1;padding:.875rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;border:var(--border-width) solid var(--color-black);transition:var(--transition)}.project-link-primary{background:var(--color-black);color:var(--color-white)}.project-link-primary:hover{background:var(--color-cyan)}.project-link-secondary{background:var(--color-white);color:var(--color-black)}.project-link-secondary:hover{background:var(--color-gray-100)}.contact-card{background:var(--color-black);color:var(--color-white);padding:4rem;border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal)}.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem}.contact-item{padding:2rem;background:var(--color-gray-900);border:2px solid var(--color-gray-800)}.contact-label{font-size:.875rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--color-gray-400);margin-bottom:.5rem}.contact-value{font-size:1.125rem;font-weight:600}.contact-value a{color:var(--color-white);text-decoration:none}.contact-value a:hover{color:var(--color-cyan)}.footer{padding:3rem 0;border-top:var(--border-width) solid var(--color-black);text-align:center}.footer-text{font-size:1rem;color:var(--color-gray-600)}@media (max-width:768px){.container{padding:0 1.5rem}.nav-container{padding:1rem 1.5rem}.nav-links{gap:1rem}.nav-link{font-size:.875rem;padding:.5rem}.hero{padding:6rem 0 3rem}.hero-badge{font-size:.75rem;padding:.625rem 1.25rem;margin-bottom:2rem}.hero-cta{flex-direction:column}.btn{width:100%;justify-content:center;padding:1rem 2rem;font-size:1rem}.section{padding:4rem 0}.section-header{margin-bottom:3rem}.stats-grid{grid-template-columns:1fr;gap:1.5rem}.stat-card{padding:2rem 1.5rem}.stat-number{font-size:3rem}.docs-grid{grid-template-columns:1fr;gap:1.5rem}.doc-card{padding:2rem 1.5rem}.doc-icon{font-size:2.5rem}.doc-title{font-size:1.25rem}.doc-links{flex-direction:column}.projects-grid{grid-template-columns:1fr;gap:2rem}.project-header{height:150px;font-size:3rem}.project-body{padding:1.5rem}.project-links{flex-direction:column}.contact-card{padding:2.5rem 1.5rem}.contact-grid{grid-template-columns:1fr;gap:1.5rem}.contact-item{padding:1.5rem}}@media (max-width:480px){.hero-title{font-size:2.5rem}.hero-subtitle{font-size:1.125rem}.section-title{font-size:2rem}.section-description{font-size:1rem}.stat-number{font-size:2.5rem}}</style></head><body><nav class="nav"><div class="nav-container"><a href="#" class="nav-logo">JC LEE</a><div class="nav-links"><a href="#documentation" class="nav-link">Docs</a> <a href="#projects" class="nav-link">Projects</a> <a href="#contact" class="nav-link">Contact</a></div></div></nav><section class="hero"><div class="container"><div class="hero-content"><div class="hero-badge">Infrastructure & Security Engineer</div><h1 class="hero-title">인프라·보안<br>엔지니어</h1><p class="hero-subtitle">8년 8개월 경력. 금융권 보안 인프라 구축 및 운영. 다수 보안 솔루션 통합 관리. Python 기반 업무 자동화. 프로덕션 시스템 운영 경험.</p><div class="hero-cta"><a href="#projects" class="btn btn-primary"><span>프로젝트 보기</span> <span>→</span> </a><a href="https://github.com/qws941/resume/raw/master/master/resume_final.md" download class="btn btn-secondary"><span>이력서 다운로드 (MD)</span> <span>↓</span></a></div></div></div></section><section class="section"><div class="container"><div class="stats-grid"><div class="stat-card"><div class="stat-number">8.8+</div><div class="stat-label">Years Experience</div></div><div class="stat-card"><div class="stat-number">15+</div><div class="stat-label">Security Solutions</div></div><div class="stat-card"><div class="stat-number">5+</div><div class="stat-label">Projects</div></div><div class="stat-card"><div class="stat-number">24/7</div><div class="stat-label">Operations</div></div></div></div></section><section class="section" id="documentation"><div class="container"><div class="section-header"><div class="section-badge">Technical Docs</div><h2 class="section-title">Nextrade Securities Exchange</h2><p class="section-description">다자간매매체결회사 보안 인프라 구축 및 운영. 보안 아키텍처 설계, 보안관제 체계, 재해복구 시스템.</p></div><div class="docs-grid"><div class="doc-card"><div class="doc-icon">🏗️</div><h3 class="doc-title">Architecture</h3><p class="doc-description">보안 아키텍처, 보안 솔루션 운영, 자동화 프레임워크</p><div class="doc-stats"><span class="doc-stat">Architecture</span> <span class="doc-stat">15+ Solutions</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🔄</div><h3 class="doc-title">Disaster Recovery</h3><p class="doc-description">재해복구 절차, RTO/RPO 목표 설정, 정기 테스트 수행</p><div class="doc-stats"><span class="doc-stat">DR Planning</span> <span class="doc-stat">Regular Tests</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🛡️</div><h3 class="doc-title">SOC Operations</h3><p class="doc-description">보안관제 운영, 이벤트 모니터링, 인시던트 대응 체계</p><div class="doc-stats"><span class="doc-stat">SOC Operations</span> <span class="doc-stat">Monitoring</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card doc-card-highlight"><div class="doc-icon">📦</div><h3 class="doc-title">Complete Package</h3><p class="doc-description">전체 기술 문서 통합본 (Architecture + DR + SOC)</p><div class="doc-stats"><span class="doc-stat">~33 pages</span> <span class="doc-stat">All-in-one</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/Nextrade_Full_Documentation.pdf" download class="doc-link-pdf-full">Complete PDF</a></div></div></div></div></section><section class="section" id="projects"><div class="container"><div class="section-header"><div class="section-badge">Portfolio</div><h2 class="section-title">Production Projects</h2><p class="section-description">실제 운영 중인 프로덕션 시스템. 모든 프로젝트는 퍼블릭 Grafana 대시보드에서 실시간 모니터링되며, 자동화된 CI/CD를 통해 관리됩니다.</p></div><div class="projects-grid"><div class="project-card"><div class="project-header">🔥</div><div class="project-body"><h3 class="project-title">Splunk-FortiNet Integration</h3><div class="project-tech">Node.js · Cloudflare Workers · DDD</div><p class="project-description">방화벽 중앙관리 플랫폼, 정책 검증 자동화, REST API 기반 통합</p><div class="project-links"><a href="https://splunk.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/splunk" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🏭</div><div class="project-body"><h3 class="project-title">SafeWork Industrial Health</h3><div class="project-tech">Flask · PostgreSQL · Cloudflare Workers</div><p class="project-description">산업보건 SaaS, Edge API 전국 동시접속 지원, 집계 오류 개선, 실시간 대시보드</p><div class="project-links"><a href="https://safework.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/safework" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🛡️</div><div class="project-body"><h3 class="project-title">REGTECH Threat Intelligence</h3><div class="project-tech">Flask · PostgreSQL · Claude AI</div><p class="project-description">금융보안원 위협정보 자동수집, AI 기반 CI/CD, Portainer API 자동배포</p><div class="project-links"><a href="https://blacklist.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🚀</div><div class="project-body"><h3 class="project-title">FortiGate Policy Orchestration</h3><div class="project-tech">Flask · FortiManager API · GitHub Actions</div><p class="project-description">방화벽 정책 자동배포, HA 구성 지원, RESTful API 기반 오케스트레이션</p><div class="project-links"><a href="https://fortinet.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">📊</div><div class="project-body"><h3 class="project-title">Public Grafana Dashboard</h3><div class="project-tech">Grafana · Prometheus · Loki · Tempo · PUBLIC</div><p class="project-description">퍼블릭 접근 가능한 실시간 모니터링, 13개 서비스 통합, 메트릭·로그·트레이스, 안정적 운영</p><div class="project-links"><a href="https://grafana.jclee.me" target="_blank" class="project-link project-link-primary">Public Dashboard</a> <a href="https://github.com/qws941/grafana" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div></div></div></section><section class="section" id="contact"><div class="container"><div class="section-header"><div class="section-badge">Get In Touch</div><h2 class="section-title">Let's Work Together</h2><p class="section-description">인프라 자동화, 보안 아키텍처, DevOps 전환에 대해 논의하고 싶으신가요? 연락주세요.</p></div><div class="contact-card"><div class="contact-grid"><div class="contact-item"><div class="contact-label">Email</div><div class="contact-value"><a href="mailto:qws941@kakao.com">qws941@kakao.com</a></div></div><div class="contact-item"><div class="contact-label">Phone</div><div class="contact-value"><a href="tel:010-5757-9592">010-5757-9592</a></div></div><div class="contact-item"><div class="contact-label">GitHub</div><div class="contact-value"><a href="https://github.com/qws941" target="_blank">github.com/qws941</a></div></div><div class="contact-item"><div class="contact-label">Website</div><div class="contact-value"><a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a></div></div></div></div></div></section><footer class="footer"><div class="container"><p class="footer-text">© 2025 Jaecheol Lee. All rights reserved.</p></div></footer><script>document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();const t=document.querySelector(this.getAttribute("href"));if(t){const e=80,o=t.getBoundingClientRect().top+window.pageYOffset-e;window.scrollTo({top:o,behavior:"smooth"})}})});const nav=document.querySelector(".nav");let lastScroll=0;window.addEventListener("scroll",()=>{const e=window.pageYOffset;nav.style.boxShadow=e>100?"var(--shadow-brutal)":"none",lastScroll=e})</script></body></html>`;
const RESUME_HTML = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>이재철 - 이력서 | Infrastructure & Security Engineer</title><meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어 이재철의 상세 이력서. 금융·교육·제조 산업 프로덕션 운영 경험."><meta name="robots" content="index, follow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}:root{--color-black:#000000;--color-white:#ffffff;--color-gray-50:#fafafa;--color-gray-100:#f5f5f5;--color-gray-200:#e5e5e5;--color-gray-600:#525252;--color-gray-900:#171717;--color-cyan:#06b6d4;--font-sans:'Inter',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;--shadow-brutal:6px 6px 0 var(--color-black);--border-width:3px;--transition:all 0.15s cubic-bezier(0.4, 0, 0.2, 1)}body{font-family:var(--font-sans);line-height:1.5;color:var(--color-black);background:var(--color-white);-webkit-font-smoothing:antialiased}.nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--color-white);border-bottom:var(--border-width) solid var(--color-black)}.nav-container{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;max-width:1200px;margin:0 auto}.nav-logo{font-size:1.5rem;font-weight:900;color:var(--color-black);text-decoration:none}.nav-back{padding:.75rem 1.5rem;background:var(--color-black);color:var(--color-white);text-decoration:none;font-size:.875rem;font-weight:700;border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);transition:var(--transition)}.nav-back:hover{transform:translate(6px,6px);box-shadow:none}.resume-container{max-width:1100px;margin:0 auto;padding:120px 2rem 4rem}.resume-header{background:var(--color-cyan);border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);padding:4rem 3rem;margin-bottom:3rem}.resume-name{font-size:4rem;font-weight:900;line-height:1;margin-bottom:1rem}.resume-title{font-size:1.5rem;font-weight:600;margin-bottom:2rem}.resume-contact{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;font-size:.95rem;font-weight:600}.contact-item a{color:var(--color-black);text-decoration:none}.contact-item a:hover{text-decoration:underline}.section{margin-bottom:3rem}.section-title{font-size:2rem;font-weight:900;margin-bottom:2rem;display:inline-block;padding:.75rem 1.5rem;background:var(--color-black);color:var(--color-white);border:var(--border-width) solid var(--color-black)}.summary-text{font-size:1.125rem;line-height:1.7;padding:2rem;background:var(--color-gray-100);border:var(--border-width) solid var(--color-black);border-left:8px solid var(--color-black)}.experience-item{background:var(--color-white);border:var(--border-width) solid var(--color-black);padding:2.5rem;margin-bottom:2rem;transition:var(--transition)}.experience-item:hover{transform:translate(-6px,-6px);box-shadow:var(--shadow-brutal)}.experience-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;flex-wrap:wrap;gap:1rem}.company-name{font-size:1.5rem;font-weight:900}.period{font-size:.875rem;font-weight:700;padding:.5rem 1rem;background:var(--color-black);color:var(--color-white)}.role{font-size:1rem;font-weight:600;color:var(--color-gray-600);margin-bottom:1.5rem}.achievement{background:var(--color-gray-50);border-left:4px solid var(--color-cyan);padding:1rem 1.5rem;margin:.75rem 0;font-size:.95rem;font-weight:500;line-height:1.6}.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem}.project-card{background:var(--color-white);border:var(--border-width) solid var(--color-black);padding:2rem;transition:var(--transition)}.project-card:hover{transform:translate(-6px,-6px);box-shadow:var(--shadow-brutal)}.project-name{font-size:1.25rem;font-weight:800;margin-bottom:.5rem}.project-tech{font-size:.875rem;font-weight:700;color:var(--color-cyan);margin-bottom:1rem}.project-description{font-size:.95rem;line-height:1.6;color:var(--color-gray-600);margin-bottom:1.5rem}.project-links{display:flex;gap:1rem}.project-link{flex:1;padding:.75rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;border:var(--border-width) solid var(--color-black);transition:var(--transition)}.project-link:first-child{background:var(--color-black);color:var(--color-white)}.project-link:first-child:hover{background:var(--color-cyan)}.project-link:last-child{background:var(--color-white);color:var(--color-black)}.project-link:last-child:hover{background:var(--color-gray-100)}.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2rem}.skill-category{background:var(--color-white);border:var(--border-width) solid var(--color-black);padding:2rem}.skill-category-title{font-size:1.25rem;font-weight:800;margin-bottom:1.5rem}.skill-tags{display:flex;flex-wrap:wrap;gap:.75rem}.skill-tag{padding:.5rem 1rem;background:var(--color-gray-100);font-size:.875rem;font-weight:600;border:2px solid var(--color-black);transition:var(--transition);cursor:pointer}.skill-tag:hover{background:var(--color-black);color:var(--color-white);transform:translateY(-2px)}.docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem}.doc-card{background:linear-gradient(135deg,var(--color-white) 0,var(--color-gray-50) 100%);border:var(--border-width) solid var(--color-black);padding:2.5rem;transition:var(--transition);position:relative;overflow:hidden}.doc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--color-cyan) 0,#8b5cf6 100%);transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.4, 0, .2, 1)}.doc-card:hover{transform:translate(-6px,-6px);box-shadow:var(--shadow-brutal)}.doc-card:hover::before{transform:scaleX(1)}.doc-icon{font-size:3rem;margin-bottom:1.5rem;display:inline-block;animation:float 3s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.doc-title{font-size:1.5rem;font-weight:800;margin-bottom:1rem}.doc-description{font-size:.95rem;line-height:1.6;color:var(--color-gray-600);margin-bottom:1.5rem}.doc-stats{display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap}.doc-stat{font-size:.875rem;font-weight:700;padding:.5rem 1rem;background:var(--color-gray-100);border:2px solid var(--color-black)}.doc-links{display:flex;gap:1rem}.doc-link-docx,.doc-link-pdf,.doc-link-pdf-full{flex:1;padding:.75rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;color:var(--color-white);border:var(--border-width) solid var(--color-black);transition:var(--transition)}.doc-link-pdf{background:#dc2626}.doc-link-pdf:hover{background:#b91c1c;transform:translateY(-2px)}.doc-link-docx{background:#2563eb}.doc-link-docx:hover{background:#1d4ed8;transform:translateY(-2px)}.doc-link-pdf-full{background:#059669}.doc-link-pdf-full:hover{background:#047857;transform:translateY(-2px)}.doc-card:last-child{background:linear-gradient(135deg,#fef3c7 0,#fde68a 100%)}.cert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem}.cert-item{background:var(--color-gray-100);border:var(--border-width) solid var(--color-black);padding:1.5rem;display:flex;justify-content:space-between;align-items:center;transition:var(--transition)}.cert-item:hover{background:var(--color-black);color:var(--color-white)}.cert-name{font-weight:700}.cert-date{font-size:.875rem;font-weight:600}@media (max-width:768px){.resume-container{padding:100px 1.5rem 3rem}.nav-container{padding:1rem 1.5rem}.resume-header{padding:2.5rem 2rem}.resume-name{font-size:2.5rem}.resume-title{font-size:1.125rem}.resume-contact{grid-template-columns:1fr;gap:.75rem}.section-title{font-size:1.5rem}.experience-header{flex-direction:column;gap:.5rem}.company-name{font-size:1.25rem}.docs-grid,.projects-grid,.skills-grid{grid-template-columns:1fr}.cert-grid{grid-template-columns:1fr}}@media print{.nav{display:none}.resume-container{padding-top:0}.experience-item,.project-card,.skill-category{break-inside:avoid;page-break-inside:avoid}}</style></head><body><nav class="nav"><div class="nav-container"><a href="index.html" class="nav-logo">JC LEE</a> <a href="index.html" class="nav-back">← Back</a></div></nav><div class="resume-container"><header class="resume-header"><h1 class="resume-name">이재철 (Jaecheol Lee)</h1><p class="resume-title">인프라·보안 엔지니어 | 8년 8개월 경력</p><div class="resume-contact"><div class="contact-item">📧 <a href="mailto:qws941@kakao.com">qws941@kakao.com</a></div><div class="contact-item">📱 <a href="tel:010-5757-9592">010-5757-9592</a></div><div class="contact-item">💼 <a href="https://github.com/qws941" target="_blank">github.com/qws941</a></div><div class="contact-item">🌐 <a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a></div></div></header><section class="section"><h2 class="section-title">Professional Summary</h2><div class="summary-text">8년 8개월 경력의 인프라·보안 엔지니어입니다. 금융권 보안 아키텍처 설계 및 보안관제 운영 경험을 보유하고 있으며, Python 기반 자동화를 통한 운영 효율화를 전문으로 합니다. 다수의 보안 솔루션 통합 운영 및 컴플라이언스 관리 경험이 있습니다.</div></section><section class="section"><h2 class="section-title">Experience</h2><div class="experience-item"><div class="experience-header"><h3 class="company-name">㈜아이티센 CTS</h3><span class="period">2025.03 - 현재 (8개월)</span></div><p class="role">정보보안 운영 엔지니어 | Nextrade(다자간매매체결회사) 운영SM</p><div class="achievement">보안 솔루션 운영: 시스템보안 / 네트워크보안 / 엔드포인트보안</div><div class="achievement">보안 이벤트 모니터링 및 인시던트 대응</div><div class="achievement">재해복구 사이트 관리 및 테스트</div><div class="achievement">금융감독원 정기 감사 대응</div></div><div class="experience-item"><div class="experience-header"><h3 class="company-name">㈜가온누리정보시스템</h3><span class="period">2024.03 - 2025.02 (11개월)</span></div><p class="role">프리랜서 인프라 엔지니어 | Nextrade(다자간매매체결회사) 구축 프로젝트</p><div class="achievement">보안 아키텍처 설계 및 망분리 환경 구축</div><div class="achievement">보안 솔루션 도입: 시스템보안 / 네트워크보안 / 엔드포인트보안</div><div class="achievement">자동화 개발: Python 기반 방화벽/NAC/DLP 정책 관리 프레임워크 구축</div><div class="achievement">다자간매매체결회사 사전인가 / 본인가 지원(정보보안)</div></div><div class="experience-item"><div class="experience-header"><h3 class="company-name">㈜콴텍투자일임</h3><span class="period">2022.08 - 2024.03 (1년 7개월)</span></div><p class="role">인프라 엔지니어 | AI 기반 주식투자 서비스 FSDC 운영</p><div class="achievement">금융보안데이터센터(FSDC) 운영: 망분리 환경 DLP/DB 접근제어/VPN 정책 관리</div><div class="achievement">Python 기반 운영 자동화: 반복 작업 자동화 스크립트 개발 및 적용</div><div class="achievement">성능 최적화: DB 접근제어 쿼리 튜닝 수행</div><div class="achievement">컴플라이언스: 금융감독원 정기 감사 대응, 개인정보 보호 체계 운영</div></div><div class="experience-item"><div class="experience-header"><h3 class="company-name">㈜메타넷엠플랫폼</h3><span class="period">2019.12 - 2021.08 (1년 9개월)</span></div><p class="role">인프라 엔지니어 | 대규모 콜센터 인프라</p><div class="achievement">재택근무 인프라 구축: SSL VPN, NAC 솔루션 통합</div><div class="achievement">Python 자동화: 네트워크 스위치 점검 시스템 개발</div><div class="achievement">Ansible 기반 정책 자동 배포: NAC 예외정책 자동화</div><div class="achievement">신규 사이트 네트워크 설계 및 구축</div></div></section><section class="section"><h2 class="section-title">Technical Documentation</h2><div class="docs-grid"><div class="doc-card"><div class="doc-icon">🏗️</div><h3 class="doc-title">Architecture</h3><p class="doc-description">보안 아키텍처, 보안 솔루션, 자동화 프레임워크</p><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🔄</div><h3 class="doc-title">Disaster Recovery</h3><p class="doc-description">재해 시나리오, 백업/복구 절차</p><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🛡️</div><h3 class="doc-title">보안관제 운영</h3><p class="doc-description">보안관제, 대응 플레이북, SIEM 대시보드</p><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">📦</div><h3 class="doc-title">Complete Package</h3><p class="doc-description">전체 기술 문서 통합본 (아키텍처 + 재해복구 + 보안관제)</p><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/Nextrade_Full_Documentation.pdf" download class="doc-link-pdf-full">Download PDF</a></div></div></div></section><section class="section"><h2 class="section-title">Key Projects</h2><div class="projects-grid"><div class="project-card"><h3 class="project-name">보안 통합 관리 플랫폼</h3><div class="project-tech">Node.js · Cloudflare Workers · REST API · Webhook</div><p class="project-description">방화벽 중앙관리 플랫폼 개발, 정책 검증 자동화</p><div class="project-links"><a href="https://splunk.jclee.me" target="_blank" class="project-link">Live Demo</a> <a href="https://github.com/qws941/splunk" target="_blank" class="project-link">Source Code</a></div></div><div class="project-card"><h3 class="project-name">SafeWork Industrial Health Platform</h3><div class="project-tech">Flask 3.0 · PostgreSQL 15 · Redis 7 · Cloudflare Workers</div><p class="project-description">산업보건 설문조사 SaaS 플랫폼, Edge API 기반 설문 시스템, 종이 설문 디지털화</p><div class="project-links"><a href="https://safework.jclee.me" target="_blank" class="project-link">Live Demo</a> <a href="https://github.com/qws941/safework" target="_blank" class="project-link">Source Code</a></div></div></div></section><section class="section"><h2 class="section-title">Technical Skills</h2><div class="skills-grid"><div class="skill-category"><h3 class="skill-category-title">🛡️ Security</h3><div class="skill-tags"><span class="skill-tag">방화벽</span> <span class="skill-tag">WAF</span> <span class="skill-tag">IPS/IDS</span> <span class="skill-tag">SIEM</span> <span class="skill-tag">NAC</span> <span class="skill-tag">DLP</span> <span class="skill-tag">VPN</span> <span class="skill-tag">EDR</span></div></div><div class="skill-category"><h3 class="skill-category-title">☁️ Cloud & Container</h3><div class="skill-tags"><span class="skill-tag">AWS</span> <span class="skill-tag">Docker</span> <span class="skill-tag">Kubernetes</span> <span class="skill-tag">VMware vSphere/NSX-T</span></div></div><div class="skill-category"><h3 class="skill-category-title">⚙️ Automation</h3><div class="skill-tags"><span class="skill-tag">Python</span> <span class="skill-tag">Shell Script</span> <span class="skill-tag">Ansible</span> <span class="skill-tag">Terraform</span> <span class="skill-tag">GitHub Actions</span></div></div><div class="skill-category"><h3 class="skill-category-title">📊 Monitoring</h3><div class="skill-tags"><span class="skill-tag">Grafana</span> <span class="skill-tag">Prometheus</span> <span class="skill-tag">Loki</span> <span class="skill-tag">Tempo</span> <span class="skill-tag">ELK Stack</span></div></div></div></section><section class="section"><h2 class="section-title">Certifications & Education</h2><div class="cert-grid"><div class="cert-item"><span class="cert-name">CCNP</span> <span class="cert-date">2020.08</span></div><div class="cert-item"><span class="cert-name">RHCSA</span> <span class="cert-date">2019.01</span></div><div class="cert-item"><span class="cert-name">CompTIA Linux+</span> <span class="cert-date">2019.02</span></div><div class="cert-item"><span class="cert-name">LPIC Level 1</span> <span class="cert-date">2019.02</span></div></div><p style="margin-top:1.5rem;font-size:.95rem;color:var(--color-gray-600)"><strong>Education:</strong> 한양사이버대학교 컴퓨터공학과 (2024.03 ~ 재학중)</p></section></div></body></html>`;

// Version and deployment info
const VERSION = '1.0.0';
const DEPLOYED_AT = '2025-10-19T13:39:31.112Z';

// CSP directives (generated at build time from inline content hashes)
const CSP_SCRIPT_SRC = `'self' 'sha256-iFJNDDNbNZiWOAUkW7PuqLIL2dJ5KjTo6XjvDlguY4M='`;
const CSP_STYLE_SRC = `'self' 'sha256-G8WkXniLxaEhcs2VcblhXST+GjiOTfk26BYRfaiAzF4=' 'sha256-q6rsB0MoFTxiLEDq5AG7jRnLgHPzmdeu0oZExlQxkVU=' https://fonts.googleapis.com`;

// Metrics storage (in-memory, per-worker instance)
const metrics = {
  requests_total: 0,
  requests_success: 0,
  requests_error: 0,
  response_time_sum: 0,
  vitals_received: 0,
};

// Security headers with SHA-256 hashes (NO unsafe-inline)
const SECURITY_HEADERS = {
  'Content-Type': 'text/html;charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': `default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src ${CSP_STYLE_SRC}; script-src ${CSP_SCRIPT_SRC}; img-src 'self' data:; connect-src 'self' https://grafana.jclee.me`,
};

// Route mapping for scalability
const ROUTES = {
  '/': INDEX_HTML,
  '/resume': RESUME_HTML,
};

/**
 * Log to Grafana Loki
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - Log message
 * @param {Object} labels - Additional Loki labels
 */
async function logToLoki(level, message, labels = {}) {
  const lokiUrl = 'https://grafana.jclee.me/loki/api/v1/push';

  const payload = {
    streams: [
      {
        stream: {
          job: 'resume-worker',
          level: level,
          ...labels,
        },
        values: [
          [String(Date.now() * 1000000), message],
        ],
      },
    ],
  };

  try {
    await fetch(lokiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Silently fail - don't block request if Loki is unavailable
    console.error('Loki logging failed:', error);
  }
}

/**
 * Generate Prometheus metrics in exposition format
 */
function generateMetrics() {
  const avgResponseTime = metrics.requests_total > 0
    ? (metrics.response_time_sum / metrics.requests_total).toFixed(2)
    : 0;

  return `# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{job="resume"} ${metrics.requests_total}

# HELP http_requests_success Successful HTTP requests
# TYPE http_requests_success counter
http_requests_success{job="resume"} ${metrics.requests_success}

# HELP http_requests_error Failed HTTP requests
# TYPE http_requests_error counter
http_requests_error{job="resume"} ${metrics.requests_error}

# HELP http_response_time_seconds Average response time
# TYPE http_response_time_seconds gauge
http_response_time_seconds{job="resume"} ${avgResponseTime}

# HELP web_vitals_received Total Web Vitals data points received
# TYPE web_vitals_received counter
web_vitals_received{job="resume"} ${metrics.vitals_received}
`;
}

/**
 * Handle /health endpoint
 */
function handleHealth() {
  const health = {
    status: 'healthy',
    version: VERSION,
    deployed_at: DEPLOYED_AT,
    uptime_seconds: Math.floor((Date.now() - new Date(DEPLOYED_AT).getTime()) / 1000),
    metrics: {
      requests_total: metrics.requests_total,
      requests_success: metrics.requests_success,
      requests_error: metrics.requests_error,
      vitals_received: metrics.vitals_received,
    },
  };

  return new Response(JSON.stringify(health, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
}

/**
 * Handle /metrics endpoint
 */
function handleMetrics() {
  return new Response(generateMetrics(), {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4',
      'Cache-Control': 'no-cache',
    },
  });
}

/**
 * Handle /api/vitals endpoint (POST - Web Vitals data)
 */
async function handleVitals(request) {
  try {
    const vitals = await request.json();
    metrics.vitals_received++;

    // Fire-and-forget Loki logging (non-blocking)
    logToLoki('INFO', JSON.stringify({
      event: 'web_vitals',
      vitals: vitals,
    }), {
      metric_type: 'web_vitals',
    }).catch(err => console.error('Loki vitals logging failed:', err));

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    metrics.requests_error++;
    return new Response(JSON.stringify({ error: 'Invalid vitals data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default {
  async fetch(request) {
    const startTime = Date.now();
    const url = new URL(request.url);
    metrics.requests_total++;

    try {
      // Route handling
      if (url.pathname === '/health') {
        metrics.requests_success++;
        return handleHealth();
      }

      if (url.pathname === '/metrics') {
        metrics.requests_success++;
        return handleMetrics();
      }

      if (url.pathname === '/api/vitals' && request.method === 'POST') {
        const response = await handleVitals(request);
        if (response.status === 200) {
          metrics.requests_success++;
        }
        return response;
      }

      // Static content routes
      const content = ROUTES[url.pathname] || INDEX_HTML;
      metrics.requests_success++;

      // Create response immediately (don't await Loki logging)
      const response = new Response(content, {
        headers: SECURITY_HEADERS,
      });

      // Track response time AFTER creating response
      const responseTime = Date.now() - startTime;
      metrics.response_time_sum += responseTime;

      // Fire-and-forget Loki logging (non-blocking)
      logToLoki('INFO', JSON.stringify({
        event: 'request',
        path: url.pathname,
        method: request.method,
        response_time_ms: responseTime,
      }), {
        path: url.pathname,
        method: request.method,
      }).catch(err => console.error('Loki logging failed:', err));

      return response;
    } catch (error) {
      metrics.requests_error++;

      // Fire-and-forget error logging (non-blocking)
      logToLoki('ERROR', JSON.stringify({
        event: 'error',
        path: url.pathname,
        error: error.message,
      }), {
        path: url.pathname,
        error_type: 'internal',
      }).catch(err => console.error('Loki error logging failed:', err));

      return new Response('Internal Server Error', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  },
};
