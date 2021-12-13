---
title: Day-14 第 K 个最小的素数分数
postTime: 2021-11-29
categories: 每日一题
tags: 
- 算法
- 堆
- 二分
---
::: slot abstract

**题目：**

~~~
给你一个按递增顺序排序的数组 arr 和一个整数 k 。数组 arr 由 1 和若干 素数  组成，且其中所有整数互不相同。

对于每对满足 0 < i < j < arr.length 的 i 和 j ，可以得到分数 arr[i] / arr[j] 。

那么第 k 个最小的分数是多少呢?  以长度为 2 的整数数组返回你的答案, 这里 answer[0] == arr[i] 且 answer[1] == arr[j] 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/k-th-smallest-prime-fraction
~~~

又是一道 **困难** 级别的题目，是今天力扣的每日一题。这道和上次那道 [数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof) 给我的感觉一样，看起来好像挺简单的，总觉得有坑，用自己最先想到的方式做完后就会发现，还真的是有坑

:::



## 第 K 个最小的素数分数

### 题目

~~~
给你一个按递增顺序排序的数组 arr 和一个整数 k 。数组 arr 由 1 和若干 素数  组成，且其中所有整数互不相同。

对于每对满足 0 < i < j < arr.length 的 i 和 j ，可以得到分数 arr[i] / arr[j] 。

那么第 k 个最小的分数是多少呢?  以长度为 2 的整数数组返回你的答案, 这里 answer[0] == arr[i] 且 answer[1] == arr[j] 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/k-th-smallest-prime-fraction
~~~



### 解答

又是一道 **困难** 级别的题目，是今天力扣的每日一题。这道和上次那道 [数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof) 给我的感觉一样，都是看起来好像挺简单的，但实际上这道题要考察的并不是如何实现

这里我首先用自己最先想到的、最无脑的方式来做：

首先是题目中的几个关键词： **递增** ， **素数** ， **互不相同** 。由此可知，不会出现相同的分数，那只要将数组按照获得的分数的顺序排序，然后将 **k** 作为索引直接从排序后的数组中去取就好了。具体代码实现如下：

~~~js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function(arr, k) {
    const temp = []

    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            temp.push([arr[i], arr[j]])
        }
    }

    // a[0] / a[1] 和 b[0] / b[1] 的大小比较，可转换为：
    // a[0] * b[1] 和 b[0] * a[1] 的大小对比
    let result = temp.sort((a, b) => a[0] * b[1] - a[1] * b[0])

    return result[k - 1]
};
~~~

提交上述代码后，果不其然，花的时间多，使用的内存也大：

![image-20211201203255137](http://upyun.cavalheiro.cn/images/image-20211201203255137.png)

但看到这个结果后，我依然是没什么头绪，一时想不到怎么优化。没办法我就去看了力扣官方给的解答，共有三种方式，一个就是上面我所使用的，第二个方法是使用优先队列，但因为在 js 里没有自带的优先队列的实现，要自己写的话稍微复杂了点，所以我选择了最后的一个方法来记录：二分查找 + 双指针

先看代码：

~~~js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function(arr, k) {
    const n = arr.length
    let left = 0, right = 1
    
    while(true) {
        const mid = (left + right) / 2
        let i = -1
        let count = 0
        let x = 0, y = 1
        
        for(let j = 1; j < n; j++) {
            while(arr[i + 1] / arr[j] < mid) {
                i++
                // arr[i] / arr[j] > x / y 可转换为 arr[i] * y > x * arr[j]
                if(arr[i] * y > arr[j] * x) {
                    x = arr[i]
                    y = arr[j]
                }
            }
            count += i + 1
        }
        
        if(count === k) {
            return [x, y]
        }
        
        if(count < k) {
            left = mid
        } else {
            right = mid
        }
    }
};
~~~

接下来的是我对这个实现的个人理解：

设置一个值 `α` ，如果 **恰好有 k 个分数小于 `α`** ，那么就可以确定这 **k 个分数的最大值就是我们要求的第 k 小的素数分数** ，而寻找这个 `α` 的过程可以使用二分查找进行优化

而如何知道有几个数字小于 `α` 呢？这里使用双指针 `i` 指向分子和 `j` 指向分母，设小于 `α` 的个数为 `count` ，若 `i` 所指的分子在 `j` 作为分母时所得分数小于 `α` ，那么 **所有小于 `i` 所指数字的数在 `j` 作为分母时也肯定小于 `α`** ，此时小于 `α` 的数就有 `i + 1` 个，总个数：`count += i + 1`

在上述两个的过程中，同时保存小于 `α` 的分数的分子 `x` 和分母 `y` ，若当前的分数大于上一个分数，则更新 `x` 和 `y`

举个例子：

目标数组 `[1, 2, 3, 5]` ，求第 3 小的素数分数，那么就可以通过二分法找到从 0 到 1 中的某一个分数 `α` ，使之大于 3 个素数分数。我们可以直接按顺寻列出所有分数，然后可知最小的三个素数分数为： `1/5、 1/3、 2/5` ，此时通过二分法得到的 `α = 1/2` ，所以最终答案为：`[2, 5]`

