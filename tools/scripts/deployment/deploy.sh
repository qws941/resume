#!/bin/bash
# Quick Deploy Script for Resume

set -e

cd ~/apps/resume

echo "🚀 Resume 배포 스크립트"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 환경변수 로드
export CLOUDFLARE_API_TOKEN=$(grep CLOUDFLARE_API_TOKEN ~/.env | cut -d= -f2)
export CLOUDFLARE_ACCOUNT_ID=$(grep CLOUDFLARE_ACCOUNT_ID ~/.env | cut -d= -f2)

# 빌드
echo "📦 빌드 중..."
npm run build
echo ""

# 배포
echo "🌐 Cloudflare Workers에 배포 중..."
npx wrangler deploy web/worker.js --name resume --env=""
echo ""

# 확인
echo "✅ 배포 완료!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 URLs:"
echo "  Production: https://resume.jclee.me"
echo "  Workers: https://resume.jclee.workers.dev"
echo ""
echo "📊 배포 이력 확인:"
echo "  npx wrangler deployments list --name resume"
echo ""
