import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/vanilla/',
  server: {
    port: 3001,
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../core/src/components'),
      '@lib': resolve(__dirname, '../core/src/lib'),
      '@kernel': resolve(__dirname, '../core/src/kernel'),
      '@mark': resolve(__dirname, '../extra/mark'),
      '@mark-styles': resolve(__dirname, '../extra/mark/styles'),
      '@mark-components': resolve(__dirname, '../extra/mark/components'),
      '@vc/core': resolve(__dirname, '../core/src'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs.html'),
        demo: resolve(__dirname, 'demo.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
});
