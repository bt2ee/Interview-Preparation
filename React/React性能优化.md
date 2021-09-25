### React性能优化
#### 使用 memo 缓存组件
只有 props 变化才会重新渲染
```js
export default React.memo((props) => {
  return (
    <div>{props.value}</div>
  )
});
```

#### 使用 useMemo 缓存大量计算
减少 JS 在呈现组件期间必须执行的工作量

```js
// 避免这样做
function Component(props) {
  const someProp = heavyCalculation(props.item);
  return <AnotherComponent someProp={someProp} />
}

// 只有 `props.item` 改变时someProp的值才会被重新计算
function Component(props) {
  const someProp = useMemo(() => heavyCalculation(props.item), [props.item]);
  return <AnotherComponent someProp={someProp} />
}
```

#### 避免使用内联对象
使用内联对象时，react 会在每次渲染时重新创建对此对象的引用，这会导致接收此对象的组件将其视为不同的对象

```js
// Don't do this!
function Component(props) {
  const aProp = { someProp: 'someValue' }
  return <AnotherComponent style={{ margin: 0 }} aProp={aProp} />
}

// Do this instead :)
const styles = { margin: 0 };
function Component(props) {
  const aProp = { someProp: 'someValue' }
  return <AnotherComponent style={styles} {...aProp} />
}
```
#### 避免使用匿名函数
可以使用 useCallback 来缓存函数

```js
// 避免这样做
function Component(props) {
  return <AnotherComponent onChange={() => props.callback(props.id)} />
}

// 优化方法一
function Component(props) {
  const handleChange = useCallback(() => props.callback(props.id), [props.id]);
  return <AnotherComponent onChange={handleChange} />
}

// 优化方法二
class Component extends React.Component {
  handleChange = () => {
   this.props.callback(this.props.id)
  }
  render() {
    return <AnotherComponent onChange={this.handleChange} />
  }
}

```

#### 延迟加载不是立即需要的组件
可以使用新的 React.Lazy 和 React.Suspense 轻松完成。

#### 使用 React.Fragment 避免添加额外的 DOM
