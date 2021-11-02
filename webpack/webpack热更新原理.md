### webpack 热更新
- webpack-dev-server 启动本地服务
- 通过 express 框架启动本地服务，让浏览器可以请求本地资源
- 将客户端 socket 代码塞到客户端，再去启动 websocket 服务，监听 webpack 事件
- 每次修改代码，触发编译，通过 webpack-dev-middleware 进行监听
- webpack 监听到 webpackHotUpdate 事件，获取最新的 hash 值
- 根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。
- HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
- 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。
