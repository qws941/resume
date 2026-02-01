#!/bin/bash
# Bazel wrapper for npm build
set -e
cd "$(dirname "$0")/../../.."
npm run build
