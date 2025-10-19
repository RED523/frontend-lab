import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const demoPath = process.env.DEMO_PATH

  // 规范化 open 路径：
  // - 若传入的是文件（含扩展名），按文件打开
  // - 若传入的是目录，则追加 /index.html
  const normalizedOpen = (() => {
    if (!demoPath) return true
    const cleaned = demoPath.replace(/^\/+/, '')
    const hasExt = /\.[a-zA-Z0-9]+$/.test(cleaned)
    const target = hasExt ? cleaned : `${cleaned.replace(/\/+$/, '')}/index.html`
    return `/${target}`
  })()

  return {
    plugins: [vue(), react()],
    server: {
      port: 3000,
      open: normalizedOpen
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})
