
### jwt 优点
- 扩展性好
- jwt 不在服务器端存储任何状态

### 缺点
- 安全性。payload 使用 base64 编码，不能存储敏感信息
- 性能。jwt 长度太长，开销更大
- 一次性。想修改内容必须重新签发

### 使用场景
- 有限期短
- 只希望被用一次
