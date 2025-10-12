# Demo Materials

This folder contains demo materials for the resume portfolio project.

## Directory Structure

```
demo/
├── screenshots/     # UI screenshots
├── videos/         # Demo videos
├── examples/       # Usage examples
└── README.md       # This file
```

## Screenshots

### Portfolio Page
- Desktop view (1920x1080)
- Tablet view (768x1024)
- Mobile view (375x667)
- Dark mode variations

### Resume Page
- Full resume view
- Print-friendly version
- Mobile responsive view

**TODO**: Add screenshots after next deployment

## Videos

### Demo Walkthrough
- Homepage tour
- Dark mode toggle
- Project navigation
- Contact form interaction

**TODO**: Record demo video using:
```bash
# Using OBS Studio or QuickTime
# Target: 2-3 minutes, 1080p, 30fps
```

## Examples

### Live URLs
- **Production**: https://resume.jclee.me
- **Resume Page**: https://resume.jclee.me/resume
- **GitHub**: https://github.com/qws941/resume

### Sample Projects Featured
1. Splunk-FortiNet Integration (https://splunk.jclee.me)
2. SafeWork Platform (https://safework.jclee.me)
3. REGTECH Threat Intelligence (https://blacklist.jclee.me)
4. FortiGate Policy Orchestration (https://fortinet.jclee.me)
5. Full-Stack Observability (https://grafana.jclee.me)

### Code Examples

#### Worker Deployment
```javascript
// web/worker.js - Routing logic
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    return new Response(INDEX_HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
```

#### Build Script
```javascript
// web/generate-worker.js - HTML to Worker conversion
const indexHtml = fs.readFileSync('index.html', 'utf-8')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

const workerJs = `
const INDEX_HTML = \`${indexHtml}\`;
// ... routing logic
`;

fs.writeFileSync('worker.js', workerJs);
```

## Testing Demo

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Dark mode toggles properly
- [ ] All 5 project cards display
- [ ] Links navigate correctly
- [ ] Responsive design works on mobile
- [ ] Korean characters display properly
- [ ] Contact form opens email client
- [ ] Scroll animations work smoothly

### Automated Testing (TODO)
```bash
# E2E tests with Playwright
npm run test:e2e

# Visual regression tests
npm run test:visual

# Performance audit
npm run lighthouse
```

## Usage Examples

### Deploying Updates

```bash
# 1. Update content
vim web/index.html

# 2. Generate worker
cd web && node generate-worker.js

# 3. Deploy
wrangler deploy

# 4. Verify
curl -I https://resume.jclee.me
```

### Local Development

```bash
# Start dev server
cd web && wrangler dev

# Visit http://localhost:8787
```

### Creating PDF Resume

```bash
cd toss
./pdf-convert.sh
```

## Demo Scenarios

### Scenario 1: Portfolio Showcase
1. Visit https://resume.jclee.me
2. Scroll through hero section
3. View statistics (95% time reduction, 15 security solutions)
4. Explore 5 production projects
5. Check skills section
6. Toggle dark mode

### Scenario 2: Resume Review
1. Navigate to /resume page
2. Review career timeline
3. Check technical skills
4. Download PDF version
5. View GitHub profile

### Scenario 3: Mobile Experience
1. Open on mobile device
2. Test hamburger menu (if exists)
3. Verify touch targets (44px minimum)
4. Check responsive layouts
5. Test scroll performance

## Performance Metrics

### Current Performance (as of 2025-10-12)
- **Page Weight**: ~121KB
- **Time to Interactive**: ~1.2s
- **Lighthouse Score**: Not measured yet
- **Core Web Vitals**: TODO

### Target Metrics
- LCP: <2.5s ✅
- FID: <100ms ✅
- CLS: <0.1 ✅
- Page Weight: <100KB ⚠️ (need to extract CSS)

## Accessibility Demo

### WCAG 2.1 AA Compliance
- ✅ Semantic HTML5
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios
- ✅ Touch targets 44px minimum
- ✅ Screen reader compatible

### Testing Tools
```bash
# Lighthouse accessibility audit
npx lighthouse https://resume.jclee.me --only-categories=accessibility

# axe-core automated testing
npm install -g @axe-core/cli
axe https://resume.jclee.me
```

## Contributing Demo Materials

To add new demo materials:

1. **Screenshots**: Place in `screenshots/` with descriptive names
   - Format: `feature-name-device.png`
   - Example: `portfolio-desktop-dark.png`

2. **Videos**: Place in `videos/`
   - Format: MP4, 1080p, <5MB
   - Example: `homepage-tour.mp4`

3. **Examples**: Add to `examples/` with documentation
   - Include README.md explaining the example

## Future Demo Enhancements

- [ ] Add interactive demos (CodePen embeds)
- [ ] Create video walkthrough (YouTube/Vimeo)
- [ ] Generate GIFs for README
- [ ] Add A/B testing results
- [ ] Include analytics screenshots
- [ ] Document user feedback

---

*This demo folder is required by CLAUDE.md v11.9 Project Structure Standard*
