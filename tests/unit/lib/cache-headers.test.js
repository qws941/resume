/**
 * Unit tests for web/lib/cache-headers.js
 */

const {
  CACHE_HEADERS,
  getCacheHeaders,
} = require('../../../typescript/portfolio-worker/lib/cache-headers');

describe('Cache Headers Module', () => {
  describe('CACHE_HEADERS constants', () => {
    test('should have STATIC headers', () => {
      expect(CACHE_HEADERS.STATIC).toBeDefined();
      expect(CACHE_HEADERS.STATIC['Cache-Control']).toContain('immutable');
    });

    test('should have HTML headers', () => {
      expect(CACHE_HEADERS.HTML).toBeDefined();
      expect(CACHE_HEADERS.HTML['Cache-Control']).toContain('must-revalidate');
    });

    test('should have API headers', () => {
      expect(CACHE_HEADERS.API).toBeDefined();
      expect(CACHE_HEADERS.API['Cache-Control']).toContain('no-cache');
    });

    test('should have SERVICE_WORKER headers', () => {
      expect(CACHE_HEADERS.SERVICE_WORKER).toBeDefined();
      expect(CACHE_HEADERS.SERVICE_WORKER['Service-Worker-Allowed']).toBe('/');
    });

    test('should have DOCUMENT headers', () => {
      expect(CACHE_HEADERS.DOCUMENT).toBeDefined();
      expect(CACHE_HEADERS.DOCUMENT['Cache-Control']).toContain('86400');
    });
  });

  describe('getCacheHeaders', () => {
    test('should return SERVICE_WORKER headers for /sw.js', () => {
      const headers = getCacheHeaders('/sw.js');
      expect(headers).toEqual(CACHE_HEADERS.SERVICE_WORKER);
    });

    test('should return API headers for /api/ paths', () => {
      expect(getCacheHeaders('/api/vitals')).toEqual(CACHE_HEADERS.API);
      expect(getCacheHeaders('/api/test')).toEqual(CACHE_HEADERS.API);
    });

    test('should return API headers for /health', () => {
      const headers = getCacheHeaders('/health');
      expect(headers).toEqual(CACHE_HEADERS.API);
    });

    test('should return API headers for /metrics', () => {
      const headers = getCacheHeaders('/metrics');
      expect(headers).toEqual(CACHE_HEADERS.API);
    });

    test('should return DOCUMENT headers for PDF files', () => {
      const headers = getCacheHeaders('/resume.pdf');
      expect(headers).toEqual(CACHE_HEADERS.DOCUMENT);
    });

    test('should return DOCUMENT headers for DOCX files', () => {
      const headers = getCacheHeaders('/document.docx');
      expect(headers).toEqual(CACHE_HEADERS.DOCUMENT);
    });

    test('should return STATIC headers for images', () => {
      expect(getCacheHeaders('/og-image.webp')).toEqual(CACHE_HEADERS.STATIC);
      expect(getCacheHeaders('/icon.png')).toEqual(CACHE_HEADERS.STATIC);
      expect(getCacheHeaders('/photo.jpg')).toEqual(CACHE_HEADERS.STATIC);
      expect(getCacheHeaders('/logo.svg')).toEqual(CACHE_HEADERS.STATIC);
    });

    test('should return STATIC headers for fonts', () => {
      expect(getCacheHeaders('/font.woff2')).toEqual(CACHE_HEADERS.STATIC);
      expect(getCacheHeaders('/font.woff')).toEqual(CACHE_HEADERS.STATIC);
      expect(getCacheHeaders('/font.ttf')).toEqual(CACHE_HEADERS.STATIC);
    });

    test('should return HTML headers for root path', () => {
      const headers = getCacheHeaders('/');
      expect(headers).toEqual(CACHE_HEADERS.HTML);
    });

    test('should return HTML headers for unknown paths', () => {
      const headers = getCacheHeaders('/unknown');
      expect(headers).toEqual(CACHE_HEADERS.HTML);
    });

    test('should return HTML headers for manifest.json', () => {
      const headers = getCacheHeaders('/manifest.json');
      expect(headers).toEqual(CACHE_HEADERS.HTML);
    });
  });
});
