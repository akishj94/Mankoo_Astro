// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
      projectId: 'jsvhl0m3',
      dataset: 'production',
      apiVersion: '2026-10-26',
      useCdn: true,
  }),]
});