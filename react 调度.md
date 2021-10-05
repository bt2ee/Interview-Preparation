
### 问题
#### 异步调度原理？
react 异步更新的任务就是通过类似 requestIdleCallback 去向浏览器一帧帧的请求，等到浏览器有空闲时间，去执行 react 异步更新任务。

- react 通过 `scheduleCallback` 进行统一调度，同步任务优先级为 `Immediate`，异步任务会多一个超时等级的概念，scheduleCallback 创建一个 newTask，通过任务的开始时间和当前时间比较：当 开始时间 > 当前时间，说明没有过期，放入 timerQueue，当 开始时间 <= 当前时间，说明过期，存入 taskQueue。
- 如果任务过期并且没有调度中的任务，那么调度 requestHostCallback，本质上是调度 flushWork，等同于调用 workLoop
- 如果任务没有过期，用 requestHostTimeout 延时执行 handleTimeout
- timerQueue 中存放的未过期的任务，将会通过 requestHostTimeout 进行处理，内部通过使用 setTimeout 指定延时时间，到了指定时间后再次通过 `requestHostCallback`，然后通过 `advanceTimers` 将 timeQueue 中的任务转移到 taskQueue 中
- workLoop 会依次更新过期任务队列中的任务。

在每次更新调度的时候，workLoop 会更新执行每一个待更新的 fiber，异步模式将会调用 `shouldYield`，如果当前浏览器没有空余时间，shouldYield 将会终止循环，直至浏览器有空余时间后再继续遍历，从而达到终止渲染的目的。

#### 任务队列
- taskQueue，里面存的都是过期的任务，依据任务的过期时间( expirationTime ) 排序，需要在调度的 workLoop 中循环执行完这些任务。
- timerQueue 里面存的都是没有过期的任务，依据任务的开始时间( startTime )排序，在调度 workLoop 中会用 advanceTimers 检查任务是否过期，如果过期了，放入 taskQueue 队列。


#### 优先级
React 为了防止 requestIdleCallback 中的任务由于浏览器没有空闲时间而卡死，所以设置了 5 个优先级。
- Immediate -1 需要立刻执行
- UserBlocking 250ms 超时时间250ms，一般指用户交互
- Normal 5000ms 超时时间 5s，不需要直观立即变化的任务，比如网络请求
- Low 10000ms 超时时间 10s，肯定执行的任务，但是可以放在最后处理
- Idle 一些没必要的任务，可能不会执行

#### React 为什么不用 setTimeout requestIdleCallback ？
requestIdleCallback 只有谷歌支持，为了兼容所有浏览器，react 自行实现了 requestIdleCallback

setTimeout 最后的时间间隔会变为 4ms。

#### 说一说React 的时间分片？
时间片规定的是单个任务在这一帧内最大的执行时间，任务一旦执行时间超过时间片，则会被打断，有节制地执行任务。这样可以保证页面不会因为任务连续执行的时间过长而产生卡顿。

#### React 如何模拟 requestIdleCallback？
两个条件：可以主动让出主线程，让浏览器去渲染视图。一次事件循环只执行一次，因为执行一个后，还会请求下一次的时间片。

#### 简述一下调度流程？
Scheduler 主要处理任务调度的职责。你只需要将任务和任务优先级交给它，它就可以帮你管理任务。
首先 react 通过 `scheduleCallback`、`scheduleSyncCallback` 发起任务调度，不同点在于 `scheduleSyncCallback` 传递的是最高优先级的任务，`scheduleCallback` 传入通过 lane 计算后的优先级任务。通过计算当前时间与过期时间（过期时间 = 任务开始时间 + 优先级时间）来判断任务是否过期。
优先级在 react 中分为 Immediate -1，立即执行；UserBlock 250ms 一般指用户交互；Normal 5000ms 不需要直观立即变化的任务，比如网络请求；Low 10000ms 肯定执行的任务，但是可以放在最后处理；Idle 没必要的任务，一般不执行。
通过当前时间和过期时间的比较来放入 timeQueue (未过期队列)和 taskQueue（过期任务队列），当 开始时间 > 当前时间，说明没有过期，放入 timerQueue，当 开始时间 <= 当前时间，说明过期，存入 taskQueue。
针对未过期任务，会调用 `requestHostTimeout` 通过使用 `setTimeout` 指定延时时间，到期后通过`advanceTimers` 转移到 taskQueue 中，如果此时没有调度则调用 `requestHostCallback` 发起调度。
调度时，通过 messageChannel 的 port 发送消息，执行 channel.port 的监听函数 `performWorkUntilDeadline`（**ps: 这部分还没有理清楚**）
`performWorkUntilDeadline` 内部会执行 `scheduledHostCallback`，内部真正在进行调度的是 `workLoop` 函数，当没有剩余时间或者应该让出主线程的时候，`workLoop` 将会中断 while 循环，通过 `return false` 告知 `performWorkUntilDeadline` 调度停止。
当任务被打断之后，`performWorkUntilDeadline` 会再让调度者调用一个执行者，继续执行这个任务，直到任务完成，eventLoop 只是简单的执行任务，并不能直接判断任务是否完成，需要通过任务函数返回值来判断，任务函数返回值是函数，需要继续调用任务函数，否则代表任务完成。

如何取消任务调度？设置 callback 为 null 就能取消任务调度


#### 问题
- messageChannel 具体怎么处理的
- 中断掉的任务怎么保存的
- 中断掉的任务怎么恢复的
