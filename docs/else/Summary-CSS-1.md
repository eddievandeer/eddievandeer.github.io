---
title: 面试题目复习汇总-HTML&CSS-1
postTime: 2021-12-23
categories: 杂谈
tags:
- 面试
- 学习笔记
- 汇总
not: true
---



# HTML & CSS

## HTML 语义化标签

作用 or 好处：

1. 对搜索引擎友好
2. 便于团队开发和维护
3. css未加载时也有清晰的结构



## 三栏布局两边固定中间自适应

### 自身浮动法

左边栏左浮动，右边栏有浮动，中间栏放在最后

代码如下：

~~~css
.container {
    height: 100vh;
}

.left {
    width: 200px;
    float: left;
    background-color: #faa;
}

.right {
    width: 200px;
    float: right;
    background-color: #aaf;
}

.center {
    box-sizing: border-box;
    background-color: #afa;
}

.left,
.center,
.right {
    height: 100vh;
}
~~~



### flex 布局

设置父容器 `display: flex` ，左右栏设置宽度为固定值，中间栏设置 `flex: 1` ，具体代码：

~~~css
.container {
    height: 100vh;
    display: flex;
}

.left {
    width: 200px;
    background-color: #faa;
}

.right {
    width: 200px;
    background-color: #aaf;
}

.center {
    flex: 1;
    box-sizing: border-box;
    background-color: #afa;
}

.left,
.center,
.right {
    height: 100vh;
}
~~~

这里稍微注意一下 `flex: 1` 并不是一个值，它是由多个 css 属性组合而成的，组合它的属性如下：

![image-20211223093834287](https://upyun.cavalheiro.cn/images/image-20211223093834287.png)



### margin 负值法

这个方法也叫圣杯布局，实现如下：

- 在 HTML 结构上，中间栏放到最前面，左右栏随后

- 设置左右两栏和中间栏均为左浮动
- 中间栏左右 `padding` 预留出左右两栏的空间
- 左右两栏采用负的 `margin` 值，

具体代码：

~~~css
.container {
    height: 100vh;
}

.left {
    width: 200px;
    background-color: #faa;
}

.center {
    width: 100%;
    box-sizing: border-box;
    background-color: #afa;
}

.right {
    width: 200px;
    background-color: #aaf;
}

.left,
.center,
.right {
    height: 100vh;
    float: left;
}

.center {
    padding: 0 200px;
}

.left {
    margin-left: -100%;
}

.right {
    margin-left: -200px;
}
~~~



## CSS 有哪些选择器

- 通配选择器 `*`
- 标签选择器 `div`
- 类选择器 `.class`
- ID 选择器`#id`
- 后代选择器 ` .parent .son`
- 子选择器 `.ancestors > .offspring`
- 相邻兄弟选择器 `.sibling + .nextSibling`
- 随后兄弟选择器 `.sibling ~ .otherSibling`
- 属性选择器 `[attr="val"]`
- 伪类选择器  `:hover`



## CSS 实现居中的各种方式

### flex 布局实现

在父容器上设置 `display: flex` ，并使用 `justifyContent: center` 控制元素在主轴上的居中对齐， `alignItems: center` 控制侧轴上的居中对齐。哪个方向（水平或垂直）是主轴，取决于 `flex-direction` 属性是 `column` 还是 `row`

~~~css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
~~~



### position + transform 实现

父元素使用相对定位，子元素使用绝对定位，同时设置 `top: 50%; left: 50%` ，此时是子元素的左上角处于正中间，需要再使用 `transform: translate(-50%, -50%)` 将子元素的中心移动到正中间

~~~css
.container {
    position: relative;
}

.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
~~~



### flex + margin: auto 实现

在弹性盒子内部，当我们设置 `margin: auto` 的时候，会将剩下的空闲空间（水平与垂直）分配给该元素的 `margin`

~~~css
.container {
    display: flex;
}

.son {
    margin: auto;
}
~~~



### grid 布局实现

该方法和 flex 布局的实现相似

~~~css
.container {
    display: grid;
    justify-content: center;
    align-items: center;
}
~~~



## 讲一讲 BFC

### 什么是 BFC

BFC 全称 **Block Formatting Context** ，译为 **块级格式化上下文** ，是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

> BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此。

常用的两种创建 BFC 的方式：

- 设置 `overflow` 属性为 `visible` 和 `clip` 以外的值，如 `overflow: hidden`
- 设置 `display: flow-root`

由于设置 `overflow` 属性会影响滚动行为，所以更常用 `display: flow-root` 来创建 BFC



### BFC 的作用

- 清除浮动

  在同一个父元素中，当前一个元素处于浮动时，另一个元素会与其重叠，若有文本则文本会环绕浮动元素进行排列，如下图所示（浮动元素背景色为透明）：

  ![image-20211224160747591](https://upyun.cavalheiro.cn/images/image-20211224160747591.png)

  此时设置后面这个元素为 BFC ，由于浮动不会影响其它 BFC 中元素的布局，两者不会重叠：

  ![image-20211224161732108](https://upyun.cavalheiro.cn/images/image-20211224161732108.png)

- 包裹浮动

  当浮动元素的高度超出父元素时，会发生高度坍塌，即父元素的高度不会自适应浮动元素的高度，而是保持与其他内容的高度一致：

  ![image-20211224162732496](https://upyun.cavalheiro.cn/images/image-20211224162732496.png)

  计算 BFC 的高度时，浮动元素的高度也会参与计算，因此可以将父元素设置为 BFC 来避免这种情况：

  ![image-20211224163010939](https://upyun.cavalheiro.cn/images/image-20211224163010939.png)

- 避免外边距塌陷

  设有两个元素，上面的元素设置 `margin-bottom: 20px` ，下面的元素设置 `margin-top: 30px` ，那么两元素之间的距离是多少（不考虑 BFC 的情况下）？答案比较反直觉，是 `30px` ，这就是外边距坍塌所导致的

  ![image-20211224164447006](https://upyun.cavalheiro.cn/images/image-20211224164447006.png)

  使用 BFC 即可避免这种情况的发生：由于 BFC 需要元素是作为一个父元素存在的，所以需要一个容器包裹住设置外边距的元素，然后将这个容器设置为 BFC ，此时上下两元素的距离为 `50px`

  ![image-20211224165443321](https://upyun.cavalheiro.cn/images/image-20211224165443321.png)

