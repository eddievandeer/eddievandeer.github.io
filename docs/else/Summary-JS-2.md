---
title: 面试题目复习汇总-JavaScript-2
postTime: 2021-12-25
categories: 杂谈
tags:
- 面试
- 学习笔记
- 汇总
not: true
---





# JavaScript

## 手写一个深拷贝

当我们使用展开运算符 `let clone = {...target}` 或者 `let clone = Object.asign({}, target)` 去进行对象的复制时，对于目标对象中的引用类型并没有复制一份新的，而是直接指向了之前的引用类型，可以理解为复制了指针，并没有新开辟一块空间。这一过程叫做浅拷贝

而深拷贝指的就是复制的过程中，重新开辟一片空间来复制引用类型，一个简易的实现如下：

~~~js
function isObject(o) {
    return (typeof o === 'object' && o !== null)
}

function isArray(array) {
    return Array.isArray(array)
}

function deepClone(target) {
    if(!isObject(target)) return target
        
    const obj = isArray(target) ? [] : {}

    for(let key in target) {
        if(isObject(target[key])) {
            obj[key] = deepClone(target[key])
        } else {
            obj[key] = target[key]
        }
    }

    return obj
}
~~~

这里还有一个特殊情况，要是出现诸如： `a = {}; a.a = a` 这样的循环引用，会造成死循环，可以增设一个 `Map` 避免：

~~~js
// ......

function deepClone(target, hash = new Map()) {
    if(!isObject(target)) return target
    if(hash.has(target)) return hash.get(target)
        
    const obj = isArray(target) ? [] : {}

    hash.set(target, obj)

    for(let key in target) {
        if(isObject(target[key])) {
            obj[key] = deepClone(target[key], hash)
        } else {
            obj[key] = target[key]
        }
    }

    return obj
}
~~~

这里还可以使用循环来代替递归，具体操作可以参考树的遍历，这里不在赘述



## 为什么 JS 是单线程的？

我的理解是，因为 JS 里面有可视的 DOM ，如果是多线程的话，这个线程正在删除 DOM 节点，另一个线程正在编辑 DOM 节点，导致浏览器不知道该听谁的



## Generator 是怎样使用的

Generator 生成器，本质是一个函数，返回的是一个迭代器对象

### // TODO: 高程的生成器章节



## 手写一个 Promise

还没有在面试的时候遇到过让手写 Promise 的情况，不过尝试照着 [Promises/A+](https://promisesaplus.com/) 实现一个简单的 `Promise` ，下面是我自己写的简易 `Promise` ：

~~~js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = null
        this.reason = null

        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        try {
            executor(this.resolve, this.reject)
        } catch(e) {
            this.reject(e)
        }
    }

    resolve = (value) => {
        if(this.state === PENDING) {
            this.state = FULFILLED
            this.value = value

            this.onFulfilledCallbacks.forEach((fn) => fn())
        }
    }

    reject = (reason) => {
        if(this.state === PENDING) {
            this.state = REJECTED
            this.reason = reason

            this.onRejectedCallbacks.forEach((fn) => fn())
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        const promise2 = new MyPromise((resolve, reject) => {
            if(this.state === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    } catch(e) {
                        reject(e)
                    }
                })
            } else if(this.state === REJECTED) {
                queueMicrotask(() => {
                    try {
                        let x = onRejected(this.reason)
                        reject(x)
                    } catch(e) {
                        reject(e)
                    }
                })
            } else if(this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    queueMicrotask(() => {
                        onFulfilled(this.value)
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                        onRejected(this.reason)
                    })
                })
            }
        })

        return promise2
    }
}
~~~



## 手写一个 Promise.all()

先来看一下原生的 `Promise.all()` 有什么功能：

- 接收一个可迭代对象，该对象的每个项为一个 `Promise`
- 每 `resolve` 一个 `Promise` 对象就将其结果放入一个数组中，作为最终的返回值
- 当所有 `Promise` 对象都被 `resolve` 后，返回被 `Promise` 包装的结果数组
- 当有一个对象被 `reject` 后，直接结束并返回一个 `Promise` 包装的拒绝原因

综合上面提到的功能手写的 `Promise.myAll()`  代码如下：

~~~js
Promise.myAll = function(promises) {
    let results = []

    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
            const current = promises[i] instanceof Promise
                ? promises[i]
                : Promise.resolve(promises[i])
            
            current.then((value) => {
                results.push(value)
                
                if(i == promises.length - 1) {
                    // 所有Promise处理完后返回结果数组
                    resolve(results)
                }
            }, (reason) => {
                // 处理失败则跳出
                reject(reason)
            })
        }
    })
}
~~~



## 宏任务和微任务

### 宏任务和微任务都有哪些

| 宏任务                      | 微任务                         |
| --------------------------- | ------------------------------ |
| setTimeout                  | Promise.[then/catch/finally]   |
| setInterval                 | MutationObserver（浏览器环境） |
| setImmediate（Node环境）    | process.nextTick（Node环境）   |
| script（整体代码块）        | queueMicrotask                 |
| postMessage，MessageChannel |                                |

> 注意：
>
> Promise 是同步任务， Promise.then 才是异步的



### 宏任务和微任务都是怎么执行的

这里先提一下几个概念：执行栈、消息队列、微任务队列。执行栈用于放置正在执行的任务，所有的宏任务都会被放入消息队列，而微任务会被放入为任务队列。接下来是执行的过程：

- 起始状态下， `script` 处于消息队列的队首，然后被放入执行栈中执行
- 当执行遇到宏任务时，将其放入消息队列
- 当执行遇到微任务时，将其放入微任务队列
- 当执行栈空出来时，会先清空微任务队列，将其中的每一个任务按顺序放入执行栈执行
- 清空为任务队列后，再次从消息队列里取出一个宏任务，放入执行栈执行
- 执行完成后继续清空微任务队列，依次循环，就是 JS 的事件循环机制了

