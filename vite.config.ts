import { URL, fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

const ENV_DIR = fileURLToPath(new URL('./env', import.meta.url));

// // https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, ENV_DIR) as ImportMetaEnv;

  return {
    base: ENV.VITE_BASE_URL,
    envDir: ENV_DIR,
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
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            antd: ['antd'],
            icons: ['@ant-design/icons'],
            utils: ['axios', 'radash', 'dayjs', 'nprogress'],
            tools: ['ahooks', 'zustand', 'zod'],
            react: ['react', 'react-dom'],
            tanstack: ['@tanstack/react-query', '@tanstack/react-router'],
          },
        },
      },
    },
  };
});
