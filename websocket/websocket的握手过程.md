
### websocket 优点
- 双向通信，实时性更强
- 更好的二进制支持
- 较少的控制开销。
- 支持扩展

### 建立连接
WebSocket复用了HTTP的握手通道

客户端通过HTTP请求与WebSocket服务端协商升级协议。协议升级完成后，后续的数据交换则遵照WebSocket的协议。

#### 客户端：申请协议升级
客户端发起协议升级请求，只支持 get 方法
```js
GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
```

- `Connection: Upgrade` 表示协议升级
- `Upgrade: websocket` 表示升级到 websocket
- `Sec-WebSocket-Key` 与后端响应头部 `Sec-WebSocket-Accept` 配套，提供基本防护，防止恶意连接或者无意义的连接

#### 客户端：响应协议升级

```js
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```

#### Sec-Websocket-Accept 计算规则

SHA-1(`Sec-WebSocket-Key` + `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`) 进行 SHA-1 计算然后进行 base64 编码


https://segmentfault.com/a/1190000019830078
