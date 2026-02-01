# JOB AUTOMATION MCP KNOWLEDGE BASE

> Parent: [../AGENTS.md](../AGENTS.md)

**Generated:** 2026-02-01

## OVERVIEW

Node.js MCP server orchestrating job search, resume management, and automated applications across Wanted, JobKorea, Saramin, LinkedIn, and Remember. Features stealth crawlers and hybrid API/Browser automation.

## STRUCTURE

```
job-automation-mcp/
├── src/
│   ├── tools/           # MCP tool implementations (search, auth, resume CRUD)
│   ├── lib/             # Core logic: WantedAPI, SessionManager, JobMatcher
│   ├── auto-apply/      # UnifiedApplySystem facade & platform orchestrators
│   └── dashboard/       # server.js (Node.js/Fastify)
├── platforms/           # Stealth crawler implementations (Playwright)
└── workflows/           # n8n automation definitions
```

## WHERE TO LOOK

| Component        | Location                      | Notes                                         |
| ---------------- | ----------------------------- | --------------------------------------------- |
| **Entry Point**  | `src/index.js`                | MCP server initialization & tool registration |
| **Wanted API**   | `src/lib/wanted-api.js`       | Handles SNS vs Chaos API v1/v2                |
| **Orchestrator** | `src/unified-apply-system.js` | Facade for multi-platform logic               |
| **Crawlers**     | `platforms/[name]/`           | Playwright-based stealth crawlers             |
| **Auth**         | `src/lib/session-manager.js`  | Cookie rotation; `wanted-session.json`        |
| **Dashboard**    | `src/dashboard/server.js`     | **Complexity Hotspot** (1000+ LOC)            |

## CONVENTIONS

- **Runtime**: ES Modules (`type: "module"` in package.json).
- **Stealth**: Use `playwright` with stealth plugins for all browser automation.
- **WAF Bypass**: Use manual cookies extracted via `wanted_auth` (WAF blocks login).
- **API Versioning**: Use Chaos API **v1** for Skills; **v2** for Careers/Activities.
- **Session Data**: Shared via `~/.OpenCode/data/wanted-session.json`.

## ANTI-PATTERNS

- **Direct Puppeteer**: Detected by CloudFront; use stealth-patched Playwright.
- **Hardcoded Selectors**: Avoid in core logic; use platform configs or AI-driven matching.
- **Links API**: ❌ BROKEN (500 error). Avoid write operations on Wanted links.
- **Direct Login**: Automated login is WAF-blocked; always use cookie injection.
- **Falsy Scores**: Never check `score` with `if (score)`; explicitly check `!== undefined`.
- **Blind Sync**: Always use `dry_run: true` before applying resume updates.
