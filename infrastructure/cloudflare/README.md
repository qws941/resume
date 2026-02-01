# Cloudflare Infrastructure (Terraform)

Terraform configuration for Cloudflare Workers, DNS, KV, and D1.

## Quick Start

```bash
cd infrastructure/cloudflare

cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your credentials

terraform init
terraform plan
terraform apply
```

## Import Existing Resources

Workers and routes must be imported before `terraform apply`:

```bash
export ACCOUNT_ID=a8d9c67f586acdd15eebcc65ca3aa5bb
export ZONE_ID=ed060daac18345f6900fc5a661dc94f9

terraform import cloudflare_workers_script.portfolio $ACCOUNT_ID/resume-portfolio
terraform import cloudflare_workers_script.job_dashboard $ACCOUNT_ID/job-dashboard
terraform import cloudflare_workers_route.portfolio_resume $ZONE_ID/<route-id>
terraform import cloudflare_workers_route.job_dashboard $ZONE_ID/<route-id>
```

## Files

| File         | Purpose                   |
| ------------ | ------------------------- |
| versions.tf  | Provider requirements     |
| variables.tf | Input variables           |
| backend.tf   | GitLab HTTP state backend |
| workers.tf   | Worker scripts and routes |
| dns.tf       | DNS records               |
| kv.tf        | KV namespace data sources |
| d1.tf        | D1 database data sources  |
| outputs.tf   | Output values             |

## CI/CD Integration

Pipeline jobs defined in `.gitlab-ci.yml`:

- **terraform:plan** - Runs on MRs, shows diff
- **terraform:apply** - Runs on master, auto-applies
- **terraform:drift** - Scheduled weekly, detects drift

## State Management

State stored in GitLab HTTP backend:

```hcl
backend "http" {
  address        = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare"
  lock_address   = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare/lock"
  unlock_address = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare/lock"
}
```

Credentials via CI variables: `TF_HTTP_USERNAME`, `TF_HTTP_PASSWORD`.

## Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitOps Flow                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Developer edits *.tf files                                  │
│           ↓                                                     │
│  2. Push to feature branch → Create MR                          │
│           ↓                                                     │
│  3. terraform:plan runs → Plan visible in MR                    │
│           ↓                                                     │
│  4. Review plan → Approve MR → Merge to master                  │
│           ↓                                                     │
│  5. terraform:apply runs → Infrastructure updated               │
│           ↓                                                     │
│  6. Weekly: terraform:drift detects config drift                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Division of Responsibility

| Layer         | Managed By | Changes Via             |
| ------------- | ---------- | ----------------------- |
| DNS records   | Terraform  | \*.tf files → GitLab MR |
| KV namespaces | Read-only  | Wrangler (create only)  |
| D1 databases  | Read-only  | Wrangler (create only)  |
| Worker routes | Terraform  | workers.tf → GitLab MR  |
| Worker code   | Wrangler   | npm run deploy          |
