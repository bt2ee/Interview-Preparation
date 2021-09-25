### useEffect 和 useLayoutEffect 区别

- useEffect 不会阻塞浏览器渲染， useLayoutEffect 会阻塞浏览器渲染
- useEffect 会在浏览器渲染结束后执行，useLayoutEffect 会在 DOM 更新完成后，浏览器绘制前执行
