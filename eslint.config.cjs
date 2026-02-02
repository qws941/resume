// ESLint 9 Flat Config
module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        Headers: 'readonly',
        // CommonJS
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        // Cloudflare Workers
        caches: 'readonly',
        crypto: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  {
    // Ignore patterns (migrated from .eslintignore)
    ignores: [
      // Dependencies
      'node_modules/**',
      'wanted-mcp/node_modules/**',

      // Build outputs
      'web/worker.js', // Generated file
      'web/sentry-config.js', // Browser-embedded JavaScript
      'web/sw.js', // Service worker
      '*.min.js',
      'dist/**',
      'build/**',

      // Test coverage
      'coverage/**',

      // Logs
      '*.log',
      'npm-debug.log*',

      // Temporary files
      '.tmp/**',
      'tmp/**',

      // Legacy/archive
      'resumes/archive/**',

      // Wrangler
      '.wrangler/**',
      'web/.wrangler/**',

      // Test artifacts
      'playwright-report/**',
      'test-results/**',

      // External/cache
      '${HOME}/**',
      '.cache/**',
      '**/pyright/**', // Python type checker
      '.serena/**', // Serena LSP

      // Scripts with intentional unused vars
      'wanted-mcp/scripts/auto-login.js',
      'wanted-mcp/scripts/get-cookies.js',
      'wanted-mcp/scripts/metrics-exporter.js',
    ],
  },
];
