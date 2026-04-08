#!/usr/bin/env node

/**
 * seed:import
 * Downloads the latest seed dataset from janoova-ui GitHub releases
 * and imports it into this project's Sanity dataset.
 *
 * Usage: npm run seed:import
 * Run from any project cloned from janoova-ui.
 */

import { createWriteStream, unlinkSync } from 'fs';
import { spawnSync } from 'child_process';
import { get as httpsGet } from 'https';
import { tmpdir } from 'os';
import { join } from 'path';

const SEED_URL = 'https://github.com/janoova/janoova-ui/releases/latest/download/master-template.tar.gz';

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

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath);
    const fetch = (u) => {
      httpsGet(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetch(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} — no seed release found at janoova-ui`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      }).on('error', reject);
    };
    fetch(url);
  });
}

console.log(`\n${c.bold}  janoova-ui seed import${c.reset}\n`);

const tarPath = join(tmpdir(), 'janoova-master-template.tar.gz');

log.step('1/2  Downloading seed dataset');
log.dim(`From: ${SEED_URL}\n`);

try {
  await download(SEED_URL, tarPath);
  log.success('Seed dataset downloaded');
} catch (err) {
  log.error(`Download failed: ${err.message}`);
  process.exit(1);
}

log.step('2/2  Importing into Sanity');
log.dim('This may take a minute...\n');

const result = spawnSync(
  'node',
  ['--max-old-space-size=4096', 'node_modules/.bin/sanity', 'dataset', 'import', tarPath, 'production', '--replace'],
  { cwd: process.cwd(), stdio: 'inherit', shell: false }
);

try { unlinkSync(tarPath); } catch {}

if (result.status === 0) {
  log.success('Dataset seeded successfully\n');
} else {
  log.error('Import failed — check the output above.\n');
  process.exit(1);
}
