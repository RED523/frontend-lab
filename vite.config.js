import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const base = command === 'build' ? '/frontend-lab/' : '/'
  const demoPath = process.env.DEMO_PATH

  // 规范化 open 路径：
  // - 若传入的是文件（含扩展名），按文件打开
  // - 若传入的是目录，则追加 /index.html
  const normalizedOpen = (() => {
    if (!demoPath) return true // 默认打开浏览器首页
    const cleaned = demoPath.replace(/^\/+/, '') // 去掉开头的 /，即：'/vue-examples/vue3-reactive' → 'vue-examples/vue3-reactive'
    const hasExt = /\.[a-zA-Z0-9]+$/.test(cleaned) // 判断是文件还是目录。文件一般会有扩展名，如 .html、.htm、.php 等等
    const target = hasExt ? cleaned : `${cleaned.replace(/\/+$/, '')}/index.html` // 若为文件则直接使用，否则是目录，去掉目录结尾的/，然后在末尾加上 /index.html
    return `${base}${target}` // 拼接 base 路径返回完整路径
  })()

  return {
    plugins: [vue(), react()],
    base,
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
