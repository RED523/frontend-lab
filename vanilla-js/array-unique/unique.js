// 简单数组去重实现与交互逻辑

function uniqueBySet(arr) {
  return Array.from(new Set(arr))
}

function uniqueByIndexOf(arr) {
  const result = []
  for (const item of arr) {
    if (result.indexOf(item) === -1) result.push(item)
  }
  return result
}

// 针对对象/数组等引用类型，按 JSON 序列化后的字符串进行判等
function uniqueBySerialize(arr) {
  const seen = new Set()
  const result = []
  for (const item of arr) {
    let key
    try {
      key = typeof item === 'string' ? `str:${item}` : `json:${JSON.stringify(item)}`
    } catch (e) {
      key = `raw:${String(item)}`
    }
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}

// DOM 交互
const inputEl = document.getElementById('input')
const outputEl = document.getElementById('output')

function parseArray(text) {
  try {
    const data = JSON.parse(text)
    if (!Array.isArray(data)) throw new Error('不是数组')
    return data
  } catch (e) {
    throw new Error('请输入有效的 JSON 数组')
  }
}

function showResult(list) {
  outputEl.textContent = JSON.stringify(list, null, 2)
}

document.getElementById('btnSet').addEventListener('click', () => {
  try {
    showResult(uniqueBySet(parseArray(inputEl.value)))
  } catch (e) {
    outputEl.textContent = e.message
  }
})

document.getElementById('btnIndexOf').addEventListener('click', () => {
  try {
    showResult(uniqueByIndexOf(parseArray(inputEl.value)))
  } catch (e) {
    outputEl.textContent = e.message
  }
})

document.getElementById('btnCustom').addEventListener('click', () => {
  try {
    showResult(uniqueBySerialize(parseArray(inputEl.value)))
  } catch (e) {
    outputEl.textContent = e.message
  }
})

// 示例默认值
inputEl.value = '[1,2,2,3,3,3,"a","a",true,false,true,{"x":1},{"x":1}]'
outputEl.textContent = '点击上面的按钮进行去重'

export { uniqueBySet, uniqueByIndexOf, uniqueBySerialize }


