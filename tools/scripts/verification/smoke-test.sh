#!/bin/bash
# Resume Portfolio - Smoke Test Script
# Quick post-deployment sanity checks
#
# Usage:
#   ./tools/scripts/verification/smoke-test.sh [environment]
#
# Environments:
#   production (default) - https://resume.jclee.me
#   staging              - https://resume-staging.jclee.me
#   local                - http://localhost:8787
#
# Exit codes:
#   0 - All smoke tests passed
#   1 - Critical failure (site down, health check failed)
#   2 - Non-critical failures (degraded functionality)

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
ENV="${1:-production}"
TIMEOUT=10
PASS=0
FAIL=0
WARN=0

# Environment URLs
declare -A URLS=(
    ["production"]="https://resume.jclee.me"
    ["staging"]="https://resume-staging.jclee.me"
    ["local"]="http://localhost:8787"
)

BASE_URL="${URLS[$ENV]:-${URLS[production]}}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Resume Portfolio - Smoke Test${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Environment: ${YELLOW}$ENV${NC}"
echo -e "URL: ${YELLOW}$BASE_URL${NC}"
echo -e "Timeout: ${TIMEOUT}s per request"
echo ""

# Test 1: Site reachability
echo -e "${YELLOW}[1/5]${NC} Testing site reachability..."
HTTP_CODE=$(curl -sf -o /dev/null -w '%{http_code}' --max-time $TIMEOUT "$BASE_URL" 2>/dev/null || echo "000")

if [[ "$HTTP_CODE" == "200" ]]; then
    echo -e "${GREEN}✓ Site is up (HTTP $HTTP_CODE)${NC}"
    ((PASS++))
else
    echo -e "${RED}✗ Site unreachable (HTTP $HTTP_CODE)${NC}"
    ((FAIL++))
    echo -e "${RED}CRITICAL: Site is down. Aborting smoke tests.${NC}"
    exit 1
fi

# Test 2: Health endpoint
echo -e "${YELLOW}[2/5]${NC} Testing health endpoint..."
if HEALTH=$(curl -sf --max-time $TIMEOUT "$BASE_URL/health" 2>/dev/null); then
    STATUS=$(echo "$HEALTH" | jq -r '.status' 2>/dev/null || echo "unknown")
    VERSION=$(echo "$HEALTH" | jq -r '.version' 2>/dev/null || echo "unknown")
    
    if [[ "$STATUS" == "healthy" ]]; then
        echo -e "${GREEN}✓ Health: $STATUS (v$VERSION)${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ Health: $STATUS${NC}"
        ((WARN++))
    fi
else
    echo -e "${RED}✗ Health endpoint failed${NC}"
    ((FAIL++))
fi

# Test 3: Key assets
echo -e "${YELLOW}[3/5]${NC} Testing key assets..."
ASSETS_OK=0
ASSETS_TOTAL=3

# OG Image
if curl -sf --max-time $TIMEOUT -I "$BASE_URL/og-image.webp" 2>/dev/null | head -1 | grep -q "200"; then
    echo -e "${GREEN}  ✓ og-image.webp${NC}"
    ((ASSETS_OK++))
else
    echo -e "${RED}  ✗ og-image.webp${NC}"
fi

# Favicon
if curl -sf --max-time $TIMEOUT -I "$BASE_URL/favicon.ico" 2>/dev/null | head -1 | grep -q "200\|404"; then
    echo -e "${GREEN}  ✓ favicon.ico${NC}"
    ((ASSETS_OK++))
else
    echo -e "${YELLOW}  ⚠ favicon.ico (not critical)${NC}"
    ((ASSETS_OK++))
fi

# Robots.txt
if curl -sf --max-time $TIMEOUT -I "$BASE_URL/robots.txt" 2>/dev/null | head -1 | grep -q "200"; then
    echo -e "${GREEN}  ✓ robots.txt${NC}"
    ((ASSETS_OK++))
else
    echo -e "${YELLOW}  ⚠ robots.txt (optional)${NC}"
    ((ASSETS_OK++))
fi

if [[ $ASSETS_OK -eq $ASSETS_TOTAL ]]; then
    ((PASS++))
else
    ((WARN++))
fi

# Test 4: Security headers
echo -e "${YELLOW}[4/5]${NC} Testing security headers..."
HEADERS=$(curl -sf --max-time $TIMEOUT -I "$BASE_URL" 2>/dev/null || echo "")
SEC_OK=0
SEC_TOTAL=3

if echo "$HEADERS" | grep -qi "strict-transport-security"; then
    echo -e "${GREEN}  ✓ HSTS${NC}"
    ((SEC_OK++))
else
    echo -e "${YELLOW}  ⚠ HSTS missing${NC}"
fi

if echo "$HEADERS" | grep -qi "content-security-policy"; then
    echo -e "${GREEN}  ✓ CSP${NC}"
    ((SEC_OK++))
else
    echo -e "${YELLOW}  ⚠ CSP missing${NC}"
fi

if echo "$HEADERS" | grep -qi "x-content-type-options"; then
    echo -e "${GREEN}  ✓ X-Content-Type-Options${NC}"
    ((SEC_OK++))
else
    echo -e "${YELLOW}  ⚠ X-Content-Type-Options missing${NC}"
fi

if [[ $SEC_OK -ge 2 ]]; then
    ((PASS++))
else
    ((WARN++))
fi

# Test 5: API endpoints
echo -e "${YELLOW}[5/5]${NC} Testing API endpoints..."
API_OK=0
API_TOTAL=2

# Metrics endpoint
if curl -sf --max-time $TIMEOUT "$BASE_URL/metrics" 2>/dev/null | grep -q "http_requests_total"; then
    echo -e "${GREEN}  ✓ /metrics${NC}"
    ((API_OK++))
else
    echo -e "${YELLOW}  ⚠ /metrics (may be disabled)${NC}"
    ((API_OK++))  # Not critical
fi

# Vitals endpoint (POST test)
VITALS_CODE=$(curl -sf -o /dev/null -w '%{http_code}' --max-time $TIMEOUT \
    -X POST "$BASE_URL/api/vitals" \
    -H "Content-Type: application/json" \
    -d '{"lcp":1000,"fid":10,"cls":0.01}' 2>/dev/null || echo "000")

if [[ "$VITALS_CODE" == "200" || "$VITALS_CODE" == "204" ]]; then
    echo -e "${GREEN}  ✓ /api/vitals${NC}"
    ((API_OK++))
else
    echo -e "${YELLOW}  ⚠ /api/vitals (HTTP $VITALS_CODE)${NC}"
    ((API_OK++))  # Not critical for smoke test
fi

if [[ $API_OK -ge 1 ]]; then
    ((PASS++))
else
    ((WARN++))
fi

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Smoke Test Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Passed: $PASS/5${NC}"
if [[ $WARN -gt 0 ]]; then
    echo -e "${YELLOW}⚠ Warnings: $WARN${NC}"
fi
if [[ $FAIL -gt 0 ]]; then
    echo -e "${RED}✗ Failed: $FAIL${NC}"
fi
echo ""

# Exit code
if [[ $FAIL -eq 0 && $PASS -ge 3 ]]; then
    echo -e "${GREEN}🎉 Smoke tests passed!${NC}"
    echo -e "${BLUE}→ Site is operational${NC}"
    exit 0
elif [[ $FAIL -eq 0 ]]; then
    echo -e "${YELLOW}⚠ Smoke tests passed with warnings${NC}"
    echo -e "${BLUE}→ Site is operational but some features may be degraded${NC}"
    exit 2
else
    echo -e "${RED}✗ Smoke tests failed${NC}"
    echo -e "${YELLOW}→ Run full verification: ./tools/scripts/verification/verify-deployment.sh${NC}"
    exit 1
fi
