import React, { createContext, useContext, useReducer, useState } from 'react'
import './App.css'

// 1. 创建 Context
const ThemeContext = createContext()
const UserContext = createContext()
const TodoContext = createContext()

// 2. 主题相关的 Context Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  const themeValue = {
    theme,
    toggleTheme,
    colors: {
      light: {
        background: '#ffffff',
        text: '#333333',
        primary: '#667eea',
        secondary: '#764ba2'
      },
      dark: {
        background: '#1a1a1a',
        text: '#ffffff',
        primary: '#8b5cf6',
        secondary: '#a855f7'
      }
    }
  }
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. 用户相关的 Context Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const login = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }
  
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }
  
  const userValue = {
    user,
    isLoggedIn,
    login,
    logout
  }
  
  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  )
}

// 4. Todo 相关的 Context Provider (使用 useReducer)
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      }]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [])
  
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }
  
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }
  
  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }
  
  const todoValue = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  }
  
  return (
    <TodoContext.Provider value={todoValue}>
      {children}
    </TodoContext.Provider>
  )
}

// 5. 自定义 Hooks
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}

// 6. 组件
const Header = () => {
  const { theme, toggleTheme, colors } = useTheme()
  const { user, isLoggedIn, logout } = useUser()
  const currentColors = colors[theme]
  
  return (
    <header className="header" style={{ backgroundColor: currentColors.primary }}>
      <h1 style={{ color: currentColors.text }}>
        🎯 React useContext 演示
      </h1>
      <div className="header-controls">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'} 切换主题
        </button>
        {isLoggedIn && (
          <div className="user-info">
            <span>欢迎，{user.name}！</span>
            <button onClick={logout} className="logout-btn">退出</button>
          </div>
        )}
      </div>
    </header>
  )
}

const LoginForm = () => {
  const { login } = useUser()
  const [formData, setFormData] = useState({ name: '', email: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      login(formData)
      setFormData({ name: '', email: '' })
    }
  }
  
  return (
    <div className="login-form">
      <h2>用户登录</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="姓名"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input"
        />
        <input
          type="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="input"
        />
        <button type="submit" className="btn btn-primary">登录</button>
      </form>
    </div>
  )
}

const TodoApp = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodo()
  const [newTodo, setNewTodo] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }
  
  const completedCount = todos.filter(todo => todo.completed).length
  const pendingCount = todos.length - completedCount
  
  return (
    <div className="todo-app">
      <h2>待办事项</h2>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="添加新任务..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn btn-primary">添加</button>
      </form>
      
      <div className="todo-stats">
        <span>总计: {todos.length}</span>
        <span>已完成: {completedCount}</span>
        <span>待完成: {pendingCount}</span>
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="btn btn-small btn-danger">
            清除已完成
          </button>
        )}
      </div>
      
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <span className="todo-date">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-small btn-danger"
            >
              删除
            </button>
          </div>
        ))}
      </div>
      
      {todos.length === 0 && (
        <div className="empty-state">
          <p>暂无待办事项，添加一个吧！</p>
        </div>
      )}
    </div>
  )
}

const MainContent = () => {
  const { isLoggedIn } = useUser()
  
  return (
    <main className="main">
      {!isLoggedIn ? <LoginForm /> : <TodoApp />}
    </main>
  )
}

// 7. 主应用组件
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <TodoProvider>
          <div className="app">
            <Header />
            <MainContent />
          </div>
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
