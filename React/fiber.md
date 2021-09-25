### React.fiber了解吗？造成卡顿的原因是什么？react.fiber里面是怎么解决的？中断更新之后，下次是如何找到要更新的位置的？



所以 React 通过 Fiber 架构，让自己的 Reconcilation 过程变成可被中断。 '适时'地让出 CPU 执行权，可以让浏览器及时地响应用户的交互，分批操作 DOM，得到更好的用户体验，也可以给浏览器一些喘息的机会。

### 什么是 fiber
- fiber 也称为协程
- Fiber 的另外一种解读是’纤维‘: 这是一种数据结构或者说执行单元，将它视作一个执行单元，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去.

### 中断更新之后，下次是如何找到要更新的位置的？
使用了链表结构，即使处理流程被中断了，我们随时可以从上次未处理完的Fiber继续遍历下去。

### requestIdleCallback
通过 requestIdleCallback 来检查是否超时，以此来让出控制权

requestIdleCallback 由于只有 Chrome 支持，所以 React 自行实现了一个，通过 MessageChannel 模拟

### 双缓冲
WIP树（workInProgress 树）就是一个缓冲，在 Reconciliation 完毕后一次性交给浏览器渲染

对于异常处理，有一个节点抛出异常，仍然可以就须用旧树的节点，避免整棵树挂掉

### 为什么不用 Generator
- 太麻烦
- 不能在栈中间让出
- Generator 有状态，比较难在中间恢复

### 浏览器一帧做的事情
- 处理用户输入事件
- JavaScript 执行
- requestAnimation 调用
- 布局 Layout
- 绘制 Paint
> 理想是一帧 16ms
