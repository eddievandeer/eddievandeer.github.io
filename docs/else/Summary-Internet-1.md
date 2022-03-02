---
title: 面试题目复习汇总-网络-1
postTime: 2021-12-23
categories: 杂谈
tags:
- 面试
- 学习笔记
- 汇总
not: true
---





# 网络

## 请求方法

- GET
- POST
- PUT
- DELETE
- OPTIONS
- HEAD
- TRACE
- CONNECT



## GET 和 POST 的区别

- GET 在传递参数时，会将数据拼接到 url 后，而 POST 则是放在 **请求体** 中传输
- 两者接受的编码不同， GET 只允许 `ASCII` 字符，而 POST 则没有这个限制，也可以是二进制数据
- 安全性方面 POST 会更安全，因为 GET 发送的数据会在 url 中被看到，同时可以直接在浏览器地址栏里或者历史记录里看到传输的参数，从而导致数据的泄露



## HTTP 和 HTTPS 的区别

之前看的《图解HTTP》中总结了这么一句话：

> HTTPS = HTTP + 加密 + 认证 + 完整性保护

HTTP 本身是明文传输的，内容容易被窃取，不安全。在 HTTPS 中通过 **SSL** 或 **TSL** 来实现加密通信的内容，可以说 HTTPS 不是一个新协议，只是身披 **SSL** 或 **TSL** 的 HTTP

由于 HTTP 请求和响应不会确认通信方的身份，在 HTTPS 中通过证书机制来完善这一缺陷。证书是由专门的权威机关发布的

HTTP 无法确定通信的报文的完整性，可能中途会被篡改（中间人攻击），因为 HTTPS 身披着 **SSL** 的外壳，是先通过和 **SSL** 进行通信，再由 **SSL** 和 **TCP** 通信。HTTPS 采用的是 **混合加密机制** ，先使用公开密钥加密方式安全的将共享密钥交换，再使用共享密钥来进行接下来的通信



## Cookie 的作用

由于 HTTP 是 “无状态” 的，服务器不会去记忆 HTTP 的状态，所以不需要额外的资源来记录状态信息，这能减轻服务器的负担。但如果请求需要验证消息的话，不记忆状态反而带来了不便，Cookie 就是为此而生的

Cookie 由后端在发送响应请求的时候，附带一个 `Set-Cookie` 请求头来设置，此后浏览器发送请求时，会自带 Cookie 进行请求。



## 前端缓存

### memory cache

内存缓存，保证了在一个页面中，如果有多次相同的请求，如：两个 `src` 相同的 `img` 和 `href` 相同的 `link` 都会只请求一次，然后以后就从内存中取出，在关闭页面之后就会从内存中清除



### disk cache

硬盘缓存，允许相同的资源在跨会话甚至跨站点中使用，会严格按照 HTTP 请求头中的信息判断是否可以缓存



### Cache-control

这个就是刚提到的控制是否缓存的请求头，该请求头的各个值及其查询顺序如下 [(图片来自 https://web.dev/http-cache/)](https://web.dev/http-cache/)：

![流程图](https://upyun.cavalheiro.cn/images/htXr84PI8YR0lhgLPiqZ.png)



### 强缓存和协商缓存

