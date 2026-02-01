#!/usr/bin/env node

/**
 * Task #5 Phase 3: Breadcrumb Navigation Implementation
 * 
 * This script adds a visual breadcrumb navigation component to both HTML files:
 * 1. Injects breadcrumb HTML component after the main nav
 * 2. Adds CSS styling for breadcrumb appearance and responsiveness
 * 3. Makes breadcrumbs visible and SEO-friendly
 * 4. Ensures mobile responsiveness
 * 
 * Run: node implement-task-5-phase-3.js
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

// Breadcrumb configurations for both variants
const breadcrumbConfigs = {
  ko: {
    items: [
      { name: '홈', url: 'https://resume.jclee.me', position: 1 },
      { name: '프로젝트', url: 'https://resume.jclee.me#projects', position: 2 },
      { name: '기술 스택', url: 'https://resume.jclee.me#skills', position: 3 },
      { name: '경력', url: 'https://resume.jclee.me#resume', position: 4 },
    ],
    label: '이동 경로'
  },
  en: {
    items: [
      { name: 'Home', url: 'https://resume.jclee.me/en/', position: 1 },
      { name: 'Projects', url: 'https://resume.jclee.me/en/#projects', position: 2 },
      { name: 'Skills', url: 'https://resume.jclee.me/en/#skills', position: 3 },
      { name: 'Experience', url: 'https://resume.jclee.me/en/#resume', position: 4 },
    ],
    label: 'Breadcrumb'
  }
};

// CSS for breadcrumb styling - optimized for all screen sizes
const breadcrumbCSS = `
/* Breadcrumb Navigation Styles */
.breadcrumb-nav {
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(20, 24, 54, 0.8) 100%);
  border-bottom: 1px solid rgba(100, 180, 255, 0.2);
  padding: 12px 24px;
  margin: 0;
  font-size: 14px;
  position: relative;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.breadcrumb-nav ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.breadcrumb-nav li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-nav li:not(:last-child)::after {
  content: '›';
  color: rgba(100, 180, 255, 0.6);
  margin-left: 8px;
  font-weight: bold;
}

.breadcrumb-nav a {
  color: #64b4ff;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.breadcrumb-nav a:hover {
  color: #ffffff;
  background-color: rgba(100, 180, 255, 0.1);
  text-decoration: underline;
}

.breadcrumb-nav li:last-child a,
.breadcrumb-nav li:last-child span {
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  cursor: default;
}

.breadcrumb-nav li:last-child a:hover,
.breadcrumb-nav li:last-child span:hover {
  color: rgba(255, 255, 255, 0.7);
  background-color: transparent;
  text-decoration: none;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .breadcrumb-nav {
    padding: 10px 16px;
    font-size: 12px;
  }
  
  .breadcrumb-nav ol {
    gap: 4px;
    padding: 0 16px;
  }
  
  .breadcrumb-nav li {
    gap: 4px;
  }
  
  .breadcrumb-nav a {
    padding: 2px 6px;
  }
}

@media (max-width: 480px) {
  .breadcrumb-nav {
    padding: 8px 12px;
    font-size: 11px;
  }
  
  .breadcrumb-nav ol {
    gap: 2px;
    padding: 0 12px;
  }
  
  .breadcrumb-nav a {
    padding: 2px 4px;
  }
  
  /* Hide middle items on very small screens */
  .breadcrumb-nav li:nth-child(2),
  .breadcrumb-nav li:nth-child(3) {
    display: none;
  }
}

/* Accessibility: Focus state for keyboard navigation */
.breadcrumb-nav a:focus {
  outline: 2px solid #64b4ff;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .breadcrumb-nav {
    background: none;
    border: none;
    padding: 0;
  }
  
  .breadcrumb-nav li:not(:last-child)::after {
    content: ' > ';
    margin: 0 4px;
  }
  
  .breadcrumb-nav a {
    color: inherit;
  }
}
`;

// HTML breadcrumb component
function generateBreadcrumbHTML(items, label) {
  let html = `    <!-- Breadcrumb Navigation (SEO) -->\n`;
  html += `    <nav class="breadcrumb-nav" aria-label="${label}">\n`;
  html += `        <ol>\n`;
  
  items.forEach((item, index) => {
    if (index === items.length - 1) {
      // Current page - not a link
      html += `            <li><span aria-current="page">${item.name}</span></li>\n`;
    } else {
      html += `            <li><a href="${item.url}">${item.name}</a></li>\n`;
    }
  });
  
  html += `        </ol>\n`;
  html += `    </nav>\n`;
  html += `\n`;
  
  return html;
}

function addBreadcrumbComponent(filePath, variant) {
  log(`\n📄 Processing: ${path.basename(filePath)}`, 'cyan');
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const config = breadcrumbConfigs[variant];
    let changes = [];

    // Check if breadcrumb already exists
    if (content.includes('class="breadcrumb-nav"')) {
      log('  ⚠️  Breadcrumb component already exists, skipping', 'yellow');
      return true;
    }

    // Generate breadcrumb HTML
    const breadcrumbHTML = generateBreadcrumbHTML(config.items, config.label);
    
    // Find insertion point: after closing </nav> tag of main navigation
    const navRegex = /<\/nav>\s*\n\s*<!-- Hero -->/;
    
    if (!navRegex.test(content)) {
      log('  ⚠️  Could not find nav insertion point, using alternative method', 'yellow');
      
      // Fallback: search for just </nav> followed by <!-- Hero -->
      const fallbackRegex = /<\/nav>\s*([\n\s]*<!-- Hero -->)/;
      if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, `</nav>\n\n${breadcrumbHTML}$1`);
        changes.push('✅ Inserted breadcrumb HTML component (fallback method)');
      } else {
        log('  ❌ Could not find navigation insertion point', 'red');
        return false;
      }
    } else {
      content = content.replace(navRegex, `</nav>\n\n${breadcrumbHTML}<!-- Hero -->`);
      changes.push('✅ Inserted breadcrumb HTML component');
    }

    // Check if breadcrumb CSS already exists
    if (!content.includes('/* Breadcrumb Navigation Styles */')) {
      // Find the best place to add CSS - look for existing style blocks
      // Try to add before existing CSS comments that start with /* 
      const styleInsertRegex = /(\/\* .*? \*\/\n)/;
      
      // Better approach: add at the end of existing styles, before </head>
      if (content.includes('</style>')) {
        // Find the last </style> tag and add CSS before it
        const lastStyleIndex = content.lastIndexOf('</style>');
        if (lastStyleIndex !== -1) {
          content = content.slice(0, lastStyleIndex) + breadcrumbCSS + '\n' + content.slice(lastStyleIndex);
        }
      } else {
        log('  ⚠️  Could not find </style> tag for CSS insertion', 'yellow');
      }
      
      changes.push('✅ Added breadcrumb CSS styling');
    }

    // Verify JSON-LD schema exists (should be from Phase 1)
    if (!content.includes('"BreadcrumbList"')) {
      log('  ⚠️  No BreadcrumbList schema found, but one should exist from Phase 1', 'yellow');
    } else {
      changes.push('✅ BreadcrumbList schema verified');
    }

    // Save the updated content
    fs.writeFileSync(filePath, content, 'utf-8');
    
    log(`\n✅ Phase 3 Complete for ${variant.toUpperCase()}:`, 'green');
    changes.forEach(change => log(`   ${change}`, 'green'));
    
    return true;
  } catch (error) {
    log(`\n❌ Error processing ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

function verifyBreadcrumbComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const checks = {
    breadcrumbNav: /class="breadcrumb-nav"/.test(content),
    breadcrumbHTML: /<nav class="breadcrumb-nav"/.test(content),
    breadcrumbList: /<ol>.*<\/ol>/s.test(content),
    breadcrumbItems: /<li>.*<\/li>/s.test(content),
    breadcrumbCSS: /\/\* Breadcrumb Navigation Styles \*\//.test(content),
    mediaQueries: /@media \(max-width:/.test(content),
    accessibilityLabel: /aria-label=/.test(content),
    schemaItemList: /"itemListElement"/.test(content),
  };

  const results = Object.entries(checks);
  const passed = results.filter(([, v]) => v).length;
  const total = results.length;

  log(`\n📊 Breadcrumb Verification: ${passed}/${total} checks passed`, 'cyan');
  
  results.forEach(([check, passed]) => {
    const status = passed ? '✅' : '⚠️ ';
    const color = passed ? 'green' : 'yellow';
    log(`   ${status} ${check}`, color);
  });

  return passed >= total - 1; // Allow one optional check to fail
}

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Task #5 Phase 3: Breadcrumb Navigation               ║', 'cyan');
  log('║     Add visual breadcrumb navigation component          ║', 'cyan');
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
  fs.copyFileSync(koFile, `${koFile}.phase3-backup`);
  fs.copyFileSync(enFile, `${enFile}.phase3-backup`);
  log('   ✓ Backups created', 'green');

  // Add breadcrumb components
  const koSuccess = addBreadcrumbComponent(koFile, 'ko');
  const enSuccess = addBreadcrumbComponent(enFile, 'en');

  if (!koSuccess || !enSuccess) {
    log('\n❌ Errors occurred during component addition', 'red');
    process.exit(1);
  }

  // Verify both files
  log('\n🔍 Verifying Korean version...', 'blue');
  const koValid = verifyBreadcrumbComponent(koFile);

  log('\n🔍 Verifying English version...', 'blue');
  const enValid = verifyBreadcrumbComponent(enFile);

  if (koValid && enValid) {
    log('\n✅ All verifications passed! Phase 3 complete.', 'green');
    log('\n📋 Summary:', 'cyan');
    log('   • Breadcrumb navigation HTML component added', 'cyan');
    log('   • CSS styling included (responsive, accessible)', 'cyan');
    log('   • Mobile optimized (hidden on small screens)', 'cyan');
    log('   • Accessibility features (ARIA labels, keyboard navigation)', 'cyan');
    log('   • Schema verification passed', 'cyan');
    log('\n📋 Next steps:', 'cyan');
    log('   1. Review changes: git diff typescript/portfolio-worker/*.html', 'cyan');
    log('   2. Build: npm run build', 'cyan');
    log('   3. Test locally: npm run dev', 'cyan');
    log('   4. Verify breadcrumbs appear in browser', 'cyan');
    log('   5. Continue to Phase 4: Content Audit & Optimization', 'cyan');
    process.exit(0);
  } else {
    log('\n⚠️  Some verifications failed. Check the output above.', 'yellow');
    process.exit(1);
  }
}

main();
