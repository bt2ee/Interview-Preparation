#### vue 双向数据流
vue 双向数据流不过是 vue 单向绑定 + onChange 事件侦听的语法糖。
单向数据流核心在于避免组件自身状态设计，强调把 state 拿出来做集中管理

### 区别
jsx 和 template
vue 进行数据拦截/代理，对侦测数据更加敏感，也对后续提供很大便利，比如 hooks
react 推崇函数式编程，直接进行局部重新刷新/渲染，简单粗暴

react 暴露 shouldComponentUpdate 给用户避免不必要的刷新，相比之下，vue 进行依赖追踪本身就是优化状态，但是 react 对于数据变化没有感知，需要用户手动调起更新

vue 不需要通过链表记录 hooks，基于响应式数据，对数据进行代理。当然对于响应式，无法拦截和代理基本类型，只能变成包装对象

react 希望改变开发者，按照 react 规则来。vue 适应开发者，怎么舒服怎么来
