#!/bin/bash
# Test job automation
set -e
cd "$(dirname "$0")/../../../typescript/job-automation"
npm test
