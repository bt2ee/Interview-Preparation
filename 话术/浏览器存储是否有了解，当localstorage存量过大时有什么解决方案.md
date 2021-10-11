### Cookie
- 大小限制在 4kb
- 只要有请求涉及 cookie，就要在服务器和浏览器来回传送

### localStorage
缺点：
- localStorage 大小限制在 500w 字符左右
- localStorage 在隐私模式下不可取
- 本质是读写文件，数据多会比较卡
- 不能被爬虫爬取

### sessionStorage
会话级别缓存，关闭浏览器会被清除，不同窗口见 sessionStorage 不能共享

### web Storage和cookie的区别
Cookie 的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而 Web Storage 仅仅是为了在本地“存储”数据而生
