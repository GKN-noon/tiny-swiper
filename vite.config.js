
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {   //兼容less文件,antd<5.x版本以前自定义主题会遇到这个问题
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },
  server: {
    port: 9000,
    host: 'localhost',
  },
  strictPort: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})