import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.mapengoinnovations.co.za',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
