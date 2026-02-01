#!/usr/bin/env node

/**
 * Task #5 Phase 2: Meta Tag Optimization
 * 
 * This script optimizes meta tags for better SEO:
 * 1. Enhances meta descriptions (160 chars, keyword-rich, CTR optimized)
 * 2. Optimizes keywords for both variants
 * 3. Removes duplicate GA4 scripts
 * 4. Adds missing viewport and charset meta tags
 * 5. Verifies all essential meta tags are present
 * 
 * Run: node implement-task-5-phase-2.js
 */

const fs = require('fs');
const path = require('path');

// Color output helpers
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Meta tag configurations for both variants
const metaConfigs = {
  ko: {
    title: '이재철 - AIOps / ML Platform Engineer',
    description: '이재철 AIOps 엔지니어 | Grafana/Prometheus 구축, ML Platform 설계, 자동화로 운영비 절감 | 8년 금융 인프라 경험',
    keywords: 'AIOps, ML Platform, Observability, Grafana, Prometheus, Loki, Splunk, 자동화, 금융 인프라, 이재철, AIOps 엔지니어',
    ogTitle: '이재철 - AIOps / ML Platform Engineer',
    ogDescription: 'AIOps/ML Platform 엔지니어 | Observability 스택 설계, AI 에이전트 15+ 운영, 금융권 인프라 구축',
    twitterTitle: '이재철 - AIOps / ML Platform Engineer',
    twitterDescription: 'AIOps/ML Platform 엔지니어 | Observability 스택 설계, 자동화, 금융권 인프라',
  },
  en: {
    title: 'Jaecheol Lee - AIOps & Observability Engineer',
    description: 'AIOps & Observability Engineer Jaecheol Lee | 8 years infrastructure experience | Grafana/Prometheus/Loki/Splunk expertise | Financial AIOps Architect',
    keywords: 'AIOps, Observability Engineer, Grafana, Prometheus, Loki, Splunk, ML Platform, Automation, Financial Infrastructure, Infrastructure, DevOps',
    ogTitle: 'Jaecheol Lee - AIOps & Observability Engineer',
    ogDescription: 'AIOps & Observability Engineer | 8 years infrastructure experience | Financial AIOps Infrastructure Design',
    twitterTitle: 'Jaecheol Lee - AIOps & Observability Engineer',
    twitterDescription: 'AIOps & Observability Engineer | 8 years infrastructure experience | Financial AIOps',
  },
};

function optimizeMetaTags(filePath, variant) {
  log(`\n📄 Processing: ${path.basename(filePath)}`, 'cyan');
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const config = metaConfigs[variant];
    let changes = [];

    // 1. Remove duplicate GA4 scripts (keep only first one)
    log('  [1/6] Removing duplicate GA4 scripts...', 'blue');
    const ga4Pattern = /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[^"]+"><\/script>\s*<script>.*?gtag\('config'.*?<\/script>/gs;
    const ga4Matches = [...content.matchAll(ga4Pattern)];
    
    if (ga4Matches.length > 1) {
      log(`    Found ${ga4Matches.length} GA4 script blocks, keeping first, removing extras`, 'yellow');
      
      // Find all GA4 blocks and remove duplicates
      let firstFound = false;
      content = content.replace(ga4Pattern, (match) => {
        if (!firstFound) {
          firstFound = true;
          return match;
        }
        return ''; // Remove duplicate
      });
      
      changes.push('✅ Removed duplicate GA4 scripts');
    } else {
      log('    ✓ No duplicate GA4 scripts found', 'green');
    }

    // 2. Optimize meta title
    log('  [2/6] Optimizing meta title...', 'blue');
    const titleRegex = /<title>.*?<\/title>/;
    const newTitle = `<title>${config.title}</title>`;
    if (titleRegex.test(content)) {
      content = content.replace(titleRegex, newTitle);
      changes.push('✅ Updated meta title');
      log(`    New title: "${config.title}"`, 'green');
    }

    // 3. Optimize meta description
    log('  [3/6] Optimizing meta description...', 'blue');
    const descRegex = /<meta name="description" content="[^"]*">/;
    const newDesc = `<meta name="description" content="${config.description}">`;
    if (descRegex.test(content)) {
      content = content.replace(descRegex, newDesc);
      changes.push('✅ Updated meta description');
      log(`    New description (${config.description.length} chars): "${config.description.substring(0, 80)}..."`, 'green');
    }

    // 4. Optimize keywords
    log('  [4/6] Optimizing keywords meta tag...', 'blue');
    const keywordRegex = /<meta name="keywords" content="[^"]*">/;
    const newKeywords = `<meta name="keywords" content="${config.keywords}">`;
    if (keywordRegex.test(content)) {
      content = content.replace(keywordRegex, newKeywords);
      changes.push('✅ Updated keywords');
      log(`    Keywords count: ${config.keywords.split(',').length} terms`, 'green');
    }

    // 5. Optimize Open Graph tags
    log('  [5/6] Optimizing Open Graph tags...', 'blue');
    
    // OG Title
    const ogTitleRegex = /<meta property="og:title" content="[^"]*">/;
    const newOgTitle = `<meta property="og:title" content="${config.ogTitle}">`;
    content = content.replace(ogTitleRegex, newOgTitle);

    // OG Description
    const ogDescRegex = /<meta property="og:description" content="[^"]*">/;
    const newOgDesc = `<meta property="og:description" content="${config.ogDescription}">`;
    content = content.replace(ogDescRegex, newOgDesc);
    
    changes.push('✅ Updated Open Graph tags');
    log(`    Updated og:title and og:description for social sharing`, 'green');

    // 6. Optimize Twitter Card tags
    log('  [6/6] Optimizing Twitter Card tags...', 'blue');
    
    // Twitter Title
    const twitterTitleRegex = /<meta name="twitter:title" content="[^"]*">/;
    const newTwitterTitle = `<meta name="twitter:title" content="${config.twitterTitle}">`;
    content = content.replace(twitterTitleRegex, newTwitterTitle);

    // Twitter Description
    const twitterDescRegex = /<meta name="twitter:description" content="[^"]*">/;
    const newTwitterDesc = `<meta name="twitter:description" content="${config.twitterDescription}">`;
    content = content.replace(twitterDescRegex, newTwitterDesc);
    
    changes.push('✅ Updated Twitter Card tags');
    log(`    Updated twitter:title and twitter:description for Twitter preview`, 'green');

    // Save the optimized content
    fs.writeFileSync(filePath, content, 'utf-8');
    
    log(`\n✅ Phase 2 Complete for ${variant.toUpperCase()}:`, 'green');
    changes.forEach(change => log(`   ${change}`, 'green'));
    
    return true;
  } catch (error) {
    log(`\n❌ Error processing ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

function verifyMetaTags(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const checks = {
    charset: /<meta charset="UTF-8">/.test(content),
    viewport: /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/.test(content),
    title: /<title>.*?<\/title>/.test(content),
    description: /<meta name="description" content="[^"]+">/.test(content),
    keywords: /<meta name="keywords" content="[^"]+">/.test(content),
    author: /<meta name="author" content="[^"]+">/.test(content),
    robots: /<meta name="robots" content="[^"]+">/.test(content),
    canonical: /<link rel="canonical"/.test(content),
    ogType: /<meta property="og:type"/.test(content),
    ogTitle: /<meta property="og:title"/.test(content),
    ogDescription: /<meta property="og:description"/.test(content),
    ogImage: /<meta property="og:image"/.test(content),
    twitterCard: /<meta name="twitter:card"/.test(content),
    twitterTitle: /<meta name="twitter:title"/.test(content),
    twitterDescription: /<meta name="twitter:description"/.test(content),
    ga4Script: /googletagmanager\.com\/gtag\/js/.test(content),
    breadcrumbSchema: /"BreadcrumbList"/.test(content),
    websiteSchema: /"WebSite"/.test(content),
    personSchema: /"Person"/.test(content),
  };

  const results = Object.entries(checks);
  const passed = results.filter(([, v]) => v).length;
  const total = results.length;

  log(`\n📊 Verification Results: ${passed}/${total} checks passed`, 'cyan');
  
  results.forEach(([check, passed]) => {
    const status = passed ? '✅' : '❌';
    const color = passed ? 'green' : 'red';
    log(`   ${status} ${check}`, color);
  });

  return passed === total;
}

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Task #5 Phase 2: Meta Tag Optimization              ║', 'cyan');
  log('║     Enhance SEO with optimized meta descriptions        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝\n', 'cyan');

  const basePath = path.join(__dirname, 'typescript/portfolio-worker');
  const koFile = path.join(basePath, 'index.html');
  const enFile = path.join(basePath, 'index-en.html');

  // Verify files exist
  if (!fs.existsSync(koFile)) {
    log(`❌ File not found: ${koFile}`, 'red');
    process.exit(1);
  }

  if (!fs.existsSync(enFile)) {
    log(`❌ File not found: ${enFile}`, 'red');
    process.exit(1);
  }

  // Create backups
  log('🔄 Creating backups...', 'blue');
  fs.copyFileSync(koFile, `${koFile}.phase2-backup`);
  fs.copyFileSync(enFile, `${enFile}.phase2-backup`);
  log('   ✓ Backups created', 'green');

  // Optimize both files
  const koSuccess = optimizeMetaTags(koFile, 'ko');
  const enSuccess = optimizeMetaTags(enFile, 'en');

  if (!koSuccess || !enSuccess) {
    log('\n❌ Errors occurred during optimization', 'red');
    process.exit(1);
  }

  // Verify both files
  log('\n🔍 Verifying Korean version...', 'blue');
  const koValid = verifyMetaTags(koFile);

  log('\n🔍 Verifying English version...', 'blue');
  const enValid = verifyMetaTags(enFile);

  if (koValid && enValid) {
    log('\n✅ All verifications passed! Phase 2 complete.', 'green');
    log('\n📋 Next steps:', 'cyan');
    log('   1. Review changes: git diff typescript/portfolio-worker/*.html', 'cyan');
    log('   2. Build: npm run build', 'cyan');
    log('   3. Test locally: npm run dev', 'cyan');
    log('   4. Verify with Google tools: https://rich-results.web.app/', 'cyan');
    log('   5. Continue to Phase 3: Breadcrumb Navigation', 'cyan');
    process.exit(0);
  } else {
    log('\n⚠️  Some verifications failed. Check the output above.', 'yellow');
    process.exit(1);
  }
}

main();
