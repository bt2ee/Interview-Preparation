- 创建一个空的简单javaScript对象，即{}
- 将创建对象的__proto__指向构造函数的prototype
- 修改this指向
- 如果构造函数没有返回值，就返回创建的对象。

```js
function myNew (context, ...arg) {
  let obj = Object.create(null);
  obj.__proto__ = context.prototype;
  let res = context.apply(obj, ...arg);
  return typeof res === 'object' ? res : obj;
}
```
