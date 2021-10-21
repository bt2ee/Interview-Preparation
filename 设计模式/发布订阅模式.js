class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventType, callback) {
    if (this.events[eventType]) {
      this.events[eventType].push(callback);
    } else {
      this.events[eventType] = [callback];
    }
  }
  emit(eventType, ...args) {
    if (this.events[eventType]) {
      this.events[eventType].forEach((fn) => {
        fn(...args);
      });
    }
  }
  off(eventType, callback) {
    if (this.events[eventType]) {
      this.events[eventType] = this.events[eventType].filter(
        (fn) => fn !== callback && fn.l !== callback
      );
      console.log(this.events);
    }
  }
  once(eventType, callback) {
    const _once = () => {
      callback();
      this.off(eventType, _once);
    };
    _once.l = callback;
    this.on(eventType, _once);
  }
}

const events = new EventEmitter();
events.on("hobby", (...argu) => {
  console.log("打游戏", ...argu);
});
let eat = () => {
  console.log("吃");
};
events.once("hobby", eat);
events.on("hobby", (...argu) => {
  console.log("逛街", ...argu);
});

events.off("hobby", eat);
events.emit("hobby", 1, 2, 3);
events.emit("hello", "susan");
