/**
 * 日期工具函数集合
 * 提供常用的日期处理、格式化、计算等功能
 */

export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export function getRelativeTime(date) {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  const absDiff = Math.abs(diff)

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (absDiff < minute) {
    return '刚刚'
  } else if (absDiff < hour) {
    const minutes = Math.floor(absDiff / minute)
    return `${minutes}分钟${diff < 0 ? '前' : '后'}`
  } else if (absDiff < day) {
    const hours = Math.floor(absDiff / hour)
    return `${hours}小时${diff < 0 ? '前' : '后'}`
  } else if (absDiff < week) {
    const days = Math.floor(absDiff / day)
    return `${days}天${diff < 0 ? '前' : '后'}`
  } else if (absDiff < month) {
    const weeks = Math.floor(absDiff / week)
    return `${weeks}周${diff < 0 ? '前' : '后'}`
  } else if (absDiff < year) {
    const months = Math.floor(absDiff / month)
    return `${months}个月${diff < 0 ? '前' : '后'}`
  } else {
    const years = Math.floor(absDiff / year)
    return `${years}年${diff < 0 ? '前' : '后'}`
  }
}

export function getDaysDiff(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date')
  }

  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

export function getStartOfDay(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  d.setHours(0, 0, 0, 0)
  return d
}

export function getEndOfDay(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  d.setHours(23, 59, 59, 999)
  return d
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

export function getDaysInMonth(year, month) {
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12')
  }

  return new Date(year, month, 0).getDate()
}

export function getWeekStart(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getMonthStart(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getYearStart(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  d.setMonth(0, 1)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isSameDay(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date')
  }

  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

export function getDateRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date')
  }

  const dates = []
  const current = new Date(start)

  while (current <= end) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

export function getAge(birthDate, currentDate = new Date()) {
  const birth = new Date(birthDate)
  const current = new Date(currentDate)

  if (isNaN(birth.getTime()) || isNaN(current.getTime())) {
    throw new Error('Invalid date')
  }

  let age = current.getFullYear() - birth.getFullYear()
  const monthDiff = current.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && current.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function getChineseWeekday(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekdays[d.getDay()]
}

export function getChineseMonth(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  const months = ['一月', '二月', '三月', '四月', '五月', '六月',
                 '七月', '八月', '九月', '十月', '十一月', '十二月']
  return months[d.getMonth()]
}

export default {
  formatDate,
  getRelativeTime,
  getDaysDiff,
  getStartOfDay,
  getEndOfDay,
  isLeapYear,
  getDaysInMonth,
  getWeekStart,
  getMonthStart,
  getYearStart,
  isSameDay,
  getDateRange,
  getAge,
  getChineseWeekday,
  getChineseMonth
}


