#!/bin/bash
# n8n Webhook Integration Test Script
# Tests the GitHub deployment webhook without actual n8n server

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 n8n Webhook Integration Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Validate GitHub Actions webhook payload generation
echo "📋 Test 1: GitHub Actions Payload Generation"
echo "   Simulating GitHub Actions environment..."

export GITHUB_SHA="7ae6deb1234567890abcdef1234567890abcdef"
export GITHUB_RUN_ID="12345678"
export GITHUB_REPOSITORY="qws941/resume"
export GITHUB_REF_NAME="master"

COMMIT_SHA=$(echo "$GITHUB_SHA" | cut -c1-7)
COMMIT_MESSAGE="test: n8n webhook integration verification"
AUTHOR="Claude Code"
DEPLOYED_AT=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
STATUS="success"

PAYLOAD=$(cat <<EOF
{
  "commit_sha": "$COMMIT_SHA",
  "commit_message": "$COMMIT_MESSAGE",
  "author": "$AUTHOR",
  "deployed_at": "$DEPLOYED_AT",
  "status": "$STATUS",
  "workflow_run_id": "$GITHUB_RUN_ID",
  "repository": "$GITHUB_REPOSITORY",
  "branch": "$GITHUB_REF_NAME"
}
EOF
)

echo "$PAYLOAD" | jq .
echo "   ✅ Valid JSON payload generated"
echo ""

# Test 2: Validate required fields
echo "📋 Test 2: Required Fields Validation"
REQUIRED_FIELDS=("commit_sha" "commit_message" "author" "deployed_at" "status")

for field in "${REQUIRED_FIELDS[@]}"; do
    value=$(echo "$PAYLOAD" | jq -r ".$field")
    if [ -z "$value" ] || [ "$value" == "null" ]; then
        echo "   ❌ Missing required field: $field"
        exit 1
    else
        echo "   ✅ $field: $value"
    fi
done
echo ""

# Test 3: Check resume site health
echo "📋 Test 3: Resume Site Health Check"
HEALTH_RESPONSE=$(curl -s https://resume.jclee.me/health)
STATUS_CHECK=$(echo "$HEALTH_RESPONSE" | jq -r '.status')

if [ "$STATUS_CHECK" == "healthy" ]; then
    echo "   ✅ Site is healthy"
    echo "$HEALTH_RESPONSE" | jq .
else
    echo "   ❌ Site unhealthy: $STATUS_CHECK"
    exit 1
fi
echo ""

# Test 4: Check metrics endpoint
echo "📋 Test 4: Metrics Endpoint Validation"
METRICS=$(curl -s https://resume.jclee.me/metrics)

if echo "$METRICS" | grep -q "http_requests_total"; then
    echo "   ✅ Prometheus metrics available"
    echo "$METRICS" | head -5
    echo "   ..."
else
    echo "   ❌ Metrics endpoint not working"
    exit 1
fi
echo ""

# Test 5: n8n server connectivity
echo "📋 Test 5: n8n Server Connectivity"
N8N_HEALTH=$(curl -s https://n8n.jclee.me/healthz)

if [ -n "$N8N_HEALTH" ]; then
    echo "   ✅ n8n server is accessible"
    echo "   Response: $N8N_HEALTH"
else
    echo "   ❌ n8n server not accessible"
    exit 1
fi
echo ""

# Test 6: Workflow JSON validation
echo "📋 Test 6: Workflow JSON Validation"
WORKFLOWS=(
    "infrastructure/workflows/01-site-health-monitor.json"
    "infrastructure/workflows/02-github-deployment-webhook.json"
)

for workflow in "${WORKFLOWS[@]}"; do
    if [ ! -f "$workflow" ]; then
        echo "   ❌ Workflow not found: $workflow"
        exit 1
    fi

    WORKFLOW_NAME=$(jq -r '.name' "$workflow")
    NODE_COUNT=$(jq '.nodes | length' "$workflow")

    if [ -n "$WORKFLOW_NAME" ] && [ "$NODE_COUNT" -gt 0 ]; then
        echo "   ✅ $WORKFLOW_NAME ($NODE_COUNT nodes)"
    else
        echo "   ❌ Invalid workflow: $workflow"
        exit 1
    fi
done
echo ""

# Test 7: GitHub Actions integration check
echo "📋 Test 7: GitHub Actions Integration"
DEPLOY_YAML=".github/workflows/deploy.yml"

if grep -q "N8N_WEBHOOK_URL" "$DEPLOY_YAML"; then
    echo "   ✅ N8N_WEBHOOK_URL configured in deploy.yml"
else
    echo "   ❌ N8N_WEBHOOK_URL not found in deploy.yml"
    exit 1
fi

if grep -q "Notify n8n Webhook" "$DEPLOY_YAML"; then
    echo "   ✅ Webhook notification step present"
else
    echo "   ❌ Webhook notification step not found"
    exit 1
fi
echo ""

# Test 8: Documentation completeness
echo "📋 Test 8: Documentation Completeness"
DOCS=(
    "docs/N8N-MONITORING-WORKFLOWS.md"
    "infrastructure/workflows/README.md"
    "docs/DEPLOYMENT-SUMMARY-2025-11-18.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        SIZE=$(du -h "$doc" | cut -f1)
        echo "   ✅ $doc ($SIZE)"
    else
        echo "   ❌ Missing documentation: $doc"
        exit 1
    fi
done
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All Tests Passed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Test Summary:"
echo "   1. ✅ GitHub Actions payload generation"
echo "   2. ✅ Required fields validation"
echo "   3. ✅ Resume site health check"
echo "   4. ✅ Metrics endpoint validation"
echo "   5. ✅ n8n server connectivity"
echo "   6. ✅ Workflow JSON validation (2 workflows)"
echo "   7. ✅ GitHub Actions integration"
echo "   8. ✅ Documentation completeness (3 files)"
echo ""
echo "🚀 Next Steps:"
echo "   1. Import workflows to n8n: https://n8n.jclee.me"
echo "   2. Configure Slack/Google Sheets credentials"
echo "   3. Add GitHub secret: N8N_WEBHOOK_URL"
echo "   4. Activate workflows and test with live deployment"
echo ""
echo "📖 Documentation: infrastructure/workflows/README.md"
echo ""
