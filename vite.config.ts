import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/trpc': {
        target: process.env.VITE_API_URL?.replace('/trpc', '') || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
