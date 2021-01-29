---
layout: ArticleDetail
---
# 面试题

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

**事件循环**

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

