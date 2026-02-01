#!/bin/bash
# Deploy portfolio worker
set -e
cd "$(dirname "$0")/../../../typescript/portfolio-worker"
npx wrangler deploy --env production
