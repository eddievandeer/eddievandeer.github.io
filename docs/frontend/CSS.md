---
title: CSS笔记
postTime: 2020-08-09
categories:
- 前端笔记
- CSS
tags:
- 前端
- CSS属性
- 布局
---

::: slot abstract

> CSS内容的大杂烩

基本是看到觉得想记下来的东西就往这里面塞，写的东西也都比较基础，没怎么深入

后续大概会针对某一方面去进行深入的学习，并将学习过程和笔记记录下来

:::

## 布局

### 单列布局

1. 普通布局

   ![image-20210418110253851](https://i.loli.net/2021/04/18/TktR8hexd5cSKqm.png)

   **代码实现：**

   ~~~html
   <div class="container">
       <header></header>
       <div class="content"></div>
       <footer></footer>
   </div>
   ~~~

   ~~~css
   header {
       width: 100%;
       height: 60px;
       background: #faa;
   }
   
   .content {
       width: 100%;
       height: 320px;
       background: #aaf;
   }
   
   footer {
       height: 60px;
       background: #afa;
   }
   ~~~

   

2. 内容居中

   ![image-20210418110650905](https://i.loli.net/2021/04/18/6LjnCYZOXszFkUg.png)

   **代码实现：**

   ~~~html
   <div class="container">
       <header></header>
       <div class="content"></div>
       <footer></footer>
   </div>
   ~~~

   ~~~css
   header {
       width: 100%;
       height: 60px;
       background: #faa;
   }
   
   .content {
       width: 80%;
       height: 320px;
       margin: 0 auto;
       background: #aaf;
   }
   
   footer {
       height: 60px;
       background: #afa;
   }
   ~~~



### 两栏布局

![image-20210418111031283](https://i.loli.net/2021/04/18/gJxGOMyfC9uZK4z.png)

**代码实现：**

HTML结构：

~~~html
<div class="parent">
    <div class="left"></div>
    <div class="right"></div>
</div>
~~~

1. 使用 `float` ：

   ~~~css
   .left {
       width: 200px;
       height: 100%;
       float: left;
       background-color: #faa;
   }
   
   .right {
       width: auto;
       height: 100%;
       background-color: #aaf;
   }
   ~~~

2. 使用 `flex` ：

   ~~~css
   .parent {
       display: flex;
   }
   
   .left {
       width: 200px;
       height: 100%;
       background-color: #faa;
   }
   
   .right {
       height: 100%;
       /* 使用flex: 1使right宽度自适应 */
       flex: 1;
       background-color: #aaf;
   }
   ~~~

3. 使用 `inline-block` 和 `calc` ：

   ~~~css
   .parent {
       font-size: 0;
   }
   
   .left {
       width: 200px;
       height: 100%;
       background-color: #faa;
       display: inline-block;
   }
   
   .right {
       width: calc(100% - 200px);
       height: 100%;
       display: inline-block;
       background-color: #aaf;
   }
   ~~~



### 三栏布局

![image-20210418121833645](https://i.loli.net/2021/04/18/JrgPX3xEzSGciN9.png)

**代码实现：**

1. 使用两个 `float` ：

   HTML结构：

   ~~~html
   <div class="parent">
       <div class="left"></div>
       <div class="right"></div>
       <!-- 此处需要将content放在最后 -->
       <div class="content"></div>
   </div>
   ~~~

   ~~~css
   .left {
       width: 200px;
       height: 100%;
       float: left;
       background-color: #faa;
   }
   
   .content {
       width: auto;
       height: 100%;
       margin: 0 200px;
       background-color: #afa;
   }
   
   .right {
       width: 200px;
       height: 100%;
       float: right;
       background-color: #aaf;
   }
   ~~~

2. 使用 `flex` ：

   HTML结构：

   ~~~html
   <div class="parent">
       <div class="left"></div>
       <div class="content"></div>
       <div class="right"></div>
   </div>
   ~~~

   ~~~css
   .left {
       width: 200px;
       height: 100%;
       background-color: #faa;
   }
   
   .content {
       width: auto;
       height: 100%;
       /* 使用flex: 1使right宽度自适应 */
       flex: 1;
       background-color: #afa;
   }
   
   .right {
       width: 200px;
       height: 100%;
       background-color: #aaf;
   }
   ~~~

3. 使用 `inline-block`  和 `calc` ：

   HTML结构同flex

   ~~~css
   .parent {
       font-size: 0;
   }
   
   .left {
       width: 200px;
       height: 100%;
       display: inline-block;
       background-color: #faa;
   }
   
   .content {
       width: calc(100% - 400px);
       height: 100%;
       display: inline-block;
       background-color: #afa;
   }
   
   .right {
       width: 200px;
       height: 100%;
       display: inline-block;
       background-color: #aaf;
   }
   ~~~



### 圣杯布局

![image-20210419094342728](https://i.loli.net/2021/04/19/ik1H4cnlmwqNK7o.png)

**圣杯布局的特点：**

- 中间部分在DOM结构上优先，以便先行渲染
- 三列均设置为float和相对定位
- 在父容器上使用 `padding` 预先空出放left和right的空间
- 使用 `margin` 和 `left(right)` 将left和right放置在对应的位置

**代码实现：**

HTML结构：

~~~html
<header></header>
<div class="parent">
    <div class="content"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
<footer></footer>
~~~

CSS代码：

~~~css
header {
    width: 100%;
    height: 10vh;
    background-color: grey;
}

footer {
    width: 100%;
    height: 10vh;
    background-color: grey;
    clear: both;
}

.parent {
    height: 80vh;
    position: relative;
}

.left {
    width: 200px;
    height: 100%;
    background-color: #faa;
}

.content {
    height: 100%;
    background-color: #afa;
}

.right {
    width: 200px;
    height: 100%;
    background-color: #aaf;
}

/* 关键代码 */
.left,
.content,
.right {
    float: left;
    position: relative;
}

.parent {
    padding: 0 200px;
}

.left {
    margin-left: -100%;
    left: -200px;
}

.content {
    width: 100%;
}

.right {
    right: -200px;
    margin-left: -200px;
}
~~~

**关于margin的知识点：**

在普通文档流中使用负边距时，若该元素没用定义width，则使用 `margin-left` 或 `margin-right` 将在对应的方向上增加元素的宽度

使用 `margin` 定义边距时，相当于定义了元素边界与父元素边界的距离，在浮动元素上使用负边距时（如 `margin-left` ），意味着与边界的距离是相反的，要是元素已经处于左边边界，同时元素的大小可以填入上一行的空缺中，往相反方向移动的话边距就成了和右边边界的距离，如下图所示：

![image-20210419185744138](https://i.loli.net/2021/04/19/EpnzANqVu3Z8e12.png)

利用这个原理，就可以实现后定义的元素却显示在前面

> 此处为个人理解，不一定准确，仅供参考
>
> 此处右边界（红线）有误，应该往右移动至超出被移动的元素



### 双飞翼布局

双飞翼布局的样式和圣杯布局一样，但HTML结构不同，实现的原理也不同：

- 双飞翼布局里**parent**里包裹着的只有**content**，**left**和**right**在外层

- 双飞翼布局没有使用到相对定位，同时使用 `margin` 替换了 `padding` 

**代码实现：**

HTML结构：

~~~html
<header></header>
<div class="parent">
    <div class="content"></div>
</div>
<div class="left"></div>
<div class="right"></div>
<footer></footer>
~~~

css代码：

~~~css
header,
footer {
    width: 100%;
    height: 10vh;
    background-color: grey;
}

footer {
    clear: both;
}

.parent {
    height: 80vh;
    position: relative;
}

.left {
    width: 200px;
    background-color: #faa;
}

.content {
    height: 100%;
    background-color: #afa;
}

.right {
    width: 200px;
    background-color: #aaf;
}

/* 关键代码 */
.left,
.right {
    height: 80vh;
    float: left;
}

.parent {
    width: 100%;
    float: left;
}

.left {
    margin-left: -100%;
}

.content {
    /* 使用margin空出放置left和right的位置 */
    margin-left: 200px;
    margin-right: 200px;
}

.right {
    margin-left: -200px;
}
~~~

这里同样也是用到了负边距来实现



## border-radius

给border-radius设置八个参数时，可以创建不同的图案。

例如：

~~~css
{
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}
~~~

效果：

![image-20200630221724607.png](https://i.loli.net/2020/09/08/InrgDchJSyWH3OT.png)



## clip-path

clip-path是一个css3新属性 , 一般用在svg元素上 , 但是也可以作为普通元素裁剪使用。

语法：

```css
/* Keyword values */clip-path: none;

/* <clip-source> values */ 
clip-path: url(resources.svg#c1);

/* <geometry-box> values */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: ellipse(100px 100px at 50% 50%);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

/* Box and shape values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```



## background-clip

- border-box

  默认值。背景绘制在边框方框内（剪切成边框方框）。

- padding-box

  背景绘制在衬距方框内（剪切成衬距方框，即padding及以内，不包括边框）。

- content-box

  背景绘制在内容方框内（剪切成内容方框，只保留内容部分，不包括padding及边框）。

- -webkit-background-clip: text;   **（预览阶段，需要加前缀）**

  沿文字部分剪切。

  

## position

- static：默认，没有定位

- absolute：绝对定位，相对于static以外的第一个父元素
- relative：相对定位
- fixed：固定定位，相对于浏览器窗口，脱离正常的流，相当于一个固定的absolute
- sticky：粘性定位不脱离流，保留元素在流中的位置，基于滚动的位置，超过当前页面显示时固定在之前的位置。（兼容差）

- inherit：继承父元素的position
- initial：初始化，设为默认值



## border-style

![image-20200712093517399.png](https://i.loli.net/2020/10/01/s31DopgIZ4yxTlW.png)

用border做一个小三角：

~~~css
.xxx{
    border-width: 8px;
    border-style: solid dashed dashed;
    border-color: #000 transparent transparent;
}
~~~



## text-overflow

- text-overflow：clip

  溢出时修剪溢出的文本

- text-overflow：ellipsis

  溢出时使用省略号代表被修剪的文本

