// Cloudflare Pages Worker - Static HTML file routing
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Direct HTML file requests
    if (url.pathname.endsWith('.html')) {
      return env.ASSETS.fetch(request);
    }

    // Root path
    if (url.pathname === '/') {
      return env.ASSETS.fetch(new URL('/index.html', url));
    }

    // Try to serve as HTML file
    try {
      return await env.ASSETS.fetch(request);
    } catch {
      // If not found, try adding .html extension
      const htmlPath = url.pathname + '.html';
      return env.ASSETS.fetch(new URL(htmlPath, url));
    }
  }
};
