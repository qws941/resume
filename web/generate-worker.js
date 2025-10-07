const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const resumeHtml = fs.readFileSync(path.join(__dirname, 'resume.html'), 'utf-8');

const workerJs = `// Cloudflare Worker - Auto-generated
const INDEX_HTML = \`${indexHtml}\`;
const RESUME_HTML = \`${resumeHtml}\`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/resume') {
      return new Response(RESUME_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    
    return new Response(INDEX_HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
`;

fs.writeFileSync(path.join(__dirname, 'worker.js'), workerJs);
console.log('✅ worker.js generated successfully');
