/**
 * 节流函数实现（支持 leading / trailing）
 */
export function throttle(func, delay, options = {}) {
  const { leading = true, trailing = true } = options
  let lastExecTime = 0
  let timeoutId = null
  let lastArgs = null
  let lastThis = null

  const invoke = () => {
    lastExecTime = Date.now()
    timeoutId = null
    func.apply(lastThis, lastArgs)
    lastArgs = lastThis = null
  }

  return function (...args) {
    const now = Date.now()
    if (!lastExecTime && !leading) {
      lastExecTime = now
    }
    const remaining = delay - (now - lastExecTime)
    lastArgs = args
    lastThis = this

    if (remaining <= 0 || remaining > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      invoke()
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(invoke, remaining)
    }
  }
}


