#!/bin/bash
# Bazel wrapper for npm test
set -e
cd "$(dirname "$0")/../../.."
npm test
