import { defineConfig } from 'taze'

export default defineConfig({
  exclude: ['react', 'react-dom', '@types/react', '@types/react-dom'],
  recursive: true,
  force: true,
  write: true,
  install: true,
})
