---
title: Day-06 打家劫舍
postTime: 2021-10-06
categories: 每日一题
tags:
- 算法
- 动态规划
---

::: slot abstract

**题目：**

~~~
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
~~~

这是一道动态规划题，通常要解决这类问题，可以分三步走：

- **状态定义**
- **转移方程**
- **边界条件**

关于这三个步骤具体是什么，在文中会有详细讨论。掌握了这三步之后，以后遇到各种动态规划的题目都可以像公式一样，直接套进去

:::

## 打家劫舍

### 题目

~~~
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
~~~



### 解答

这是一道动态规划题，通常要解决这类问题，可以分三步走：

- **状态定义**
- **转移方程**
- **边界条件**

首先是 **状态定义**

> 设动态规划列表 dp ，dp[i] 代表前 i 个房屋能偷到的最高金额

接下来是 **转移方程** 的推导

假设当前偷盗的是第 n 个房屋，则一定没有偷盗第 n - 1 个房屋，因此：

-  若第 n 个房屋的现金加上 dp[n - 2] 的数值小于 的dp[n - 1] ，则 dp[n] = dp[n - 1]
- 反之，dp[n] = nums[n] + dp[n - 2]

因此转移方程为：

~~~js
dp[n] = max(nums[n] + dp[n - 2], dp[n - 1])
~~~

最后是 **边界条件** 的判断

- ~~~js
  // 只有一个房屋则获取其对应的现金数
  dp[0] = nums[0]
  ~~~

- ~~~js
  // 只有两个房屋时，选择其中现金数大者
  dp[1] = max(nums[0], nums[1])
  ~~~

接下来就可以通过上述的分析结果开始编码实现：

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length
    if(n === 0 || n === null) return 0
    if(n === 1) return nums[0]
    const dp = new Array(n)

    // 两个边界条件
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for(let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }

    return dp[n - 1]
};
~~~

这里的 dp 数组可以用两个数值类型的变量来代替，一个表示上一个，同时也可以表示当前的，一个用于表示上上个，具体代码如下，这里就不再赘述了：

~~~js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length
    if(n === 0 || n === null) return 0
    if(n === 1) return nums[0]

    let fir = nums[0], sec = Math.max(nums[0], nums[1])

    for(let i = 2; i < n; i++) {
        let temp = sec
        sec = Math.max(nums[i] + fir, sec)
        fir = temp
    }

    return sec
};
~~~

