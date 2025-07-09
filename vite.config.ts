import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://bumitori.duckdns.org:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    allowedHosts: [
      'bumitori-web.onrender.com',
      'bumitori.kro.kr'
    ],
  }
})