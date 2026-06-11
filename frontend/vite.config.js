import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Varmista että tämä vastaa teidän versiota

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Tämä sääntö nappaa VAIN ne pyynnöt, jotka alkavat /api
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
