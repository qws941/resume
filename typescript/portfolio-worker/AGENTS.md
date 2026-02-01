# PROJECT KNOWLEDGE BASE: PORTFOLIO

**Generated:** 2026-01-30
**Commit:** 0b7a931e
**Context:** Cloudflare Worker for resume portfolio. Builds HTML from data.

## OVERVIEW

High-performance, edge-delivered portfolio site built on Cloudflare Workers.
Features zero-runtime I/O, aggressive asset inlining, and hash-locked CSP security.

## STRUCTURE

```
typescript/portfolio-worker/
├── lib/                # SHARED LOGIC: Stateless modules (see lib/AGENTS.md)
├── assets/             # STATIC: Fonts, images, icons (inlined at build)
├── generate-worker.js  # BUILD ENGINE: Compiles index.html + lib -> worker.js
├── worker.js           # ARTIFACT: The deployable worker (NEVER EDIT)
└── index.html          # TEMPLATE: Main HTML structure
```

## WHERE TO LOOK

| Task             | Location             | Notes                                |
| ---------------- | -------------------- | ------------------------------------ |
| **Build Logic**  | `generate-worker.js` | Orchestrates inlining & minification |
| **UI Structure** | `index.html`         | Semantic HTML skeleton               |
| **Core Logic**   | `lib/`               | Business logic (see sub-agent)       |
| **Deployment**   | `wrangler.toml`      | Cloudflare environment config        |

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

## COMMANDS

```bash
# Build worker.js from index.html
npm run build

# Local development with Wrangler
npm run dev

# Deploy to Cloudflare Workers
npm run deploy

# Verify deployment health
npm run verify
```
