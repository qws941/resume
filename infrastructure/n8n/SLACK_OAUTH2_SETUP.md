# Slack OAuth2 Credential Setup Guide

n8n에서 Slack OAuth2 credential을 설정하는 방법입니다.

## Prerequisites

- n8n 인스턴스 접근 권한 (https://n8n.jclee.me)
- Slack workspace 관리자 권한

## Step 1: Slack App 생성

1. https://api.slack.com/apps 접속
2. "Create New App" 클릭
3. "From scratch" 선택
4. App 정보 입력:
   - App Name: `n8n Health Monitor`
   - Workspace: 알림을 받을 workspace 선택

## Step 2: OAuth & Permissions 설정

1. 왼쪽 메뉴에서 "OAuth & Permissions" 클릭
2. **Redirect URLs** 섹션:
   - "Add New Redirect URL" 클릭
   - 입력: `https://n8n.jclee.me/rest/oauth2-credential/callback`
   - "Save URLs" 클릭

3. **Bot Token Scopes** 섹션에서 다음 권한 추가:
   - `chat:write` - 메시지 전송
   - `chat:write.public` - 공개 채널에 메시지 전송
   - `channels:read` - 채널 목록 조회

## Step 3: App 설치 및 토큰 발급

1. 페이지 상단 "Install to Workspace" 클릭
2. 권한 승인
3. **OAuth Tokens for Your Workspace** 섹션에서:
   - **Bot User OAuth Token** 복사 (xoxb-로 시작)

## Step 4: n8n에서 Credential 등록

1. n8n 접속: https://n8n.jclee.me
2. 우측 상단 Settings (⚙️) → Credentials
3. "Add Credential" 클릭
4. "Slack OAuth2 API" 검색 및 선택
5. 정보 입력:
   - **Credential Name**: `Slack OAuth2 API` (워크플로우에서 참조하는 이름)
   - **OAuth2 Auth URL**: `https://slack.com/oauth/v2/authorize`
   - **OAuth2 Access Token URL**: `https://slack.com/api/oauth.v2.access`
   - **Client ID**: Slack App "Basic Information"에서 확인
   - **Client Secret**: Slack App "Basic Information"에서 확인
   - **Scope**: `chat:write,chat:write.public,channels:read`

6. "Connect my account" 클릭
7. Slack 인증 화면에서 "Allow" 클릭
8. "Save" 클릭

## Step 5: 워크플로우에서 사용

워크플로우의 Slack 노드 설정:

```json
{
  "credentials": {
    "slackOAuth2Api": {
      "id": "1",
      "name": "Slack OAuth2 API"
    }
  }
}
```

**참고**: `id`와 `name`은 n8n에서 등록한 credential과 일치해야 합니다.

## Verification

1. n8n에서 워크플로우 활성화
2. "Execute Workflow" 클릭하여 수동 실행
3. Slack 채널에서 알림 메시지 확인

## Troubleshooting

### Error: "Invalid credentials"
- n8n credential ID/name이 워크플로우와 일치하는지 확인
- Slack App이 올바른 workspace에 설치되었는지 확인

### Error: "Missing scopes"
- Slack App의 Bot Token Scopes에 필요한 권한이 모두 추가되었는지 확인
- 권한 추가 후 App을 재설치해야 할 수 있음

### Error: "Channel not found"
- 채널 이름이 `#`으로 시작하는지 확인 (예: `#monitoring`)
- Bot이 해당 채널에 초대되었는지 확인: `/invite @n8n Health Monitor`

## Security Best Practices

1. **최소 권한 원칙**: 필요한 scope만 추가
2. **토큰 관리**: OAuth2 토큰은 n8n credential에만 저장, 코드에 하드코딩 금지
3. **접근 제한**: Slack App은 필요한 채널에만 접근 허용
4. **정기 검토**: 분기별 App 권한 및 사용 현황 검토

## References

- [Slack API Documentation](https://api.slack.com/)
- [n8n Slack Node Documentation](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/)
- [OAuth 2.0 Best Practices](https://oauth.net/2/)
