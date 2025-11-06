#!/usr/bin/env node

/**
 * 自动生成项目索引脚本
 * 扫描项目目录，生成包含所有实验项目的索引文件
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// 项目分类配置
const categories = {
  'vanilla-js': {
    name: '原生 JavaScript',
    description: '原生 JavaScript 实验和工具函数',
    icon: '🔧',
    color: '#f7df1e'
  },
  'vue-examples': {
    name: 'Vue 实验',
    description: 'Vue.js 相关实验和示例',
    icon: '⚡',
    color: '#4FC08D'
  },
  'react-examples': {
    name: 'React 实验',
    description: 'React 相关实验和示例',
    icon: '⚛️',
    color: '#61DAFB'
  },
  'css-tricks': {
    name: 'CSS 特效',
    description: 'CSS 动画、特效和布局实验',
    icon: '🎨',
    color: '#1572B6'
  },
  // http 相关
  'http-examples': {
    name: 'HTTP 实验',
    description: 'HTTP 相关实验和示例',
    icon: '🌐',
    color: '#007BFF'
  },
  'utils': {
    name: '工具函数',
    description: '可复用的工具函数库',
    icon: '🛠️',
    color: '#6C757D'
  }
}

/**
 * 扫描目录获取所有实验项目
 */
function scanProjects() {
  const projects = []

  for (const [category, config] of Object.entries(categories)) {
    const categoryPath = path.join(projectRoot, category)

    if (!fs.existsSync(categoryPath)) {
      continue
    }

    const items = fs.readdirSync(categoryPath, { withFileTypes: true })

    for (const item of items) {
      if (item.isDirectory()) {
        const projectPath = path.join(categoryPath, item.name)
        const project = scanProject(projectPath, category, config)
        if (project) {
          projects.push(project)
        }
      } else if (item.isFile() && category === 'utils') {
        // utils 目录下的文件也作为项目
        const filePath = path.join(categoryPath, item.name)
        const project = scanUtilsFile(filePath, category, config)
        if (project) {
          projects.push(project)
        }
      }
    }
  }

  return projects
}

/**
 * 扫描单个项目目录
 */
function scanProject(projectPath, category, config) {
  const projectName = path.basename(projectPath)
  const readmePath = path.join(projectPath, 'README.md')
  const indexPath = path.join(projectPath, 'index.html')

  // 检查是否有 README.md
  if (!fs.existsSync(readmePath)) {
    console.warn(`⚠️  项目 ${projectName} 缺少 README.md 文件`)
    return null
  }

  // 读取 README.md 获取项目信息
  const readmeContent = fs.readFileSync(readmePath, 'utf-8')
  const projectInfo = parseReadme(readmeContent)

  return {
    name: projectName,
    title: projectInfo.title || projectName,
    description: projectInfo.description || '暂无描述',
    category,
    categoryConfig: config,
    path: path.relative(projectRoot, projectPath),
    hasIndex: fs.existsSync(indexPath),
    indexPath: fs.existsSync(indexPath) ? path.relative(projectRoot, indexPath) : null,
    readmePath: path.relative(projectRoot, readmePath),
    lastModified: fs.statSync(projectPath).mtime,
    ...projectInfo
  }
}

/**
 * 扫描工具函数文件
 */
function scanUtilsFile(filePath, category, config) {
  const fileName = path.basename(filePath, '.js')
  const readmePath = path.join(path.dirname(filePath), 'README.md')

  // 尝试从文件内容中提取信息
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const fileInfo = parseJsFile(fileContent)

  return {
    name: fileName,
    title: fileInfo.title || fileName,
    description: fileInfo.description || '工具函数文件',
    category,
    categoryConfig: config,
    path: path.relative(projectRoot, filePath),
    hasIndex: false,
    indexPath: null,
    readmePath: fs.existsSync(readmePath) ? path.relative(projectRoot, readmePath) : null,
    lastModified: fs.statSync(filePath).mtime,
    isUtilsFile: true,
    ...fileInfo
  }
}

/**
 * 解析 README.md 文件获取项目信息
 */
function parseReadme(content) {
  const lines = content.split('\n')
  const info = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // 提取标题
    if (line.startsWith('# ') && !info.title) {
      info.title = line.substring(2).trim()
    }

    // 提取描述
    if (line.startsWith('## 功能说明') || line.startsWith('## 功能描述')) {
      let description = ''
      for (let j = i + 1; j < lines.length; j++) {
        const descLine = lines[j].trim()
        if (descLine.startsWith('##') || descLine.startsWith('#')) {
          break
        }
        if (descLine) {
          description += descLine + ' '
        }
      }
      info.description = description.trim()
    }

    // 提取知识点
    if (line.startsWith('## 知识点')) {
      const knowledgePoints = []
      for (let j = i + 1; j < lines.length; j++) {
        const pointLine = lines[j].trim()
        if (pointLine.startsWith('##') || pointLine.startsWith('#')) {
          break
        }
        if (pointLine.startsWith('- ')) {
          knowledgePoints.push(pointLine.substring(2).trim())
        }
      }
      if (knowledgePoints.length > 0) {
        info.knowledgePoints = knowledgePoints
      }
    }
  }

  return info
}

/**
 * HTML 转义，避免生成的 index.html 被 Vite html-proxy 转成 JS 时出现反引号/标签导致的语法错误
 */
function htmlEscape(text) {
  if (text == null) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 反引号用于模板字符串，必须转义为实体，避免 Vite 将 HTML 包装到模板字符串时出错
    .replace(/`/g, '&#96;')
}

/**
 * 解析 JavaScript 文件获取信息
 */
function parseJsFile(content) {
  const info = {}

  // 提取文件开头的注释
  const commentMatch = content.match(/\/\*\*[\s\S]*?\*\//)
  if (commentMatch) {
    const comment = commentMatch[0]
    const titleMatch = comment.match(/\*\s*@title\s+(.+)/)
    const descMatch = comment.match(/\*\s*@description\s+(.+)/)

    if (titleMatch) {
      info.title = titleMatch[1].trim()
    }
    if (descMatch) {
      info.description = descMatch[1].trim()
    }
  }

  // 如果没有找到注释信息，尝试从函数名推断
  if (!info.title) {
    const functionMatches = content.match(/export\s+(?:function|const)\s+(\w+)/g)
    if (functionMatches) {
      const functions = functionMatches.map(match =>
        match.replace(/export\s+(?:function|const)\s+/, '')
      )
      info.title = `${functions[0]} 等 ${functions.length} 个函数`
      info.description = `包含 ${functions.join(', ')} 等工具函数`
    }
  }

  return info
}

/**
 * 生成 HTML 索引页面
 */
function generateHtmlIndex(projects) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frontend Lab - 前端技术实验室</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 60px;
      color: white;
    }

    .header h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .header p {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 40px 0;
      flex-wrap: wrap;
    }

    .stat-item {
      text-align: center;
      color: white;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      display: block;
    }

    .stat-label {
      font-size: 1rem;
      opacity: 0.8;
    }

    .categories {
      display: grid;
      gap: 30px;
    }

    .category {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .category-header {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    }

    .category-icon {
      font-size: 2rem;
      margin-right: 15px;
    }

    .category-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
    }

    .category-description {
      color: #666;
      margin-top: 5px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .project-card {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 15px;
      padding: 15px;
      height: auto;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-color: #667eea;
    }

    .project-title {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 2px;
    }

    .project-description {
      color: #666;
      line-height: 1.5;
      margin-bottom: 15px;
      max-height: 20px;
      overflow: hidden;
    }

    .project-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: #999;
    }

    .project-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .project-link:hover {
      text-decoration: underline;
    }

    .footer {
      text-align: center;
      margin-top: 60px;
      padding: 30px;
      color: white;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.5rem;
      }

      .stats {
        gap: 20px;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>🧪 Frontend Lab</h1>
      <p>前端技术实验室 - 集中管理各种前端实验代码</p>
    </header>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-number">${projects.length}</span>
        <span class="stat-label">实验项目</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${Object.keys(categories).length}</span>
        <span class="stat-label">技术分类</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${projects.filter(p => p.hasIndex).length}</span>
        <span class="stat-label">可运行项目</span>
      </div>
    </div>

    <div class="categories">
      ${Object.entries(categories).map(([categoryKey, categoryConfig]) => {
        const categoryProjects = projects.filter(p => p.category === categoryKey)
        if (categoryProjects.length === 0) return ''

        return `
          <div class="category">
            <div class="category-header">
              <span class="category-icon">${categoryConfig.icon}</span>
              <div>
                <div class="category-title">${htmlEscape(categoryConfig.name)}</div>
                <div class="category-description">${htmlEscape(categoryConfig.description)}</div>
              </div>
            </div>
            <div class="projects-grid">
              ${categoryProjects.map(project => `
                <div class="project-card">
                  <div class="project-title">${htmlEscape(project.title)}</div>
                  <div class="project-description">${htmlEscape(project.description)}</div>
                  <div class="project-meta">
                    <span>${project.lastModified.toLocaleDateString()}</span>
                    ${project.hasIndex ? `<a href="${project.indexPath}" class="project-link">查看演示 →</a>` : '<span style="color: #999;">暂无演示</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `
      }).join('')}
    </div>

    <footer class="footer">
      <p>最后更新: ${new Date().toLocaleString()}</p>
      <p>使用 <code>npm run generate-index</code> 重新生成此页面</p>
    </footer>
  </div>
</body>
</html>`

  return html
}

/**
 * 生成 JSON 索引文件
 */
function generateJsonIndex(projects) {
  const index = {
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    totalProjects: projects.length,
    categories: Object.keys(categories).length,
    runnableProjects: projects.filter(p => p.hasIndex).length,
    projects: projects.map(project => ({
      name: project.name,
      title: project.title,
      description: project.description,
      category: project.category,
      path: project.path,
      hasIndex: project.hasIndex,
      indexPath: project.indexPath,
      readmePath: project.readmePath,
      lastModified: project.lastModified.toISOString(),
      knowledgePoints: project.knowledgePoints || []
    })),
    categories: categories
  }

  return JSON.stringify(index, null, 2)
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 扫描项目目录...')

  const projects = scanProjects()
  console.log(`✅ 发现 ${projects.length} 个项目`)

  // 生成 HTML 索引
  console.log('📝 生成 HTML 索引...')
  const htmlIndex = generateHtmlIndex(projects)
  fs.writeFileSync(path.join(projectRoot, 'index.html'), htmlIndex, 'utf-8')

  // 生成 JSON 索引
  console.log('📄 生成 JSON 索引...')
  const jsonIndex = generateJsonIndex(projects)
  fs.writeFileSync(path.join(projectRoot, 'index.json'), jsonIndex, 'utf-8')

  // 生成统计信息
  const stats = {
    total: projects.length,
    byCategory: {},
    runnable: projects.filter(p => p.hasIndex).length
  }

  for (const project of projects) {
    if (!stats.byCategory[project.category]) {
      stats.byCategory[project.category] = 0
    }
    stats.byCategory[project.category]++
  }

  console.log('\n📊 项目统计:')
  console.log(`   总项目数: ${stats.total}`)
  console.log(`   可运行: ${stats.runnable}`)
  console.log('   分类统计:')
  for (const [category, count] of Object.entries(stats.byCategory)) {
    console.log(`     ${categories[category].icon} ${categories[category].name}: ${count}`)
  }

  console.log('\n✅ 索引生成完成!')
  console.log('   📄 HTML 索引: index.html')
  console.log('   📄 JSON 索引: index.json')
}

// 运行主函数
main()
