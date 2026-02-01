terraform {
  backend "http" {
    address        = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare"
    lock_address   = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare/lock"
    unlock_address = "https://gitlab.jclee.me/api/v4/projects/1/terraform/state/cloudflare/lock"
    lock_method    = "POST"
    unlock_method  = "DELETE"
    retry_wait_min = 5
  }
}
