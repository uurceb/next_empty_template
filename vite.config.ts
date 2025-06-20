import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@core': resolve(__dirname, './src/@core'),
      '@layouts': resolve(__dirname, './src/@layouts'),
      '@menu': resolve(__dirname, './src/@menu'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@configs': resolve(__dirname, './src/configs'),
      '@views': resolve(__dirname, './src/views'),
    },
  },
  server: {
    port: 3000,
  },
})