const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { minify } = require('html-minifier-terser');

// Escape patterns for template literal safety
const ESCAPE_PATTERNS = {
  BACKTICK: /`/g,
  DOLLAR: /\$/g,
};

/**
 * Generate SHA-256 hash for CSP
 * @param {string} content - Content to hash
 * @returns {string} Base64-encoded SHA-256 hash
 */
function generateHash(content) {
  return crypto.createHash('sha256').update(content, 'utf-8').digest('base64');
}

/**
 * Extract inline scripts and styles from HTML and generate hashes
 * @param {string} html - HTML content
 * @returns {Object} Object with script and style hashes
 */
function extractInlineHashes(html) {
  const scriptHashes = [];
  const styleHashes = [];

  // Extract inline scripts
  // CRITICAL: Do NOT trim() - browser calculates hash with exact whitespace
  const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    const scriptContent = scriptMatch[1]; // NO TRIM!
    if (scriptContent) {
      const hash = generateHash(scriptContent);
      scriptHashes.push(`'sha256-${hash}'`);
    }
  }

  // Extract inline styles
  // CRITICAL: Do NOT trim() - browser calculates hash with exact whitespace
  const styleRegex = /<style>([\s\S]*?)<\/style>/g;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    const styleContent = styleMatch[1]; // NO TRIM!
    if (styleContent) {
      const hash = generateHash(styleContent);
      styleHashes.push(`'sha256-${hash}'`);
    }
  }

  return { scriptHashes, styleHashes };
}

/**
 * Generate resume cards HTML from JSON data
 * @param {Array} resumeData - Array of resume project objects
 * @returns {string} HTML string for resume cards
 */
function generateResumeCards(resumeData) {
  return resumeData.map(project => {
    const cardClass = project.highlight ? 'doc-card doc-card-highlight' : 'doc-card';
    const linksHtml = project.completePdfUrl
      ? `<a href="${project.completePdfUrl}" download class="doc-link-pdf-full">Complete PDF</a>`
      : `<a href="${project.pdfUrl}" download class="doc-link-pdf">PDF</a>
                        <a href="${project.docxUrl}" download class="doc-link-docx">DOCX</a>`;

    return `
                <!-- Project: ${project.title} -->
                <div class="${cardClass}">
                    <div class="doc-icon">${project.icon}</div>
                    <h3 class="doc-title">${project.title}</h3>
                    <p class="doc-description">${project.description}</p>
                    <div class="doc-stats">
                        ${project.stats.map(stat => `<span class="doc-stat">${stat}</span>`).join('\n                        ')}
                    </div>
                    <div class="doc-links">
                        ${linksHtml}
                    </div>
                </div>`;
  }).join('\n\n');
}

/**
 * Generate project cards HTML from JSON data
 * @param {Array} projectsData - Array of project objects
 * @returns {string} HTML string for project cards
 */
function generateProjectCards(projectsData) {
  return projectsData.map(project => {
    // Special handling for Grafana project with multiple dashboards
    if (project.dashboards) {
      const dashboardLinks = project.dashboards.map(dashboard =>
        `<a href="${dashboard.url}" target="_blank" class="project-link ${dashboard.name === 'Grafana Home' ? 'project-link-secondary' : 'project-link-primary'}" style="font-size: 0.875rem;">${dashboard.name}</a>`
      ).join('\n                            ');

      return `
                <!-- Project: ${project.title} -->
                <div class="project-card">
                    <div class="project-header">${project.icon}</div>
                    <div class="project-body">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-tech">${project.tech}</div>
                        <p class="project-description">
                            ${project.description}
                        </p>
                        <div class="project-links" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 0.5rem;">
                            ${dashboardLinks}
                        </div>
                        <div class="project-links">
                            <a href="${project.documentationUrl}" target="_blank" class="project-link project-link-secondary">Documentation</a>
                        </div>
                    </div>
                </div>`;
    }

    // Standard project card
    return `
                <!-- Project: ${project.title} -->
                <div class="project-card">
                    <div class="project-header">${project.icon}</div>
                    <div class="project-body">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-tech">${project.tech}</div>
                        <p class="project-description">
                            ${project.description}
                        </p>
                        <div class="project-links">
                            <a href="${project.liveUrl}" target="_blank" class="project-link project-link-primary">Live Demo</a>
                            <a href="${project.githubUrl}" target="_blank" class="project-link project-link-secondary">GitHub</a>
                        </div>
                    </div>
                </div>`;
  }).join('\n\n');
}

// Main async function to handle Promise-based minification
(async () => {
  // CRITICAL: Calculate hashes from ORIGINAL HTML before escaping
  // (Browsers calculate hashes from the actual HTML they receive, not the escaped template literal)
  const indexHtmlRaw = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

  // Read CSS and inject into HTML
  const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
  let indexHtmlWithCSS = indexHtmlRaw.replace('<!-- CSS_PLACEHOLDER -->', cssContent);

  // Read data.json and inject project data
  const projectData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
  const resumeCardsHtml = generateResumeCards(projectData.resume);
  const projectCardsHtml = generateProjectCards(projectData.projects);

  indexHtmlWithCSS = indexHtmlWithCSS
    .replace('<!-- RESUME_CARDS_PLACEHOLDER -->', resumeCardsHtml)
    .replace('<!-- PROJECT_CARDS_PLACEHOLDER -->', projectCardsHtml)
    .replace('<!-- RESUME_PDF_URL -->', projectData.resumeDownload.pdfUrl)
    .replace('<!-- RESUME_DOCX_URL -->', projectData.resumeDownload.docxUrl)
    .replace('<!-- RESUME_MD_URL -->', projectData.resumeDownload.mdUrl);

  // Minify HTML (15% size reduction, faster edge cold starts)
  const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: false, // Keep quotes for safety
    keepClosingSlash: true,
  };

  const indexHtmlOriginal = await minify(indexHtmlWithCSS, minifyOptions);

  const indexHashes = extractInlineHashes(indexHtmlOriginal);

  // NOW escape HTML for worker embedding
  const indexHtml = indexHtmlOriginal
    .replace(ESCAPE_PATTERNS.BACKTICK, '\\`')
    .replace(ESCAPE_PATTERNS.DOLLAR, '\\$');

  // Use hashes from index.html only
  const allScriptHashes = indexHashes.scriptHashes;
  const allStyleHashes = indexHashes.styleHashes;

  // Generate CSP directives with hashes
  const scriptSrc = `'self' ${allScriptHashes.join(' ')}`;
  const styleSrc = `'self' ${allStyleHashes.join(' ')} https://fonts.googleapis.com`;

  console.log('🔐 Generated CSP hashes from minified HTML:');
  console.log(`  Script hashes: ${allScriptHashes.length}`);
  console.log(`  Style hashes: ${allStyleHashes.length}`);

  // Read deployment timestamp from environment (injected by CI/CD) or use build time
  const deployedAt = process.env.DEPLOYED_AT || new Date().toISOString();
  console.log(`📅 Deployment timestamp: ${deployedAt}`);

  const workerJs = `// Cloudflare Worker - Auto-generated
const INDEX_HTML = \`${indexHtml}\`;

// Version and deployment info
const VERSION = '1.0.0';
const DEPLOYED_AT = '${deployedAt}';

// CSP directives (generated at build time from inline content hashes)
const CSP_SCRIPT_SRC = \`${scriptSrc}\`;
const CSP_STYLE_SRC = \`${styleSrc}\`;

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
  'Content-Security-Policy': \`default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src \${CSP_STYLE_SRC}; script-src \${CSP_SCRIPT_SRC}; img-src 'self' data:; connect-src 'self' https://grafana.jclee.me\`,
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

  return \`# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{job="resume"} \${metrics.requests_total}

# HELP http_requests_success Successful HTTP requests
# TYPE http_requests_success counter
http_requests_success{job="resume"} \${metrics.requests_success}

# HELP http_requests_error Failed HTTP requests
# TYPE http_requests_error counter
http_requests_error{job="resume"} \${metrics.requests_error}

# HELP http_response_time_seconds Average response time
# TYPE http_response_time_seconds gauge
http_response_time_seconds{job="resume"} \${avgResponseTime}

# HELP web_vitals_received Total Web Vitals data points received
# TYPE web_vitals_received counter
web_vitals_received{job="resume"} \${metrics.vitals_received}
\`;
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

      // SEO Routes
      if (url.pathname === '/sitemap.xml') {
        metrics.requests_success++;
        return new Response(\`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://resume.jclee.me/</loc>
    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\`, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      if (url.pathname === '/robots.txt') {
        metrics.requests_success++;
        return new Response(\`User-agent: *
Allow: /

Sitemap: https://resume.jclee.me/sitemap.xml\`, {
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600',
          },
        });
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
`;

  // Write generated worker.js with error handling
  try {
    const outputPath = path.join(__dirname, 'worker.js');
    fs.writeFileSync(outputPath, workerJs);
    console.log('✅ worker.js generated successfully');
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Size: ${(workerJs.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error writing worker.js:', error.message);
    process.exit(1);
  }
})();
