# PROJECT KNOWLEDGE BASE: PORTFOLIO

**Generated:** 2026-02-03
**Commit:** 213ab0f
**Context:** Cloudflare Worker for resume portfolio. Builds HTML from data.

## OVERVIEW

High-performance, edge-delivered portfolio site built on Cloudflare Workers.
Features zero-runtime I/O, aggressive asset inlining, and hash-locked CSP security.

## STRUCTURE

```
typescript/portfolio-worker/
├── lib/                  # SHARED LOGIC: Stateless modules (see lib/AGENTS.md)
│   └── security-headers.js  # CSP, HSTS, security headers
├── assets/               # STATIC: Fonts, images, icons (inlined at build)
├── generate-worker.js    # BUILD ENGINE: Compiles HTML + lib -> worker.js
├── worker.js             # ARTIFACT: The deployable worker (NEVER EDIT)
├── index.html            # TEMPLATE: Korean portfolio
├── index-en.html         # TEMPLATE: English portfolio
├── robots.txt            # SEO: Disallow /api/, /dashboard
└── wrangler.toml         # Cloudflare config
```

## WHERE TO LOOK

| Task             | Location                  | Notes                                  |
| ---------------- | ------------------------- | -------------------------------------- |
| **Build Logic**  | `generate-worker.js`      | Orchestrates inlining & CSP extraction |
| **Security**     | `lib/security-headers.js` | CSP baseline, HSTS, security headers   |
| **UI Structure** | `index.html`              | Korean portfolio template              |
| **EN Portfolio** | `index-en.html`           | English portfolio template             |
| **Deployment**   | `wrangler.toml`           | Cloudflare environment config          |

## RECENT CHANGES (2026-02)

- **CSP Baseline**: Added `default-src 'none'`, `img-src`, `font-src`, `manifest-src`, `worker-src`
- **Multi-HTML Hashes**: CSP hashes extracted from both KO + EN HTML (union)
- **Removed Endpoints**: `/dashboard`, `/api/stats`, `/api/applications` (security)
- **robots.txt**: Now disallows `/api/` and `/dashboard`
- **Sentry**: Scripts use `defer` attribute for performance

## CONVENTIONS

- **Zero Runtime I/O**: File system access is forbidden at edge; inline everything.
- **Pure Architecture**: Logic in `lib/` must be stateless and testable.
- **Security First**: CSP hashes are calculated post-minification in build.
- **Vanilla Performance**: No frameworks; direct DOM manipulation for sub-100ms LCP.
- **Template Escaping**: HTML must escape backticks (\`) and `${}` for worker embedding.

## ANTI-PATTERNS

- **Direct Artifact Edit**: Never modify `worker.js`; changes vanish on build.
- **External Dependencies**: No npm packages in runtime; keep bundle minimal.
- **Dynamic Eval**: Forbidden by CSP; use `lib/templates.js` for safe injection.
- **Raw Template Literals**: Unescaped backticks/`${}` in HTML break worker generation.
- **Single-HTML CSP**: Must extract hashes from BOTH index.html and index-en.html.

## COMMANDS

```bash
# Build worker.js from HTML
node generate-worker.js

# Local development with Wrangler
npm run dev

# Deploy to Cloudflare Workers
source ~/.env && CLOUDFLARE_API_KEY="$CLOUDFLARE_API_KEY" \
  CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL" npx wrangler deploy --env production

# Verify deployment health
curl -I https://resume.jclee.me/health
```
