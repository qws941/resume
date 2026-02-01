# Cloudflare API Token 설정 가이드

**현재 상황**: Infisical에 API Key만 있고, Wrangler는 API Token 필요

---

## 🔐 API Token vs API Key

| 방식 | 변수명 | 권한 | 사용처 |
|------|--------|------|--------|
| **API Token** | `CLOUDFLARE_API_TOKEN` | 세밀한 권한 제어 | Wrangler (권장) |
| **API Key** | `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` | 전체 권한 | Legacy |

---

## ✅ 해결 방법 (3가지)

### Option 1: Wrangler Login (가장 간단)
```bash
cd ~/apps/resume
npx wrangler login
# → 브라우저에서 Cloudflare 로그인
# → OAuth 토큰 자동 저장 (~/.wrangler/config/)
```

**장점**: 자동 인증, 안전  
**단점**: 브라우저 필요, CI/CD에서 사용 불가

---

### Option 2: API Token 생성 (권장)

**1단계: Cloudflare Dashboard 접속**
```
https://dash.cloudflare.com/profile/api-tokens
```

**2단계: Create Token**
- Template: "Edit Cloudflare Workers" 선택
- Permissions:
  - Account / Workers Scripts / Edit
  - Account / Workers KV Storage / Edit
  - Account / Account Settings / Read
- Account Resources: Include / <your-account>
- Zone Resources: All zones

**3단계: Copy Token**
```bash
# 생성된 토큰을 ~/.env에 추가
echo "CLOUDFLARE_API_TOKEN=<your-token>" >> ~/.env

# Infisical에도 추가 (선택사항)
openctl infisical set CLOUDFLARE_API_TOKEN "<your-token>"
```

**4단계: 테스트**
```bash
cd ~/apps/resume
npx wrangler whoami
# → 성공하면 계정 정보 표시
```

---

### Option 3: API Key 사용 (비권장)

**현재 설정 활용**:
```bash
# Infisical에 이미 있는 API Key 사용
export CLOUDFLARE_API_KEY=$(grep CLOUDFLARE_API_KEY /home/jclee/infra/infisical/agent-output/infisical-secrets.env | cut -d= -f2)
export CLOUDFLARE_EMAIL="your-email@example.com"

# wrangler.toml에 추가
# [env.production]
# account_id = "a8d9c67f586acdd15eebcc65ca3aa5bb"
```

**장점**: 기존 설정 활용  
**단점**: 보안상 비권장, 전체 권한

---

## 🚀 권장 플로우

1. **즉시**: `wrangler login` (수동 배포용)
2. **장기**: API Token 생성 → Infisical 저장 (CI/CD용)

---

## 📝 참고 링크

- API Token 생성: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
- Wrangler 인증: https://developers.cloudflare.com/workers/wrangler/commands/#login
- Workers 배포: https://developers.cloudflare.com/workers/wrangler/commands/#deploy

---

**Next Step**: `npx wrangler login` 실행
