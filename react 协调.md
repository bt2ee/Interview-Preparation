


### 问题
#### 什么是fiber ? Fiber 架构解决了什么问题？
fiber 英文叫做“纤维”，是 React 中最小粒度的执行单元，许多个 fiber 节点互相嵌套、关联，就组成了 fiber 树。
在 react 15 之前，对虚拟 DOM 遍历都是通过递归，中途无法中断，导致项目越复杂，更新的事件越长，体验上就会越卡顿。
react 16 通过 reconciler 更新 fiber，每一个 fiber 都可以作为一个执行单元来处理，通过自身的过期时间来判断是否还有空间时间执行更新，没有的话就会把主动权还给浏览器，等有空余时间恢复执行，通过这样来中断渲染，提高用户体验。

#### element,fiber,dom 三种什么关系？
- element 是 react 视图层在代码层级上的表象，也就是开发者写的 jsx 都会创建成 element 对象的形式
- dom 是元素在浏览器上给用户直观的表象
- fiber 是 element 和真实 DOM 的交流枢纽站，每一个类型的 element 都会有一个对应的 fiber 类型，element 变化引起更新流程都是通过 fiber 层面做了一次协调，形成新的 DOM 做视图渲染。

#### Fiber root 和 root fiber 有什么区别？
fiberRoot 是整个应用根基，只能有一个，rootFiber 通过 ReactDOM.render 渲染出来的，一个应用可以有多个

#### 不同fiber 之间如何建立起关联的？
通过 return、child、sibling 建立联系

- return 指向父级 Fiber 节点
- child 指向子 Fiber 节点
- sibling 指向兄弟 Fiber 节点

#### React 调和流程？
**初始化**
- 创建 fiberRoot 和 rootFiber，首次构建应用，创建 fiberRoot 作为整个 React 应用根基，ReactDOM.render 渲染出 rootFiber，通过 current 连接，`fiberRoot.current = rootFiber`
- 进入到正式渲染阶段，进入 `beginWork` 流程，会到 rootFiber 的渲染流程，首先会复用 current 树（rootFiber）的 `alternate` 作为 workInProgress，如果没有 alternate（初始化的时候 rootFiber 没有 alternate），那么会创建一个 fiber 作为 workInProgress，会用 alternate 进行关联，这个关联只会出现在第一次创建 alternate 进行。
- 接下来会在新创建的 alternate 上，完成整个 fiber 树的遍历，最后会以 workInProgress 作为最新的渲染树，然后将 fiberRoot 的 current 指针指向 workInProgress 树使其变为 current Fiber 树，完成初始化流程。

**更新**
- 开发者触发一次更新，将会重新创建一颗 workInProgress 树，复用当前 current 树上的 alternate，作为新的 workInProgress Fiber 树。由于初始化 rootFiber 有 alternate，对于其他的子节点，react 还需要创建一个 alternate 和其他 fiber 建立连接。渲染完成后，workInProgress 树 再次变成 current 树。

#### 两大阶段 commit 和 render 都做了哪些事情？
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
- 一方面是对一些生命周期和副作用钩子的处理，比如 componentDidMount ，函数组件的 useEffect ，useLayoutEffect ；
- 另一方面就是在一次更新中，添加节点（ Placement ），更新节点（ Update ），删除节点（ Deletion ），还有就是一些细节的处理，比如 ref 的处理。
#### 具体分为
- before mutation阶段（执行DOM操作前）
  - 因为 Before mutation 还没修改真实的 DOM ，是获取 DOM 快照的最佳时期，如果是类组件有 getSnapshotBeforeUpdate ，那么会执行这个生命周期。
  - 会异步调用 useEffect ，在生命周期章节讲到 useEffect 是采用异步调用的模式，其目的就是防止同步执行时阻塞浏览器做视图渲染。
- mutation阶段（执行DOM操作）
  - 置空 ref ，在 ref 章节讲到对于 ref 的处理。
  - 对新增元素，更新元素，删除元素。进行真实的 DOM 操作。
- layout阶段（执行DOM操作后）
  - commitLayoutEffectOnFiber 对于类组件，会执行生命周期，setState 的callback，对于函数组件会执行 useLayoutEffect 钩子。
  - 如果有 ref ，会重新赋值 ref 。



#### 什么是双缓冲树？ 有什么作用？
React 用 workInProgress 树(内存中构建的树) 和 current (渲染树) 来实现更新逻辑。双缓存一个在内存中构建，一个渲染视图，两颗树用 alternate 指针相互指向，在下一次渲染的时候，直接复用缓存树做为下一次渲染树，上一次的渲染树又作为缓存树，这样可以防止只用一颗树更新状态的丢失的情况，又加快了 DOM 节点的替换与更新。

#### Fiber 深度遍历流程？
#### Fiber的调和能中断吗？ 如何中断？


render阶段: 1. 生成新的fiber节点，通过diff算法对比节点差异创建出用于更新操作的workinprogressFiber树，给需要更新的fiber打上相对应的effectTag并且生成用于更新的effectList链表。具体可以拆分为`beginWork`以及`completeWork`两个阶段,通过深度优先遍历的形式来进项这两个阶段。 2. 相比于react15的递归处理虚拟dom节点，Reconciler通过链表的形式改成了循环处理。每处理完一个fiber节点都会检查时间是否充足或者是否又高优先级任务。 commit阶段： 1. 当前阶段不会被打断，会根据上面两阶段生成的`effectList`一口气执行完成渲染操作。 2. 遍历render阶段生成的effectList，effectList上的Fiber节点保存着对应的props变化。之后会遍历effectList进行对应的dom操作和生命周期、hooks回调或销毁函数。 3. 通过双缓存的技术workInProgress Fiber完成渲染后会变为current Fiber树


- [调和与 fiber](https://juejin.cn/book/6945998773818490884/section/6959902333199351816)
