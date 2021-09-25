### webpack 优化
#### exclude/include
通过 exclude、include 配置来确保转译尽可能少的文件

#### cache-loader
在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中

#### happypack
将任务分解成多个子进程处理，但目前已经不在维护

#### thread-loader
将后面的 loader 放在单独的 worker 池中运行

#### HardSourceWebpackPlugin
为模块提供中间缓存，第二次构建时间可以节约 80%

#### externals
我们可以将一些 JS 文件存储在 CDN 上(减少 Webpack 打包出来的 js 体积)，在 index.html 中通过 `<script>` 标签引入

#### DllPlugin
c拆分 bundles
