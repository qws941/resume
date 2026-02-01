variable "cloudflare_api_key" {
  type        = string
  sensitive   = true
  description = "Cloudflare Global API Key"
}

variable "cloudflare_email" {
  type        = string
  description = "Cloudflare account email"
}

variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID"
}

variable "zone_id" {
  type        = string
  description = "Cloudflare zone ID for jclee.me"
}

variable "domain" {
  type        = string
  default     = "jclee.me"
  description = "Primary domain"
}
