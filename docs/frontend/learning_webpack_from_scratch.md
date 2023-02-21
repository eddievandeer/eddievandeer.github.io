---
title: 从零开始的Webpack学习之路
postTime: 2021-08-29
categories: 
- 前端笔记
- 构建工具
tags:
- 模块打包
- webpack
---

::: slot abstract

[Webpack](https://webpack.docschina.org/) 是当前前端最热门的前端资源模块化管理和打包工具，一直以来我对 webpack 都只停留在会写一点简单的配置，或者干脆就是复制粘贴的别人的配置文件，可以说是纯萌新

在这次秋招之际，我打算从零开始学习 webpack 的相关知识，并将学习过程中的感悟和遇到的问题总结记录在此处，为“升职加薪”之路踏出第一步

> 虽然在 vite 出来后，有好多的声音在说 vite 将要取代 webpack 成为新一代的主流前端构建工具，但我还是决定先学 webpack 再学 vite ，这是因为 webpack 生态强大、用户量多，而且都是构建工具，其中的一些原理肯定是共通的

:::



## 前言

在开始之前，先来了解一下 webpack 中的三个术语—— `module` 、 `chunk` 和 `bundle` 



### 概念

简单总结一下，其实这三者可以说是同一份代码在不同转换场景的不同名称：

-  `module` 模块就是我们编写的代码文件
-  `chunk` 是 webpack 打包过程的中间产物，一般一个 chunk 由一个或多个 module 组成，取决于文件的引入关系
-  `bundle` 是 webpack 打包的最终产物，通常来说，一个  bundle 对应一个 chunk ，而一个 chunk 可以对应多个 bundle



### 例子

这里再举个例子吧，现在有一个项目，目录结构如下：

~~~
src/
├── index.css
├── index.js
├── common.js
└── utils.js
~~~

`index.js` 和 `utils.js` 两个文件作为入口文件，而在 index.js 中引入了 `common.js` 和 `index.css` ，以此分析可得：

- 这四个文件都是我们编写的代码文件，因此都是 `module`

- 因为有两个入口文件，并且它们最后是独立打包成 `bundle` 的，所以在打包过程中会形成两个 `chunk` 

- 最后，我们打包出来 `index.bundle.css` 、 `index.bundle.js` 和 `uitls.bundle.js` ，这三个也就是 `bundle` 文件

用一张图来概括如下：

![module-chunk-bundle.png](http://upyun.cavalheiro.cn/images/363c4a0f658c408e93b89e95ebeb15c6~tplv-k3u1fbpfcp-watermark.image)

（图片来源于：https://juejin.cn/post/6994346951739179039）



## 配置Webpack

webpack 在使用时，需要创建并编写一个配置文件—— `webpack.config.js`

但是在没有这个配置文件的情况下也是可以正常打包的，这是因为 webpack 会有个默认的配置，在检测不到配置文件时使用默认配置，配置内容如下：

~~~js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
};
~~~



### entry和output

`entry` 表示入口文件的配置，数据类型可以是字符串、数组、对象，字符串设置的是单入口，数组和对象则用于设置多入口。webpack 只支持 js 或 json 文件作为入口文件，若是使用了其他类型的文件则会报错，默认值为： `./src/index.js`

`output` 选项表示输出配置， **该选项必须是对象类型** ，在该对象中，有两个必选项：导出路径 `path` 和导出文件的 bundle 名 `filename` ，其中 filename 必须为 **绝对路径**

对于不同的应用场景，这两个选项的配置也会有所不同



#### 单入口单输出

最简单也是使用最多的就是单个入口文件打包成单个 bundle 文件，配置内容如下：

~~~js
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    // ...
};

// 或使用对象形式，后面会详解对象
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    // ...
};
~~~



#### 多入口单输出

当项目需要多个入口文件而只需要一个输出 bundle 时，可以将 entry 设置为数组

~~~js
module.exports = {
    entry: ['./src/index.js', './src/utils.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    // ...
};
~~~

> 注意：此时其实只有一个chunk，因为是单输出



#### 多入口多输出

当项目需要多个入口文件并且需要其单独打包时，这意味着会产生多个 bundle 文件输出，也就是会有多个 chunk ，因此在配置时：

-  entry 需要使用对象形式，并且对象的 key 对应着 chunk 的名称，即 `chunkName`
   -  语法： `entry: { <entryChunkName> string | [string] } | {}`
-  output 需要在 filename 中使用 `[name]` 占位符来将其自动替换为对应的 `chunkName`

~~~js
module.exports = {
    entry: {
    	index: './src/index.js',	// chunkName为index
        utils: './src/utils.js'		// chunkName为utils
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',		// [name]占位符会自动替换为chunkName
    },
    // ...
};
~~~

根据如上配置，最终会打包出两个文件：`index.js` 和 `utils.js`



#### 补充

在单入口单输出的应用场景下，entry 也可以使用对象的形式，从而来自定义 chunkName ，然后 `output.filename` 也使用 `[name]` 占位符来自动匹配。当然也可以使用数组，但是没有太大必要

当 entry 使用数组或字符串的时候， `chunkName` 默认为 `main` ，因此如果 `output.filename` 使用 `[name]` 占位符的时候，会自动替换为 `main`



### mode

在运行了上面的例子后，控制台会报如下警告：

![image-20210916221704852](http://upyun.cavalheiro.cn/images/image-20210916221704852.png)

意思是说我们没有进行打包模式的配置，这时 webpack 默认使用 `production` 模式，即生产模式

除此之外还有两个选项： `none` 和 `development` ，三者之间的区别在于 webpack 对自带的代码压缩和优化插件的使用情况：

- none：不使用优化选项
- development：表示开发模式，在此模式下会默认开启一些有利于开发调试的选项
