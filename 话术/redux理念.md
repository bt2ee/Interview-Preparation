- action dispatch state啥的，单向数据流
- connect怎么实现(高阶组件、context注入store、subscribe订阅store数据变化)

### 三大原则
- 单向数据流
- state 只读：如果想要改变 state，只能触发 action 执行 reducer
- 纯函数执行：每个 reducer 都是一个纯函数，里面不要执行任何副作用，返回值作为新的 state，state 会触发 store 中的 subscribe


https://segmentfault.com/a/1190000019232219
