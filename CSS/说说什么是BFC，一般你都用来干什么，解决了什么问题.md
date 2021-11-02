### 说说什么是BFC，一般你都用来干什么，解决了什么问题？
BFC(Block Formatting Context)块级格式化上下文，具有 BFC 特性的元素可以看作是隔离了的普通元素，容器内的元素不会在布局上影响容器外的其他元素


### 触发方式
- 根元素，即 HTML 标签
- 浮动元素：float 不为 none
- overflow 值 不为 visible
- display 值为：inline-block、flex、inline-flex、grid、table
- 定位元素： position 为 absolute、fixed

#### 特性
- 同一个 bfc 下会发生外边距折叠
- BFC 可以清除浮动
- BFC 可以阻止元素被浮动元素覆盖


### margin collapse
#### 什么是外边距折叠
两个或者多个毗邻的普通流中的盒子在垂直方向上的外边距会发生叠加，成为外边距叠加

#### 避免
- 浮动元素不会和任何元素发生叠加
- 创建了 BFC 的元素不会和子元素发生外边距叠加
- 绝对元素和其他任何元素不会发生外边距叠加
- inline-block 和其他元素不发生外边距叠加
