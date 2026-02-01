#!/usr/bin/env node

/**
 * Task #4: Google Analytics 4 & Search Console Implementation
 * 
 * Automates the addition of GA4 tracking and GSC verification to both language variants
 * Usage: node implement-task-4.js [--gsc-token TOKEN] [--ga4-id ID]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let gscToken = null;
let ga4Id = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--gsc-token' && i + 1 < args.length) {
    gscToken = args[i + 1];
  }
  if (args[i] === '--ga4-id' && i + 1 < args.length) {
    ga4Id = args[i + 1];
  }
}

// Try to load from .env.local
if (!gscToken || !ga4Id) {
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      if (!gscToken) {
        const match = envContent.match(/GOOGLE_SITE_VERIFICATION_TOKEN=(.+)/);
        if (match) gscToken = match[1].trim();
      }
      if (!ga4Id) {
        const match = envContent.match(/GA4_MEASUREMENT_ID=(.+)/);
        if (match) ga4Id = match[1].trim();
      }
    }
  } catch (e) {
    // Silent fail, will use placeholders
  }
}

const indexPath = path.join(__dirname, 'typescript/portfolio-worker/index.html');
const indexEnPath = path.join(__dirname, 'typescript/portfolio-worker/index-en.html');

function createAnalyticsBlock(language, ga4Id, gscToken) {
  const ga4IdValue = ga4Id || 'G-XXXXXXXXXX';
  const gscValue = gscToken || 'YOUR_GSC_TOKEN_HERE';
  
  return `    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="${gscValue}">

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4IdValue}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4IdValue}', {
        'page_path': window.location.pathname,
        'language': '${language}'
      });
    </script>`;
}

function updateHtmlFile(filePath, language, ga4Id, gscToken) {
  console.log(`\n📝 Processing: ${path.basename(filePath)}`);
  
  try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, content);
    console.log(`  ✓ Backup created: ${path.basename(backupPath)}`);
    
    // Find insertion point (after robots meta tag)
    const robotsMatch = content.match(/<meta name="robots"[^>]*>/);
    if (!robotsMatch) {
      console.error(`  ❌ Could not find robots meta tag in ${path.basename(filePath)}`);
      return false;
    }
    
    // Check if analytics already present
    if (content.includes('google-site-verification') || content.includes('googletagmanager')) {
      console.log(`  ⓘ Analytics tags already present, updating...`);
      // Remove old analytics blocks
      content = content.replace(/    <!-- Google Search Console[\s\S]*?<\/script>\n/g, '');
    }
    
    // Insert analytics block
    const insertPoint = content.indexOf(robotsMatch[0]) + robotsMatch[0].length;
    const analyticsBlock = createAnalyticsBlock(language, ga4Id, gscToken);
    
    content = content.slice(0, insertPoint) + '\n' + analyticsBlock + '\n' + content.slice(insertPoint);
    
    // Write updated file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Analytics tags injected`);
    
    // Verify injection
    const updated = fs.readFileSync(filePath, 'utf8');
    if (updated.includes('google-site-verification') && updated.includes('googletagmanager')) {
      console.log(`  ✓ Verification: Tags successfully added`);
      return true;
    } else {
      console.error(`  ❌ Verification failed - tags not found after injection`);
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

console.log('════════════════════════════════════════════════════════');
console.log('📊 Task #4: Analytics & Search Console Setup');
console.log('════════════════════════════════════════════════════════');
console.log('');

// Check if tokens are available
if (!ga4Id || !gscToken) {
  console.log('⚠️  Some tokens are missing:');
  if (!ga4Id) console.log(`  • GA4 Measurement ID: NOT SET (using placeholder: G-XXXXXXXXXX)`);
  if (!gscToken) console.log(`  • GSC Verification Token: NOT SET (using placeholder)`);
  console.log('');
  console.log('To use actual tokens, either:');
  console.log('  1. Add to .env.local: GA4_MEASUREMENT_ID=G-XXX GOOGLE_SITE_VERIFICATION_TOKEN=...');
  console.log('  2. Pass as arguments: node implement-task-4.js --ga4-id G-XXX --gsc-token TOKEN');
  console.log('');
}

// Update HTML files
const results = [];
results.push(updateHtmlFile(indexPath, 'ko', ga4Id, gscToken));
results.push(updateHtmlFile(indexEnPath, 'en', ga4Id, gscToken));

console.log('');
console.log('════════════════════════════════════════════════════════');
if (results.every(r => r)) {
  console.log('✅ Analytics tags injected successfully!');
  console.log('');
  console.log('📋 Next Steps:');
  console.log('  1. Review changes: git diff typescript/portfolio-worker/index*.html');
  console.log('  2. Build worker: npm run build');
  console.log('  3. Deploy: npm run deploy');
  console.log('  4. Verify: curl https://resume.jclee.me | grep google-site-verification');
  console.log('');
  
  if (!ga4Id || !gscToken) {
    console.log('⚠️  Remember to add your actual tokens before deployment!');
    console.log('   Edit .env.local or re-run with: node implement-task-4.js --ga4-id G-XXX --gsc-token TOKEN');
  }
} else {
  console.log('❌ Some files failed to update');
  process.exit(1);
}

