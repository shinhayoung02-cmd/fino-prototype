import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seedDesignPlugin } from '@seed-design/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seedDesignPlugin({ colorMode: 'light-only' })],
  resolve: {
    alias: {
      'seed-design': path.resolve(import.meta.dirname, './seed-design'),
    },
  },
})
