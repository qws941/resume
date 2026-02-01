/**
 * MCP Tool: Resume Sync (자동화 파이프라인)
 *
 * Bulk update and sync resume sections from local data files.
 * Supports automated pipeline for updating all resume sections.
 */

import { SessionManager } from './auth.js';
import { masterSchema, validateResumeData, formatErrorsForMCP } from '../shared/validation/index.js';
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
} from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';

const DEFAULT_OPENCODE_DATA_DIR = join(homedir(), '.OpenCode', 'data');
const DEFAULT_CLAUDE_DATA_DIR = join(homedir(), '.claude', 'data');

const DATA_DIR = join(DEFAULT_OPENCODE_DATA_DIR, 'wanted-resume');
const LEGACY_DATA_DIR = join(DEFAULT_CLAUDE_DATA_DIR, 'wanted-resume');

const resolveResumeFilePathForRead = (resumeId, filePathFromParams) => {
  if (filePathFromParams) return filePathFromParams;

  const preferred = join(DATA_DIR, `${resumeId}.json`);
  if (existsSync(preferred) || !resumeId) return preferred;

  const legacy = join(LEGACY_DATA_DIR, `${resumeId}.json`);
  if (existsSync(legacy)) return legacy;

  return preferred;
};

const resolveResumeFilePathForWrite = (resumeId, filePathFromParams) => {
  if (filePathFromParams) return filePathFromParams;
  return join(DATA_DIR, `${resumeId}.json`);
};

export const resumeSyncTool = {
  name: 'wanted_resume_sync',
  description: `Automated resume sync and bulk update pipeline.

**Sync Actions:**
- export: Export current resume to JSON file
- import: Import and update resume from JSON file
- diff: Compare local data with remote resume
- sync: Full sync (export → compare → selective update)

**Pipeline Actions:**
- pipeline_status: Check automation pipeline status
- pipeline_run: Run full update pipeline
- pipeline_schedule: Schedule periodic sync (via webhook)

**Section-specific Sync:**
- sync_careers: Sync only careers section
- sync_educations: Sync only educations section
- sync_skills: Sync only skills section
- sync_activities: Sync only activities section
- sync_language_certs: Sync only language certificates

Data files stored in: ~/.OpenCode/data/wanted-resume/ (legacy: ~/.claude/data/wanted-resume/)`,

  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'export',
          'import',
          'diff',
          'sync',
          'pipeline_status',
          'pipeline_run',
          'pipeline_schedule',
          'sync_careers',
          'sync_educations',
          'sync_skills',
          'sync_activities',
          'sync_language_certs',
        ],
        description: 'Sync action to perform',
      },
      resume_id: {
        type: 'string',
        description: 'Resume ID (required for most actions)',
      },
      file_path: {
        type: 'string',
        description: 'Custom file path for import/export (optional)',
      },
      dry_run: {
        type: 'boolean',
        description: 'Preview changes without applying (default: false)',
      },
      sections: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Sections to sync: careers, educations, skills, activities, language_certs',
      },
      webhook_url: {
        type: 'string',
        description: 'Webhook URL for pipeline scheduling',
      },
    },
    required: ['action'],
  },

  async execute(params) {
    const api = await SessionManager.getAPI();

    if (!api) {
      return {
        success: false,
        error: 'Not logged in. Use wanted_auth first.',
        hint: 'wanted_auth({ action: "set_cookies", cookies: "..." })',
      };
    }

    const { action, resume_id, dry_run = false } = params;

    try {
      switch (action) {
        // ============================================
        // Export/Import Actions
        // ============================================
        case 'export': {
          if (!resume_id) {
            return {
              success: false,
              error: 'resume_id is required for export',
            };
          }

          const data = await api.getResumeDetail(resume_id);

          // VALIDATION BLOCK 1: Export Action
          const validation = validateResumeData(data.resume, masterSchema);
          if (!validation.valid) {
            return {
              success: false,
              error: 'Cannot export: Remote resume violates schema',
              errors: formatErrorsForMCP(validation.errors),
              hint: 'Fix errors on Wanted.co.kr and try again'
            };
          }
          const exportData = {
            exported_at: new Date().toISOString(),
            resume_id: resume_id,
            resume: data.resume,
            careers: data.careers,
            educations: data.educations,
            skills: data.skills,
            activities: data.activities,
            language_certs: data.language_certs,
            links: data.links,
          };

          const filePath = resolveResumeFilePathForWrite(
            resume_id,
            params.file_path,
          );
          ensureDir(dirname(filePath));
          writeFileSync(filePath, JSON.stringify(exportData, null, 2));

          return {
            success: true,
            message: 'Resume exported successfully',
            file_path: filePath,
            summary: {
              careers: data.careers?.length || 0,
              educations: data.educations?.length || 0,
              skills: data.skills?.length || 0,
              activities: data.activities?.length || 0,
              language_certs: data.language_certs?.length || 0,
            },
          };
        }

        case 'import': {
          if (!resume_id) {
            return {
              success: false,
              error: 'resume_id is required for import',
            };
          }

          const filePath = resolveResumeFilePathForRead(
            resume_id,
            params.file_path,
          );
          if (!existsSync(filePath)) {
            return { success: false, error: `File not found: ${filePath}` };
          }

          const localData = JSON.parse(readFileSync(filePath, 'utf-8'));

          // VALIDATION BLOCK 2: Import Action
          const validation = validateResumeData(localData, masterSchema);
          if (!validation.valid) {
            return {
              success: false,
              error: 'Cannot import: Local file violates schema',
              errors: formatErrorsForMCP(validation.errors),
              hint: 'Fix your JSON file and try again'
            };
          }

          if (dry_run) {
            return {
              success: true,
              dry_run: true,
              message: 'Import preview (no changes applied)',
              data: localData,
            };
          }

          // Import sections
          const results = await importResumeSections(
            api,
            resume_id,
            localData,
            params.sections,
          );

          // Save and regenerate PDF
          await api.saveResume(resume_id);

          return {
            success: true,
            message: 'Resume imported successfully',
            results,
            pdf_regenerated: true,
          };
        }

        case 'diff': {
          if (!resume_id) {
            return { success: false, error: 'resume_id is required for diff' };
          }

          const filePath = resolveResumeFilePathForRead(
            resume_id,
            params.file_path,
          );
          if (!existsSync(filePath)) {
            return {
              success: false,
              error: `Local file not found: ${filePath}. Run export first.`,
            };
          }

          const localData = JSON.parse(readFileSync(filePath, 'utf-8'));

          // VALIDATION BLOCK 3: Sync Action
          const validation = validateResumeData(localData, masterSchema);
          if (!validation.valid) {
            return {
              success: false,
              dry_run: true,
              error: 'Cannot sync: Local data violates schema',
              errors: formatErrorsForMCP(validation.errors),
              hint: 'Review errors and fix your local data'
            };
          }
          const remoteData = await api.getResumeDetail(resume_id);

          const diff = compareResume(localData, remoteData);

          return {
            success: true,
            diff,
            local_exported_at: localData.exported_at,
            summary: {
              careers: {
                local: localData.careers?.length,
                remote: remoteData.careers?.length,
              },
              educations: {
                local: localData.educations?.length,
                remote: remoteData.educations?.length,
              },
              skills: {
                local: localData.skills?.length,
                remote: remoteData.skills?.length,
              },
              activities: {
                local: localData.activities?.length,
                remote: remoteData.activities?.length,
              },
            },
          };
        }

        case 'sync': {
          if (!resume_id) {
            return { success: false, error: 'resume_id is required for sync' };
          }

          // Step 1: Export current state
          const remoteData = await api.getResumeDetail(resume_id);

          // Step 2: Check for local file
          const filePath = resolveResumeFilePathForRead(
            resume_id,
            params.file_path,
          );

          if (!existsSync(filePath)) {
            // No local file - just export
            ensureDir(DATA_DIR);
            const exportData = {
              exported_at: new Date().toISOString(),
              resume_id,
              ...remoteData,
            };
            const writePath = resolveResumeFilePathForWrite(
              resume_id,
              params.file_path,
            );
            writeFileSync(writePath, JSON.stringify(exportData, null, 2));

            return {
              success: true,
              message: 'No local file found. Exported remote data.',
              file_path: resolveResumeFilePathForWrite(
                resume_id,
                params.file_path,
              ),
            };
          }

          // Step 3: Compare and sync
          const localData = JSON.parse(readFileSync(filePath, 'utf-8'));
          const diff = compareResume(localData, remoteData);

          if (dry_run) {
            return {
              success: true,
              dry_run: true,
              message: 'Sync preview',
              diff,
              changes_needed: Object.keys(diff).filter(
                (k) => diff[k].length > 0,
              ),
            };
          }

          // Step 4: Apply changes from local to remote
          const results = await syncResumeSections(
            api,
            resume_id,
            localData,
            remoteData,
            params.sections,
          );

          // Step 5: Save and regenerate PDF
          if (results.changes_applied > 0) {
            await api.saveResume(resume_id);
          }

          return {
            success: true,
            message: 'Sync completed',
            results,
            pdf_regenerated: results.changes_applied > 0,
          };
        }

        // ============================================
        // Pipeline Actions
        // ============================================
        case 'pipeline_status': {
          const statusFile = join(DATA_DIR, 'pipeline-status.json');
          let status = { last_run: null, last_result: null, scheduled: false };

          if (existsSync(statusFile)) {
            status = JSON.parse(readFileSync(statusFile, 'utf-8'));
          }

          return {
            success: true,
            pipeline: status,
            data_dir: DATA_DIR,
            resume_files: listResumeFiles(),
          };
        }

        case 'pipeline_run': {
          if (!resume_id) {
            return {
              success: false,
              error: 'resume_id is required for pipeline_run',
            };
          }

          const startTime = Date.now();
          const results = {
            started_at: new Date().toISOString(),
            steps: [],
          };

          // Step 1: Export current state
          results.steps.push({ step: 'export', status: 'running' });
          const remoteData = await api.getResumeDetail(resume_id);
          const backupPath = join(
            DATA_DIR,
            `${resume_id}_backup_${Date.now()}.json`,
          );
          ensureDir(DATA_DIR);
          writeFileSync(backupPath, JSON.stringify(remoteData, null, 2));
          results.steps[0] = {
            step: 'export',
            status: 'done',
            backup: backupPath,
          };

          // Step 2: Check for updates file
          const updatesFile = join(DATA_DIR, `${resume_id}_updates.json`);
          if (!existsSync(updatesFile)) {
            results.steps.push({
              step: 'updates',
              status: 'skipped',
              reason: 'No updates file',
            });
          } else {
            results.steps.push({ step: 'updates', status: 'running' });
            const updates = JSON.parse(readFileSync(updatesFile, 'utf-8'));
            const updateResults = await applyUpdates(
              api,
              resume_id,
              updates,
              dry_run,
            );
            results.steps[1] = {
              step: 'updates',
              status: 'done',
              ...updateResults,
            };
          }

          // Step 3: Save and regenerate PDF
          if (!dry_run) {
            results.steps.push({ step: 'save', status: 'running' });
            await api.saveResume(resume_id);
            results.steps[results.steps.length - 1] = {
              step: 'save',
              status: 'done',
            };
          }

          // Save pipeline status
          results.completed_at = new Date().toISOString();
          results.duration_ms = Date.now() - startTime;

          const statusFile = join(DATA_DIR, 'pipeline-status.json');
          writeFileSync(
            statusFile,
            JSON.stringify(
              {
                last_run: results.completed_at,
                last_result: results,
                resume_id,
              },
              null,
              2,
            ),
          );

          return {
            success: true,
            message: 'Pipeline completed',
            results,
          };
        }

        case 'pipeline_schedule': {
          const webhookUrl = params.webhook_url;
          if (!webhookUrl) {
            return {
              success: false,
              error: 'webhook_url is required for scheduling',
              hint: 'Create workflow with webhook trigger, then provide URL',
            };
          }

          // Save webhook configuration
          const configFile = join(DATA_DIR, 'pipeline-config.json');
          ensureDir(DATA_DIR);
          writeFileSync(
            configFile,
            JSON.stringify(
              {
                webhook_url: webhookUrl,
                resume_id,
                configured_at: new Date().toISOString(),
              },
              null,
              2,
            ),
          );

          return {
            success: true,
            message: 'Pipeline scheduled',
            webhook_url: webhookUrl,
            config_file: configFile,
            hint: 'Configure workflow to call this MCP tool periodically',
          };
        }

        // ============================================
        // Section-specific Sync
        // ============================================
        case 'sync_careers':
          return await syncSection(api, resume_id, 'careers', params, dry_run);

        case 'sync_educations':
          return await syncSection(
            api,
            resume_id,
            'educations',
            params,
            dry_run,
          );

        case 'sync_skills':
          return await syncSection(api, resume_id, 'skills', params, dry_run);

        case 'sync_activities':
          return await syncSection(
            api,
            resume_id,
            'activities',
            params,
            dry_run,
          );

        case 'sync_language_certs':
          return await syncSection(
            api,
            resume_id,
            'language_certs',
            params,
            dry_run,
          );

        default:
          return {
            success: false,
            error: `Unknown action: ${action}`,
            available_actions: [
              'export',
              'import',
              'diff',
              'sync',
              'pipeline_status',
              'pipeline_run',
              'pipeline_schedule',
              'sync_careers',
              'sync_educations',
              'sync_skills',
              'sync_activities',
              'sync_language_certs',
            ],
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// ============================================
// Helper Functions
// ============================================

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function listResumeFiles() {
  try {
    return readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }
}

function compareResume(local, remote) {
  const diff = {
    careers: [],
    educations: [],
    skills: [],
    activities: [],
    language_certs: [],
  };

  // Compare careers by ID
  const localCareers = new Map((local.careers || []).map((c) => [c.id, c]));
  const remoteCareers = new Map((remote.careers || []).map((c) => [c.id, c]));

  for (const [id, localCareer] of localCareers) {
    const remoteCareer = remoteCareers.get(id);
    if (!remoteCareer) {
      diff.careers.push({ type: 'add', data: localCareer });
    } else if (JSON.stringify(localCareer) !== JSON.stringify(remoteCareer)) {
      diff.careers.push({
        type: 'update',
        id,
        local: localCareer,
        remote: remoteCareer,
      });
    }
  }

  for (const [id] of remoteCareers) {
    if (!localCareers.has(id)) {
      diff.careers.push({ type: 'delete', id });
    }
  }

  // Similar for other sections...
  // (Skills comparison uses text field)
  const localSkills = new Set((local.skills || []).map((s) => s.tag_type_id));
  const remoteSkills = new Set((remote.skills || []).map((s) => s.tag_type_id));

  for (const tagId of localSkills) {
    if (!remoteSkills.has(tagId)) {
      diff.skills.push({ type: 'add', tag_type_id: tagId });
    }
  }

  for (const skill of remote.skills || []) {
    if (!localSkills.has(skill.tag_type_id)) {
      diff.skills.push({
        type: 'delete',
        id: skill.id,
        tag_type_id: skill.tag_type_id,
      });
    }
  }

  // Compare educations by ID
  const localEducations = new Map(
    (local.educations || []).map((e) => [e.id, e]),
  );
  const remoteEducations = new Map(
    (remote.educations || []).map((e) => [e.id, e]),
  );

  for (const [id, localEdu] of localEducations) {
    const remoteEdu = remoteEducations.get(id);
    if (!remoteEdu) {
      diff.educations.push({ type: 'add', data: localEdu });
    } else if (JSON.stringify(localEdu) !== JSON.stringify(remoteEdu)) {
      diff.educations.push({
        type: 'update',
        id,
        local: localEdu,
        remote: remoteEdu,
      });
    }
  }

  for (const [id] of remoteEducations) {
    if (!localEducations.has(id)) {
      diff.educations.push({ type: 'delete', id });
    }
  }

  // Compare activities by ID
  const localActivities = new Map(
    (local.activities || []).map((a) => [a.id, a]),
  );
  const remoteActivities = new Map(
    (remote.activities || []).map((a) => [a.id, a]),
  );

  for (const [id, localAct] of localActivities) {
    const remoteAct = remoteActivities.get(id);
    if (!remoteAct) {
      diff.activities.push({ type: 'add', data: localAct });
    } else if (JSON.stringify(localAct) !== JSON.stringify(remoteAct)) {
      diff.activities.push({
        type: 'update',
        id,
        local: localAct,
        remote: remoteAct,
      });
    }
  }

  for (const [id] of remoteActivities) {
    if (!localActivities.has(id)) {
      diff.activities.push({ type: 'delete', id });
    }
  }

  // Compare language_certs by ID
  const localCerts = new Map(
    (local.language_certs || []).map((c) => [c.id, c]),
  );
  const remoteCerts = new Map(
    (remote.language_certs || []).map((c) => [c.id, c]),
  );

  for (const [id, localCert] of localCerts) {
    const remoteCert = remoteCerts.get(id);
    if (!remoteCert) {
      diff.language_certs.push({ type: 'add', data: localCert });
    } else if (JSON.stringify(localCert) !== JSON.stringify(remoteCert)) {
      diff.language_certs.push({
        type: 'update',
        id,
        local: localCert,
        remote: remoteCert,
      });
    }
  }

  for (const [id] of remoteCerts) {
    if (!localCerts.has(id)) {
      diff.language_certs.push({ type: 'delete', id });
    }
  }

  return diff;
}

async function importResumeSections(api, resumeId, data, sections) {
  const results = { imported: [], errors: [] };
  const targetSections = sections || [
    'careers',
    'educations',
    'skills',
    'activities',
    'language_certs',
  ];

  for (const section of targetSections) {
    const items = data[section] || [];

    for (const item of items) {
      try {
        switch (section) {
          case 'careers':
            await api.addResumeCareer(resumeId, item);
            break;
          case 'educations':
            await api.addResumeEducation(resumeId, item);
            break;
          case 'skills':
            await api.addResumeSkill(resumeId, item.tag_type_id);
            break;
          case 'activities':
            await api.addResumeActivity(resumeId, item);
            break;
          case 'language_certs':
            await api.addResumeLanguageCert(resumeId, item);
            break;
        }
        results.imported.push({ section, id: item.id });
      } catch (error) {
        results.errors.push({ section, id: item.id, error: error.message });
      }
    }
  }

  return results;
}

async function syncResumeSections(api, resumeId, local, remote, sections) {
  const diff = compareResume(local, remote);
  const results = { changes_applied: 0, errors: [] };
  const targetSections = sections || Object.keys(diff);

  for (const section of targetSections) {
    const changes = diff[section] || [];

    for (const change of changes) {
      try {
        switch (section) {
          case 'careers':
            if (change.type === 'add') {
              await api.addResumeCareer(resumeId, change.data);
            } else if (change.type === 'update') {
              await api.updateResumeCareer(resumeId, change.id, change.local);
            } else if (change.type === 'delete') {
              await api.deleteResumeCareer(resumeId, change.id);
            }
            break;
          case 'skills':
            if (change.type === 'add') {
              await api.addResumeSkill(resumeId, change.tag_type_id);
            } else if (change.type === 'delete') {
              await api.deleteResumeSkill(resumeId, change.id);
            }
            break;
          case 'educations':
            if (change.type === 'add') {
              await api.resumeEducation.add(resumeId, change.data);
            } else if (change.type === 'update') {
              await api.resumeEducation.update(
                resumeId,
                change.id,
                change.local,
              );
            } else if (change.type === 'delete') {
              await api.resumeEducation.delete(resumeId, change.id);
            }
            break;
          case 'activities':
            if (change.type === 'add') {
              await api.resumeActivity.add(resumeId, change.data);
            } else if (change.type === 'update') {
              await api.resumeActivity.update(
                resumeId,
                change.id,
                change.local,
              );
            } else if (change.type === 'delete') {
              await api.resumeActivity.delete(resumeId, change.id);
            }
            break;
          case 'language_certs':
            if (change.type === 'add') {
              await api.resumeLanguageCert.add(resumeId, change.data);
            } else if (change.type === 'update') {
              await api.resumeLanguageCert.update(
                resumeId,
                change.id,
                change.local,
              );
            } else if (change.type === 'delete') {
              await api.resumeLanguageCert.delete(resumeId, change.id);
            }
            break;
        }
        results.changes_applied++;
      } catch (error) {
        results.errors.push({ section, change, error: error.message });
      }
    }
  }

  return results;
}

async function applyUpdates(api, resumeId, updates, dryRun) {
  const results = { applied: [], skipped: [], errors: [] };

  for (const update of updates.updates || []) {
    if (dryRun) {
      results.skipped.push({ ...update, reason: 'dry_run' });
      continue;
    }

    try {
      switch (update.section) {
        case 'career':
          if (update.action === 'update') {
            await api.updateResumeCareer(resumeId, update.id, update.data);
          } else if (update.action === 'add') {
            await api.addResumeCareer(resumeId, update.data);
          }
          break;
        case 'education':
          if (update.action === 'update') {
            await api.updateResumeEducation(resumeId, update.id, update.data);
          }
          break;
        case 'skill':
          if (update.action === 'add') {
            await api.addResumeSkill(resumeId, update.tag_type_id);
          } else if (update.action === 'delete') {
            await api.deleteResumeSkill(resumeId, update.id);
          }
          break;
        case 'activity':
          if (update.action === 'update') {
            await api.updateResumeActivity(resumeId, update.id, update.data);
          }
          break;
      }
      results.applied.push(update);
    } catch (error) {
      results.errors.push({ update, error: error.message });
    }
  }

  return results;
}

async function syncSection(api, resumeId, section, params, dryRun) {
  if (!resumeId) {
    return {
      success: false,
      error: `resume_id is required for sync_${section}`,
    };
  }

  const filePath = resolveResumeFilePathForRead(resumeId, params.file_path);
  if (!existsSync(filePath)) {
    return {
      success: false,
      error: `Local file not found: ${filePath}. Run export first.`,
    };
  }

  const localData = JSON.parse(readFileSync(filePath, 'utf-8'));
  const remoteData = await api.getResumeDetail(resumeId);

  const diff = compareResume(localData, remoteData);
  const sectionDiff = diff[section] || [];

  if (dryRun) {
    return {
      success: true,
      dry_run: true,
      section,
      changes: sectionDiff,
    };
  }

  const results = await syncResumeSections(
    api,
    resumeId,
    localData,
    remoteData,
    [section],
  );

  if (results.changes_applied > 0) {
    await api.saveResume(resumeId);
  }

  return {
    success: true,
    section,
    results,
    pdf_regenerated: results.changes_applied > 0,
  };
}

export default resumeSyncTool;
