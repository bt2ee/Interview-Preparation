### render 阶段发生了什么
- render 阶段一开始会去判断本次更新是同步更新还是异步更新，通过 `shouldYield` 函数来处理。如果当前浏览器没有剩余时间，`shouldYield` 会中止循环，直到浏览器有空闲时间在继续遍历。

“递”阶段: 从 rootFiber 开始向下深度优先遍历，为遍历到的每个 fiber 节点调用 beginWork 方法，该方法根据传入的 fiber 节点创建子 fiber 节点，并将两个 fiber 节点连接起来。遍历到叶子节点，开始“归”阶段。
“归”阶段: 调用 completeWork 处理 fiber 节点，当某个节点执行完 completeWork，存在兄弟节点，会进入兄弟 fiber 的“递”阶段。如果不存在兄弟 fiber，进入父 fiber 的“归”阶段

#### beginWork
- update 时：如果 current 存在，再满足一定条件可以复用 current 节点，这样可以克隆 current.child 作为 workInProgress.child，不需要新建 workInProgress.child
- mount 时：除了 fiberRootNode 外，剩下的节点会根据 fiber.tag 创建不同类型的子 fiber 节点

**reconcileChildren**：对于 mount 组件，创建新的子 fiber 节点，对于 update 组件，它会和上一次更新的 fiber 节点比较（也就是俗称的Diff算法），将比较的结果生成新的 fiber 节点

#### completeWork
- update 时：Fiber 节点已经存在对应 DOM 节点，所以不需要生成 DOM 节点。需要做的主要是处理 props
- mount 时：为 fiber 节点生成对应的 DOM 节点，将子孙 DOM 节点插入刚生成的 DOM 节点，处理 props

### commit 阶段
#### 主要工作
- before mutation阶段（执行DOM操作前）
- mutation阶段（执行DOM操作）
- layout阶段（执行DOM操作后）


### 问题
#### mount 阶段 mountChildFibers 不会为 fiber 节点带上 effectTag 属性，为什么？
mount 只会给 rootFiber 赋值 `PlaceMent effectTag`，这样在 commit 阶段只会进行一次插入操作

#### mount时，commit 阶段如何通过一次插入操作将整棵 DOM 树插入页面
通过调用 `appendAllChildren`，将已经生成的子孙 DOM 节点插入当前生成的 DOM 节点。当归到 rootFiber 时，已经有一个构建好的 DOM 树

#### commit 阶段需要找到所有 effectTag 的 fiber 节点并依次操作，这部分是如何做的？
在 `completeUnitOfWork` 中，每执行完 completeWork 且存在 effectTag 的 fiber 节点都会保存在 effectList 的单向链表中，这样在 commit 阶段只需要遍历 effectList 就能够执行所有的 effect。
