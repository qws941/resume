const fs = require('fs');
const path = require('path');

// Escape patterns for template literal safety
const ESCAPE_PATTERNS = {
  BACKTICK: /`/g,
  DOLLAR: /\$/g,
};

/**
 * Reads and escapes HTML file for embedding in template literals
 * @param {string} filename - Name of HTML file to read
 * @returns {string} Escaped HTML content
 */
function readAndEscapeHtml(filename) {
  const filePath = path.join(__dirname, filename);

  // Check if file exists before reading
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }

  try {
    return fs.readFileSync(filePath, 'utf-8')
      .replace(ESCAPE_PATTERNS.BACKTICK, '\\`')
      .replace(ESCAPE_PATTERNS.DOLLAR, '\\$');
  } catch (error) {
    console.error(`❌ Error reading file ${filename}:`, error.message);
    process.exit(1);
  }
}

// Read and escape HTML files
const indexHtml = readAndEscapeHtml('index.html');
const resumeHtml = readAndEscapeHtml('resume.html');

const workerJs = `// Cloudflare Worker - Auto-generated
const INDEX_HTML = \`${indexHtml}\`;
const RESUME_HTML = \`${resumeHtml}\`;

// Security headers
const SECURITY_HEADERS = {
  'Content-Type': 'text/html;charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'",
};

// Route mapping for scalability
const ROUTES = {
  '/': INDEX_HTML,
  '/resume': RESUME_HTML,
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const content = ROUTES[url.pathname] || INDEX_HTML;

    return new Response(content, {
      headers: SECURITY_HEADERS,
    });
  },
};
`;

// Write generated worker.js with error handling
try {
  const outputPath = path.join(__dirname, 'worker.js');
  fs.writeFileSync(outputPath, workerJs);
  console.log('✅ worker.js generated successfully');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Size: ${(workerJs.length / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('❌ Error writing worker.js:', error.message);
  process.exit(1);
}
