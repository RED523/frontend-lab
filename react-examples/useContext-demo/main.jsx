import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 获取根元素
const container = document.getElementById('root')
const root = createRoot(container)

// 渲染应用
root.render(<App />)
