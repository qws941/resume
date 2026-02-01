import { Router } from './router.js';
import { ApplicationsHandler } from './handlers/applications.js';
import { StatsHandler } from './handlers/stats.js';
import { AuthHandler } from './handlers/auth.js';
import { WebhookHandler } from './handlers/webhooks.js';
import { AutoApplyHandler } from './handlers/auto-apply.js';
import {
  jsonResponse,
  corsHeaders,
  addCorsHeaders,
} from './middleware/cors.js';
import { logRequest, logError } from './utils/loki-logger.js';
import {
  requiresAuth,
  requiresWebhookSignature,
  verifyAdminAuth,
  verifyWebhookSignature,
  createAuthCookie,
  clearAuthCookie,
} from './services/auth.js';
import {
  checkRateLimit,
  addRateLimitHeaders,
} from './middleware/rate-limit.js';
import { validateCsrf, addCsrfCookie } from './middleware/csrf.js';
import { getConfig, saveConfig } from './services/config.js';
import { serveStatic } from './views/dashboard.js';
import { sendSlackMessage } from './services/slack.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const router = new Router();

    // Log request to Loki (waitUntil ensures completion)
    ctx.waitUntil(logRequest(env, request, url));

    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const rateResult = await checkRateLimit(request, url.pathname, env);
    if (!rateResult.ok) {
      return addCorsHeaders(
        addRateLimitHeaders(
          jsonResponse({ error: rateResult.error }, rateResult.status),
          rateResult.headers,
        ),
        origin,
      );
    }

    if (requiresAuth(url.pathname)) {
      const authResult = verifyAdminAuth(request, env);
      if (!authResult.ok) {
        return addCorsHeaders(
          jsonResponse({ error: authResult.error }, authResult.status),
          origin,
        );
      }
    }

    if (requiresWebhookSignature(url.pathname)) {
      const sigResult = await verifyWebhookSignature(request, env);
      if (!sigResult.ok) {
        return addCorsHeaders(
          jsonResponse({ error: sigResult.error }, sigResult.status),
          origin,
        );
      }
    }

    // Skip CSRF for webhook routes, server-to-server sync, and auto-apply (cron/API)
    const skipCsrf =
      url.pathname.startsWith('/api/webhooks/') ||
      url.pathname.startsWith('/api/auto-apply/') ||
      url.pathname === '/api/auth/sync';
    if (!skipCsrf) {
      const csrfResult = validateCsrf(request);
      if (!csrfResult.ok) {
        return addCorsHeaders(
          jsonResponse({ error: csrfResult.error }, csrfResult.status),
          origin,
        );
      }
    }

    const apps = new ApplicationsHandler(env.DB);
    const stats = new StatsHandler(env.DB);
    const auth = new AuthHandler(env.DB, env.SESSIONS, env);
    const webhooks = new WebhookHandler(env, auth);
    const autoApply = new AutoApplyHandler(env);

    router.get('/api/health', async () => {
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
      };
      try {
        if (env.DB) {
          await env.DB.prepare('SELECT 1').first();
          health.database = 'connected';
        } else {
          health.database = 'not configured';
        }
      } catch {
        health.status = 'degraded';
        health.database = 'error';
      }
      return jsonResponse(health);
    });

    router.get('/api/status', async () => {
      const status = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
      };
      if (env.DB) {
        try {
          const result = await env.DB.prepare(
            'SELECT COUNT(*) as count FROM applications',
          ).first();
          status.applications = result?.count ?? 0;
        } catch {
          status.applications = 'error';
        }
      }
      return jsonResponse(status);
    });

    router.get('/api/stats', (req) => stats.getStats(req));
    router.get('/api/stats/weekly', (req) => stats.getWeeklyStats(req));

    router.get('/api/auth/status', (req) => auth.getStatus(req));
    router.post('/api/auth/set', (req) => auth.setAuth(req));
    router.post('/api/auth/sync', (req) => auth.syncFromScript(req));
    router.delete('/api/auth/:platform', (req) => auth.clearAuth(req));
    router.get('/api/auth/profile', (req) => auth.getProfile(req));

    router.post('/api/auth/login', async (req) => {
      try {
        const body = await req.json();
        const { token } = body;
        if (!token || token !== env.ADMIN_TOKEN) {
          return jsonResponse({ error: 'Invalid token' }, 401);
        }
        const response = jsonResponse({ success: true });
        response.headers.set('Set-Cookie', createAuthCookie(token));
        return response;
      } catch {
        return jsonResponse({ error: 'Invalid request' }, 400);
      }
    });

    router.post('/api/auth/logout', async () => {
      const response = jsonResponse({ success: true });
      response.headers.set('Set-Cookie', clearAuthCookie());
      return response;
    });

    router.get('/api/applications', (req) => apps.list(req));
    router.post('/api/applications', (req) => apps.create(req));
    router.get('/api/applications/:id', (req) => apps.get(req));
    router.put('/api/applications/:id', (req) => apps.update(req));
    router.delete('/api/applications/:id', (req) => apps.delete(req));
    router.put('/api/applications/:id/status', (req) => apps.updateStatus(req));

    router.get('/api/report', (req) => stats.getDailyReport(req));
    router.get('/api/report/weekly', (req) => stats.getWeeklyReport(req));

    router.post('/api/slack/notify', (req) => webhooks.notifySlack(req));
    router.post('/api/slack/interactions', (req) =>
      webhooks.handleSlackInteraction(req),
    );

    router.post('/api/automation/search', (req) =>
      webhooks.triggerJobSearch(req),
    );
    router.post('/api/automation/apply', (req) =>
      webhooks.triggerAutoApply(req),
    );
    router.post('/api/automation/report', (req) =>
      webhooks.triggerDailyReport(req),
    );
    router.post('/api/automation/resume', (req) =>
      webhooks.triggerResumeSync(req),
    );

    router.get('/api/auto-apply/status', (req) => autoApply.status(req));
    router.post('/api/auto-apply/run', (req) => autoApply.run(req));
    router.put('/api/auto-apply/config', (req) => autoApply.configure(req));

    // Profile sync endpoints
    router.post('/api/automation/profile-sync', (req) =>
      webhooks.triggerProfileSync(req),
    );
    router.get('/api/automation/profile-sync/:syncId', (req) =>
      webhooks.getProfileSyncStatus(req),
    );
    router.post('/api/automation/profile-sync/callback', (req) =>
      webhooks.updateProfileSyncStatus(req),
    );

    // Test endpoints for Chaos API integration
    router.get('/api/test/chaos-resumes', (req) =>
      webhooks.testChaosResumes(req),
    );

    router.get('/api/config', () => getConfig(env.DB));
    router.put('/api/config', (req) => saveConfig(req, env.DB));

    router.post('/api/cleanup', (req) => apps.cleanupExpired(req));

    if (!url.pathname.startsWith('/api/')) {
      const staticResponse = serveStatic(url.pathname);
      return addCsrfCookie(staticResponse, request);
    }

    try {
      const response = await router.handle(request, url);
      if (response) {
        const withCsrf = addCsrfCookie(response, request);
        return addRateLimitHeaders(
          addCorsHeaders(withCsrf, origin),
          rateResult.headers,
        );
      }
      return addCorsHeaders(jsonResponse({ error: 'Not found' }, 404), origin);
    } catch (error) {
      console.error('Worker error:', error);
      ctx.waitUntil(
        logError(env, error, { path: url.pathname, method: request.method }),
      );
      return addCorsHeaders(
        jsonResponse({ error: 'Internal server error' }, 500),
        origin,
      );
    }
  },

  async scheduled(event, env, ctx) {
    console.log(`Cron triggered: ${event.cron}`);

    const auth = new AuthHandler(env.DB, env.SESSIONS, env);
    const autoApply = new AutoApplyHandler(env);
    const webhooks = new WebhookHandler(env, auth);

    // Route based on cron schedule
    // 0 0 * * 1-5 = 00:00 UTC Mon-Fri = 09:00 KST (Job search + apply)
    // 0 9 * * * = 09:00 UTC Daily = 18:00 KST (Daily report)
    const isJobSearchCron = event.cron === '0 0 * * 1-5';
    const isDailyReportCron = event.cron === '0 9 * * *';

    try {
      if (isJobSearchCron) {
        const config = await autoApply.getConfig();

        if (!config.autoApplyEnabled) {
          console.log('Auto-apply disabled, skipping job search cron');
          return;
        }

        const mockRequest = new Request(
          'https://job.jclee.me/api/auto-apply/run',
          {
            method: 'POST',
            body: JSON.stringify({
              dryRun: false,
              platforms: ['wanted', 'linkedin', 'remember'],
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const result = await autoApply.run(mockRequest);
        const data = await result.json();
        console.log('Cron auto-apply result:', JSON.stringify(data));

        if (data.results?.applied > 0) {
          const jobList = (data.results?.jobs || [])
            .slice(0, 5)
            .map((j) => `• ${j.company} - ${j.position} (${j.matchScore}%)`)
            .join('\n');

          await sendSlackMessage(env, {
            text: `🤖 Auto-Apply Complete: ${data.results.applied} jobs processed`,
            blocks: [
              {
                type: 'header',
                text: { type: 'plain_text', text: '🤖 Auto-Apply Results' },
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*Summary*\nSearched: ${data.results.searched} | Matched: ${data.results.matched} | Applied: ${data.results.applied}\n\n*Top Jobs*\n${jobList || 'None'}`,
                },
              },
            ],
          });
        }
      } else if (isDailyReportCron) {
        const mockRequest = new Request(
          'https://job.jclee.me/api/automation/report',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const result = await webhooks.triggerDailyReport(mockRequest);
        const data = await result.json();
        console.log('Cron daily report result:', JSON.stringify(data));
      } else {
        const config = await autoApply.getConfig();

        if (!config.autoApplyEnabled) {
          console.log('Auto-apply disabled, skipping cron');
          return;
        }

        const mockRequest = new Request(
          'https://job.jclee.me/api/auto-apply/run',
          {
            method: 'POST',
            body: JSON.stringify({ dryRun: false }),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const result = await autoApply.run(mockRequest);
        const data = await result.json();
        console.log('Cron auto-apply result:', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Cron error:', error.message);
      ctx.waitUntil(
        logError(env, error, { trigger: 'cron', cron: event.cron }),
      );

      await sendSlackMessage(env, {
        text: `❌ Cron Error: ${event.cron}\n\`\`\`${error.message}\`\`\``,
      });
    }
  },
};
