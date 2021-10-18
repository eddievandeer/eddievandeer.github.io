---
title: Day-01 栈与队列
postTime: 2021-09-30
categories: 每日一题
tags:
- 算法
- 栈
- 队列
---

::: slot abstract

栈和队列算是算法中最常见，最基础的数据结构了，两者的大致描述如下：

- 栈：一种 **"先进后出"** 的数据结构，有多种实现方式，最常用的是数组实现
- 队列：一种 **"先进先出"** 的数据结构，也是常用数组实现

> 关于栈和队列的题目大多都比较容易，这里放两道比较具有代表性的题目

:::

## 栈与队列

栈和队列算是算法中最常见，最基础的数据结构了，两者的大致描述如下：

- 栈：一种 **"先进后出"** 的数据结构，有多种实现方式，最常用的是数组实现
- 队列：一种 **"先进先出"** 的数据结构，也是常用数组实现

关于栈和队列的题目大多都比较容易，这里放两道比较具有代表性的题目



### 第一题

**题目：**

~~~
使用两个栈实现一个队列
~~~



**解答：**

首先，栈和队列的特点我们都清楚了，因为栈的特性，无法直接取得栈底也就是队首的元素，需要先将后续进栈的元素 pop 出去才行

所以要用栈来实现队列出队的操作，需要另一个容器来暂时存储被 pop 出来的元素（也就是我们的第二个栈）。元素按照出栈的顺序存入第二个栈，此时第二个栈内的元素和第一个栈 **顺序是相反的** ，这样就能在栈顶取得队首元素并返回。之后不必将元素放回第一个栈，这样下一次再进行出队操作的时候就可以直接从第二个栈中 pop 出来

而对于入队操作不需要做特殊处理，直接 push 进第一个栈即可

有了上面的思路后，就可以开始编码了，具体代码如下：

~~~js
var CQueue = function() {
    this.stack1 = []
    this.stack2 = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    // 当stack2中有元素时，直接返回stack2栈顶元素
    if(this.stack2.length > 0) return this.stack2.pop()
    
    // 当stack1和stack2都为空时，说明队列为空，返回-1代表空
    if(this.stack1.length === 0) return -1
    
    let len = this.stack1.length
    // 将stack1的内容倒序输入到stack2中储存
    for(let i = 0; i < len; i++) {
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
};
~~~



### 第二题

**题目：**

~~~
实现一个包含min函数的栈，这个min函数能够得到栈的最小元素
~~~



**解答：**

看到这道题的第一眼时，我的想法是：

> 设置一个变量 minValue ，在每一次进行 push 操作的时候比较入栈的元素和 minValue 的大小，若小于则更新 minValue ，然后通过 min 函数将其返回

然而现实告诉我我太天真了，这样虽然在部分情况下一切正常，但 **若是 pop 出去的就是最小值呢** ？这个时候最小值就不是 minValue 了，又要怎么更新 minValue ？

所以这个办法行不通，但可以转换一下思路，不用一个变量来存最小值，而是用一个数组呢？于是就有了新的解决方案：

> 使用一个栈 minStack 来保存最小值的历史，栈顶的元素为当前最小值，当执行 pop 操作的时候，判断出栈的元素是否为最小值，是则将 minStack 的栈顶元素 pop 出栈，此时栈顶重新回到上一次更新前的最小值

根据此方案实现的代码如下：

~~~js
var MinStack = function() {
    this.data = []
    this.minStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.data.push(x)

    // 比较 minStack 栈顶元素和入栈的元素大小，若入栈元素较小则将其压入 minStack 栈中
    if(this.minStack.length === 0 || this.minStack[this.minStack.length - 1] >= x) {
        this.minStack.push(x)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const cur = this.data.pop()

    // 判断出栈元素是否为最小值，是则 minStack 栈顶出栈，此时栈顶为当前的最小值
    if(this.minStack[this.minStack.length - 1] === cur) {
        this.minStack.pop()
    }

    return cur
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    // 返回 minStack 栈顶元素
    return this.minStack[this.minStack.length - 1]
};
~~~

