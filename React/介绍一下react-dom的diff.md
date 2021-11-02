### Diff的瓶颈以及React如何应对
#### diff 缺陷
diff 操作本身也会带来性能损耗，将前后两棵树完全比对的算法的复杂程度为 O(n^3 )，其中 n 是树中元素的数量

#### react 优化
- 同级元素进行 diff，如果跨越了层级，React 将不会尝试复用
- 不同类型的元素会产生不同的树。如果元素由 div 变成了 p，React 会销毁 div 及其子孙节点，新建 p 及其子孙节点
- 可以通过 type、key 来判断元素在不同的渲染下保持稳定

#### diff 分为两类
- 当 newChild 类型为 object、number、string，代表同级只有一个节点
- 当 newChild 类型为 Array，同级有多个节点

#### 单节点 diff
- key 和 type 相同表示可以复用
- key 不同直接标记删除节点，然后创建新节点
- key 相同 type 不同，标记删除该节点和兄弟节点，然后创建新节点

#### 多节点 diff

​ 在源码中多节点 diff 会经历三次遍历
- 第一次遍历处理节点的更新（包括props更新和type更新和删除）
- 第二次遍历处理其他的情况（节点新增），其原因在于在大多数的应用中，节点更新的频率更加频繁
- 第三次处理位节点置改变

**第一次遍历**
- key 不同，遍历结束
- newChildren 或者 oldFiber 遍历完，遍历结束
- key 相同 type 不同，标记 oldFiber 为 DELETION
- key 相同 type 相同，标记可以复用

> newChildren 遍历完，oldFiber 没遍历完，在第一次遍历后将 oldFiber 中没遍历完的节点标记 DELETION（即删除的 DELETION Tag）

**第二次遍历**
- newChildren 和 oldFiber 全部遍历完，diff 结束
- newChildren 没有遍历完，oldFiber 遍历完了，将剩下的 newChildren 标记为 Placement（即插入的 Tag）
- newChildren 和 oldFiber 都没有遍历完，进入节点移动的逻辑

**第三次遍历**
> 为了快速的找到key对应的oldFiber，我们将所有还未处理的oldFiber存入以key为key，oldFiber为value的Map中。

我们的参照物是：最后一个可复用的节点在oldFiber中的位置索引（用变量lastPlacedIndex表示）。
只需要比较遍历到的可复用节点在上次更新时是否也在lastPlacedIndex对应的oldFiber后面
就能知道两次更新中这两个节点的相对位置改变没有。
如果 oldIndex < lastPlacedIndex，代表本次更新该节点需要向右移动。
lastPlacedIndex 初始为0，每遍历一个可复用的节点，如果 oldFiber >= lastPlacedIndex，则lastPlacedIndex = oldFiber。
