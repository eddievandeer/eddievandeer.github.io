---
title: Nodejs笔记
postTime: 2020-9-22
categories: 后端笔记
tags:
- Nodejs
- 后端
- JavaScript
---

## 1、模块

### 1.1模块基础

node中没有全局作用域，只有模块作用域，不同模块的内容互不干扰，不用担心不同模块的同名变量或函数互相影响

1. **require**

   用于引用模块，传入一个模块名，返回模块导出对象。还可用于加载和使用一个JSON文件

   ~~~javascript
   //模块后面的.js可不加
   const fs = require('fs');
   const fool = require('./js/user/fool');
   
   let data = require('./data.json');
   ~~~

2. **exports**

   export对象是当前模块的导出对象，用于导出模块的方法和属性，通过require获得的就是被引用模块的export对象

3. **module**

   node在运行某个模块时回生成一个module对象，不是全局的，而是每个模块本地的

   ~~~javascript
   //模块的标识符，通常是完全解析后的文件名
   Module.id
   
   //当前模块导出的值
   Module.export
   
   //最先引用该模块的模块，没有则返回null
   Module.parent
   
   //当前模块完全解析后的文件名
   Module.filename
   
   //是否加载完成
   Module.loaded
   
   //引入的模块所组成的数组，每一个元素都是一个module对象
   Module.children
   
   //模块的搜索路径
   Module.paths
   ~~~

4. 模块初始化

   一个模块的代码仅在模块第一次被调用时执行一次，在执行过程中初始化模块的导出对象并缓存，缓存的导出对象将被重复利用，**不会因为被require了两次而初始化两次**



### 1.2核心模块

Node为JavaScript提供的各种服务器级别的API，大多数都被包装到一个具名模块中。在使用核心模块时，不需要写路径，直接使用模块名

- 文件操作：`fs ` 核心模块
- http服务构建：`http` 模块
- 路径操作：`path` 模块
- 操作系统信息：`os` 模块



## 2、包管理npm

### 2.1 管理npm的版本

安装最新的稳定版本：`npm install npm@latest -g`

安装还未正式上线的最新版本：`npm install npm@next -g`



### 2.2 初始化项目

初始化当前项目，并生成 `package.json` 文件，存放项目的一些信息：

~~~bash
npm init # 需要自行输入配置

# 使用默认配置初始化
npm init --yes # 或 npm init -y
~~~

在 `package.json` 文件中可以定义脚本，使用 `npm run scriptname` 执行：

~~~json
"script": {
    "dev": "webpack"
}
~~~

`package.json` 文件中还存放项目的依赖信息，可以直接使用 `npm install` 指令安装项目的所有依赖：

~~~json
"dependencies": {
    "@vuepress/plugin-back-to-top": "^1.5.3",
    "@vuepress/plugin-nprogress": "^1.5.3",
    "vuepress": "^1.5.3"
}
~~~



### 2.3 安装包

安装时会创建（若不存在）一个 `node_modules` 目录，将下载的包保存在该目录下，并将模块名和版本号添加至 `package.json` 文件下的 `dependencies` ：

~~~bash
npm install <package_name>

# 缩写
npm i <package_name>

# 下载特定版本的包
npm install <package_name>@version

# 添加至生产环境 dependencies
npm install <package_name> --save # npm install <package_name> -S 

# 添加至开发环境 devDependencies
npm install <package_name> --save-dev # npm install <package_name> -D

# 更新包至最新版本
npm update <package_name>
~~~

全局安装：这种方式安装后可以在任何目录下使用该包，一般把作为命令行工具的包安装到全局

~~~bash
npm install -g <package_name>

# 更新全局包
npm update -g <package_name>

# 卸载全局包
npm uninstall -g <package_name>
~~~



### 2.4 删除包

从 `node_modules` 中移除要删除的包，同时将 `package.json` 中 `dependencies` 的相应内容删除,命令：

~~~bash
# 通过包名删除对应的包
npm uninstall <package_name>

# 删除包的同时，将其从package.json文件中删除
npm uninstall <package_name> --save
~~~



### 2.5 设置镜像

~~~bash
# 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org

# 恢复默认
npm config set registry https://registry.npmjs.org
~~~



## 3、常用包

### 3.1文件操作：fs模块

1. 写文件：

   ~~~javascript
   fs.writeFile('./文件路径','写入内容',function(err){
       //回调函数
       //文件写入成功时，err为null，失败为错误对象
   })
   ~~~

2. 读文件

   ~~~javascript
   fs.readFile('./文件路径',function(err,data){
       //回调函数
       //文件读取成功时，err为null，data为数据(字符串)
       //读取失败err为错误对象，data为undefined
   })
   ~~~



### 3.2提供HTTP服务：HTTP模块

1. 创建一个Web服务器：

   ~~~javascript
   let http = require('http');
   
   let server = http.createServer();
   ~~~

2. 注册request请求时间，当接收到客户端的请求时，会自动触发request请求事件，然后执行回调函数。回调函数的形参request和response分别是请求对象和响应对象

   ~~~javascript
   server.on('request',function(request,response){
       //获取请求路径，例如：/user/login
       let url = request.url;
       //使用write方法添加响应数据
       response.write('xxxxx');
       //end方法结束响应，否则客户端将一直等待,默认编码：utf-8
       response.end();
       
       //乱码问题
       response.setHeader('Content-Type','text/plain;charset=utf-8');// text/plain代表普通文本
       
       //简洁的方式：直接写在end里
       response.end('xxxxx');
       
       //发送文件 
       //HTML
       fs.readFile('./xxx.html',function(err,data){
   		response.setHeader('Content-Type','text/html;charset=utf-8');
           response.end(data)  
       })
       //jpg
       fs.readFile('./xxx.jpg',function(err,data){
   		response.setHeader('Content-Type','image/jpeg');
           response.end(data)  
       })
   })
   ~~~

3. 绑定端口号，启动服务器

   ~~~javascript
   server.listen(端口号,function(){
       //TODO
   })
   ~~~

   

