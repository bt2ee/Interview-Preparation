为了解决 HTTP 无状态的问题，出现了 cookie，是一段一般不超过 4kb 的小型文本数据


### 属性
- Expires: 设置 Cookie 的过期时间，没有默认是会话 Cookie，在关闭浏览器时失效；持久性 Cookie 会保存在硬盘中，直至过期或者清楚 Cookie。
- Max-age: Cookie 失效前需要经过的秒数。正数表示持久性 Cookie，负数表示会话性Cookie，0表示立即删除。Max-age 优先级大于 Expires
- Domain: 指定 Cookie 可以送达的主机名，默认当前文档的主机名。
- Path: 指定一个 URL 路径，请求资源路径包含时才会携带 Cookie 首部
- Secure: Cookie 只能通过 HTTPS 加密过的请求发送给服务端
- HTTPOnly: js脚本无法读取 Cookie
- SameSite: 在跨站时候不会被发送，从而阻止 CSRF（Strict: 仅允许发送相同站点请求的 Cookie，Lax: 允许部分第三方携带 Cookie，None: 不论是否跨站都会发送 Cookie）
