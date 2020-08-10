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





## DOM

### DOM：toggle()

作用：判断指定的类是否存在，若存在则移除，不存在则添加。

用法：

~~~javascript
document.queryselector("#id || .class").classList.add("classname");
~~~



### DOM：旋转拖拽

#### 过程

- 获取拖动的距离差

#### 代码

~~~javascript
let nowX,nowY,//现在鼠标的坐标
	lastX,lastY,//上一次鼠标的坐标
    minusX,minusY,//距离差
    roX,roY;//旋转度数
let El = document.getElementById("id");

document.onmousedown = function(e){
    let e1 = e || window.event;//兼容问题，IE不能直接获取
    lastX = e1.clientX;
	lastY = e1.clientY;
    
    this.onmousemove = function(e){
        let e2 = e || window.event;
        nowX = e2.clientX;
        nowY = e2.clientY;
        
        minusX = noeX - lastX;
        minusY = noeY - lastY;
        
        //TODO
        roX = roX - minusY;//上下拖动沿X轴旋转
        roY = roY + minusX;//左右拖动沿Y轴旋转
        
        El.style.transform = "rotateX(" +roX+ "deg)rotateY(" + roY + "deg)";
        
        lastX = nowX;
        lastY = nowY;
    }
}
~~~



### DOM：HTML5新增元素获取方式

- queryElementByClassname()：
  - 返回所有同类名的元素（集合）
- querySelector()：
  - 返回指定选择器的第一个元素
- querySelectorAll()：
  - 返回指定选择器的所有元素（集合）
- 获取父元素中的子元素：
  - querySelector('.parentClass').querySelectorAll('img');
- 特殊元素的获取：
  - body：document.body
  - html：document.documentElement



### DOM：排他算法

遍历排除其他，然后处理自身

~~~javascript
let el = document.querySelector('.className').querySelector('li');

for(let i = 0;i < el.length;i++){
    el[i].onclick = function(){
        //遍历排除其他
        for(let i = 0;i < el.length;i++){
            el[i].classList.remove('active');
        }
        //处理自身
        this.classList.add('active');
    }
}
~~~



### DOM：H5新增自定义属性

- 规范：自定义的属性以 **data-** 开头

- 获取：

  - 兼容性获取：

    ~~~javascript
    element.getAttribute('data-xxx');
    element.getAttribute('data-list-first');
    ~~~

  - H5新增获取方法（只能获取**data-**开头的）：

    ~~~javascript
    element.dataset.xxx;
    element.dataset.listFirst;//-改驼峰
    ~~~



### DOM：事件流

描述的是从页面中接收事件的顺序，指事件在元素节点之间按照特定的顺序传播的过程。

JS代码只能执行捕获或冒泡其中的一个阶段。

~~~javascript
//第三个参数设置为true则处于捕获阶段
document.querySelector('.son').addEventListener('click',function(){
    //TODO
},true)

document.querySelector('.parent').addEventListener('click',function(){
    //TODO
},true)
//执行结果先parent，再son


//第三个参数设置为false或者不设置（默认false），则处于冒泡阶段
document.querySelector('.son').addEventListener('click',function(){
    //TODO
})

document.querySelector('.parent').addEventListener('click',function(){
    //TODO
})
//执行结果先son，再parent
~~~



### DOM：事件对象

常写作event，作为侦听函数的形参，可以通过事件对象获取和事件相关的信息，如点击事件时获取鼠标位置，键盘事件获取按下了哪个键。

兼容性问题：IE678通过window.event

~~~javascript
document.querySelector('.xxx').addEventListener('click',function(event){
    //TODO
    e = e || window.event;//兼容性问题，一般不考虑
})
~~~

e.target和this的区别：

- e.target：返回触发事件的对象
- this：返回绑定事件的对象（相似：e.currentTarget）





## BOM

### BOM：概述

- 浏览器对象模型（Browser Object Model），把浏览器当作一个对象来看待
- 顶级对象：window
- BOM学习的是浏览器窗口交互的一些对象
- BOM是浏览器厂商在各自浏览器上定义的，兼容性较差



### BOM：window对象常用事件

#### 窗口加载事件

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



#### 调整窗口大小事件

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





## ES6

### 面向对象

#### 定义对象的写法：

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



#### 继承：

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



#### 模块：

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

