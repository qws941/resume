#!/bin/bash
# Deploy job automation workers
set -e
cd "$(dirname "$0")/../../../typescript/job-automation/workers"
npx wrangler deploy --env production
