/**
 * Worker route generators for non-API routes.
 * Extracted from generate-worker.js template literal.
 *
 * Each function returns a string fragment (raw worker code).
 * Build-time interpolation uses opts.*, runtime escaping is verbatim.
 */

/**
 * Generate fetch handler preamble + rate limiting.
 * Lines 455-483 of original template.
 */
function generateFetchAndRateLimit() {
  return `
// --- Rate Limiting Helpers ---
let lastCleanupTime = Date.now();

function getRateLimitPolicy(pathname) {
  if (pathname.startsWith('/api/')) return 'api';
  if (pathname === '/health') return 'health';
  if (pathname === '/metrics') return 'metrics';
  if (pathname === '/' || pathname === '/en' || pathname === '/en/') return 'page';
  return 'static';
}

function checkRateLimit(clientIp, pathname, isAuthenticated) {
  const policyName = getRateLimitPolicy(pathname);
  const policy = RATE_LIMIT_CONFIG.policies[policyName];
  if (!policy) return { allowed: true, policy: null };

  const now = Date.now();
  const key = clientIp + ':' + policyName;
  const maxRequests = isAuthenticated
    ? Math.floor(policy.maxRequests * (RATE_LIMIT_CONFIG.authMultiplier || 1))
    : policy.maxRequests;
  const clientData = ipCache.get(key) || { count: 0, startTime: now };

  if (now - clientData.startTime > policy.windowSize) {
    clientData.count = 1;
    clientData.startTime = now;
  } else {
    clientData.count++;
  }
  ipCache.set(key, clientData);

  const remaining = Math.max(0, maxRequests - clientData.count);
  const resetAt = Math.ceil((clientData.startTime + policy.windowSize) / 1000);
  const retryAfter = remaining === 0
    ? Math.max(1, Math.ceil((clientData.startTime + policy.windowSize - now) / 1000))
    : 0;

  // Periodic stale entry cleanup
  if (now - lastCleanupTime > (RATE_LIMIT_CONFIG.cleanupIntervalMs || 300000)) {
    lastCleanupTime = now;
    for (const [k, v] of ipCache) {
      if (now - v.startTime > 600000) ipCache.delete(k);
    }
  }

  return { allowed: clientData.count <= maxRequests, policy: policyName, limit: maxRequests, remaining, resetAt, retryAfter };
}

export default {
  async fetch(request, env, ctx) {
    const startTime = Date.now();
    const url = new URL(request.url);
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    metrics.requests_total++;

    // Lightweight auth check for rate limit differentiation (not a security gate)
    let isAuthenticated = false;
    try {
      isAuthenticated = (request.headers.get('cookie') || '').includes('dashboard_session=');
    } catch {}

    // Apply rate limiting with per-route policies
    const rlInfo = checkRateLimit(clientIp, url.pathname, isAuthenticated);

    // Build rate limit headers (added to all responses via SECURITY_HEADERS shadow)
    const rateLimitHeaders = rlInfo.policy ? {
      'X-RateLimit-Limit': String(rlInfo.limit),
      'X-RateLimit-Remaining': String(rlInfo.remaining),
      'X-RateLimit-Reset': String(rlInfo.resetAt),
      'X-RateLimit-Policy': rlInfo.policy,
    } : {};

    // Shadow module-level BASE_SECURITY_HEADERS with per-request headers
    const SECURITY_HEADERS = { ...BASE_SECURITY_HEADERS, ...rateLimitHeaders };

    if (!rlInfo.allowed) {
      metrics.requests_error++;
      return new Response(JSON.stringify({
        error: 'Too Many Requests',
        retryAfter: rlInfo.retryAfter,
        policy: rlInfo.policy,
      }), {
        status: 429,
        headers: {
          ...SECURITY_HEADERS,
          'Content-Type': 'application/json',
          'Retry-After': String(rlInfo.retryAfter),
        }
      });
    }

    try {`;
}

/**
 * Generate page and asset routes.
 * Lines 485-520 of original template.
 */
function generatePageRoutes() {
  return `
      // Static Assets (Fonts, etc.)
      if (url.pathname.startsWith('/assets/') && env.ASSETS) {
        const assetPath = url.pathname.replace('/assets/', '/');
        const assetUrl = new URL(assetPath, request.url);
        return env.ASSETS.fetch(new Request(assetUrl, request));
      }

       // Routing

      if (url.pathname === '/') {
        const response = new Response(INDEX_HTML, { headers: SECURITY_HEADERS });
        metrics.requests_success++;
        metrics.response_time_sum += (Date.now() - startTime);

        ctx.waitUntil(logToElasticsearch(env, \`Request: \${request.method} \${url.pathname}\`, 'INFO', {
          path: url.pathname,
          method: request.method
        }));

        return response;
      }

      // English version route
      if (url.pathname === '/en/' || url.pathname === '/en') {
        const response = new Response(INDEX_EN_HTML, { headers: SECURITY_HEADERS });
        metrics.requests_success++;
        metrics.response_time_sum += (Date.now() - startTime);

        ctx.waitUntil(logToElasticsearch(env, \`Request: \${request.method} \${url.pathname}\`, 'INFO', {
          path: url.pathname,
          method: request.method
        }));

        return response;
      }`;
}

/**
 * Generate static file routes (manifest, sw, main.js).
 * Lines 637-667 of original template.
 */
function generateStaticRoutes() {
  return `
      if (url.pathname === '/manifest.json') {
        metrics.requests_success++;
        return new Response(MANIFEST_JSON, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/json'
          }
        });
      }

      if (url.pathname === '/sw.js') {
        metrics.requests_success++;
        return new Response(SERVICE_WORKER, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/javascript',
            'Cache-Control': 'max-age=0, must-revalidate',
            'Service-Worker-Allowed': '/'
          }
        });
      }

      if (url.pathname === '/main.js') {
        metrics.requests_success++;
        return new Response(MAIN_JS, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/javascript'
          }
        });
      }`;
}

/**
 * Generate health check route.
 * Lines 669-712 of original template.
 * @param {Object} opts
 * @param {string} opts.version - Build-time VERSION
 * @param {string} opts.deployedAt - Build-time deployedAt
 */
function generateHealthRoute(opts) {
  return `
      if (url.pathname === '/health') {
        const uptime = Math.floor((Date.now() - metrics.worker_start_time) / 1000);

        const bindings = { d1: { healthy: false }, kv: { healthy: false } };
        try {
          const d1Start = Date.now();
          await env.DB.prepare('SELECT 1 AS ok').first();
          bindings.d1 = { healthy: true, latency_ms: Date.now() - d1Start };
        } catch (e) {
          bindings.d1 = { healthy: false, error: e.message };
        }
        try {
          const kvStart = Date.now();
          await env.SESSIONS.put('_health_check', Date.now().toString());
          await env.SESSIONS.get('_health_check');
          bindings.kv = { healthy: true, latency_ms: Date.now() - kvStart };
        } catch (e) {
          bindings.kv = { healthy: false, error: e.message };
        }

        const allHealthy = bindings.d1.healthy && bindings.kv.healthy;
        const health = {
          status: allHealthy ? 'healthy' : 'degraded',
          version: '${opts.version}',
          deployed_at: '${opts.deployedAt}',
          uptime_seconds: uptime,
          bindings,
          metrics: {
            requests_total: metrics.requests_total,
            requests_success: metrics.requests_success,
            requests_error: metrics.requests_error,
            vitals_received: metrics.vitals_received
          }
        };

        metrics.requests_success++;
        return new Response(JSON.stringify(health, null, 2), {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }`;
}

/**
 * Generate Prometheus metrics route.
 * Lines 714-723 of original template.
 */
function generateMetricsRoute() {
  return `
       if (url.pathname === '/metrics') {
        metrics.requests_success++;
        return new Response(generateMetrics(metrics), {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }`;
}

/**
 * Generate SEO and binary asset routes.
 * Lines 995-1050 of original template.
 */
function generateSeoRoutes() {
  return `
      if (url.pathname === '/robots.txt') {
        metrics.requests_success++;
        return new Response(ROBOTS_TXT, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'text/plain'
          }
        });
      }

      if (url.pathname === '/sitemap.xml') {
        metrics.requests_success++;
        return new Response(SITEMAP_XML, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/xml'
          }
        });
      }

      if (url.pathname === '/og-image.webp') {
        const imageBuffer = Uint8Array.from(atob(OG_IMAGE_BASE64), c => c.charCodeAt(0));
        metrics.requests_success++;
        return new Response(imageBuffer, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'image/webp',
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        });
      }

      if (url.pathname === '/og-image-en.webp') {
        const imageBuffer = Uint8Array.from(atob(OG_IMAGE_EN_BASE64), c => c.charCodeAt(0));
        metrics.requests_success++;
        return new Response(imageBuffer, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'image/webp',
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        });
      }

      if (url.pathname === '/resume.pdf') {
        const pdfBuffer = Uint8Array.from(atob(RESUME_PDF_BASE64), c => c.charCodeAt(0));
        metrics.requests_success++;
        return new Response(pdfBuffer, {
          headers: {
            ...SECURITY_HEADERS,
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="resume_jclee.pdf"',
            'Cache-Control': 'public, max-age=86400'
          }
        });
      }`;
}

/**
 * Generate 404 handler.
 * Lines 1052-1061 of original template.
 */
function generate404() {
  return `
      // 404 Not Found
      metrics.requests_error++;
      return new Response('Not Found', {
        status: 404,
        headers: {
          ...SECURITY_HEADERS,
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });`;
}

/**
 * Generate error handler (catch block) + close fetch handler.
 * Lines 1063-1098 of original template.
 * @param {Object} opts
 * @param {string} opts.version - Build-time VERSION
 */
function generateErrorHandler(opts) {
  return `
    } catch (err) {
      metrics.requests_error++;
      ctx.waitUntil(logToElasticsearch(env, \`Error: \${err.message}\`, 'ERROR', {
        path: url.pathname,
        method: request.method
      }));

      ctx.waitUntil((async () => {
        try {
          await env.DB.prepare(
            'INSERT INTO error_logs (message, stack, url, method, status_code, client_ip, country, colo, worker_version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
          ).bind(
            err.message || 'Unknown error',
            err.stack || '',
            url.pathname,
            request.method,
            500,
            clientIp,
            request.cf?.country || '',
            request.cf?.colo || '',
            '${opts.version}'
          ).run();
        } catch {}
      })());

      return new Response('Internal Server Error', {
        status: 500,
        headers: {
          ...SECURITY_HEADERS,
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }
  }
};`;
}

module.exports = {
  generateFetchAndRateLimit,
  generatePageRoutes,
  generateStaticRoutes,
  generateHealthRoute,
  generateMetricsRoute,
  generateSeoRoutes,
  generate404,
  generateErrorHandler,
};
