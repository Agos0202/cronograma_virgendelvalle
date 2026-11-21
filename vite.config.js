import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona igual en GitHub Pages (subcarpeta), Netlify o cualquier hosting
export default defineConfig({
  base: './',
  plugins: [react()],
});
