#!/bin/bash
#
# n8n API Key Setup Helper
#

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== n8n API Key Setup ===${NC}\n"

echo "1. 브라우저에서 n8n 설정 페이지를 엽니다:"
echo -e "${YELLOW}   https://n8n.jclee.me/settings/api${NC}\n"

echo "2. 'Create new API key' 버튼 클릭"
echo "3. API 키 복사 (한 번만 표시됨!)\n"

read -p "API 키를 발급받으셨나요? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "API 키를 먼저 발급받아주세요."
    exit 0
fi

echo ""
read -p "API 키를 입력하세요: " api_key

if [[ -z "$api_key" ]]; then
    echo "API 키가 입력되지 않았습니다."
    exit 1
fi

# Add to ~/.env
ENV_FILE="$HOME/.env"

if ! grep -q "^N8N_API_KEY=" "$ENV_FILE" 2>/dev/null; then
    echo "" >> "$ENV_FILE"
    echo "# n8n API Configuration (added $(date))" >> "$ENV_FILE"
    echo "N8N_API_KEY=\"$api_key\"" >> "$ENV_FILE"
    echo "N8N_URL=\"https://n8n.jclee.me\"" >> "$ENV_FILE"
    echo -e "\n${GREEN}✓ ~/.env에 API 키가 추가되었습니다.${NC}"
else
    # Update existing
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|^N8N_API_KEY=.*|N8N_API_KEY=\"$api_key\"|" "$ENV_FILE"
    else
        sed -i "s|^N8N_API_KEY=.*|N8N_API_KEY=\"$api_key\"|" "$ENV_FILE"
    fi
    echo -e "\n${GREEN}✓ ~/.env의 API 키가 업데이트되었습니다.${NC}"
fi

# Test connection
echo -e "\n${GREEN}API 연결 테스트 중...${NC}"
source "$ENV_FILE"

response=$(curl -s -w "\n%{http_code}" \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    "$N8N_URL/api/v1/workflows" 2>/dev/null || echo "000")

http_code=$(echo "$response" | tail -n1)

if [[ "$http_code" == "200" ]]; then
    echo -e "${GREEN}✓ 연결 성공!${NC}\n"
    echo "이제 워크플로우를 배포할 수 있습니다:"
    echo -e "${YELLOW}  ./n8n/deploy-workflow.sh${NC}"
else
    echo -e "\n❌ 연결 실패 (HTTP $http_code)"
    echo "API 키를 다시 확인해주세요."
    exit 1
fi
