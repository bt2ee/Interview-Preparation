### loader
主要做转换，比如将 css、less 转成 js

### plugin
监听 webpack 构建过程中的钩子，做一些自己的操作

#### loader 执行顺序
执行顺序从右到左，从下到上



#### plugin 包含
- 一个 JS 类
- 一个 apply 方法，在装载插件的时候被调用，并且会传入 compiler 对象
- 使用不同的 hooks 来指定需要发生的处理行为
- 在异步调用的时候需要调用 webpack 提供给我们的 callback 或者通过 promise 的方式
