---
title: Day-26 同一时间最多只处理n个请求
postTime: 2022-04-16
categories: 每日一题
tags: 
- 面试
- 算法
- 观察者模式
---
::: slot abstract

~~~
有50个请求，同一时间最多发送n个，每有一个请求完成就由下一个请求进行补位，问如何实现
~~~

上一次在网易面试里被问到的题目，这次在字节的交叉面里又遇到了。说实话在网易面试结束后到现在，我还没来得及琢磨怎么做呢，这一次面试直接莫名的打通了任督二脉，现场想出解决方案，自己都被自己的机智惊到了

> 鸽了足足有半个多月，不愧是我。这段时间一直在搞毕设，确实也是不太腾得出时间来写博客了

:::



## 前言

这是一道之前在网易面试时被问到的面试题，这一次又出现在了字节的交叉面里。网易面试那会没想出来，字节面试的时候突然就跟打通了任督二脉似的，现场想出了解决方案，其实主要是一个 **观察者模式** 的思想

当时在面试的现场中，我想到了两个方法，一个是轮询，一个是使用 `Object.defineProperty` ，具体实现请看解答部分



## 题目

~~~
有50个请求，同一时间最多发送n个，每有一个请求完成就由下一个请求进行补位，问如何实现
~~~



## 解答

首先，我们要在当前 `n` 个正在处理的请求中出现一个完成的请求之后，将新的请求发送，如此循环直至所有请求都被处理，以此我们可以知道，现在最重要的问题就是如何得知一个请求发送完了，同时这一时刻正在处理中的请求数量不到 `n` 



### 设置前置条件

这里我在现有的后端项目里写了个测试接口，请求时直接返回请求中传入的 id 值，以此来判断当前是哪一个请求被处理。然后是导入了 `axios` 库进行请求发送，再设置 `max` 值限定同一时间处理的请求数量

~~~js
const axios = require('axios')

const max = 3

const apis = [
    'http://10.6.203.219:3000/user/test?id=1',
    'http://10.6.203.219:3000/user/test?id=2',
    'http://10.6.203.219:3000/user/test?id=3',
    'http://10.6.203.219:3000/user/test?id=4',
    'http://10.6.203.219:3000/user/test?id=5',
    'http://10.6.203.219:3000/user/test?id=6',
    'http://10.6.203.219:3000/user/test?id=7',
    'http://10.6.203.219:3000/user/test?id=8',
    'http://10.6.203.219:3000/user/test?id=9',
    'http://10.6.203.219:3000/user/test?id=10'
]
~~~



### 轮询方法

先说一下第一种方法：轮询

这一方法的核心是定义一个定时器，每隔一小段时间执行一次，执行的内容是判断当前正在处理的请求数 `count` 是否等于 `n` ，若是小于，则处理新的请求。而这个 `count` 的变化，则来自于请求的回调函数，在这里面进行 `count--` 即可认为完成了一个请求

代码实现大致如下：

~~~js
let index = 0
let count = max

// 定时器每200ms查询一次正在处理的请求的数量
let timer = setInterval(() => {
    if(index >= apis.length) {
        clearInterval(timer)
        return
    }

    // 当请求数量小于max时发送下一个请求
    if(count <= max) {
        count++
        axios.get(apis[index++]).then((res) => {
            count--
            console.log('res: ', res.data)
        })
    }
}, 200)

for (; index < max; index++) {
    axios.get(apis[index]).then((res) => {
        count--
        console.log('res: ', res.data)
    })
}
~~~

当时想到这一方法的时候我自己都觉得不太合适，因为面试官要求要高效，而轮询肯定是与高效无缘的。当我说出口后，面试官提示了我一下：你都有 `count` 为什么还要轮询啊？然后我一下就想到了下面的这个方法



### Object.defineProperty

这个方法我的理解是：使用 **观察者模式** 的思想，当观察到 `count` 的变化时，提醒发出消息请求，以此来达到控制同一时间请求数目的需求，而 `Object.defineProperty` 这一 API 正好可以用于实现此功能。通过在某一对象上添加 `status` 属性，并在请求完成时修改以触发它的 `set` 方法，并在 `set` 中进行下一请求的发送，周而复始直至完成所有请求。具体代码如下：

~~~js
let index = 0
let count = 0
// 该数组用于保存和展示当前正在处理的请求的索引
let pendingArr = []
const o = {}

// 当o.status被改变时，即意味着有一个请求处理完了
Object.defineProperty(o, 'status', {
    set() {
        // 为避免超出请求数和同一时间有复数个请求完成，加此if判断
        if (index < apis.length && count < max) {
            const currentIndex = index
            count++
            pendingArr.push(index)
            
            axios.get(apis[index++]).then((res) => {
                count--
                console.log('pendingArr: ', pendingArr)
                pendingArr = pendingArr.filter((item) => item !== currentIndex)
                console.log('res: ', res.data)
                console.log(`索引 ${currentIndex} 的请求已被处理`)
        		// 请求完成后通过修改o.status来触发其set方法
                o.status = index % 2
            })
        }
    }
})

for (; index < max; index++) {
    const currentIndex = index
    pendingArr.push(index)
    
    axios.get(apis[index]).then((res) => {
        count--
        console.log('pendingArr: ', pendingArr)
        pendingArr = pendingArr.filter((item) => item !== currentIndex)
        console.log('res: ', res.data)
        console.log(`索引 ${currentIndex} 的请求已被处理`)
        // 请求完成后通过修改o.status来触发其set方法
        o.status = index % 2
    })
}

count = max
~~~



### 观察Promise状态

此时给出的答案我自己是挺满意的，但面试官表示，既然用了观察者模式的思想，为何不直接观察 `Promise` 的状态？它的 `.then()` 不就是一个对 `Promise` 状态的观察？这一句话让我恍然大悟，根本不需要再额外创建一个对象去监听属性变化，只要在 `axios` 返回的 `Promise.then()` 去进行下一个请求的发送即可

该方法具体代码：

~~~js
let index = 0
let count = 0
let pendingArr = []

// 请求完成后触发的回调函数
const callback = () => {
    if(count < max && index < apis.length) {
        const currentIndex = index
        count++
        pendingArr.push(index)
        axios.get(apis[index++]).then((res) => {
            count--
            console.log('pendingArr: ', pendingArr)
            pendingArr = pendingArr.filter((item) => item !== currentIndex)
            console.log('res: ', res.data)
            console.log(`索引 ${currentIndex} 的请求已被处理`)
            callback()
        })
    }
}

for (; index < max; index++) {
    const currentIndex = index
    pendingArr.push(index)
    axios.get(apis[index]).then((res) => {
        count--
        console.log('pendingArr: ', pendingArr)
        pendingArr = pendingArr.filter((item) => item !== currentIndex)
        console.log('res: ', res.data)
        console.log(`索引 ${currentIndex} 的请求已被处理`)
        callback()
    })
}

count = max
~~~

