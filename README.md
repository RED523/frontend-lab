# 🧪 Frontend Lab

> 前端技术实验室 - 集中管理各种前端实验代码

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/89612148-b633-45be-b362-e7bc84aaa2e2/deploy-status)](https://app.netlify.com/projects/frontend-lab/deploys)

## 📖 项目简介

Frontend Lab 是一个前端技术实验室，旨在集中管理和展示各种前端实验代码。这里包含了原生 JavaScript、Vue、React、CSS 特效、工具函数等多个方面的实验项目，帮助开发者学习、验证和分享前端技术。

### 🎯 创作初衷

- **学习记录**: 记录平时学习过程中的代码实验和验证
- **技术验证**: 验证新想法、新技术在实际项目中的应用
- **知识沉淀**: 将零散的前端知识点系统化整理
- **经验分享**: 与社区分享实用的代码片段和解决方案

## 🗂️ 项目结构

```
frontend-lab/
├── README.md                    # 项目说明文档
├── index.html                   # 项目首页
├── package.json                 # 项目配置
├── vite.config.js              # Vite 配置
├── .eslintrc.js                # ESLint 配置
├── .prettierrc                 # Prettier 配置
├── .editorconfig               # 编辑器配置
├── .gitignore                  # Git 忽略文件
├── scripts/                    # 工具脚本
│   └── generate-index.js       # 自动生成索引脚本
├── vanilla-js/                 # 原生 JavaScript 实验
│   └── debounce/               # 防抖函数演示
│       ├── index.html
│       ├── debounce.js
│       └── README.md
├── vue-examples/               # Vue 实验项目
│   └── vue3-reactive/          # Vue 3 响应式系统
│       ├── index.html
│       ├── main.js
│       ├── App.vue
│       └── README.md
├── react-examples/             # React 实验项目
│   └── useContext-demo/        # useContext Hook 演示
│       ├── index.html
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── README.md
├── css-tricks/                 # CSS 特效实验
│   └── glassmorphism/          # 毛玻璃效果
│       ├── index.html
│       └── README.md
└── utils/                      # 工具函数库
    ├── date-utils.js           # 日期处理工具
    └── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 启动 Vite 开发服务器
npm run dev

# 或
pnpm dev
```

### 构建项目

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📚 实验项目

### 🔧 原生 JavaScript

#### [Debounce 防抖函数](./vanilla-js/debounce/)
- **功能**: 演示防抖函数的实现和应用场景
- **知识点**: 防抖原理、事件处理、性能优化
- **特色**: 交互式演示、搜索框防抖、按钮点击防抖

### ⚡ Vue 3

#### [Vue 3 响应式系统](./vue-examples/vue3-reactive/)
- **功能**: 全面演示 Vue 3 的响应式 API 和 Composition API
- **知识点**: ref、reactive、computed、watch、响应式原理
- **特色**: 多种响应式数据演示、计算属性链式调用、侦听器应用

### ⚛️ React

#### [useContext Hook 演示](./react-examples/useContext-demo/)
- **功能**: 演示 React Context API 和 useContext Hook 的使用
- **知识点**: Context 创建、Provider 使用、自定义 Hook、状态管理
- **特色**: 多 Context 组合、主题切换、用户状态管理、待办事项

### 🎨 CSS 特效

#### [Glassmorphism 毛玻璃效果](./css-tricks/glassmorphism/)
- **功能**: 展示现代 CSS 毛玻璃设计风格
- **知识点**: backdrop-filter、半透明背景、视觉效果
- **特色**: 多种毛玻璃变体、交互式参数调整、3D 悬停效果

### 🛠️ 工具函数

#### [日期处理工具](./utils/date-utils.js)
- **功能**: 提供常用的日期处理、格式化、计算功能
- **特色**: 完整的日期操作 API、中文本地化、类型安全

## 🛠️ 开发工具

### 代码质量

- **ESLint**: 代码规范和错误检查
- **Prettier**: 代码格式化
- **EditorConfig**: 编辑器配置统一

### 构建工具

- **Vite**: 快速的构建工具和开发服务器
- **ESM**: 现代 JavaScript 模块系统

### 脚本工具

- **generate-index.js**: 自动扫描目录生成索引
- **开发脚本**: 支持 lint、format、build 等操作

## 📖 使用指南

### 本地开发

1. 克隆项目到本地
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
   或者你也可以运行任意示例，eg：
    ```bash
    # 运行 Vue3 响应式示例
    DEMO_PATH=vue-examples/vue3-reactive npm dev

    # 运行 React Context 示例
    DEMO_PATH=react-examples/useContext-demo npm dev

    # 运行防抖函数示例
    DEMO_PATH=vanilla-js/debounce npm dev

    # 运行玻璃拟态效果示例
    DEMO_PATH=css-tricks/glassmorphism npm dev
    ```
4. 在浏览器中访问 `http://localhost:3000`

### 添加新实验

1. 在对应分类目录下创建新文件夹
2. 编写实验代码和说明文档
3. 更新主 README 的索引
4. 运行 `npm run generate-index` 更新索引

### 代码规范

- 使用 ES6+ 语法
- 遵循 ESLint 和 Prettier 配置
- 编写清晰的注释和文档
- 保持代码简洁和可读性

## 🌐 在线预览

项目支持部署到各种静态托管平台：

- **GitHub Pages**: 自动部署 GitHub 仓库
- **Vercel**: 零配置部署
- **Netlify**: 持续部署
- **自建服务器**: 静态文件托管

## 🤝 贡献指南

欢迎贡献代码和想法！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 作者：keteng
- 项目地址：[https://frontend-lab.netlify.app/](https://frontend-lab.netlify.app/)
- 问题反馈：[Issues](https://github.com/RED523/frontend-lab/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
