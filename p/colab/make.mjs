#!/usr/bin/env node
// Genera una propuesta web personalizada por colaborador desde _template.html.
// Uso: node make.mjs datos.json  →  escribe p/colab/<slug>/index.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(process.argv[2], 'utf8'));

const defaults = {
  ACCENT: '#C6FF3D',
  ACCENT_DIM: '#8FBE1F',
  CURRENCY: '€',
  BRAND_FOOTER: 'Quantum Ventures',
  CAL_URL: '#',
};
const vars = { ...defaults, ...data };
if (!vars.slug || !vars.COLLAB_NAME) throw new Error('faltan slug / COLLAB_NAME');

let html = readFileSync(join(here, '_template.html'), 'utf8');
const missing = [];
html = html.replace(/\{\{([A-Z_0-9]+)\}\}/g, (_, k) => {
  if (vars[k] == null) { missing.push(k); return ''; }
  return vars[k];
});
if (missing.length) console.warn('⚠️ placeholders sin valor:', [...new Set(missing)].join(', '));

const out = join(here, vars.slug, 'index.html');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log('✅', out);
