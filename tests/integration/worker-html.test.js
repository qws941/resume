const fs = require('fs');
const path = require('path');

describe('Worker-HTML Integration', () => {
  let workerCode;
  let indexHtml;
  let resumeHtml;

  beforeAll(() => {
    // Read generated worker
    const workerPath = path.join(__dirname, '../../web/worker.js');
    workerCode = fs.readFileSync(workerPath, 'utf-8');

    // Read source HTML files
    indexHtml = fs.readFileSync(path.join(__dirname, '../../web/index.html'), 'utf-8');
    resumeHtml = fs.readFileSync(path.join(__dirname, '../../web/resume.html'), 'utf-8');
  });

  describe('HTML Embedding', () => {
    test('worker should contain both HTML files as constants', () => {
      expect(workerCode).toContain('const INDEX_HTML');
      expect(workerCode).toContain('const RESUME_HTML');
    });

    test('embedded HTML should preserve content length', () => {
      // Worker should have similar or greater length due to embedding
      expect(workerCode.length).toBeGreaterThan(indexHtml.length);
      expect(workerCode.length).toBeGreaterThan(resumeHtml.length);
    });

    test('embedded HTML should not have unescaped template literals', () => {
      // Extract embedded HTML from worker
      const indexMatch = workerCode.match(/const INDEX_HTML = `([\s\S]*?)`;/);
      const resumeMatch = workerCode.match(/const RESUME_HTML = `([\s\S]*?)`;/);

      if (indexMatch) {
        const embeddedIndex = indexMatch[1];
        // Should not have unescaped ${ patterns
        const unescapedDollarBraces = (embeddedIndex.match(/[^\\]\$\{/g) || []).length;
        expect(unescapedDollarBraces).toBe(0);
      }

      if (resumeMatch) {
        const embeddedResume = resumeMatch[1];
        const unescapedDollarBraces = (embeddedResume.match(/[^\\]\$\{/g) || []).length;
        expect(unescapedDollarBraces).toBe(0);
      }
    });
  });

  describe('Worker Structure', () => {
    test('worker should export default object with fetch method', () => {
      expect(workerCode).toContain('export default');
      expect(workerCode).toContain('async fetch(request)');
    });

    test('worker should have routing logic', () => {
      expect(workerCode).toContain('url.pathname');
      expect(workerCode).toContain('/resume');
    });

    test('worker should return responses with security headers', () => {
      expect(workerCode).toContain('SECURITY_HEADERS');
      expect(workerCode).toContain('new Response');
      expect(workerCode).toContain('headers:');
    });
  });

  describe('Content Integrity', () => {
    test('embedded index.html should contain key portfolio elements', () => {
      // Check if worker contains critical content from index.html
      const criticalContent = [
        'Infrastructure',
        'Security',
        'Engineer',
        'project-card',
      ];

      criticalContent.forEach(content => {
        expect(workerCode).toContain(content);
      });
    });

    test('embedded resume.html should contain resume content', () => {
      expect(workerCode).toContain('이재철');
    });

    test('security headers should be complete', () => {
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Referrer-Policy',
        'Content-Security-Policy',
      ];

      requiredHeaders.forEach(header => {
        expect(workerCode).toContain(header);
      });
    });
  });

  describe('Build Reproducibility', () => {
    test('regenerating worker should produce consistent output', () => {
      // Run generate-worker.js
      const generateScript = require('../../web/generate-worker.js');

      // Read newly generated worker
      const newWorkerCode = fs.readFileSync(
        path.join(__dirname, '../../web/worker.js'),
        'utf-8'
      );

      // Length should be consistent (some variance allowed for timestamps if any)
      const lengthDiff = Math.abs(workerCode.length - newWorkerCode.length);
      expect(lengthDiff).toBeLessThan(100);
    });
  });

  describe('Error Handling', () => {
    test('worker should not contain console.error or throw statements', () => {
      // Production worker should not have error handling that leaks info
      const hasConsoleError = workerCode.includes('console.error');
      const hasThrow = workerCode.includes('throw new Error');

      // These are acceptable in comments or embedded HTML, not in worker logic
      if (hasConsoleError || hasThrow) {
        // Verify they're only in embedded HTML, not worker code
        const workerLogic = workerCode.split('const INDEX_HTML')[0];
        expect(workerLogic).not.toContain('console.error');
        expect(workerLogic).not.toContain('throw new Error');
      }
    });

    test('worker should handle both route patterns', () => {
      // Updated to check for ROUTES object pattern (scalable routing)
      expect(workerCode).toContain('const ROUTES = {');
      expect(workerCode).toContain('\'/\': INDEX_HTML');
      expect(workerCode).toContain('\'/resume\': RESUME_HTML');
      expect(workerCode).toContain('ROUTES[url.pathname]');
      expect(workerCode).toContain('return new Response(content');
    });
  });
});
