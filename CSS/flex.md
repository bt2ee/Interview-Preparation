#### Flexible box 弹性布局

> flex item是布局中的每一项即项目。

- flex-direction: 项目的排列方式
- flex-wrap: 项目排列满屏是否换行
- flex-flow: flex-direction + flex-wrap
- align-items: 项目在交叉（垂直）轴上的对齐方式
- justify-content: 项目在横轴上的对齐方式


### flex: 1 代表什么意思
> flex 是 flex-grow、flex-shrink、flex-basis的缩写

- flex 默认取值是 0 1 auto
- flex: auto  === flex: 1 1 auto
- flex: 1 === flex: 1 1 0%
- flex: 2, 3 === flex: 2, 3, 0%

flex-grow 属性决定了父元素在空间分配方向上还有剩余空间时，如何分配这些剩余空间
flex-shrink 属性定义空间不够时各个元素如何收缩
flex-basis 属性用于设置或检索弹性盒伸缩基准值。表示在 flex items 被放入 flex 容器之前的大小，也就是 items 的理想或者假设大小
