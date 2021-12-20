---
title: 在JavaScript中实现私有变量的各种姿势
postTime: 2021-10-16
categories: 
- 前端笔记
- JavaScript
tags:
- JavaScript
- 类
- 笔记
---

::: slot abstract

在面向对象的语言中，我们都听过并经常使用私有变量这个概念，例如在 **Java** 中定义类的成员时，只需要在成员的前面加上一个 `private` 关键字即可。但在 JavaScript 中，要实现这个概念就没这么容易了，需要用到一些 "小技巧" 。以下是《JavaScript高级程序设计》中对 js 的私有变量的描述：

> 严格来说，JavaScript没有私有成员的概念，所有属性都公有的。不过，倒是有**私有变量**的概念。任何定义在函数或块中的变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量。

因此，我们可以得知，这个小技巧就是指 **闭包** ，最主要的还是一个 **作用域** 的问题

::: 



## 前言

在面向对象的语言中，我们都听过并经常使用私有变量这个概念，例如在 **Java** 中定义类的成员时，只需要在成员的前面加上一个 `private` 关键字即可。但在 JavaScript 中，要实现这个概念就没这么容易了，需要用到一些 "小技巧" 。以下是《JavaScript高级程序设计》中对 js 的私有变量的描述：

> 严格来说，JavaScript没有私有成员的概念，所有属性都公有的。不过，倒是有**私有变量**的概念。任何定义在函数或块中的变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量。

因此，我们可以得知，这个小技巧就是指 **闭包** ，最主要的还是一个 **作用域** 的问题



## 实现方式

实现 JavaScript 的私有变量有多种方式，这里主要介绍一下常见的几种：



### 约定

这是最简单的一种实现方式，只需要在开发前提前约定好哪一些成员是私有的，如：以 `_` 开头的变量，然后对于这一类的成员不对它进行直接的访问和修改操作

~~~js
class Person {
    constructor(age) {
        this._age = age
    }
    
    getAge() {
        return this._age
    }
    
    setAge(newAge) {
        this._age = newAge
    }
}

// 约定不使用 p._age 的方式访问和修改成员
let p = new Person(21)
~~~

这种方式有诸多缺点，一般不使用，这里只是简单提一下



### 特权方法

这种方法主要是在定义类的时候，在类的内部创建一个私有变量，然后创建一个能够访问这个私有变量的公有方法，也就是创建了一个 **闭包** 用于对外使用，下面是一个例子：

~~~js
class MyObject {
    constructor() {
        let value = 123
        
        this.getValue = () => {
            return value
        }
        
        this.setValue = (newValue) => {
            value = newValue
        }
    }
}

const o = new MyObject()

o.getValue()
// 123
o.value
// undefined

o.setValue(233)

o.getValue()
// 233
~~~

从上述代码的打印结果可以看出，直接访问实例上的 `value` 时，是访问不到的，需要使用特权方法 `getValue` 和 `setValue` 才可以对 `value` 进行操作

这里无法访问 `value` 是因为它只是在构造函数中声明的一个变量，没有被绑定到 `this` 上，也没有被添加到原型链上，他只能在构造函数的作用域中被访问。而我们写的这两个特权方法，本质上是一个闭包，引用了构造函数的作用域，因此能够访问 `value` 

不过这种方式也有一个缺点，那就是 **特权方法不能重用** ，每次创建实例的时候都要创建一个新的函数。下面要讲的静态私有变量就可以有效地避免这个问题



### 静态私有变量

为了解决特权方法的重用，我们需要将其添加到类的原型上，而非实例上。要达到这种效果的话，就不能是在构造函数中去声明私有变量了，而是要在构造函数外声明，但又不能污染外部的作用域，所以 **需要使用一个立即执行函数来构建一个私有作用域** ，然后在这个私有作用域中去声明私有变量和类，代码如下：

~~~js
const MyObject = (function() {
    let value = 123

    class MyObject {
        constructor() {
            // ...
        }

        getValue() {
            return value
        }

        setValue(newValue) {
            value = newValue
        }
    }

    return MyObject
})()

const o = new MyObject()
const o2 = new MyObject()

o2.getValue === o.getValue
// true

o.getValue()
// 123
o.value
// undefined

o.setValue(233)

o.getValue()
// 233
o2.getValue()
// 233
~~~

从上述代码及其运行情况我们可以看出，使用这种方式创建的特权函数可以有效的进行重用，并且也很好的实现了变量的私有化。需要注意的是，因为私有变量是声明在构造函数外的，所以它是在所有实例之间共享的，也就是说它是一个静态变量

因为这一特性，我们在开发时，就需要根据自己的需求来确定要使用静态私有变量，还是实例内的私有变量



### Symbol

还有一个方法，能够实现每个实例有自己的私有变量，且特权方法能够重用，这个方法需要用到的 `symbol` 是 **ES6** 才引入的新的数据类型，可以通过 `Symbol()` 函数创建该类型的变量

这个类型有一个特点，那就是每一个从 `Symbol()` 函数 **返回的 symbol 值都是唯一的** ，且能够作为对象属性的标识符，因此成为了实现类私有变量的绝佳选择

> 更多有关 `symbol` 的描述可以点击 [此处](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 查看 MDN 文档

~~~js
const MyObject = (function() {
    let _value = Symbol('value')
    _value == _value2	// false
    
    class MyObject {
		constructor() {
            this[_value] = 123
        }
        
        getValue() {
            return this[_value]
        }

        setValue(newValue) {
            this[_value] = newValue
        }
    }
    
    return MyObject
})()

const o = new MyObject()

o[Symbol('value')]
// undefined

o.getValue()
// 123
~~~

这里的 `_value` 作为对象属性标识符，可以像字符串一样使用，所以可以通过 `this` 指针来实现私有变量的读写，且因为 symbol 类型的特性，还不会被外部随意读取。同时，因为特权方法是定义在原型上的，所以还实现了函数的重用

通过这种方式创建出的对象结构如下：

![image-20211102202942929](https://upyun.cavalheiro.cn/images/image-20211102202942929.png)

使用这种方法实现的私有变量已经和其他面向对象语言的效果差不多了，因此我个人是将其当作最佳实践来使用的



### 模块模式

前面介绍的这几个方式都是通过自定义类型创建了私有变量和特权方法，接下来要说的是由 [Douglas Crockford](https://baike.baidu.com/item/Douglas%20Crockford/5960317?fr=aladdin) 提出的模块模式，它是在一个单例对象上来实现相同的隔离和封装

~~~js
const singleton = function() {
    let value = 123
    
    return {
        // 其他公有属性
        getValue() {
            return value
        },
        setValue(newValue) {
            value = newValue
        }
    }
}()
~~~

这里使用了一个匿名函数来提供私有作用域，并返回一个只包含公有成员的对象，这种方式适合不需要创建类型，而是专注于对象的场景，属于是真正的 **"面向对象"** 了（有点类似于继承中的 **原型式继承** ）

还可以通过在返回新对象之前对其进行增强，这种方式适合要返回的单例对象需要是某个特定类型的实例，同时还必须给它添加额外属性或方法的场景，就比如下面这个例子：

~~~js
const singletono = function() {
    let value = 123
    
    const object = new SomeType()
    
    object.publicProperty = true
    
    object.getValue = function() {
        return value
    }
    
    object.setValue = function(newValue) {
        value = newValue
    }
    
    return object
}()
~~~

这样就可以返回一个能够被 `instanceof` 操作符确定类型的对象，同时这个对象还有着对应的私有变量和操作私有变量的特权方法（有点类似于继承中的 **寄生式继承** ）
