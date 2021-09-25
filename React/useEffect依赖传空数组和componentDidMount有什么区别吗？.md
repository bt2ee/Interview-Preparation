### useEffect依赖传空数组和componentDidMount有什么区别吗？
#### 误区
不应当用生命周期来看待 hooks
hooks 是一种范式转换，从“生命周期和时间”转换为“状态和 DOM 的同步“

componentDidMount 在组件挂载后执行，此时设置 state，它会重新 render 一次，它会阻塞浏览器将真实dom绘制到浏览器上

useEffect 也在挂载后运行，但是它不会阻塞 DOM 渲染，它在 Paint 后延迟异步运行。

> 可以使用 useLayoutEffect，它的表现更加接近于 componentDidMount
