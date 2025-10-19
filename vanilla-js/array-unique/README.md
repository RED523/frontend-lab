# 数组去重（原生 JavaScript）

## 简介
提供 3 种常见的数组去重方式：
- Set 去重：适合基本类型，语义简单
- indexOf 去重：展示早期常用做法
- 按值序列化去重：可处理对象/数组等引用类型（基于 JSON 序列化）

## 运行
```bash
# 启动开发服务器并直达本示例
DEMO_PATH=vanilla-js/array-unique npm run dev

# 或直接打开本目录的 index.html
```

## 文件结构
```
vanilla-js/array-unique/
├─ index.html   # 演示页面（输入 JSON 数组，点击按钮去重）
└─ unique.js    # 三种去重实现与页面交互逻辑
```

## API（简要）
```js
uniqueBySet(array)
uniqueByIndexOf(array)
uniqueBySerialize(array) // 对引用类型按 JSON 值去重
```

## 注意
- 序列化方式对 key 顺序、循环引用敏感；示例为“简单实现”，旨在演示思路。
- 更复杂场景可考虑稳定化序列化、深度相等比较或使用现成库。
