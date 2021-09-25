### 为什么在 React 中使用 memoization？
减少组件渲染次数

### 区别
- React.memo() 是一个高阶组件，用来包装不想重新渲染的组件
- useMemo() 是一个 Hook，在组件中包装函数，用来返回缓存的变量
