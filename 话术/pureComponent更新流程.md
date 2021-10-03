使用 pureComponent 时，原型链上会有 `isPureReactComponent` 属性，如果有就会进入浅比较

> `shouldComponentUpdate` 权重大于 `PureComponent`

#### 浅比较流程
- 判断新老 props、state 是否相等，相等则不更新组件
- 判断新老 props、state，有不是对象或者为 null 的，直接返回 false，更新组件
- 通过 Object.keys 将新老 props、state 的key 变为数组判断长度，长度不相等，更新组件
- 遍历老 props、state，判断新的是否相等，有一个不相等就更新组件
