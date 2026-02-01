# Phase 6B Testing Guide

Quick reference for testing Phase 6B implementation after deployment.

## ✅ Pre-Deployment Verification (COMPLETED)

- ✅ Build succeeded: `npm run build` (0.13s, 513.46 KB)
- ✅ `/api/track` endpoint present in worker.js
- ✅ `/api/metrics` endpoint present in worker.js
- ✅ Data-track attributes on 5 contact links
- ✅ Code committed and pushed to GitHub

## ⏳ Waiting For

- Cloudflare Workers deployment (auto-triggered by GitHub Actions)
- Expected: 2-5 minutes after push (2026-02-01 10:26:17 UTC)

---

## 📋 POST-DEPLOYMENT TESTING STEPS

### Step 1: Verify Main Site (2 min)

```bash
# Check if site is responding
curl -I https://resume.jclee.me

# Expected:
# HTTP/2 200
# content-type: text/html;charset=UTF-8
```

### Step 2: Test /api/track Endpoint (3 min)

```bash
# Test link click tracking
curl -X POST https://resume.jclee.me/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "event": "link_click",
    "type": "github",
    "href": "https://github.com/qws941",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
    "language": "ko"
  }'

# Expected: 204 No Content (no response body)
# Status should be: 204
```

### Step 3: Test /api/metrics Endpoint (3 min)

```bash
# Get aggregated metrics
curl https://resume.jclee.me/api/metrics | jq .

# Expected response structure:
{
  "status": "healthy",
  "timestamp": "2026-02-01T10:30:00.000Z",
  "http": {
    "requests_total": NUMBER,
    "requests_success": NUMBER,
    "requests_error": NUMBER,
    "error_rate": "X.XX%",
    "response_time_ms": NUMBER
  },
  "vitals": {
    "count": NUMBER,
    "avg_lcp_ms": NUMBER,
    "avg_fid_ms": NUMBER,
    "avg_cls": "0.XXX"
  },
  "tracking": {
    "note": "For detailed tracking data, query Loki logs with filter path=/api/track"
  }
}
```

### Step 4: Verify Loki Logs (5 min)

```bash
# Check if tracking events appear in Loki
# In Grafana, go to: Explore → Loki

# Query to find all tracking events:
{path="/api/track"}

# Expected: See logs with event type (link_click, session_end, etc.)

# Query for specific link type:
{path="/api/track", event="link_click", type="github"}

# Query for errors:
{path="/api/track", level="ERROR"}
```

### Step 5: Browser Testing (10 min)

1. Open https://resume.jclee.me in browser
2. Open DevTools → Network tab (Ctrl+Shift+K)
3. Click on each contact link:
   - Email
   - Phone
   - GitHub
   - Website
   - Monitoring
4. Watch for POST requests to `/api/track` with 204 status
5. Leave page and wait 2 seconds → Session end should be tracked

---

## 🔧 TROUBLESHOOTING

### Issue: 404 on endpoints

**Cause**: Cloudflare deployment not yet complete

**Solution**: 
- Wait 2-5 minutes after push
- Check GitHub Actions status: https://github.com/jclee-homelab/resume/actions
- Check Cloudflare Workers dashboard for latest deployment

### Issue: 204 received but events not in Loki

**Cause**: Events cached locally, not yet flushed

**Solution**:
- Wait up to 30 seconds for logs to appear
- Check Loki filter is correct: `{path="/api/track"}`
- Verify Loki datasource is configured in Grafana

### Issue: /api/metrics returns 500

**Cause**: Error in metrics calculation

**Solution**:
- Check browser console for errors
- Review worker.js for syntax errors: `grep -n "api/metrics" worker.js`
- Check Loki for error logs: `{path="/api/metrics", level="ERROR"}`

---

## 📊 SUCCESS CRITERIA

All of the following should be true:

- [ ] `/api/track` POST returns HTTP 204
- [ ] `/api/metrics` GET returns HTTP 200 with valid JSON
- [ ] Data-track attributes present on all 5 contact links
- [ ] Tracking events appear in Loki logs
- [ ] No errors in browser console
- [ ] HTTP metrics are tracked (requests_total increases)
- [ ] Web vitals data appears in metrics (avg_lcp_ms, etc.)
- [ ] Session tracking works (session_end appears on page leave)

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Testing
- [ ] Commit hash: `301652f`
- [ ] GitHub push successful
- [ ] GitHub Actions triggered
- [ ] Cloudflare deployment started

### During Testing
- [ ] Main site responds (HTTP 200)
- [ ] `/api/track` returns 204
- [ ] `/api/metrics` returns 200 with JSON
- [ ] Loki shows tracking events
- [ ] No 404 errors on endpoints

### After Testing
- [ ] Create summary of test results
- [ ] Note any issues encountered
- [ ] Record metrics snapshots
- [ ] Update deployment log

---

## 📝 TEST RESULT TEMPLATE

```markdown
# Phase 6B Test Results

**Date**: 2026-02-01  
**Deployment Time**: HH:MM UTC  
**Tester**: [Name]

## Site Status
- [ ] Main site responding (HTTP 200)
- Time to first response: XXms

## Endpoint Tests
- [ ] /api/track POST returns 204
- [ ] /api/metrics GET returns 200
- Response time (metrics): XXms
- Response size (metrics): XXkb

## Data Validation
- [ ] Tracking data structure valid
- [ ] Metrics data structure valid
- [ ] All required fields present

## Loki Verification
- [ ] Tracking events appear in logs
- [ ] Events have correct labels
- [ ] Error handling works

## Browser Testing
- [ ] Email link tracked ✓
- [ ] Phone link tracked ✓
- [ ] GitHub link tracked ✓
- [ ] Website link tracked ✓
- [ ] Monitoring link tracked ✓
- [ ] Session tracking works ✓

## Issues Found
- None / [List any issues]

## Notes
[Any additional observations]
```

---

## 🔗 USEFUL LINKS

- Main site: https://resume.jclee.me
- GitHub repo: https://github.com/jclee-homelab/resume
- GitHub Actions: https://github.com/jclee-homelab/resume/actions
- Grafana: https://grafana.jclee.me
- Loki in Grafana: https://grafana.jclee.me/datasources/edit/3/ (Loki datasource)

---

## ⏰ TIMING

**Current Time**: 2026-02-01 10:26:17 UTC (commit pushed)  
**Expected Deployment**: 2026-02-01 10:29 UTC (±2 min)  
**Testing Ready**: 2026-02-01 10:31 UTC

---

## 📞 QUICK COMMANDS

```bash
# Check deployment status
cd /home/jclee/dev/resume && git log --oneline -3

# Test tracking endpoint
curl -X POST https://resume.jclee.me/api/track \
  -H "Content-Type: application/json" \
  -d '{"event":"test","timestamp":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","language":"ko"}'

# Test metrics endpoint
curl https://resume.jclee.me/api/metrics | jq '.http.requests_total'

# Check worker.js size
curl -I https://resume.jclee.me/ | grep content-length

# Monitor logs
watch -n 1 'curl -s https://resume.jclee.me/api/metrics | jq ".http"'
```

---

**Ready to test once deployment completes! 🚀**

