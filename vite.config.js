import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === "production" 
//     ? "/Amazon-project-Clone-2025/" 
//     : "/",
// })

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Always use '/' for Netlify
})