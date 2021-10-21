DOMContentLoaded 事件的触发时机为: HTML 解析为 DOM 之后。

> js放在结尾的目的并不是为了减少首屏时间，而是由于js经常需要操纵DOM，放在后面才更能保证找到DOM节点

### 关系
- 同步状态下：遇见同步脚本，等待脚本加载执行，然后继续解析 HTML 文档，触发 DOMContentLoaded
- 异步状态（async）: 带 async 的脚本一定会在 load 事件前执行，可能会在 DOMContentLoaded 之前或者之后执行。（如果 HTML 没有被解析完但是脚本加载完毕，会在 DOMContentLoaded 之前执行；如果 HTML 解析完了但是脚本没有加载完，async 会在 DOMContentLoaded 之后执行）
- 延迟状态：脚本会等到 HTMl 文档解析后执行，DOMContentLoaded 只有在 defer 脚本执行结束后才会被触发

> DomContentLoaded 事件只关注 HTML 是否被解析完，而不关注 async 脚本
