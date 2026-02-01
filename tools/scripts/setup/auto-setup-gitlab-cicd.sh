#!/bin/bash
#
# Automated GitLab CI/CD Setup
# Uses existing Wrangler credentials to configure GitLab CI/CD
#

set -euo pipefail

echo "🚀 Automated GitLab CI/CD Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Configuration
GITLAB_HOST="gitlab.jclee.me"
GITLAB_API_URL="https://${GITLAB_HOST}/api/v4"
PROJECT_PATH="apps/resume"
PROJECT_ID=$(echo "$PROJECT_PATH" | sed 's/\//%2F/g')

# Get GitLab token
if [ -z "${GITLAB_TOKEN:-}" ]; then
    echo "❌ GITLAB_TOKEN environment variable required"
    echo ""
    echo "Create token at: https://${GITLAB_HOST}/-/user_settings/personal_access_tokens"
    echo "Required scopes: api"
    echo ""
    echo "Then run:"
    echo "  export GITLAB_TOKEN='your-token'"
    echo "  $0"
    exit 1
fi

# Get Cloudflare Account ID
ACCOUNT_ID=$(grep "account_id" web/wrangler.toml | cut -d'"' -f2)
echo "📋 Cloudflare Account ID: $ACCOUNT_ID"

# Check for existing Cloudflare API credentials
# Priority: 1. CLOUDFLARE_API_TOKEN env var, 2. CLOUDFLARE_API_KEY + email
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    echo "✓ Using CLOUDFLARE_API_TOKEN from environment"
    CF_TOKEN="$CLOUDFLARE_API_TOKEN"
elif [ -n "${CLOUDFLARE_API_KEY:-}" ] && [ -n "${CLOUDFLARE_EMAIL:-}" ]; then
    echo "✓ Using CLOUDFLARE_API_KEY from environment"
    CF_TOKEN="$CLOUDFLARE_API_KEY"
else
    echo "❌ Cloudflare credentials required"
    echo ""
    echo "Option 1: Export API Token (recommended)"
    echo "  export CLOUDFLARE_API_TOKEN='your-token'"
    echo ""
    echo "Option 2: Export Global API Key"
    echo "  export CLOUDFLARE_API_KEY='your-key'"
    echo "  export CLOUDFLARE_EMAIL='your-email'"
    echo ""
    echo "Get credentials from: https://dash.cloudflare.com/profile/api-tokens"
    echo ""
    echo "Then run: $0"
    exit 1
fi

# Function to set CI/CD variable
set_variable() {
    local key="$1"
    local value="$2"
    local protected="${3:-false}"
    local masked="${4:-true}"

    # Check if exists
    response=$(curl -s -w "\n%{http_code}" \
        -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
        "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables/${key}" 2>/dev/null || echo "404")

    http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "200" ]; then
        # Update
        curl -s -X PUT \
            -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
            -F "value=${value}" \
            -F "protected=${protected}" \
            -F "masked=${masked}" \
            "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables/${key}" > /dev/null
        echo "  ✓ Updated $key"
    else
        # Create
        curl -s -X POST \
            -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
            -F "key=${key}" \
            -F "value=${value}" \
            -F "protected=${protected}" \
            -F "masked=${masked}" \
            "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables" > /dev/null
        echo "  ✓ Created $key"
    fi
}

echo ""
echo "⚙️  Configuring GitLab CI/CD variables..."

set_variable "CLOUDFLARE_API_TOKEN" "$CF_TOKEN" "false" "true"
set_variable "CLOUDFLARE_ACCOUNT_ID" "$ACCOUNT_ID" "false" "false"

# Grafana API key
if [ -n "${GRAFANA_API_KEY:-}" ]; then
    set_variable "GRAFANA_API_KEY" "$GRAFANA_API_KEY" "false" "true"
    echo "  ✓ Created GRAFANA_API_KEY"
fi

# Optional: n8n webhook
if [ -n "${N8N_WEBHOOK_URL:-}" ]; then
    set_variable "N8N_WEBHOOK_URL" "$N8N_WEBHOOK_URL" "false" "false"
    echo "  ✓ Created N8N_WEBHOOK_URL"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GitLab CI/CD configured successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "View variables: https://${GITLAB_HOST}/${PROJECT_PATH}/-/settings/ci_cd"
echo "Test pipeline:  git push origin master"
echo ""
