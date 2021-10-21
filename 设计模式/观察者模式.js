class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    if(sub && sub.update) {
      this.subs.push(sub)
    }
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log('update', this.name)
  }
}

let watcher1 = new Watcher('1')
let watcher2 = new Watcher('2')
let dep = new Dep()
dep.addSub(watcher1)
dep.addSub(watcher2)
dep.notify()
