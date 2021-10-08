###
发生更新后，会产生一个 update 对象去承载新的状态。多个 update 会连接成一个环状链表：updateQueue，挂载在 fiber 上，然后在该 fiber 的 beginWork 阶段循环该 updateQueue，依此处理其中的 queue。

### 详情处理流程
当调用 setState 时候，实际上会调用 `enqueueSetState`，生成一个 update 对象，放入 `updateQueue`，通过三个阶段来处理：准备阶段，处理阶段，完成阶段。前两个阶段完成处理 updateQueue，最后一个阶段将计算的 state 赋值到 fiber 上。

**准备阶段：**
- 整理 updateQueue。由于优先级问题，会使得低优先级的更新被跳过等待下次执行，这个过程可能会产生新的 update。所以当某次更新处理后，可能会有两条 update 队列：上次遗留的和本次新增的。上次遗留的就是 `firstBaseUpdate` 和 `lastBaseUpdate` 之间的 update，这次新增的就是新产生的 update。
- 准备阶段就是将两条队列合并起来，并且合并后的队列不再是环状，便于从头到尾遍历。另外，current 节点也需要跟着 workInProgress 树一起操作，保持同步，防止渲染高级优先级任务打断后，再次以 current 节点为原型新建 workInProgress 节点时，不会丢失之前的 update

**处理阶段：**
本次更新是否处理 update 取决于它的优先级（update.lane）和渲染优先级（renderLanes，优先级的范围），计算结果基于 baseState。
**优先级不足**将会被跳过，放入 firstBaseUpdate 和 lastBaseUpdate组成的链表中，（就是baseUpdate），等待下次处理低优先级更新的时候再处理。记录 baseState，并且只在第一次跳过时记录，此时的 baseState 为该低优先级 update 之前所有被处理的更新的结果。将被跳过的 update 优先级记录下来，更新即将结束后放入 workInProgress.lanes 中，便于调度再次发起重做低优先级任务。
**优先级足够**判断若之前的 baseUpdate 队列不为空，则将现在这个 update 放入 baseUpdate 处理。处理更新，计算新状态。

**完成阶段：**
- 赋值 updateQueue.baseState。若此次 render 没有更新被跳过，那么赋值为新计算的 state，否则赋值为第一个被跳过的更新之前的 update。
- 赋值 updateQueue 的 firstBaseUpdate 和 lastBaseUpdate，也就是如果本次有更新被跳过，则将被截取的队列赋值给 updateQueue 的 baseUpdate 链表。
- 更新 workInProgress 节点的 lanes。更新策略为如果没有优先级被跳过，则意味着本次将 update 都处理完了，lanes 清空。否则将低优先级 update 的优先级放入 lanes。
- 更新 workInProgress 节点上的 memoizedState。



updateQueue：在组件上可能产生多个 update，所以对于 fiber 来说，需要一个链表存储这些 update，也就是 `updateQueue`，`updateQueue`是一个单向环状链表，这样就可以轻松找到首部和尾部，不需要进行多余的循环。

### 优先级
在 react 中，concurrent 模式下，高优先级任务可以打断低优先级任务的执行，低优先级的任务在打断后恢复。如果一直被打断，低优先级任务会过期，会被强制执行。

#### lane
react 17 中，优先级换成了 alne 模型，将优先级分成了31个，对应31个二进制位，越靠右优先级越高

**计算原则：**在固定的优先级范围内，先指定级别较高的位，若固定范围内的 lanes 位被指定，移动到相邻的较低级别范围的 lanes 位指定。lane 计算是向下指定的，所以如果不在范围内一定是优先级不足，需要被跳过。

#### 饥饿行为
如果低优先级任务一直被高优先级任务打断，低优先级任务会过期，会被强制执行。
- 会有函数将任务过期时间记录，如果任务过期将会把该任务的 lane 放入 root.expiredLanes 中，在下一次会以同步优先级调度，实现过期任务被立即执行。


- [扒一扒React计算状态的原理](https://segmentfault.com/a/1190000039008910)
- [React中的高优先级任务插队机制](https://segmentfault.com/a/1190000039134817)
