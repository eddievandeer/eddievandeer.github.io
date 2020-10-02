---
layout: ArticleDetail
---

# JavaScript笔记

## JS

### JS：同步、异步执行原理

- 同步：同步任务都在主线程上执行，形成一个**执行栈**

- 异步：js的异步是通过回调函数实现的，异步任务相关的回调函数添加到任务队列（或消息队列）中

- 执行机制：
  - 先执行**执行栈**中的同步任务
  - 异步任务放入任务队列
  - 执行栈中的所有同步任务执行完毕后，系统将按次序读取任务队列中的异步任务，结束异步任务的等待状态，进入执行栈开始执行
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

例：

~~~js
const target = { a: 1, b: 2 };

const options = {
    color: 'pink'
};

const data = [{
    content: 'hello world'
}];

// 语法：assign(目标对象, ...源对象)
// 改变了目标对象的同时返回目标对象
const returnedTarget = Object.assign(target, options, data);

console.log(target);
// 输出：Object { a: 1, b: 2, color: "pink", danmuData: Array [Object { content: "hello world" }] }

console.log(returnedTarget);
// 输出：Object { a: 1, b: 2, color: "pink", danmuData: Array [Object { content: "hello world" }] }
~~~



### JS：Array.prototype.map()

该方法用于创建一个新数组，传递的参数为一个函数，生成的新数组内容为传入函数的返回值，例：

~~~js
const array1 = [1, 4, 9, 16];

const array2 = array1.map(x => x * 2);

console.log(array2);
// 输出：Array [2, 8, 18, 32]
~~~



### JS：基本类型和引用类型

**基本类型：**

基本类型保存在栈内存中，变量保存的是实际的值。当修改栈内存中的值时，这个变量就保存了新的值

~~~js
let a = "Hello World!"
a = "Yeah!Ooooh!"
console.log(a)// "Yeah!Ooooh!"
~~~

**引用类型：**

引用类型也被称为对象定义，它的变量保存的是指向堆内存的一个地址。当一个引用对象赋给多个变量时，这些变量在栈内存中保存了相同的地址。修改引用类型上的属性时，并没有修改栈内存上的地址，而是这个地址指向的堆内存中的值被修改了

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
import xxx as mod1 from './mod1';// './' 必须写，因为要使用webpack编译，需要遵循nodejs的规范

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
