import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at https://www.getsynos.ai/agent-maturity-index from the synos.in repo. `npm run build` writes
// straight into ../../public/agent-maturity-index, which Vercel serves as committed.
export default defineConfig({
  site: 'https://www.getsynos.ai',
  base: '/agent-maturity-index',
  outDir: '../../public/agent-maturity-index',
  trailingSlash: 'never',
  compressHTML: true,
  build: { inlineStylesheets: 'always', format: 'file' },
  integrations: [sitemap({
    lastmod: new Date(),
    filter: (page) => !page.includes('/404') && !page.includes('/invite'),
    // List each page at its canonical URL, which has no trailing slash.
    serialize: (item) => ({ ...item, url: item.url.replace(/\/$/, '') }),
  })],
});
