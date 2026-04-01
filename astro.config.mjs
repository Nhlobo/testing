import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mapengoinnovations.co.za',
  integrations: [sitemap()],
});
