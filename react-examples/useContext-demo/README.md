# React useContext 演示

## 功能说明

这个示例全面演示了 React 的 Context API 和 useContext Hook 的使用，包括多个 Context 的组合使用和自定义 Hook 的最佳实践。

## 知识点

### 1. Context API 基础
- **createContext()**: 创建 Context 对象
- **Context.Provider**: 提供 Context 值给子组件
- **useContext()**: 在函数组件中消费 Context

### 2. 多个 Context 组合
- **嵌套 Provider**: 多个 Context Provider 嵌套使用
- **Context 分离**: 按功能分离不同的 Context
- **避免 Context 地狱**: 合理组织 Context 结构

### 3. 自定义 Hook
- **封装 Context 逻辑**: 将 Context 使用逻辑封装成自定义 Hook
- **错误处理**: 在自定义 Hook 中添加错误边界
- **类型安全**: 提供更好的开发体验

### 4. 状态管理模式
- **useState + Context**: 简单状态管理
- **useReducer + Context**: 复杂状态管理
- **状态提升**: 将状态提升到合适的 Context 层级

### 5. 性能优化
- **Context 分离**: 避免不必要的重渲染
- **memo 优化**: 使用 React.memo 优化组件
- **状态结构设计**: 合理设计状态结构

## 技术亮点

- 三个独立的 Context：主题、用户、待办事项
- 自定义 Hook 封装 Context 使用逻辑
- useReducer 管理复杂状态
- 响应式设计和暗色主题
- 完整的待办事项 CRUD 功能

## 项目结构

```
useContext-demo/
├── App.jsx          # 主应用组件
├── App.css          # 样式文件
├── main.jsx         # 入口文件
├── index.html       # HTML 模板
└── README.md        # 说明文档
```

## 运行方式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或者直接打开 index.html
```

## 核心代码示例

### 创建 Context
```jsx
const ThemeContext = createContext()
const UserContext = createContext()
const TodoContext = createContext()
```

### 自定义 Hook
```jsx
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### Provider 组合
```jsx
<ThemeProvider>
  <UserProvider>
    <TodoProvider>
      <App />
    </TodoProvider>
  </UserProvider>
</ThemeProvider>
```

## 扩展思考

- 如何避免 Context 重渲染问题？
- 什么时候使用 Context，什么时候使用 Props？
- 如何实现 Context 的持久化？
- Context 与状态管理库（Redux、Zustand）的区别？
