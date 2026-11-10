import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Use Render's PORT variable, fallback to MEADOW_PORT, then 4389
const port = process.env.PORT || process.env.MEADOW_PORT || '4389';
// Bind to 0.0.0.0 so Render's external scanner can detect the port
const host = '0.0.0.0'; 

const child = spawn(
  process.execPath, 
  [
    path.join(root, 'app/tools/preview-chain-site.mjs'), 
    path.join(root, 'dist/server/index.js'), 
    port,
    host
  ],
  {
    cwd: root,
    stdio: 'inherit',
    env: process.env
  }
);

child.on('error', () => {
  console.error('Could not start the local server. Use Node.js 22.13+ and run npm ci first.');
  process.exitCode = 1;
});

child.on('exit', code => {
  process.exitCode = code ?? 1;
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}