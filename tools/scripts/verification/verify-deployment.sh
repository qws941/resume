#!/bin/bash
# Resume Portfolio - Deployment Verification Script
# Comprehensive verification checklist from MANUAL_DEPLOYMENT_GUIDE.md

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SITE_URL="https://resume.jclee.me"
PASS=0
FAIL=0
WARN=0

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Resume Portfolio - Deployment Verification${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test 1: Deployment Timestamp
echo -e "${YELLOW}[1/7]${NC} Checking deployment timestamp..."
if HEALTH=$(curl -sf "$SITE_URL/health" 2>/dev/null); then
    DEPLOYED_AT=$(echo "$HEALTH" | jq -r '.deployed_at')
    STATUS=$(echo "$HEALTH" | jq -r '.status')
    VERSION=$(echo "$HEALTH" | jq -r '.version')

    if [[ "$STATUS" == "healthy" ]]; then
        echo -e "${GREEN}✓ Status: $STATUS${NC}"
        echo -e "${GREEN}✓ Version: $VERSION${NC}"
        echo -e "${GREEN}✓ Deployed: $DEPLOYED_AT${NC}"
        ((PASS++))

        # Check if timestamp is recent (within last hour)
        DEPLOYED_EPOCH=$(date -d "$DEPLOYED_AT" +%s 2>/dev/null || echo "0")
        NOW_EPOCH=$(date +%s)
        AGE_SECONDS=$((NOW_EPOCH - DEPLOYED_EPOCH))

        if [[ $AGE_SECONDS -lt 3600 ]]; then
            echo -e "${GREEN}✓ Deployment is recent (${AGE_SECONDS}s ago)${NC}"
        else
            AGE_HOURS=$((AGE_SECONDS / 3600))
            echo -e "${YELLOW}⚠ Deployment is ${AGE_HOURS} hours old${NC}"
        fi
    else
        echo -e "${RED}✗ Status: $STATUS (expected: healthy)${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}✗ Health endpoint unreachable${NC}"
    ((FAIL++))
fi
echo ""

# Test 2: Open Graph Image
echo -e "${YELLOW}[2/7]${NC} Verifying Open Graph image..."
if HTTP_STATUS=$(curl -sf -I "$SITE_URL/og-image.webp" 2>/dev/null | head -1); then
    if echo "$HTTP_STATUS" | grep -q "200"; then
        echo -e "${GREEN}✓ HTTP 200 OK${NC}"

        # Download and check file type
        curl -sf "$SITE_URL/og-image.webp" -o /tmp/og-test.webp 2>/dev/null
        if FILE_TYPE=$(file /tmp/og-test.webp 2>/dev/null); then
            if echo "$FILE_TYPE" | grep -qE "Web/P|RIFF.*WEBP"; then
                SIZE=$(stat -c%s /tmp/og-test.webp 2>/dev/null || echo "0")
                SIZE_KB=$(echo "scale=2; $SIZE / 1024" | bc)
                echo -e "${GREEN}✓ Valid WebP image (${SIZE_KB} KB)${NC}"
                ((PASS++))
            else
                echo -e "${RED}✗ Invalid file type: $FILE_TYPE${NC}"
                ((FAIL++))
            fi
        fi
        rm -f /tmp/og-test.webp
    else
        echo -e "${RED}✗ HTTP status: $HTTP_STATUS${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}✗ Image not accessible${NC}"
    ((FAIL++))
fi
echo ""

# Test 3: Open Graph Meta Tags
echo -e "${YELLOW}[3/7]${NC} Checking Open Graph meta tags..."
if HTML=$(curl -sf "$SITE_URL" 2>/dev/null); then
    OG_TAGS=0
    if echo "$HTML" | grep -q 'property="og:image"'; then
        echo -e "${GREEN}✓ og:image tag present${NC}"
        ((OG_TAGS++))
    fi
    if echo "$HTML" | grep -q 'property="og:image:width"'; then
        echo -e "${GREEN}✓ og:image:width tag present${NC}"
        ((OG_TAGS++))
    fi
    if echo "$HTML" | grep -q 'property="og:image:height"'; then
        echo -e "${GREEN}✓ og:image:height tag present${NC}"
        ((OG_TAGS++))
    fi
    if echo "$HTML" | grep -q 'property="og:image:type"'; then
        echo -e "${GREEN}✓ og:image:type tag present${NC}"
        ((OG_TAGS++))
    fi

    if [[ $OG_TAGS -ge 3 ]]; then
        ((PASS++))
    else
        echo -e "${RED}✗ Missing OG tags (found $OG_TAGS/4)${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}✗ Cannot fetch HTML${NC}"
    ((FAIL++))
fi
echo ""

# Test 4: Web Vitals Tracking Script
echo -e "${YELLOW}[4/7]${NC} Verifying Web Vitals tracking..."
if [[ -n "$HTML" ]]; then
    VITALS_FUNCS=0
    if echo "$HTML" | grep -q "observeLCP"; then
        echo -e "${GREEN}✓ observeLCP function found${NC}"
        ((VITALS_FUNCS++))
    fi
    if echo "$HTML" | grep -q "observeFID"; then
        echo -e "${GREEN}✓ observeFID function found${NC}"
        ((VITALS_FUNCS++))
    fi
    if echo "$HTML" | grep -q "observeCLS"; then
        echo -e "${GREEN}✓ observeCLS function found${NC}"
        ((VITALS_FUNCS++))
    fi

    if [[ $VITALS_FUNCS -eq 3 ]]; then
        ((PASS++))
    else
        echo -e "${RED}✗ Missing Web Vitals functions (found $VITALS_FUNCS/3)${NC}"
        ((FAIL++))
    fi
else
    echo -e "${RED}✗ Cannot verify (HTML not loaded)${NC}"
    ((FAIL++))
fi
echo ""

# Test 5: Web Vitals Endpoint
echo -e "${YELLOW}[5/7]${NC} Testing Web Vitals endpoint..."
VITALS_DATA='{"lcp":1250,"fid":50,"cls":0.05,"fcp":800,"ttfb":200,"url":"/","timestamp":1699000000000,"userAgent":"verify-script"}'
if HTTP_CODE=$(curl -sf -X POST "$SITE_URL/api/vitals" \
    -H "Content-Type: application/json" \
    -d "$VITALS_DATA" \
    -w "%{http_code}" \
    -o /dev/null 2>/dev/null); then
    if [[ "$HTTP_CODE" == "200" ]]; then
        echo -e "${GREEN}✓ Vitals endpoint responding (HTTP $HTTP_CODE)${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ Unexpected status code: HTTP $HTTP_CODE${NC}"
        ((WARN++))
    fi
else
    echo -e "${RED}✗ Vitals endpoint not responding${NC}"
    ((FAIL++))
fi
echo ""

# Test 6: Security Headers
echo -e "${YELLOW}[6/7]${NC} Checking security headers..."
if HEADERS=$(curl -sf -I "$SITE_URL" 2>/dev/null); then
    SECURITY_HEADERS=0
    if echo "$HEADERS" | grep -qi "content-security-policy"; then
        echo -e "${GREEN}✓ Content-Security-Policy present${NC}"
        ((SECURITY_HEADERS++))
    fi
    if echo "$HEADERS" | grep -qi "strict-transport-security"; then
        echo -e "${GREEN}✓ Strict-Transport-Security present${NC}"
        ((SECURITY_HEADERS++))
    fi
    if echo "$HEADERS" | grep -qi "x-content-type-options"; then
        echo -e "${GREEN}✓ X-Content-Type-Options present${NC}"
        ((SECURITY_HEADERS++))
    fi

    if [[ $SECURITY_HEADERS -ge 2 ]]; then
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ Some security headers missing ($SECURITY_HEADERS/3)${NC}"
        ((WARN++))
    fi
else
    echo -e "${RED}✗ Cannot check headers${NC}"
    ((FAIL++))
fi
echo ""

# Test 7: Metrics Endpoint
echo -e "${YELLOW}[7/7]${NC} Verifying Prometheus metrics..."
if METRICS=$(curl -sf "$SITE_URL/metrics" 2>/dev/null); then
    METRIC_COUNT=0
    if echo "$METRICS" | grep -q "http_requests_total"; then
        echo -e "${GREEN}✓ http_requests_total metric found${NC}"
        ((METRIC_COUNT++))
    fi
    if echo "$METRICS" | grep -q "http_response_time_seconds"; then
        echo -e "${GREEN}✓ http_response_time_seconds metric found${NC}"
        ((METRIC_COUNT++))
    fi
    if echo "$METRICS" | grep -q "vitals_received_total"; then
        echo -e "${GREEN}✓ vitals_received_total metric found${NC}"
        ((METRIC_COUNT++))
    fi

    if [[ $METRIC_COUNT -ge 2 ]]; then
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ Some metrics missing ($METRIC_COUNT/3)${NC}"
        ((WARN++))
    fi
else
    echo -e "${RED}✗ Metrics endpoint not responding${NC}"
    ((FAIL++))
fi
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Verification Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Passed: $PASS/7${NC}"
if [[ $WARN -gt 0 ]]; then
    echo -e "${YELLOW}⚠ Warnings: $WARN${NC}"
fi
if [[ $FAIL -gt 0 ]]; then
    echo -e "${RED}✗ Failed: $FAIL/7${NC}"
fi
echo ""

if [[ $FAIL -eq 0 ]]; then
    echo -e "${GREEN}🎉 All critical checks passed!${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  1. Test social media previews:"
    echo -e "     • Twitter: https://cards-dev.twitter.com/validator"
    echo -e "     • Facebook: https://developers.facebook.com/tools/debug/"
    echo -e "     • LinkedIn: https://www.linkedin.com/post-inspector/"
    echo -e "  2. Monitor Web Vitals in Grafana:"
    echo -e "     • https://grafana.jclee.me (query: {job=\"resume-worker\"})"
    echo ""
    exit 0
else
    echo -e "${RED}⚠ Deployment verification failed${NC}"
    echo -e "${YELLOW}→ Check the manual deployment guide: docs/MANUAL_DEPLOYMENT_GUIDE.md${NC}"
    echo ""
    exit 1
fi
