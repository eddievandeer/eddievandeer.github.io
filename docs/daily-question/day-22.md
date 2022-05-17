---
title: Day-22 和大于等于 target 的最短子数组
postTime: 2022-02-12
categories: 每日一题
tags: 
- 数组
- 滑动窗口
---
::: slot abstract

**题目：**

~~~
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/2VG8Kg
~~~

这种涉及连续子数组的题目，就我个人经验而言，都可以先看看能不能用滑动窗口来解决，而这道题刚好可以

:::



## 和大于等于 target 的最短子数组

### 题目

~~~
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/2VG8Kg
~~~



### 解答

这道题可以使用滑动窗口的概念解决。设置一个滑动窗口，起始和结束坐标分别为：`start` 和 `end` ，在滑动窗口内的子数组和小于 `target` 时，窗口的 `end` 后移一位；若子数组和大于等于 `target` ，从 `start` 开始一个一个删除元素，直到和小于 `target` 为止，在这之前那一个子数组就是符合条件的子数组，再通过与前一个符合条件的子数组的长度做对比，以此来获取最终的结果

具体代码如下：

~~~js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let n = nums.length
    if(n == 0) return 0

    let result = Infinity

    let start = 0
    let end = 0
    let sum = 0

    while(end < n) {
        sum += nums[end]

        while(sum >= target) {
            result = Math.min(result, end - start + 1)
            sum -= nums[start]
            start++
        }
        end++
    }

    return result === Infinity ? 0 : result
};
~~~

