import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Single-page site: GSAP + Lenis + Framer Motion ship together by design.
  build: { chunkSizeWarningLimit: 700 },
})
