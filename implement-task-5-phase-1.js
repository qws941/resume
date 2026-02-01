#!/usr/bin/env node

/**
 * Task #5 Phase 1: SEO Optimization - Structured Data Enhancement
 * 
 * This script:
 * 1. Adds BreadcrumbList JSON-LD schema
 * 2. Adds WebSite schema with search action
 * 3. Removes duplicate GA4 script
 * 4. Optimizes meta descriptions
 * 5. Adds theme-color meta tags
 * 
 * Usage: node implement-task-5-phase-1.js
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'typescript', 'portfolio-worker');
const koFile = path.join(baseDir, 'index.html');
const enFile = path.join(baseDir, 'index-en.html');
const backupSuffix = '.task5-backup';

// BreadcrumbList Schema (Korean)
const breadcrumbListKo = `    <!-- JSON-LD Structured Data: Breadcrumb List -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "홈",
          "item": "https://resume.jclee.me"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "프로젝트",
          "item": "https://resume.jclee.me#projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "경력",
          "item": "https://resume.jclee.me#resume"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "인프라",
          "item": "https://resume.jclee.me#infrastructure"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "스킬",
          "item": "https://resume.jclee.me#skills"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "연락처",
          "item": "https://resume.jclee.me#contact"
        }
      ]
    }
    </script>`;

// BreadcrumbList Schema (English)
const breadcrumbListEn = `    <!-- JSON-LD Structured Data: Breadcrumb List -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://resume.jclee.me"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://resume.jclee.me#projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Experience",
          "item": "https://resume.jclee.me#resume"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Infrastructure",
          "item": "https://resume.jclee.me#infrastructure"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Skills",
          "item": "https://resume.jclee.me#skills"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Contact",
          "item": "https://resume.jclee.me#contact"
        }
      ]
    }
    </script>`;

// Website Schema (Universal - same for both)
const websiteSchema = `    <!-- JSON-LD Structured Data: WebSite -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://resume.jclee.me",
      "name": "Jaecheol Lee Portfolio",
      "description": "AIOps and ML Platform Engineer Portfolio - Observability Stack Design, AI Agent Operations, Financial Infrastructure",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://resume.jclee.me?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["ko-KR", "en-US"]
    }
    </script>`;

function processFile(filePath, isEnglish = false) {
  console.log(`\n📝 Processing: ${path.basename(filePath)}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Remove duplicate GA4 script (keep only first one)
    const ga4Pattern = /<script>\s*window\.dataLayer[^<]*<\/script>/g;
    const ga4Matches = content.match(ga4Pattern);
    
    if (ga4Matches && ga4Matches.length > 1) {
      console.log(`  ✓ Found ${ga4Matches.length} GA4 scripts, removing duplicates...`);
      // Keep first, remove rest
      let firstGA4Removed = false;
      content = content.replace(ga4Pattern, (match) => {
        if (!firstGA4Removed) {
          firstGA4Removed = true;
          return match;
        }
        return ''; // Remove subsequent ones
      });
      console.log(`  ✓ Removed ${ga4Matches.length - 1} duplicate GA4 scripts`);
    }
    
    // Step 2: Add theme-color and format-detection meta tags (if not present)
    if (!content.includes('theme-color')) {
      const metaInsertPoint = content.indexOf('</head>');
      const themeMeta = `    <meta name="theme-color" content="#0a0e27">\n    <meta name="msapplication-TileColor" content="#0a0e27">\n    <meta name="format-detection" content="telephone=yes">\n    <meta name="format-detection" content="email=yes">\n    <meta name="format-detection" content="address=yes">\n`;
      content = content.slice(0, metaInsertPoint) + themeMeta + content.slice(metaInsertPoint);
      console.log(`  ✓ Added theme-color, msapplication-TileColor, and format-detection meta tags`);
    }
    
    // Step 3: Optimize meta description (update existing)
    let descriptionUpdated = false;
    if (isEnglish) {
      const oldDescEn = /<meta name="description" content="[^"]*Jaecheol Lee[^"]*">/;
      if (oldDescEn.test(content)) {
        content = content.replace(oldDescEn, 
          '<meta name="description" content="Jaecheol Lee - AIOps & ML Platform Engineer | Grafana, Prometheus, Observability Architecture Design | 5+ Years Financial Infrastructure">');
        descriptionUpdated = true;
        console.log(`  ✓ Optimized English meta description for CTR`);
      }
    } else {
      const oldDescKo = /<meta name="description" content="[^"]*AIOps[^"]*엔지니어[^"]*">/;
      if (oldDescKo.test(content)) {
        content = content.replace(oldDescKo,
          '<meta name="description" content="이재철 AIOps 엔지니어 | Grafana/Prometheus 구축, ML Platform 설계, 자동화로 운영비 절감 경험">');
        descriptionUpdated = true;
        console.log(`  ✓ Optimized Korean meta description for CTR`);
      }
    }
    
    // Step 4: Find where to insert new JSON-LD schemas (before closing </head>)
    // Look for the last existing JSON-LD script and insert after it
    const lastJsonLdPattern = /<\/script>\s*(?=<\/head>)/;
    const insertionPoint = content.search(lastJsonLdPattern);
    
    if (insertionPoint === -1) {
      console.log(`  ⚠️  Could not find insertion point for new schemas`);
      return false;
    }
    
    // Step 5: Prepare schemas to insert
    const breadcrumbSchema = isEnglish ? breadcrumbListEn : breadcrumbListKo;
    const schemasToInsert = `\n\n${breadcrumbSchema}\n\n${websiteSchema}\n    `;
    
    // Insert after the last JSON-LD script, before </head>
    const insertPos = content.indexOf('</script>', insertionPoint) + '</script>'.length;
    content = content.slice(0, insertPos) + schemasToInsert + content.slice(insertPos);
    
    console.log(`  ✓ Added BreadcrumbList schema`);
    console.log(`  ✓ Added WebSite schema with search action`);
    
    // Step 6: Create backup
    const backupPath = filePath + backupSuffix;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`  ✓ Created backup: ${path.basename(backupPath)}`);
    }
    
    // Step 7: Write updated file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Updated file successfully`);
    
    return true;
    
  } catch (error) {
    console.error(`  ✗ Error processing file: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🚀 Task #5 Phase 1: SEO Structured Data Enhancement');
  console.log('=' .repeat(50));
  
  let koSuccess = false;
  let enSuccess = false;
  
  // Process both files
  koSuccess = processFile(koFile, false);
  enSuccess = processFile(enFile, true);
  
  console.log('\n' + '='.repeat(50));
  if (koSuccess && enSuccess) {
    console.log('✅ Phase 1 Implementation Complete!');
    console.log('\nNext steps:');
    console.log('  1. npm run build     # Rebuild worker.js');
    console.log('  2. git diff typescript/portfolio-worker/index.html  # Review changes');
    console.log('  3. npm run test      # Run tests');
    console.log('  4. npm run deploy    # Deploy to production');
    console.log('  5. Verify with: curl https://resume.jclee.me | grep "BreadcrumbList"');
  } else {
    console.log('❌ Phase 1 Implementation Failed');
    process.exit(1);
  }
}

main();
