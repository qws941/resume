/**
 * Rate limiting middleware using KV token bucket algorithm
 * Limits requests per IP + route group
 */

const RATE_LIMITS = {
  admin: { tokens: 60, interval: 60 }, // 60 requests per minute
  webhook: { tokens: 30, interval: 60 }, // 30 requests per minute
  auth: { tokens: 10, interval: 60 }, // 10 requests per minute (stricter)
};

/**
 * Get rate limit group for a pathname
 * @param {string} pathname
 * @returns {string|null}
 */
function getRateLimitGroup(pathname) {
  if (pathname.startsWith('/api/auth')) return 'auth';
  if (pathname.startsWith('/api/slack/interactions')) {
    return 'webhook';
  }
  if (pathname.startsWith('/api/')) return 'admin';
  return null;
}

/**
 * Check rate limit using KV token bucket
 * @param {Request} request
 * @param {string} pathname
 * @param {Object} env - Must have RATE_LIMIT_KV binding
 * @returns {Promise<{ok: boolean, status?: number, error?: string, headers?: Object}>}
 */
export async function checkRateLimit(request, pathname, env) {
  const group = getRateLimitGroup(pathname);
  if (!group) return { ok: true };

  // Skip if KV not configured (graceful degradation)
  if (!env?.RATE_LIMIT_KV) {
    return { ok: true };
  }

  const limit = RATE_LIMITS[group];
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown';
  const key = `ratelimit:${group}:${ip}`;

  try {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = Math.floor(now / limit.interval) * limit.interval;
    const windowKey = `${key}:${windowStart}`;

    // Get current count
    const current = await env.RATE_LIMIT_KV.get(windowKey, { type: 'json' });
    const count = current?.count || 0;

    if (count >= limit.tokens) {
      const retryAfter = windowStart + limit.interval - now;
      return {
        ok: false,
        status: 429,
        error: 'Too many requests',
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(limit.tokens),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(windowStart + limit.interval),
        },
      };
    }

    // Increment count
    await env.RATE_LIMIT_KV.put(
      windowKey,
      JSON.stringify({ count: count + 1 }),
      { expirationTtl: limit.interval + 10 }, // TTL slightly longer than window
    );

    return {
      ok: true,
      headers: {
        'X-RateLimit-Limit': String(limit.tokens),
        'X-RateLimit-Remaining': String(limit.tokens - count - 1),
        'X-RateLimit-Reset': String(windowStart + limit.interval),
      },
    };
  } catch (error) {
    // On KV error, allow request (fail-open for availability)
    console.error('Rate limit KV error:', error);
    return { ok: true };
  }
}

/**
 * Add rate limit headers to response
 * @param {Response} response
 * @param {Object} headers
 * @returns {Response}
 */
export function addRateLimitHeaders(response, headers) {
  if (!headers) return response;

  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(headers)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
