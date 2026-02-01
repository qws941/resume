# Deployment Guide

## Prerequisites

- Node.js 20+
- Wrangler CLI (Cloudflare Workers)
- Git
- Cloudflare account with Workers enabled

## Environment Setup

### 1. Install Wrangler

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

### 3. Configure Secrets

Create `.env` file (DO NOT commit):

```bash
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
GEMINI_API_KEY=your_gemini_key  # Optional: for deployment notes
```

Use `.env.example` as template.

## Manual Deployment

### Step 1: Update Content

```bash
# Edit master resume
vim master/resume_master.md

# Update web portfolio
vim web/index.html
vim web/resume.html
```

### Step 2: Generate Worker

**⚠️ CRITICAL**: Must run before deployment

```bash
cd web
node generate-worker.js
```

This script:
- Reads `index.html` and `resume.html`
- Escapes backticks (`) and dollar signs ($)
- Embeds HTML into `worker.js` as template literals
- Generates routing logic

### Step 3: Deploy to Cloudflare

```bash
cd web
wrangler deploy
```

### Step 4: Verify Deployment

```bash
curl -I https://resume.jclee.me
# Expected: HTTP/2 200

curl https://resume.jclee.me/resume
# Expected: Resume page HTML
```

## Automated Deployment (GitLab CI/CD)

### Workflow Trigger

Push to `master` branch auto-deploys via `.gitlab-ci.yml/deploy.yml`

### Workflow Steps

1. **Checkout code**: `actions/checkout@v4`
2. **Setup Node.js**: `actions/setup-node@v4` (v20)
3. **Install Wrangler**: `npm install -g wrangler`
4. **Deploy Worker**: `cloudflare/wrangler-action@v3`
5. **Generate Deployment Notes**: Gemini API summarizes commit

### Required GitHub Secrets

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `GEMINI_API_KEY`: Google Gemini API key (optional)

## Rollback Procedure

### Option 1: Via Wrangler

```bash
# List deployments
wrangler deployments list

# Rollback to previous version
wrangler rollback
```

### Option 2: Via Git

```bash
# Revert to previous commit
git revert HEAD

# Regenerate worker
cd web && node generate-worker.js

# Redeploy
wrangler deploy
```

### Option 3: Via Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select `resume` worker
3. Click "Rollback" on deployments tab

## Build Pipeline Enhancement

### Current Issue
Manual step required: `node generate-worker.js`

### Recommended Fix

Update `.gitlab-ci.yml/deploy.yml`:

```yaml
jobs:
  deploy-worker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      # ADD THIS STEP
      - name: Generate Worker
        run: cd web && node generate-worker.js

      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
          workingDirectory: web
```

## Multi-Environment Setup

### Development

```bash
# Edit wrangler.toml
[env.dev]
name = "resume-dev"
vars = { ENVIRONMENT = "development" }

# Deploy to dev
wrangler deploy --env dev
```

### Staging

```bash
[env.staging]
name = "resume-staging"
vars = { ENVIRONMENT = "staging" }

wrangler deploy --env staging
```

### Production

```bash
# Default environment
wrangler deploy
# → Deploys to resume.jclee.me
```

## Monitoring & Logs

### View Logs

```bash
# Tail live logs
wrangler tail

# Filter by status
wrangler tail --status error
```

### Analytics

Check Cloudflare Dashboard → Workers → resume → Analytics:
- Requests per second
- CPU time
- Errors
- Geographic distribution

### Health Check

```bash
# Automated health check
curl -f https://resume.jclee.me || echo "Site down!"

# Response time check
curl -w "@curl-format.txt" -o /dev/null -s https://resume.jclee.me
```

Create `curl-format.txt`:
```
time_namelookup:  %{time_namelookup}\n
time_connect:     %{time_connect}\n
time_total:       %{time_total}\n
```

## Troubleshooting Deployment

### Issue: "Worker exceeds size limit"

**Solution**: Minify HTML/CSS

```bash
# Install minifier
npm install -g html-minifier

# Minify before build
html-minifier --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  web/index.html -o web/index.min.html

# Update generate-worker.js to use minified version
```

### Issue: "Route not found"

**Solution**: Check `wrangler.toml` routes

```toml
# Ensure no route conflicts
# Workers don't need route config for *.workers.dev
```

### Issue: "Stale HTML after deploy"

**Cause**: Forgot to run `generate-worker.js`

**Solution**: Add pre-deploy hook (see Build Pipeline Enhancement above)

### Issue: "CORS errors"

**Solution**: Add CORS headers to `worker.js`

```javascript
return new Response(html, {
  headers: {
    'Content-Type': 'text/html;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});
```

## Performance Optimization

### Enable Caching

```javascript
// worker.js
export default {
  async fetch(request) {
    const response = new Response(INDEX_HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',  // 1 hour cache
      },
    });
    return response;
  },
};
```

### Use Workers KV for Assets

For larger assets:

```bash
# Create KV namespace
wrangler kv:namespace create "ASSETS"

# Update wrangler.toml
kv_namespaces = [
  { binding = "ASSETS", id = "xxx" }
]
```

## Deployment Checklist

- [ ] Update `master/resume_master.md`
- [ ] Derive company-specific versions
- [ ] Update `web/index.html` if needed
- [ ] **Run `node web/generate-worker.js`** ⚠️
- [ ] Test locally: `wrangler dev`
- [ ] Deploy: `wrangler deploy`
- [ ] Verify: `curl https://resume.jclee.me`
- [ ] Check analytics for errors
- [ ] Update deployment notes

## Quick Commands

```bash
# Local development
cd web && wrangler dev

# Generate worker (REQUIRED before deploy)
cd web && node generate-worker.js

# Deploy to production
cd web && wrangler deploy

# Tail logs
wrangler tail

# Rollback
wrangler rollback

# Check deployment status
wrangler deployments list
```
