
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Define a base como './' para que o build funcione em qualquer subdiretório (como no GitHub Pages)
  base: './',
  plugins: [react()],
  define: {
    // Permite que o código acesse process.env de forma segura durante o build do Vite
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  }
});
