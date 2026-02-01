const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Generate Open Graph image for resume site
 * Size: 1200x630px (recommended for og:image)
 * Design: Minimal with brand colors and text
 */
async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // SVG template with brand colors and content
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradient (purple/blue) -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#5b21b6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>

      <!-- Content -->
      <g transform="translate(${width / 2}, ${height / 2})">
        <!-- Title -->
        <text
          x="0"
          y="-80"
          font-family="Inter, sans-serif"
          font-size="72"
          font-weight="800"
          fill="#ffffff"
          text-anchor="middle"
          letter-spacing="-0.02em"
        >이재철</text>

        <!-- Subtitle -->
        <text
          x="0"
          y="0"
          font-family="Inter, sans-serif"
          font-size="48"
          font-weight="600"
          fill="#e0e7ff"
          text-anchor="middle"
        >Infrastructure &amp; Security Engineer</text>

        <!-- Stats -->
        <text
          x="0"
          y="80"
          font-family="Inter, sans-serif"
          font-size="32"
          font-weight="500"
          fill="#c7d2fe"
          text-anchor="middle"
        >8.8+ Years Experience | 15+ Security Solutions</text>

        <!-- URL -->
        <text
          x="0"
          y="140"
          font-family="Inter, sans-serif"
          font-size="28"
          font-weight="400"
          fill="#a5b4fc"
          text-anchor="middle"
        >resume.jclee.me</text>
      </g>
    </svg>
  `;

  const outputPath = path.join(__dirname, 'og-image.png');

  try {
    await sharp(Buffer.from(svg)).png().toFile(outputPath);

    const stats = fs.statSync(outputPath);
    logger.log('✅ Open Graph image generated successfully');
    logger.log(`📁 Output: ${outputPath}`);
    logger.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
    logger.log(`📐 Dimensions: ${width}x${height}px`);
  } catch (error) {
    logger.error('❌ Error generating OG image:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateOGImage();
}

module.exports = { generateOGImage };
