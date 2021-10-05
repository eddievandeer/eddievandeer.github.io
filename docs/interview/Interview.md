---
title: 实习面经
postTime: 2021-03-28
categories: 面试
tags:
- 前端
- 面试经历
---

## 春招

### 饿了么 一面

第一次面试，当时很紧张，同时也发现了自身的基础不够扎实

1. 自我介绍（这里犯了个错，直接照着简历念了，应该讲讲自己什么时候开始学前端，怎么学，看过哪些书等等）

2. 问了些项目相关的，涉及了Github Actions和DNS污染，都是我自己简历上写的内容

3. 《JavaScript高级程序设计》上印象深刻的地方

   当时回答了原型链和继承这一块，原型继承、盗用构造函数继承、组合继承、寄生继承

4. 重写了原型上的方法，还能够调用被覆盖的方法吗？

   回答：可以，使用 **(目标对象构造函数).prototype.(被覆盖的方法)** 可以访问到被覆盖的方法，再通过 **.call()** 或 **.apply()** 传入this指针和参数即可

5. 像上述这种情况你能想到有哪些应用场景吗？

   这里不知道，就回答了在Vue的源码中，有通过这种方式覆盖数组中会改变数据的方法，以此来拦截对数组数据的更改

6. 讲一讲浏览器渲染原理

   当时因为紧张没讲清楚，正确答案如下：

   浏览器渲染过程主要分五步：

   - 将HTML文档解析为DOM树

   - 处理CSS标记，构建CSSOM
   - 将DOM和CSSOM合并为渲染树(rendering tree)，同时display:none的元素不在该树中
   - 布局（回流），即让浏览器弄清楚各个节点在页面的确切位置和大小
   - 调用GPU绘制、合成图层，显示在屏幕上

7. HTTP有哪几种请求类型

   当时因为这块掌握的不好就慌了，只答上来四个，完整的是八个，分别是：

   GET，POST，HEAD，PUT，OPTIONS，DELETE，CONNECT，TRACE

8. 说一说HTTP有哪些常见的字段

   这个真不会，只记得下面这几个了

   - HOST：指定服务器的域名
   - Content-Length：表示返回的数据长度
   - Content-Type：表示返回的数据类型

   面试官补充了一个Cookie（当时真的是脑抽了，连这个都忘了）后，提问了几个关于Cookie的问题

9. Cookie从哪里来？如果不设置保存时间，下一次访问该网站时还会在请求中带上Cookie吗？

   此时已经被问懵了，回答了个Cookie从后端获取，以json格式发送到前端；不设置保存时间应该有默认的保存时间（这里全错了）

   面试官纠正：Cookie是从后端来的没错，但不是json而是通过Set-Cookie响应头；不设置保存时间的Cookie会保存在SessionStorage中，只在本次会话中有效，会话结束就会删除，下一次访问时不会再带上

面试经历总结：太紧张，且浏览器运行原理及HTTP方面的基础不够扎实



### 阿里 菜鸟 一面

这场面试持续的时间比较短，总共就二十几分钟

1. 自我介绍

2. 问项目

3. Vue2和Vue3的区别

   我当时的回答是：

   - Vue2是Options API，也叫做配置项API，在创建实例的时候传入data，methods，computed等等的配置项，而Vue3是Composition API，每一个功能都是一个函数，需要用到时导入进来

   - Vue2的数据劫持部分使用的是 **Object.defineProperty()** ，而Vue3使用的是ES6中的 **Proxy**

4. 讲一讲Vue的数据劫持

   Vue2：使用 **Object.defineProperty()** 定义对应的访问器属性，在get中进行依赖收集，在set中若数据变化了则做出通知，重新渲染页面

   Vue3：使用的是 **Proxy** 来进行代理，实现的效果与Vue2一致

5. 说一下从输入网址回车到浏览器展示页面都经历了什么

   - 第一步解析域名，浏览器会先搜索本地DNS缓存中是否有对应的条目，若是没有找到则向DNS服务器发送域名解析请求来获取域名对应的IP地址
   - 建立TCP连接，发送HTTP请求至服务器，服务器返回相应的HTML文件
   - 浏览器接收服务器返回的HTML文件，进行页面渲染，渲染流程如下：
     - 将HTML解析为DOM树
     - 处理CSS标记，构建CSSOM
     - 将DOM和CSSOM合并为渲染树(rendering tree)，同时display:none的元素不在该树中
     - 布局（回流），即让浏览器弄清楚各个节点在页面的确切位置和大小
     - 调用GPU绘制、合成图层，将页面显示在屏幕上

6. 问了几个算法方面的内容，因为完全没有准备又被问懵了

   - 简述一下栈和队列（这个简单，就不多说了）

   - 说一下二分查找的流程

     二分查找的数组是有序的，将数组分为两半，比较目标数据和中间数据的大小，然后在符合的那一半中再分成两半，重复上面的操作直到最终找到目标数据（因为慌了说的很乱）

   - 二分查找的时间复杂度

     没答上来。。。是O(log2n)

   - 说一下动态规划

     支支吾吾的，面试官直接表示可以了，知道我什么水平了

7. 有没有什么问题想问的

最后居然通过了，二面时间待定



### 阿里 菜鸟 二面

凉得很快的一次面试，问的问题都答不上来。。。后来好奇查了下面试官，居然是阿里菜鸟前端负责人

1. 自我介绍
2. 分享一下Vue源码的学习经历和体会
3. 有实习经验吗，做过商业项目吗
4. 在开发个人项目的过程中遇到过哪些难点，你是怎么解决的
5. webpack的打包和优化
6. 你觉得前端是什么，谈谈你对前端的理解
7. 你对前端方向的学习有什么规划
8. 有什么想问的吗

不到二十分钟光速凉凉，不过也暴露出自身的很多问题，对前端开发还没有一个深刻的理解，也对自己未来的职业生涯没有规划，想的太少了

webpack的学习也不够，对各种性能优化的手段都不了解



### 美团 一面

1. 自我介绍

2. DOM有哪些常见的API

3. 使用 insertBefore() 来实现在一个节点的后面插入节点

   ~~~js
   function insertAfter(newNode, referenceNode) {
       const parentNode = referenceNode.parentNode
       
       if(parentNode.lastChild == referenceNode) {
           parentNode.appendChild(newNode)
       }
       else {
           parentNode.insertBefore(newNode, referenceNode.nextSibling)
       }
   }
   ~~~

4. 数组都有哪些操作方法，使用 split() 获取url参数

   ~~~js
   // 例：http://example.com?a=b&c=d，传入a返回a对应的值
   function getValue(key, url) {
       const query = url.split('?')[1]
       const arr = query.split('&')
       
       for(let i = 0; i < arr.length; i++) {
           const keyValue = arr[i].split('=')
           if(key == keyValue[0]) return keyValue[1]
       }
   }
   ~~~

5. 栈和队列的区别，怎么用两个栈来实现一个队列

   ~~~js
   /* 入队顺序：1，2，3
    * 放入第一个栈，再依次出栈，出栈顺序为：3，2，1
    * 再放入第二个栈，依次出栈，出栈顺序为：1，2，3
    * 以此来实现队列
    */
   // ES5构造函数实现如下
   function myQueue() {
       this.stack1 = []
       this.stack2 = []
       
       this.shift = function() {
           if(this.stack2.length == 0) {
               let stack1Length = this.stack1.length
               for(let i = 0; i < stack1Length; i++) {
                   this.stack2.push(this.stack1.pop())
               }
           }
           
           return this.stack2.pop()
       }
       
       this.push = function(item) {
           this.stack1.push(item)
       }
   }
   
   // ES6类及私有变量实现如下
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

6. 讲一讲快速排序，再用js代码实现一下

   找一个元素作为基准，其他元素依次与基准元素进行比较，比基准元素大的放在一边，比它小的放另一边，再进行递归处理分割出来的两个数组执行和上面一样的操作，一直分割直到分割出的数组长度为1

   采用了分而治之的思想，平均时间复杂度为O(nlogn)，极端情况下退化为O(n²)

   ~~~js
   // 面试时一时没写出来，不过面试官看我流程讲得很流畅就跳过了
   // 这里重新写一下，加深对快排的记忆
   function quickSort(arr, startIndex = 0, endIndex = arr.length - 1) {
       if(startIndex > endIndex) return
       
       let pivotIndex = partition(arr, startIndex, endIndex)
       
       quickSort(arr, startIndex, pivotIndex - 1)
       quickSort(arr, pivotIndex + 1, endIndex)
   }
   
   function partition(arr, startIndex, endIndex) {
       let pivot = arr[startIndex]
       let left = startIndex
       let right = endIndex
       
       while(left < right) {
           while(left < right && arr[right] > pivot) {
               right--
           }
           while(left < right && arr[left] <= pivot) {
               left++
           }
           
           if(left < right) {
               let temp = arr[left]
               arr[left] = arr[right]
               arr[right] = temp
           }
       }
       
       arr[startIndex] = arr[left]
       arr[left] = pivot
       
       return left
   }
   ~~~

7. 说一下HTTP有哪些请求类型，了解HTTP的缓存吗

   参照饿了么一面，缓存没有了解。。

8. 说一下你对cookie了解多少

9. 你是怎么学习前端的，对前端的理解

   之前被阿里问过，面试挂了后好好的思考过一段时间，算是提前做好了功课吧

10. 能实习多久，课多不多，能不能接受到北京实习

    这里感觉已经稳了，有点开心

11. 有什么要问的吗

    问了下前端现在都有哪些方向，想要参考着来规划接下来的学习

    方向有数据可视化，跨端解决方案，nodejs等，但面试官建议我先不用着急往这种大的方向去考虑，先把基础打好打扎实了，有一说一确实应该如此，参考了面试官的建议决定继续看书学习



### 美团 二面

这一次的面试持续了足足80多分钟，感觉问了好多东西，各个方面都有，有的地方是我熟悉或者擅长的，还没来得及讲就被面试官转移话题了，感觉有点亏（这里不是说面试官故意打断，是我没把握好面试节奏，没有很好的把话题往擅长的部分拉，面试官人很好），所以掌握好面试的节奏很重要

1. 讲一下自己最近的学习

   讲着讲着都在讲学习计划了，忘了讲现在的学习情况了。。。被面试官吐槽怎么都是TODO

2. 为什么学习前端

3. 实现一下两列布局

   ~~~css
   /* 面试的时候float写反了，写到right里了。。。 */
   .left {
       width: 300px;
       height: 100%;
       float: left;
   }
   
   .right {
       width: auto;
       height: 100%;
   }
   
   /* 第二种方法 */
   .parent {
       display: flex;
   }
   
   .left {
       width: 300px;
       height: 100%;
   }
   
   .right {
       width: auto;
       height: 100%;
       flex: 1;
   }
   ~~~

4. 问一道关于position的问题

   已知A容器包含B容器，A是居中显示的，他的position是relative，B的position是absolute，top和left均为0， 问B的左上角会和哪里对齐？当 A的position变更为absolute时又会怎么样？

   这道题面试完复盘的时候，发现有两种情况

   ~~~css
   /* 当使用这种方式给A居中时，A为relative时B在A的左上角 */
   /* 当A为absolute时A和B都在body的左上角 */
   body {
       width: 100%;
       height: 100vh;
       display: flex;
   }
   
   .a {
       width: 300px;
       height: 300px;
       background-color: red;
       margin: auto;
       position: relative;
   }
   
   .b {
       width: 100px;
       height: 200px;
       background-color: green;
       position: absolute;
       top: 0;
       left: 0;
   }
   
   /* 当使用这种方式给A居中时，A不管为relative还是absolute，B在A的左上角且A还是居中 */
   body {
       width: 100%;
       height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
   }
   
   .a {
       width: 300px;
       height: 300px;
       background-color: red;
       position: relative;
   }
   
   .b {
       width: 100px;
       height: 200px;
       background-color: green;
       position: absolute;
       top: 0;
       left: 0;
   }
   ~~~

5. 知道雪碧图吗，他解决了什么问题

6. 动画性能优化

   这里是由我发起的，聊了会动画优化方面，transition，animation，transform，然后面试官又问我还知道哪些关于浏览器运行原理方面的知识吗，我回了浏览器的渲染原理

7. 聊一聊你对原型这块的了解

8. 实现一个函数，传入图片url获取图片的宽高

   ~~~js
   // 当时脑抽了就这么写了，面试官提醒了才发现应该等图片加载完
   function getImageHeight(url) {
       const image = new Image()
       image.src = url
       
       document.body.appendChild(image)
       
       return {
           height: image.style.height,
           width: image.style.width
       }
   }
   
   // 加一个onLoad
   function getImageHeight(url, result) {
       const image = new Image()
       image.src = url
       
       document.body.appendChild(image)
       
       image.addEventListener('load', () => {
           result.height = image.style.height
           result.width = image.style.width
       })
   }
   ~~~

9. 讲一讲Promise，或者手写一下看看

   这边刚说最近在学习的过程中有手写过Promise，然后面试官就话题一转问了Promise.all()和Promise.race()，感觉有点可惜

10. 谈一谈跨域，以及子页面和父页面的通信

11. 去除数组中的重复元素

    ~~~js
    function reduce(arr) {
        const set = new Set()
        
        for(let item of arr) {
            set.add(item)
        }
        
        return Array.from(set)
    }
    
    // 经面试官提醒，可以一行代码直接解决
    function reduce(arr) {
        return Array.from(new Set(arr))
    }
    ~~~

    不用Set或者Map，不用API来解决上述问题：

    ~~~js
    function reduce(arr) {
        const result = []
        result.push(arr[0])
    
        for(let i = 1; i < arr.length; i++) {
            let exist = false
            for(let j = 0; j < result.length; j++) {
                if(result[j] == arr[i]) {
                    exist = true
                    break
                }
            }
            if(!exist) result.push(arr[i])
        }
    
        return result
    }
    
    // 写完面试官问干嘛不用一个空对象，恍然大悟！
    // 因为刚才说不能用map就把和map差不多的对象给忘了
    function reduce(arr) {
        const result = []
        const obj = {}
    
        for(let i = 0; i < arr.length; i++) {
            if(obj[arr[i]] == undefined) {
                result.push(arr[i])
            }
            obj[arr[i]] = i
        }
    
        return result
    }
    ~~~

12. 给出一个数组，格式为 [{key:"key1",value:"1"},{key:"key2",value:2}] ，要求写一个函数，讲数组转换为如下格式的对象：{ key1:1, key2:2 }

    ~~~js
    const arr = [{key:"key1",value:"1"},{key:"key2",value:2}]
    
    // 遍历
    function keyValue(arr) {
        const result = {}
        
        for(let {key, value} of arr) {
            result[key] = value
        }
        
        return result
    }
    
    // 使用reduce函数
    function keyValue(arr) {
        const reuslt = arr.reduce((pre, cur) => {
            pre[cur[key]] = cur[value]
            return pre
        },{})
        
        return result
    }
    ~~~

    