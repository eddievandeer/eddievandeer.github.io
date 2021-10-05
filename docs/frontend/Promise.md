---
title: 手写符合Promise A+规范的Promise
postTime: 2021-04-10
categories: 前端教程
tags: 
- Promise A+
- 异步
---

::: slot abstract

![image-20210521151359134.png](https://i.loli.net/2021/05/21/wyzrMWnK2tsUTbC.png)

最近在面试中被问到了一些Promise相关的问题，感觉自己回答的不是很好，于是决定，参照 [Promise A+ 规范](https://promisesaplus.com/) 手写一下Promise加深对Promise的理解。

参考了掘金上的 [一篇文章](https://juejin.cn/post/6945319439772434469) ，毕竟还是小菜鸡一枚，让我直接照着Promise A+直接上手敲代码不太现实~~

:::

## 前置知识点

### 宏任务与微任务

JS是单线程的，因此一些高耗时的操作将会导致进程阻塞。为解决这个问题，JS有两种任务的执行模式： **同步模式** 和 **异步模式** 。

在异步模式下，创建的异步任务分为如下两种： **宏任务** 和 **微任务** 。ES6规范中，宏任务（Macrotask）称为Task，是由宿主（浏览器或者Node）发起的，微任务（Microtask）称为Jobs，是由JS自身发起的

> 宏任务和微任务有如下几种创建方式：

| 宏任务                      | 微任务                         |
| --------------------------- | ------------------------------ |
| setTimeout                  | Promise.[then/catch/finally]   |
| setInterval                 | MutationObserver（浏览器环境） |
| setImmediate（Node环境）    | process.nextTick（Node环境）   |
| script（整体代码块）        | queueMicrotask                 |
| postMessage，MessageChannel |                                |



### EventLoop

执行顺序：

1. 判断宏任务队列是否为空
   - 空 → 执行下一步
   - 非空 → 执行最早进入宏任务队列的任务 → 执行下一步
2. 判断微任务队列是否为空
   - 空 → 执行下一步
   - 非空 → 执行最早进入微任务队列的任务 → 继续检查微任务队列是否为空

因为首次执行宏任务队列会有script（整体代码块），所以在JS解析完成后，会先执行所有的微任务，也就是说 **微任务会在宏任务（整体代码块除外）之前执行**



### Promise A+ 规范

目前使用的Promise是基于Promise A+规范实现的，检验手写Promise是否合格的标准就是看它能否通过Promise A+规范，这里可以借助 `promise-aplus-tests` 来检测代码是否符合规范

详细信息：[Promise A+ 规范](https://promisesaplus.com/)



## 手写Promise

### Promise核心逻辑

原生的Promise有如下的几个基本原理：

1. Promise是一个类，在实例化这个类的时候传入一个执行器函数，这个执行器函数会立即执行
2. Promise有三种状态
   - Pending 等待
   - Fulfilled 完成
   - Rejected 失败
3. Promise的初始状态为Pedding，可以由Pendding转换为Fulfilled或者Rejected，状态改变只能发生一次，一旦状态发生改变就不可恢复
4. Promise使用 **resolve** 和 **reject** 两个函数来进行状态变更
5. then方法内部做状态判断：
   - 若为 Fulfilled 成功状态，执行成功的回调函数
   - 若为 Rejected 失败状态，执行失败的回调函数

代码如下：

~~~js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        if(this.status == PENDING) {
            this.status = FULFILLED
            this.value = value
        }
    }
    
    reject = (reason) => {
        if(this.status == PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
    }

    then(onFulfilled, onRejected) {
        if(this.status == FULFILLED) {
            onFulfilled(this.value)
        }
        else if(this.status == REJECTED) {
            onRejected(this.reason)
        }
    }
}

export default MyPromise
~~~

此时下列代码可以正常运行：

~~~js
const p = new MyPromise((resolve, reject) => {
    resolve(100)
    reject('Error!')
})

p.then((value) => {
    console.log('Fulfilled', value)
}, (reason) => {
    console.log('Rejected', reason)
})

// 执行结果：Fulfilled 100，状态只改变一次，resolve后的reject不在起效
~~~



### 在Promise中加入异步逻辑

上述代码在执行器函数中加入异步逻辑时，无法正常处理，这是因为主线程代码执行时then会立即执行，而因为执行器函数中的操作是异步的，then函数执行的时候还没有进行状态的改变，状态是Pending，因此可以有如下解决方案：

1. 在then函数中处理Pending状态
2. 若then中判断状态为Pending，将成功和失败的回调函数暂时存起来，在resolve和reject函数中去执行存起来的回调函数

修改后的代码如下：

~~~js
class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        
        // 用于暂时存放回调
        this.onFulfilledCallbacks = null
        this.onRejectedCallbacks = null

        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        if(this.status == PENDING) {
            this.status = FULFILLED
            this.value = value
            
            this.onFulfilledCallbacks && this.onFulfilledCallbacks(value)
        }
    }
    
    reject = (reason) => {
        if(this.status == PENDING) {
            this.status = REJECTED
            this.reason = reason
            
            this.onRejectedCallbacks && this.onRejectedCallbacks(reason)
        }
    }

    then(onFulfilled, onRejected) {
        if(this.status == FULFILLED) {
            onFulfilled(this.value)
        }
        else if(this.status == REJECTED) {
            onRejected(this.reason)
        }
        else if(this.status == PENDING) {
            this.onFulfilledCallbacks = onFulfilled
            this.onRejectedCallbacks = onRejected
        }
    }
}
~~~

此时下列代码可以正常运行：

~~~js
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 2000)
})

p.then((value) => {
    console.log('Fulfilled', value)
}, (reason) => {
    console.log('Rejected', reason)
})

// 执行结果：两秒后打印 Fulfilled 100
~~~



### 实现then方法多次调用

上面的代码在then方法的多次调用时，由于暂时储存的回调方法被新的回调函数覆盖，只会处理最后调用的then，例如下列情况：

~~~js
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 2000)
})

p.then((value) => {
    console.log('Fulfilled 1', value)
})

p.then((value) => {
    console.log('Fulfilled 2', value)
})

p.then((value) => {
    console.log('Fulfilled 3', value)
})

// 执行结果：两秒后打印 Fulfilled 3 100
~~~

为解决此问题，可以将暂时储存的回调函数改成一个回调函数数组，修改后的代码如下：

~~~js
class MyPromise {
    constructor(executor) {
        // ...
        
        // 用于暂时存放回调
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        executor(this.resolve, this.reject)
    }

    resolve = (value) => {
        if(this.status == PENDING) {
            // ...
            this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
    }
    
    reject = (reason) => {
        if(this.status == PENDING) {
            // ...
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    then(onFulfilled, onRejected) {
        // ...
        else if(this.status == PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        }
    }
}
~~~



### 实现then方法的链式调用

原生的Promise在链式调用的时候，是通过前一个then方法返回一个Promise，再由返回的这一个Promise来调用下一个then方法

~~~js
class MyPromise {
	// ...
    then(onFulfilled, onRejected) {
        // 为实现链式调用，这里创建了一个MyPromise实例
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 创建一个微任务
                queueMicrotask(() => {
                    // 获取成功回调的返回值
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }

            if (this.status === REJECTED) {
                // 获取失败回调的返回值
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
            else if(this.status == PENDING) {
                this.onFulfilledCallbacks.push(onFulfilled)
                this.onRejectedCallbacks.push(onRejected)
            }
        })
        
        return promise2
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 防止循环调用，抛出错误
    if (x == promise2) {
        return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
    }

    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    }
    else {
        resolve(x)
    }
}
~~~

> 注意：
>
> 1. 若在then方法传入的回调函数中，返回的是then方法return的Promise，则会发生循环调用，这时候应该抛出一个错误，原生抛出的错误为：**TypeError: Chaining cycle detected for promise #\<Promise\>**
> 2. 在向resolvePromise函数传入promise2参数时，因为此时promise2还未被实例化会报错，因此在这里使用一个异步函数去等待promise2的实例化，用到创建微任务的技术方案：queueMicrotask

运行下列代码，一切正常

~~~js
const p = new MyPromise((resolve, reject) => {
    resolve(100)
})

p.then((value) => {
    console.log('Fulfilled 1', value)
    return new MyPromise((resolve, reject) => {
        resolve(200)
    })
}).then((value) => {
    console.log('Fulfilled 2', value);
})

// 打印结果如下：
// Fulfilled 1 100
// Fulfilled 2 200
~~~



### 捕获错误

Promise中有可能出现的错误有如下两种：

1. **执行器错误**

   ~~~js
   // 当执行器中的代码发生错误时，拒绝并以捕获的错误为reason返回
   constructor(executor) {
       // ...
       try{
           executor(this.resolve, this.reject)
       } catch(e) {
           this.reject(e)
       }
   }
   ~~~

   

2. **then执行时的错误**

   ~~~js
   /*
    * 由于onFulfilled和onRejected是外部传入的，
    * 无法明确知道代码是否能够正常执行，
    * 因此需要使用try catch包裹住，
    * 抛出错误时reject拒绝掉
    */
   then(onFulfilled, onRejected) {
       const promise2 = new MyPromise((resolve, reject) => {
           if (this.status == FULFILLED) {
               queueMicrotask(() => {
                   try {
                       const x = onFulfilled(this.value)
                       resolvePromise(promise2, x, resolve, reject)
                   } catch(e) {
   					reject(e)
                   }
               })
           }
           else if (this.status == REJECTED) {
               queueMicrotask(() => {
                   try {
                       const x = onRejected(this.reason)
                       resolvePromise(promise2, x, resolve, reject)
                   } catch(e) {
                       reject(e)
                   }
               })
           }
           else if (this.status == PENDING) {
               // 实现then方法多次调用
               this.onFulfilledCallbacks.push(() => {
                   queueMicrotask(() => {
                       try {
                           let x = onFulfilled(this.value)
                           resolvePromise(promise2, x, resolve, reject)
                       } catch (e) {
                           reject(e)
                       }
                   })
               })
               this.onRejectedCallbacks.push(() => {
                   queueMicrotask(() => {
                       try {
                           let x = onRejected(this.reason)
                           resolvePromise(promise2, x, resolve, reject)
                       } catch (e) {
                           reject(e)
                       }
                   })
               })
           }
       })
   
       return promise2
   }
   ~~~



### then参数可选

在原生的Promise中then方法是可以选择性地传入回调函数的，传入单个或不传都不影响执行

~~~js
then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    // ...
}
~~~

执行：

~~~js
const p1 = new MyPromise((resolve, reject) => {
    resolve('success')
})

p1.then().then().then(value => {
    console.log(value);
})

const p2 = new MyPromise((resolve, reject) => {
    reject('error')
})

p2.then().then().then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
})

// 打印结果：
// success
// error
~~~



### 实现resolve和reject的静态方法

Promise.resolve和Promise.reject会返回一个Promise对象，该对象的状态若是调用resolve静态方法，则状态为Fulfilled；若是调用reject静态方法，则状态为Rejected

代码实现如下：

~~~js
class MyPromise {
    // ...
    static resolve(parameter) {
        // 判断传入的参数是否为MyPromise类型，是则直接返回
        if (parameter instanceof MyPromise) {
            return parameter
        }

        return new MyPromise((resolve, reject) => {
            resolve(parameter)
        })
    }

    static reject(parameter) {
        return new MyPromise((resolve, reject) => {
            reject(parameter)
        })
    }
}
~~~



## Promise A+测试

### 使用promise-aplus-tests

为了测试手写的MyPromise是否符合Promise A+规范，引入上面提到过的 `promise-aplus-tests` ：

~~~bash
npm install promises-aplus-tests -D
~~~

安装完成后进行如下配置（package.json）：

~~~json
{
    "name": "rewrite-promise",
    "version": "1.0.0",
    "description": "",
    "main": "MyPromise.js",
    "scripts": {
        // 配置测试脚本
        "test": "promises-aplus-tests MyPromise.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "promises-aplus-tests": "^2.1.2"
    }
}
~~~

在手写的MyPromise中添加一个deferred函数：

~~~js
class MyPromise{
    // ...
}

MyPromise.deferred = function () {
    var result = {}

    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve
        result.reject = reject
    })

    return result
}
~~~

运行测试脚本进行Promise A+规范的测试：

~~~bash
npm run test
~~~

这个时候功能上虽然没什么问题，但测试结果却是失败了，说明手写的MyPromise不完全符合Promise A+规范。此时 `promises-aplus-tests` 会打印出受检测的Promise在哪些地方符合规范哪些地方不符合规范，照着控制台打印的信息即可进行手写Promise的改进

控制台打印内容如下：

![image-20210412202707288](https://i.loli.net/2021/04/12/b5suI7XRwY8Av3Z.png)



### 改进MyPromise

针对上面打印的提示信息，再参照[Promise A+ 规范](https://promisesaplus.com/)即可发现问题：

Promise A+ 规范中要求要对x（即回调的返回值）的类型进行判断

- 当x为Object或Function类型时，x需要是一个Promise（一个实现了thenable的对象或函数），若x不是Promise则拒绝；
  - 若 `x.then` 是一个函数，以x为内部this执行 `x.then` ，
    - 若被解决则传入一个 `y` 值，并调用 `resolvePromise(promise, y, resolve, reject)`
    - 若被拒绝则传入一个 `r` 值，并以此值为原因拒绝 `reject(r)`
    - 若解决或拒绝被调用多次，则只执行第一次，忽略后续的调用
  - 若 `x.then` 执行失败则拒绝
  - 若 `x.then` 不是一个函数，直接 `resolve(x)`

- 当x为其他类型时，直接 `resolve(x)`

![image-20210507171330728.png](https://i.loli.net/2021/05/07/B5TpUyV4x9hJmCQ.png)

按照Promise A+ 规范修改后 `resolvePromise函数` 的代码如下：

~~~js
function resolvePromise(promise, x, resolve, reject) {
    if (x == promise) {
        return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
    }

    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x)
        }

        let then

        try {
            then = x.then
        } catch (e) {
            return reject(e)
        }

        if (typeof then === 'function') {
            let called = false

            try {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise, y, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    })
            } catch (e) {
                if (called) return

                reject(e)
            }
        }
        else {
            resolve(x)
        }
    }
    else {
        resolve(x)
    }
}
~~~

再次检查，启动测试脚本，完美通过！

![image-20210507173310227.png](https://i.loli.net/2021/05/07/2TyebJ4XDBWqjCn.png)