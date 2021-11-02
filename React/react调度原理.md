### 时间切片
时间切片是指一种将多个粒度小的任务放入一个个时间切片中执行的方法
#### 作用
在刚执行完一个时间切片准备执行下一个时间切片前，react 可以
- 判断是否有用户界面交互事件和其他需要执行的代码，比如点击时间，有的话执行该事件
- 判断是否有更高优先级的任务需要执行，如果有，中断当前任务，执行优先级更高的任务。也就是利用时间切片来实现高优先级任务插队。

### 问题
#### 异步调度原理？
#### React 为什么不用 setTimeout requestIdleCallback ？
requestIdleCallback 只有谷歌支持，为了兼容所有浏览器，react 自行实现了 requestIdleCallback

setTimeout 最后的时间间隔会变为 4ms。

#### 说一说React 的时间分片？
#### React 如何模拟 requestIdleCallback？
两个条件：可以主动让出主线程，让浏览器去渲染视图。一次事件循环只执行一次，因为执行一个后，还会请求下一次的时间片。

#### 简述一下调度流程？



https://segmentfault.com/a/1190000039101758
https://segmentfault.com/a/1190000038947307
https://segmentfault.com/a/1190000039131960
https://segmentfault.com/a/1190000039134817
https://segmentfault.com/a/1190000039008910
https://segmentfault.com/a/1190000038947370
https://segmentfault.com/a/1190000038988053
https://segmentfault.com/a/1190000039021724
https://segmentfault.com/a/1190000039031957
https://react.iamkasong.com/state/reactdom.html#%E6%B5%81%E7%A8%8B%E6%A6%82%E8%A7%88

https://segmentfault.com/a/1190000040437854
