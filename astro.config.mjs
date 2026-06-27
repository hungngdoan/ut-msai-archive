// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// This repo is a GitHub Pages *project* site, served at:
//   https://hungngdoan.github.io/ut-msai-archive/
// So `site` is the user origin and `base` is the repo name.
// If you later move to a custom domain or a `<user>.github.io` repo,
// set base to '/' and update `site` accordingly.
export default defineConfig({
  site: 'https://hungngdoan.github.io',
  base: '/ut-msai-archive',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    // Cast sidesteps a known type-only skew between Astro's bundled vite and
    // @tailwindcss/vite's vite. Has no runtime effect.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
