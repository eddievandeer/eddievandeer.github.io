---
layout: ArticleDetail
---

# 浏览器笔记

## 构建DOM

解析HTML，添加节点到树中

![img](http://p0.qhimg.com/t01e1ff266d0b355d62.gif)

加载JS文件时阻塞：当浏览器构建 DOM 的时候，如果在 HTML 中遇到了一个 `<script>...</script>`标签，它必须立即执行。如果脚本是来自于外部的，那么它必须首先下载脚本。

原因：因为脚本可以改变DOM，需要等脚本改变完再继续构建DOM，否则不安全

![img](http://p0.qhimg.com/t01e3b5f9d1aaa24fea.gif)

CSS 可能会阻塞解析，取决于外部样式表和脚本在文档中的顺序。如果在文档中外部样式表放置在脚本之前，由于CSS解析与Script执行互斥，当解析器获取到一个 script 标签，DOM 将无法继续构建直到 JavaScript 执行完毕，而 JavaScript 在 CSS 下载完，解析完，并且 CSSOM 可以使用的时候，才能执行。

![img](http://p0.qhimg.com/t011e23f55c658b7ba2.png)

最佳实践：样式放顶部，脚本放底部



## CSSOM

[MDN上对CSSOM的描述](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

> The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.

CSSOM是一组允许JavaScript操作CSS的API，类似于DOM



## 浏览器渲染原理

浏览器渲染过程主要分五步：

- 将HTML文档解析为DOM树
- 处理CSS标记，构建CSSOM
- 将DOM和CSSOM合并为渲染树(rendering tree)，同时display:none的元素不在该树中
- 布局（回流），即让利浏览器弄清楚各个节点在页面的确切位置和大小
- 调用GPU绘制、合成图层，显示在屏幕上
