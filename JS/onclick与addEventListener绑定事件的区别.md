1.onclick 事件在同一时间只能指向唯一对象
2.addEventListener 给一个事件注册多个 listener
3.addEventListener 对任何 DOM 都是有效的，而 onclick 仅限于 HTML
4.addEventListener 可以控制 listener 的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用 removeEventListener 清除
5.IE9 使用 attachEvent 和 detachEvent

> addEventListener 的第三个参数为布尔类型，默认为 false，也就是执行的冒泡机制，如为 true，则执行捕获机制。
