![image](https://user-images.githubusercontent.com/32665965/134343273-df822bbb-7657-4a74-b99f-70350c8688bd.png)

- 强缓存：浏览器从本地缓存获取数据，不与服务器进行交互
- 协商缓存：浏览器发送请求到服务器，服务器判断是否用本地缓存

## 强缓存
用户发起一个 http 协议后。浏览器发现本地已有所请求资源缓存，便开始检查缓存是否过期

通过 `Expires` 和 `Cache-Control` 进行判断

- 查看是否有 `Cache-Control` 的 `max-age/s-maxage`，如果有，则使用响应报文生成时间 `Date + max-age/s-maxage`，再与当前时间比对（`s-maxage` 适用于多用户使用的公共缓存服务器）
- 没有 `Cache-Control` 的 `max-age/s-maxage`，则比较 `Expires` 中的过期时间与当前时间。`Expires` 是一个绝对时间。
- 若缓存没有过期，返回状态码 200，从本地读取缓存，否则进入协商缓存或者服务器返回新资源

> `Cache-Control` 优先级大于 `Expires`

`Cache-Control` 常用命令：
- no-cache：不使用本地缓存，需要使用协商缓存
- no-store：禁止缓存
- public：其他用户也可以缓存，适用于公共缓存器
- private：表明只有特定用户才能使用缓存


## 协商缓存
强缓存过期后，服务器端的资源可能没有变化，所以需要与服务器协商。
- 浏览器会判断缓存中是否有 `ETag` 或者 `Last-Modified` 字段，如果没有，发起 http 请求；如果有，在请求头中加入 `If-None-Match`（有 `ETag` 字段） 和 `If-Modified-Since`（有 `Last-Modified`  字段）字段。
- 如果同时发送 `If-None-Match` 和 `If-Modified-Since`，浏览器只需要比较 `If-None-Match` 和 `ETag` 字段是否一致，如果一致，认为内容可用 返回 304。否则返回新的请求和状态码。

### ETag 和 If-None-Match

- 浏览器第一次请求服务器时，服务器会添加 ETag 字段，资源更新时 ETag 值也随之更新
- 浏览器再次请求资源时，会在请求头中添加 If-None-Match，它的值就是上次响应报文中的 ETag
- 服务器对 ETag 和 If-None-Match 进行比较，不一致则服务器接受请求，返回更新后的资源；一致表示资源未更新，返回 304，此时响应头会加上 ETag 字段，即使它未更新。

### Last-Modified 和 If-Modified-Since
- 浏览器第一次向服务器请求资源后，服务器在相应头添加 Last-Modified 字段，表明最后一次修改时间
- 浏览器再次请求时，会在请求头上添加 If-Modified-Since 字段。它的值就是上次响应报文中的 Last-Modified
- 服务器对 Last-Modified 和 If-Modified-Since 进行比较，不一致则服务器接受请求，返回更新后的资源；一致表示资源未更新，返回 304，此时响应头不会加上 Last-Modified 字段。


### 问题
#### 为什么有了 Last-Modified 还要有 ETag？解决了什么问题？
- 一些文件可能会周期性改变，但是内容并不会变化（仅仅改变的修改时间），这个时候我们不希望客户端认为文件被修改了
- 某些文件变化频繁，比如在秒以下时间内修改，If-Modified-Since 检查的粒度是秒级的，这种修改无法判断
- 某些服务器不能精准得到文件的修改时间。

这个时候，利用 ETag 能更加精准的控制缓存，因为 ETag 是服务器自动生成的资源在服务器端的唯一标识符，资源每次变动，都会生成新的 ETag 值。Last-Modified 与 ETag 是可以一起使用的，但服务器会优先验证 ETag。

> ETag 优先级大于 Last-Modified

### 启发式缓存
如果一个可以缓存的请求没有设置 Expires 和 Cache-Control，但是响应头有设置 Last-Modified 信息，这个时候浏览器默认进行启发式缓存：（当前时间 - last-modified)*10%

### from disk cache 和 from memory cache
memory cache 内存缓存，主要包含当前页面中已经抓取到的资源：样式，脚本，图片；一旦关闭 Tab 页面，内存中的缓存就会释放。
disk cache 硬盘缓存。
- 对于大文件来说，大概率不会存在内存中，反之优先
- 当前系统内存使用率过高，文件优先存进硬盘
