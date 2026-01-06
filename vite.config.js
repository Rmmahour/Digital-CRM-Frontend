import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // API calls ke liye
      '/api': {
        target: 'https://digitalcrm.abacusdesk.com',
        changeOrigin: true,
        secure: true,
      },
      // Socket.IO ke liye
      '/socket.io': {
        target: 'https://digitalcrm.abacusdesk.com',
        changeOrigin: true,
        secure: true,
        ws: true,  // WebSocket support
      }
    },
  },
})
