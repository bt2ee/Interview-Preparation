### class 组件和函数组件的区别
#### class 组件
- 有组件实例
- 有生命周期
- 有 state 和 setState

#### 函数组件
- 没有组件实例
- 没有生命周期
- 没有 state，只能接受 props
- 函数组件是一个纯函数，执行完即销毁，无法存储 state


#### class 组件存在的问题
- 大型组件难以拆分重构
- 相同业务逻辑分散到各个方法中，可能会混乱
- 逻辑可能变复杂，比如使用 HOC、Render props
