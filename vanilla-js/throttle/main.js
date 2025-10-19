// 选择元素
const moveArea = document.getElementById('moveArea')
const moveInfo = document.getElementById('moveInfo')
const resizeInfo = document.getElementById('resizeInfo')
const clickBtn = document.getElementById('throttleBtn')
const clickCountEl = document.getElementById('throttleClickCount')

let moveCalls = 0
let resizeCalls = 0
let clickCount = 0

const onMouseMove = window.throttle((e) => {
  moveCalls++
  moveInfo.textContent = `mousemove 触发: ${moveCalls} 次，坐标: (${e.offsetX}, ${e.offsetY})`
}, 200)

const onResize = window.throttle(() => {
  resizeCalls++
  resizeInfo.textContent = `resize 触发: ${resizeCalls} 次，窗口: ${window.innerWidth}×${window.innerHeight}`
}, 300)

const onClick = window.throttle(() => {
  clickCount++
  clickBtn.style.transform = 'scale(0.95)'
  setTimeout(() => (clickBtn.style.transform = 'scale(1)'), 100)
  clickCountEl.textContent = `按钮点击计数（节流 1s）: ${clickCount}`
}, 1000)

moveArea.addEventListener('mousemove', onMouseMove)
window.addEventListener('resize', onResize)
clickBtn.addEventListener('click', onClick)


