#!/bin/bash
#
# Deploy n8n workflow via API
# Usage: ./deploy-workflow.sh [workflow-file]
#

set -euo pipefail

# Configuration
N8N_URL="${N8N_URL:-https://n8n.jclee.me}"
N8N_API_KEY="${N8N_API_KEY:-}"
WORKFLOW_FILE="${1:-n8n/workflows/resume-auto-deploy.json}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        log_error "jq is required but not installed. Install: sudo dnf install jq"
        exit 1
    fi

    # Check if curl is installed
    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed."
        exit 1
    fi

    # Check if API key is set
    if [[ -z "$N8N_API_KEY" ]]; then
        log_error "N8N_API_KEY environment variable is not set."
        log_info "Get API key from: $N8N_URL/settings/api"
        exit 1
    fi

    # Check if workflow file exists
    if [[ ! -f "$WORKFLOW_FILE" ]]; then
        log_error "Workflow file not found: $WORKFLOW_FILE"
        exit 1
    fi
}

test_connection() {
    log_info "Testing n8n API connection..."

    response=$(curl -s -w "\n%{http_code}" \
        -H "X-N8N-API-KEY: $N8N_API_KEY" \
        "$N8N_URL/api/v1/workflows" || true)

    http_code=$(echo "$response" | tail -n1)

    if [[ "$http_code" != "200" ]]; then
        log_error "Failed to connect to n8n API (HTTP $http_code)"
        log_error "URL: $N8N_URL/api/v1/workflows"
        exit 1
    fi

    log_info "Connection successful!"
}

check_existing_workflow() {
    local workflow_name="Resume Auto Deploy"

    log_info "Checking for existing workflow: $workflow_name"

    existing=$(curl -s \
        -H "X-N8N-API-KEY: $N8N_API_KEY" \
        "$N8N_URL/api/v1/workflows" | \
        jq -r ".data[] | select(.name == \"$workflow_name\") | .id" || echo "")

    if [[ -n "$existing" ]]; then
        log_warn "Workflow already exists with ID: $existing"
        read -p "Do you want to update it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "$existing"
        else
            log_info "Deployment cancelled."
            exit 0
        fi
    else
        echo ""
    fi
}

deploy_workflow() {
    local workflow_id="$1"
    local workflow_data

    # Read and validate workflow JSON
    workflow_data=$(cat "$WORKFLOW_FILE")

    if ! echo "$workflow_data" | jq empty 2>/dev/null; then
        log_error "Invalid JSON in workflow file: $WORKFLOW_FILE"
        exit 1
    fi

    log_info "Deploying workflow from: $WORKFLOW_FILE"

    if [[ -n "$workflow_id" ]]; then
        # Update existing workflow
        log_info "Updating workflow ID: $workflow_id"

        response=$(curl -s -w "\n%{http_code}" \
            -X PATCH \
            -H "Content-Type: application/json" \
            -H "X-N8N-API-KEY: $N8N_API_KEY" \
            -d "$workflow_data" \
            "$N8N_URL/api/v1/workflows/$workflow_id")

        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | head -n -1)

        if [[ "$http_code" == "200" ]]; then
            log_info "Workflow updated successfully!"
            echo "$body" | jq -r '{id, name, active, createdAt, updatedAt}'
        else
            log_error "Failed to update workflow (HTTP $http_code)"
            echo "$body" | jq '.' 2>/dev/null || echo "$body"
            exit 1
        fi
    else
        # Create new workflow
        log_info "Creating new workflow..."

        response=$(curl -s -w "\n%{http_code}" \
            -X POST \
            -H "Content-Type: application/json" \
            -H "X-N8N-API-KEY: $N8N_API_KEY" \
            -d "$workflow_data" \
            "$N8N_URL/api/v1/workflows")

        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | head -n -1)

        if [[ "$http_code" == "200" || "$http_code" == "201" ]]; then
            log_info "Workflow created successfully!"
            workflow_id=$(echo "$body" | jq -r '.id')
            echo "$body" | jq -r '{id, name, active, createdAt, updatedAt}'
        else
            log_error "Failed to create workflow (HTTP $http_code)"
            echo "$body" | jq '.' 2>/dev/null || echo "$body"
            exit 1
        fi
    fi

    echo "$workflow_id"
}

activate_workflow() {
    local workflow_id="$1"

    log_info "Activating workflow..."

    response=$(curl -s -w "\n%{http_code}" \
        -X PATCH \
        -H "Content-Type: application/json" \
        -H "X-N8N-API-KEY: $N8N_API_KEY" \
        -d '{"active": true}' \
        "$N8N_URL/api/v1/workflows/$workflow_id")

    http_code=$(echo "$response" | tail -n1)

    if [[ "$http_code" == "200" ]]; then
        log_info "Workflow activated successfully!"
    else
        log_warn "Failed to activate workflow (HTTP $http_code)"
    fi
}

get_webhook_url() {
    local workflow_id="$1"

    log_info "Getting webhook URL..."

    webhook_path=$(cat "$WORKFLOW_FILE" | jq -r '.nodes[] | select(.type == "n8n-nodes-base.webhook") | .parameters.path')

    if [[ -n "$webhook_path" ]]; then
        webhook_url="$N8N_URL/webhook/$webhook_path"
        log_info "Webhook URL: $webhook_url"
        log_info ""
        log_info "Configure GitHub webhook:"
        log_info "  Repository: https://github.com/qws941/resume"
        log_info "  Settings → Webhooks → Add webhook"
        log_info "  Payload URL: $webhook_url"
        log_info "  Content type: application/json"
        log_info "  Events: Just the push event"
    fi
}

# Main execution
main() {
    log_info "=== n8n Workflow Deployment ==="
    log_info "Target: $N8N_URL"
    log_info "Workflow: $WORKFLOW_FILE"
    log_info ""

    check_prerequisites
    test_connection

    existing_id=$(check_existing_workflow)
    workflow_id=$(deploy_workflow "$existing_id")
    activate_workflow "$workflow_id"
    get_webhook_url "$workflow_id"

    log_info ""
    log_info "=== Deployment Complete ==="
    log_info "Workflow ID: $workflow_id"
    log_info "Dashboard: $N8N_URL/workflow/$workflow_id"
}

main "$@"
