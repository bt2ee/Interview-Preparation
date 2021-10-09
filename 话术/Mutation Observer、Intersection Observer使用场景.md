### MutationObserver
检测 DOM 变化的网页借口，可以用来监听新增或者删除节点、属性更改、文本节点的内容更改


```js
const observer = new MutationObserver((mutations, observer) => {
  mutations.forEach((mutation) => {
    console.log(mutation);
  });
});

const article = document.querySelector('article');
const options = {
  childList: true,
  attributes: true,
};
observer.observe(article, options);
```
### IntersectionObserver
观察目标元素与视口或指定根元素产生的交叉区的变化

```js
const io = new IntersectionObserver(callback, option);

// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```
