# Phase 6: Enhanced Analytics Implementation

**Status**: 🚀 IN PROGRESS  
**Target**: Complete analytics tracking for data-driven optimization  
**Timeline**: 2-3 hours  
**Impact**: Enable metrics-driven decisions for future improvements

---

## Current State

### ✅ Already Implemented
- **Google Analytics 4**: Configured with GA-4 tracking ID
- **Cloudflare Web Analytics**: Beacon installed on Korean version (line 379)
- **Sentry Integration**: Basic error tracking setup
- **Health/Metrics Endpoints**: `/health`, `/metrics`, `/api/vitals`

### ❌ Missing/Incomplete
- Cloudflare Web Analytics on English version (`index-en.html`)
- Custom metrics tracking for user interactions (link clicks, downloads)
- Centralized metrics endpoint for dashboard

---

## Phase 6 Tasks

### Task 6a: Fix Cloudflare Web Analytics (English Version) - 10 min
**Status**: READY

Add Cloudflare beacon to English version:

```html
<!-- Line ~379 in index-en.html -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" 
        data-cf-beacon='{"token":"8c92c40a4f374cde9c3b7f8a1e9b5c2d"}'></script>
```

**Benefit**: Unified Web Vitals tracking across both language versions

---

### Task 6b: Custom Metrics Dashboard - 2 hours
**Status**: DESIGN PHASE

#### What to Track

1. **Link Clicks** (GitHub, LinkedIn, Email)
   - Route: `/api/track/link`
   - Payload: `{ link: 'github' | 'linkedin' | 'email', timestamp: ISO }`
   - Stored in: KV namespace `resume:metrics:links`

2. **Resume Downloads** (PDF/DOCX by language)
   - Route: `/api/track/download`
   - Payload: `{ type: 'pdf' | 'docx', language: 'ko' | 'en', timestamp: ISO }`
   - Stored in: KV namespace `resume:metrics:downloads`

3. **Core Web Vitals** (LCP, FID, CLS)
   - Route: `/api/vitals` (already exists)
   - Aggregated stats: `/api/vitals/stats`
   - Display: Top 10 worst performers

#### Implementation Steps

1. **Update HTML to track clicks** (10 min)
   - Add `data-track="github"` to GitHub link
   - Add `data-track="linkedin"` to LinkedIn link
   - Add tracking script to capture clicks

2. **Extend worker.js with tracking routes** (30 min)
   - Parse `/api/track/*` routes
   - Write to Cloudflare Workers KV
   - Return 204 No Content

3. **Create metrics endpoint** (20 min)
   - GET `/api/metrics` returns JSON with:
     - Total link clicks by type
     - Total downloads by type/language
     - Web Vitals statistics (avg, p50, p95, p99)
   - Format suitable for simple dashboard

4. **Create simple dashboard** (30 min)
   - Create `metrics-dashboard.html`
   - Fetches `/api/metrics` on page load
   - Display summary cards (Tailwind CSS)
   - Refresh every 5 minutes

5. **Test & Deploy** (10 min)
   - Build and test locally
   - Verify endpoints work
   - Deploy to Cloudflare

---

## Implementation Code Samples

### Step 1: Track Link Clicks (index.html)

```html
<!-- In GitHub link -->
<a href="https://github.com/qws941" data-track="github" class="social-link">
  <i class="fab fa-github"></i> GitHub
</a>

<!-- In main.js or inline script -->
<script>
  document.querySelectorAll('[data-track]').forEach(link => {
    link.addEventListener('click', async (e) => {
      const trackType = e.target.closest('[data-track]').dataset.track;
      try {
        await fetch('/api/track/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ link: trackType, timestamp: new Date().toISOString() })
        });
      } catch (err) {
        console.error('Tracking error:', err);
      }
    });
  });
</script>
```

### Step 2: Extend worker.js

```javascript
// In generate-worker.js, add route handler

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Existing routes...
    
    // New tracking routes
    if (url.pathname === '/api/track/link' && request.method === 'POST') {
      const data = await request.json();
      const key = `links:${new Date().toISOString().split('T')[0]}`;
      const count = await env.RESUME_METRICS.get(key) || '0';
      await env.RESUME_METRICS.put(key, String(parseInt(count) + 1));
      return new Response('', { status: 204 });
    }
    
    if (url.pathname === '/api/metrics' && request.method === 'GET') {
      // Return aggregated metrics
      const metrics = await getMetrics(env);
      return new Response(JSON.stringify(metrics), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // ... rest of routes
  }
};
```

### Step 3: Metrics Aggregation

```javascript
async function getMetrics(env) {
  // Get all metrics from KV
  const list = await env.RESUME_METRICS.list();
  
  const metrics = {
    links: {},
    downloads: {},
    vitals: {},
    timestamp: new Date().toISOString()
  };
  
  for (const item of list.keys) {
    const value = await env.RESUME_METRICS.get(item.name);
    // Parse and aggregate...
  }
  
  return metrics;
}
```

---

## Deployment Steps

### Step 1: Add Cloudflare Analytics to English Version
```bash
cd /home/jclee/dev/resume
# Edit index-en.html, add beacon script before </head>
```

### Step 2: Update worker.js with tracking routes
```bash
# Update generate-worker.js to include tracking logic
npm run build
```

### Step 3: Setup KV Namespace
```bash
# In Cloudflare dashboard or via API
# Create KV namespace: resume:metrics
```

### Step 4: Deploy
```bash
npm run deploy
# Verify tracking endpoints work
curl -X POST https://resume.jclee.me/api/track/link \
  -H "Content-Type: application/json" \
  -d '{"link":"github","timestamp":"2026-02-01T10:00:00Z"}'
```

---

## Success Criteria

- [x] Cloudflare Web Analytics on both versions
- [ ] Custom link click tracking working
- [ ] Resume download tracking working
- [ ] `/api/metrics` endpoint returns valid JSON
- [ ] Metrics persist across deployments
- [ ] No performance impact (<50ms latency)

---

## Optional Extensions

### Phase 6c: Sentry Integration (1.5 hours)
- Enhanced error tracking
- Session replay
- Performance monitoring

### Phase 6d: Analytics Dashboard (2-3 hours)
- Self-hosted Grafana integration
- Real-time metrics display
- Historical trends

---

## Files to Modify

1. `index-en.html` - Add Cloudflare beacon
2. `generate-worker.js` - Add tracking routes
3. `wrangler.toml` - Configure KV binding
4. `main.js` - Add click tracking code

## Files to Create

1. `metrics-dashboard.html` - Simple metrics viewer
2. `docs/PHASE_6_ANALYTICS_GUIDE.md` - Complete guide

---

**Next Action**: Start with Task 6a (10 min), then 6b (2 hours)
