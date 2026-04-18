import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: './',
  publicDir: './dist',
  plugins: [react()],
  preview: {
    port: 5173
  }
})
