import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'

const ENV_DIR = fileURLToPath(new URL('./env', import.meta.url))

export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, ENV_DIR) as ImportMetaEnv

  return {
    base: ENV.VITE_BASE_URL,
    envDir: ENV_DIR,
    plugins: [
      react(),
      AutoImport({
        imports: ['react', 'react-router'],
        dts: 'types/auto-imports.d.ts',
      }),
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
            react: ['react', 'react-dom', 'react-router'],
            antd: ['@ant-design/v5-patch-for-react-19', 'antd', '@ant-design/cssinjs'],
            'antd-pro': ['@ant-design/pro-components'],
            icons: ['@ant-design/icons'],
            utils: ['dayjs', 'zustand'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5166,
      proxy: {},
    },
  }
})
