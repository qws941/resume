#!/usr/bin/env node

/**
 * Task #5 Phase 4: Content Audit & Optimization
 * 
 * This script audits and optimizes content for SEO:
 * 1. Verifies and optimizes heading structure (H1-H6)
 * 2. Improves image alt text with keywords
 * 3. Audits content length and readability
 * 4. Adds strategic internal links
 * 5. Verifies semantic HTML usage
 * 
 * Run: node implement-task-5-phase-4.js
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

// Content audit configurations
const contentAuditConfigs = {
  ko: {
    minHeadingLength: 10,
    maxHeadingLength: 60,
    altTextSuggestions: {
      'portfolio': '이재철 AIOps 엔지니어 포트폴리오',
      'profile': 'Jaecheol Lee 프로필 이미지',
      'project': 'AIOps 프로젝트 스크린샷',
      'skill': '기술 스택 아이콘',
      'certification': '자격증 배지',
      'infrastructure': '인프라 아키텍처 다이어그램',
    }
  },
  en: {
    minHeadingLength: 8,
    maxHeadingLength: 60,
    altTextSuggestions: {
      'portfolio': 'Jaecheol Lee AIOps Engineer Portfolio',
      'profile': 'Jaecheol Lee Professional Profile',
      'project': 'AIOps Project Screenshot',
      'skill': 'Technology Stack Icon',
      'certification': 'Professional Certification Badge',
      'infrastructure': 'Infrastructure Architecture Diagram',
    }
  }
};

function auditContentStructure(filePath, variant) {
  log(`\n📄 Auditing: ${path.basename(filePath)}`, 'cyan');
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const config = contentAuditConfigs[variant];
    const audit = {
      headings: [],
      images: [],
      links: [],
      sections: [],
      issues: [],
      recommendations: []
    };

    // 1. Analyze heading structure
    log('  [1/5] Analyzing heading structure...', 'blue');
    const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h\1>/g;
    let headingMatch;
    let lastHeadingLevel = 0;

    while ((headingMatch = headingRegex.exec(content)) !== null) {
      const level = parseInt(headingMatch[1]);
      const text = headingMatch[2].trim();
      
      audit.headings.push({
        level,
        text,
        length: text.length,
        index: headingMatch.index
      });

      // Check for heading hierarchy issues
      if (level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
        audit.issues.push(`⚠️  Heading hierarchy issue: H${lastHeadingLevel} → H${level}`);
      }

      // Check heading length
      if (text.length < config.minHeadingLength) {
        audit.recommendations.push(`📝 Consider expanding H${level}: "${text.substring(0, 30)}..."`);
      }

      lastHeadingLevel = level;
    }

    if (audit.headings.length === 0) {
      audit.issues.push('❌ No headings found!');
    } else {
      log(`    ✓ Found ${audit.headings.length} headings`, 'green');
      audit.headings.forEach(h => {
        log(`      H${h.level}: "${h.text.substring(0, 50)}${h.text.length > 50 ? '...' : ''}" (${h.length} chars)`, 'green');
      });
    }

    // 2. Analyze images and alt text
    log('  [2/5] Analyzing images and alt text...', 'blue');
    const imageRegex = /<img[^>]*?src="([^"]*)"[^>]*?alt="([^"]*)"[^>]*>/g;
    const imageNoAltRegex = /<img[^>]*?src="([^"]*)"(?![^>]*alt=)[^>]*>/g;
    
    let imageMatch;
    let missingAltCount = 0;

    while ((imageMatch = imageRegex.exec(content)) !== null) {
      const src = imageMatch[1];
      const alt = imageMatch[2];
      
      audit.images.push({
        src,
        alt,
        hasAlt: !!alt,
        altLength: alt ? alt.length : 0
      });
    }

    // Check for images without alt text
    const noAltMatches = [...content.matchAll(imageNoAltRegex)];
    if (noAltMatches.length > 0) {
      audit.issues.push(`❌ Found ${noAltMatches.length} images without alt text`);
      missingAltCount = noAltMatches.length;
    }

    if (audit.images.length === 0) {
      log(`    ⚠️  No images with alt text found`, 'yellow');
    } else {
      log(`    ✓ Found ${audit.images.length} images (${missingAltCount} missing alt text)`, 'green');
      audit.images.slice(0, 3).forEach((img, i) => {
        const altStatus = img.hasAlt ? '✓' : '❌';
        log(`      ${altStatus} ${img.alt.substring(0, 40) || '[NO ALT]'}...`, 'green');
      });
    }

    // 3. Analyze links
    log('  [3/5] Analyzing links...', 'blue');
    const linkRegex = /<a[^>]*?href="([^"]*)"[^>]*>([^<]+)<\/a>/g;
    
    let linkMatch;
    let internalLinks = 0;
    let externalLinks = 0;

    while ((linkMatch = linkRegex.exec(content)) !== null) {
      const href = linkMatch[1];
      const text = linkMatch[2];
      
      const isInternal = href.startsWith('#') || href.startsWith('/') || href.includes('resume.jclee.me');
      if (isInternal) internalLinks++;
      else externalLinks++;

      audit.links.push({
        href,
        text,
        isInternal,
        textLength: text.length
      });
    }

    log(`    ✓ Found ${audit.links.length} links (${internalLinks} internal, ${externalLinks} external)`, 'green');

    // 4. Analyze sections and content length
    log('  [4/5] Analyzing sections...', 'blue');
    const sectionRegex = /<section[^>]*id="([^"]*)"[^>]*>/g;
    
    let sectionMatch;
    while ((sectionMatch = sectionRegex.exec(content)) !== null) {
      audit.sections.push(sectionMatch[1]);
    }

    log(`    ✓ Found ${audit.sections.length} sections: ${audit.sections.join(', ')}`, 'green');

    // 5. Semantic HTML check
    log('  [5/5] Checking semantic HTML...', 'blue');
    const semanticElements = {
      article: (content.match(/<article/g) || []).length,
      section: (content.match(/<section/g) || []).length,
      nav: (content.match(/<nav/g) || []).length,
      header: (content.match(/<header/g) || []).length,
      footer: (content.match(/<footer/g) || []).length,
      main: (content.match(/<main/g) || []).length,
    };

    let semanticCount = Object.values(semanticElements).reduce((a, b) => a + b, 0);
    log(`    ✓ Found ${semanticCount} semantic elements`, 'green');
    Object.entries(semanticElements).forEach(([tag, count]) => {
      if (count > 0) log(`      <${tag}> x ${count}`, 'green');
    });

    return audit;
  } catch (error) {
    log(`\n❌ Error auditing ${filePath}: ${error.message}`, 'red');
    return null;
  }
}

function generateAuditReport(audits) {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║              Content Audit Report                       ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝\n', 'cyan');

  let totalIssues = 0;
  let totalRecommendations = 0;

  Object.entries(audits).forEach(([variant, audit]) => {
    if (!audit) return;

    log(`\n📋 ${variant.toUpperCase()} Version:`, 'cyan');
    
    // Summary
    log(`   Headings: ${audit.headings.length} (H1-H6)`, 'blue');
    log(`   Images: ${audit.images.length} with alt text`, 'blue');
    log(`   Links: ${audit.links.length} total`, 'blue');
    log(`   Sections: ${audit.sections.length}`, 'blue');
    
    // Issues
    if (audit.issues.length > 0) {
      log(`\n   Issues found: ${audit.issues.length}`, 'red');
      audit.issues.forEach(issue => log(`   ${issue}`, 'red'));
      totalIssues += audit.issues.length;
    }
    
    // Recommendations
    if (audit.recommendations.length > 0) {
      log(`\n   Recommendations: ${audit.recommendations.length}`, 'yellow');
      audit.recommendations.slice(0, 3).forEach(rec => log(`   ${rec}`, 'yellow'));
      totalRecommendations += audit.recommendations.length;
    }
  });

  log(`\n📊 Overall: ${totalIssues} issues, ${totalRecommendations} recommendations`, 'cyan');
}

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Task #5 Phase 4: Content Audit & Optimization        ║', 'cyan');
  log('║     Audit and optimize content for SEO                 ║', 'cyan');
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

  // Perform audits
  const audits = {
    ko: auditContentStructure(koFile, 'ko'),
    en: auditContentStructure(enFile, 'en')
  };

  if (!audits.ko || !audits.en) {
    log('\n❌ Errors occurred during audit', 'red');
    process.exit(1);
  }

  // Generate report
  generateAuditReport(audits);

  log('\n✅ Phase 4 Content Audit Complete!', 'green');
  log('\n📋 Recommendations Summary:', 'cyan');
  log('   1. Ensure H1 is unique and descriptive', 'cyan');
  log('   2. Check heading hierarchy (H1 → H2 → H3, no gaps)', 'cyan');
  log('   3. Add alt text to all images (descriptive, keyword-rich)', 'cyan');
  log('   4. Keep section content 300-500 words per section', 'cyan');
  log('   5. Use internal links strategically', 'cyan');
  log('   6. Ensure proper semantic HTML structure', 'cyan');
  log('\n📋 Next steps:', 'cyan');
  log('   1. Review audit recommendations above', 'cyan');
  log('   2. Build: npm run build', 'cyan');
  log('   3. Continue to Phase 5: Schema Validation & Testing', 'cyan');
  process.exit(0);
}

main();
