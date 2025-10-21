import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode, command }) => {
  const base = command == 'build' ? '/frontend-lab/' : '/'
  const demoPath = process.env.DEMO_PATH

  console.log('base==>', base);
  console.log('mode==>', mode);


  // 规范化 open 路径：
  // - 若传入的是文件（含扩展名），按文件打开
  // - 若传入的是目录，则追加 /index.html
  const normalizedOpen = (() => {
    if (!demoPath) return true // 默认打开浏览器首页
    const cleaned = demoPath.replace(/^\/+/, '') // 去掉开头的 /，即：'/vue-examples/vue3-reactive' → 'vue-examples/vue3-reactive'
    const hasExt = /\.[a-zA-Z0-9]+$/.test(cleaned) // 判断是文件还是目录。文件一般会有扩展名，如 .html、.htm、.php 等等
    const target = hasExt ? cleaned : `${cleaned.replace(/\/+$/, '')}/index.html` // 若为文件则直接使用，否则是目录，去掉目录结尾的/，然后在末尾加上 /index.html
    // return `${base}${target}`
    return `/${target}` // 拼接 base 路径返回完整路径
  })()

  // 获取所有 demo 的入口文件
  const getInput = () => {
    const entries = {}
    const demoFolders = ['vanilla-js/*', 'vue-examples/*', 'react-examples/*', 'css-tricks/*', 'utils/*']

    demoFolders.forEach(folder => {
      const files = glob.sync(path.resolve(__dirname, folder, 'index.html'))
      files.forEach(file => {
        const relativePath = path.relative(__dirname, file)
        const name = path.dirname(relativePath)
        entries[name] = file
      })
    })

    // 添加根目录的 index.html
    entries['main'] = path.resolve(__dirname, 'index.html')
    return entries
  }

  return {
    plugins: [vue(), react()],
    // base: './',
    base,
    server: {
      port: 3000,
      open: normalizedOpen
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: getInput(),
        output: {
          // 根据入口文件名生成对应的目录结构
          entryFileNames: '[name]/[name].[hash].js',
          chunkFileNames: 'chunks/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
})
