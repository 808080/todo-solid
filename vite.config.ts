import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    open: true
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});