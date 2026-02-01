#!/bin/bash
# Build portfolio worker
set -e
cd "$(dirname "$0")/../../../typescript/portfolio-worker"
npm install --legacy-peer-deps
node generate-worker.js
