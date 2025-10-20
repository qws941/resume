// Cloudflare Worker - Auto-generated
const INDEX_HTML = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>이재철 - Infrastructure & Security Engineer</title><meta name="description" content="8년 8개월 경력 인프라·보안 엔지니어. 금융·제조 산업 인프라 운영 및 보안 솔루션 관리 경험."><meta name="robots" content="index, follow"><link rel="canonical" href="https://resume.jclee.me"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}:root{--color-black:#000000;--color-white:#ffffff;--color-gray-50:#fafafa;--color-gray-100:#f5f5f5;--color-gray-200:#e5e5e5;--color-gray-300:#d4d4d4;--color-gray-400:#a3a3a3;--color-gray-500:#737373;--color-gray-600:#525252;--color-gray-700:#404040;--color-gray-800:#262626;--color-gray-900:#171717;--color-cyan:#06b6d4;--color-cyan-dark:#0891b2;--color-violet:#8b5cf6;--color-violet-dark:#7c3aed;--font-sans:'Inter',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;--shadow-brutal:6px 6px 0 var(--color-black);--shadow-brutal-lg:10px 10px 0 var(--color-black);--border-width:3px;--border-radius:0;--transition:all 0.15s cubic-bezier(0.4, 0, 0.2, 1)}html{scroll-behavior:smooth}body{font-family:var(--font-sans);line-height:1.5;color:var(--color-black);background:var(--color-white);-webkit-font-smoothing:antialiased;overflow-x:hidden}.container{max-width:1400px;margin:0 auto;padding:0 2rem}.nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--color-white);border-bottom:var(--border-width) solid var(--color-black)}.nav-container{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2rem;max-width:1400px;margin:0 auto}.nav-logo{font-size:1.5rem;font-weight:900;color:var(--color-black);text-decoration:none;letter-spacing:-.05em}.nav-links{display:flex;gap:2rem;align-items:center}.nav-link{font-size:1rem;font-weight:600;color:var(--color-black);text-decoration:none;transition:var(--transition);padding:.5rem 1rem}.nav-link:hover{color:var(--color-cyan)}.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 0 4rem;position:relative}.hero-content{max-width:900px}.hero-badge{display:inline-block;padding:.75rem 1.5rem;background:var(--color-cyan);color:var(--color-white);font-size:.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);margin-bottom:3rem}.hero-title{font-size:clamp(3rem, 10vw, 7rem);font-weight:900;line-height:1;letter-spacing:-.04em;margin-bottom:2rem}.hero-subtitle{font-size:clamp(1.25rem, 3vw, 2rem);font-weight:400;color:var(--color-gray-600);margin-bottom:3rem;line-height:1.4}.hero-cta{display:flex;gap:1.5rem;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;gap:.75rem;padding:1.25rem 2.5rem;font-size:1.125rem;font-weight:700;text-decoration:none;border:var(--border-width) solid var(--color-black);transition:var(--transition);cursor:pointer;white-space:nowrap}.btn-primary{background:var(--color-black);color:var(--color-white);box-shadow:var(--shadow-brutal)}.btn-primary:hover{transform:translate(6px,6px);box-shadow:none}.btn-secondary{background:var(--color-white);color:var(--color-black);box-shadow:var(--shadow-brutal)}.btn-secondary:hover{transform:translate(6px,6px);box-shadow:none}.section{padding:6rem 0}.section-header{margin-bottom:4rem}.section-badge{display:inline-block;padding:.5rem 1rem;background:var(--color-gray-100);border:var(--border-width) solid var(--color-black);font-size:.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:1.5rem}.section-title{font-size:clamp(2.5rem, 6vw, 4rem);font-weight:900;line-height:1.1;letter-spacing:-.03em;margin-bottom:1.5rem}.section-description{font-size:1.25rem;color:var(--color-gray-600);max-width:700px}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem}.stat-card{padding:3rem 2rem;background:var(--color-white);border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal);transition:var(--transition)}.stat-card:hover{transform:translate(-6px,-6px);box-shadow:var(--shadow-brutal-lg)}.stat-number{font-size:4rem;font-weight:900;line-height:1;color:var(--color-cyan);margin-bottom:.5rem}.stat-label{font-size:1.125rem;font-weight:600;color:var(--color-black)}.docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;margin-top:3rem}.doc-card{background:linear-gradient(135deg,var(--color-white) 0,var(--color-gray-50) 100%);border:var(--border-width) solid var(--color-black);padding:2.5rem;transition:var(--transition);position:relative;overflow:hidden}.doc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--color-cyan) 0,var(--color-violet) 100%);transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.4, 0, .2, 1)}.doc-card:hover::before{transform:scaleX(1)}.doc-card:hover{transform:translateY(-8px);box-shadow:var(--shadow-brutal-lg)}.doc-card-highlight{background:linear-gradient(135deg,#fef3c7 0,#fcd34d 100%);border-color:var(--color-black)}.doc-card-highlight::before{background:linear-gradient(90deg,#f59e0b 0,#d97706 100%)}.doc-icon{font-size:3rem;margin-bottom:1.5rem;display:inline-block;animation:float 3s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.doc-title{font-size:1.5rem;font-weight:800;margin-bottom:1rem;color:var(--color-black)}.doc-description{font-size:1rem;color:var(--color-gray-600);line-height:1.6;margin-bottom:1.5rem}.doc-stats{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}.doc-stat{display:inline-block;padding:.5rem 1rem;background:var(--color-white);border:2px solid var(--color-black);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em}.doc-card-highlight .doc-stat{background:var(--color-white);border-color:#d97706}.doc-links{display:flex;gap:.75rem}.doc-link-docx,.doc-link-pdf,.doc-link-pdf-full{flex:1;padding:1rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;text-transform:uppercase;border:var(--border-width) solid var(--color-black);transition:var(--transition);cursor:pointer}.doc-link-pdf{background:#dc2626;color:var(--color-white)}.doc-link-pdf:hover{background:#991b1b;transform:translateY(-3px)}.doc-link-docx{background:#2563eb;color:var(--color-white)}.doc-link-docx:hover{background:#1e40af;transform:translateY(-3px)}.doc-link-pdf-full{background:#059669;color:var(--color-white)}.doc-link-pdf-full:hover{background:#047857;transform:translateY(-3px)}.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:2.5rem}.project-card{background:var(--color-white);border:var(--border-width) solid var(--color-black);overflow:hidden;transition:var(--transition)}.project-card:hover{transform:translate(-10px,-10px);box-shadow:var(--shadow-brutal-lg)}.project-header{height:200px;display:flex;align-items:center;justify-content:center;font-size:4rem;border-bottom:var(--border-width) solid var(--color-black)}.project-card:first-child .project-header{background:#fef3c7}.project-card:nth-child(2) .project-header{background:#ddd6fe}.project-card:nth-child(3) .project-header{background:#ccfbf1}.project-card:nth-child(4) .project-header{background:#fecaca}.project-card:nth-child(5) .project-header{background:#bfdbfe}.project-body{padding:2rem}.project-title{font-size:1.5rem;font-weight:800;margin-bottom:.75rem}.project-tech{font-size:.875rem;font-weight:600;color:var(--color-gray-600);margin-bottom:1rem}.project-description{font-size:1rem;color:var(--color-gray-600);line-height:1.6;margin-bottom:1.5rem}.project-links{display:flex;gap:1rem}.project-link{flex:1;padding:.875rem;text-align:center;text-decoration:none;font-size:.875rem;font-weight:700;border:var(--border-width) solid var(--color-black);transition:var(--transition)}.project-link-primary{background:var(--color-black);color:var(--color-white)}.project-link-primary:hover{background:var(--color-cyan)}.project-link-secondary{background:var(--color-white);color:var(--color-black)}.project-link-secondary:hover{background:var(--color-gray-100)}.contact-card{background:var(--color-black);color:var(--color-white);padding:4rem;border:var(--border-width) solid var(--color-black);box-shadow:var(--shadow-brutal)}.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem}.contact-item{padding:2rem;background:var(--color-gray-900);border:2px solid var(--color-gray-800)}.contact-label{font-size:.875rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--color-gray-400);margin-bottom:.5rem}.contact-value{font-size:1.125rem;font-weight:600}.contact-value a{color:var(--color-white);text-decoration:none}.contact-value a:hover{color:var(--color-cyan)}.footer{padding:3rem 0;border-top:var(--border-width) solid var(--color-black);text-align:center}.footer-text{font-size:1rem;color:var(--color-gray-600)}@media (max-width:768px){.container{padding:0 1.5rem}.nav-container{padding:1rem 1.5rem}.nav-links{gap:1rem}.nav-link{font-size:.875rem;padding:.5rem}.hero{padding:6rem 0 3rem}.hero-badge{font-size:.75rem;padding:.625rem 1.25rem;margin-bottom:2rem}.hero-cta{flex-direction:column}.btn{width:100%;justify-content:center;padding:1rem 2rem;font-size:1rem}.section{padding:4rem 0}.section-header{margin-bottom:3rem}.stats-grid{grid-template-columns:1fr;gap:1.5rem}.stat-card{padding:2rem 1.5rem}.stat-number{font-size:3rem}.docs-grid{grid-template-columns:1fr;gap:1.5rem}.doc-card{padding:2rem 1.5rem}.doc-icon{font-size:2.5rem}.doc-title{font-size:1.25rem}.doc-links{flex-direction:column}.projects-grid{grid-template-columns:1fr;gap:2rem}.project-header{height:150px;font-size:3rem}.project-body{padding:1.5rem}.project-links{flex-direction:column}.contact-card{padding:2.5rem 1.5rem}.contact-grid{grid-template-columns:1fr;gap:1.5rem}.contact-item{padding:1.5rem}}@media (max-width:480px){.hero-title{font-size:2.5rem}.hero-subtitle{font-size:1.125rem}.section-title{font-size:2rem}.section-description{font-size:1rem}.stat-number{font-size:2.5rem}}</style></head><body><nav class="nav"><div class="nav-container"><a href="#" class="nav-logo">JC LEE</a><div class="nav-links"><a href="#documentation" class="nav-link">Docs</a> <a href="#projects" class="nav-link">Projects</a> <a href="#contact" class="nav-link">Contact</a></div></div></nav><section class="hero"><div class="container"><div class="hero-content"><div class="hero-badge">Infrastructure & Security Engineer</div><h1 class="hero-title">인프라·보안<br>엔지니어</h1><p class="hero-subtitle">8년 8개월 경력. 금융권 보안 인프라 구축 및 운영. 다수 보안 솔루션 통합 관리. Python 기반 업무 자동화. 프로덕션 시스템 운영 경험.</p><div class="hero-cta"><a href="#projects" class="btn btn-primary"><span>프로젝트 보기</span> <span>→</span> </a><a href="https://github.com/qws941/resume/raw/master/master/resume_final.md" download class="btn btn-secondary"><span>이력서 다운로드 (MD)</span> <span>↓</span></a></div></div></div></section><section class="section"><div class="container"><div class="stats-grid"><div class="stat-card"><div class="stat-number">8.8+</div><div class="stat-label">Years Experience</div></div><div class="stat-card"><div class="stat-number">15+</div><div class="stat-label">Security Solutions</div></div><div class="stat-card"><div class="stat-number">5+</div><div class="stat-label">Projects</div></div><div class="stat-card"><div class="stat-number">24/7</div><div class="stat-label">Operations</div></div></div></div></section><section class="section" id="documentation"><div class="container"><div class="section-header"><div class="section-badge">Technical Docs</div><h2 class="section-title">Nextrade Securities Exchange</h2><p class="section-description">다자간매매체결회사 보안 인프라 구축 및 운영. 보안 아키텍처 설계, 보안관제 체계, 재해복구 시스템.</p></div><div class="docs-grid"><div class="doc-card"><div class="doc-icon">🏗️</div><h3 class="doc-title">Architecture</h3><p class="doc-description">보안 아키텍처, 보안 솔루션 운영, 자동화 프레임워크</p><div class="doc-stats"><span class="doc-stat">Architecture</span> <span class="doc-stat">15+ Solutions</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/ARCHITECTURE_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🔄</div><h3 class="doc-title">Disaster Recovery</h3><p class="doc-description">재해복구 절차, RTO/RPO 목표 설정, 정기 테스트 수행</p><div class="doc-stats"><span class="doc-stat">DR Planning</span> <span class="doc-stat">Regular Tests</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/DR_PLAN_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card"><div class="doc-icon">🛡️</div><h3 class="doc-title">SOC Operations</h3><p class="doc-description">보안관제 운영, 이벤트 모니터링, 인시던트 대응 체계</p><div class="doc-stats"><span class="doc-stat">SOC Operations</span> <span class="doc-stat">Monitoring</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.pdf" download class="doc-link-pdf">PDF</a> <a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/SOC_RUNBOOK_COMPACT.docx" download class="doc-link-docx">DOCX</a></div></div><div class="doc-card doc-card-highlight"><div class="doc-icon">📦</div><h3 class="doc-title">Complete Package</h3><p class="doc-description">전체 기술 문서 통합본 (Architecture + DR + SOC)</p><div class="doc-stats"><span class="doc-stat">~33 pages</span> <span class="doc-stat">All-in-one</span></div><div class="doc-links"><a href="https://github.com/qws941/resume/raw/master/resume/nextrade/exports/Nextrade_Full_Documentation.pdf" download class="doc-link-pdf-full">Complete PDF</a></div></div></div></div></section><section class="section" id="projects"><div class="container"><div class="section-header"><div class="section-badge">Portfolio</div><h2 class="section-title">Production Projects</h2><p class="section-description">실제 운영 중인 프로덕션 시스템. 모든 프로젝트는 퍼블릭 Grafana 대시보드에서 실시간 모니터링되며, 자동화된 CI/CD를 통해 관리됩니다.</p></div><div class="projects-grid"><div class="project-card"><div class="project-header">🔥</div><div class="project-body"><h3 class="project-title">Splunk-FortiNet Integration</h3><div class="project-tech">Node.js · Cloudflare Workers · DDD</div><p class="project-description">방화벽 중앙관리 플랫폼, 정책 검증 자동화, REST API 기반 통합</p><div class="project-links"><a href="https://splunk.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/splunk" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🏭</div><div class="project-body"><h3 class="project-title">SafeWork Industrial Health</h3><div class="project-tech">Flask · PostgreSQL · Cloudflare Workers</div><p class="project-description">산업보건 SaaS, Edge API 전국 동시접속 지원, 집계 오류 개선, 실시간 대시보드</p><div class="project-links"><a href="https://safework.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/safework" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🛡️</div><div class="project-body"><h3 class="project-title">REGTECH Threat Intelligence</h3><div class="project-tech">Flask · PostgreSQL · Claude AI</div><p class="project-description">금융보안원 위협정보 자동수집, AI 기반 CI/CD, Portainer API 자동배포</p><div class="project-links"><a href="https://blacklist.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/blacklist" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">🚀</div><div class="project-body"><h3 class="project-title">FortiGate Policy Orchestration</h3><div class="project-tech">Flask · FortiManager API · GitHub Actions</div><p class="project-description">방화벽 정책 자동배포, HA 구성 지원, RESTful API 기반 오케스트레이션</p><div class="project-links"><a href="https://fortinet.jclee.me" target="_blank" class="project-link project-link-primary">Live Demo</a> <a href="https://github.com/qws941/fortinet" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div><div class="project-card"><div class="project-header">📊</div><div class="project-body"><h3 class="project-title">Public Grafana Dashboard</h3><div class="project-tech">Grafana · Prometheus · Loki · Tempo · PUBLIC</div><p class="project-description">퍼블릭 접근 가능한 실시간 모니터링, 13개 서비스 통합, 메트릭·로그·트레이스, 안정적 운영</p><div class="project-links"><a href="https://grafana.jclee.me" target="_blank" class="project-link project-link-primary">Public Dashboard</a> <a href="https://github.com/qws941/grafana" target="_blank" class="project-link project-link-secondary">GitHub</a></div></div></div></div></div></section><section class="section" id="contact"><div class="container"><div class="section-header"><div class="section-badge">Get In Touch</div><h2 class="section-title">Let's Work Together</h2><p class="section-description">인프라 자동화, 보안 아키텍처, DevOps 전환에 대해 논의하고 싶으신가요? 연락주세요.</p></div><div class="contact-card"><div class="contact-grid"><div class="contact-item"><div class="contact-label">Email</div><div class="contact-value"><a href="mailto:qws941@kakao.com">qws941@kakao.com</a></div></div><div class="contact-item"><div class="contact-label">Phone</div><div class="contact-value"><a href="tel:010-5757-9592">010-5757-9592</a></div></div><div class="contact-item"><div class="contact-label">GitHub</div><div class="contact-value"><a href="https://github.com/qws941" target="_blank">github.com/qws941</a></div></div><div class="contact-item"><div class="contact-label">Website</div><div class="contact-value"><a href="https://resume.jclee.me" target="_blank">resume.jclee.me</a></div></div></div></div></div></section><footer class="footer"><div class="container"><p class="footer-text">© 2025 Jaecheol Lee. All rights reserved.</p></div></footer><script>document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();const t=document.querySelector(this.getAttribute("href"));if(t){const e=80,o=t.getBoundingClientRect().top+window.pageYOffset-e;window.scrollTo({top:o,behavior:"smooth"})}})});const nav=document.querySelector(".nav");let lastScroll=0;window.addEventListener("scroll",()=>{const e=window.pageYOffset;nav.style.boxShadow=e>100?"var(--shadow-brutal)":"none",lastScroll=e})</script></body></html>`;

// Version and deployment info
const VERSION = '1.0.0';
const DEPLOYED_AT = '2025-10-20T04:47:41.225Z';

// CSP directives (generated at build time from inline content hashes)
const CSP_SCRIPT_SRC = `'self' 'sha256-iFJNDDNbNZiWOAUkW7PuqLIL2dJ5KjTo6XjvDlguY4M='`;
const CSP_STYLE_SRC = `'self' 'sha256-G8WkXniLxaEhcs2VcblhXST+GjiOTfk26BYRfaiAzF4=' https://fonts.googleapis.com`;

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
