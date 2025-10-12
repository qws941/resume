const fs = require('fs');
const path = require('path');

// Read HTML files and escape backticks for template literals
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');
const resumeHtml = fs.readFileSync(path.join(__dirname, 'resume.html'), 'utf-8')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

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

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML, {
        headers: SECURITY_HEADERS,
      });
    }

    return new Response(INDEX_HTML, {
      headers: SECURITY_HEADERS,
    });
  },
};
`;

fs.writeFileSync(path.join(__dirname, 'worker.js'), workerJs);
console.log('✅ worker.js generated successfully');
