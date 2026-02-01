data "cloudflare_zone" "main" {
  name = var.domain
}

resource "cloudflare_workers_script" "portfolio" {
  account_id = var.cloudflare_account_id
  name       = "resume-portfolio"
  content    = file("${path.module}/../../typescript/portfolio-worker/worker.js")
  module     = true

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_workers_route" "portfolio_resume" {
  zone_id     = data.cloudflare_zone.main.id
  pattern     = "resume.${var.domain}/*"
  script_name = cloudflare_workers_script.portfolio.name
}

resource "cloudflare_workers_script" "job_dashboard" {
  account_id = var.cloudflare_account_id
  name       = "job-dashboard"
  content    = file("${path.module}/../../typescript/job-automation/workers/dist/index.js")
  module     = true

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_workers_route" "job_dashboard" {
  zone_id     = data.cloudflare_zone.main.id
  pattern     = "job.${var.domain}/*"
  script_name = cloudflare_workers_script.job_dashboard.name
}
