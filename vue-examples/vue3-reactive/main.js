import { createApp } from 'vue'
import App from './App.vue'

// 创建 Vue 应用实例
const app = createApp(App)

// 全局配置
app.config.globalProperties.$version = '3.0.0'

// 挂载应用
app.mount('#app')
