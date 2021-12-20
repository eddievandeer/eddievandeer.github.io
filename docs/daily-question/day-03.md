---
title: Day-03 防抖与节流
postTime: 2021-10-02
categories: 每日一题
tags:
- JavaScript
- 优化
---

::: slot abstract

防抖和节流是 js 中性能优化的一个重要手段，对于像是 **onresize** 、 **onscroll** 、 **oninput** 等会高频触发的监听事件，如果回调是一个资源占用较大的函数，那将会造成页面的卡顿等一系列问题，影响用户的体验，在这时就需要使用防抖和节流的知识来进行优化

> 总结一下两者的概念：
>
> 防抖：在一定时间内若持续触发，则取消函数的执行，并刷新时间的设定
>
> 节流：事件持续触发时，只在一定的时间间隔之后才会执行函数，类似于技能冷却时间

::::

## 防抖与节流

防抖和节流是 js 中性能优化的一个重要手段，对于像是 **onresize** 、 **onscroll** 、 **oninput** 等会高频触发的监听事件，如果回调是一个资源占用较大的函数，那将会造成页面的卡顿等一系列问题，影响用户的体验，在这时就需要使用防抖和节流的知识来进行优化

> 总结一下两者的概念：
>
> 防抖：在一定时间内若持续触发，则取消函数的执行，并刷新时间的设定
>
> 节流：事件持续触发时，只在一定的时间间隔之后才会执行函数，类似于技能冷却时间



### 防抖（debounce）

这里用一个滚动事件来演示防抖的效果：

![debounce](https://upyun.cavalheiro.cn/images/debounce.gif)

简单的代码实现：

~~~js
function debounce(fn, delay) {
    let timer = null

    // 此处是一个闭包，引用debounce作用域中的变量
    return function(e) {
        const content = this
        // 当timer不为空时，说明当前已有定时器在工作，需要清除定时器重置时间
        if(timer) {
            clearTimeout(timer)
        }

        // 设置一个定时器，在delay秒后执行
        timer = setTimeout(() => {
        	// 处理this指向问题和传入event对象
            fn.apply(content, arguments)
        }, delay)
    }
}
~~~

上面的这种是在事件停止执行了指定时间后，执行传入的函数，还有另一种形式的实现：在事件一开始就执行一次传入的函数，而在持续触发的过程中不执行，称之为 **立刻执行**

要实现这个立刻执行的功能，我们需要新增一个 `immediate` 变量来标识这个功能开启与否，是的话在定时器内设置 `timer` 为空，然后在定时器外判断当前 `timer` 是否为空，是则执行传入的函数。具体操作如下：

~~~js
function debounce(fn, delay, immediate) {
    let timer = null

    return function(e) {
        const context = this

        if(timer) clearTimeout(timer)

        if(immediate) {
            // 当timer为null时为"可运行"的
            let valid = !timer
            timer = setTimeout(() => {
                // 定时器结束时timer置为null
                timer = null
            }, delay)

            if(valid) fn.apply(context, arguments)
        } else {
            timer = setTimeout(() => {
                fn.apply(context, arguments)
            }, delay)
        }
    }
}
~~~



### 节流（throttle）

还是同样用一个滚动事件来演示节流的效果：

![throttle](https://upyun.cavalheiro.cn/images/throttle.gif)

简单的代码实现：

~~~js
function throttle(fn, delay) {
    let valid = true
    const content = this
    
    return function(e) {
        if(!valid) return
        
        // 进入函数时valid设为false，等到定时器的内容执行时设为true
        valid = false
        
        setTimeout(() => {
        	// 处理this指向问题和传入event对象
            fn.apply(content, arguments)
            valid = true
        }, delay)
    }
}
~~~

除了上面的定时器实现外，还可以使用 **时间戳** 达到节流的效果：

~~~js
function throttle(fn, delay) {
    // 设置一个上一次执行的时间戳prev
    let prev = 0
    
    return function(e) {
        const context = this
        // 获取当前的时间戳now，若now - prev大于delay，即冷却完毕，可以执行
        const now = +new Date()
        
        if(now - prev > delay) {
            fn.apply(context, arguments)
            prev = now
        }
    }
}
~~~

这两种方式各有不同，使用 **定时器** 的时候，会在 `delay` 秒后执行，并 **在停止触发事件后再执行一次** ，而使用 **时间戳** 的时候，会 **在开头就执行一次** ，停止触发事件后就不会再执行
