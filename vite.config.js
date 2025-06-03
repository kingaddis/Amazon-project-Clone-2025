

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === "production" 
//     ? "/Amazon-project-Clone-2025/" 
//     : "/",
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   publicDir: 'public', // Ensure this points to your public folder
// })

export default defineConfig({
  plugins: [react({
    // Auto-inject script in dev mode
    jsxRuntime: 'automatic',
  })],
})