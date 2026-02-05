#!/bin/bash
# Resume Portfolio - E2E Verification Script
# Integrates Playwright E2E tests with deployment verification
#
# Usage:
#   ./tools/scripts/verification/e2e-verify.sh [environment]
#
# Environments:
#   production (default) - https://resume.jclee.me
#   staging              - https://resume-staging.jclee.me
#   local                - http://localhost:8787

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
ENV="${1:-production}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Environment URLs
declare -A URLS=(
    ["production"]="https://resume.jclee.me"
    ["staging"]="https://resume-staging.jclee.me"
    ["local"]="http://localhost:8787"
)

BASE_URL="${URLS[$ENV]:-${URLS[production]}}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Resume Portfolio - E2E Verification${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Environment: ${YELLOW}$ENV${NC}"
echo -e "URL: ${YELLOW}$BASE_URL${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}[1/4]${NC} Checking prerequisites..."

if ! command -v npx &> /dev/null; then
    echo -e "${RED}✗ npx not found. Please install Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npx available${NC}"

# Check if Playwright is installed
cd "$PROJECT_ROOT"
if ! npx playwright --version &> /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Playwright not installed. Installing...${NC}"
    npm install @playwright/test
    npx playwright install chromium
fi
echo -e "${GREEN}✓ Playwright installed${NC}"
echo ""

# Health check first
echo -e "${YELLOW}[2/4]${NC} Running health check..."
HEALTH_URL="$BASE_URL/health"

if HEALTH=$(curl -sf "$HEALTH_URL" 2>/dev/null); then
    STATUS=$(echo "$HEALTH" | jq -r '.status' 2>/dev/null || echo "unknown")
    if [[ "$STATUS" == "healthy" ]]; then
        echo -e "${GREEN}✓ Health check passed (status: healthy)${NC}"
    else
        echo -e "${YELLOW}⚠ Health status: $STATUS${NC}"
    fi
else
    echo -e "${RED}✗ Health check failed - site may be down${NC}"
    echo -e "${YELLOW}→ Continuing with E2E tests anyway...${NC}"
fi
echo ""

# Run E2E tests
echo -e "${YELLOW}[3/4]${NC} Running Playwright E2E tests..."
echo -e "${BLUE}→ Target: $BASE_URL${NC}"
echo ""

# Set BASE_URL for Playwright
export BASE_URL

# Run tests with appropriate settings
TEST_EXIT_CODE=0
if [[ "$ENV" == "local" ]]; then
    # Local: run with retries for flaky tests
    npx playwright test tests/e2e/ \
        --project=chromium \
        --reporter=list \
        --retries=1 || TEST_EXIT_CODE=$?
else
    # Production/Staging: stricter, no retries
    npx playwright test tests/e2e/ \
        --project=chromium \
        --reporter=list || TEST_EXIT_CODE=$?
fi

echo ""

# Summary
echo -e "${YELLOW}[4/4]${NC} Verification summary..."
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [[ $TEST_EXIT_CODE -eq 0 ]]; then
    echo -e "${GREEN}🎉 All E2E tests passed!${NC}"
    echo ""
    echo -e "${BLUE}Test Results:${NC}"
    echo -e "  • Environment: $ENV"
    echo -e "  • URL: $BASE_URL"
    echo -e "  • Status: ${GREEN}PASSED${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  • View full report: npx playwright show-report"
    echo -e "  • Run visual tests: npm run test:e2e -- --project=visual"
    exit 0
else
    echo -e "${RED}✗ E2E tests failed (exit code: $TEST_EXIT_CODE)${NC}"
    echo ""
    echo -e "${YELLOW}Debugging:${NC}"
    echo -e "  • View report: npx playwright show-report"
    echo -e "  • Run in UI mode: npx playwright test --ui"
    echo -e "  • Run specific test: npx playwright test tests/e2e/portfolio.spec.js"
    echo ""
    exit $TEST_EXIT_CODE
fi
