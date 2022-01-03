---
title: 使用CSS为每个标题添加章节号
postTime: 2021-05-29
categories: 
- 前端笔记
- CSS
tags:
- CSS
- 小知识
---


::: slot abstract

在编写以内容为主的网页时，经常会有给标题增加序号的需求，若是人工的一个一个去加的话，标题少还好说，标题一多（几十个几百个）维护起来就会十分痛苦，可能改了其中一个序号导致后续的所有序号都要更改，并且在添加序号时很容易出错

对于这类问题有一个很好的解决方案：CSS支持对序号的状态管理，结合使用 `counter` 、 `counter-reset` 、 `counter-increment` 属性即可实现序号的自增，具体如何使用请看下文

> 仅限本文，使用了counter来为每个标题添加序号

:::



## 前言

在编写以内容为主的网页时，经常会有给标题增加序号的需求，若是人工的一个一个去加的话，标题少还好说，标题一多（几十个几百个）维护起来就会十分痛苦，可能改了其中一个序号导致后续的所有序号都要更改，并且在添加序号时很容易出错

对于这类问题有一个很好的解决方案：CSS支持对序号的状态管理，结合使用 `counter` 、 `counter-reset` 、 `counter-increment` 属性即可实现序号的自增，具体如何使用请看下文

## 使用方式

先来看看这几个属性各自的语法：

### counter-reset

#### 语法

`counter-reset` 属性用于将 [CSS计数器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters) 重置为制定值，它的语法如下：

~~~css
counter-reset: <custom-ident> [<integer>] | none;
~~~

属性值指定为none时，表示不执行计数器重置

属性值指定为 `<custom-ident> [<数值>]` 形式时：

-  `<custom-ident>` 为给要递增的计数器起的名称；

> 名称不区分大小写，可包含数字、- 、_ 、/，第一个字符必须是一个字母

- 而后跟的 `<integer>` 表示递增开始时的初始值，若不设置则为0；

> 初始值可以是正数、0、负数

- `<custom-ident> [<integer>]` 的组合可以有多对，由空格隔开即可



#### 浏览器的兼容情况如下：

![image-20210530092254001](https://upyun.cavalheiro.cn/images/image-20210530092254001.png)

### counter-increment

#### 语法

`counter-increment` 属性用于将 [CSS计数器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters) 的值按给定的值进行递增，语法如下：

~~~css
counter-increment: <custom-ident> [<integer>] | none;
~~~

属性值指定为none时，表示不得增加计数器

属性值指定为 `<custom-ident> [<数值>]` 形式时：

- `<custom-ident>` 为 `counter-reset` 定义的要递增的计数器的名称，命名格式要求同上；
- 后面的 `<integer>` 表示递增的增量，若不设置则为0，设为负数则为递减；
- `<custom-ident> [<integer>]` 的组合可以有多对，由空格隔开即可

#### 浏览器的兼容情况如下：

![image-20210530202717723](https://upyun.cavalheiro.cn/images/image-20210530202717723.png)

### counter()

#### 语法

在设置了上述两个属性后，页面还是没有任何变化，这是因为一个[计数器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)本身没有可见的效果，而是通过`counter()`函数返回开发人员定义的计数器值，来实现对应的效果。`counter()` 函数通常是搭配着伪元素来使用，其语法如下：

~~~css
div::before {
    content: '' + counter(<counter-ident>[, <counter-style>])
}
~~~

属性值 `<counter-ident>` 表示要使用的计数器的名称，需要在使用前先用上述两个属性定义名称和增量，同时该值不能为 **none** 

属性值 `<counter-style>` 为可选项，用于设置计数器的样式，如使用：`trad-chinese-informa` 即可将计数器的数字 **123** ，转换为中文的 **一二三** （其他预定义计数器样式可以参考[这里](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Counter_Styles)）

#### 浏览器的兼容情况如下：

![image-20210530203059517](https://upyun.cavalheiro.cn/images/image-20210530203059517.png)



## 代码实现

了解了CSS3计数器用到的三个属性之后，就可以动手写代码来实现给文章标题添加序号的需求了，具体代码如下：

~~~css
:root {
    counter-reset: heading1;
}

h1 {
    counter-reset: heading2;
    counter-increment: heading1;
}

h1::before {
    content: "第" counter(heading1) "章 ";
}

h2 {
    counter-increment: heading2;
    counter-reset: heading3;
}

h2::before {
    content: counter(heading1) '.' counter(heading2) ' ';
}

h3 {
    counter-increment: heading3;
    counter-reset: heading4;
}

h3::before {
    content: counter(heading1) '.' counter(heading2) '.' counter(heading3) ' ';
}

h4::before {
    counter-increment: heading4;
    content: counter(heading1) '.' counter(heading2) '.' counter(heading3) '.' counter(heading4) ' ';
}
~~~

此时我们就完成了为文章标题添加序号的需求了，代码的效果如下：

![image-20210605100609171](https://upyun.cavalheiro.cn/images/image-20210605100609171.png)



## CSS 计数器的其他用法

这里再介绍一个 CSS 计数器的应用场景，它可以用来做多选框的计数器，做到不使用 JavaScript 直接显示多选框的选中个数

HTML 如下：

~~~html
<div class="box">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <p>你选择了<span class="counter"></span>个项</p>
</div>
~~~

CSS 实现代码如下：

~~~css
.box {
    counter-reset: checkedCounter;
}

:checked {
    counter-increment: checkedCounter;
}

.counter::before {
    content: counter(checkedCounter);
}
~~~

最终效果如下：

![checkbox](https://upyun.cavalheiro.cn/images/checkbox.gif)



## 参考

本文部分内容参考自 [MDN](https://developer.mozilla.org/zh-CN/) ，参考的内容如下：

- [counter()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter())
- [counter-reset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-reset)
- [counter-increment](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment)

浏览器的兼容情况参考自 [Can I Use](https://www.caniuse.com/)



<div>
    <style>
        h1 {
            counter-reset: heading2;
        }
        h2 {
            counter-increment: heading2;
            counter-reset: heading3;
        }
        h2::before {
            content: counter(heading2) ' ';
        }
        h3 {
            counter-increment: heading3;
            counter-reset: heading4;
        }
        h3::before {
            content: counter(heading2) '.' counter(heading3) ' ';
        }
        h4::before {
            counter-increment: heading4;
            content: counter(heading2) '.' counter(heading3) '.' counter(heading4) ' ';
        }
    </style>
</div>
