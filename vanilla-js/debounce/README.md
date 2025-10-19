# Debounce 防抖函数演示

## 功能说明

这个示例演示了 JavaScript 中防抖（Debounce）函数的实现和应用场景。

## 知识点

- **防抖原理**：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
- **应用场景**：搜索框输入、按钮点击、窗口大小调整等高频事件
- **与节流的区别**：防抖是延迟执行，节流是限制执行频率

## 实现细节

### 核心函数

```javascript
function debounce(func, delay, immediate = false) {
  let timeoutId
  return function (...args) {
    const context = this
    if (immediate && !timeoutId) {
      func.apply(context, args)
    }
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args)
      }
      timeoutId = null
    }, delay)
  }
}
```

### 演示功能

1. **搜索框防抖**：输入停止 500ms 后执行搜索
2. **按钮点击防抖**：点击后 1 秒内再次点击无效

## 运行方式

直接在浏览器中打开 `index.html` 文件即可体验。

## 扩展思考

- 如何实现带取消功能的防抖？
- 防抖和节流在什么场景下选择哪个？
- 如何优化防抖函数的性能？
