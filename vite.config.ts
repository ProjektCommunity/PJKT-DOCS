import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Allow all ngrok hosts
    allowedHosts: ['.ngrok-free.app', '.ngrok.io']
  }
})