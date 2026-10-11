import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at https://synos.in/ami from the synos.in repo. `npm run build` writes
// straight into ../../public/ami, which Vercel serves as committed.
export default defineConfig({
  site: 'https://synos.in',
  base: '/ami',
  outDir: '../../public/ami',
  trailingSlash: 'never',
  compressHTML: true,
  build: { inlineStylesheets: 'always', format: 'file' },
  integrations: [sitemap({ lastmod: new Date(), filter: (page) => !page.includes('/404') && !page.includes('/invite') })],
});
