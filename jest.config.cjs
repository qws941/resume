/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.js', '**/tests/integration/**/*.test.js'],
  collectCoverageFrom: [
    'web/**/*.js',
    '!web/worker.js', // Auto-generated, skip
    '!web/generate-icons.js', // One-time script, skip
    '!web/convert-icons-to-png.js', // One-time script, skip
    '!web/src/index.js', // Unused legacy file, skip
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
};
