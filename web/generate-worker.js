const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
  const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    const scriptContent = scriptMatch[1].trim();
    if (scriptContent) {
      const hash = generateHash(scriptContent);
      scriptHashes.push(`'sha256-${hash}'`);
    }
  }

  // Extract inline styles
  const styleRegex = /<style>([\s\S]*?)<\/style>/g;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    const styleContent = styleMatch[1].trim();
    if (styleContent) {
      const hash = generateHash(styleContent);
      styleHashes.push(`'sha256-${hash}'`);
    }
  }

  return { scriptHashes, styleHashes };
}

/**
 * Reads and escapes HTML file for embedding in template literals
 * @param {string} filename - Name of HTML file to read
 * @returns {string} Escaped HTML content
 */
function readAndEscapeHtml(filename) {
  const filePath = path.join(__dirname, filename);

  // Check if file exists before reading
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }

  try {
    return fs.readFileSync(filePath, 'utf-8')
      .replace(ESCAPE_PATTERNS.BACKTICK, '\\`')
      .replace(ESCAPE_PATTERNS.DOLLAR, '\\$');
  } catch (error) {
    console.error(`❌ Error reading file ${filename}:`, error.message);
    process.exit(1);
  }
}

// Read original HTML files for hash extraction
const indexHtmlRaw = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const resumeHtmlRaw = fs.readFileSync(path.join(__dirname, 'resume.html'), 'utf-8');

// Extract inline script and style hashes
const indexHashes = extractInlineHashes(indexHtmlRaw);
const resumeHashes = extractInlineHashes(resumeHtmlRaw);

// Combine all unique hashes
const allScriptHashes = [...new Set([...indexHashes.scriptHashes, ...resumeHashes.scriptHashes])];
const allStyleHashes = [...new Set([...indexHashes.styleHashes, ...resumeHashes.styleHashes])];

// Generate CSP directives with hashes
const scriptSrc = `'self' ${allScriptHashes.join(' ')}`;
const styleSrc = `'self' ${allStyleHashes.join(' ')} https://fonts.googleapis.com`;

console.log('🔐 Generated CSP hashes:');
console.log(`  Script hashes: ${allScriptHashes.length}`);
console.log(`  Style hashes: ${allStyleHashes.length}`);

// Read and escape HTML files for worker embedding
const indexHtml = readAndEscapeHtml('index.html');
const resumeHtml = readAndEscapeHtml('resume.html');

const workerJs = `// Cloudflare Worker - Auto-generated
const INDEX_HTML = \`${indexHtml}\`;
const RESUME_HTML = \`${resumeHtml}\`;

// Version and deployment info
const VERSION = '1.0.0';
const DEPLOYED_AT = new Date().toISOString();

// Metrics storage (in-memory, per-worker instance)
const metrics = {
  requests_total: 0,
  requests_success: 0,
  requests_error: 0,
  response_time_sum: 0,
  vitals_received: 0,
};

// Security headers
const SECURITY_HEADERS = {
  'Content-Type': 'text/html;charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src ${styleSrc}; script-src ${scriptSrc}; img-src 'self' data:; connect-src 'self' https://grafana.jclee.me",
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

    // Log to Loki
    await logToLoki('INFO', JSON.stringify({
      event: 'web_vitals',
      vitals: vitals,
    }), {
      metric_type: 'web_vitals',
    });

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

      // Track response time
      const responseTime = Date.now() - startTime;
      metrics.response_time_sum += responseTime;

      // Log request to Loki
      await logToLoki('INFO', JSON.stringify({
        event: 'request',
        path: url.pathname,
        method: request.method,
        response_time_ms: responseTime,
      }), {
        path: url.pathname,
        method: request.method,
      });

      return new Response(content, {
        headers: SECURITY_HEADERS,
      });
    } catch (error) {
      metrics.requests_error++;

      // Log error to Loki
      await logToLoki('ERROR', JSON.stringify({
        event: 'error',
        path: url.pathname,
        error: error.message,
      }), {
        path: url.pathname,
        error_type: 'internal',
      });

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
