---
title: webpack笔记
postTime: 2020-08-13
categories: 
- 前端笔记
- JavaScript
tags:
- Webpack
- 工具
---

## 1、安装

安装webpack和webpack-cli：

~~~bash
npm install webpack webpack-cli -D
~~~

创建webpack的配置文件 `webpack.config.js` ：

~~~js
module.exports = {
    // development：开发模式
    // production：生产模式
	mode: 'development'
}
~~~



## 2、基本配置

### 2.1 配置打包的入口与出口

webpack的 `4.x` 版本中默认约定：

- 打包的入口文件为：src下的index.js
- 打包的输出文件为：dist下的main.js

若要修改打包的出入口，须在webpack.config.js中新增如下配置信息：

~~~js
//导入nodejs中处理路径的包
const path = require('path')

module.exports = {
	mode: 'development',
    // __dirname表示当前文件所处目录
    entry: path.join(__dirname, './src/xxx.js'),//入口文件的绝对路径
    output: {
        path:  path.join(__dirname, './dist')，
        filename: 'bundle.js'//输出文件的存放路径
    }
}
~~~



### 2.2 配置自动打包

- 安装支持项目自动打包的工具

  ~~~bash
  npm install webpack-dev-server -D
  ~~~

- 修改 `package.json` 中的script：

  ~~~js
  "script": {
      "dev": "webpack-dev-server"
  }
  ~~~

- 将html中的script脚本引用路径修改为根目录下的js文件，即 `/xxx.js`

- 运行 `npm run dev` 命令，重新进行打包

- 在浏览器中访问 `localhost:8080` 查看自动打包效果



## 3、加载器

webpack默认只能打包处理.js后缀的文件，其他类型文件需要调用loader加载器才可以正常打包，如：

- less-loader：打包处理.less相关文件
- sass-loader：打包处理.scss相关文件
- url-loader：打包处理css中与路径相关的文件

### 3.1 配置css的打包处理：

安装loader：

~~~bash
npm install style-loader css-loader -D
~~~

在 `webpack.config.js` 中配置规则：

~~~js
module.exports = {
    //...else
    module: {
        rules: [
            //test表示匹配的文件类型，use表示要调用的loader
            { test:/\.css$/, use: ['style-loader', 'css-loader'] }
    		//多个loader的调用顺序是从后往前调用
        ]
    }
}
~~~

:::tip

css的打包处理和less、sass等差不多，只需要安装对应的loader后，修改配置文件中的rules即可

:::

### 3.2 配置postCSS自动添加css的兼容前缀：

安装loader：

~~~bash
npm install postcss-loader autoprefixer -D
~~~

创建 `postcss.config.js` 文件，并配置：

~~~js
const autoprefixer = require('autoprefixer')// 导入插件

module.exports = {
    plugins: [ autoprefixer ]// 挂载插件
}
~~~

修改 `webpack.config.js` 的rules数组：

~~~js
module.exports = {
    //...else
    module: {
        rules: [
            // 添加postcss-loader
            { test:/\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
        ]
    }
}
~~~

### 3.3 配置图片和字体文件的打包处理：

安装loader：

~~~bash
npm install url-loader file-loader -D
~~~

在 `webpack.config.js` 中配置规则：

~~~js
module.exports = {
    //...else
    module: {
        rules: [
        	//参数limit用于指定图片大小，大小小于limit的图片才会被转为base64图片
            { test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=xxx' }
        ]
    }
}
~~~

### 3.4 配置js高级语法的打包处理

安装包：

~~~bash
# 安装babel转换器相关的包
npm install babel-loader @babel/core @babel/runtime -D

# 安装babel语法插件相关的包
npm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
~~~

创建 `babel.config.js` 文件，并配置：

~~~js
module.exports = {
    presets: [ '@babel/preset-env' ],
    plugin: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
}
~~~

在 `webpack.config.js` 中配置规则：

~~~js
module.exports = {
    //...else
    module: {
        rules: [
        	//exclude表示不需要处理的目录
            { test:/\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
~~~



## 4、打包发布

配置 `package.jsson` 文件：

~~~json
"script": {
    // 用于打包的命令
    "build": "webpack -p",
    // 用于开发调试的命令，可以自定端口
    "dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000"
}
~~~