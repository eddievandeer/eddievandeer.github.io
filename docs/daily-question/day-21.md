---
title: Day-21 数组中和为 0 的三个数
postTime: 2022-02-11
categories: 每日一题
tags: 
- 算法
- 数组
- 双指针
---
::: slot abstract

**题目：**

~~~
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请找出所有和为 0 且 不重复 的三元组。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/1fGaJU
~~~

这道题其实就是 [两数之和](https://leetcode-cn.com/problems/kLl5u1/) 的进阶版，只是多了个无序和三个元素这两个要素。两数之和是找到两个数相加为目标指，那我可以在外面再套一层循环，然后用两数之和的方法去获取当前值的相反数，不就能得到三数之和的答案了吗？

:::



## 数组中和为 0 的三个数

### 题目

~~~js
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请找出所有和为 0 且 不重复 的三元组。
~~~



### 解答

这道题其实就是 [两数之和](https://leetcode-cn.com/problems/kLl5u1/) 的进阶版，只是多了个无序、不重复和三个元素这几个要素。两数之和是找到两个数相加为目标指，那我可以在外面再套一层循环，然后用两数之和的方法去获取当前值的相反数，不就能得到三数之和的答案了吗？

那么废话不多说，直接开搞！

首先，我们先回忆一下两数之和的做法：

定义双指针 `left` 和 `right` ，记 `sum` 为两指针指向的值的和。当 `sum` 大于目标值时，说明需要将 `left` 指针右移寻找更大的值；当 `sum` 小于目标值时，说明需要将 `right` 指针左移寻找更小的值；当 `sum` 等于目标值时，这两个值就是我们要找的目标

接着上面的思路走，要找和为 0 的三个数的话，那只要在外面再套一层循环，然后每次以当前循环到的值的相反数为目标，放到两数之和那里去找和为该值的两个数，这样就可以找到三个数了

下面就是完整的代码：

~~~js
var threeSum = function(nums) {
    const result = []

    // 需要先排序
    nums.sort((a, b) => a - b)
    
    for(let i = 0; i < nums.length; i++) {
        // 遇到重复的跳过
        if(i != 0 && nums[i] === nums[i - 1]) continue

        // 外层循环控制当前要寻找的“两数之和”
        let target = -nums[i]

        // 下面的代码就是两数之和的内容了
        let left = i + 1
        let right = nums.length - 1

        while(left < right) {
            let sum = nums[left] + nums[right]

            if(sum == target) {
                result.push([-target, nums[left], nums[right]])
				
                // 找到符合目标的值后，跳过重复数值
                while(left < right && nums[left] === nums[++left]) {}
                while(left < right && nums[right] === nums[--right]) {}
            } else if(sum < target) {
                left++
            } else {
                right--
            }
        }
    }

    return result
};
~~~

