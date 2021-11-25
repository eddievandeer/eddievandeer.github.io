---
title: Day-11 数据流中的中位数
postTime: 2021-11-06
categories: 每日一题
tags:
- 排序
- 二叉堆
---



::: slot abstract

**题目：**

~~~
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof
~~~

这道题在力扣上的评级是 **困难** ，所以当我第一眼看到的时候总感觉是不是哪里有坑，毕竟这题只要每次取的时候排序一下，然后取中位数返回就好了

当我写完第一版代码提交后，执行时间居然高达四千多毫秒！这才注意到，要考虑数据量大的情况，最后想到的是用两个 **二叉堆** 来进行处理

:::



## 数据流中的中位数

### 题目

~~~
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof
~~~



### 错误解答

看到这道题的第一眼，我想到的是：

使用一个数组存放数据，在每一次执行 `addNum` 方法添加数据后，将数组进行排序，然后执行 `findMedian` 来获取中位数时，就可以直接通过长度为奇数还是偶数来判断和取值

具体代码如下：

~~~js
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.nums = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.nums.push(num)
    this.nums.sort((a, b) => a - b)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const n = this.nums.length
    const sorted = this.nums

    if(n % 2 == 1) {
        let target = Math.floor(n / 2)
        return sorted[target]
    } else {
        let right = n / 2, left = right - 1
        return (sorted[left] + sorted[right]) / 2
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
~~~



写完总觉得不对劲，这道题标的是 **困难** 难度啊，就这么写完了也太简单了吧？结果我一提交，一看运行结果

![image-20211107212811417](http://upyun.cavalheiro.cn/images/image-20211107212811417.png)

好家伙，刷题刷这么久还是第一次见四千多毫秒的，这时我才反应过来要考虑数据量大的情况来进行优化（被简单题蒙蔽了）



### 正确解答

对于这道题，要计算中位数排序是必不可少的，但我们可以借助堆来降低时间复杂度：

> 用一个大顶堆存放较小的那一半，一个小顶堆存放较大的那一半，且规定小顶堆长度与大顶堆相等或比它小 1 ，这样我们就可以取两个堆的堆顶来进行中位数的计算

设这个大顶堆为 `A` ，小顶堆为 `B` ，它们的长度分别为： `m` ， `n` 

当 `m == n` 时，说明当前列表长度为偶数，插入数字的时候先插入 `B` ，然后再将 `B` 的堆顶拿出并插入 `A` 中，此时 `A` 堆顶就是中位数；

当 `m != n` 时，说明当前列表长度为奇数，插入数字的时候先插入 `A` ，然后再将 `A` 的堆顶拿出并插入 `B` 中，此时 `A` 堆顶就是列表较小那一半的最大值， `B` 堆顶就是列表较大那一半的最小值，中位数即为两堆顶的平均值

最终代码如下：

~~~js
// 编写一个Heap类来实现二叉堆
class Heap {
    constructor(cmp = (a, b) => a > b) {
        this.array = []
        this.cmp = cmp
    }

    // 添加元素时，需要将其进行 “上浮”
    insert(num) {
        const { array, cmp } = this

        array.push(num)
        let childIndex = array.length - 1
        let parentIndex = parseInt((childIndex - 1) / 2)

        let temp = array[childIndex]

        while (childIndex > 0 && cmp(temp, array[parentIndex])) {
            array[childIndex] = array[parentIndex]
            childIndex = parentIndex
            parentIndex = parseInt((childIndex - 1) / 2)
        }

        array[childIndex] = temp
    }

    // 删除顶部元素时，将最后一个节点移到顶部，并对其进行 “下沉”
    pop() {
        const { array, cmp } = this

        const result = array.shift()

        if(this.size() == 0) return result

        array.unshift(array.pop())

        let parentIndex = 0
        let temp = array[parentIndex]
        let childIndex = parentIndex * 2 + 1
        let length = this.size()

        while (childIndex < length) {
            if (childIndex + 1 < length && cmp(array[childIndex + 1], array[childIndex])) {
                childIndex++
            }

            if (cmp(temp, array[childIndex])) {
                break
            }

            array[parentIndex] = array[childIndex]
            parentIndex = childIndex
            childIndex = 2 * childIndex + 1
        }

        array[parentIndex] = temp

        return result
    }

    size() {
        return this.array.length
    }

    peek() {
        let n = this.size()
        return n > 0 ? this.array[0] : null
    }
}

var MedianFinder = function() {
    this.A = new Heap()
    this.B = new Heap((a, b) => a < b)
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    const a = this.A.size()
    const b = this.B.size()

    if(a != b) {
        this.A.insert(num)
        this.B.insert(this.A.pop())
    } else {
        this.B.insert(num)
        this.A.insert(this.B.pop())
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const a = this.A.size()
    const b = this.B.size()

    if(a !== b) return this.A.peek()
    else return (this.A.peek() + this.B.peek()) /  2
}
~~~

使用堆优化后的执行结果为：

![image-20211124115551926](http://upyun.cavalheiro.cn/images/image-20211124115551926.png)

可以看得出来，使用了堆之后速度明显更快了
