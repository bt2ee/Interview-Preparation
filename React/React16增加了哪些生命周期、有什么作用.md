新增
- getDerideStateFromProps
从 props 中获取 state，也就是将 props 映射到 state上面，每次 re-render 之前会被调用
静态方法不应该产生副作用，返回一个对象来更新 state，也可以返回 null 表示此处不需要更新

- getSnapshotBeforeUpdate
在更新真实 DOM 之前获取一个快照，比如可以用来获取滚动位置等
可以有一个返回值，这个返回值会被componentDidUpdate的第三个参数接受到

#### 为什么去掉15的钩子
因为16 版本支持可中断更新，被废弃的三个函数都是在render之前，就导致原有的钩子可能会被触发多次或者完全不触发，并且也在一定程度上限制了钩子的滥用情况
