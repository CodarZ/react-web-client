import { URL, fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {},
  css: {
    preprocessorOptions: {},
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd'],
          icons: ['@ant-design/icons'],
          'antd-pro': ['@ant-design/pro-components'],
          utils: ['axios', 'radash', 'dayjs'],
          tools: ['ahooks', 'zustand', 'zod'],
          react: ['react', 'react-dom'],
          tanstack: ['@tanstack/react-query', '@tanstack/react-router'],
        },
      },
    },
  },
});
