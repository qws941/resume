/**
 * Card generation functions for resume and project cards
 * @module cards
 */

const { CONFIG, TEMPLATE_CACHE } = require("./config");
const { generateLink } = require("./templates");
const { escapeHtml } = require("./utils");
const logger = require("../logger");

/**
 * Base template for all cards to ensure consistent structure
 * @param {Object} options - Card options
 * @returns {string} HTML string
 */
function renderBaseCard({
  className,
  icon,
  iconClass,
  title,
  titleClass,
  description = "",
  descriptionClass = "",
  bodyHtml = "",
  footerHtml = "",
  id,
}) {
  return `
                <!-- ${id}: ${title} -->
                <div class="${className}">
                    <div class="${iconClass}" aria-hidden="true">${icon}</div>
                    <div class="card-content">
                        <h3 class="${titleClass}">${title}</h3>
                        ${description ? `<p class="${descriptionClass}">${description}</p>` : ""}
                        ${bodyHtml}
                        ${footerHtml}
                    </div>
                </div>`;
}

/**
 * Generate resume cards HTML from JSON data (with caching)
 * @typedef {Object} ResumeProject
 * @property {string} icon - Emoji icon
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string[]} stats - Array of stat tags
 * @property {boolean} [highlight] - Whether card is highlighted
 * @property {string} [completePdfUrl] - URL for complete PDF (highlighted cards)
 * @property {string} [pdfUrl] - URL for standard PDF
 * @property {string} [docxUrl] - URL for DOCX
 *
 * @param {ResumeProject[]} resumeData - Array of resume project objects
 * @param {string} dataHash - Hash of the data for cache validation
 * @returns {string} HTML string for resume cards
 */
function generateResumeCards(resumeData, dataHash) {
  if (TEMPLATE_CACHE.dataHash === dataHash && TEMPLATE_CACHE.resumeCardsHtml) {
    logger.log("✓ Using cached resume cards HTML");
    return TEMPLATE_CACHE.resumeCardsHtml;
  }

  const html = resumeData
    .map((project) => {
      const cardClass = project.highlight
        ? CONFIG.CARD_CLASSES.DOC_CARD_HIGHLIGHT
        : CONFIG.CARD_CLASSES.DOC_CARD;

      const linksHtml = project.completePdfUrl
        ? generateLink({
            url: project.completePdfUrl,
            text: CONFIG.LINK_LABELS.COMPLETE_PDF,
            className: CONFIG.LINK_TYPES.PDF_FULL,
            ariaLabel: `Download ${project.title} complete PDF`,
            isDownload: true,
          })
        : `${generateLink({
            url: project.pdfUrl ?? "",
            text: CONFIG.LINK_LABELS.PDF,
            className: CONFIG.LINK_TYPES.PDF,
            ariaLabel: `Download ${project.title} PDF`,
            isDownload: true,
          })}
                        ${generateLink({
                          url: project.docxUrl ?? "",
                          text: CONFIG.LINK_LABELS.DOCX,
                          className: CONFIG.LINK_TYPES.DOCX,
                          ariaLabel: `Download ${project.title} DOCX`,
                          isDownload: true,
                        })}`;

      const statsHtml = `
                    <div class="doc-stats" role="list" aria-label="${project.title} technologies">
                        ${project.stats.map((stat) => `<span class="doc-stat" role="listitem">${stat}</span>`).join("\n                        ")}
                    </div>`;

      return renderBaseCard({
        id: "Project",
        className: `${cardClass} reveal-on-scroll`,
        icon: project.icon,
        iconClass: "doc-icon",
        title: project.title,
        titleClass: "doc-title",
        description: project.description,
        descriptionClass: "doc-description",
        bodyHtml: statsHtml,
        footerHtml: `<div class="doc-links" role="group" aria-label="${project.title} download options">${linksHtml}</div>`,
      });
    })
    .join("\n\n");

  TEMPLATE_CACHE.resumeCardsHtml = html;
  return html;
}

/**
 * Generate metrics HTML for project cards
 * @param {Object.<string, string>} metrics - Metrics object with key-value pairs
 * @returns {string} HTML string for metrics, or empty string if no metrics
 * @example
 * generateMetricsHtml({ users: '1000+', uptime: '99.9%' })
 */
function generateMetricsHtml(metrics) {
  if (!metrics || Object.keys(metrics).length === 0) {
    return "";
  }

  const metricItems = Object.entries(metrics)
    .map(
      ([key, value]) =>
        `<div class="project-metric">
                            <span class="metric-value">${escapeHtml(value)}</span>
                            <span class="metric-label">${escapeHtml(key.replace(/_/g, " "))}</span>
                        </div>`,
    )
    .join("\n                        ");

  return `<div class="project-metrics" role="list" aria-label="Project metrics">
                        ${metricItems}
                    </div>`;
}

/**
 * Generate related skills HTML for project cards
 * @param {string[]} skills - Array of related skill names
 * @returns {string} HTML string for related skills, or empty string if no skills
 * @example
 * generateRelatedSkillsHtml(['JavaScript', 'TypeScript', 'React'])
 */
function generateRelatedSkillsHtml(skills) {
  if (!skills || skills.length === 0) {
    return "";
  }

  const skillTags = skills
    .map((skill) => `<span class="skill-tag">${escapeHtml(skill)}</span>`)
    .join("\n                        ");

  return `<div class="project-skills" role="list" aria-label="Related skills">
                        ${skillTags}
                    </div>`;
}

/**
 * @param {number} index
 * @returns {string}
 */
function getBentoClass(index) {
  const bentoClasses = [
    "bento-main",
    "bento-side",
    "bento-sm-1",
    "bento-sm-2",
    "bento-sm-3",
  ];
  return index < bentoClasses.length ? bentoClasses[index] : "bento-wide";
}

/**
 * Generate project cards HTML from JSON data (with caching)
 * @typedef {Object} Project
 * @property {string} icon - Emoji icon
 * @property {string} title - Project title
 * @property {string} tech - Technology stack
 * @property {string} description - Project description
 * @property {string} [tagline] - Short tagline for the project
 * @property {Object} [metrics] - Key metrics for the project
 * @property {string[]} [related_skills] - Array of related skill names
 * @property {string[]} [related_projects] - Array of related project names
 * @property {string} [businessImpact] - Business impact statement
 * @property {string} [liveUrl] - URL for live demo
 * @property {string} [gitlabUrl] - URL for GitLab repository
 * @property {string} [documentationUrl] - URL for documentation
 * @property {Array<{name: string, url: string}>} [dashboards] - Array of dashboard links (for Grafana project)
 *
 * @param {Project[]} projectsData - Array of project objects
 * @param {string} dataHash - Hash of the data for cache validation
 * @returns {string} HTML string for project cards
 */
function generateProjectCards(projectsData, dataHash) {
  if (TEMPLATE_CACHE.dataHash === dataHash && TEMPLATE_CACHE.projectCardsHtml) {
    logger.log("✓ Using cached project cards HTML");
    return TEMPLATE_CACHE.projectCardsHtml;
  }

  const html = projectsData
    .map((project, index) => {
      const bentoClass = getBentoClass(index);
      const taglineHtml = project.tagline
        ? `<p class="project-tagline">${project.tagline}</p>`
        : "";
      const metricsHtml = generateMetricsHtml(project.metrics);
      const skillsHtml = generateRelatedSkillsHtml(
        project.related_skills ?? [],
      );
      const impactHtml = project.businessImpact
        ? `<div class="project-impact">
                            <span class="impact-icon">💡</span>
                            <span class="impact-text">${project.businessImpact}</span>
                        </div>`
        : "";

      let linksHtml = "";
      if (project.dashboards) {
        const dashboardLinks = project.dashboards
          .map((dashboard) => {
            const linkClass =
              dashboard.name === CONFIG.LINK_LABELS.GRAFANA_HOME
                ? CONFIG.LINK_TYPES.SECONDARY
                : CONFIG.LINK_TYPES.PRIMARY;

            return generateLink({
              url: dashboard.url,
              text: dashboard.name,
              className: `project-link ${linkClass}`,
              ariaLabel: `Open ${dashboard.name} dashboard (opens in new tab)`,
              isExternal: true,
            });
          })
          .join("\n                            ");

        linksHtml = `
                        <div class="project-links" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 0.5rem;" role="group" aria-label="${project.title} dashboards">
                            ${dashboardLinks}
                        </div>
                        <div class="project-links" role="group" aria-label="${project.title} documentation">
                            ${generateLink({
                              url: project.documentationUrl ?? "",
                              text: CONFIG.LINK_LABELS.DOCUMENTATION,
                              className: `project-link ${CONFIG.LINK_TYPES.SECONDARY}`,
                              ariaLabel: `Open ${project.title} documentation (opens in new tab)`,
                              isExternal: true,
                            })}
                        </div>`;
      } else {
        linksHtml = `
                        <div class="project-links" role="group" aria-label="${project.title} links">
                            ${generateLink({
                              url: project.liveUrl ?? "",
                              text: CONFIG.LINK_LABELS.LIVE_DEMO,
                              className: `project-link ${CONFIG.LINK_TYPES.PRIMARY}`,
                              ariaLabel: `Open ${project.title} live demo (opens in new tab)`,
                              isExternal: true,
                            })}
                            ${generateLink({
                              url: project.gitlabUrl ?? "",
                              text: CONFIG.LINK_LABELS.GITLAB,
                              className: `project-link ${CONFIG.LINK_TYPES.SECONDARY}`,
                              ariaLabel: `Open ${project.title} GitLab repository (opens in new tab)`,
                              isExternal: true,
                            })}
                        </div>`;
      }

      const bodyHtml = `
                        <div class="project-tech">${project.tech}</div>
                        ${taglineHtml}
                        <p class="project-description">${project.description}</p>
                        ${metricsHtml}
                        ${skillsHtml}
                        ${impactHtml}`;

      return renderBaseCard({
        id: "Project",
        className: `${CONFIG.CARD_CLASSES.PROJECT_CARD} ${bentoClass}`,
        icon: project.icon,
        iconClass: "project-header",
        title: project.title,
        titleClass: "project-title",
        description: "",
        descriptionClass: "",
        bodyHtml: `<div class="project-body">${bodyHtml}</div>`,
        footerHtml: linksHtml,
      });
    })
    .join("\n\n");

  TEMPLATE_CACHE.projectCardsHtml = html;
  return html;
}

/**
 * Generate certification cards HTML from JSON data
 * @param {Array} certData - Array of certification objects
 * @param {string} dataHash - Hash of the data for cache validation
 * @returns {string} HTML string for certification cards
 */
function generateCertificationCards(certData, dataHash) {
  if (TEMPLATE_CACHE.dataHash === dataHash && TEMPLATE_CACHE.certCardsHtml) {
    logger.log("✓ Using cached certification cards HTML");
    return TEMPLATE_CACHE.certCardsHtml;
  }

  const html = certData
    .map((cert) => {
      return renderBaseCard({
        id: "Certification",
        className: `${CONFIG.CARD_CLASSES.DOC_CARD} reveal-on-scroll`,
        icon: "📜",
        iconClass: "doc-icon",
        title: cert.name,
        titleClass: "doc-title",
        description: `${cert.issuer} | ${cert.date}`,
        descriptionClass: "doc-description",
        bodyHtml: "",
        footerHtml: "",
      });
    })
    .join("\n\n");

  TEMPLATE_CACHE.certCardsHtml = html;
  return html;
}

/**
 * Generate skills list HTML from JSON data
 * Supports both object format (with title/icon/items) and array format
 * @param {Object} skillsData - Object containing skill categories
 * @param {string} dataHash - Hash of the data for cache validation
 * @returns {string} HTML string for skills section
 */
function generateSkillsList(skillsData, dataHash) {
  if (TEMPLATE_CACHE.dataHash === dataHash && TEMPLATE_CACHE.skillsHtml) {
    logger.log("✓ Using cached skills HTML");
    return TEMPLATE_CACHE.skillsHtml;
  }

  // Categories with display labels - order determines rendering order
  const categories = {
    aiops: "AIOps & ML Platform",
    observability_aiops: "Observability & AIOps",
    cloud: "Cloud Infrastructure",
    devops: "DevOps & CI/CD",
    automation: "Automation & Scripting",
    database: "Database",
    programming: "Programming Languages",
    security: "Information Security",
    compliance: "Compliance & Governance",
  };

  const html = Object.entries(categories)
    .map(([key, label]) => {
      const skillData = skillsData[key];
      if (!skillData) return "";

      // Handle both object format (with title/items) and array format
      let skills;
      let displayLabel;
      if (Array.isArray(skillData)) {
        skills = skillData;
        displayLabel = label;
      } else if (skillData.items && Array.isArray(skillData.items)) {
        skills = skillData.items;
        displayLabel = skillData.title || label;
      } else {
        return "";
      }

      if (skills.length === 0) return "";

      const skillTags = skills
        .map((skill) => `<span class="skill-tag">${escapeHtml(skill)}</span>`)
        .join("\n");

      return `
        <div class="skill-category">
          <h3 class="skill-category-title">${displayLabel}</h3>
          <div class="project-skills" role="list">
            ${skillTags}
          </div>
          </div>`;
    })
    .join("\n");

  TEMPLATE_CACHE.skillsHtml = html;
  return html;
}

/**
 * Generate hero section HTML from data
 * @param {Object} heroData - Hero section data
 * @param {string} heroData.badge - Badge text
 * @param {string} heroData.title - Main title (Korean name)
 * @param {string} heroData.titleEn - English title
 * @param {string} heroData.subtitle - Subtitle text (can include \n for line breaks)
 * @returns {string} HTML string for hero section
 */
function generateHeroContent(heroData) {
  const subtitleLines = heroData.subtitle
    .split("\n")
    .join("<br>\n                    ");
  return `                <div class="hero-badge" data-i18n="hero.subtitle">${escapeHtml(heroData.badge)}</div>
                <h1 class="hero-title">
                    <span data-i18n="hero.title">${escapeHtml(heroData.title)}</span><br>
                    ${escapeHtml(heroData.titleEn)}
                </h1>
                <p class="hero-subtitle" data-i18n="hero.description">
                    ${subtitleLines}
                </p>`;
}

/**
 * Generate resume section description with achievements
 * @param {string} description - Section description text
 * @param {string[]} achievements - Array of achievement strings
 * @returns {string} HTML string for section description
 */
function generateResumeDescription(description, achievements) {
  const achievementsHtml = achievements
    .map(
      (achievement) =>
        `                    <li>${escapeHtml(achievement)}</li>`,
    )
    .join("\n");

  return `                <p class="section-description">
                    ${escapeHtml(description)}
                </p>
                <ul class="achievements-list">
${achievementsHtml}
                </ul>`;
}

/**
 * Generate infrastructure cards HTML from data
 * @param {Object[]} infraData - Array of infrastructure items
 * @param {string} infraData[].icon - Emoji icon
 * @param {string} infraData[].title - Service title
 * @param {string} infraData[].description - Service description
 * @param {string} infraData[].status - Status (running, stopped, etc.)
 * @param {string} infraData[].url - Service URL
 * @returns {string} HTML string for infrastructure cards
 */
function generateInfrastructureCards(infraData) {
  return infraData
    .map((infra) => {
      const statusText = infra.status === "running" ? "Running" : infra.status;
      return `                <div class="infra-card">
                    <div class="infra-header">
                        <div class="infra-icon">${infra.icon}</div>
                        <h3 class="infra-title">${escapeHtml(infra.title)}</h3>
                    </div>
                    <p class="infra-description">${escapeHtml(infra.description)}</p>
                    <span class="infra-status" data-status="${escapeHtml(infra.status)}">${statusText}</span>
                    <a href="${escapeHtml(infra.url)}" class="infra-link" target="_blank" rel="noopener noreferrer">
                        방문하기 <span aria-hidden="true">→</span>
                    </a>
                </div>`;
    })
    .join("\n\n");
}

/**
 * Generate contact grid HTML from data
 * @param {Object} contactData - Contact information object
 * @param {string} contactData.email - Email address
 * @param {string} contactData.phone - Phone number
 * @param {string} contactData.github - GitHub URL
 * @param {string} contactData.website - Website URL
 * @param {string} contactData.monitoring - Monitoring dashboard URL
 * @returns {string} HTML string for contact grid
 */
function generateContactGrid(contactData) {
  const githubDisplay = contactData.github.replace("https://", "");
  const websiteDisplay = contactData.website.replace("https://", "");
  const monitoringDisplay = new URL(contactData.monitoring).hostname;

  return `            <div class="contact-card">
                <div class="contact-grid" role="list">
                    <div class="contact-item reveal-on-scroll" role="listitem">
                        <div class="contact-label">Email</div>
                        <div class="contact-value">
                            <a href="mailto:${escapeHtml(contactData.email)}" aria-label="Send email to ${escapeHtml(contactData.email)}">${escapeHtml(contactData.email)}</a>
                        </div>
                    </div>
                    <div class="contact-item reveal-on-scroll" role="listitem">
                        <div class="contact-label">Phone</div>
                        <div class="contact-value">
                            <a href="tel:${escapeHtml(contactData.phone)}" aria-label="Call ${escapeHtml(contactData.phone)}">${escapeHtml(contactData.phone)}</a>
                        </div>
                    </div>
                    <div class="contact-item reveal-on-scroll" role="listitem">
                        <div class="contact-label">GitHub</div>
                        <div class="contact-value">
                            <a href="${escapeHtml(contactData.github)}" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile (opens in new tab)">${escapeHtml(githubDisplay)}</a>
                        </div>
                    </div>
                    <div class="contact-item reveal-on-scroll" role="listitem">
                        <div class="contact-label">Website</div>
                        <div class="contact-value">
                            <a href="${escapeHtml(contactData.website)}" target="_blank" rel="noopener noreferrer" aria-label="Visit website (opens in new tab)">${escapeHtml(websiteDisplay)}</a>
                        </div>
                    </div>
                    <div class="contact-item reveal-on-scroll" role="listitem">
                        <div class="contact-label">Monitoring</div>
                        <div class="contact-value">
                            <a href="${escapeHtml(contactData.monitoring)}" target="_blank" rel="noopener noreferrer" aria-label="View Grafana monitoring dashboard (opens in new tab)">${escapeHtml(monitoringDisplay)}</a>
                        </div>
                    </div>
                </div>
            </div>`;
}

module.exports = {
  generateResumeCards,
  generateProjectCards,
  generateCertificationCards,
  generateSkillsList,
  generateHeroContent,
  generateResumeDescription,
  generateInfrastructureCards,
  generateContactGrid,
};
