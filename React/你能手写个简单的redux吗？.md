### 你能手写个简单的redux吗？

```js
function createStore(reducer) {
  let listeners = [];
  let currentState;
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    reducer(currentState, action);
    listeners.forEach((listener) => listener());
  }
  function subscribe(fn) {
    listeners.push(fn);
    return function unSubscribe() {
      listeners = listeners.filter((listener) => listener !== fn);
    };
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}
```

### redux 里面 dispatch 是如何正确找到 reducer 的？
reducer 每次都会自己遍历一遍

### redux怎么挂载中间件的？它的执行顺序是什么样的？

```js
function compose(middlewares) {
  return middlewares.reduce((pre, cur) => (...arg) => pre(cur(...arg)))
}
```

执行顺序：从后往前执行redux中间件。

### redux 有什么缺点？
- 默认只支持同步处理，作者创造的 redux-thunk 也是独立于 redux 之外的包
- 相对来说麻烦，又要写 reducer，又要写 action，还要写 actionType，但是也变得更清晰
- 只提供了思想 没有提供范式

### redux-thunk 和 redux-saga 区别
- 对于 redux-thunk 的整个流程来说，它是等异步任务执行完成之后，我们再去调用 dispatch，然后去 store 去调用 reducer。
- redux-saga。当我们 dispatch 的 action 类型不在 reducer 中时，redux-saga 监听到，然后执行一异步操作,然后再次 dispatch


redux-thunk 和 redux-saga 处理异步任务的时机不一样。对于 redux-saga，相对于在 redux 的 action 基础上，重新开辟了一个 async action 的分支，单独处理异步任务
