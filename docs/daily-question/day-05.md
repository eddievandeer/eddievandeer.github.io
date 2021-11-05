---
title: Day-05 查找算法
postTime: 2021-10-05
categories: 每日一题
tags:
- 算法
- 查找
---

::: slot abstract

查找也是算法题中的常客，这里介绍几道简单的查找类题目

这里有一个需要注意的点：

> 遇到 **有序数组的搜索** 时，优先考虑使用 **二分法** 

::::

## 查找算法

查找也是算法题中的常客，这里介绍几道简单的查找类题目：



### 第一题

**题目：**

~~~
找出数组中的重复的数字
~~~



**解答：**

最简单的方法，暴力遍历，直接两层循环进行对比，若相同则返回：

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    for(let i = 0; i < nums.length; i++) {
        // 只需对比当前位置往后的数字
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] == nums[j]) {
                return nums[i]
            }
        }
    }

    return -1
};
~~~

我们还可以使用一个容器来存储已经出现过的数字，然后在遍历的过程中判断当前元素是否在容器中，在的话即重复，返回当前元素

代码实现如下：

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    //这里使用一个对象作为容器
    const map = {}

    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if(map[num]) {
            return num
        }
        map[num] = 1
    }

    return -1
};
~~~



### 第二题

**题目：**

~~~
查找一个数字 target 在一个有序的数组中出现的次数
~~~



**解答：**

> 遇到 **有序数组的搜索** 时，应该优先考虑使用 **二分法** 

这道题我们可以使用 **二分法** 去找到 **target** 的左右边界，而这个左右边界应该是：**第一个小于target的值的索引** 和 **第一个大于target的值的索引**，将其相减即可得到 **target** 出现的次数

代码实现如下：

~~~js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 一个传入的是target，获取第一个大于target的值的索引
    // 另一个传入target - 1，获取第一个大于target - 1即第一个小于target的值的索引
    return binarySearch(nums, target) - binarySearch(nums, target - 1)
};

var binarySearch = function(nums, target) {
    let left = 0, right = nums.length - 1

    while(left <= right) {
        let mid = Math.ceil((left + right) / 2)
        // 若target小于或等于nums[mid]，则右移，直到找到第一个大于target的值
        if(nums[mid] <= target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return left
}
~~~

其实还有另一种很简单的方法，直接用一个 `Map` 或者对象来处理就好了，但复杂度肯定没有二分好，这里就不贴代码了



### 第三题

**题目：**

~~~
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof
~~~



**解答：**

首先看到关键词，  **递增排序数组** ，那我们就应该第一时间想到先用 **二分法** 试试

由题目可知，每个数字在前面没有缺失的情况下，它的值和它的下标应该是一致的，因此我们就可以把问题转换为： **查找第一个和它的下标不相等的数字**

转换后的问题就和上面的那题很类似了，数字和下标相等则向右找，不相等向左找，直到左右的指针相等，指向的数字即为目标值

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let left = 0, right = nums.length - 1

    while(left <= right) {
        let mid = Math.ceil((left + right) / 2)
        
        if(mid !== nums[mid]) {
            // 不相等向右找
            right = mid - 1
        } else {
            // 相等向左找
            left = mid + 1
        }
    }
    return left
};
~~~

