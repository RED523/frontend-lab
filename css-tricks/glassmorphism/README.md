# Glassmorphism 毛玻璃效果演示

## 功能说明

这个示例全面展示了现代 CSS 中的 Glassmorphism（毛玻璃）设计风格，包括多种效果变体和交互式控制。

## 知识点

### 1. 核心 CSS 属性
- **backdrop-filter**: 对元素背景进行模糊、饱和度等滤镜处理
- **rgba()**: 创建半透明背景色
- **box-shadow**: 创建阴影和内阴影效果
- **border**: 使用半透明边框增强玻璃感

### 2. 毛玻璃效果变体
- **基础毛玻璃**: 标准的半透明 + 模糊效果
- **渐变毛玻璃**: 结合渐变背景的毛玻璃
- **彩虹毛玻璃**: 多彩渐变背景的创意效果
- **发光毛玻璃**: 添加发光效果的毛玻璃

### 3. 视觉效果增强
- **动态背景**: 使用 CSS 动画创建动态背景
- **浮动元素**: 添加浮动装饰元素
- **悬停效果**: 鼠标悬停时的 3D 变换
- **响应式设计**: 适配不同屏幕尺寸

### 4. 交互式控制
- **实时参数调整**: 通过滑块控制模糊强度和透明度
- **代码实时更新**: 显示当前效果的 CSS 代码
- **鼠标跟随效果**: 3D 倾斜效果跟随鼠标移动

## 技术亮点

- 纯 CSS 实现，无需 JavaScript 框架
- 支持现代浏览器的 backdrop-filter 属性
- 提供降级方案（-webkit- 前缀）
- 交互式参数调整
- 代码示例实时更新

## 核心代码

### 基础毛玻璃效果
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### 动态背景
```css
.background::before {
  background: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  animation: backgroundShift 20s ease-in-out infinite;
}
```

### 3D 悬停效果
```css
.glass-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
```

## 浏览器兼容性

- **Chrome**: 76+ (完全支持)
- **Firefox**: 103+ (完全支持)
- **Safari**: 9+ (需要 -webkit- 前缀)
- **Edge**: 79+ (完全支持)

## 运行方式

直接在浏览器中打开 `index.html` 文件即可体验。

## 应用场景

- 移动应用界面设计
- 网站导航栏和侧边栏
- 模态框和弹窗
- 卡片组件设计
- 仪表板界面

## 扩展思考

- 如何优化毛玻璃效果的性能？
- 在不同背景下如何调整毛玻璃参数？
- 如何实现更复杂的毛玻璃动画效果？
- 毛玻璃效果在暗色主题下的应用？
