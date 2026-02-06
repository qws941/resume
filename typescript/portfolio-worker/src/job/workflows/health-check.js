import { WorkflowEntrypoint } from 'cloudflare:workers';

/**
 * Health Check Workflow
 *
 * Monitors service health with automatic alerting and metrics logging.
 * Parallel health checks with latency tracking and degradation detection.
 *
 * @param {Object} params
 * @param {string[]} params.services - URLs to check (defaults to resume.jclee.me and job.jclee.me)
 * @param {string} params.slackWebhook - Optional Slack webhook override
 */
export class HealthCheckWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    const {
      services = ['https://resume.jclee.me/health', 'https://job.jclee.me/health'],
      slackWebhook = null,
    } = event.payload || {};

    const startedAt = new Date().toISOString();

    // Step 1: Check all services in parallel
    const results = await step.do(
      'check-services',
      {
        retries: { limit: 3, delay: '10 seconds', backoff: 'exponential' },
        timeout: '30 seconds',
      },
      async () => {
        const checks = await Promise.all(
          services.map(async (url) => {
            const start = Date.now();
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 25000);

              const response = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                  'User-Agent': 'HealthCheckWorkflow/1.0',
                },
              });

              clearTimeout(timeoutId);
              const latencyMs = Date.now() - start;

              return {
                url,
                status: response.status,
                latencyMs,
                healthy: response.status === 200,
              };
            } catch (error) {
              return {
                url,
                status: 0,
                latencyMs: Date.now() - start,
                healthy: false,
                error: error.message,
              };
            }
          })
        );
        return checks;
      }
    );

    // Step 2: Evaluate overall health status
    const healthEvaluation = await step.do(
      'evaluate-health',
      {
        retries: { limit: 2, delay: '5 seconds' },
        timeout: '30 seconds',
      },
      async () => {
        const evaluated = results.map((result) => ({
          ...result,
          status_label: this.getStatusLabel(result),
        }));

        const hasDown = evaluated.some((r) => !r.healthy);
        const hasDegraded = evaluated.some((r) => r.healthy && r.latencyMs > 2000);

        let overallHealth = 'healthy';
        if (hasDown) {
          overallHealth = 'critical';
        } else if (hasDegraded) {
          overallHealth = 'degraded';
        }

        return {
          services: evaluated,
          overallHealth,
          hasDown,
          hasDegraded,
        };
      }
    );

    // Step 3: Send notification if not healthy
    if (healthEvaluation.overallHealth !== 'healthy') {
      await step.do(
        'notify',
        {
          retries: { limit: 2, delay: '10 seconds' },
          timeout: '30 seconds',
        },
        async () => {
          const webhookUrl = slackWebhook || this.env.SLACK_WEBHOOK_URL;
          if (!webhookUrl) {
            return { notified: false, reason: 'No webhook configured' };
          }

          const emoji = healthEvaluation.overallHealth === 'critical' ? '🔴' : '🟡';
          const affectedServices = healthEvaluation.services
            .filter((s) => !s.healthy || s.latencyMs > 2000)
            .map((s) => `• ${s.url}: ${s.status_label} (${s.latencyMs}ms)`)
            .join('\n');

          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `${emoji} Health Check Alert: ${healthEvaluation.overallHealth.toUpperCase()}`,
              blocks: [
                {
                  type: 'header',
                  text: {
                    type: 'plain_text',
                    text: `${emoji} Health Check: ${healthEvaluation.overallHealth.toUpperCase()}`,
                  },
                },
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Affected Services*:\n${affectedServices}\n\n*Checked at*: ${startedAt}`,
                  },
                },
              ],
            }),
          });

          return { notified: true };
        }
      );
    }

    // Step 4: Log metrics to D1
    await step.do(
      'log-metrics',
      {
        retries: { limit: 3, delay: '5 seconds' },
        timeout: '2 minutes',
      },
      async () => {
        const stmt = this.env.DB.prepare(`
          INSERT INTO health_checks (service_url, status, latency_ms, checked_at)
          VALUES (?, ?, ?, datetime('now'))
        `);

        const batch = healthEvaluation.services.map((service) =>
          stmt.bind(service.url, service.status, service.latencyMs)
        );

        await this.env.DB.batch(batch);
        return { logged: batch.length };
      }
    );

    return {
      success: true,
      health: healthEvaluation.overallHealth,
      services: healthEvaluation.services,
      completedAt: new Date().toISOString(),
    };
  }

  getStatusLabel(result) {
    if (!result.healthy) {
      return result.error ? `down (${result.error})` : `error (${result.status})`;
    }
    if (result.latencyMs > 2000) {
      return 'degraded';
    }
    return 'healthy';
  }
}
