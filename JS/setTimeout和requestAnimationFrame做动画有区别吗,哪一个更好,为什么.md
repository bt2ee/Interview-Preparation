### setTimeout 和 requestAnimationFrame 做动画有区别吗？哪一个更好？为什么？

- 准确性
setTimeout 做动画不准确，因为是宏任务，设置的延迟时间不等于延迟时间后立即执行；
requestAnimationFrame 是在每一帧绘制前运行
- 更好的性能
当隐藏元素或者元素不可见时，setTimeout 仍在后台执行动画人任务，requestAnimationFrame 会停止动画
