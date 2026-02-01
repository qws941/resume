# Task #4: Google Search Console & Analytics Integration

## Overview
This task adds Google Search Console verification and Google Analytics 4 (GA4) to both language variants of the resume portfolio, enabling proper indexing monitoring and traffic analytics.

## Prerequisites
Before starting this task, you need:

1. **Google Search Console (GSC) Verification Token**
   - Go to: https://search.google.com/search-console
   - Add property: https://resume.jclee.me
   - Choose "URL prefix" property type
   - Get verification token (looks like: `abc123def456xyz789...`)

2. **Google Analytics 4 Measurement ID**
   - Go to: https://analytics.google.com
   - Create new GA4 property for https://resume.jclee.me
   - Copy Measurement ID (format: G-XXXXXXXXXX)
   - Note: GA4 uses different format than Universal Analytics (UA-XXXXX)

3. **Bing Webmaster Tools Verification (Optional)**
   - Go to: https://www.bing.com/webmasters
   - Add site: https://resume.jclee.me
   - Get verification token

## Implementation Steps

### Step 1: Prepare Configuration

Create a `.env.local` file with your tokens:
```bash
cat > /home/jclee/dev/resume/.env.local << 'ENVEOF'
# Google Search Console Verification Token
GOOGLE_SITE_VERIFICATION_TOKEN=YOUR_GSC_TOKEN_HERE

# Google Analytics 4 Measurement ID
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# (Optional) Bing Webmaster Tools Verification Token
BING_SITE_VERIFICATION_TOKEN=YOUR_BING_TOKEN_HERE
ENVEOF
```

**⚠️ IMPORTANT**: 
- Do NOT commit `.env.local` to git
- Add to `.gitignore` if not already there
- Keep tokens secure

### Step 2: Update index.html (Korean Version)

Add the following tags to the `<head>` section:

```html
<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="YOUR_GSC_TOKEN_HERE">

<!-- Bing Webmaster Tools Verification (Optional) -->
<meta name="msvalidate.01" content="YOUR_BING_TOKEN_HERE">

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_path': window.location.pathname,
    'language': 'ko'
  });
</script>
```

Location in file: After line 9 (after `<meta name="robots">`)

### Step 3: Update index-en.html (English Version)

Add the same verification tags, but update the GA4 config to note English language:

```html
<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="YOUR_GSC_TOKEN_HERE">

<!-- Bing Webmaster Tools Verification (Optional) -->
<meta name="msvalidate.01" content="YOUR_BING_TOKEN_HERE">

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_path': window.location.pathname,
    'language': 'en'
  });
</script>
```

### Step 4: Update CSP Hashes

The GA4 script requires CSP hash updates. Run the build to regenerate:

```bash
cd /home/jclee/dev/resume
npm run build
```

The build process will:
1. Generate new CSP hashes for the GA4 script
2. Update `generate-worker.js` with new hashes
3. Regenerate `worker.js` with updated CSP headers
4. Output: Verify "CSP hashes generated" in build output

### Step 5: Verify CSP Headers

After building, check that CSP hashes are correct:

```bash
npm run build 2>&1 | grep -A 5 "CSP hashes"
```

Should output something like:
```
CSP hashes generated:
  Scripts (10): hash1 hash2 hash3 ...
  Styles (2): hash4 hash5
```

### Step 6: Deploy

```bash
npm run deploy
```

Verify deployment:
```bash
# Check GSC meta tag
curl https://resume.jclee.me | grep "google-site-verification"

# Check GA4 script
curl https://resume.jclee.me | grep "googletagmanager"

# Check CSP header
curl -I https://resume.jclee.me | grep "Content-Security-Policy"
```

## Verification Steps

### 1. Verify GSC Meta Tag

In Google Search Console:
1. Go to Settings → Verification
2. Check if "Verified" status shows up
3. If not, click "Verify this property" → HTML tag method
4. Paste your verification token in the meta tag

### 2. Verify GA4 Script

1. Go to https://resume.jclee.me
2. Open DevTools (F12)
3. Check Console for dataLayer initialization
4. Look for: `dataLayer.js:1 [goog.tagmanager.impl.EventHandler]`

Or use Google Tag Manager Preview:
1. Go to Google Analytics: https://analytics.google.com
2. Admin → Property Settings
3. Find "Measurement ID": G-XXXXXXXXXX
4. Click "Google Tag Manager"
5. Preview & Debug mode
6. Enter your site URL

### 3. Monitor First Data

- **GSC**: Data appears after 24-48 hours
- **GA4**: Real-time data visible in Reports → Real-time
- Check both dashboard after 1-2 days

## Key Metrics to Monitor (GA4)

### Real-time
- Active users on site
- Page views per session
- Traffic source

### Traffic Overview (24h)
- Total users
- New vs returning
- Session duration
- Bounce rate

### Traffic by Language
- Compare /en/ vs / paths
- Language-specific conversion tracking
- User behavior differences

### Content Performance
- Top pages by views
- Click-through rates
- Time on page
- Scroll depth (if events configured)

### Structured Data Performance (GSC)
- Indexed pages with Rich Results
- Errors in structured data
- Mobile usability issues

## Google Search Console Tasks

### 1. Submit Sitemap

1. Go to https://search.google.com/search-console
2. Select property: resume.jclee.me
3. Sitemaps → Add new sitemap
4. URL: https://resume.jclee.me/sitemap.xml
5. Submit

### 2. Check Indexation

1. Coverage report → Check for errors
2. Expand "Valid" to see indexed pages
3. Verify 24 URLs are indexed (or close to it)

### 3. Verify hreflang Implementation

1. Enhancements → Hreflang reports
2. Check Korean (ko-KR) and English (en-US) variants
3. Verify cross-language linking

### 4. Mobile Usability

1. Enhancements → Mobile usability
2. Check for issues on both language variants
3. Fix any blocking resources

## Configuration Templates

### GA4 Custom Events (Optional but Recommended)

Add to GA4 to track important actions:

```javascript
// Track resume download
gtag('event', 'download', {
  'file_name': 'resume.pdf',
  'file_type': 'pdf'
});

// Track project click
gtag('event', 'select_item', {
  'item_id': 'project-1',
  'item_name': 'Project Name',
  'content_category': 'projects'
});

// Track contact form submission
gtag('event', 'form_submit', {
  'form_name': 'contact',
  'form_type': 'contact_me'
});
```

### GA4 Conversion Goals (Optional)

1. Go to GA4 Admin → Conversions
2. Create new conversion event: `contact_submission`
3. Set event name: `form_submit`
4. Monitor conversion rate

## Troubleshooting

### Issue: GA4 Script Not Loading

**Symptoms**: No GA4 script in Network tab, no dataLayer in console

**Solutions**:
1. Verify CSP header includes GA4 hash
2. Check `<script async src="https://www.googletagmanager.com/gtag/js?id=...">`
3. Try incognito mode (ad blockers might block)

**Debug**:
```bash
curl https://resume.jclee.me -H "User-Agent: Mozilla/5.0" | grep -A 5 "googletagmanager"
```

### Issue: GSC Says "Verification Failed"

**Symptoms**: Meta tag shows on page but GSC says unverified

**Solutions**:
1. Ensure exact token match (copy-paste, not retype)
2. Wait 24-48 hours for re-crawl
3. Try alternative verification methods:
   - DNS record (CNAME)
   - Google Analytics integration
   - Google Tag Manager

### Issue: Different Data Between Languages

**Symptoms**: GA4 shows /en/ and / separately, hard to correlate

**Solutions**:
1. Both versions use same GA4 Measurement ID (correct)
2. Filter by page path: `/` for Korean, `/en/` for English
3. Use custom dimension for language
4. Create two GA4 views (Korean, English) with segment filters

## Post-Implementation Checklist

- [ ] GSC verification token added to both index.html and index-en.html
- [ ] Bing token added (optional)
- [ ] GA4 Measurement ID added to both versions
- [ ] CSP hashes regenerated via `npm run build`
- [ ] Deployment successful (`npm run deploy`)
- [ ] Verification meta tags visible on live site
- [ ] GA4 script loaded (check Network tab)
- [ ] Real-time GA4 data visible in dashboard
- [ ] GSC shows "Verified" status
- [ ] Sitemap submitted to GSC
- [ ] hreflang verification in GSC shows no errors
- [ ] First crawl stats visible in GSC (24-48h)
- [ ] Documentation updated with credentials location

## Files Modified

- `typescript/portfolio-worker/index.html` - Added GSC meta, GA4 script
- `typescript/portfolio-worker/index-en.html` - Added GSC meta, GA4 script
- `typescript/portfolio-worker/generate-worker.js` - CSP hashes updated (auto)
- `typescript/portfolio-worker/worker.js` - Regenerated (auto)

## Timeline Expectations

| Milestone | Timeline |
|-----------|----------|
| Deploy changes | Immediate |
| GA4 real-time data | 5-10 minutes |
| GSC verification | 24-48 hours |
| First GSC crawl stats | 24-48 hours |
| Language variant data | 48-72 hours |
| Complete analytics picture | 7 days |

## Next Steps After This Task

Once Task #4 is complete:
1. Monitor GSC and GA4 dashboards for 1 week
2. Note any crawl errors or structured data issues
3. Proceed with Task #6: Structured Data Monitoring Dashboard
   - Create Grafana dashboard for SEO metrics
   - Integrate with GSC API
   - Set up alerts for schema errors

## Related Documentation

- [Google Search Console Help](https://support.google.com/webmasters)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/10089681)
- [hreflang Specification](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Structured Data Testing Tool](https://schema.org/validate/)
- [Web.dev Lighthouse Audit](https://web.dev/measure)

---

**Status**: Ready for implementation  
**Priority**: HIGH (enables monitoring and indexing)  
**Effort**: 1-2 hours (including testing and verification)

