import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/server/': {
        target: "https://fictional-palm-tree-wrvgr9gx6x9xhg649-3000.app.github.dev/",
        changeOrigin: true,
        secure: false

      }
    }
  },
  plugins: [react()],
  
})
