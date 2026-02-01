import { sendSlackMessage } from '../services/slack.js';

export class WebhookHandler {
  constructor(env, auth) {
    this.env = env;
    this.auth = auth;
  }

  jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async triggerJobSearch(request) {
    const body = await request.json().catch(() => ({}));
    const {
      keywords = 'DevOps,SRE,Platform',
      minScore = 70,
      limit = 30,
      maxPerKeyword = 10,
    } = body;

    const keywordList = Array.isArray(keywords)
      ? keywords
      : String(keywords)
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean);

    const cleanedKeywords = keywordList.slice(0, 5);
    const db = this.env?.DB;

    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      const now = new Date().toISOString();
      const maxTotal = Math.max(1, Math.min(parseInt(limit) || 30, 100));
      const perKeyword = Math.max(
        1,
        Math.min(parseInt(maxPerKeyword) || 10, 25),
      );

      const jobs = [];
      const seen = new Set();

      for (const keyword of cleanedKeywords.length
        ? cleanedKeywords
        : ['DevOps']) {
        const wantedJobs = await this.fetchWantedJobs(keyword, {
          limit: perKeyword,
        });
        for (const job of wantedJobs) {
          const jobId = job?.id;
          if (!jobId) continue;
          const key = `wanted:${jobId}`;
          if (seen.has(key)) continue;
          seen.add(key);
          jobs.push({ keyword, job });
          if (jobs.length >= maxTotal) break;
        }
        if (jobs.length >= maxTotal) break;
      }

      let inserted = 0;
      for (const item of jobs) {
        const job = item.job;
        const jobId = String(job.id);

        const company =
          job.company?.name || job.company_name || job.company || 'Unknown';
        const position =
          job.position?.title || job.position || job.title || 'Unknown';
        const location =
          job.address?.full_location ||
          job.address?.location ||
          job.location ||
          null;

        const appId = `wanted_${jobId}`;
        const sourceUrl = `https://www.wanted.co.kr/wd/${jobId}`;
        const matchScoreRaw = job.matching_score ?? job.matchingScore ?? 0;
        const matchScore = Math.max(
          0,
          Math.min(100, parseInt(matchScoreRaw) || 0),
        );
        const notes = `keyword=${item.keyword}; minScore=${minScore}`;

        const result = await db
          .prepare(
            'INSERT OR IGNORE INTO applications (id, job_id, source, source_url, position, company, location, match_score, status, priority, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          )
          .bind(
            appId,
            jobId,
            'wanted',
            sourceUrl,
            position,
            company,
            location,
            matchScore,
            'saved',
            'medium',
            notes,
            now,
            now,
            now,
          )
          .run();

        const changes = result?.meta?.changes || 0;
        inserted += changes;

        if (changes > 0) {
          await db
            .prepare(
              'INSERT INTO application_timeline (application_id, status, note, timestamp) VALUES (?, ?, ?, ?)',
            )
            .bind(appId, 'saved', 'Imported from Wanted API (Direct)', now)
            .run();
        }
      }

      return this.jsonResponse({
        success: true,
        message: 'Job search completed successfully',
        totalFetched: jobs.length,
        inserted,
        details: { keywords: cleanedKeywords, maxTotal },
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async fetchWantedJobs(keyword, { limit = 10, offset = 0 } = {}) {
    const queryParams = new URLSearchParams({
      country: 'kr',
      query: keyword,
      limit: String(limit),
      offset: String(offset),
      years: '-1',
      locations: 'all',
      job_sort: 'job.latest_order',
    });

    const response = await fetch(
      `https://www.wanted.co.kr/api/v4/jobs?${queryParams.toString()}`,
      { signal: AbortSignal.timeout(10000) },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json().catch(() => null);
    return Array.isArray(data?.data) ? data.data : [];
  }

  async triggerResumeSync(request) {
    try {
      const cookies = await this.auth.getCookies('wanted');
      if (!cookies) {
        return this.jsonResponse(
          { success: false, error: 'Wanted authentication required' },
          401,
        );
      }

      // 1. List resumes to find the main one
      const listResponse = await fetch(
        'https://www.wanted.co.kr/api/chaos/resumes/v1/list',
        {
          headers: { Cookie: cookies },
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!listResponse.ok) {
        throw new Error(`Failed to list resumes: ${listResponse.status}`);
      }

      const listData = await listResponse.json();
      const resumes = listData.data || [];
      const mainResume = resumes.find((r) => r.is_default) || resumes[0];

      if (!mainResume) {
        return this.jsonResponse(
          { success: false, error: 'No resumes found' },
          404,
        );
      }

      // 2. Fetch full resume details
      const detailResponse = await fetch(
        `https://www.wanted.co.kr/api/chaos/resumes/v1/${mainResume.id}`,
        {
          headers: { Cookie: cookies },
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!detailResponse.ok) {
        throw new Error(
          `Failed to fetch resume detail: ${detailResponse.status}`,
        );
      }

      const resumeData = await detailResponse.json();

      // 3. (Optional) Save to D1 if we had a resume table, or just return for now
      // Since this is "Scraping", returning the data is the primary goal for now.
      // The CLI can consume this endpoint to update local files.

      return this.jsonResponse({
        success: true,
        message: 'Resume scraped successfully',
        resume: resumeData,
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async triggerAutoApply(request) {
    const body = await request.json().catch(() => ({}));
    const { minMatchScore = 70, maxApplications = 5, dryRun = true } = body;

    const db = this.env?.DB;
    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      // 1. Get Wanted auth cookies
      const cookies = await this.auth.getCookies('wanted');
      if (!cookies) {
        return this.jsonResponse(
          {
            success: false,
            error: 'Wanted authentication required. Please login first.',
          },
          401,
        );
      }

      // 2. Get default resume ID
      const listResponse = await fetch(
        'https://www.wanted.co.kr/api/chaos/resumes/v1/list',
        {
          headers: { Cookie: cookies },
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!listResponse.ok) {
        throw new Error(`Failed to list resumes: ${listResponse.status}`);
      }

      const listData = await listResponse.json();
      const resumes = listData.data || [];
      const mainResume = resumes.find((r) => r.is_default) || resumes[0];

      if (!mainResume) {
        return this.jsonResponse(
          {
            success: false,
            error: 'No resume found. Please create a resume on Wanted first.',
          },
          404,
        );
      }

      // 3. Get high-match jobs from D1 that haven't been applied yet
      const jobs = await db
        .prepare(
          `SELECT id, job_id, position, company, match_score, source_url 
           FROM applications 
           WHERE source = 'wanted' 
             AND status = 'saved' 
             AND match_score >= ? 
           ORDER BY match_score DESC, created_at ASC 
           LIMIT ?`,
        )
        .bind(minMatchScore, maxApplications)
        .all();

      const candidates = jobs.results || [];

      if (candidates.length === 0) {
        return this.jsonResponse({
          success: true,
          message: 'No matching jobs found for auto-apply',
          applied: 0,
          failed: 0,
          skipped: 0,
          dryRun,
        });
      }

      const results = { applied: [], failed: [], skipped: [] };
      const now = new Date().toISOString();

      // 4. Apply to each job
      for (const job of candidates) {
        if (dryRun) {
          results.skipped.push({
            id: job.id,
            company: job.company,
            position: job.position,
            matchScore: job.match_score,
            reason: 'dry_run',
          });
          continue;
        }

        try {
          // Call Wanted Apply API
          const applyResponse = await fetch(
            'https://www.wanted.co.kr/api/chaos/applications/v2',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Cookie: cookies,
              },
              body: JSON.stringify({
                job_id: parseInt(job.job_id),
                resume_id: mainResume.id,
                cover_letter: '',
              }),
              signal: AbortSignal.timeout(15000),
            },
          );

          if (applyResponse.ok) {
            // Update status in D1
            await db
              .prepare(
                'UPDATE applications SET status = ?, updated_at = ? WHERE id = ?',
              )
              .bind('applied', now, job.id)
              .run();

            // Add timeline entry
            await db
              .prepare(
                'INSERT INTO application_timeline (application_id, status, note, timestamp) VALUES (?, ?, ?, ?)',
              )
              .bind(
                job.id,
                'applied',
                'Auto-applied via Worker automation',
                now,
              )
              .run();

            results.applied.push({
              id: job.id,
              company: job.company,
              position: job.position,
              matchScore: job.match_score,
            });
          } else {
            const errorText = await applyResponse
              .text()
              .catch(() => 'Unknown error');
            results.failed.push({
              id: job.id,
              company: job.company,
              position: job.position,
              error: `HTTP ${applyResponse.status}: ${errorText.slice(0, 100)}`,
            });
          }
        } catch (applyError) {
          results.failed.push({
            id: job.id,
            company: job.company,
            position: job.position,
            error: applyError.message,
          });
        }

        // Rate limit: wait 2s between applications
        if (!dryRun && candidates.indexOf(job) < candidates.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      // 5. Notify via Slack
      if (!dryRun && results.applied.length > 0) {
        const appliedList = results.applied
          .map((j) => `• ${j.company} - ${j.position} (${j.matchScore}%)`)
          .join('\n');

        await sendSlackMessage(this.env, {
          text: `✅ Auto-Apply Complete: ${results.applied.length} applications submitted`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Auto-Apply Results*\n${appliedList}`,
              },
            },
          ],
        });
      }

      return this.jsonResponse({
        success: true,
        message: dryRun
          ? `Dry run complete. ${candidates.length} jobs would be applied to.`
          : `Auto-apply complete. Applied: ${results.applied.length}, Failed: ${results.failed.length}`,
        applied: results.applied.length,
        failed: results.failed.length,
        skipped: results.skipped.length,
        dryRun,
        resumeId: mainResume.id,
        details: results,
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async triggerDailyReport(request) {
    const db = this.env?.DB;
    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const weekAgoStr = weekAgo.toISOString().split('T')[0];

      // 1. Get status summary
      const statusSummary = await db
        .prepare(
          `SELECT status, COUNT(*) as count 
           FROM applications 
           GROUP BY status`,
        )
        .all();

      // 2. Get today's new applications
      const todayNew = await db
        .prepare(
          `SELECT COUNT(*) as count 
           FROM applications 
           WHERE date(created_at) = date('now')`,
        )
        .first();

      // 3. Get this week's applications by day
      const weeklyActivity = await db
        .prepare(
          `SELECT date(created_at) as date, COUNT(*) as count 
           FROM applications 
           WHERE created_at >= ? 
           GROUP BY date(created_at) 
           ORDER BY date DESC`,
        )
        .bind(weekAgoStr)
        .all();

      // 4. Get high-priority pending items
      const pendingHighPriority = await db
        .prepare(
          `SELECT id, company, position, match_score, created_at 
           FROM applications 
           WHERE status IN ('saved', 'reviewing') 
             AND match_score >= 80 
           ORDER BY match_score DESC 
           LIMIT 5`,
        )
        .all();

      // 5. Get recent status changes
      const recentChanges = await db
        .prepare(
          `SELECT t.application_id, t.status, t.note, t.timestamp, a.company, a.position 
           FROM application_timeline t 
           JOIN applications a ON t.application_id = a.id 
           WHERE t.timestamp >= ? 
           ORDER BY t.timestamp DESC 
           LIMIT 10`,
        )
        .bind(yesterdayStr)
        .all();

      const report = {
        generatedAt: now.toISOString(),
        summary: {
          total: (statusSummary.results || []).reduce(
            (sum, r) => sum + r.count,
            0,
          ),
          byStatus: Object.fromEntries(
            (statusSummary.results || []).map((r) => [r.status, r.count]),
          ),
          newToday: todayNew?.count || 0,
        },
        weeklyActivity: (weeklyActivity.results || []).map((r) => ({
          date: r.date,
          count: r.count,
        })),
        pendingHighPriority: (pendingHighPriority.results || []).map((r) => ({
          id: r.id,
          company: r.company,
          position: r.position,
          matchScore: r.match_score,
        })),
        recentChanges: (recentChanges.results || []).map((r) => ({
          company: r.company,
          position: r.position,
          status: r.status,
          note: r.note,
          timestamp: r.timestamp,
        })),
      };

      // 6. Send to Slack
      const statusLine = Object.entries(report.summary.byStatus)
        .map(([status, count]) => `${status}: ${count}`)
        .join(' | ');

      const highPriorityList =
        report.pendingHighPriority.length > 0
          ? report.pendingHighPriority
              .map((j) => `• ${j.company} - ${j.position} (${j.matchScore}%)`)
              .join('\n')
          : 'None';

      await sendSlackMessage(this.env, {
        text: `📊 Daily Job Report - ${now.toISOString().split('T')[0]}`,
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: '📊 Daily Job Report' },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Summary*\nTotal: ${report.summary.total} | New Today: ${report.summary.newToday}\n${statusLine}`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*High Priority (80%+ match)*\n${highPriorityList}`,
            },
          },
        ],
      });

      return this.jsonResponse({
        success: true,
        message: 'Daily report generated',
        report,
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async notifySlack(request) {
    const body = await request.json();
    const { type, data } = body;
    const webhookUrl = this.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      return this.jsonResponse(
        { success: false, error: 'Slack webhook not configured' },
        400,
      );
    }

    let message;
    switch (type) {
      case 'high_match_job':
        message = {
          text: `🎯 High Match Job: ${data.job?.title} at ${data.job?.company}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${data.job?.title}*\n${data.job?.company} | Match: ${data.job?.matchScore}%`,
              },
            },
          ],
        };
        break;

      case 'status_change':
        message = {
          text: `📋 Status changed: ${data.application?.company} - ${data.oldStatus} → ${data.newStatus}`,
        };
        break;

      case 'daily_report':
        message = {
          text: `📊 Daily Report: ${data.report?.newApplications || 0} new, ${data.report?.applied || 0} applied`,
        };
        break;

      default:
        message = { text: data.text || 'Notification from Job Dashboard' };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
        signal: AbortSignal.timeout(10000),
      });

      return this.jsonResponse({ success: response.ok });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async triggerProfileSync(request) {
    const body = await request.json().catch(() => ({}));
    const {
      ssotData, // Resume data from SSOT
      platforms = ['wanted', 'jobkorea', 'saramin'],
      dryRun = true,
      callbackUrl, // n8n or external automation server (legacy, optional)
    } = body;

    const db = this.env?.DB;
    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      const now = new Date().toISOString();

      // Validate SSOT data
      if (!ssotData || !ssotData.personal) {
        return this.jsonResponse(
          { success: false, error: 'Invalid SSOT data: missing personal info' },
          400,
        );
      }

      // Map SSOT to platform-specific profile data
      const profileData = {
        name: ssotData.personal?.name,
        email: ssotData.personal?.email,
        phone: ssotData.personal?.phone,
        headline:
          `${ssotData.current?.position || 'Engineer'} | ${ssotData.summary?.totalExperience || ''}`.trim(),
        skills: Array.isArray(ssotData.summary?.expertise)
          ? ssotData.summary.expertise.join(',')
          : '',
        summary: ssotData.summary?.tagline || '',
      };

      // Store sync request in D1 for tracking
      const syncId = `sync_${Date.now()}`;
      await db
        .prepare(
          `INSERT INTO profile_syncs (id, platforms, profile_data, status, dry_run, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          syncId,
          JSON.stringify(platforms),
          JSON.stringify(profileData),
          'pending',
          dryRun ? 1 : 0,
          now,
          now,
        )
        .run()
        .catch(() => {
          // Table might not exist, continue anyway
        });

      // Results accumulator
      const results = {};

      // ============================================================
      // WANTED: Direct Chaos API Integration (no callback needed)
      // ============================================================
      if (platforms.includes('wanted')) {
        const wantedResult = await this._syncWantedProfile(
          ssotData,
          profileData,
          dryRun,
        );
        results.wanted = wantedResult;
      }

      // ============================================================
      // Other platforms: Legacy callback-based automation
      // ============================================================
      const otherPlatforms = platforms.filter((p) => p !== 'wanted');

      if (otherPlatforms.length > 0 && callbackUrl) {
        const callbackPayload = {
          syncId,
          platforms: otherPlatforms,
          profileData,
          dryRun,
          timestamp: now,
        };

        // Get auth cookies for each platform
        const platformAuth = {};
        for (const platform of otherPlatforms) {
          const cookies = await this.auth.getCookies(platform);
          platformAuth[platform] = { authenticated: !!cookies };
        }
        callbackPayload.platformAuth = platformAuth;

        // Async call to external automation
        const callbackResponse = await fetch(callbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(callbackPayload),
          signal: AbortSignal.timeout(30000),
        }).catch((err) => ({ ok: false, error: err.message }));

        if (callbackResponse.ok) {
          const callbackResult = await callbackResponse
            .json()
            .catch(() => ({}));
          for (const platform of otherPlatforms) {
            results[platform] = {
              method: 'callback',
              dispatched: true,
              automationResult: callbackResult,
            };
          }
        } else {
          for (const platform of otherPlatforms) {
            results[platform] = {
              method: 'callback',
              error:
                callbackResponse.error || `HTTP ${callbackResponse.status}`,
            };
          }
        }
      } else if (otherPlatforms.length > 0) {
        // No callback URL for other platforms
        for (const platform of otherPlatforms) {
          const cookies = await this.auth.getCookies(platform);
          results[platform] = {
            method: 'callback_required',
            authenticated: !!cookies,
            wouldUpdate: profileData,
            message: 'Browser automation required (provide callbackUrl)',
          };
        }
      }

      // Update sync status
      await db
        .prepare(
          'UPDATE profile_syncs SET status = ?, updated_at = ? WHERE id = ?',
        )
        .bind(dryRun ? 'dry_run_complete' : 'synced', now, syncId)
        .run()
        .catch(() => {});

      return this.jsonResponse({
        success: true,
        message: dryRun
          ? 'Dry run complete. See platformResults for details.'
          : 'Profile sync completed. See platformResults for details.',
        syncId,
        dryRun,
        platforms,
        profileData,
        platformResults: results,
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  /**
   * Sync profile to Wanted using Chaos API directly (no browser automation)
   * @param {Object} ssotData - SSOT resume data
   * @param {Object} profileData - Mapped profile data
   * @param {boolean} dryRun - If true, return diff without applying changes
   * @returns {Object} Sync result
   */
  async _syncWantedProfile(ssotData, profileData, dryRun) {
    const { WantedClient } = await import('../services/wanted-client.js');
    const client = new WantedClient();

    // Get session cookies from KV
    const cookies = await this.env?.SESSIONS?.get('wanted:session');
    if (!cookies) {
      return {
        method: 'chaos_api',
        error: 'Not authenticated - no session cookies',
        authenticated: false,
      };
    }
    client.setCookies(cookies);

    try {
      // 1. Get current resume list and select primary resume
      const resumes = await client.getResumeList();
      if (!resumes || resumes.length === 0) {
        return {
          method: 'chaos_api',
          error: 'No resumes found in Wanted account',
          authenticated: true,
        };
      }

      const resumeId = resumes[0]?.id;
      const currentResume = await client.getResumeDetail(resumeId);

      // 2. Build diff/changes
      const changes = {
        profile: { current: null, proposed: profileData.headline },
        careers: [],
        skills: [],
      };

      // Compare careers if present in SSOT
      if (ssotData.careers && Array.isArray(ssotData.careers)) {
        const currentCareers = currentResume?.careers || [];
        changes.careers = this._diffCareers(currentCareers, ssotData.careers);
      }

      if (dryRun) {
        return {
          method: 'chaos_api',
          authenticated: true,
          dryRun: true,
          resumeId,
          currentResume: {
            id: currentResume?.id,
            title: currentResume?.title,
            careersCount: currentResume?.careers?.length || 0,
            skillsCount: currentResume?.skills?.length || 0,
          },
          proposedChanges: changes,
          wouldUpdate: profileData,
        };
      }

      // 3. Apply changes (not dry run)
      const syncResults = { updated: [], failed: [] };

      // Update profile headline
      try {
        await client.updateProfile({ description: profileData.headline });
        syncResults.updated.push('profile_headline');
      } catch (err) {
        syncResults.failed.push({
          section: 'profile_headline',
          error: err.message,
        });
      }

      // Note: Full career/skill sync requires more complex diff logic
      // For now, just regenerate the resume PDF to capture any manual changes
      try {
        await client.saveResume(resumeId);
        syncResults.updated.push('resume_pdf');
      } catch (err) {
        syncResults.failed.push({ section: 'resume_pdf', error: err.message });
      }

      return {
        method: 'chaos_api',
        authenticated: true,
        dryRun: false,
        resumeId,
        syncResults,
        message: `Synced ${syncResults.updated.length} sections, ${syncResults.failed.length} failed`,
      };
    } catch (error) {
      return {
        method: 'chaos_api',
        authenticated: true,
        error: error.message,
      };
    }
  }

  /**
   * Diff SSOT careers with current Wanted careers
   * @param {Array} currentCareers - Current careers from Wanted
   * @param {Array} ssotCareers - SSOT careers
   * @returns {Array} Diff results
   */
  _diffCareers(currentCareers, ssotCareers) {
    const diffs = [];
    for (const ssotCareer of ssotCareers) {
      const existing = currentCareers.find(
        (c) =>
          c.company_name === ssotCareer.company || c.title === ssotCareer.role,
      );
      if (existing) {
        diffs.push({
          action: 'update',
          careerId: existing.id,
          company: ssotCareer.company,
          changes: { role: ssotCareer.role, period: ssotCareer.period },
        });
      } else {
        diffs.push({
          action: 'add',
          company: ssotCareer.company,
          role: ssotCareer.role,
          period: ssotCareer.period,
        });
      }
    }
    return diffs;
  }

  async getProfileSyncStatus(request) {
    const syncId = request.params?.syncId;
    const db = this.env?.DB;

    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      const sync = await db
        .prepare('SELECT * FROM profile_syncs WHERE id = ?')
        .bind(syncId)
        .first();

      if (!sync) {
        return this.jsonResponse(
          { success: false, error: 'Sync not found' },
          404,
        );
      }

      return this.jsonResponse({
        success: true,
        sync: {
          id: sync.id,
          platforms: JSON.parse(sync.platforms || '[]'),
          status: sync.status,
          dryRun: !!sync.dry_run,
          result: sync.result ? JSON.parse(sync.result) : null,
          createdAt: sync.created_at,
          updatedAt: sync.updated_at,
        },
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async updateProfileSyncStatus(request) {
    const body = await request.json().catch(() => ({}));
    const { syncId, status, result } = body;
    const db = this.env?.DB;

    if (!db) {
      return this.jsonResponse(
        { success: false, error: 'Database not configured' },
        503,
      );
    }

    try {
      const now = new Date().toISOString();
      await db
        .prepare(
          'UPDATE profile_syncs SET status = ?, result = ?, updated_at = ? WHERE id = ?',
        )
        .bind(status, JSON.stringify(result || {}), now, syncId)
        .run();

      // Notify via Slack
      if (status === 'completed') {
        const platforms = result?.platforms || [];
        const successCount = platforms.filter((p) => p.success).length;

        await sendSlackMessage(this.env, {
          text: `✅ Profile Sync Complete: ${successCount}/${platforms.length} platforms updated`,
        });
      }

      return this.jsonResponse({
        success: true,
        message: 'Sync status updated',
        syncId,
        status,
      });
    } catch (error) {
      return this.jsonResponse({ success: false, error: error.message }, 500);
    }
  }

  async handleSlackInteraction(request) {
    const body = await request.json();
    const payload = body.payload ? JSON.parse(body.payload) : body;

    const actions = payload.actions || [];
    if (actions.length === 0) {
      return this.jsonResponse({ ok: true });
    }

    const action = actions[0];
    const actionId = action.action_id;
    const value = action.value;

    if (actionId?.startsWith('apply_')) {
      return this.jsonResponse({
        response_type: 'ephemeral',
        text: `Processing application: ${value}`,
      });
    }

    if (actionId?.startsWith('skip_')) {
      return this.jsonResponse({
        response_type: 'ephemeral',
        text: `Skipped: ${value}`,
      });
    }

    return this.jsonResponse({ ok: true });
  }

  /**
   * Test endpoint for Chaos API resume integration
   * GET /api/test/chaos-resumes
   */
  async testChaosResumes(request) {
    try {
      const cookies = await this.env?.SESSIONS?.get('wanted:session');
      if (!cookies) {
        return this.jsonResponse({
          success: false,
          error: 'No session cookies found',
          authenticated: false,
        });
      }

      // Debug: Test direct fetch to see what's happening with Worker fetch
      const debugUrl = 'https://www.wanted.co.kr/api/chaos/resumes/v1';
      const debugResp = await fetch(debugUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
          Referer: 'https://www.wanted.co.kr/',
          Origin: 'https://www.wanted.co.kr',
          Cookie: cookies,
        },
      });

      const debugBody = await debugResp.text();

      if (!debugResp.ok) {
        return this.jsonResponse({
          success: false,
          debug: true,
          fetchStatus: debugResp.status,
          fetchStatusText: debugResp.statusText,
          cookiesLength: cookies.length,
          hasToken: cookies.includes('WWW_ONEID_ACCESS_TOKEN'),
          responsePreview: debugBody.substring(0, 300),
        });
      }

      // Direct fetch worked - return the data directly without WantedClient
      const debugData = JSON.parse(debugBody);
      const resumes = debugData.data || [];

      return this.jsonResponse({
        success: true,
        authenticated: true,
        resumeCount: resumes?.length || 0,
        resumes: resumes?.map((r) => ({
          id: r.id,
          title: r.title,
          updatedAt: r.updated_at,
        })),
      });
    } catch (error) {
      return this.jsonResponse(
        {
          success: false,
          error: error.message,
          stack: error.stack?.split('\n').slice(0, 3).join(' | '),
        },
        500,
      );
    }
  }
}
