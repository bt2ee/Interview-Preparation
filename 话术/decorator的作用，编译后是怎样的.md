装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。


#### 为什么装饰器不能用于函数？
因为函数存在变量提升


```js
// 编译前
function print(target){
    console.log(target)
}
class Foo{
    @print name;
}
new Foo();

// 编译后部分代码
var Foo = ((_class = ((_temp = function Foo() {
        _initializerDefineProperty(this, 'name', _descriptor, this);
    }),
    _temp)),
    (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'name', [print], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
    })),
    _class);
```
