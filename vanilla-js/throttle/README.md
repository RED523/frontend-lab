# Throttle 节流函数演示

## 简介
本示例演示原生 JavaScript 中的节流（Throttle）实现与常见应用场景，包含：
- 鼠标移动事件节流
- 窗口大小变化事件节流
- 按钮点击事件节流（带轻微动画反馈）

## 知识点
- 节流原理：在固定时间间隔内最多只执行一次回调
- leading / trailing 选项控制：开始是否立即执行、结束是否补发一次
- 高频事件优化：mousemove、resize、scroll、输入类事件

## 运行方式
```bash
# 启动本仓库 Vite 开发服务器并直接打开该示例
DEMO_PATH=vanilla-js/throttle npm run dev

# 或者直接双击打开本目录下的 index.html
```

## 文件结构
```
vanilla-js/throttle/
├─ index.html     # 示例页面
├─ throttle.js    # 通用节流函数（挂载到 window.throttle）
└─ main.js        # 绑定 DOM，演示三种节流场景
```

## 节流实现（简述）
- 通过 `lastExecTime` 记录上次执行时间
- 计算剩余时间 `remaining = delay - (now - lastExecTime)`
- 当剩余时间小于等于 0 时直接执行，并更新 `lastExecTime`
- 若设置了 `trailing`，则在窗口内通过 `setTimeout` 触发一次补发
- 通过 `leading` 控制首次是否立即执行

## API
```js
const throttled = throttle(fn, delay, { leading: true, trailing: true })
```
- fn: 需要节流的函数
- delay: 时间间隔（毫秒）
- leading: 是否在节流开始时立即执行（默认 true）
- trailing: 是否在节流结束时再执行一次（默认 true）

## 参考场景
- 滚动事件处理（滚动定位、曝光统计）
- 窗口/容器尺寸变化监听
- 拖拽、鼠标移动等高频交互
