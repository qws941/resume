const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const AFFECTED_DIR = '.affected';
const AFFECTED_JSON = path.join(AFFECTED_DIR, 'affected_targets.json');
const TEST_TARGETS_FILE = path.join(AFFECTED_DIR, 'test_targets.txt');

// Map Bazel targets to NPM workspaces
const TARGET_TO_WORKSPACE = {
  '//typescript/portfolio-worker': 'typescript/portfolio-worker',
  '//typescript/job-automation': 'typescript/job-automation',
  '//typescript/cli': 'typescript/cli',
  '//typescript/data': 'typescript/data',
  // Add more mappings as needed
};

function runCommand(command) {
  console.log(`> ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (_error) {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

function main() {
  const task = process.argv[2] || 'test'; // 'test' or 'lint' or 'typecheck'

  if (!fs.existsSync(AFFECTED_JSON)) {
    console.log('No affected analysis found. Running for ALL workspaces.');
    runAll(task);
    return;
  }

  const analysis = JSON.parse(fs.readFileSync(AFFECTED_JSON, 'utf8'));

  if (analysis.has_build_changes) {
    console.log('Build configuration changed. Running for ALL workspaces.');
    runAll(task);
    return;
  }

  if (analysis.affected_targets_count === 0) {
    console.log('No affected targets found. Skipping.');
    return;
  }

  const testTargets = fs.readFileSync(TEST_TARGETS_FILE, 'utf8').split('\n').filter(Boolean);

  const affectedWorkspaces = new Set();

  testTargets.forEach((target) => {
    // Extract package part from target (e.g. //typescript/job-automation:test -> //typescript/job-automation)
    const packagePath = target.split(':')[0];

    if (TARGET_TO_WORKSPACE[packagePath]) {
      affectedWorkspaces.add(TARGET_TO_WORKSPACE[packagePath]);
    } else {
      // Try to find matching workspace by path prefix
      const workspace = Object.values(TARGET_TO_WORKSPACE).find(
        (ws) => packagePath.includes(ws) || (packagePath === '//tools' && ws === 'typescript/cli') // Map tools changes to CLI for now?
      );
      if (workspace) affectedWorkspaces.add(workspace);
    }
  });

  // Special handling for data changes affecting portfolio-worker
  // (affected.sh logic handles this via bazel query, so test_targets should already contain portfolio-worker if data changed)

  if (affectedWorkspaces.size === 0) {
    console.log('No affected workspaces found for testing.');
    return;
  }

  console.log(`Running ${task} for affected workspaces:`, [...affectedWorkspaces]);

  if (task === 'test') {
    // Run tests for each workspace
    for (const workspace of affectedWorkspaces) {
      // Check if workspace has a test script
      try {
        const pkgJson = require(path.resolve(workspace, 'package.json'));
        if (pkgJson.scripts && pkgJson.scripts.test) {
          runCommand(`npm run test --workspace=${workspace}`);
        } else {
          console.log(`Skipping ${workspace} (no test script)`);
        }
      } catch (_e) {
        console.warn(`Could not read package.json for ${workspace}`);
      }
    }
  } else if (task === 'lint' || task === 'typecheck') {
    // Lint/Typecheck can often be run for specific workspaces
    const workspacesFlag = [...affectedWorkspaces].map((ws) => `--workspace=${ws}`).join(' ');
    runCommand(`npm run ${task} ${workspacesFlag}`);
  } else {
    console.error(`Unknown task: ${task}`);
    process.exit(1);
  }
}

function runAll(task) {
  if (task === 'test') {
    // Root package.json "test" script is currently just job-automation.
    // We should probably run test:all or iterate all workspaces.
    // Given current root package.json, "npm run test" is limited.
    // Let's rely on standard workspace iteration.
    runCommand('npm run test --workspaces --if-present');
  } else {
    runCommand(`npm run ${task}`);
  }
}

main();
