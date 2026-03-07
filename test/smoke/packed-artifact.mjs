import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fixtureTemplate = path.join(projectRoot, 'test/fixtures/packed-artifact');
const tempRoot = mkdtempSync(path.join(tmpdir(), 'slackblock-packed-artifact-'));
const fixtureRoot = path.join(tempRoot, 'fixture');
const distRoot = path.join(tempRoot, 'pack');
const npmCacheRoot = path.join(tempRoot, 'npm-cache');
const nodeModulesRoot = path.join(fixtureRoot, 'node_modules');

assert.ok(existsSync(path.join(projectRoot, 'dist/index.cjs')), 'dist/index.cjs must exist before packing');

cpSync(fixtureTemplate, fixtureRoot, {recursive: true});
mkdirSync(distRoot, {recursive: true});

const [tarballName] = JSON.parse(
  execFileSync('npm', ['pack', '--ignore-scripts', '--pack-destination', distRoot, '--json'], {
    cwd: projectRoot,
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: npmCacheRoot,
    },
  }),
);
const tarballPath = path.join(distRoot, tarballName.filename);

const packageJsonPath = path.join(fixtureRoot, 'package.json');
const packageJson = readFileSync(packageJsonPath, 'utf8').replace('__TARBALL__', tarballPath);
writeFileSync(packageJsonPath, packageJson);

if (process.env.CI) {
  execFileSync('pnpm', ['install', '--ignore-scripts'], {
    cwd: fixtureRoot,
    stdio: 'inherit',
  });
} else {
  mkdirSync(nodeModulesRoot, {recursive: true});
  execFileSync('tar', ['-xzf', tarballPath, '-C', fixtureRoot], {
    stdio: 'inherit',
  });
  renameSync(path.join(fixtureRoot, 'package'), path.join(nodeModulesRoot, 'slackblock'));
  mkdirSync(path.join(nodeModulesRoot, '@slack'), {recursive: true});
  cpSync(
    path.join(projectRoot, 'node_modules/@slack/types'),
    path.join(nodeModulesRoot, '@slack/types'),
    {recursive: true},
  );
}

execFileSync(process.execPath, [path.join(projectRoot, 'node_modules/typescript/bin/tsc'), '-p', path.join(fixtureRoot, 'tsconfig.json'), '--noEmit'], {
  cwd: projectRoot,
  stdio: 'inherit',
});

const output = execFileSync(process.execPath, ['smoke.mjs'], {
  cwd: fixtureRoot,
  encoding: 'utf8',
});

assert.match(output, /packed artifact smoke test passed/u);
