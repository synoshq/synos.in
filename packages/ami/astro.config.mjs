import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at https://synos.in/agent-maturity-index from the synos.in repo. `npm run build` writes
// straight into ../../public/agent-maturity-index, which Vercel serves as committed.
export default defineConfig({
  site: 'https://synos.in',
  base: '/agent-maturity-index',
  outDir: '../../public/agent-maturity-index',
  trailingSlash: 'never',
  compressHTML: true,
  build: { inlineStylesheets: 'always', format: 'file' },
  integrations: [sitemap({ lastmod: new Date(), filter: (page) => !page.includes('/404') && !page.includes('/invite') })],
});
