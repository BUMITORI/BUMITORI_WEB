import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backendUrl = process.env.VITE_BACKEND_URL || 'https://back-bumitori.jamkris.kro.kr';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      [backendUrl]: {
        target: backendUrl,
        changeOrigin: true
      }
    }
  }
})
