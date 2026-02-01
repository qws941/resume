/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.js', '**/tests/integration/**/*.test.js'],
  collectCoverageFrom: [
    'web/lib/**/*.js', // Core testable modules
    'web/logger.js', // Logger utility
    '!web/lib/loki-logger.js', // Runtime-only (Cloudflare Worker)
    '!web/lib/metrics.js', // Runtime-only (Cloudflare Worker)
    '!web/lib/performance-metrics.js', // Browser-only (requires jsdom)
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
};
