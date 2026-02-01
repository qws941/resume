# INFRASTRUCTURE KNOWLEDGE BASE

**Generated:** 2026-01-30
**Commit:** 0b7a931e
**Branch:** master

## OVERVIEW

Observability (Grafana/Loki/Prometheus) & Automation (n8n).
Infrastructure as Code (IaC). Docker Compose based.

## STRUCTURE

infrastructure/
├── monitoring/ # Dashboards: Grafana JSON panels
├── automation/ # Workflows: systemd timers, crontab
├── n8n/ # Workflows: n8n JSON flows
├── configs/ # Provisioning: Alert rules, datasources
├── database/ # Schema: D1 migration SQL
└── nginx/ # Proxy: SSL termination, CSP

## WHERE TO LOOK

| Task         | Location               | Notes                                |
| ------------ | ---------------------- | ------------------------------------ |
| Dashboards   | `monitoring/`          | Export JSON from Grafana UI.         |
| Workflows    | `n8n/`, `automation/`  | n8n JSON exports, systemd templates. |
| Alert Rules  | `configs/grafana/`     | Edit alert-rules.yaml thresholds.    |
| DB Schema    | `database/migrations/` | XXXX_name.sql patterns.              |
| Proxy Config | `nginx/nginx.conf`     | Security headers (HSTS, CSP).        |

## CONVENTIONS

- **GitOps**: UI changes (Grafana/n8n) must be exported/committed.
- **IaC**: Use Docker Compose for service orchestration.
- **No SSH Drift**: Direct NAS edits forbidden. Use Git.
- **Secret Masking**: Use templates; secrets in `.env` or Vault.
- **D1 Versioning**: Use migration scripts for DB updates.

## ANTI-PATTERNS

- **UI-Only Fixes**: Forgetting to sync UI edits back to JSON.
- **Direct SQL**: Running manual commands in D1 console.
- **Hardcoded Secrets**: Webhooks/API keys in committed files.
- **NAS SSH**: Modifying server state outside version control.

## COMMANDS

# Health/Metrics

curl -s https://resume.jclee.me/health
curl -s https://resume.jclee.me/metrics

# Deployment

# Deploy dashboard via Grafana API with Bearer token.

# Import n8n workflows via UI or CLI.
