# Anti-Patterns and Gotchas Reference

**Last Updated**: 2026-01-26  
**Commit**: ac7fa266  
**Branch**: master

## Purpose

This document catalogs **forbidden patterns**, **deprecated practices**, and **common pitfalls** discovered in the resume project codebase. These rules prevent breaking changes and security issues.

---

## 🔴 CRITICAL (Will Break Production)

### 1. NEVER Edit Generated Artifacts

**Affected Files**:
- `typescript/portfolio-worker/worker.js` (deployable Cloudflare Worker)

**Rule**: This file is **auto-generated** from `index.html` by `generate-worker.js`. Manual edits are **lost on next build**.

**Why It Breaks**:
```bash
# ❌ WRONG WORKFLOW
vim typescript/portfolio-worker/worker.js  # Manual edit
npm run deploy                              # Deploys manual changes
# ... later ...
npm run build                               # OVERWRITES manual changes!
```

**Correct Workflow**:
```bash
# ✅ CORRECT
vim typescript/portfolio-worker/index.html  # Edit source HTML
npm run build                               # Regenerate worker.js
npm run deploy                              # Deploy generated artifact
```

**References**:
- `typescript/portfolio-worker/AGENTS.md:19`
- `docs/guides/QUICK_START.md:29`

---

### 2. NEVER Trim Before CSP Hash Calculation

**Affected Files**:
- `typescript/portfolio-worker/lib/templates.js:41,54`
- `typescript/portfolio-worker/generate-worker.js:109`

**Rule**: Do NOT use `.trim()` on extracted inline scripts/styles before calculating SHA-256 hashes for Content Security Policy (CSP).

**Why It Breaks**:

Browsers calculate CSP hashes from the **exact** script/style content including all whitespace. Using `.trim()` before hashing causes CSP violations:

```javascript
// ❌ WRONG - Causes CSP violation
const scriptContent = scriptMatch[1].trim();
const hash = generateHash(scriptContent);  // Hash doesn't match browser's hash

// ✅ CORRECT - Preserves exact whitespace
const scriptContent = scriptMatch[1];  // NO TRIM!
const hash = generateHash(scriptContent);
```

**Error You'll See**:
```
Refused to execute inline script because it violates the following 
Content Security Policy directive: "script-src 'sha256-abc123...'"
```

**Technical Details**:

The browser calculates:
```javascript
SHA256("<script>\n  console.log('hello');\n</script>")
```

If you trim, your hash is from:
```javascript
SHA256("console.log('hello');")  // Different hash!
```

**References**:
- `docs/guides/ARCHITECTURE.md:76`
- `typescript/portfolio-worker/lib/templates.js:41,54`

---

### 3. NEVER Use Naked Playwright/Puppeteer

**Affected Files**:
- `typescript/job-automation/src/crawlers/*`

**Rule**: Always use `BaseCrawler` class instead of direct `chromium.launch()` or `puppeteer.launch()`.

**Why It Breaks**:

Job sites (Wanted, Saramin, JobKorea) have **bot detection**. Direct browser launch is immediately flagged:

```javascript
// ❌ WRONG - Detected as bot
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://www.wanted.co.kr/');
// → Blocked by Cloudflare/DataDome

// ✅ CORRECT - Uses stealth mode
class WantedCrawler extends BaseCrawler {
  async crawl() {
    await this.page.goto('https://www.wanted.co.kr/');
    // → Bypasses detection with stealth patches
  }
}
```

**What BaseCrawler Provides**:
- User-Agent rotation
- Fingerprint randomization
- `playwright-stealth` plugin
- Cookie persistence via `SessionManager`

**References**:
- `typescript/job-automation/src/crawlers/AGENTS.md:44`
- `typescript/job-automation/src/AGENTS.md:92`

---

### 4. NEVER Cross Client Boundaries

**Affected Files**:
- `typescript/job-automation/src/shared/clients/*`

**Rule**: Each client (`wanted/`, `saramin/`, `jobkorea/`) is **isolated**. Do NOT import across client directories.

**Why It Breaks**:

Creates circular dependencies and violates separation of concerns:

```javascript
// ❌ WRONG - Violates isolation
// File: typescript/job-automation/src/shared/clients/wanted/api.js
import { saraminLogin } from '../saramin/auth.js';  // Cross-boundary import

// ✅ CORRECT - Use shared services
// File: typescript/job-automation/src/shared/clients/wanted/api.js
import { SessionManager } from '../../services/session/index.js';
```

**Architecture**:
```
clients/
├── wanted/       # Isolated - only imports from shared/services/
├── saramin/      # Isolated - only imports from shared/services/
├── jobkorea/     # Isolated - only imports from shared/services/
└── secrets/      # Isolated - credential storage only
```

**References**:
- `typescript/job-automation/src/shared/clients/AGENTS.md:35-36`

---

### 5. NEVER Store Credentials in Client Code

**Affected Files**:
- `typescript/job-automation/src/shared/clients/secrets/*`

**Rule**: Credentials (cookies, tokens, API keys) MUST go in `secrets/` directory, never in client implementation files.

**Why It Breaks**:

Security risk + merge conflicts + accidental commits:

```javascript
// ❌ WRONG - Credentials in code
// File: typescript/job-automation/src/shared/clients/wanted/api.js
const cookies = [
  { name: '_wts', value: 'abc123...' }  // SECURITY RISK!
];

// ✅ CORRECT - Use SessionManager
// File: typescript/job-automation/src/shared/clients/wanted/api.js
import { SessionManager } from '../../services/session/index.js';

const session = await SessionManager.load('wanted');
const cookies = session.cookies;
```

**References**:
- `typescript/job-automation/src/shared/clients/AGENTS.md:36`
- `typescript/job-automation/src/AGENTS.md:93`

---

### 6. NEVER Hardcode API Keys in `.env`

**Affected Files**:
- `.env` (tracked in git)
- `.env.local` (gitignored)

**Rule**: Cloudflare API tokens and other secrets go in `.env.local`, NEVER in `.env`.

**Why It Breaks**:

`.env` is committed to git → secrets leaked to repository:

```bash
# ❌ WRONG - Tracked in git
echo "CLOUDFLARE_API_TOKEN=abc123..." >> .env
git add .env
git commit -m "Add API token"  # 🚨 SECRET LEAKED!

# ✅ CORRECT - Gitignored
echo "CLOUDFLARE_API_TOKEN=abc123..." >> .env.local
# .env.local is in .gitignore → safe
```

**References**:
- `SECURITY_WARNING.md:27`

---

## 🟡 WARNING (Will Cause Issues)

### 7. NEVER Instantiate Services Directly in Routes

**Affected Files**:
- `typescript/job-automation/src/server/routes/*`

**Rule**: Use Fastify decorators for services, never `new Service()` in route handlers.

**Why It Breaks**:

Breaks dependency injection and makes testing impossible:

```javascript
// ❌ WRONG - Direct instantiation
// File: typescript/job-automation/src/server/routes/jobs.js
fastify.get('/jobs', async (request, reply) => {
  const jobService = new JobService();  // New instance every request!
  return jobService.getJobs();
});

// ✅ CORRECT - Use decorated service
// File: typescript/job-automation/src/server/routes/jobs.js
fastify.get('/jobs', async (request, reply) => {
  return request.server.jobService.getJobs();  // Shared instance
});
```

**Setup** (in server initialization):
```javascript
// File: typescript/job-automation/src/server/index.js
fastify.decorate('jobService', new JobService());
```

**References**:
- `typescript/job-automation/src/server/routes/AGENTS.md:44`

---

### 8. NEVER Hardcode Paths in Build Scripts

**Affected Files**:
- `tools/scripts/build/*`

**Rule**: Use relative paths from project root, never absolute paths.

**Why It Breaks**:

Breaks on CI/CD and other developers' machines:

```bash
# ❌ WRONG - Absolute path
#!/bin/bash
cd /home/jclee/dev/resume/typescript/portfolio-worker
npm run build

# ✅ CORRECT - Relative from project root
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
cd "$PROJECT_ROOT/typescript/portfolio-worker"
npm run build
```

**References**:
- `tools/scripts/build/AGENTS.md:45`

---

### 9. NEVER Skip Data Sync After Resume Changes

**Affected Files**:
- `typescript/data/resumes/master/resume_data.json`

**Rule**: After editing `resume_data.json`, always run `npm run sync:data` before building applications.

**Why It Breaks**:

Applications use **copied** resume data. Skipping sync means stale data in production:

```bash
# ❌ WRONG - Stale data deployed
vim typescript/data/resumes/master/resume_data.json
npm run build:all  # Uses OLD data!
npm run deploy

# ✅ CORRECT - Fresh data deployed
vim typescript/data/resumes/master/resume_data.json
npm run sync:data  # Copies to all apps
npm run build:all
npm run deploy
```

**What `sync:data` Does**:
```bash
# Copies master resume to all consumers
cp typescript/data/resumes/master/resume_data.json \
   typescript/portfolio-worker/data/resume.json

cp typescript/data/resumes/master/resume_data.json \
   typescript/cli/data/resume.json
```

**References**:
- `typescript/data/AGENTS.md:19`

---

## 🟢 BEST PRACTICES

### 10. ALWAYS Use Bazel for Affected Target Analysis

**Affected Files**:
- `BUILD.bazel` (all packages)

**Rule**: Before testing/deploying, use Bazel to find affected targets:

```bash
# Find all affected targets from changes
git diff --name-only origin/master...HEAD | \
  xargs bazel query "rdeps(//..., set($changed_files))"

# Or use CI script
./tools/ci/affected.sh origin/master
```

**Why**:
- Saves time by running only affected tests
- Prevents missing downstream impacts

**References**:
- `.bazelrc`
- `MODULE.bazel`

---

### 11. ALWAYS Get OWNERS Approval Before Merging

**Affected Files**:
- `OWNERS` (all packages)

**Rule**: Changes require approval from at least 1 OWNERS member of the affected directory.

**Why**:
- Prevents breaking changes
- Enforces code review standards
- Maintains architectural consistency

**How to Check**:
```bash
# Find OWNERS for changed files
git diff --name-only origin/master...HEAD | while read file; do
  dir=$(dirname "$file")
  while [ "$dir" != "." ]; do
    if [ -f "$dir/OWNERS" ]; then
      echo "$file → $dir/OWNERS"
      break
    fi
    dir=$(dirname "$dir")
  done
done
```

**References**:
- `OWNERS` (root and package-level)

---

## 🔍 VERIFICATION CHECKLIST

Before deploying changes, verify:

- [ ] No manual edits to `typescript/portfolio-worker/worker.js`
- [ ] Resume data changes synced with `npm run sync:data`
- [ ] No `.trim()` calls before CSP hash calculations
- [ ] All new crawlers extend `BaseCrawler`
- [ ] No cross-client imports in `typescript/job-automation/src/shared/clients/`
- [ ] Secrets in `.env.local`, not `.env`
- [ ] Build scripts use relative paths
- [ ] Affected Bazel targets tested
- [ ] OWNERS approval obtained

---

## 📚 RELATED DOCUMENTATION

- **Architecture**: `docs/guides/ARCHITECTURE.md`
- **Quick Start**: `docs/guides/QUICK_START.md`
- **Security**: `SECURITY_WARNING.md`
- **Project Structure**: `AGENTS.md` (root and package-level)

---

## 🐛 KNOWN ISSUES

### Issue: SessionStorage Admin Token (Security Risk)

**Status**: Open  
**Location**: `typescript/portfolio-worker/worker.js` (inferred from session notes)

**Problem**: Admin tokens stored in sessionStorage are vulnerable to XSS attacks.

**Fix Required**: Migrate to HttpOnly cookies.

**Tracking**: TODO - Create separate issue document

---

## 📝 CONTRIBUTING

Found a new anti-pattern? Add it to this document:

1. Categorize by severity (🔴 CRITICAL / 🟡 WARNING / 🟢 BEST PRACTICE)
2. Include affected files
3. Show ❌ WRONG and ✅ CORRECT examples
4. Explain why it breaks
5. Add references to source files

---

**Maintainer**: JC Lee  
**Last Review**: 2026-01-26
