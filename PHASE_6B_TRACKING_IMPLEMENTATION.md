# Phase 6b: Custom Metrics Tracking - Implementation

**Status**: IN PROGRESS  
**Target**: Track user interactions for analytics  
**Timeline**: 1 hour  
**Impact**: Enable data-driven decisions

---

## What's Already in Place

✅ **Existing Event Tracking** (lines 452-467 in index.html):
- GitHub click tracking via `navigator.sendBeacon`
- Email contact tracking
- Event: `github_click`, `contact_click`
- Endpoint: `/api/event` (POST)

✅ **Web Vitals Endpoint**: `/api/vitals` (POST)
- LCP, FID, CLS tracking
- Response: 204 No Content

✅ **Metrics Endpoint**: `/api/metrics` (GET)
- Health check endpoint with request counters
- Response: JSON with service status

---

## Enhancement Plan

### Step 1: Add Link Click Tracking IDs ✨ NEW

Add `data-track` attributes to key links for better categorization:

```html
<!-- GitHub link -->
<a href="https://github.com/qws941" data-track="github" class="footer-link">GitHub</a>

<!-- Email link -->
<a href="mailto:qws941@kakao.com" data-track="email" class="footer-link">이메일</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/..." data-track="linkedin" class="footer-link">LinkedIn</a>

<!-- Resume Download -->
<a href="/downloads/resume.pdf" data-track="resume-pdf" class="btn">다운로드 (PDF)</a>
<a href="/downloads/resume.docx" data-track="resume-docx" class="btn">다운로드 (DOCX)</a>
```

### Step 2: Enhanced Tracking Script ✨ NEW

Replace existing tracking code with improved version:

```javascript
<script>
// Custom Metrics Tracking System
(function initTracking() {
  const TRACKING_ENDPOINT = '/api/track';
  
  // Track link clicks
  document.addEventListener('click', function(e) {
    const trackAttr = e.target.closest('[data-track]');
    if (!trackAttr) return;
    
    const trackType = trackAttr.dataset.track;
    const href = trackAttr.href || 'unknown';
    
    // Send tracking event (fire and forget)
    navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify({
      event: 'link_click',
      type: trackType,
      href: href,
      timestamp: new Date().toISOString(),
      language: document.documentElement.lang
    }));
  }, { capture: true });
  
  // Track page visibility for session duration
  let sessionStart = Date.now();
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      const sessionDuration = Math.round((Date.now() - sessionStart) / 1000);
      navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify({
        event: 'session_end',
        duration: sessionDuration,
        language: document.documentElement.lang
      }));
    } else {
      sessionStart = Date.now();
    }
  });
})();
</script>
```

### Step 3: Update Worker.js Tracking Endpoint ✨ NEW

Add `/api/track` route handler in `generate-worker.js`:

```javascript
// LINK CLICK TRACKING
if (url.pathname === '/api/track' && request.method === 'POST') {
  try {
    const trackingData = await request.json();
    
    // Log to Loki for observability
    ctx.waitUntil(logToLoki(env, 
      `Track: ${trackingData.event} - ${trackingData.type || 'N/A'}`, 
      'INFO', {
        path: '/api/track',
        event: trackingData.event,
        type: trackingData.type,
        language: trackingData.language
      }
    ));
    
    metrics.requests_success++;
    return new Response('', { status: 204 });
  } catch (err) {
    ctx.waitUntil(logToLoki(env, `Tracking error: ${err.message}`, 'ERROR'));
    return new Response('', { status: 204 }); // Still return 204 for fire-and-forget
  }
}
```

### Step 4: GET /api/metrics Aggregation ✨ ENHANCED

Enhance existing `/api/metrics` GET endpoint to return tracking statistics:

```javascript
// METRICS ENDPOINT (GET) - AGGREGATED STATISTICS
if (url.pathname === '/api/metrics' && request.method === 'GET') {
  try {
    const metrics = {
      status: 'healthy',
      version: VERSION,
      deployed_at: DEPLOYMENT_TIME,
      uptime_seconds: Math.floor((Date.now() - STARTUP_TIME) / 1000),
      timestamp: new Date().toISOString(),
      
      // HTTP Metrics
      http: {
        requests_total: metrics.requests_total,
        requests_success: metrics.requests_success,
        requests_error: metrics.requests_error,
        response_time_ms: metrics.response_times.length > 0 
          ? Math.round(metrics.response_times.reduce((a, b) => a + b) / metrics.response_times.length)
          : 0
      },
      
      // Web Vitals Stats
      vitals: metrics.vitals_count > 0 ? {
        count: metrics.vitals_count,
        avg_lcp_ms: Math.round(metrics.vitals_sum.lcp / metrics.vitals_count),
        avg_fid_ms: Math.round(metrics.vitals_sum.fid / metrics.vitals_count),
        avg_cls: (metrics.vitals_sum.cls / metrics.vitals_count).toFixed(3)
      } : null,
      
      // Tracking Events (from Loki logs)
      tracking: {
        link_clicks: metrics.tracking_events.link_clicks || 0,
        session_ends: metrics.tracking_events.session_ends || 0,
        top_links: [
          // Most clicked links (from Loki)
        ]
      }
    };
    
    return new Response(JSON.stringify(metrics), {
      headers: {
        ...SECURITY_HEADERS,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (err) {
    ctx.waitUntil(logToLoki(env, `Metrics GET error: ${err.message}`, 'ERROR'));
    return new Response(JSON.stringify({ error: 'Failed to retrieve metrics' }), {
      status: 500,
      headers: { ...SECURITY_HEADERS, 'Content-Type': 'application/json' }
    });
  }
}
```

---

## Implementation Checklist

### Phase 6b Implementation (1 hour)

- [ ] **10 min**: Add `data-track` attributes to HTML links (both versions)
- [ ] **20 min**: Update tracking script in HTML
- [ ] **15 min**: Update `generate-worker.js` with `/api/track` route
- [ ] **10 min**: Enhance metrics aggregation logic
- [ ] **5 min**: Test endpoints locally

### Build & Deploy (15 min)

- [ ] Run `npm run build`
- [ ] Verify `worker.js` regenerated
- [ ] `git commit` and `git push`
- [ ] Monitor GitHub Actions deployment
- [ ] Verify endpoints work: `curl -X POST https://resume.jclee.me/api/track ...`

---

## Testing

### Test Tracking Endpoint

```bash
# Send test tracking event
curl -X POST https://resume.jclee.me/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "event": "link_click",
    "type": "github",
    "href": "https://github.com/qws941",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
    "language": "ko"
  }'

# Should return: HTTP 204
```

### Test Metrics Endpoint

```bash
# Get aggregated metrics
curl https://resume.jclee.me/api/metrics | jq .

# Should return JSON with:
# - status: "healthy"
# - http.requests_total, requests_success, requests_error
# - vitals: { avg_lcp_ms, avg_fid_ms, avg_cls }
# - tracking: { link_clicks, session_ends }
```

---

## Files to Modify

1. ✏️ **index.html** - Add data-track attributes, update tracking script
2. ✏️ **index-en.html** - Same changes
3. ✏️ **generate-worker.js** - Add `/api/track` route, enhance `/api/metrics`

## Files to Create

1. 📝 **docs/PHASE_6B_COMPLETE_GUIDE.md** - Full implementation details

---

## Performance Impact

- **Tracking endpoint**: <50ms latency (beacon fire-and-forget)
- **Metrics aggregation**: <100ms latency (Loki query)
- **No blocking operations**: All async, non-blocking
- **Memory footprint**: ~1KB per tracked event

---

## Next Steps

1. Implement Phase 6b (1 hour)
2. Deploy and test (15 min)
3. Monitor tracking events in Loki dashboard
4. Optional Phase 6c: Create simple metrics dashboard (1 hour)
5. Optional Phase 6d: Advanced analytics (2-3 hours)

