# GitLab CI/CD Variables Guide

## Required Variables

Configure these in **GitLab → Settings → CI/CD → Variables**:

| Variable                | Type     | Protected | Masked | Description                                   |
| ----------------------- | -------- | --------- | ------ | --------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Variable | Yes       | Yes    | Cloudflare API token with Workers permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Variable | Yes       | No     | Cloudflare account ID                         |

## Optional Variables

| Variable           | Type     | Default | Description                     |
| ------------------ | -------- | ------- | ------------------------------- |
| `N8N_WEBHOOK_URL`  | Variable | -       | Deployment notification webhook |
| `AUTH_SYNC_SECRET` | Variable | -       | Job platform auth sync secret   |
| `ENCRYPTION_KEY`   | Variable | -       | Session encryption key          |

## Cloudflare API Token Permissions

Create a token at [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) with:

```
Account - Cloudflare Pages: Edit
Account - Workers Scripts: Edit
Account - Workers KV Storage: Edit
Account - D1: Edit
Zone - Workers Routes: Edit
Zone - DNS: Edit (optional)
```

## Environment-Specific Variables

For staging/production separation:

| Variable               | Scope      | Description                 |
| ---------------------- | ---------- | --------------------------- |
| `CLOUDFLARE_API_TOKEN` | production | Production deployments only |
| `CLOUDFLARE_API_TOKEN` | staging    | Staging deployments only    |

## Scheduled Pipeline Variables

For `auth:refresh:sessions` job (maintenance stage):

```yaml
# GitLab → CI/CD → Schedules
# Create new schedule: "Auth Session Refresh"
# Interval: 0 3 */5 * *  (Every 5 days at 3 AM)
# Target branch: master
# Variables: (none required, uses CI vars)
```

## How to Add Variables

### Via GitLab UI

1. Go to **Settings → CI/CD → Variables**
2. Click **Add variable**
3. Enter key/value
4. Check **Protect variable** for production secrets
5. Check **Mask variable** for sensitive values
6. Click **Add variable**

### Via GitLab API

```bash
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --form "key=CLOUDFLARE_API_TOKEN" \
  --form "value=<your_token>" \
  --form "protected=true" \
  --form "masked=true" \
  "https://gitlab.jclee.me/api/v4/projects/1/variables"
```

## Verification

Check if variables are set correctly:

```bash
# In a CI job, variables are available as environment variables
echo "CLOUDFLARE_ACCOUNT_ID is set: ${CLOUDFLARE_ACCOUNT_ID:+yes}"
echo "N8N_WEBHOOK_URL is set: ${N8N_WEBHOOK_URL:+yes}"
```

## Pipeline Triggers

### Manual Trigger with Variables

```bash
curl --request POST \
  --form "token=<trigger_token>" \
  --form "ref=master" \
  --form "variables[DEPLOY_ENV]=staging" \
  "https://gitlab.jclee.me/api/v4/projects/1/trigger/pipeline"
```

### Web UI Manual Trigger

1. Go to **CI/CD → Pipelines**
2. Click **Run pipeline**
3. Select branch
4. Add variables if needed
5. Click **Run pipeline**

## Troubleshooting

### Variable Not Found

- Check variable scope (All, Protected, or Specific environment)
- Check if branch is protected (for Protected variables)
- Verify variable name matches exactly (case-sensitive)

### Masked Variable Truncated

- Masked variables must be at least 8 characters
- Cannot contain newlines
- Check if value was properly encoded

### SAST/Security Scanning Issues

If GitLab SAST fails with "template not found":

- Ensure GitLab version supports SAST templates
- Check if `Security/SAST.gitlab-ci.yml` is available
- Remove template includes if using GitLab CE without security features
