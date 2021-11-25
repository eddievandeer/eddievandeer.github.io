---
title: Day-08 如何判断一个对象是Array类型
postTime: 2021-10-18
categories: 每日一题
tags:
- JavaScript
- 面试
---

::: slot abstract

**题目：**

~~~
如何判断一个对象是否为 Array 类型
~~~

这是今天遇上的一道面试题，当时只想到了两种，这里稍微整理一下答案

:::



## 如何判断一个对象是Array类型

### isArray()

这是我想到的第一种方法，是在 ES5 引入的 `isArray()` 方法，他是位于全局对象 `Array` 上的静态方法，用于判断传入的对象是否为 Array 类型

~~~js
const arr = [1, 2, 3]
const obj = { '0': 1, '1': 2, '2': 3 }

Array.isArray(arr) // true
Array.isArray(obj) // false
~~~



### instanceof

`instanceof` 关键字用于判断对象的原型链中是否出现了构造函数的原型对象，使用方法如下：

~~~js
const arr = [1, 2, 3]
const obj = { '0': 1, '1': 2, '2': 3 }

arr instanceof Array // true
obj instanceof Array // false
~~~



### constructor

`constructor` 是每个对象都有的、指向其构造函数的属性，通过判断一个对象的 `constructor` 和  `Array` 是否相等即可判断出该对象是否为数组

~~~js
const arr = [1, 2, 3]
const obj = { '0': 1, '1': 2, '2': 3 }

arr.constructor == Array // true
obj.constructor == Array // false
~~~



### Object.prototype.toString.call()

`Object.prototype.toString` 可以将对象转换为 `[object Object]` 格式的字符串

~~~js
const arr = [1, 2, 3]
const obj = { '0': 1, '1': 2, '2': 3 }

Object.prototype.toString.call(arr) == '[object Array]' // true
Object.prototype.toString.call(obj) == '[object Array]' // false
~~~



### 鸭子类型

> 如果一只动物，长得像鸭子，走路和叫声也像鸭子，那么这就是一只鸭子

鸭子类型的含义是：我们并不关心对象的类型，只关心它的行为。这种方法准确来说是用来判断数组和伪数组（即看起来像数组的对象）的。如果一个对象以从 0 开始计数的下标存储数据，包含 `length` 属性，还拥有 `slice` 、 `splice` 等方法，那么我们就可以把它当成是一个数组对象
