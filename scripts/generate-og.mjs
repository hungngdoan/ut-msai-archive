/**
 * Generates the social-preview banner at public/og.png (1200x630).
 *
 * This is a build-time author tool, not a site dependency: the PNG it
 * produces is committed and served statically. Re-run with `npm run og`
 * after changing the wordmark, tagline, or palette.
 *
 * Requires the `sharp` devDependency to rasterize the SVG to PNG, because
 * Facebook / Messenger do not render SVG as an og:image.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og.png');

const BG = '#0f1318';
const INK = '#eef2f5';
const MUTED = '#a7b1bb';
const TEAL = '#2ce3c4';
const FRAME = '#283139';

// Flask mark reused from the favicon, scaled up.
const flask = `
  <g transform="translate(910 150) scale(4.6)">
    <path d="M26 14 h12 v2 h-2 v12 l9 18 a4 4 0 0 1 -3.6 5.7 H22.6 a4 4 0 0 1 -3.6 -5.7 l9 -18 V16 h-2 z"
          fill="none" stroke="${TEAL}" stroke-width="2.2" stroke-linejoin="round" opacity="0.95"/>
    <path d="M27.4 36 h9.2 l5.2 10.4 a2 2 0 0 1 -1.8 2.9 H24 a2 2 0 0 1 -1.8 -2.9 z" fill="#13b9a0"/>
    <circle cx="29.5" cy="44" r="1.4" fill="${TEAL}"/>
    <circle cx="34.5" cy="46" r="1" fill="${TEAL}"/>
  </g>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="${TEAL}" stroke-width="1" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="${FRAME}" stroke-width="2"/>

  ${flask}

  <!-- indicator dot + eyebrow -->
  <circle cx="98" cy="156" r="6" fill="${TEAL}"/>
  <text x="116" y="162" font-family="Consolas, 'Courier New', monospace" font-size="24"
        letter-spacing="4" fill="${MUTED}">MACHINE INTELLIGENCE LAB · MSAI · EST. 2026</text>

  <!-- wordmark -->
  <text x="90" y="330" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="118" letter-spacing="-1">
    <tspan fill="${INK}">The Lab</tspan><tspan fill="${TEAL}">oratory</tspan>
  </text>

  <!-- tagline -->
  <text x="94" y="402" font-family="'Segoe UI', Arial, sans-serif" font-size="40" fill="${MUTED}">
    A graduate AI lab notebook.
  </text>

  <!-- reactor accent bar -->
  <rect x="94" y="446" width="120" height="5" rx="2.5" fill="${TEAL}"/>

  <!-- footer url -->
  <text x="94" y="540" font-family="Consolas, 'Courier New', monospace" font-size="26" fill="${MUTED}">
    hungngdoan.github.io/ut-msai-archive
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${out}`);
