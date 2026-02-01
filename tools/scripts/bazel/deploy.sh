#!/bin/bash
# Bazel wrapper for npm deploy
set -e
cd "$(dirname "$0")/../../.."
npm run deploy
