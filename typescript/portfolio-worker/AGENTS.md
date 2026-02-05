# PROJECT KNOWLEDGE BASE: PORTFOLIO

**Generated:** 2026-02-05
**Commit:** 3d9015d
**Context:** Cloudflare Worker for resume portfolio. Cyberpunk terminal theme with interactive CLI.

## OVERVIEW

High-performance, edge-delivered portfolio site built on Cloudflare Workers.
Features cyberpunk terminal UI, interactive CLI with command history, snake game easter egg,
zero-runtime I/O, aggressive asset inlining, and hash-locked CSP security.

## STRUCTURE

```
typescript/portfolio-worker/
├── lib/                  # SHARED LOGIC: Stateless modules (see lib/AGENTS.md)
│   └── security-headers.js  # CSP, HSTS, security headers
├── src/styles/           # MODULAR CSS: Component-based stylesheets
│   ├── animations.css    # Keyframe animations (typing, scanlines, glitch)
│   ├── base.css          # Reset, typography, variables
│   ├── components.css    # Terminal, CLI, sections
│   ├── layout.css        # Grid, flexbox layouts
│   ├── main.css          # Import orchestrator
│   ├── media.css         # Responsive breakpoints
│   ├── utilities.css     # Helper classes
│   └── variables.css     # CSS custom properties
├── assets/               # STATIC: Fonts, images, icons (inlined at build)
├── generate-worker.js    # BUILD ENGINE: Compiles HTML + lib -> worker.js
├── worker.js             # ARTIFACT: The deployable worker (NEVER EDIT)
├── index.html            # TEMPLATE: Korean portfolio (has interactive CLI)
├── index-en.html         # TEMPLATE: English portfolio
├── robots.txt            # SEO: Disallow /api/, /dashboard
└── wrangler.toml         # Cloudflare config
```

## WHERE TO LOOK

| Task                  | Location                    | Notes                                  |
| --------------------- | --------------------------- | -------------------------------------- |
| **Build Logic**       | `generate-worker.js`        | Orchestrates inlining & CSP extraction |
| **Security**          | `lib/security-headers.js`   | CSP baseline, HSTS, security headers   |
| **UI Structure**      | `index.html`                | Korean portfolio + interactive CLI     |
| **EN Portfolio**      | `index-en.html`             | English portfolio template             |
| **Terminal Commands** | `index.html` (script)       | `window.terminalCommands` object       |
| **Animations**        | `src/styles/animations.css` | Typing cursor, scanlines, glitch FX    |
| **Deployment**        | `wrangler.toml`             | Cloudflare environment config          |

## INTERACTIVE CLI (Easter Egg)

The portfolio includes a hidden CLI accessible via the input at the bottom:

| Command  | Action                                |
| -------- | ------------------------------------- |
| `help`   | List available commands               |
| `whoami` | Display user info                     |
| `pwd`    | Show current path                     |
| `date`   | Display current date/time             |
| `ls`     | List "files" in portfolio             |
| `cat`    | Display content of "files"            |
| `snake`  | Play canvas-based Snake game (WASD/Q) |
| `clear`  | Clear terminal output                 |

**Implementation**: `window.terminalCommands` object in `index.html`. Commands return strings displayed in `#cli-output`.

## TERMINAL THEME COMPONENTS

| Element          | Class                   | Purpose                     |
| ---------------- | ----------------------- | --------------------------- |
| Window frame     | `.terminal-window`      | macOS-like window chrome    |
| Title bar        | `.terminal-titlebar`    | Traffic light buttons       |
| Body content     | `.terminal-body`        | Main content area           |
| Command prompts  | `.terminal-prompt`      | `$` prompts in sections     |
| Section commands | `.section-cmd__command` | `cat`, `ls` section headers |
| CLI container    | `.cli-container`        | Interactive input area      |
| CLI input        | `#cli-input`            | User command input          |
| CLI output       | `#cli-output`           | Command result display      |

## RECENT CHANGES (2026-02)

- **Cyberpunk Terminal Theme**: Redesigned with terminal window UI, scanlines, glitch effects
- **Interactive CLI**: Full command-line interface with history (↑/↓), tab completion
- **Snake Game**: Canvas-based easter egg game (`snake` command)
- **Modular CSS**: Split into `src/styles/` directory with 8 component files
- **CSP Updates**: Added `unsafe-inline` to `style-src-elem`, `job.jclee.me` to `connect-src`
- **Removed Endpoints**: `/dashboard`, `/api/stats`, `/api/applications` (security)
- **Sentry**: Scripts use `defer` attribute for performance

## CONVENTIONS

- **Zero Runtime I/O**: File system access is forbidden at edge; inline everything.
- **Pure Architecture**: Logic in `lib/` must be stateless and testable.
- **Security First**: CSP hashes are calculated post-minification in build.
- **Vanilla Performance**: No frameworks; direct DOM manipulation for sub-100ms LCP.
- **Template Escaping**: HTML must escape backticks (\`) and `${}` for worker embedding.
- **Terminal UX**: All sections styled as terminal commands (`cat about.txt`, `ls ~/projects/`).

## ANTI-PATTERNS

- **Direct Artifact Edit**: Never modify `worker.js`; changes vanish on build.
- **External Dependencies**: No npm packages in runtime; keep bundle minimal.
- **Dynamic Eval**: Forbidden by CSP; use `lib/templates.js` for safe injection.
- **Raw Template Literals**: Unescaped backticks/`${}` in HTML break worker generation.
- **Single-HTML CSP**: Must extract hashes from BOTH index.html and index-en.html.
- **Modifying terminalCommands outside index.html**: CLI logic is inlined; keep it in HTML.

## CSP DIRECTIVES (Current)

```
default-src 'none';
script-src 'self' 'sha256-...' https://www.googletagmanager.com ...;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' https://grafana.jclee.me https://job.jclee.me ...;
```

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
