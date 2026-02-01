#!/bin/bash
set -euo pipefail

# Grafana Configuration Deployment Script
# Imports dashboard and alert rules to grafana.jclee.me

# Colors and output functions
source "${HOME}/.claude/lib/bash/colors.sh" 2>/dev/null || {
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  BLUE='\033[0;34m'
  NC='\033[0m'
  log_info() { echo -e "${BLUE}ℹ${NC} $*"; }
  log_success() { echo -e "${GREEN}✓${NC} $*"; }
  log_warning() { echo -e "${YELLOW}⚠${NC} $*"; }
  log_error() { echo -e "${RED}✗${NC} $*"; }
}

# Configuration
GRAFANA_URL="${GRAFANA_URL:-https://grafana.jclee.me}"
GRAFANA_CONFIG_DIR="${PROJECT_ROOT}/infrastructure/configs/grafana"
GRAFANA_MONITORING_DIR="${PROJECT_ROOT}/infrastructure/monitoring"

# SSoT: Dashboard is in monitoring/, Alert Rules are in configs/grafana/
DASHBOARD_FILE="${GRAFANA_MONITORING_DIR}/grafana-dashboard-resume-portfolio.json"
ALERT_RULES_FILE="${GRAFANA_CONFIG_DIR}/alert-rules.yaml"

# Usage information
usage() {
  cat <<EOF
Usage: $0 [OPTIONS]

Import Grafana dashboard and alert rules for resume portfolio monitoring.

OPTIONS:
  -d, --dashboard-only     Import dashboard only (skip alerts)
  -a, --alerts-only        Import alerts only (skip dashboard)
  -k, --api-key KEY        Grafana API key (or set GRAFANA_API_KEY env var)
  -u, --url URL            Grafana URL (default: https://grafana.jclee.me)
  -h, --help               Show this help message

EXAMPLES:
  # Import everything (requires GRAFANA_API_KEY env var)
  export GRAFANA_API_KEY="your-api-key"
  $0

  # Import dashboard only with API key
  $0 --dashboard-only --api-key "your-api-key"

  # Import to different Grafana instance
  $0 --url "http://localhost:3000" --api-key "local-api-key"

ENVIRONMENT VARIABLES:
  GRAFANA_API_KEY    Grafana API key for authentication
  GRAFANA_URL        Grafana instance URL (default: https://grafana.jclee.me)

EOF
  exit 1
}

# Parse command line arguments
IMPORT_DASHBOARD=true
IMPORT_ALERTS=true

while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--dashboard-only)
      IMPORT_ALERTS=false
      shift
      ;;
    -a|--alerts-only)
      IMPORT_DASHBOARD=false
      shift
      ;;
    -k|--api-key)
      GRAFANA_API_KEY="$2"
      shift 2
      ;;
    -u|--url)
      GRAFANA_URL="$2"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      log_error "Unknown option: $1"
      usage
      ;;
  esac
done

# Validate prerequisites
log_info "Validating prerequisites..."

# Check if config files exist
if [[ "$IMPORT_DASHBOARD" == "true" ]] && [[ ! -f "$DASHBOARD_FILE" ]]; then
  log_error "Dashboard file not found: $DASHBOARD_FILE"
  exit 1
fi

if [[ "$IMPORT_ALERTS" == "true" ]] && [[ ! -f "$ALERT_RULES_FILE" ]]; then
  log_error "Alert rules file not found: $ALERT_RULES_FILE"
  exit 1
fi

# Check if API key is provided
if [[ -z "$GRAFANA_API_KEY" ]]; then
  log_error "Grafana API key not provided"
  log_info "Set GRAFANA_API_KEY environment variable or use --api-key option"
  exit 1
fi

# Check if Grafana is accessible
log_info "Checking Grafana connectivity: $GRAFANA_URL"
if ! curl -sf "${GRAFANA_URL}/api/health" >/dev/null; then
  log_error "Grafana is not accessible at $GRAFANA_URL"
  log_info "Check network connectivity and Grafana URL"
  exit 1
fi
log_success "Grafana is accessible"

# Verify API key is valid
log_info "Verifying API key..."
if ! curl -sf "${GRAFANA_URL}/api/org" \
  -H "Authorization: Bearer ${GRAFANA_API_KEY}" >/dev/null; then
  log_error "Invalid Grafana API key"
  log_info "Generate a new API key in Grafana: Configuration → API Keys"
  exit 1
fi
log_success "API key is valid"

# Import dashboard
if [[ "$IMPORT_DASHBOARD" == "true" ]]; then
  log_info "Importing dashboard..."

  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST "${GRAFANA_URL}/api/dashboards/db" \
    -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
    -H "Content-Type: application/json" \
    -d @"${DASHBOARD_FILE}")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | head -n-1)

  if [[ "$HTTP_CODE" == "200" ]]; then
    DASHBOARD_URL=$(echo "$BODY" | jq -r '.url // empty')
    DASHBOARD_UID=$(echo "$BODY" | jq -r '.uid // empty')
    log_success "Dashboard imported successfully"
    log_info "Dashboard URL: ${GRAFANA_URL}${DASHBOARD_URL}"
    log_info "Dashboard UID: ${DASHBOARD_UID}"
  else
    log_error "Failed to import dashboard (HTTP $HTTP_CODE)"
    log_error "Response: $BODY"
    exit 1
  fi
fi

if [[ "$IMPORT_ALERTS" == "true" ]]; then
  log_info "Importing alert rules..."

  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST "${GRAFANA_URL}/api/v1/provisioning/alert-rules" \
    -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
    -H "Content-Type: application/yaml" \
    -H "X-Disable-Provenance: true" \
    --data-binary @"${ALERT_RULES_FILE}")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | head -n-1)

  if [[ "$HTTP_CODE" == "202" ]] || [[ "$HTTP_CODE" == "200" ]]; then
    log_success "Alert rules imported successfully"
  elif [[ "$HTTP_CODE" == "409" ]]; then
    log_warning "Alert rules already exist, updating..."
    RESPONSE=$(curl -s -w "\n%{http_code}" \
      -X PUT "${GRAFANA_URL}/api/v1/provisioning/alert-rules" \
      -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
      -H "Content-Type: application/yaml" \
      -H "X-Disable-Provenance: true" \
      --data-binary @"${ALERT_RULES_FILE}")
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    if [[ "$HTTP_CODE" == "200" ]] || [[ "$HTTP_CODE" == "202" ]]; then
      log_success "Alert rules updated successfully"
    else
      log_error "Failed to update alert rules (HTTP $HTTP_CODE)"
      log_info "Manual import required:"
      log_info "  cp ${ALERT_RULES_FILE} /volume1/grafana/provisioning/alerting/"
      log_info "  docker restart grafana"
    fi
  else
    log_warning "Alert rules API import failed (HTTP $HTTP_CODE)"
    log_info "Attempting provisioning fallback..."
    log_info "Manual steps:"
    log_info "  1. Copy to provisioning: cp ${ALERT_RULES_FILE} /path/to/grafana/provisioning/alerting/"
    log_info "  2. Restart Grafana: docker restart grafana"
  fi
fi

# Summary
echo ""
log_success "Deployment complete!"
echo ""
log_info "📊 Dashboard: ${GRAFANA_URL}/d/resume-portfolio"
log_info "🚨 Alerts: ${GRAFANA_URL}/alerting/list"
log_info "📈 Metrics: https://resume.jclee.me/metrics"
log_info "💓 Health: https://resume.jclee.me/health"
echo ""
log_info "Next steps:"
log_info "  1. Verify dashboard is displaying data (wait 30-60s for first scrape)"
log_info "  2. Configure Slack webhook for alert notifications"
log_info "  3. Test alerts by triggering conditions (in staging only)"
log_info "  4. Review and adjust alert thresholds as needed"
echo ""
