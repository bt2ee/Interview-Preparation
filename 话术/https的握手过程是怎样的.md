https 基于 tcp 协议，所以一定先经过 tcp 的三次握手。tcp 连接建立后才进入对称密钥协商过程。

- 客户端发送 client_hello
- 服务端发送 server_hello
- 服务端发送证书
- 服务端发送 Server Key Exchange
- 服务端发送 Server Hello Done
- 客户端发送 client_key_exchange + change_cipher_spec + encrypted_handshake_message
- 服务端发送 New Session Ticket
- 服务端发送 change_cipher_spec
- 服务端发送 encrypted_handshake_message
- 完成密钥协商，开始发送数据

SSL：首先需要从证书机构申请证书（证书中含有签名和服务端公钥）。客户端发起 HTTP 请求时，服务端将证书发送给客户端，客户端认证证书真伪，然后解密出服务端公钥，用公钥加密自己生成的对称加密密钥传给服务端，利用私钥加密进行通话。


https://juejin.cn/post/6847902219745181709
