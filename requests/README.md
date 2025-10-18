# Requests Directory

This directory tracks user requests and feature implementations for the Resume project.

## Directory Structure

- **active/** - Currently being worked on
- **completed/** - Successfully implemented requests
- **backlog/** - Planned but not yet started
- **archive/** - Historical requests (>7 days after completion)

## Request Format

Each request file follows the naming convention: `{YYYYMMDD}-{seq}-{brief-description}.md`

### Template

```markdown
# Request: [Title]
**ID**: {YYYYMMDD}-{seq}
**Status**: [backlog|active|completed|archived]
**Priority**: [P0-critical|P1-high|P2-medium|P3-low]
**Category**: [feature|bug|improvement|question|research]

## User Request (Original)
[Exact message, preserve Korean if applicable]

## Implementation Plan
- [ ] Task 1
- [ ] Task 2

## Result
[What was delivered]
```

## Lifecycle

1. **New request** → Create in `backlog/`
2. **Start work** → Move to `active/`
3. **Complete** → Move to `completed/`
4. **After 7 days** → Archive important OR delete

---

Created: 2025-10-18
Last updated: 2025-10-18
