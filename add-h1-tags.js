#!/usr/bin/env node

/**
 * Add H1 tags to both index.html and index-en.html
 * These H1 tags are essential for SEO and accessibility
 */

const fs = require('fs');
const path = require('path');

const PORTFOLIO_DIR = '/home/jclee/dev/resume/typescript/portfolio-worker';

// Define H1 tags for each version
const h1Tags = {
  'index.html': {
    tag: '<h1>이재철 - AIOps / ML Platform Engineer</h1>',
    context: 'Korean'
  },
  'index-en.html': {
    tag: '<h1>Jaecheol Lee - AIOps & Observability Engineer</h1>',
    context: 'English'
  }
};

async function addH1Tags() {
  console.log('🔄 Adding H1 tags to portfolio HTML files...\n');

  for (const [filename, { tag, context }] of Object.entries(h1Tags)) {
    const filePath = path.join(PORTFOLIO_DIR, filename);
    
    console.log(`📄 Processing ${context} version: ${filename}`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      continue;
    }

    // Read the file
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if H1 already exists
    if (content.includes('<h1')) {
      console.log(`   ⚠️  H1 tag already exists in ${filename}`);
      continue;
    }

    // Find the hero section and add H1 right after it
    const heroPattern = /<section class="hero" id="main-content"[^>]*>\s*<div class="container">/;
    const match = content.match(heroPattern);

    if (!match) {
      console.error(`❌ Could not find hero section pattern in ${filename}`);
      continue;
    }

    // Insert H1 tag after the pattern match
    const insertPoint = match[0];
    const newContent = insertPoint + '\n            ' + tag;
    const newFileContent = content.replace(heroPattern, newContent);

    // Verify the change
    if (newFileContent === content) {
      console.error(`❌ Failed to modify ${filename}`);
      continue;
    }

    // Write the updated content
    fs.writeFileSync(filePath, newFileContent, 'utf-8');
    console.log(`   ✅ Added H1 tag to ${filename}`);
    console.log(`   📝 Tag: ${tag}`);
  }

  console.log('\n✅ H1 tags added successfully!');
  console.log('\n📊 Next steps:');
  console.log('   1. npm run build     # Regenerate worker.js');
  console.log('   2. npm run dev       # Test locally');
  console.log('   3. npm run deploy    # Deploy to production');
}

addH1Tags().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
