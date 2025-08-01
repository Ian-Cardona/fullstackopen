import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['spec/**/*.spec.{js,jsx,ts,tsx}']
  },
  server: {
    allowedHosts: ['app']
  },
})