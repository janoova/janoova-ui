#!/usr/bin/env node

/**
 * seed:export
 * Exports the Sanity dataset and uploads it as a GitHub release asset on janoova-ui.
 *
 * Usage: npm run seed:export
 * Requires: gh CLI authenticated (https://cli.github.com)
 */

import { spawnSync, execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';

const REPO = 'janoova/janoova-ui';
const RELEASE_TAG = 'seed';
const FILE = 'master-template.tar.gz';

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', cyan: '\x1b[36m', yellow: '\x1b[33m',
  red: '\x1b[31m', blue: '\x1b[34m',
};

const log = {
  info:    (msg) => console.log(`${c.cyan}  >${c.reset} ${msg}`),
  success: (msg) => console.log(`${c.green}  ✓${c.reset} ${msg}`),
  error:   (msg) => console.log(`${c.red}  ✗${c.reset} ${msg}`),
  step:    (msg) => console.log(`\n${c.bold}${c.blue}  ${msg}${c.reset}`),
  dim:     (msg) => console.log(`${c.dim}    ${msg}${c.reset}`),
};

console.log(`\n${c.bold}  janoova-ui seed export${c.reset}\n`);

// ─── check gh CLI is available ───────────────────────────────────────────────

const ghCheck = spawnSync('gh', ['--version'], { stdio: 'pipe' });
if (ghCheck.status !== 0) {
  log.error('gh CLI not found. Install it from https://cli.github.com then run: gh auth login');
  process.exit(1);
}

// ─── export dataset ──────────────────────────────────────────────────────────

log.step('1/2  Exporting Sanity dataset');
log.dim('This may take a minute...\n');

if (existsSync(FILE)) unlinkSync(FILE);

const exportResult = spawnSync(
  'npx', ['sanity', 'dataset', 'export', 'production', FILE],
  { stdio: 'inherit', shell: true }
);

if (exportResult.status !== 0 || !existsSync(FILE)) {
  log.error('Sanity export failed.');
  process.exit(1);
}

log.success(`${FILE} exported`);

// ─── upload to GitHub release ────────────────────────────────────────────────

log.step('2/2  Uploading to GitHub release');

// Check if the release already exists
const releaseCheck = spawnSync(
  'gh', ['release', 'view', RELEASE_TAG, '--repo', REPO],
  { stdio: 'pipe' }
);

if (releaseCheck.status === 0) {
  // Release exists — overwrite the asset
  log.info(`Updating existing release "${RELEASE_TAG}"...`);
  const upload = spawnSync(
    'gh', ['release', 'upload', RELEASE_TAG, FILE, '--repo', REPO, '--clobber'],
    { stdio: 'inherit' }
  );
  if (upload.status !== 0) {
    log.error('Upload failed.');
    process.exit(1);
  }
} else {
  // Create a new release
  log.info(`Creating release "${RELEASE_TAG}"...`);
  const create = spawnSync(
    'gh', ['release', 'create', RELEASE_TAG, FILE,
      '--repo', REPO,
      '--title', 'Seed Dataset',
      '--notes', 'Sanity seed dataset for new janoova-ui projects.',
      '--latest=false',
    ],
    { stdio: 'inherit' }
  );
  if (create.status !== 0) {
    log.error('Release creation failed.');
    process.exit(1);
  }
}

// Clean up local tar
try { unlinkSync(FILE); } catch {}

log.success('Done — seed dataset is live on GitHub.\n');
log.dim('New projects will automatically download it during scaffolding.');
console.log('');
