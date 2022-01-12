---
title: 做过的一些面试题
postTime: 2021-01-05
categories: 面试
tags:
- 前端
- 面试题
---
## 第一题

### Object.defineProperty()

> 阿里面试题

**题目：**

~~~js
// 让下列代码打印出结果
if(a === 1 && a === 2 && a === 3){
    console.log('You win!')
}
~~~

**解答：**

~~~js
//  定义一个变量，用于控制返回的内容
let _default = 0

// a未定义，因此挂载在window上
// 覆盖window对象的a属性的取值行为
Object.defineProperty(window, 'a', {
    get(){
        return ++_default
    }
})

// 每次取值_default自增，因此每次判断时a的值都不一样
if(a === 1 && a === 2 && a === 3){
    console.log('You win!')
}
~~~



## 第二题

### .length

**题目：**

~~~js
// 写出下列各变量的值
var len1 = ({} + {}).length()
var len2 = ([] + []).length()
var len3 = (function(){}).length()
~~~

**解答：**

~~~js
// 进行加法运算之前，会进行一次类型转换(toString)
// 对象转换为字符串的结果为："[object Object]"
// 因此加法运算结果为："[object Object][object Object]"
var len1 = ({} + {}).length()

// 数组有自己的toString方法，转换方式如下：
// [1,2,3].toString() -> "1,2,3"
// 因此加法运算结果为：""
var len2 = ([] + []).length()

// function的.length属性返回的是形参个数
var len3 = (function(){}).length()
~~~

**答案：**

~~~js
len1 = 30
len2 = 0
len3 = 0
~~~



## 第三题

### function

**题目：**

~~~js
// 写出下列代码的执行结果
function Foo(){
    getName = function(){
        console.log(1)
    }
    return this
}

Foo.getName = function(){
	console.log(2)
}

Foo.prototype.getName = function(){
    console.log(3)
}

var getName = function(){
    console.log(4)
}

function getName(){
    console.log(5)
}

Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
~~~

**解答：**

~~~js
// 构造函数
function Foo(){
    // 全局变量赋值，执行Foo函数时才会执行下列的赋值语句
    getName = function(){
        console.log(1)
    }
    // 直接执行: this指向window
    return this
}

// 函数Foo上的静态方法 -> 一个函数对象上的方法/树形
Foo.getName = function(){
	console.log(2)
}

// 扩展函数原型上的方法
// var foo = new Foo() -> foo.getName
Foo.prototype.getName = function(){
    console.log(3)
}

// 给全局变量赋值为一个匿名函数
/**
 * 全局预编译 -> GO{}
 * GO{
 *     getName: 
 *     变量声明 undefined -> 
 *     函数声明 function getName(){} ->
 * 	   赋值行为 function (){ console.log(4) }
 * }
 */
var getName = function(){
    console.log(4)
}

// 函数声明
function getName(){
    console.log(5)
}

// 执行Foo函数上的静态方法
Foo.getName()

// 执行window.getName
// 经过全局预编译，当前window.getName的值为: 
// function (){ console.log(4) }
getName()

// 执行Foo()，全局变量赋值，返回window（this）
// 此时Foo().getName()执行的是window.getName()
// 而全局的getName已被修改，因此打印出1
Foo().getName()

// window.getName已被修改，打印1
getName()

// 访问Foo的静态方法来
new Foo.getName()

// 实例化Foo()构造函数后，调用getName方法
new Foo().getName()

/** 
 * new {[new Foo()].getName()}
 * 执行顺序
 * new Foo(): 实例化Foo()构造函数 -> 
 * new [创建的Object].getName(): 实例化Foo()创建的对象上的getName构造函数
 */
new new Foo().getName()
~~~

**答案：**

~~~js
2
4
1
1
2
3
3
~~~



## 第四题

### 事件循环

> 字节跳动面试题：

~~~js
// 写出下面这段代码打印的结果
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2 start');
  return new Promise((resolve, reject) => {
    resolve();
    console.log('async2 promise');
  })
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
}).then(function() {
  console.log('promise3');
});

console.log('script end');

// 答案
script start
async1 start
async2 start
async2 promise
promise1
script end
promise2
promise3
async1 end
setTimeout
~~~

**面试题解析**：

1. console.log('script start') 压入执行栈并执行弹出，打印 **script start**
2. setTimeout() 压入执行栈，其中的回调函数进入消息队列，弹出setTimeout()
3. async1() 压入执行栈，再将console.log('async1 start') 压入执行栈并执行弹出，打印 **async1 start**
4. 遇到await时，在执行完右边的表达式后，会先让出线程，执行外部同步代码（即跳出当前的async1()），阻塞后面的console.log('async1 end')
5. 执行await后的表达式，async2() 压入执行栈，再将console.log('async2 start') 压入执行栈并执行弹出，打印 **async2 start**
6. Promise() 构造函数压入执行栈，再将resolve()，console.log('async2 promise') 压入执行栈，执行并弹出，打印 **async2 promise**
7. async2() 弹出，同时跳出async1()，执行后续代码
8. Promise() 构造函数压入执行栈，console.log('async2 promise')，resolve() 压入执行栈，执行并弹出，打印 **promise1**
9. Promise 后面两个then() 的回调函数进入微任务队列中
10. console.log('script end') 压入执行栈并执行弹出，打印 **script end**
11. 此时调用栈为空，回到async1() ，console.log('async1 end') 进入微任务队列
12. 将微任务队列中的任务压入调用栈执行并弹出，依次打印 **promise2** 、 **promise3** 和 **async1 end**
13. 微任务队列中的任务执行完后，处理消息队列中的任务，打印 **setTimeout**



## 三道阿里面试题

### 第一题

**题目：**

~~~js
/* 计算多个区间的交集
 * 区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）
 * 区间不限定方向，如[5, 2]等同于[2, 5]
 * 实现 getIntersection 函数
 * 可接收多个区间，并返回所有区间的交集（用交集表示），如空集用null表示
 */
~~~

**解答：**

~~~js
// 通过arguments对象，获取输入的所有区间(参数)
function getIntersection() {
    let intersection = arguments[0]

    if (arguments.length <= 1) return intersection

    for (let i = 1; i < arguments.length; i++) {
        let section = arguments[i]

        let iMax = Math.max(...intersection)
        let iMin = Math.min(...intersection)

        // 两个区间最小值的最大值即是交集的最小值
        intersection[0] = Math.max(Math.min(...section), iMin)
        // 两个区间最大值的最小值即是交集的最大值
        intersection[1] = Math.min(Math.max(...section), iMax)

        if (intersection[0] > intersection[1]) return null
    }

    return intersection
}
~~~



### 第二题

**题目：**

~~~jsx
/** 
 * DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数，请用 JS 配合原生 DOM API 实现该需求（不用考虑陈旧浏览器以及再现代浏览器中的兼容性，可以使用任意浏览器的新特性；不用考虑 shadow DOM）。比如在如下页面中运行后：
*/
<html>
  <head></head>
  <body>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
    </div>
  </body>
</html>
// 会输出：

{
  totalElementsCount: 7,
  maxDOMTreeDepth: 4,
  maxChildrenCount: 3
}
~~~

**解答：**

~~~js
const result = {
    totalElementsCount: 0,
    maxDOMTreeDepth: 0,
    maxChildrenCount: 0
}

function doStatistics() {
    const root = document.documentElement

    result.maxDOMTreeDepth = handler(root)
    return result
}

function handler(node) {
    const depths = []

    result.totalElementsCount++

    if (node.children.length > 0) {
        const nodes = node.children

        if (nodes.length > result.maxChildrenCount) {
            result.maxChildrenCount = nodes.length
        }

        for (let i = 0; i < nodes.length; i++) {
            depths.push(handler(nodes.item(i)))
        }
        return Math.max(...depths) + 1
    } else {
        return 1
    }
}
~~~



###  第三题

**题目：**

~~~js
// 请使用原生代码实现一个 Events 模块，可以实现自定义事件的订阅、触发、移除功能
~~~



##  《漫画算法》中的面试题

### 单向链表是否有环

**题目：**

有一个单向链表，链表中可能出现环，编写程序判断该链表是否有环

**解答：**

方案一：通过两层循环遍历，当找到两个节点相等时返回true，若没找到则在循环结束时返回false

~~~js

~~~



### 实现一个栈

**题目：**

实现一个栈，该栈带有出栈（pop）、入栈（push）、取最小值（getMin）三个方法，要保证这三个方法的时间复杂度都为O(1)



### 求最大公约数

**题目：**

求出两个数的最大公约数，要求尽可能的优化算法性能



### 求无序数组排序后的最大相邻差

**题目：**

有一个无序数组，如何求出该数组排序后的任意两个相邻元素的最大差值？要求时间和空间复杂度尽可能低

例子：

~~~js
// 无序数组
[2, 6, 3, 4, 5, 10, 9]
// 排序结果
[2, 3, 4, 5, 6, 9, 10]
// 此时最大相邻差为：9-6=3
~~~



### 使用栈实现队列

**题目：**

用栈来模拟一个队列，要求实现队列的两个基本操作：入队、出队

**解答：**

~~~js
class myQueue {
    constructor() {
        const stack1 = []
        const stack2 = []

        this.shift = function() {
            if(stack2.length == 0) {
                let stack1Length = stack1.length
                for(let i = 0; i < stack1Length; i++) {
                    stack2.push(stack1.pop())
                }
            }

            return stack2.pop()
        }

        this.push = function(item) {
            stack1.push(item)
        }
    }
}
~~~



### 寻找全排列的下一个数

**题目：**

给出一个整数，找出这个整数所有数字全排列的下一个数

例如：

- 输入 12345，返回 12354
- 输入 12354，返回 12435
- 输入 12435，返回 12453



### 删除k个数字后的最小值

**题目：**

给出一个整数，从该整数中间去掉k个数字，要求剩下的数字形成的新整数尽可能小，应该如何选取被删除的数字？

例子：

给出 1593212，删去3个数字，最小的情况为1212（顺序不变）



## CSRF

### 什么是 CSRF

CSRF 全称跨站请求伪造攻击，是通过伪装成受信任的用户来实现恶意利用用户信息行使非法操作，其原理是：

在得知了网站某个功能的接口后，攻击者借此接口构造出一个请求地址，然后通过放置在钓鱼网站的图片 src 里或通过邮件群发等方式，诱使正常用户浏览钓鱼网站或点击链接，让用户在不知不觉中向网站发起请求，同时因为用户在登陆状态发起的请求会被服务器认为是用户本人的合法操作（ HTTP 请求会携带 Cookie ），以此来达到攻击者的目的



### 如何防范 CSRF

1. 在服务器端对请求的请求头字段 `Referer` 进行检测，并限制安全受限的请求只能来源于受信的网站
2. 使用 Cookie 的 SameSite 属性来限制第三方 Cookie ，该属性有三个值： `Strict` 、 `Lax` 、 `None`
3. 使用 token 来进行用户验证，因为 HTTP请求会携带 Cookie 而不会携带 token