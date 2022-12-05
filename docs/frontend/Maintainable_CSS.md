---
title: 编写可维护的CSS
postTime: 2022-10-02
categories: 
- 前端笔记
- CSS
tags:
- CSS
- 可维护性
---

# 选择器优先级

引用《CSS选择器世界》里的一句话：

> 几乎所有的 CSS 样式冲突、样式覆盖等问题都与 CSS 声明的优先级错位有关

## CSS 优先级

**0级**

通配选择器 * ，选择符 空格 + > ~ || ，逻辑组合伪类 :not() :is() :where() 等

**1级**

标签选择器 div span p 等

**2级**

类选择器 .foo ，属性选择器 [foo] ，伪类 :hover :active :focus 等

**3级**

ID选择器 #foo

**4级**

style 属性内联 

**5级**

这一级别的是 CSS 的一个特殊规则：!important ，当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明



## 不要用 ID 选择器

无论什么情况都没有使用 ID 选择器的必要，因为优先级太高了，且容易造成和 JavaScript 的耦合（如 Modal 等组件经常会使用 ID），同时也因为 ID 在页面中的唯一性，用 ID 选择器写的样式将会无法在页面中的其他地方复用（私有样式的感觉）



## 减少选择器嵌套

在公司的项目里也有看到过不少过度使用了 sass 的嵌套功能的代码，这里建议平常不要过多使用嵌套选择器，有如下缺点：

- 渲染性能糟糕，使用多层嵌套会增加匹配选择器的计算量（ **相对而言并不严重** ）
- 优先级混乱：大多数样式冲突的罪魁祸首，会导致你要覆盖它的样式时，需要使用同样多的嵌套层级
- 样式布局脆弱：HTML 标签不敢随便动，可能挪个位置样式就失效了

**例子**

比如现在有这么一个 HTML 结构：

~~~html
<div class="wrapper">
    <div class="content">
        <span class="text">Some text</span>
    </div>
</div>
~~~

然后对应的 CSS：

~~~scss
// 原有的 CSS
.wrapper .content .text {
    color: red;
}

// 使用 sass
.wrapper {
    .content {
        .text {
            color: red;
        }
    }
}

// 想要用来覆盖样式的 CSS
.text {
    color: blue;
}
~~~

此时 .text 是不会生效的，因为优先级问题，而若是想要覆盖则需要写成：`.wrapper .content .text`，在使用原生 CSS 的时候写嵌套不方便可能会比较少见，但借助 sass 可以很方便的写嵌套，这时就很容易出现嵌套层级太深的问题

嵌套的 CSS 应该使用在：

- 交互样式发生变化的时候，如：`.parent.active .son` 、 `.parent:hover .son` 等
- 用于覆盖某个库的组件的样式

这里有个小技巧，可以既提高了优先级，又不会增加耦合：

~~~css
// 重复自身选择器
.content.content {}

// 用属性选择器选择一定会有的属性
.content[class] {}
~~~



## 尽量不要用 !important

!important 这一规则的优先级过高，对于它只有唯一一个推荐使用的场景，那就是 使 **JavaScript 设置的样式无效**，其他场景没有使用它的理由，切勿滥用！



## 子选择符

建议尽量使用后代选择符 空格 来代替子选择符 > ，因为 **子选择符只会匹配第一代后代元素**，即子元素

虽然子选择符的性能优于后代选择符，但会带来日后的维护成本，因为 **一旦使用了子选择符，那么元素的层级关系就固定了**，日后要调整层级关系则需要连同 CSS 代码一起更改，所以一般能不用就不用，除非确实需要限制结构关系



## 减少标签选择器的使用

- 标签选择器的性能较差，CSS 选择器的匹配是从右往左进行的，所以在使用嵌套时，右边是标签选择器会优先匹配大量标签，会增加计算量使性能下降
- 一定程度上固定了结构，换一个标签的话需要同时改动 HTML 和 CSS



# 选择器命名

## 面向语义和面向属性

平常使用的诸如：button，title 等的这类，即为面向语义的命名

面向属性的命名就是指像 TailwindCSS 的 pt-6、float-left 这类，用于特殊场景的微调、可以给 UI 组件或模块快速打补丁

## OOCSS

全称：Object-Oriented CSS（面向对象的 CSS）参考网站：https://github.com/stubbornella/oocss/wiki ，参考视频：https://www.youtube.com/watch?v=SqfhZk0eIdE

CSS 是不能进行面向对象编程的，这里所说的对象是一个抽象化的概念，一个 “CSS 对象” 包含如下四个部分：

- HTML，一个或多个 DOM 节点
- 关于这些节点样式的 CSS 声明
- 背景图片、图标等
- 可能还会有与该 “对象” 关联的 JS 行为，主要是改变状态（active、hide 等）

这个 “CSS 对象” 和组件的概念是不一样的，这里更多的是关注样式上的复用，即使 HTML 更换了其他标签、JS 切换状态的逻辑改变、背景图片更换，都不会影响这一套 CSS 在页面上的任何地方的表现

所以 OOCSS 的核心是：从页面中抽离出各种重复的部分，将他们视为一个对象，通过 class 的形式进行复用

这里有两个关键点：

### Separate structure and skin

分离结构和外观（即 skin），这样做可以使样式成为一个可拔插的插件，需要这类样式则加上对应的类名

在我以前自己的项目里有用到过类似的：

- 结构：

~~~css
/* 子元素横向排布并且水平和垂直居中 */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
~~~

- 外观：

~~~css
/* 新拟物化设计的视觉效果 */
.neumorphism-skin {
    background-color: #f4f3f3;
    box-shadow: 18px 18px 30px rgba(0,0,0,0.1),
            -18px -18px 30px rgba(255,255,255,1);
}
~~~

后来想起来 [bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/) 也是这样做的



### Separate container and content

分离容器和内容，这意味着不需要处于容器中时，对应内容的样式才生效。样式不应该与其所在的位置相关，无论放在哪里他的样式都应该是一样的。基于这一要求，我们需要避免使用嵌套选择器，特别是包含了标签选择器的嵌套，应该使用类名来替代嵌套标签



### 总结

优点：可复用性强

缺点：需要很多类名，如果公用类名特别多的话，可能还需要维护一个文档，来避免未来新接触项目的开发者写重复代码



## BEM

全称为：Block Element Modifier，参考网站：https://getbem.com/

据我观察，Polaris 的选择器命名也是采用了这一方式，不过他是 rollup 打包的时候设置的，具体做法在：https://github.com/Shopify/polaris/blob/main/polaris-react/config/rollup/namespaced-classname.js

这里就用 Polaris 的 Button 组件的选择器做例子：

~~~css
// Block：有意义的独立实体
.Button {}

// Element：Block 的一部分，没有独立的意义且与 Block 相关联
.Button__Content {}

// Modifier：Block 或 Element 的状态标识符，
.Button--disabled {}
~~~

这样做的好处：

- 可以减少避免命名冲突所需的精力，只需要关注最外层的 Block 即可，他的后代可以放心的使用诸如 title、content 等
- 结构清晰，配合文件名还可以只看选择器名称就能快速定位对应组件
- 语义化，能够通过选择器的命名还原出 HTML 结构

缺点：

- 选择器的名字会比较长，特别是 Element 下还有子 Element 的情况。可以通过 css-loader 定制类名缓解



## SMACSS

全称：Scalable and Modular Architecture for CSS，参考网站：http://smacss.com/

BEM 主要是分层，而 SMACSS 主要是分类，这个不太熟悉，这里就提一下
