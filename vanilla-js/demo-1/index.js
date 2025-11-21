// mock 数据
let projects = [
  { name: 'array-item-add-one', category: 'vanilla-js' },
  { name: 'debounce', category: 'vanilla-js' },
  { name: 'array-unique', category: 'vanilla-js' },
  { name: 'vue3-reactive', category: 'vue-examples' },
  { name: 'equality_operator', category: 'vanilla-js' },
  { name: 'date-utils', category: 'utils' },
  { name: 'useContext-demo', category: 'react-examples' },
  { name: 'glassmorphism', category: 'css-tricks' },
  { name: 'axios-simple', category: 'http-examples' },
  { name: '.DS_Store', category: 'utils' },
  { name: 'throttle', category: 'vanilla-js' },
  { name: 'string-utils', category: 'utils' }
]

// 定义统计信息
const info = {
  total: projects.length, // 总数
  byCategory: {}, // 按分类统计
}

for (const item of projects) {
  if (!info.byCategory[item.category]) {
    info.byCategory[item.category] = 0
  }
  info.byCategory[item.category]++
}

console.log(info);

