import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site multi-pages : une entrée HTML par page.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        devis: resolve(import.meta.dirname, 'devis.html'),
      },
    },
  },
});
