---
title: JavaScript笔记
postTime: 2020-08-09
categories: 
- 前端笔记
- JavaScript
tags:
- JavaScript
- 笔记
---

## JS

### JS：AJAX原理及各种封装

原生js发送HTTP请求：

~~~js
// 兼容问题：IE5/IE6使用ActiveX
let xhr = window.XMLHttpRequest ?
    	new window.XMLHttpRequest :
		new ActiveXObject('Microsoft.XMLHTTP')

/** 发送设置
	method：请求方式
	url：请求地址
	async：是否异步
*/
xhr.open('GET','url',true)

/** 当 XMLHttpRequest.readyState 属性发生变化，调用相应的处理函数
	state表示响应中的数字状态码
	readyState表示XMLHttpRequest当前状态，有五个值：
	0：请求未初始化
	1：服务器连接已建立
	2：请求已接受
	3：请求处理中
	4：请求已完成，且相应已就绪
*/
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        let result = JSON.parse(xhr.responseText)
    }
}

// GET请求发送请求
xhr.send()

// POST请求发送请求
// 设置Header告诉服务器编码格式
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
// 传入的参数即发送的数据，格式为字符串而非对象
xhr.send('a=1&b=2&c=3')
~~~

简单封装：

~~~js
const demo = (function(){
    let xhr = window.XMLHttpRequest ?
        new window.XMLHttpRequest :
        new ActiveXObject('Microsoft.XMLHTTP')
    
    if(!xhr){
        throw Error('当前浏览器不支持发起异步HTTP请求！')
    }
    
    function formateDatas(obj){
        let str = ''
        for(let key in obj){
            str += key + '=' + obj[key] + '&'
        }
        return str.replace(/&$/, '')
    }
    
    function _doAjax(opt){
        let opt = opt || {},
            type = (opt.type || 'GET').toUpperCase(),
            async = opt.async || true,
            url = opt.url,
            data = opt.data || null,
            error = opt.error || function(){},
            success = opt.success || function(){},
            complete = opt.complete || function(){}
        
        if(!url){
            throw new Error('未填写URL！')
        }
        
        xhr.open(type, url, async)
        // post请求时需要设置请求头
        type === 'POST' && xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
        
        xhr.send(type === 'GET' ? null : formateDatas(data))
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                success(JSON.parse(xhr.responseText))
            }
            
            else if(xhr.status === 404){
                error()
            }
            complete()
        }
    }
    
    return {
        ajax: function(opt){
            _doAjax(opt)
        },
        post: function(url, data, success){
            _doAjax({
                type: 'POST',
                url: url,
                data: data,
                success: success
            })
        },
        get: function(url, success){
            _doAjax({
                type: 'GET',
                url: url,
                success: success
            })
        }
    }
})
~~~



### JS：声明式渲染的简单实现

实现使用两个大括号包裹值的方式将数据渲染进DOM，原理：获取DOM元素的InnerHTML，使用**正则**识别{{}}并使用 `replace()` 函数进行替换

~~~js
// elem为作为模板的DOM元素
// data为对应的数据
function render(elem, data) {
    let result = ''
    let str = elem.innerHTML

    data.forEach(element => {
        result += str.replace(/{{(.*?)}}/g, (node, key) => {
            return element[key.trim()]
        })
    });

    elem.innerHTML = result
}
~~~



### JS：事件循环（Event Loop）

- 同步：同步任务都在主线程上执行，形成一个**执行栈**
- 异步：
  - js的异步是通过回调函数实现的，异步任务相关的回调函数添加到**消息队列**（或任务队列）中
  - 使用Promise、async、await创建的异步操作会加入**微任务队列**
- 执行机制：
  - 先执行**执行栈**中的同步任务
  - 异步任务放入**消息队列**和**微任务队列**
  - 执行栈中的所有同步任务执行完毕后，（按次序）先读取**微任务队列**中的异步任务并压入执行栈中执行，再去处理消息队列中的异步任务
  - 由于主线程不断的重复获取任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环（event loop）



### JS：Object.defineProperty()

该方法会在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象（应当直接在Object构造器对象上使用）

参数：

| 参数名        | 参数描述                                               |
| ------------- | ------------------------------------------------------ |
| obj           | 要定义属性的对象                                       |
| prop          | 要定义或修改的属性的名称                               |
| descriptor    | 要定义或修改的属性描述符（默认值均为false或undefined） |
| +configurable | 属性描述符能否被改变（true或false）                    |
| +enumerable   | 是否出现在对象的枚举属性中（true或false）              |
| +value        | 定义属性值                                             |
| +writable     | 能否被赋值运算符改变值（true或false）                  |
| +get          | 函数，覆盖取值行为                                     |
| +set          | 函数，覆盖赋值行为                                     |

示例：

~~~js
const object1 = {}

Object.defineProperty(object1, 'property1', {
  	value: 42,
  	writable: false,
})

// 输出为：42
console.log(object1.property1)
~~~



### JS：Object.assign()

`Object.assign()` 方法用于将所有可枚举属性的值从**一个或多个**源对象复制到目标对象。它将返回目标对象。

ps：`Object.assign()` 方法是浅拷贝，即

例：

~~~js
const target = { a: 1, b: 2 }

const options = {
    color: 'pink'
}

const data = [{
    content: 'hello world'
}]

// 语法：assign(目标对象, ...源对象)
// 改变了目标对象的同时返回目标对象
const returnedTarget = Object.assign(target, options, data)

console.log(target)
// 输出：Object { a: 1, b: 2, color: "pink", danmuData: Array [Object { content: "hello world" }] }

console.log(returnedTarget)
// 输出：Object { a: 1, b: 2, color: "pink", danmuData: Array [Object { content: "hello world" }] }
~~~



### JS：Array.prototype.map()

该方法用于创建一个新数组，传递的参数为一个函数，生成的新数组内容为传入函数的返回值，例：

~~~js
const array1 = [1, 4, 9, 16]

const array2 = array1.map(x => x * 2)

console.log(array2)
// 输出：Array [2, 8, 18, 32]
~~~



### JS：基本类型和引用类型

**基本类型：**

基本类型保存在栈内存中，变量保存的是实际的值。当修改栈内存中的值时，这个变量就保存了新的值。拷贝基本类型时，是在栈内存中开辟出了一个新的存储区域来存储新的变量，两个变量互不干扰

基本类型包括：Number Boolean  String symbol undefined null

~~~js
let a = "Hello World!"
a = "Yeah!Ooooh!"
console.log(a)// "Yeah!Ooooh!"
~~~

**引用类型：**

引用类型也被称为对象定义，它的变量保存的是指向堆内存的一个地址。在拷贝引用类型时，是在栈内存中存入相同的地址，修改引用类型上的属性时，修改的是这个地址指向的堆内存中的值

引用类型包括：Object  Function

~~~js
const b = { test: 1 }
const c = b

b.test = 2
c.test === 2// true
~~~

![_P_88HIORC08OETCQ_G9CMS.png](https://i.loli.net/2020/09/20/YdDcsqg7Oom8P1K.png)



### JS：运行原理

JavaScript是一门**动态类型语言**，由于它的语言特性使得编译器没有办法在运行前知道变量的类型，只有在运行期间才能确定变量类型，因此**不能在运行前编译出更加迅速的机器代码**

虽然如此，JavaScript执行起来依然很快，这是因为现代的JavaScript引擎使用了一项叫做**Just-Time Compilation（运行时编译，简称JIT）**的技术，就是在运行阶段生成机器代码。JIT把代码的运行和生成机器代码结合在一起，在运行阶段收集类型信息，根据这些信息编译



## BOM

### BOM：概述

- 浏览器对象模型（Browser Object Model），把浏览器当作一个对象来看待
- 顶级对象：window
- BOM学习的是浏览器窗口交互的一些对象
- BOM是浏览器厂商在各自浏览器上定义的，兼容性较差



### BOM：window对象常用事件

**窗口加载事件**

- onload：等页面内容全部加载完成后，再去执行处理函数

~~~javascript
//兼容
window.onload = function(){
    //TODO
}

//IE9不兼容
window.addEventListener('onload',()=>{
    //TODO
})
~~~

- DOMContentLoaded：不包括样式表、图片、flash等资源加载完后触发事件

~~~javascript
document.addEventListener('DOMContentLoaded',()=>{
    //TODO
})
~~~

**调整窗口大小事件**

只要窗口大小发生变化就会触发

~~~javascript
window.onresize = function(){
    //TODO
}

window.addEventListener('resize',()=>{
    //TODO
})
~~~



### BOM：定时器

~~~javascript
// setTimeout()定时器
let timer = setTimeout(()=>{
    //TODO
}[,间隔时间，单位ms]);

//清除setTimeout()定时器
clearTimeout(timer);//参数为定时器的名字

//setInterval()定时器，每隔一个间隔时间重复调用回调函数
let timer2 = setInterval(()=>{
    //TODO
}[,间隔时间，单位ms]);

//清除setInterval()定时器
clearInterval(timer2);//参数为定时器的名字
~~~



### BOM：location对象

| location对象方法   | 说明                                   |
| ------------------ | -------------------------------------- |
| location.assign()  | 跟设置href效果一样，也称为重定向页面   |
| location.replace() | 替换当前页面，不记录历史，因此不能后退 |
| location.reload()  | 重新加载页面，相当于按刷新键           |



### BOM：元素偏移量offset

| offset系列方法       | 说明                                                |
| -------------------- | --------------------------------------------------- |
| element.offsetParent | 返回该元素带有position的父元素，若无返回body        |
| element.offsetTop    | 返回相对与带有position的父元素上方的偏移            |
| element.offsetLeft   | 返回相对与带有position的父元素左方的偏移            |
| element.offsetWidth  | 返回自身包括padding、border、内容区的宽度，不带单位 |
| element.offsetHeight | 返回自身包括padding、border、内容区的高度，不带单位 |



### BOM：元素可视区client

| client系列属性       | 作用                                 |
| -------------------- | ------------------------------------ |
| element.clientTop    | 返回上边框大小                       |
| element.clientLeft   | 返回左边框大小                       |
| element.clientWidth  | 返回自身不包括border的宽度，不带单位 |
| element.clientHeight | 返回自身不包括border的高度，不带单位 |



### BOM：元素滚动scroll

scroll事件：当滚动条发生变化时触发该事件

| scroll系列属性       | 说明                                     |
| -------------------- | ---------------------------------------- |
| element.scrollTop    | 返回被卷去的上侧距离，不带单位           |
| element.scrollLeft   | 返回被卷去的左侧距离，不带单位           |
| element.scrollWidth  | 返回自身实际宽度，超出部分也算，不带单位 |
| element.scrollHeight | 返回自身实际高度，超出部分也算，不带单位 |



## ES6

### 面向对象

**定义对象的写法：**

~~~javascript
//es5
function ClassName(name){
    this.name = name;
}

ClassName.prototype.fun1 = function(){
    //函数
}

//es6
class ClassName{
    constructor(name){
        //构造函数的声明
        this.name=name;
    }
    
    fun1(){
        //函数的声明
    }
}
~~~



**继承：**

~~~javascript
//Son子类，Parent父类

//es5继承
function Son(name){
    Parent.call(this,parent_parameters);//引入父类（或叫超类）的属性
    this.name = name;
}
Son.prototype = new Parent;
Son.prototype.constructor = Son;//使用Son自己的构造函数
Son.prototype.fun1 = function(){
    //子类自己的方法
}


//es6继承（统一写法）
class Son extends Parent{
    constructor(){
        super(parent_parameters);//引入父类（或叫超类）的属性
    this.name = name;
    }
    
    fun(){
        //子类自己的方法，父类方法直接用不需要写
    }
}
~~~



**模块：**

es6模块浏览器不支持，需要经过编译（webpack）

使用export设置导出的变量:

~~~javascript
//导出一个变量
export let xxx;
export const xxx;

//导出多个变量
export {
	a,b,c
};

//导出函数
export function fun(){
    ...
};
    
//导出类
export class xxx{
    
};

//默认成员
export default xxx;
~~~

导入：

~~~javascript
// './' 必须写，因为要使用webpack编译，需要遵循nodejs的规范
import xxx as mod1 from './mod1';

import * from './xxx';
import {a,b as num} from './xxx';

//只引入
import './xxx';

//异步引入
let p = import('./xxx');

//导入默认成员
import mod1 from './mod1';
~~~



### 展开操作符

对数组或对象使用，可以将一个结构展开

~~~javascript
//用于数组：
let first = [1,2];
let second = [...first,3,4];//...first == 1,2

//用于对象：
let Obj1 = {
    name : 'zhangsan',
    age : 18
}
let Obj2 = {
    ...Obj1,
    sex : female
}
~~~



### 剩余参数

剩余参数将剩余的参数收入数列

~~~javascript
//...remaining收集了剩余的所有参数
function add(first, second, ...remaining) {
	return first + second + remaining.reduce((acc, curr) => acc + curr, 0);
}
~~~



### 解构赋值

可以从一个对象中取出各个属性，或是从一个数组中取出各个值：

~~~js
let [a, b] = [1, 2]
// 结果：a=1, b=2

let {c, d} = {
    c: 'Tom',
    d: 'Jerry'
}
// 结果：c='Tome', d='Jerry'

let {e, f, ...rest} = {
    e: 10, 
    f: 20, 
    g: 30, 
    h: 40
}
// 结果：e=10, f=20, rest={g: 30, h: 40}
~~~



### Promise





### for...of语句

在可迭代对象上创建一个迭代循环，调用自定义的迭代钩子，为每个不同属性的值执行语句

语法：

~~~js
// 可迭代对象包括Array，Map，Set，String，TypeArray，arguments等
let array = ['a','b','c']

for(let element of array){
    console.log(element)
}
~~~

与for...in区别：for...in用于迭代对象的可枚举属性



### 可迭代协议和迭代器协议

**可迭代协议**

允许对象定义或定制自身迭代行为的协议。一个**可迭代**的对象，必须实现`@@iterator`方法，可通过常量`Symbol.iterator`访问该属性。

当一个对象需要被迭代时，会先以不带参数的形式调用`@@iterator`方法，再使用该方法返回的迭代器获取要迭代的值

~~~js
let someString = 'hello'
typeof someString[Symbol.iterator]			// 结果为："function"

let iterator = someString[Symbol.iterator]()// 返回String迭代器对象
iterator + ""								// 结果为：[object String Iterator]

iterator.next()								// 结果为：{ value: "h", done: false }
~~~



**迭代器协议**

定义了一个对象只有实现了`next()`方法才能成为迭代器，而`next()`方法还需要满足以下条件：

- 无参数，返回一个对象
- 对象有两个值：
  - done：若迭代器已经迭代到最后一个值，则为true
  - value：迭代器返回的值



### 迭代器

迭代器是一个特殊的对象，所有的迭代器对象都有一个`next()`方法，通过这一方法实现**迭代器协议**。`next()`方法返回一个具有两个属性的对象，一个是`value`，表示迭代器返回的值；另一个是`done`，用于判断序列是否已经迭代到最后一个值，是为true，否为false。迭代器还会保存一个内部指针指向当前值的位置，调用`next()`方法时，该指针将会指向下一个可用值

手动为对象部署迭代器：

~~~js
let ojb = {
    data: [1, 2, 3, 4, 5],
    [Symbol.iterator]() {
        const self = this
        let i = 0
        return {
            next: function () {
                let result
                if (i < self.data.length) {
                    result = {
                        value: self.data[i++],
                        done: false
                    }
                    return result
                }
                return {
                    value: i,
                    done: true
                }
            }
        }
    }
}

let iterator = ojb[Symbol.iterator]()
let result = iterator.next()
while (!result.done) {
    console.log(result.value)
    result = iterator.next()
}
~~~



### 生成器函数

生成器函数相当于一个包含自有迭代算法的函数，该函数可以自动维护自己的状态，最初调用时返回一个迭代器

语法：

~~~js
// function后需加一个*
function* createIterator(start = 0, end = Infinity, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}
var a = makeRangeIterator(1,10,2)
a.next() // {value: 1, done: false}
a.next() // {value: 3, done: false}
a.next() // {value: 5, done: false}
a.next() // {value: 7, done: false}
a.next() // {value: 9, done: false}
a.next() // {value: undefined, done: true}
~~~

特性：

- yield控制next()方法时的返回值及返回顺序

- 每执行完一条yield语句后函数就会自动停止执行，直到再次调用迭代器的`next()`方法才会继续执行下一条yield

