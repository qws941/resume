#!/bin/bash
# Resume Portfolio - Quick Deploy Script
# One-command deployment with all checks

set -euo pipefail

PROJECT_ROOT="/home/jclee/applications/resume"
cd "$PROJECT_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Resume Portfolio - Quick Deploy      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if CLOUDFLARE_API_TOKEN is set
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    echo -e "${RED}✗ CLOUDFLARE_API_TOKEN not set${NC}"
    echo ""
    echo -e "${YELLOW}Quick Setup Options:${NC}"
    echo ""
    echo -e "Option 1: Set environment variable"
    echo -e "  export CLOUDFLARE_API_TOKEN=your_token_here"
    echo -e "  $0"
    echo ""
    echo -e "Option 2: Interactive login (opens browser)"
    echo -e "  cd web && npx wrangler login"
    echo ""
    echo -e "Option 3: Get token from Cloudflare Dashboard"
    echo -e "  1. https://dash.cloudflare.com/"
    echo -e "  2. My Profile → API Tokens → Create Token"
    echo -e "  3. Use 'Edit Cloudflare Workers' template"
    echo ""
    echo -e "${BLUE}→ See full guide: docs/MANUAL_DEPLOYMENT_GUIDE.md${NC}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ CLOUDFLARE_API_TOKEN configured${NC}"
echo ""

# Run deployment helper
if ./scripts/deploy-helper.sh; then
    echo -e "${GREEN}✓ Deployment completed${NC}"
    echo ""

    # Run verification
    echo -e "${BLUE}Running deployment verification...${NC}"
    echo ""
    ./scripts/verify-deployment.sh
else
    echo -e "${RED}✗ Deployment failed${NC}"
    echo -e "${YELLOW}→ Check logs: ~/.config/.wrangler/logs/${NC}"
    echo -e "${YELLOW}→ See troubleshooting: docs/MANUAL_DEPLOYMENT_GUIDE.md${NC}"
    exit 1
fi
