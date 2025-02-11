import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Allow all ngrok hosts
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
    proxy: {
      '/api': {
        target: 'https://api.projektcommunity.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})