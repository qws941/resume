# EXISTING D1 databases - read-only references (managed via Wrangler)

data "cloudflare_d1_database" "resume_prod" {
  account_id = var.cloudflare_account_id
  name       = "resume-prod-db"
}

data "cloudflare_d1_database" "resume_staging" {
  account_id = var.cloudflare_account_id
  name       = "resume-staging-db"
}

data "cloudflare_d1_database" "job_dashboard" {
  account_id = var.cloudflare_account_id
  name       = "job-dashboard-db"
}

output "d1_databases" {
  value = {
    resume_prod    = data.cloudflare_d1_database.resume_prod.id
    resume_staging = data.cloudflare_d1_database.resume_staging.id
    job_dashboard  = data.cloudflare_d1_database.job_dashboard.id
  }
  description = "D1 database IDs (existing, not managed by Terraform)"
}
