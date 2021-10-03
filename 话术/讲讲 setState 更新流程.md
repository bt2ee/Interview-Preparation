触发一次 setState：
- setState 产生当前更新的优先级（老版本用 expirationTime，新版本用 lane）
- React 从 fiber Root 根部向下调和子节点，调和阶段将会对比发生更新的地方，更新对比 expirationTime，找到发生更新的组件，合并 state，触发 render，得到新的 UI 视图层，完成 render 阶段。
- 接下来到 commit 阶段。替换真实 DOM，完成更新
- 执行 setState 中 callback 函数，完成 setState 全过程

React 事件执行前通过 isBatchingEventUpdates=true 打开批量更新开关，开启批处理更新

React-Dom 中提供了批量更新方法 unstable_batchedUpdates，可以去手动批量更新


### 那么如何提升更新优先级呢？
React-dom 提供了 flushSync ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。

```js
handerClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number)
   return ...
}

// 3 4 1
```

#### 类组件的 setState 和函数组件的 useState 异同
- 相同点：底层都调用了 scheduleUpdateOnfiber，事件驱动情况下都有批更新原则
- 不同点：不是在 pureComponent 下，setState 只要调用就会执行更新，但是 useState 中 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新。setState 有专门监听 state 变化的回调函数 callback；在函数组件中只能通过 useEffect 来监听。setState 在底层逻辑主要是合并 state，useState 偏向于重新赋值。
