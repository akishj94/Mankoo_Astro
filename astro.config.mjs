
// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

const env = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

export default defineConfig({
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: env.PUBLIC_SANITY_API_VERSION,
      useCdn: false,
    }),
  ],
});
