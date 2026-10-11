// Generates the social image and app icons into /public.
// Run with: node scripts/gen-assets.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const INK = '#0f1b2d', SLATE = '#525e70', LINE = '#e2e6ec', ACCENT = '#2747e8';
const RAMP = ['#dfe5fd', '#b6c3fa', '#8399f3', '#4f6deb', '#2747e8'];
const font = "'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";

const mark = (x, y, s, c) => `
  <g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <rect x="1" y="14" width="4" height="7" rx="1" opacity=".35"/>
    <rect x="9" y="8" width="4" height="13" rx="1" opacity=".65"/>
    <rect x="17" y="1" width="4" height="20" rx="1"/>
  </g>`;

// Social image 1200x630
const dims = ['Knowledge', 'Evaluation', 'Governance', 'Improvement', 'Sovereignty', 'Value', 'People'];
const prof = [3, 2, 2, 1, 3, 2, 3];
const mx = 760, my = 150, colW = 70, rowH = 52, labW = 0;
let grid = '';
dims.forEach((d, r) => {
  const cy = my + r * rowH + rowH / 2;
  grid += `<line x1="${mx - 130}" x2="${mx + colW * 5}" y1="${my + r * rowH}" y2="${my + r * rowH}" stroke="${LINE}" stroke-width="1.5"/>`;
  grid += `<text x="${mx - 130}" y="${cy + 7}" font-family="${font}" font-size="20" font-weight="500" fill="${INK}">${d}</text>`;
  for (let l = 1; l <= 5; l++) {
    const cx = mx + labW + (l - 0.5) * colW;
    const on = l <= prof[r], at = l === prof[r];
    if (at) grid += `<circle cx="${cx}" cy="${cy}" r="15" fill="#fff" stroke="${ACCENT}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="10" fill="${ACCENT}"/>`;
    else grid += `<circle cx="${cx}" cy="${cy}" r="${on ? 7 : 6}" fill="${on ? RAMP[l - 1] : LINE}"/>`;
  }
});
grid += `<line x1="${mx - 130}" x2="${mx + colW * 5}" y1="${my + 7 * rowH}" y2="${my + 7 * rowH}" stroke="${LINE}" stroke-width="1.5"/>`;
const pts = prof.map((l, r) => `${mx + (l - 0.5) * colW},${my + r * rowH + rowH / 2}`).join(' ');
const line = `<polyline points="${pts}" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
const heads = [1, 2, 3, 4, 5].map((l) => `<text x="${mx + (l - 0.5) * colW}" y="${my - 16}" text-anchor="middle" font-family="${font}" font-size="18" font-weight="600" fill="${SLATE}">${l}</text>`).join('');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  ${mark(72, 70, 1.6, ACCENT)}
  <text x="120" y="98" font-family="${font}" font-size="26" font-weight="650" fill="${INK}">Agent Maturity Index</text>
  <text font-family="${font}" font-size="64" font-weight="700" letter-spacing="-2.4" fill="${INK}">
    <tspan x="72" y="250">Know where</tspan>
    <tspan x="72" y="322">your AI agents</tspan>
    <tspan x="72" y="394">really stand.</tspan>
  </text>
  <text x="72" y="470" font-family="${font}" font-size="24" fill="${SLATE}">7 dimensions. 5 levels. A Founding Cohort</text>
  <text x="72" y="504" font-family="${font}" font-size="24" fill="${SLATE}">of 30 enterprise AI leaders.</text>
  <text x="72" y="574" font-family="${font}" font-size="20" font-weight="600" fill="${ACCENT}">getsynos.ai/agent-maturity-index</text>
  <line x1="${mx + colW * 5}" x2="${mx + colW * 5}" y1="0" y2="0"/>
  ${heads}${grid}${line}
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile('public/og.png');

// Icons
const icon = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${bg ? 0 : 112}" fill="${ACCENT}"/>
  ${mark(118, 118, 12.5, '#ffffff')}
</svg>`;
await sharp(Buffer.from(icon(true))).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon(false))).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(Buffer.from(icon(false))).resize(512, 512).png().toFile('public/icon-512.png');

// favicon.ico = a single 32x32 PNG wrapped in an ICO header
const png32 = await sharp(Buffer.from(icon(false))).resize(32, 32).png().toBuffer();
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(png32.length, 14); head.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([head, png32]));

writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${ACCENT}"/><g transform="translate(5 5)" fill="#fff"><rect x="1" y="14" width="4" height="7" rx="1" opacity=".55"/><rect x="9" y="8" width="4" height="13" rx="1" opacity=".8"/><rect x="17" y="1" width="4" height="20" rx="1"/></g></svg>\n`);
console.log('assets written');
