/**
 * 字符串工具函数集合
 * 提供常用的字符串处理能力
 */

/**
 * 将输入转换为大写字符串
 * @param {string|number|null|undefined} input - 要转换的内容
 * @returns {string} 大写结果
 */
export function toUpperCase(input) {
  if (input == null) return ''
  const value = typeof input === 'string' ? input : String(input)
  return value.toUpperCase()
}

export default {
  toUpperCase
}


