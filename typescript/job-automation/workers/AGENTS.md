# JOB-DASHBOARD WORKER

> Parent: [../AGENTS.md](../AGENTS.md)

**Updated:** 2026-02-03

## PURPOSE

Cloudflare Worker providing job dashboard API with D1 database backend.

## STRUCTURE

```
workers/
├── src/           # Worker source code
├── schema.sql     # D1 database schema
├── deploy.sh      # Deployment script
├── migrate-json-to-d1.cjs  # Migration utility
├── wrangler.toml  # CF configuration
└── SECRETS.md     # Secret documentation
```

## BINDINGS

| Binding         | Type | Purpose          |
| --------------- | ---- | ---------------- |
| `DB`            | D1   | Primary database |
| `SESSIONS`      | KV   | Session storage  |
| `RATE_LIMIT_KV` | KV   | Rate limiting    |

## DEPLOYMENT

```bash
cd workers && ./deploy.sh
# Or: wrangler deploy
```

## MIGRATIONS

```bash
# Apply schema
wrangler d1 execute job-dashboard --file=schema.sql

# Migrate legacy JSON
node migrate-json-to-d1.cjs
```

## ANTI-PATTERNS

- **Local wrangler.toml secrets**: Use `wrangler secret put`
- **Direct D1 writes in hot path**: Use KV for frequent writes
- **Skipping migrations**: Always version schema changes
