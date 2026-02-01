#!/bin/bash
#
# Performance Monitoring Setup Script
# Automates Grafana dashboard deployment and monitoring configuration
#
# Usage:
#   ./scripts/monitoring/setup-monitoring.sh [command]
#   ./scripts/monitoring/setup-monitoring.sh deploy      # Deploy Grafana dashboard
#   ./scripts/monitoring/setup-monitoring.sh verify      # Verify monitoring setup
#   ./scripts/monitoring/setup-monitoring.sh test        # Test metrics collection
#

set -euo pipefail

# Color codes
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Paths
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$(dirname "${SCRIPT_DIR}")")"
readonly DASHBOARD_FILE="${PROJECT_ROOT}/infrastructure/monitoring/grafana-dashboard-resume-portfolio.json"
readonly ALERT_RULES="${PROJECT_ROOT}/infrastructure/configs/grafana/alert-rules.yaml"

# Grafana configuration
readonly GRAFANA_URL="${GRAFANA_URL:-http://localhost:3000}"
readonly GRAFANA_API_KEY="${GRAFANA_API_KEY:-}"
readonly PROMETHEUS_URL="${PROMETHEUS_URL:-http://localhost:9090}"

#
# Print colored message
#
log() {
    local level="$1"
    shift
    case "$level" in
        info)  echo -e "${BLUE}ℹ${NC} $*" ;;
        success) echo -e "${GREEN}✓${NC} $*" ;;
        warn)  echo -e "${YELLOW}⚠${NC} $*" ;;
        error) echo -e "${RED}✗${NC} $*" ;;
    esac
}

#
# Check dependencies
#
check_dependencies() {
    log info "Checking dependencies..."
    
    local missing=0
    
    if ! command -v curl &> /dev/null; then
        log error "curl not found"
        ((missing++))
    fi
    
    if ! command -v jq &> /dev/null; then
        log warn "jq not found (optional, for JSON parsing)"
    fi
    
    if [ $missing -gt 0 ]; then
        log error "Missing required dependencies"
        return 1
    fi
    
    log success "All dependencies installed"
    return 0
}

#
# Check Grafana connectivity
#
check_grafana() {
    log info "Checking Grafana connectivity..."
    
    if [ -z "$GRAFANA_API_KEY" ]; then
        log warn "GRAFANA_API_KEY not set"
        log info "Set it with: export GRAFANA_API_KEY=your_api_key"
        return 1
    fi
    
    local response
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
        "${GRAFANA_URL}/api/health" || echo "000")
    
    if [ "$response" = "200" ]; then
        log success "Grafana is accessible at ${GRAFANA_URL}"
        return 0
    else
        log error "Cannot connect to Grafana (HTTP ${response})"
        log info "Check if Grafana is running: docker ps | grep grafana"
        return 1
    fi
}

#
# Check Prometheus connectivity
#
check_prometheus() {
    log info "Checking Prometheus connectivity..."
    
    local response
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        "${PROMETHEUS_URL}/-/healthy" || echo "000")
    
    if [ "$response" = "200" ]; then
        log success "Prometheus is accessible at ${PROMETHEUS_URL}"
        return 0
    else
        log warn "Cannot connect to Prometheus (HTTP ${response})"
        log info "Monitoring will work without Prometheus, but metrics won't be collected"
        return 1
    fi
}

#
# Deploy Grafana dashboard
#
deploy_dashboard() {
    log info "Deploying Grafana dashboard..."
    
    if [ ! -f "$DASHBOARD_FILE" ]; then
        log error "Dashboard file not found: $DASHBOARD_FILE"
        return 1
    fi
    
    if ! check_grafana; then
        return 1
    fi
    
    # Prepare dashboard JSON
    local dashboard_json
    dashboard_json=$(cat "$DASHBOARD_FILE")
    
    # Wrap in dashboard object
    local payload
    payload=$(jq -n \
        --argjson dashboard "$dashboard_json" \
        '{
            dashboard: $dashboard,
            overwrite: true,
            message: "Deployed via setup-monitoring.sh"
        }')
    
    # Deploy to Grafana
    local response
    response=$(curl -s -X POST \
        -H "Authorization: Bearer ${GRAFANA_API_KEY}" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "${GRAFANA_URL}/api/dashboards/db")
    
    if echo "$response" | grep -q '"status":"success"'; then
        local dashboard_url
        dashboard_url=$(echo "$response" | jq -r '.url // empty')
        log success "Dashboard deployed successfully"
        if [ -n "$dashboard_url" ]; then
            log info "Dashboard URL: ${GRAFANA_URL}${dashboard_url}"
        fi
        return 0
    else
        log error "Dashboard deployment failed"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
        return 1
    fi
}

#
# Deploy alert rules
#
deploy_alerts() {
    log info "Deploying alert rules..."
    
    if [ ! -f "$ALERT_RULES" ]; then
        log warn "Alert rules file not found: $ALERT_RULES"
        return 1
    fi
    
    if ! check_grafana; then
        return 1
    fi
    
    log warn "Alert rules deployment requires Grafana Alerting API"
    log info "Please import alert rules manually via Grafana UI"
    log info "File: $ALERT_RULES"
    
    return 0
}

#
# Test metrics collection
#
test_metrics() {
    log info "Testing metrics collection..."
    
    if ! check_prometheus; then
        log warn "Skipping metrics test (Prometheus not available)"
        return 1
    fi
    
    # Test query: http_requests_total
    local query="http_requests_total{job=\"resume\"}"
    local response
    response=$(curl -s -G \
        --data-urlencode "query=${query}" \
        "${PROMETHEUS_URL}/api/v1/query")
    
    if echo "$response" | grep -q '"status":"success"'; then
        local result_count
        result_count=$(echo "$response" | jq '.data.result | length')
        log success "Metrics query successful (${result_count} results)"
        return 0
    else
        log warn "No metrics found for query: ${query}"
        log info "Metrics will be collected once the application starts sending data"
        return 1
    fi
}

#
# Verify monitoring setup
#
verify_setup() {
    log info "Verifying monitoring setup..."
    echo ""
    
    local checks_passed=0
    local checks_total=0
    
    # Check 1: Dependencies
    ((checks_total++))
    if check_dependencies; then
        ((checks_passed++))
    fi
    echo ""
    
    # Check 2: Grafana
    ((checks_total++))
    if check_grafana; then
        ((checks_passed++))
    fi
    echo ""
    
    # Check 3: Prometheus
    ((checks_total++))
    if check_prometheus; then
        ((checks_passed++))
    fi
    echo ""
    
    # Check 4: Dashboard file
    ((checks_total++))
    if [ -f "$DASHBOARD_FILE" ]; then
        log success "Dashboard file exists"
        ((checks_passed++))
    else
        log error "Dashboard file not found"
    fi
    echo ""
    
    # Check 5: Alert rules file
    ((checks_total++))
    if [ -f "$ALERT_RULES" ]; then
        log success "Alert rules file exists"
        ((checks_passed++))
    else
        log warn "Alert rules file not found"
    fi
    echo ""
    
    # Summary
    echo "========================================="
    log info "Verification Summary"
    echo "========================================="
    echo "Checks passed: ${checks_passed}/${checks_total}"
    
    if [ $checks_passed -eq $checks_total ]; then
        log success "All checks passed! Monitoring is ready."
        return 0
    elif [ $checks_passed -ge 3 ]; then
        log warn "Some checks failed, but monitoring can work with limitations"
        return 0
    else
        log error "Too many checks failed. Please fix the issues above."
        return 1
    fi
}

#
# Show usage
#
usage() {
    cat << EOF
Performance Monitoring Setup Script

Usage:
  $0 [command]

Commands:
  deploy      Deploy Grafana dashboard
  verify      Verify monitoring setup
  test        Test metrics collection
  help        Show this help message

Environment Variables:
  GRAFANA_URL       Grafana URL (default: http://localhost:3000)
  GRAFANA_API_KEY   Grafana API key (required for deploy)
  PROMETHEUS_URL    Prometheus URL (default: http://localhost:9090)

Examples:
  # Verify setup
  $0 verify

  # Deploy dashboard
  export GRAFANA_API_KEY=your_api_key
  $0 deploy

  # Test metrics
  $0 test

EOF
}

#
# Main execution
#
main() {
    local command="${1:-help}"
    
    case "$command" in
        deploy)
            deploy_dashboard
            ;;
        verify)
            verify_setup
            ;;
        test)
            test_metrics
            ;;
        help|--help|-h)
            usage
            ;;
        *)
            log error "Unknown command: $command"
            echo ""
            usage
            exit 1
            ;;
    esac
}

# Run if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
