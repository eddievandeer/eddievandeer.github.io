---
title: Day-09 谈谈在项目中遇到过的困难
postTime: 2021-10-26
categories: 每日一题
tags:
- 面试
- 项目
---



::: slot abstract

这是一道开放性的题目，可以通过回答的内容就能够大致猜测回答者的水平，也是面试常见题型

由于这道题的答案每个人都是不一样的，这里我就只是分享一下我个人遇到的困难，且由于我还是一个应届生也没什么牛逼的项目拿得出手，只是自己瞎琢磨的，对于新人还可以拿来参考，要是有大佬看到了，还望多多指点

这里我要说的是，我自己开发的一款 [vuepress 主题](https://github.com/eddievandeer/vuepress-theme-vivek) 在开发过程中遇到的如下问题：

> dev模式下运行没有问题，但在build后启动编译后的项目报如下错误：
>
> `VM337:1 Uncaught DOMException: Failed to execute 'appendChild' on 'Node': This node type does not support this method.`

:::



## 前言

这是一道开放性的题目，可以通过回答的内容就能够大致猜测回答者的水平，也是面试常见题型

由于这道题的答案每个人都是不一样的，这里我就只是分享一下我个人遇到的困难，且由于我还是一个应届生也没什么牛逼的项目拿得出手，只是自己瞎琢磨的，对于新人还可以拿来参考，要是有大佬看到了，还望多多指点



## 问题

这里我要说的是，我自己的 [vuepress 主题](https://github.com/eddievandeer/vuepress-theme-vivek) 在开发过程中遇到的如下问题：

> dev模式下运行没有问题，但在build后启动编译后的项目报如下错误：
>
> `VM337:1 Uncaught DOMException: Failed to execute 'appendChild' on 'Node': This node type does not support this method.`

乍一看，这是对 DOM 元素插入子节点时，被插入的节点不支持 `appendChild` 方法，且被插入的节点类型为 `Node` 类型。但是我并没有在项目中使用过 `appendChild` 方法，而且只有个别页面会出现这个报错，且路由从报错页面切换到不报错的页面时，再切回去也不会再出现报错，但刷新之后问题重现

由于这个问题实在太过诡异了，所以刚遇到这个问题的时候我是一头雾水。之后在经过了两天的排查（当时正在实习，抽空处理的自己项目），可算是让我发现了问题所在了



## 排查

由之前的 “个别页面报错” 这个线索，我找到了报错页面的共同点：它们都有 `<PageController>` 这个我自己写的分页组件

找到了问题所在的组件之后，我通过一个最简单粗暴的方式排查组件内部的具体报错位置：注释掉有嫌疑的代码后再试试，结果真让我给试出来了。源代码是这样的：

~~~vue
<ul class="pager" @click="onPagerClick">
    <li v-if="showPrevMore">...</li>
    <li class="number" :class="{ active: current === pager }" v-for="pager in pagers" :key="pager">
        {{ pager }}
    </li>
    <li v-if="showNextMore">...</li>
</ul>
~~~

这个 `pagers` 是一个计算属性，返回的是通过总页数和当前页数计算出的页数控制器该显示的页数范围，但只要我把这个计算属性的计算过程注释掉，直接返回一个写好了数组，这个问题就神奇的消失了，因此我推断：

**这是由于动态生成第二个 `li` 导致的**

同时，因为 vuepress 自带了处理 SSR 的功能，且问题只发生在 build 后生成的项目中，所以我认为是上述代码在进行 SSR 的时候出现了某些问题，导致编译后的项目运行报错



## 寻找解决方案

虽然上面找到了问题发生的具体位置，但对于如何解决还是没有任何进展，无奈之下我只好先去百度搜一搜有没有遇到同样问题的。结果一搜，确实很多和我一样的，但他们给出的答案都是使用 `<client-only>` 组件包裹住，让被包裹的组件只在浏览器端渲染

说实话这个的结果让我难以接受，因为这样就算解决了问题，我也不知道到底是为什么会出现这个情况，就好比程序报错了用 `try` 和 `catch` 盖住一样。不服输的我又跑到了 `vuepress` 的 GitHub 的 `issues` 里去找，翻了好多个没找到想要的答案，考虑到涉及 SSR 又跑到 `nuxt` 底下的 issues 去找，最后让我找到了 [这个 issue](https://github.com/nuxt/nuxt.js/issues/1552) 。

在这个 issue 里面提到了一个关键词： `Client Hydration` ，还提到了如何判断出现的问题是否是这一类型的。除了上面提到的生产环境的报错外，还有一个 dev 开发环境下的警告：

~~~
Parent:  <div class="container"> client-hook-3.js:1:16358
Mismatching childNodes vs. VNodes: NodeList(3) [ p, p, p ]  Array [ {…} ]
    
[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.
This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. 
Bailing hydration and performing full client-side render.
~~~

此外，该 issue 还向我指明了 [Vue SSR 文档](https://ssr.vuejs.org/zh/guide/hydration.html) 中对该问题的描述



## Client Hydration

从 [Vue SSR 文档](https://ssr.vuejs.org/zh/guide/hydration.html) 中了解到， `Client Hydration` 指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程，翻译成中文叫做 **客户端激活**

在服务器和客户端上具有不同的状态通常是问题出现的原因，由于状态不同， Vue 生成的虚拟 DOM (virtual DOM) 和服务端渲染生成的静态 HTML 不一致，会导致无法匹配，从而使那一组件停止工作

而在我的排查下，找到了状态不同的位置，在于 `pagers` 这个计算属性中：

因为在 `pagers` 里面用到了作为 props 传入的 `pageCount` ，表示页面的个数，但因为只有 `beforeCreate` 和 `created `会在服务器端渲染(SSR)过程中被调用，而我是在 `mounted` 中进行的数据初始化和传入 props ，因而 `pageCount` 在服务器端渲染过程中是默认值 0 ，所以最终导致了服务器和客户端具有不同的状态，产生的 DOM 也因此不一致



## 最终解决方案

现在已经知道了问题是如何出现的了，也知道了解决办法：在 `beforeCreate` 或 `created ` 中去初始化数据。但因为一些原因，我只能在 `mounted` 中进行的数据初始化，所以能选的方案就只有使用 `<client-only-only>` 盖住了，这我还是不能接受

在查找 issue 的过程中，我看过有人用 **ElementUI** 的分页组件时也遇到了这个报错，但我自己试的时候并没有出现上述问题，于是我猜想，应该是 **ElementUI** 修复了这个 bug ，那么问题就简单了，我去参考它的源码 “剽窃” 一下它的解决方案不就好了

当我打开 **ElementUI** 分页组件的源码时，发现他是使用的一个 `index.js ` 文件，将整个组件以一个对象的形式导出，而会出问题的那部分代码它是放在了 `pager.vue` 文件中，然后在 `index.js` 中使用如下的 `render` 函数生成模板：

~~~jsx
render(h) {
    let template = <div class="page-controller"></div>
    const TEMPLATE_MAP = {
        prev: <prev></prev>,
        pager: <pager
                   currentPage={ this.internalCurrentPage }
                   pageCount={ this.internalPageCount }
                   pagerCount={ this.pagerCount }
                   on-change={ this.handleCurrentChange }>
        	   </pager>,
        next: <next></next>,
    };

	template.children = template.children || []

    for(let compo of Object.keys(TEMPLATE_MAP)) {
        template.children.push(TEMPLATE_MAP[compo])
    }

	return template
},
~~~

这种方法很神奇的做到了 **在服务器和客户端上具有不同状态的情况下还能正常工作** ，而不会出现无法匹配的情况。到了这一步已经完成了我原本期望的样子：在不使用 `<client-only>` 掩盖的情况下，解决服务器和客户端状态不同导致的客户端激活失败

> 实现的原理暂时还不清楚，等我弄明白了会再更新



## 写在最后

在真正面试的时候，我这里的内容太长了肯定是不行的，需要精炼一些的语言描述，这里写这么多主要是为了加深我自己对这个问题的印象，是对遇到问题的一个记录，正式面试时我会使用压缩后的版本

