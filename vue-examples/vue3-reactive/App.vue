<template>
  <div class="app">
    <header class="header">
      <h1>🎯 Vue 3 响应式系统演示</h1>
      <p>探索 Vue 3 的响应式 API 和 Composition API</p>
    </header>

    <main class="main">
      <!-- 基础响应式演示 -->
      <section class="demo-section">
        <h2>1. 基础响应式数据</h2>
        <div class="demo-card">
          <div class="input-group">
            <label>计数器：</label>
            <div class="counter-controls">
              <button @click="decrement" class="btn btn-danger">-</button>
              <span class="counter-value">{{ count }}</span>
              <button @click="increment" class="btn btn-success">+</button>
            </div>
          </div>
          <div class="input-group">
            <label>姓名：</label>
            <input v-model="name" type="text" placeholder="输入你的姓名" class="input">
            <p class="greeting">你好，{{ name || '陌生人' }}！</p>
          </div>
        </div>
      </section>

      <!-- 计算属性演示 -->
      <section class="demo-section">
        <h2>2. 计算属性</h2>
        <div class="demo-card">
          <div class="input-group">
            <label>价格：</label>
            <input v-model.number="price" type="number" placeholder="输入价格" class="input">
          </div>
          <div class="input-group">
            <label>数量：</label>
            <input v-model.number="quantity" type="number" placeholder="输入数量" class="input">
          </div>
          <div class="result">
            <p><strong>总价：</strong>{{ totalPrice }} 元</p>
            <p><strong>含税价格：</strong>{{ priceWithTax }} 元</p>
            <p><strong>折扣后价格：</strong>{{ discountedPrice }} 元</p>
          </div>
        </div>
      </section>

      <!-- 侦听器演示 -->
      <section class="demo-section">
        <h2>3. 侦听器 (Watch)</h2>
        <div class="demo-card">
          <div class="input-group">
            <label>搜索关键词：</label>
            <input v-model="searchQuery" type="text" placeholder="输入搜索内容" class="input">
          </div>
          <div class="search-results">
            <p v-if="searchQuery">搜索: "{{ searchQuery }}"</p>
            <p v-if="searchHistory.length > 0">
              <strong>搜索历史：</strong>{{ searchHistory.join(', ') }}
            </p>
          </div>
        </div>
      </section>

      <!-- 响应式对象演示 -->
      <section class="demo-section">
        <h2>4. 响应式对象</h2>
        <div class="demo-card">
          <div class="user-form">
            <div class="input-group">
              <label>用户名：</label>
              <input v-model="user.username" type="text" placeholder="用户名" class="input">
            </div>
            <div class="input-group">
              <label>邮箱：</label>
              <input v-model="user.email" type="email" placeholder="邮箱" class="input">
            </div>
            <div class="input-group">
              <label>年龄：</label>
              <input v-model.number="user.age" type="number" placeholder="年龄" class="input">
            </div>
            <div class="user-info">
              <h3>用户信息：</h3>
              <pre>{{ JSON.stringify(user, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 响应式数组演示 -->
      <section class="demo-section">
        <h2>5. 响应式数组</h2>
        <div class="demo-card">
          <div class="todo-section">
            <div class="input-group">
              <input v-model="newTodo" @keyup.enter="addTodo" type="text" placeholder="添加新任务" class="input">
              <button @click="addTodo" class="btn btn-primary">添加</button>
            </div>
            <div class="todo-list">
              <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
                <input v-model="todo.completed" type="checkbox" class="checkbox">
                <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                <button @click="removeTodo(index)" class="btn btn-small btn-danger">删除</button>
              </div>
            </div>
            <div class="todo-stats">
              <p>总任务：{{ todos.length }}</p>
              <p>已完成：{{ completedTodos }}</p>
              <p>未完成：{{ pendingTodos }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'

// 1. 基础响应式数据
const count = ref(0)
const name = ref('')

const increment = () => count.value++
const decrement = () => count.value--

// 2. 计算属性
const price = ref(0)
const quantity = ref(0)

const totalPrice = computed(() => price.value * quantity.value)
const priceWithTax = computed(() => totalPrice.value * 1.1)
const discountedPrice = computed(() => {
  const total = totalPrice.value
  if (total > 1000) return total * 0.9
  if (total > 500) return total * 0.95
  return total
})

// 3. 侦听器
const searchQuery = ref('')
const searchHistory = ref([])

watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery && newQuery !== oldQuery) {
    searchHistory.value.push(newQuery)
    console.log(`搜索关键词变化: ${oldQuery} -> ${newQuery}`)
  }
})

// 4. 响应式对象
const user = reactive({
  username: '',
  email: '',
  age: 0
})

// 5. 响应式数组
const newTodo = ref('')
const todos = ref([
  { id: 1, text: '学习 Vue 3', completed: false },
  { id: 2, text: '掌握 Composition API', completed: true },
  { id: 3, text: '构建响应式应用', completed: false }
])

let nextId = 4

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}

const completedTodos = computed(() =>
  todos.value.filter(todo => todo.completed).length
)

const pendingTodos = computed(() =>
  todos.value.filter(todo => !todo.completed).length
)
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  border-radius: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main {
  display: grid;
  gap: 30px;
}

.demo-section {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.demo-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 600;
  color: #555;
}

.input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-small {
  padding: 6px 12px;
  font-size: 14px;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.counter-value {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
  min-width: 50px;
  text-align: center;
}

.greeting {
  font-size: 18px;
  color: #28a745;
  font-weight: 600;
}

.result {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
}

.user-info {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.user-info pre {
  background: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  overflow-x: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 8px;
}

.todo-item .completed {
  text-decoration: line-through;
  color: #6c757d;
}

.checkbox {
  width: 18px;
  height: 18px;
}

.todo-stats {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
}

.search-results {
  background: #fff3e0;
  border: 1px solid #ffcc02;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
}
</style>
