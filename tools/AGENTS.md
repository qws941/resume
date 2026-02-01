# TOOLS KNOWLEDGE BASE

**Generated:** 2026-02-01
**Commit:** 0b3bac8
**Reason:** Build/CI orchestration hub

## OVERVIEW

Build tooling, CI/CD automation, and Bazel wrapper scripts.
Coordinates npm execution through Bazel's query-based change detection.

## STRUCTURE

```
tools/
├── ci/                  # CI/CD utilities
│   └── affected.sh      # Change impact analysis
└── scripts/             # Automation suite (see scripts/AGENTS.md)
    ├── bazel/           # Bazel → npm wrappers
    ├── build/           # Content generation (PDF, PPTX, icons)
    ├── deployment/      # Cloudflare shipping
    ├── monitoring/      # Production observability
    ├── setup/           # Infrastructure bootstrap
    ├── utils/           # Data sync, versioning
    └── verification/    # Post-deploy health checks
```

## WHERE TO LOOK

| Task                 | Location                                    | Notes                              |
| -------------------- | ------------------------------------------- | ---------------------------------- |
| **Affected Targets** | `ci/affected.sh`                            | Bazel query or path-based fallback |
| **Build All**        | `scripts/bazel/build.sh`                    | Thin wrapper → `npm run build`     |
| **Deploy Portfolio** | `scripts/bazel/deploy_portfolio.sh`         | Cloudflare Workers deploy          |
| **Quick Deploy**     | `scripts/deployment/quick-deploy.sh`        | Atomic test+build+deploy+verify    |
| **Verify Deploy**    | `scripts/verification/verify-deployment.sh` | 7-check health suite               |

## BAZEL INTEGRATION

Bazel serves as **coordination layer**, not build system:

```bash
# Bazel targets delegate to npm
bazel build //tools:build    # → npm run build
bazel build //tools:test     # → npm test
bazel build //tools:deploy   # → wrangler deploy
```

**Why this pattern:**

- Bazel query for affected-target analysis
- npm for actual build execution
- Best of both: queryability + ecosystem compatibility

## CONVENTIONS

- **Root execution**: All scripts assume `pwd` is project root
- **Robust bash**: `set -euo pipefail` mandatory
- **Idempotent**: Safe to re-run (check before create)
- **No hardcoded paths**: Use `$(dirname "$0")` or env vars

## ANTI-PATTERNS

| Anti-Pattern        | Why                  | Do Instead                      |
| ------------------- | -------------------- | ------------------------------- |
| Direct Bazel builds | Bazel wraps npm here | Use npm scripts directly        |
| Skip verification   | Silent failures      | Always run verify-deployment    |
| Hardcoded secrets   | Security risk        | Use `.env` or `wrangler secret` |
| Absolute paths      | Breaks portability   | Use relative paths              |

## COMMANDS

```bash
# CI: Analyze changes
./tools/ci/affected.sh origin/master

# Build
./tools/scripts/bazel/build.sh

# Deploy (recommended)
./tools/scripts/deployment/quick-deploy.sh

# Verify only
./tools/scripts/verification/verify-deployment.sh
```
