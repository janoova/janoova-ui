#!/usr/bin/env node

/**
 * create-janoova-app
 * Scaffolds a new project from the janoova-ui template.
 *
 * Usage:
 *   node scripts/create-janoova-app.mjs <project-name>
 *   node scripts/create-janoova-app.mjs my-new-site
 */

import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, basename, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { execSync, spawnSync } from 'child_process';

// ─── helpers ────────────────────────────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

const log = {
  info:    (msg) => console.log(`${c.cyan}  >${c.reset} ${msg}`),
  success: (msg) => console.log(`${c.green}  ✓${c.reset} ${msg}`),
  warn:    (msg) => console.log(`${c.yellow}  ⚠${c.reset} ${msg}`),
  error:   (msg) => console.log(`${c.red}  ✗${c.reset} ${msg}`),
  step:    (msg) => console.log(`\n${c.bold}${c.blue}  ${msg}${c.reset}`),
  dim:     (msg) => console.log(`${c.dim}    ${msg}${c.reset}`),
};

function prompt(rl, question, defaultValue = '') {
  const hint = defaultValue ? ` ${c.dim}(${defaultValue})${c.reset}` : '';
  return new Promise((resolve) => {
    rl.question(`  ${c.cyan}?${c.reset} ${question}${hint}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function promptSecret(question) {
  return new Promise((resolve) => {
    process.stdout.write(`  ${c.cyan}?${c.reset} ${question}: `);
    const stdin = process.stdin;
    const wasRaw = stdin.isRaw;
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    let input = '';
    const onData = (char) => {
      if (char === '\n' || char === '\r' || char === '\u0003') {
        stdin.setRawMode?.(wasRaw ?? false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(input);
      } else if (char === '\u007f') {
        if (input.length > 0) {
          input = input.slice(0, -1);
          process.stdout.write('\b \b');
        }
      } else {
        input += char;
        process.stdout.write('*');
      }
    };
    stdin.on('data', onData);
  });
}

// ─── copy directory (recursive, with exclusions) ─────────────────────────────

const EXCLUDE = new Set([
  'node_modules',
  '.git',
  '.next',
  '.DS_Store',
  '.env.local',
  '.env',
  '.vercel',
  'scripts', // don't copy the scaffolding scripts into the new project
]);

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (EXCLUDE.has(entry)) continue;
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_DIR = resolve(__dirname, '..'); // janoova-ui root

const projectName = process.argv[2];

console.log(`\n${c.bold}${c.magenta}  create-janoova-app${c.reset}\n`);

if (!projectName) {
  log.error('Please provide a project name.');
  log.dim('Usage: node scripts/create-janoova-app.mjs <project-name>');
  process.exit(1);
}

const targetDir = resolve(process.cwd(), projectName);

if (existsSync(targetDir)) {
  log.error(`Directory "${projectName}" already exists. Choose a different name or remove it first.`);
  process.exit(1);
}

const rl = createInterface({ input: process.stdin, output: process.stdout });

// ─── gather env values ────────────────────────────────────────────────────────

log.step('1/4  Project setup');
log.info(`Creating "${c.bold}${projectName}${c.reset}" from janoova-ui template\n`);

log.step('2/4  Environment variables');
log.dim('Press Enter to skip optional fields. You can fill them in .env.local later.\n');

const sanityProjectId  = await prompt(rl, 'Sanity Project ID');
const sanityToken      = await prompt(rl, 'Sanity Editor Token');
const resendApiKey     = await prompt(rl, 'Resend API Key (emails)');
const baseUrl          = await prompt(rl, 'Base URL', 'https://your-site.vercel.app');

rl.close();

// ─── copy template ────────────────────────────────────────────────────────────

log.step('3/4  Copying template files');
log.info(`Destination: ${c.dim}${targetDir}${c.reset}`);

try {
  copyDir(TEMPLATE_DIR, targetDir);
  log.success('Template copied');
} catch (err) {
  log.error(`Failed to copy template: ${err.message}`);
  process.exit(1);
}

// ─── write .env.local ─────────────────────────────────────────────────────────

const envLines = [
  `NEXT_PUBLIC_SANITY_PROJECT_ID = ${sanityProjectId}`,
  `SANITY_TOKEN = ${sanityToken}`,
  `NEXT_PUBLIC_SANITY_HOOK = revalidatewebhook`,
  `NEXT_PUBLIC_BASE_URL = ${baseUrl}`,
  ``,
  `# Resend (email)`,
  `RESEND_API_KEY = ${resendApiKey}`,
  ``,
  `# Below ones only needed locally`,
  `NEXT_PUBLIC_VERCEL_URL = "your-site.vercel.app"`,
  `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL = "your-site.vercel.app"`,
];

writeFileSync(join(targetDir, '.env.local'), envLines.join('\n') + '\n');
log.success('.env.local written');

// ─── update package.json name ─────────────────────────────────────────────────

const pkgPath = join(targetDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = projectName;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
log.success('package.json name updated');

// ─── npm install ──────────────────────────────────────────────────────────────

log.step('4/4  Installing dependencies');
log.dim('Running npm install — this may take a minute...\n');

const installResult = spawnSync('npm', ['install'], {
  cwd: targetDir,
  stdio: 'inherit',
  shell: true,
});

if (installResult.status !== 0) {
  log.error('npm install failed. Check the output above.');
  process.exit(1);
}

log.success('Dependencies installed');

// ─── optional: dataset import ─────────────────────────────────────────────────

console.log('');
const rl2 = createInterface({ input: process.stdin, output: process.stdout });

const importDataset = await new Promise((resolve) => {
  rl2.question(`  ${c.cyan}?${c.reset} Import Sanity dataset from janoova-ui now? ${c.dim}(y/N)${c.reset}: `, (ans) => {
    resolve(ans.trim().toLowerCase() === 'y');
  });
});
rl2.close();

if (importDataset) {
  log.step('Importing Sanity dataset');
  log.dim('First, export from the source project:\n');
  log.dim(`  cd ${TEMPLATE_DIR}`);
  log.dim('  npx sanity dataset export production master-template.tar.gz\n');

  const tarPath = join(TEMPLATE_DIR, 'master-template.tar.gz');
  if (!existsSync(tarPath)) {
    log.warn('master-template.tar.gz not found in janoova-ui root.');
    log.dim('Export it first, then run from your new project:');
    log.dim('  NODE_OPTIONS="--max-old-space-size=4096" npx sanity dataset import master-template.tar.gz production --replace');
  } else {
    log.info('Found master-template.tar.gz — importing...\n');
    const importResult = spawnSync(
      'node',
      ['--max-old-space-size=4096', 'node_modules/.bin/sanity', 'dataset', 'import', tarPath, 'production', '--replace'],
      { cwd: targetDir, stdio: 'inherit', shell: false }
    );
    if (importResult.status === 0) {
      log.success('Dataset imported');
    } else {
      log.warn('Dataset import failed — you can run it manually later.');
    }
  }
}

// ─── done — print checklist ───────────────────────────────────────────────────

console.log(`
${c.bold}${c.green}  Done! "${projectName}" is ready.${c.reset}

${c.bold}  Next steps:${c.reset}

  ${c.cyan}cd ${projectName}${c.reset}
  ${c.cyan}npm run dev${c.reset}
  Then open ${c.cyan}http://localhost:3000/studio${c.reset} and sign in.

${c.bold}  Manual steps remaining:${c.reset}

  ${c.yellow}Sanity dashboard (manage.sanity.io)${c.reset}
  [ ] Create CORS origins for your site URLs
  [ ] Create the revalidate webhook (after deploying to Vercel)

  ${c.yellow}Design${c.reset}
  [ ] Customize branding → /workspace/theme.js
  [ ] Replace favicon → /public/
  [ ] Update list-item checkmark in CSS

  ${c.yellow}Integrations${c.reset}
  [ ] Update general contact form email notification
  [ ] Update CTA data for blog posts

  ${c.yellow}Deployment (Vercel)${c.reset}
  [ ] Add all .env.local values as environment variables
  [ ] Set NEXT_PUBLIC_BASE_URL to your production domain
  [ ] Add domain to Sanity CORS after deploying
  [ ] Update revalidate webhook domain in Sanity
  [ ] Make sure "Disable Indexing" is ${c.bold}unchecked${c.reset} in Sanity Studio

  ${c.yellow}SEO${c.reset}
  [ ] Update robots.txt disallow rule

${c.dim}  Tip: run "git init && git add . && git commit -m 'Initial commit'" when ready.${c.reset}
`);
