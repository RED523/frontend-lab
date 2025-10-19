# 日期工具函数 (date-utils.js)

## 功能说明

常用日期处理。

## 文件结构

```
utils/
├── date-utils.js    # 日期处理工具函数
├── string-utils.js  # 字符串处理工具函数
└── README.md        # 说明文档
```

### 基础功能
- **formatDate()** - 格式化日期
- **getRelativeTime()** - 获取相对时间描述
- **getDaysDiff()** - 计算两个日期之间的天数差

### 日期操作
- **getStartOfDay()** - 获取日期开始时间
- **getEndOfDay()** - 获取日期结束时间
- **getWeekStart()** - 获取周开始日期
- **getMonthStart()** - 获取月开始日期
- **getYearStart()** - 获取年开始日期

### 日期判断
- **isLeapYear()** - 判断闰年
- **isSameDay()** - 判断是否为同一天
- **getDaysInMonth()** - 获取月份天数

### 日期计算
- **getDateRange()** - 获取日期范围
- **getAge()** - 计算年龄

### 本地化
- **getChineseWeekday()** - 获取中文星期
- **getChineseMonth()** - 获取中文月份

## 使用示例

```javascript
import { formatDate, getRelativeTime, getDaysDiff } from './utils/date-utils.js'

// 格式化日期
const formatted = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
console.log(formatted) // '2024-01-15 14:30:25'

// 相对时间
const relative = getRelativeTime(new Date(Date.now() - 5 * 60 * 1000))
console.log(relative) // '5分钟前'

// 计算天数差
const days = getDaysDiff('2024-01-01', '2024-01-15')
console.log(days) // 14
```

## 扩展计划

- [ ] 字符串工具函数 (string-utils.js)
- [ ] 数组工具函数 (array-utils.js)
- [ ] 对象工具函数 (object-utils.js)
- [ ] 验证工具函数 (validation-utils.js)
- [ ] 网络请求工具函数 (http-utils.js)
- [ ] 存储工具函数 (storage-utils.js)

## 开发规范

1. **函数命名**: 使用动词开头，描述函数功能
2. **参数验证**: 对输入参数进行类型和有效性检查
3. **错误处理**: 提供清晰的错误信息
4. **文档注释**: 使用 JSDoc 格式编写注释
5. **单元测试**: 为每个函数编写测试用例
6. **类型安全**: 使用 TypeScript 类型定义（可选）

## 贡献指南

1. 在 `utils/` 目录下创建新的工具函数文件
2. 按照现有代码风格编写函数
3. 添加完整的 JSDoc 注释
4. 更新此 README 文件
5. 编写使用示例

## 字符串工具函数 (string-utils.js)

### 基础功能
- **toUpperCase()** - 将输入转换为大写字符串

### 使用示例

```javascript
import { toUpperCase } from './utils/string-utils.js'

console.log(toUpperCase('hello')) // 'HELLO'
console.log(toUpperCase('Hello World')) // 'HELLO WORLD'
console.log(toUpperCase(123)) // '123'
console.log(toUpperCase(null)) // ''
```
