---
title: 面试题目复习汇总-JavaScript-1
postTime: 2021-12-24
categories: 杂谈
tags:
- 面试
- 学习笔记
- 汇总
not: true
---





# JavaScript

## JavaScript 有哪些数据类型

基本数据类型：

- **number**
- **string**
- **boolean**
- **null**
- **undefined**
- **symbol**
- **bigint**

引用类型： **object** 



## 在 js 中为什么 0.2+0.1>0.3

在 js 中浮点数是使用 64 位固定长度来表示的，其中 1 位表示符号位，11 位表示指数位，剩下的 52 位表示尾数位。由于尾数位只有 52 位，就会出现十进制转二进制时，若第 52 位后面还有则会被省略，这样再转回十进制的时候就会产生精度缺失



### 那为什么 0.2+0.3=0.5？

同样也是因为位数只有 52 位，`0.2+0.3` 的计算结果在大于 52 位的位置才不是 0 ，而 52 位后的会被省略，因此结果还是等于 0.5



### 十进制小数转二进制

每次乘以 2 ，取计算结果整数位，然后去除整数位，一直重复计算至计算结果为 0

这里举个例子，转换十进制的 0.8125 为二进制：

![image-20211224170934318](https://upyun.cavalheiro.cn/images/image-20211224170934318.png)



## 判断数据类型有哪几种方法

### typeof

此方法的缺点是：当遇上 `null` 时值为 `object` ，所以无法区分 `null` 和 `object` 的类型。这是因为在 JavaScript 中，不同的对象都是使用二进制存储的，如果二进制的前三位都是 0 的话会被判断为 `Object` 类型，而 `null` 的二进制全为 0

~~~js
typeof 1 //'number'

typeof '1' //'string'

typeof true //'boolean'

typeof undefined //'undefined'

typeof Symbol() //'symbol'

typeof 1000000000n //'bigint'

typeof {} //'object'

typeof null //'object'
~~~



### Object.prototype.toString.call()

该方法可以准确区分各种类型的数据，但不能区分是谁的实例，或者说是分不清对象是由哪一个构造函数创建的。我们还可以将其封装成一个获取类型的方法，来简化一些操作：

~~~js
function getType(o) {
    let res = Object.prototype.toString.call(o)
    return res.slice(8, res.length -1).toLowerCase()
}

getType(1) // 'number'

getType() // 'undefined'

getType({}) // 'object'

getType(null) // 'null'

getType([]) // 'array'

getType(new Date()) // 'date'
~~~



### instanceof 和 constructor

这两个方法用于判断对象是属于哪个类构造的，区别在于 `instanceof` 只能通过遍历对象的原型链，判断对象的原型上是否存在目标构造函数的原型对象，对于原始值（如 Number 、String 等）无法判断，需要使用原始值包装类型创建的才可以判定

另一个 `constructor` 则可以对原始值使用，即使是直接定义的原始值也可以通过 `constructor` 属性获取它的构造函数，再判断获取的构造函数是否等于对应的原始值包装类即可



## 手写一个 call 函数

实现思路：

- 判断调用 `call` 的是否是函数，不是则抛出异常
- 获取上下文 `context` ，若没有传入则默认使用 `window`
- 将调用 `call` 的函数保存至 `context` 上
- 从 `arguments` 中获取传入的参数
- 使用 `context.fn(args)` 的方式调用函数
- 执行完后删除 `context` 上的 `fn`
- 返回执行函数执行的结果

同样的思路，只要将传参的方式改为传入数组，即可实现 `apply` 函数

详细代码：

~~~js
Function.prototype.myCall = function(context) {
    if(typeof this !== 'function') {
        throw new Error('Not a function!')
    }

    context = context || window

    context.fn = this

    let args = Array.from(arguments).slice(1)
    let result = context.fn(...args)

    delete context.fn

    return result
}
~~~



## 手写一个 bind 函数

实现思路：

- 判断调用 `bind` 的是否是函数，不是则抛出异常
- 获取上下文 `context` ，若没有传入则默认使用 `window`
- 使用 `_this` 保存调用 `bind` 的函数
- 返回一个新的函数，在这个新的函数里使用 `apply` 函数调用 `_this` ，并返回值

详细代码：

~~~js
Function.prototype.myBind = function(context) {
    if(typeof this !== 'function') {
        throw new Error('Not a function!')
    }
    
    context = context || window

    const _this = this
    const args = Array.from(arguments).slice(1)

    return function() {
        return _this.apply(context, args.concat(...arguments))
    }
}
~~~



## 什么是闭包

闭包的本质是一个引用了其他函数作用域中的变量的函数，此时被引用的变量所在的作用域不会被垃圾回收机制回收

闭包的一些应用：

- 设计模式中的单例模式
- 以前的 for 循环涉及回调、异步的，会导致所有回调获取到的索引值都是循环最后的结果
- 防抖函数和节流函数
- 函数柯里化
- 实现对象的私有变量



## 了解浏览器的垃圾回收机制么

在浏览器的发展史上，最主要的垃圾回收机制有两种：标记清除和引用计数



### 标记清除

这是 JavaScript 中最常用的垃圾回收策略，具体实现为：

当变量进入上下文，比如在函数内声明一个变量，这个变量会被加上一个存在于上下文的标记；当变量离开上下文，加上一个离开的标记。随后垃圾回收程序做一次内存清理，销毁带标记的变量，并回收它们的内存



### 引用计数

相比之下这种方法会显得没那么常用，其思路是：

对每个值都记录它被引用的次数，声明变量时为 1 ，而后每次值被赋予另一个变量时，引用次数 +1 。若引用该值的变量被其他值覆盖了，则引用次数 -1 。若有哪个值的引用次数减少为 0 时，则回收该值所处内存。但这个方式有个致命的缺点，若是出现了循环引用，则会导致对象永远无法被回收



## 什么是原型和原型链

原型的本质也是一个对象，每一个对象都会有一个内部指针 `[[Prototype]]` 指向它的原型，而每个函数（箭头函数除外）都有一个 `prototype` 属性指向函数的原型，在使用该函数构造一个对象时，会将构造出来的对象 `[[Prototype]]` 指针指向函数的 `prototype` 

多个原型对象用内部指针 `[[Prototype]]` 连接起来，就组成了原型链。这一链状结构和继承息息相关。 JS 是通过委托机制进行对象间的数据共享，若在对象自身上请求不到目标属性，则会将该请求委托给它的原型对象，若再没有则继续委托给原型的原型，一级一级往上委托，直到访问属性的请求被处理，或是最后也没找到返回 `undefined`



## 说一说 JS 中常用的继承方式

关于 JS 中的继承，我有一篇文章 [详解JavaScript中的继承](https://juejin.cn/post/7043255540478115877) 对其进行了详细的介绍

这里简单的列举一下 JS 中实现继承的方式：

- 原型链继承
- 盗用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合继承
- ES6 的 `extends` 关键字
