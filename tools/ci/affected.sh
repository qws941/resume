#!/bin/bash
# =============================================================================
# AFFECTED TARGETS ANALYSIS — Dual-Mode
# =============================================================================
# Determines which build targets are affected by recent changes.
#
# Two execution modes:
#   CI MODE    — Path-based heuristic analysis (Bazel not installed in CI)
#                Maps changed file paths to workspace targets.
#   LOCAL MODE — Full Bazel reverse-dependency query (bazel rdeps).
#                Precise but requires a working Bazel installation.
#
# Usage: ./tools/ci/affected.sh [base_branch]

set -euo pipefail

BASE_BRANCH="${1:-origin/master}"
OUTPUT_DIR="${2:-.affected}"

echo "=== Affected Target Analysis ==="
echo "Base: $BASE_BRANCH"
echo "Head: HEAD"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Get changed files
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH"...HEAD 2>/dev/null || git diff --name-only "$BASE_BRANCH" HEAD)

if [ -z "$CHANGED_FILES" ]; then
    echo "No changes detected"
    # Output object format for CI parsing (not array)
    cat > "$OUTPUT_DIR/affected_targets.json" <<EOF
{
  "base_branch": "$BASE_BRANCH",
  "changed_files_count": 0,
  "portfolio": false,
  "job_dashboard": false,
  "data": false,
  "infra": false,
  "cli": false,
  "affected_targets_count": 0,
  "has_build_changes": false
}
EOF
    exit 0
fi

echo "=== Changed Files ==="
echo "$CHANGED_FILES" | head -20 || true
TOTAL_CHANGED=$(echo "$CHANGED_FILES" | wc -l)
[ "$TOTAL_CHANGED" -gt 20 ] && echo "... and $((TOTAL_CHANGED - 20)) more"
echo ""

# Save changed files
echo "$CHANGED_FILES" > "$OUTPUT_DIR/changed_files.txt"

# Check for BUILD file changes (triggers full package rebuild)
BUILD_CHANGES=$(echo "$CHANGED_FILES" | grep -E "BUILD(.bazel)?$" || true)
if [ -n "$BUILD_CHANGES" ]; then
    echo "=== BUILD File Changes (Full Package Rebuild) ==="
    echo "$BUILD_CHANGES"
    echo ""
fi

# --- CI MODE ---
# Check if Bazel is available
if ! command -v bazel &> /dev/null; then
    echo "Bazel not found, using path-based analysis"
    
    # Fallback: path-based analysis
    AFFECTED_PATHS=""
    
    if echo "$CHANGED_FILES" | grep -qE "^typescript/portfolio-worker/"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //typescript/portfolio-worker:all"
    fi
    
    if echo "$CHANGED_FILES" | grep -qE "^typescript/job-automation/"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //typescript/job-automation:all"
    fi
    
    if echo "$CHANGED_FILES" | grep -qE "^typescript/data/"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //typescript/data:all //typescript/portfolio-worker:all"
    fi
    
    if echo "$CHANGED_FILES" | grep -qE "^typescript/cli/"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //typescript/cli:all"
    fi
    
    if echo "$CHANGED_FILES" | grep -qE "^tools/"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //tools:all"
    fi
    
    if echo "$CHANGED_FILES" | grep -qE "^(package\.json|package-lock\.json)$"; then
        AFFECTED_PATHS="$AFFECTED_PATHS //..."
    fi
    
    echo "=== Affected Targets (Path-based) ==="
    echo "$AFFECTED_PATHS" | tr ' ' '\n' | sort -u | grep -v '^$'
    echo "$AFFECTED_PATHS" | tr ' ' '\n' | sort -u | grep -v '^$' > "$OUTPUT_DIR/affected_targets.txt"
    
    # Generate JSON output with boolean flags for CI
    PORTFOLIO=$(echo "$CHANGED_FILES" | grep -qE "^typescript/portfolio-worker/|^typescript/data/" && echo "true" || echo "false")
    JOB_DASHBOARD=$(echo "$CHANGED_FILES" | grep -qE "^typescript/job-automation/" && echo "true" || echo "false")
    DATA=$(echo "$CHANGED_FILES" | grep -qE "^typescript/data/" && echo "true" || echo "false")
    INFRA=$(echo "$CHANGED_FILES" | grep -qE "^infrastructure/" && echo "true" || echo "false")
    CLI=$(echo "$CHANGED_FILES" | grep -qE "^typescript/cli/" && echo "true" || echo "false")
    AFFECTED_COUNT=$(echo "$AFFECTED_PATHS" | tr ' ' '\n' | grep -v '^$' | sort -u | wc -l)
    
    cat > "$OUTPUT_DIR/affected_targets.json" <<EOF
{
  "base_branch": "$BASE_BRANCH",
  "changed_files_count": $(echo "$CHANGED_FILES" | wc -l),
  "portfolio": $PORTFOLIO,
  "job_dashboard": $JOB_DASHBOARD,
  "data": $DATA,
  "infra": $INFRA,
  "cli": $CLI,
  "affected_targets_count": $AFFECTED_COUNT,
  "has_build_changes": $([ -n "$BUILD_CHANGES" ] && echo "true" || echo "false")
}
EOF
    
    exit 0
fi

# --- LOCAL MODE ---
# Bazel query for affected targets
echo "=== Running Bazel Query ==="

# Convert file list to query format
FILE_SET=$(echo "$CHANGED_FILES" | tr '\n' ' ')

# Find all affected targets (reverse dependencies)
bazel query "rdeps(//..., set($FILE_SET))" \
    --output=label \
    --keep_going 2>/dev/null > "$OUTPUT_DIR/all_affected.txt" || true

# Filter build targets only (exclude tests)
grep -v "_test$" "$OUTPUT_DIR/all_affected.txt" > "$OUTPUT_DIR/build_targets.txt" 2>/dev/null || true

# Filter test targets only
grep "_test$" "$OUTPUT_DIR/all_affected.txt" > "$OUTPUT_DIR/test_targets.txt" 2>/dev/null || true

echo ""
echo "=== Summary ==="
echo "Changed files: $(echo "$CHANGED_FILES" | wc -l)"
echo "Affected targets: $(wc -l < "$OUTPUT_DIR/all_affected.txt" 2>/dev/null || echo 0)"
echo "Build targets: $(wc -l < "$OUTPUT_DIR/build_targets.txt" 2>/dev/null || echo 0)"
echo "Test targets: $(wc -l < "$OUTPUT_DIR/test_targets.txt" 2>/dev/null || echo 0)"
echo ""
echo "Output saved to: $OUTPUT_DIR/"

PORTFOLIO=$(echo "$CHANGED_FILES" | grep -qE "^typescript/portfolio-worker/|^typescript/data/" && echo "true" || echo "false")
JOB_DASHBOARD=$(echo "$CHANGED_FILES" | grep -qE "^typescript/job-automation/" && echo "true" || echo "false")
DATA=$(echo "$CHANGED_FILES" | grep -qE "^typescript/data/" && echo "true" || echo "false")
INFRA=$(echo "$CHANGED_FILES" | grep -qE "^infrastructure/" && echo "true" || echo "false")
CLI=$(echo "$CHANGED_FILES" | grep -qE "^typescript/cli/" && echo "true" || echo "false")

cat > "$OUTPUT_DIR/affected_targets.json" << EOF
{
  "base_branch": "$BASE_BRANCH",
  "changed_files_count": $(echo "$CHANGED_FILES" | wc -l),
  "portfolio": $PORTFOLIO,
  "job_dashboard": $JOB_DASHBOARD,
  "data": $DATA,
  "infra": $INFRA,
  "cli": $CLI,
  "affected_targets_count": $(wc -l < "$OUTPUT_DIR/all_affected.txt" 2>/dev/null || echo 0),
  "has_build_changes": $([ -n "$BUILD_CHANGES" ] && echo "true" || echo "false"),
  "outputs": {
    "changed_files": "$OUTPUT_DIR/changed_files.txt",
    "all_affected": "$OUTPUT_DIR/all_affected.txt",
    "build_targets": "$OUTPUT_DIR/build_targets.txt",
    "test_targets": "$OUTPUT_DIR/test_targets.txt"
  }
}
EOF

echo "Analysis complete"
