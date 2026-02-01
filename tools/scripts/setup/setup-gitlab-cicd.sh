#!/bin/bash
#
# GitLab CI/CD Setup Script
# Configures required CI/CD variables for Cloudflare Workers deployment
#

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}GitLab CI/CD Setup for Resume Portfolio${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Configuration
GITLAB_HOST="${GITLAB_HOST:-gitlab.jclee.me}"
GITLAB_API_URL="https://${GITLAB_HOST}/api/v4"
PROJECT_PATH="jclee/resume"
PROJECT_ID=$(echo "$PROJECT_PATH" | sed 's/\//%2F/g')

# Check if GitLab token is available
if [ -z "${GITLAB_TOKEN:-}" ]; then
    echo -e "${YELLOW}⚠️  GITLAB_TOKEN environment variable not set${NC}"
    echo ""
    echo -e "Create a GitLab Personal Access Token with 'api' scope:"
    echo -e "  ${BLUE}https://${GITLAB_HOST}/-/user_settings/personal_access_tokens${NC}"
    echo ""
    echo -e "Then export it:"
    echo -e "  ${GREEN}export GITLAB_TOKEN='your-token-here'${NC}"
    echo ""
    exit 1
fi

# Function to create or update CI/CD variable
set_cicd_variable() {
    local key="$1"
    local value="$2"
    local protected="${3:-false}"
    local masked="${4:-true}"

    echo -e "${BLUE}→${NC} Configuring ${GREEN}${key}${NC}..."

    # Check if variable exists
    response=$(curl -s -w "\n%{http_code}" \
        -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
        "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables/${key}")

    http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "200" ]; then
        # Update existing variable
        result=$(curl -s -X PUT \
            -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
            -F "value=${value}" \
            -F "protected=${protected}" \
            -F "masked=${masked}" \
            "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables/${key}")
        echo -e "  ${GREEN}✓${NC} Updated"
    else
        # Create new variable
        result=$(curl -s -X POST \
            -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
            -F "key=${key}" \
            -F "value=${value}" \
            -F "protected=${protected}" \
            -F "masked=${masked}" \
            "${GITLAB_API_URL}/projects/${PROJECT_ID}/variables")
        echo -e "  ${GREEN}✓${NC} Created"
    fi
}

# Get Cloudflare Account ID from wrangler.toml
echo -e "${BLUE}📋 Reading configuration...${NC}"
ACCOUNT_ID=$(grep "account_id" web/wrangler.toml | cut -d'"' -f2)
echo -e "  Cloudflare Account ID: ${GREEN}${ACCOUNT_ID}${NC}"
echo ""

# Check Wrangler authentication
echo -e "${BLUE}🔐 Checking Wrangler authentication...${NC}"
if ! npx wrangler whoami &>/dev/null; then
    echo -e "${RED}✗${NC} Wrangler not authenticated"
    echo ""
    echo -e "Run: ${GREEN}npx wrangler login${NC}"
    exit 1
fi
echo -e "  ${GREEN}✓${NC} Wrangler authenticated"
echo ""

# Get Cloudflare API Token
echo -e "${BLUE}🔑 Cloudflare API Token${NC}"
echo ""
echo -e "Wrangler is using stored credentials, but GitLab CI/CD needs an API token."
echo -e "You have two options:"
echo ""
echo -e "${YELLOW}Option 1: Use existing Global API Key${NC}"
echo -e "  Find your API key at:"
echo -e "  ${BLUE}https://dash.cloudflare.com/profile/api-tokens${NC}"
echo -e "  Look for 'Global API Key' (already in use by Wrangler)"
echo ""
echo -e "${YELLOW}Option 2: Create new API Token (Recommended)${NC}"
echo -e "  1. Visit: ${BLUE}https://dash.cloudflare.com/profile/api-tokens${NC}"
echo -e "  2. Click 'Create Token' → 'Edit Cloudflare Workers' template"
echo -e "  3. Required permissions:"
echo -e "     - Account > Workers Scripts > Edit"
echo -e "     - Account > Account Settings > Read"
echo -e "  4. Account: qws941 (${ACCOUNT_ID})"
echo ""
read -p "Enter Cloudflare API Token: " -s CLOUDFLARE_API_TOKEN
echo ""
echo ""

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}✗${NC} API token required"
    exit 1
fi

# Validate token format
if [[ ! "$CLOUDFLARE_API_TOKEN" =~ ^[A-Za-z0-9_-]{40,}$ ]]; then
    echo -e "${YELLOW}⚠️  Token format may be incorrect (expected 40+ alphanumeric characters)${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Configure CI/CD variables
echo -e "${BLUE}⚙️  Configuring GitLab CI/CD variables...${NC}"
echo ""

set_cicd_variable "CLOUDFLARE_API_TOKEN" "$CLOUDFLARE_API_TOKEN" "false" "true"
set_cicd_variable "CLOUDFLARE_ACCOUNT_ID" "$ACCOUNT_ID" "false" "false"

echo ""
echo -e "${GREEN}✓${NC} GitLab CI/CD variables configured successfully!"
echo ""

# Optional: Configure n8n webhook
echo -e "${BLUE}📢 n8n Webhook Notification (Optional)${NC}"
echo ""
read -p "Configure n8n webhook? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter n8n webhook URL: " N8N_WEBHOOK_URL
    if [ -n "$N8N_WEBHOOK_URL" ]; then
        set_cicd_variable "N8N_WEBHOOK_URL" "$N8N_WEBHOOK_URL" "false" "false"
        echo -e "  ${GREEN}✓${NC} n8n webhook configured"
    fi
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "Configured variables:"
echo -e "  ${GREEN}✓${NC} CLOUDFLARE_API_TOKEN"
echo -e "  ${GREEN}✓${NC} CLOUDFLARE_ACCOUNT_ID"
if [ -n "${N8N_WEBHOOK_URL:-}" ]; then
    echo -e "  ${GREEN}✓${NC} N8N_WEBHOOK_URL"
fi
echo ""
echo -e "Next steps:"
echo -e "  1. View variables: ${BLUE}https://${GITLAB_HOST}/${PROJECT_PATH}/-/settings/ci_cd${NC}"
echo -e "  2. Test pipeline:  ${GREEN}git push origin master${NC}"
echo -e "  3. View pipeline:  ${BLUE}https://${GITLAB_HOST}/${PROJECT_PATH}/-/pipelines${NC}"
echo ""
