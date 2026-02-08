# PORTFOLIO WORKER KNOWLEDGE BASE

**Generated:** 2026-02-05
**Commit:** d25808a
**Branch:** master

## OVERVIEW

Cloudflare Worker portfolio with cyberpunk terminal UI. Zero runtime I/O - all assets inlined at build time.

## STRUCTURE

```
portfolio-worker/
├── index.html           # Source HTML (terminal UI, CLI commands)
├── generate-worker.js   # HTML → worker.js compiler (CSP hashes, escaping)
├── worker.js            # GENERATED - NEVER EDIT
├── wrangler.toml        # Cloudflare Worker config
├── lib/                 # Stateless modules
│   ├── security-headers.js  # CSP baseline, HSTS, X-* headers
│   ├── es-logger.js         # ECS-format logging
│   ├── metrics.js           # Prometheus metrics
│   ├── ab-testing.js        # Feature flag experiments
│   └── templates.js         # HTML generation helpers
├── src/
│   ├── job/             # Job dashboard integration (routes from /job/*)
│   │   ├── styles.js    # Dashboard styles (DUPLICATED from workers/)
│   │   └── resume-sync.js # Resume sync (DUPLICATED from workers/)
│   └── styles/          # Modular CSS (8 files)
│       ├── animations.css   # Typing effects, glitch, fade
│       ├── base.css         # Root variables, reset
│       ├── cli.css          # CLI input/output styles
│       ├── components.css   # Cards, buttons, sections
│       ├── layout.css       # Grid, flex, positioning
│       ├── responsive.css   # Mobile breakpoints
│       ├── terminal.css     # Terminal window chrome
│       └── typography.css   # Fonts, text styles
```

## BUILD PIPELINE

```
index.html (edit this)
    ↓ generate-worker.js
        - Escape backticks in HTML
        - Compute SHA-256 CSP hashes for inline scripts
        - Inline all CSS from src/styles/
    ↓
worker.js (NEVER EDIT - regenerated on build)
    ↓ wrangler deploy
resume.jclee.me (Cloudflare Edge)
```

## CLI COMMANDS

Interactive terminal supports these commands:

| Command  | Description              |
| -------- | ------------------------ |
| `help`   | List available commands  |
| `whoami` | Display profile info     |
| `pwd`    | Show current "directory" |
| `date`   | Current date/time        |
| `ls`     | List resume sections     |
| `cat`    | View section contents    |
| `snake`  | Easter egg game          |
| `clear`  | Clear terminal           |

Commands defined in `index.html` within `terminalCommands` object.

## KEY CSS CLASSES

| Class              | Purpose                   |
| ------------------ | ------------------------- |
| `.terminal-window` | Main terminal container   |
| `.cli-container`   | CLI input/output wrapper  |
| `#cli-input`       | User input field          |
| `.typing-effect`   | Animated typing animation |
| `.glitch`          | Cyberpunk glitch effect   |

## LIB MODULES

| Module                | Purpose                          |
| --------------------- | -------------------------------- |
| `security-headers.js` | CSP, HSTS, X-Frame-Options       |
| `es-logger.js`        | ECS-format structured logging    |
| `metrics.js`          | Prometheus endpoint (`/metrics`) |
| `ab-testing.js`       | Feature flag experiments         |
| `templates.js`        | HTML generation utilities        |

**Conventions for lib/**:

- Pure functions, no side effects
- Receive `env` object from Worker
- Fire-and-forget telemetry (non-blocking)
- CSP hash updates require regenerating worker.js

## CONVENTIONS

- **Zero Runtime I/O**: No fetch() for assets; all inlined at build.
- **CSP Hashes**: Computed from exact inline script content. `trim()` breaks hashes.
- **Edit Source**: Only edit `index.html` and `src/styles/`. Never `worker.js`.
- **Mobile-First**: Use responsive.css for breakpoints.

## ANTI-PATTERNS

| Anti-Pattern                 | Why                        | Do Instead                             |
| ---------------------------- | -------------------------- | -------------------------------------- |
| Edit `worker.js` directly    | Regenerated on build       | Edit `index.html`                      |
| `trim()` before CSP hash     | Whitespace affects SHA-256 | Hash exact source string               |
| Runtime `fetch()` for assets | Adds latency               | Inline at build time                   |
| Hardcode colors in HTML      | Style drift                | Use CSS variables in base.css          |
| Skip CSP regeneration        | Security violation         | Always run generate-worker.js          |
| Edit src/job/ files directly | Duplicated from workers/   | Edit workers/ source, sync to src/job/ |

## COMMANDS

```bash
# Build
node generate-worker.js

# Deploy (production)
source ~/.env && \
  CLOUDFLARE_API_KEY="$CLOUDFLARE_API_KEY" \
  CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL" \
  npx wrangler deploy --env production

# Local dev
npx wrangler dev

# Test
curl -s https://resume.jclee.me/health
```
