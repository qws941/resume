/**
 * Unit tests for web/lib/compression.js
 */

const {
  aggressiveMinify,
  chunkBase64,
} = require('../../../typescript/portfolio-worker/lib/compression');

describe('Compression Module', () => {
  describe('aggressiveMinify', () => {
    test('should remove HTML comments', () => {
      const html = '<div><!-- comment -->content</div>';
      const result = aggressiveMinify(html);

      expect(result).not.toContain('<!-- comment -->');
      expect(result).toContain('content');
    });

    test('should collapse multiple spaces to single space', () => {
      const html = '<div>hello    world</div>';
      const result = aggressiveMinify(html);

      expect(result).toBe('<div>hello world</div>');
    });

    test('should remove spaces around tags', () => {
      const html = '<div>  <span>  text  </span>  </div>';
      const result = aggressiveMinify(html);

      expect(result).toBe('<div><span> text </span></div>');
    });

    test('should trim leading and trailing whitespace', () => {
      const html = '  <div>content</div>  ';
      const result = aggressiveMinify(html);

      expect(result).toBe('<div>content</div>');
    });

    test('should handle empty string', () => {
      const result = aggressiveMinify('');
      expect(result).toBe('');
    });

    test('should handle HTML with newlines', () => {
      const html = `<div>
        <p>Line 1</p>
        <p>Line 2</p>
      </div>`;
      const result = aggressiveMinify(html);

      expect(result).not.toContain('\n');
      expect(result).toContain('<p>Line 1</p>');
      expect(result).toContain('<p>Line 2</p>');
    });

    test('should preserve single spaces in text content', () => {
      const html = '<p>Hello world</p>';
      const result = aggressiveMinify(html);

      expect(result).toBe('<p>Hello world</p>');
    });

    test('should handle nested tags', () => {
      const html = '<div>  <ul>  <li>  Item  </li>  </ul>  </div>';
      const result = aggressiveMinify(html);

      expect(result).toBe('<div><ul><li> Item </li></ul></div>');
    });
  });

  describe('chunkBase64', () => {
    test('should split base64 into chunks of default size', () => {
      const base64 = 'A'.repeat(3000);
      const chunks = chunkBase64(base64);

      expect(chunks).toHaveLength(3);
      expect(chunks[0]).toHaveLength(1000);
      expect(chunks[1]).toHaveLength(1000);
      expect(chunks[2]).toHaveLength(1000);
    });

    test('should split base64 into chunks of custom size', () => {
      const base64 = 'B'.repeat(2500);
      const chunks = chunkBase64(base64, 500);

      expect(chunks).toHaveLength(5);
      chunks.forEach((chunk) => {
        expect(chunk).toHaveLength(500);
      });
    });

    test('should handle base64 shorter than chunk size', () => {
      const base64 = 'C'.repeat(500);
      const chunks = chunkBase64(base64, 1000);

      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe(base64);
    });

    test('should handle empty string', () => {
      const chunks = chunkBase64('');

      expect(chunks).toHaveLength(0);
    });

    test('should handle exact multiple of chunk size', () => {
      const base64 = 'D'.repeat(2000);
      const chunks = chunkBase64(base64, 1000);

      expect(chunks).toHaveLength(2);
      expect(chunks[0]).toHaveLength(1000);
      expect(chunks[1]).toHaveLength(1000);
    });

    test('should handle remainder chunk', () => {
      const base64 = 'E'.repeat(2300);
      const chunks = chunkBase64(base64, 1000);

      expect(chunks).toHaveLength(3);
      expect(chunks[0]).toHaveLength(1000);
      expect(chunks[1]).toHaveLength(1000);
      expect(chunks[2]).toHaveLength(300);
    });

    test('should preserve base64 content when reassembled', () => {
      const base64 = 'SGVsbG8gV29ybGQh'; // "Hello World!" in base64
      const chunks = chunkBase64(base64, 5);
      const reassembled = chunks.join('');

      expect(reassembled).toBe(base64);
    });
  });
});
