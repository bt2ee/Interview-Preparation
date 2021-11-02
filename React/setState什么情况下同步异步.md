### setState 什么情况下同步异步？

只要进入了 react 的调度流程，那就是异步的，setTimeout、setInterval、直接在 DOM 上绑定原生事件等不会进入调度流程，这种情况下就是同步的

setState 通过一个队列机制实现 state 的更新。执行 setstate 时候会浅比较合并后放入状态队列，通过队列机制高效进行批处理
