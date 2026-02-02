# CLOUDFLARE INFRASTRUCTURE KNOWLEDGE BASE

**Generated:** 2026-02-01
**Commit:** 0b3bac8
**Branch:** master

## OVERVIEW

Terraform IaC for Cloudflare resources: Workers, DNS, KV namespaces, D1 databases.
GitOps workflow with GitHub Actions integration.

## STRUCTURE

```
cloudflare/
├── versions.tf              # Provider requirements (cloudflare ~> 4.0)
├── variables.tf             # Input variables (account_id, zone_id, api_token)
├── backend.tf               # Terraform Cloud state backend (local fallback)
├── workers.tf               # Worker scripts and routes
├── dns.tf                   # DNS records (A, CNAME, TXT)
├── kv.tf                    # KV namespace data sources (read-only)
├── d1.tf                    # D1 database data sources (read-only)
├── outputs.tf               # Output values
├── terraform.tfvars.example # Template for credentials
└── README.md                # Quick start guide
```

## WHERE TO LOOK

| Task              | Location      | Notes                          |
| ----------------- | ------------- | ------------------------------ |
| Add DNS record    | `dns.tf`      | A, CNAME, TXT records          |
| Add Worker route  | `workers.tf`  | Routes only; code via Wrangler |
| View KV namespace | `kv.tf`       | Read-only data source          |
| View D1 database  | `d1.tf`       | Read-only data source          |
| Change provider   | `versions.tf` | Cloudflare provider version    |
| Configure backend | `backend.tf`  | Local/Cloud state              |

## CONVENTIONS

- **GitOps**: All changes via PR; GitHub Actions runs plan on PR, apply on master merge.
- **State Lock**: Terraform Cloud backend or local state with locking.
- **Import First**: Existing resources must be imported before managing.
- **Read-Only Resources**: KV/D1 managed by Wrangler; Terraform only reads.

## ANTI-PATTERNS

| Anti-Pattern              | Why                        | Do Instead                             |
| ------------------------- | -------------------------- | -------------------------------------- |
| Create KV/D1 in Terraform | Wrangler creates these     | Use `data` sources only                |
| Skip import               | Duplicate resource errors  | Import existing before apply           |
| Local state               | Drift between developers   | Use Terraform Cloud or versioned state |
| Hardcode credentials      | Security violation         | Use `terraform.tfvars` (gitignored)    |
| Manual DNS edits          | Drift from Terraform state | Edit `dns.tf` and apply                |

## COMMANDS

```bash
# Initialize
cd infrastructure/cloudflare
terraform init

# Plan (dry run)
terraform plan

# Apply changes
terraform apply

# Import existing worker
terraform import cloudflare_workers_script.portfolio $ACCOUNT_ID/resume-portfolio

# Check state
terraform state list

# Detect drift
terraform plan -detailed-exitcode
```

## CI/CD PIPELINE

| Job               | Trigger       | Purpose             |
| ----------------- | ------------- | ------------------- |
| `terraform:plan`  | PR created    | Show plan in PR     |
| `terraform:apply` | Merge master  | Auto-apply changes  |
| `terraform:drift` | Weekly (cron) | Detect config drift |

## DIVISION OF RESPONSIBILITY

| Layer         | Managed By | Changes Via              |
| ------------- | ---------- | ------------------------ |
| DNS records   | Terraform  | `dns.tf` + GitHub PR     |
| Worker routes | Terraform  | `workers.tf` + GitHub PR |
| Worker code   | Wrangler   | `npm run deploy`         |
| KV namespaces | Wrangler   | Create only              |
| D1 databases  | Wrangler   | Create only              |

## FILES

| File                       | Purpose                         |
| -------------------------- | ------------------------------- |
| `terraform.tfvars`         | Credentials (gitignored)        |
| `terraform.tfvars.example` | Template for credentials        |
| `.gitignore`               | Ignores `*.tfstate`, `*.tfvars` |
| `.terraform.lock.hcl`      | Provider version lock           |

## STATE BACKEND

State managed locally or via Terraform Cloud:

```hcl
# Local backend (default)
terraform {
  backend "local" {}
}

# Or Terraform Cloud (recommended for teams)
# terraform {
#   cloud {
#     organization = "your-org"
#     workspaces { name = "cloudflare" }
#   }
# }
```
