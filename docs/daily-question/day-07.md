---
title: Day-07 删除并获得点数
postTime: 2021-10-09
categories: 每日一题
tags:
- 算法
- 动态规划
---



::: slot abstract

**题目：**

~~~
给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

1 <= nums.length <= 2 * 104
1 <= nums[i] <= 104

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/delete-and-earn
~~~

这其实是一道稍微做了点伪装的动态规划题，至于为什么是动态规划，将会在文中一步一步来解析~~

:::



## 删除并获得点数

### 题目

~~~
给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

1 <= nums.length <= 2 * 104
1 <= nums[i] <= 104

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/delete-and-earn
~~~



### 分析

虽然乍一看可能看不出，但其实这是一道稍微做了点伪装的动态规划题，至于为什么是动态规划，咱一步一步来解析~~

首先，举个例子，假设输入的是只有三个数字的数组 `nums = [1,2,2,2,2,3,3]` ，此时获取到的最大点数应该是 `8` ，它是怎么来的呢？选择 `2` ，然后删除 **所有** 等于 nums[i] - 1 和 nums[i] + 1 的元素，即 `1 和 3` ，这个时候数组里就只剩下 `2` 了，一个一个删除并获得点数，最终的结果就是 `8` 了

可能到这里还看不出来和动态规划有什么关系，但其实只要稍微做点转化，就很明显了

定义一个数组 `arr` ，该数组的长度为 `nums` 中的最大值 + 1，以 `nums` 中的所有数字为下标存放各自对应的能给予的点数总和，比如上面这个例子转化后得到 `arr = [0,1,8,6]` ，分别代表： 0 没有出现过所以点数为 0 ， 1 出现一次点数为 1 ， 2 出现四次点数为 8 ， 3 出现两次点数为 6 ，这样问题就转变为：

> 从 `arr` 数组中选出互不相临的一组点数相加，使得到的值最大

此时细心的同学应该就能看出来端倪了，这不就是 [打家劫舍](https://leetcode-cn.com/problems/house-robber/) 吗？所以这道题本质上还是经典的动态规划题



### 解答

既然是动态规划的题，那就直接按照 "标准流程" 三步走：

- **状态定义**

  - 设动态规划列表 dp ，dp[i] 代表前 i 个数字在满足条件下的能获得的最大点数。

- **转移方程**

  - 假设当前选择的是第 n 个数字，那么就不能选择第 n-1 个数字，总点数为前 n-2 个数字的最高点数和与第n个数字对应的点数之和

  - 假设当前第 n 个数字被删除了，那么总点数为前 n-1 个数字的最高点数和

  - 所以有如下状态转移方程：

    ~~~js
    dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
    ~~~

- **边界条件**

  - ~~~js
    // 只有一个数字则获取其对应的点数和
    dp[0] = nums[0]
    ~~~

  - ~~~js
    // 只有两个数字时，选择其中点数大者的点数和
    dp[1] = max(nums[0], nums[1])
    ~~~

由此可得如下代码：

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    if(nums.length < 2) return nums[0]
    const max = Math.max(...nums)
    const min = Math.min(...nums)
    
    // 由于数组可能不是从小数字开始的，直接用max作为长度会有大段用不上的0
    // 例如：[...(0 * 90), 91, 92, 93]
    // 这里使用min作为偏移量，数组将从min处开始
    const arr = new Array(max - min + 1).fill(0)

    // 获取每个数字对应的能给予的点数总和
    for(let i = 0; i < nums.length; i++) {
        arr[nums[i] - min] += nums[i]
    }

    const dp = new Array(max - min + 1).fill(0)
    dp[0] = arr[0]
    dp[1] = Math.max(dp[0], arr[1])

    // 删去等于 nums[i] - 1 和 nums[i] + 1 的元素
    // 意味着：arr[nums[i] - 1] 和 arr[nums[i] + 1] 不可用
    for(let i = 2; i < arr.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i])
    }

    return dp.pop()
};
~~~

