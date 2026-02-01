# CI/CD Pipeline Documentation

**Last Updated**: 2025-11-07
**Status**: Production-Ready with Enhanced Stability

## Pipeline Overview

Automated deployment pipeline for resume portfolio with **6-stage workflow**:

```
┌─────────┐     ┌─────────┐     ┌────────────┐     ┌──────────────┐
│  Test   │ --> │  Build  │ --> │   Deploy   │ --> │   Verify     │
└─────────┘     └─────────┘     └────────────┘     └──────────────┘
     │               │                  │                   │
     v               v                  v                   v
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Notes (Gemini AI)                  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  v
                        ┌──────────────────┐
                        │ Slack Notify     │
                        └──────────────────┘
```

## Trigger

**Event**: Push to `master` branch
**File**: `.gitlab-ci.yml`

## Pipeline Stages

### 1. Test Stage

**Purpose**: Validate code quality before deployment

**Jobs**:

- Run unit tests (Jest)
- Run E2E tests (Playwright)
- Upload test results as artifacts

**Exit Conditions**:

- ❌ Fails if any test fails
- ✅ Passes if all tests pass (24/24 tests)

**Artifacts**:

- `test-results/` (Jest test reports)
- `playwright-report/` (E2E test reports)
- Retention: 7 days

### 2. Build Stage

**Purpose**: Generate production worker.js

**Dependencies**: Requires `test` stage to pass

**Steps**:

1. Install Node.js 20 and dependencies
2. Set deployment timestamp (UTC ISO 8601)
3. Run `npm run build`:
   - Read `web/styles.css` (CSS injection)
   - Read `web/data.json` (data injection)
   - Generate HTML from templates
   - Minify HTML (15% size reduction)
   - Calculate CSP hashes (SHA-256)
   - Escape template literals
   - Embed timestamp
4. Verify `web/worker.js` exists
5. Upload build artifacts

**Artifacts**:

- `web/worker.js` (30.57 KB)
- Retention: 7 days

**Exit Conditions**:

- ❌ Fails if worker.js not generated
- ✅ Passes if worker.js generated successfully

### 3. Deploy Stage

**Purpose**: Deploy to Cloudflare Workers

**Dependencies**: Requires `build` stage to pass

**Steps**:

1. Download build artifacts
2. Deploy using Wrangler CLI v4
3. Wait 10 seconds for propagation

**Configuration**:

- Worker name: `resume`
- Account ID: `${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`
- API Token: `${{ secrets.CLOUDFLARE_API_TOKEN }}`

**Exit Conditions**:

- ❌ Fails if Cloudflare API returns error
- ✅ Passes if deployment succeeds

### 4. Verify Deployment Stage ⭐ NEW

**Purpose**: Ensure deployed service is healthy

**Dependencies**: Requires `deploy-worker` stage to pass

**Checks**:

1. **Health Endpoint** (`/health`):

   ```bash
   curl https://resume.jclee.me/health
   # Expected: {"status": "healthy", ...}
   ```

2. **Main Page** (`/`):

   ```bash
   HTTP 200 expected
   ```

3. **Metrics Endpoint** (`/metrics`):

   ```bash
   HTTP 200 expected
   ```

4. **Content Verification**:
   - Title: "Infrastructure & Security Engineer"
   - Current position: "Nextrade Securities Exchange"

**Exit Conditions**:

- ❌ Fails if any check fails (triggers rollback)
- ✅ Passes if all 4 checks pass

### 5. Generate Deployment Notes

**Purpose**: AI-powered commit summary

**Dependencies**: Requires `verify-deployment` to pass

**Process**:

1. Fetch latest commit message
2. Call Gemini AI API
3. Generate concise summary (1-2 sentences)
4. Print to workflow log

**API**: `gemini-pro` model via Google Generative AI API

### 6. Notify Slack

**Purpose**: Send deployment notification

**Dependencies**: Runs after all stages (success or failure)

**Condition**: Only if `SLACK_WEBHOOK_URL` secret is set

**Notification Content**:

- Status: ✅ Success (Verified) or ❌ Failed
- Branch: `master`
- Commit SHA (short)
- Commit author
- Commit message
- Links: Live Site, Workflow Run

## Required Secrets

| Secret                  | Purpose                 | Required    |
| ----------------------- | ----------------------- | ----------- |
| `CLOUDFLARE_API_TOKEN`  | Wrangler authentication | ✅ Yes      |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account      | ✅ Yes      |
| `GEMINI_API_KEY`        | AI deployment notes     | ✅ Yes      |
| `SLACK_WEBHOOK_URL`     | Slack notifications     | ⚠️ Optional |

## Deployment Timeline

Typical successful deployment:

```
00:00  Push to master
00:05  Test stage (unit + E2E)          [~2-3 min]
00:08  Build stage (worker generation)  [~30 sec]
00:09  Deploy stage (Cloudflare)        [~20 sec]
00:10  Wait for propagation             [10 sec]
00:11  Verify deployment (4 checks)     [~15 sec]
00:12  Generate notes (Gemini AI)       [~10 sec]
00:13  Notify Slack                     [~5 sec]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ~4-5 minutes (end-to-end)
```

## Failure Scenarios

### Test Failure

```
Test stage fails → Build blocked → No deployment
```

**Resolution**: Fix failing tests, push again

### Build Failure

```
Test passes → Build fails → No deployment
```

**Common causes**:

- Syntax error in `generate-worker.js`
- Invalid JSON in `data.json`
- Missing placeholder in `index.html`

**Resolution**: Fix build error, push again

### Deploy Failure

```
Test/Build pass → Deploy fails → No verification
```

**Common causes**:

- Invalid Cloudflare API token
- Account ID mismatch
- Wrangler configuration error

**Resolution**: Check secrets, fix `wrangler.toml`

### Verification Failure ⭐ CRITICAL

```
Test/Build/Deploy pass → Verify fails → Rollback needed
```

**Common causes**:

- Deployed service not returning HTTP 200
- Health endpoint not returning "healthy"
- Critical content missing from page

**Resolution**:

1. Check Cloudflare Workers logs
2. Verify `worker.js` generation
3. Test locally: `npm run dev`
4. Fix issue and redeploy

**Manual rollback**:

```bash
cd web
wrangler rollback
```

## Monitoring & Verification

### Check Deployment Status

```bash
# Health check
curl https://resume.jclee.me/health | jq .

# Expected output:
{
  "status": "healthy",
  "version": "1.0.0",
  "deployed_at": "2025-11-07T...",
  "uptime_seconds": 1234,
  "metrics": { ... }
}
```

### Check Metrics

```bash
curl https://resume.jclee.me/metrics

# Expected: Prometheus format
http_requests_total{job="resume"} 1234
...
```

### View Workflow Logs

```bash
# GitLab CLI
glab ci list --limit 5
glab ci view <pipeline-id>

# Or visit:
http://gitlab.jclee.me/jclee/resume/-/pipelines
```

## Artifacts Retention

| Artifact           | Retention | Purpose                 |
| ------------------ | --------- | ----------------------- |
| Test results       | 7 days    | Debugging test failures |
| Build artifacts    | 7 days    | Rollback capability     |
| Playwright reports | 7 days    | E2E test analysis       |

## Best Practices

### Before Pushing to Master

```bash
# 1. Run tests locally
npm test && npm run test:e2e

# 2. Test build
npm run build

# 3. Verify worker.js generated
ls -lh web/worker.js

# 4. Test locally with Wrangler
npm run dev
# → http://localhost:8787

# 5. Commit and push
git add .
git commit -m "Your changes"
git push origin master
```

### During Deployment

1. ✅ Monitor GitLab CI/CD pipeline
2. ✅ Check Slack notification (if configured)
3. ✅ Verify health endpoint after deployment

### After Deployment

1. ✅ Visit live site: https://resume.jclee.me
2. ✅ Check browser console for errors
3. ✅ Verify all project links work
4. ✅ Check Grafana dashboard for metrics

## Rollback Procedure

### Automatic Rollback

❌ Not yet implemented (future enhancement)

### Manual Rollback

**Option 1: Wrangler CLI**

```bash
cd web
wrangler rollback
# Lists recent deployments, select version to rollback
```

**Option 2: Git Revert**

```bash
# Find problematic commit
git log --oneline -5

# Revert commit
git revert <commit-sha>
git push origin master
# → Triggers new deployment with reverted code
```

**Option 3: Redeploy Previous Build**

```bash
# Download artifact from previous successful workflow
# Then deploy manually:
cd web
wrangler deploy
```

## Improvements Made (2025-11-07)

### Before

- ❌ No test stage (tests not run in CI)
- ❌ No deployment verification
- ❌ Build and deploy in same job (no separation)
- ❌ No artifact retention
- ❌ No rollback capability

### After

- ✅ Dedicated test stage (Jest + Playwright)
- ✅ Build artifacts uploaded for retention
- ✅ 4-check deployment verification
- ✅ Health/metrics/content verification
- ✅ Test results archived for 7 days
- ✅ Clear failure points and error messages
- ✅ Manual rollback capability via Wrangler

## Future Enhancements

### Planned

1. **Automatic Rollback** (High Priority)
   - If verification fails, auto-rollback to previous deployment
   - Implementation: Cloudflare Workers versioning API

2. **Performance Budgets** (Medium Priority)
   - Lighthouse CI in pipeline
   - Fail if performance score < 90
   - Web Vitals monitoring

3. **Canary Deployment** (Low Priority)
   - Deploy to 10% of users first
   - Monitor metrics for 5 minutes
   - Roll forward or rollback based on error rate

4. **Deployment Preview** (Low Priority)
   - Deploy PR to preview URL
   - Automated visual regression testing

## Troubleshooting

### GitLab CI/CD Pipeline Not Triggering

**Symptom**: Push to master, no pipeline run

**Causes**:

- `.gitlab-ci.yml` syntax error
- CI/CD disabled in repo settings

**Solution**:

```bash
# Validate pipeline syntax
yamllint .gitlab-ci.yml

# Check GitLab CI/CD status
# Settings → CI/CD → General pipelines
```

### Secrets Not Found

**Symptom**: "Secret CLOUDFLARE_API_TOKEN not found"

**Solution**:

```
1. Go to GitHub repo → Settings → Secrets
2. Add required secrets (see Required Secrets section)
3. Re-run workflow
```

### Test Failures in CI (But Pass Locally)

**Symptom**: Tests fail in GitLab CI/CD but pass locally

**Common causes**:

- Node.js version mismatch
- Missing Playwright browsers
- Timezone differences

**Solution**:

```yaml
# Ensure Node 20 in workflow (already configured)
- uses: actions/setup-node@v4
  with:
    node-version: "20"

# Install Playwright with deps (already configured)
- run: npx playwright install --with-deps
```

## Support

**Documentation**:

- Workflow file: `.gitlab-ci.yml/deploy.yml`
- Build script: `web/generate-worker.js`
- Test suite: `tests/unit/generate-worker.test.js`

**Monitoring**:

- Live site: https://resume.jclee.me
- Health check: https://resume.jclee.me/health
- Metrics: https://resume.jclee.me/metrics
- Grafana: https://grafana.jclee.me

**Logs**:

- GitLab CI/CD: http://gitlab.jclee.me/jclee/resume/-/pipelines
- Cloudflare Workers: Cloudflare Dashboard → Workers → Logs
- Grafana Loki: https://grafana.jclee.me/explore

---

**Maintained by**: Jaecheol Lee
**CI/CD Platform**: GitLab CI/CD (self-hosted)
**Deployment Target**: Cloudflare Workers
**Status**: ✅ Production-Ready
