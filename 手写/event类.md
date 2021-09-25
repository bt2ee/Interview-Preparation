```js
class EventEmitter {
  constructor() {
    this.events = {}; // 存放着所有的事件{eventName: [callback, ...]}
  }
  on(eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }
  emit(eventName, ...arg) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(...arg))
    }
  }
  off(eventName, callback) {
    if(this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(fn => callback !== fn && fn.l !== callback);
    }
  }
  once(eventName, callback) {
    const _once = () => {
      callback();
      this.off(eventName, _once)
    }
    _once.l = callback;
    this.on(eventName, _once)
  }
}
```

test

```js
class EventEmitter {
  constructor(){
  }
  // 监听事件
  on(){
  }
  // 触发事件
  emit(){
  }
  // 只监听一次，下次emit不会触发
  once(){
  }
  // 移除事件
  off(){
  }
}
const events = new EventEmitter();
events.on('hobby', (...argu) => {
  console.log('打游戏', ...argu);
})
let eat = () => {
  console.log('吃');
}
events.once('hobby', eat);
events.on('hobby', (...argu) => {
  console.log('逛街', ...argu);
})

events.off('hobby', eat);
events.emit('hobby', 1,2,3);
events.emit('hello', 'susan')
//打游戏 1 2 3
// 逛街 1 2 3
```
