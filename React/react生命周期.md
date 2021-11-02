## react生命周期？
### 旧生命周期

![image](https://user-images.githubusercontent.com/32665965/134640654-22a35b7c-a82b-4f55-922a-5aef8308422e.png)

#### 挂载
- constructor
- componentWillMount
- render
- componentDidMount

#### 更新
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

#### 卸载
- componentWillUnmount

### 新生命周期
![image](https://user-images.githubusercontent.com/32665965/134640714-6c1b0984-70f2-4642-afba-b1af7543b19a.png)

### 挂载
- constructor
- getDerivedStateFromProps
- render
- componentDidMount

### 更新
- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

### 卸载
- componentWillUnmount

> 从 v16.3 废弃了 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 三个钩子，都被 `getDerivedStateFromProps` 替代


### getSnapshotBeforeUpdate
被调用于 render 之后，可以读取但无法使用 DOM 的时候。它使您的组件可以在可能更改之前从 DOM 捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给 componentDidUpdate（）。

### 为什么废弃钩子
因为重构了 fiber，React Fiber Reconciliation 这个过程可能会暂停然后继续执行，所以挂载和更新前的钩子可能不执行也可能执行多次
