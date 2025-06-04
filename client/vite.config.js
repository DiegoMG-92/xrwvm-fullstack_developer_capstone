import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/static/', // ✅ This ensures assets load correctly in Django
  plugins: [react()],
})