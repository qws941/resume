#!/usr/bin/env node
/**
 * Single Source of Truth: resumes/master/resume_data.json
 *
 * Generates:
 * - web/data.json (portfolio website)
 * - shinhan_filled.pptx (proposal format)
 */

const fs = require('fs');
const path = require('path');
const { validateResumeDataFile, formatErrors } = require('./validate-resume-data.js');

const SOURCE_PATH = path.join(
  __dirname,
  '../../../typescript/data/resumes/master/resume_data.json'
);
const SCHEMA_PATH = path.join(
  __dirname,
  '../../../typescript/data/resumes/master/resume_schema.json'
);
const WEB_DATA_PATH = path.join(__dirname, '../../../typescript/portfolio-worker/data.json');

function loadSource() {
  const raw = fs.readFileSync(SOURCE_PATH, 'utf-8');
  return JSON.parse(raw);
}

function generateWebData(source) {
  const resume = source.careers.map((career, idx) => {
    const icons = ['🏦', '🏗️', '📈', '☁️', '🎓', '📞', '✈️'];
    const statsMap = {
      '(주)아이티센 CTS': ['보안관제', '컴플라이언스', 'DR'],
      '(주)가온누리정보시스템': ['아키텍처', '망분리', '인허가'],
      '(주)콴텍투자일임': ['AWS', '정책설계', '안정운영'],
      '(주)펀엔씨': ['AWS', 'K8s', 'DevOps'],
      '(주)조인트리': ['NSX-T', '보안통합', 'SI'],
      '(주)메타넷엠플랫폼': ['VPN/NAC', 'Ansible', 'Python'],
      '(주)엠티데이타': ['서버운영', '방화벽', '망분리'],
    };

    const entry = {
      icon: icons[idx] || '💼',
      title: career.company,
      description: career.description,
      period: career.period,
      stats: statsMap[career.company] || [],
      highlight: idx === 0,
    };

    if (idx === 0) {
      // TODO: Migrate to GitHub raw URLs when files are synced
      entry.completePdfUrl =
        'https://gitlab.jclee.me/jclee/resume/-/raw/master/resumes/technical/nextrade/exports/Nextrade_Full_Documentation.pdf';
    }

    return entry;
  });

  // Map personal projects to projects format
  const projects = (source.personalProjects || []).map((proj) => ({
    icon: proj.icon || '💻',
    title: proj.name,
    tech: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
    description: proj.description,
    tagline: proj.tagline || proj.description,
    metrics: proj.metrics || {},
    related_skills: proj.technologies || [],
    liveUrl: proj.url,
    repoUrl: proj.repoUrl,
    businessImpact: proj.businessImpact,
  }));

  return {
    resumeDownload: {
      pdfUrl: 'https://resume.jclee.me/resume.pdf',
      // TODO: Migrate to GitHub raw URLs when files are synced
      docxUrl:
        'https://gitlab.jclee.me/jclee/resume/-/raw/master/resumes/master/archive/resume_final.docx',
      mdUrl: 'https://gitlab.jclee.me/jclee/resume/-/raw/master/resumes/master/resume_final.md',
    },
    resume,
    projects,
    certifications: source.certifications,
    skills: source.skills,
    hero: source.hero,
    sectionDescriptions: source.sectionDescriptions,
    achievements: source.achievements,
    infrastructure: source.infrastructure,
    contact: source.contact,
  };
}

function main() {
  // Step 1: Validate master resume data before processing
  console.log('📋 Validating resume data against schema...');
  const validation = validateResumeDataFile(SOURCE_PATH, SCHEMA_PATH);

  if (!validation.valid) {
    console.error('❌ Resume data validation FAILED:');
    console.error(formatErrors(validation.errors));
    console.error('\n⚠️  Fix the errors above and try again.');
    process.exit(1);
  }
  console.log('✅ Resume data validation passed\n');

  // Step 2: Load and process valid data
  console.log('📄 Loading source: resumes/master/resume_data.json');
  const source = loadSource();

  console.log('🔄 Generating web/data.json...');
  const webData = generateWebData(source);
  fs.writeFileSync(WEB_DATA_PATH, JSON.stringify(webData, null, 2) + '\n');
  console.log('✅ web/data.json updated');

  console.log('\n📊 Summary:');
  console.log(`   - Resume entries: ${webData.resume.length}`);
  console.log(`   - Project entries: ${webData.projects.length}`);
  console.log(`   - Source: ${source.personal.name} (${source.summary.totalExperience})`);
}

main();
