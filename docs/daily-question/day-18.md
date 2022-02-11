---
title: Day-18 Vue的nextTick是什么原理？
postTime: 2022-01-30
categories: 每日一题
tags: 
- Vue
- 原理
---
::: slot abstract

怎么说呢，又鸽了好久。今天是除夕的前一天，在复习准备春招的过程中，想起来之前在网易的二面时被问到的一个问题：

> 讲一下 Vue 中的 nextTick 的作用，以及它是怎么实现的

面试的时候只懂得它的作用，原理却说不上来。为了搞懂这道题，我专门去 Vue 的源码里面找到了 `nextTick` 的实现代码，意外的发现它居然是单独一个文件的，还挺有牌面。接下来就是阅读理解的部分了，下面记录一下我对 `nextTick` 原理的理解

:::



## 前言

这一篇主要要讲的是 `nextTick` 的实现原理，对于它的作用我就简单的提一下：

> `nextTick` 用于在更新 DOM 后执行回调

对于其原理的学习，首先我们要知道为什么要使用他。当我们更新了 `data` 中的数据后，此时数据还并未更新至 DOM 上，比如下面这段代码：

~~~vue
<template>
	<div>
        <p id="article">{{ a }}</p>
    </div>
</template>
<script>
	export default {
        data() {
            return {
                a: 1
            }
        },
        mounted() {
            this.a = 2
            const article = document.querySelector('#article')
            console.log(article.innerHTML)		// 1
            
            this.nextTick(() => {
                const article = document.querySelector('#article')
            	console.log(article.innerHTML)	// 2
            })
        }
    }
</script>
~~~

之所以会出现这样的差异，是因为 Vue 在修改数据后，会等到 **同一事件循环** 中的所有数据变化完成后，再统一进行试图更新，因此也可以知道， `nextTick` 涉及了 js 中的事件循环和异步



## nextTick原理

打开 Vue 的源码，在 `src/core/util` 中有这么一个文件：`next-tick.js` ，这里就是 `nextTick` 源码的所在地了

在代码的最上面维护了三个变量：

~~~js
// 标记是否使用了微任务
export let isUsingMicroTask = false

// 存放当前的所有回调函数
const callbacks = []

// 标记nextTick的运行状态
let pending = false
~~~

然后是一个函数：

~~~js
function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}
~~~

这个函数的作用是：将 `nextTick` 的运行状态改为未运行，并清空和执行所有的回调函数

接下来这部分可以说是 `nextTick` 的核心部分了，它是一个叫做 `timerFunc` 的函数，通过检测各种版本的浏览器对异步的支持，为 `timerFunc` 赋值不同的函数，以此达到兼容浏览器：

~~~js
// 优先选择Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
        if (isIOS) setTimeout(noop)
    }
    isUsingMicroTask = true
}

// 不支持Promise则改用MutationObserver
else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    let counter = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
    isUsingMicroTask = true
}

// 若是版本过低则使用setImmediate和setTimeout将就一下
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}
~~~

最后才是我们的主角： `nextTick` 函数，它主要做的就是将回调函数放入 `callbacks` 数组中，然后检测执行状态 `pending` 是否为 `false` ，即是否处于未运行的状态，若是则执行上面的 `timerFunc` 函数，让它去异步的处理回调函数们



## 结语

看完了源码感觉这个东西其实也挺简单的，就是利用事件循环与异步来达到延迟至 DOM 更新后执行回调的目的。不过代码还是挺有意思的，还让我了解到了 `MutationObserver` 的用法和检测是否可用的方法，也算收获颇丰
