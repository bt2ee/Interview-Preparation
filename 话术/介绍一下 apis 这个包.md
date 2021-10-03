####
基于 axios 封装的接口管理方案，用来做接口统一管理、可配置多个接口服务、支持 restful 接口。

通过 axios.create 创建实例，通过传入 apiMap 和 serverMap 来绑定所有的方法，将 apiMap 中所有的方法挂在到 api 实例上，通过 axios.request 处理请求，只需要通过 apis.getXXX 就能够发起请求。

#### 可能被问到的问题
- 用什么打包的
- 如何发一个 npm 包

> package.json 中的 main 代表项目入口文件，module 代表 ES module 的入口文件，types 代表声明文件入口
