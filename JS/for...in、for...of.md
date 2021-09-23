## 区别
一句话概括：for in 是遍历（object）键名，for of 是遍历（array）键值。


### for in
for...in 只便利可枚举对象，包括原型链上的可枚举属性

### for of
for...of 遍历可迭代对象

> for of不可以遍历普通对象，如果想要遍历可以使用 for...in 或者 Object.keys() 方法
