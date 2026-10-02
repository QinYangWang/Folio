import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tokens, css } from '../scripts/theme.mjs';
assert.equal(Object.keys(tokens).length, 54);
const registry=JSON.parse(await readFile('public/r/folio.json','utf8'));
assert.deepEqual(registry.css,css,'Installed components must receive the exact application tokens and modes');
for (const file of ['src/styles.css','src/components/ui.tsx','src/App.tsx']) {
  const source=await readFile(file,'utf8');
  assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b/i, `${file} contains a hardcoded color`);
  assert.doesNotMatch(source, /(?:bg|text|ring|border)-(?:white|black|(?:neutral|orange|green|blue|red)-\d)/, `${file} contains a primitive utility`);
  assert.doesNotMatch(source, /invert\(/, `${file} inverts colors instead of using tokens`);
}
assert.equal(tokens['--text-color-kumo-brand'][0],'#f6821f');
assert.equal(tokens['--color-kumo-brand'][0],'oklch(0.5772 0.2324 260)');
console.log('PASS: 54 tokens, registry theme parity, semantic-only colors');
