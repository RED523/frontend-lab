/**
 * 防抖函数实现
 * @param {Function} func - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay, immediate = false) {
  let timeoutId

  return function (...args) {
    const context = this

    // 如果设置了立即执行，且没有定时器，则立即执行
    if (immediate && !timeoutId) {
      func.apply(context, args)
    }

    // 清除之前的定时器
    clearTimeout(timeoutId)

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args)
      }
      timeoutId = null
    }, delay)
  }
}

/**
 * 节流函数实现（作为对比）
 * @param {Function} func - 需要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, delay) {
  let lastExecTime = 0
  let timeoutId

  return function (...args) {
    const context = this
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(context, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(context, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// DOM 元素
const searchInput = document.getElementById('searchInput')
const searchResult = document.getElementById('searchResult')
const clickButton = document.getElementById('clickButton')
const clickCounter = document.getElementById('clickCounter')

// 搜索功能
let searchCount = 0
const performSearch = debounce((query) => {
  searchCount++
  searchResult.innerHTML = `
    <strong>搜索执行了！</strong><br>
    搜索词: "${query}"<br>
    执行次数: ${searchCount}<br>
    时间: ${new Date().toLocaleTimeString()}
  `
}, 500)

// 按钮点击功能
let clickCount = 0
const handleClick = debounce(() => {
  clickCount++
  clickCounter.textContent = `点击次数: ${clickCount}`

  // 添加点击动画效果
  clickButton.style.transform = 'scale(0.95)'
  setTimeout(() => {
    clickButton.style.transform = 'scale(1)'
  }, 100)
}, 1000)

// 事件监听
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim()
  if (query) {
    performSearch(query)
  } else {
    searchResult.textContent = '等待输入...'
  }
})

clickButton.addEventListener('click', handleClick)

// 添加按钮悬停效果
clickButton.addEventListener('mouseenter', () => {
  clickButton.style.background = '#5a6fd8'
})

clickButton.addEventListener('mouseleave', () => {
  clickButton.style.background = '#667eea'
})

// 导出函数供其他模块使用
export { debounce, throttle }
