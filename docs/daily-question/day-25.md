---
title: Day-25 最长回文子串
postTime: 2022-03-29
categories: 每日一题
tags: 
- 字符串
- 动态规划
---
::: slot abstract

~~~
给你一个字符串 s ,找到 s 中最长的回文子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/
~~~

关于回文字符串的定义想必都不陌生，就是一个与自身翻转后相等的字符串，如：abcba

如果只是想要做出来，这道题还是蛮简单的，直接暴力破解，把每一个可能的子串都拿出来判断一下是不是回文串，再从中获取最长的。但暴力嘛，肯定比较费时间，所以这道题我打算用动态规划来做

> 看了一眼时间，啊，又鸽了呢
>
> 没办法，这段时间实在太忙，错过秋招黄金期、秋招补录失利，导致我不得不在春招孤注一掷，压力还是比较大的。不过还好，对这次春招的结果挺满意的，拿到了一家香港独角兽公司的 offer ，字节也面试到了三面，三面聊的也还行，总算是可以稍稍放松一点，抽空写写面经，刷刷算法题了

:::



## 最长回文子串

### 题目

~~~
给你一个字符串 s ,找到 s 中最长的回文子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/
~~~



### 解答

从回文串的定义来看，当一个子串是回文串时，那么在它头尾各加一个相同的字符后也是一个回文串，例如： `aba` 头尾加一个字符： `cabac` 。根据这个特性，我们就可以使用动态规划的方法来解决该问题

还是经典的步骤走起：

- **状态定义**

  - 设字符串为 `s` ， `dp[i][j]` 表示 `s[i:j]` 这个子串是否回文，值为 `false` 或 `true`

  

- **转移方程**

  - 当 `s[i+1:j-1]` 为回文串时，只要 `s[i] == s[j]` 就代表`s[i:j]` 这个子串回文

  - 除此之外的情况都表示子串不回文

  - 因此有如下状态方程：

    ~~~js
    dp[i][j] = dp[i + 1][j - 1] && s[i] == s[j]
    ~~~

    

- **边界条件**

  - ~~~js
    // 当子串长度为1时
    dp[i][i] = true
    ~~~

  - ~~~js
    // 当子串长度为2时
    dp[i][i + 1] = s[i] == s[i + 1]
    ~~~

  

  最终代码如下：

~~~js
/**
 * @param {string} s
 * @return {string}
 */
 const longestPalindrome = function(s) {
    let len = s.length
    if(len < 2) return s
    // 记录最长子串的起始坐标
    let begin = 0
    // 记录最长子串的长度
    let maxLen = 1
    const dp = Array.from(new Array(len), () => new Array(len).fill(true))
    
    // 最外层循环表示字串的长度
    for(let L = 2; L <= len; L++) {
        for(let i = 0; i < len; i++) {
            // j代表子串的最后一个字符
            let j = L + i - 1
            if (j >= len) {
                break;
            }

            if(s[i] !== s[j]) {
                dp[i][j] = false
            } else {
                if(j - i < 3) {
                    dp[i][j] = true
                } else {
                    dp[i][j] = dp[i + 1][j - 1]
                }
            }

            // 若当前子串s[i:j]回文，则判断长度是否超过当前的最长回文子串
            // 超过则更新最长回文子串的长度和起始坐标
            if(dp[i][j] && j - i + 1 > maxLen) {
                begin = i
                maxLen = j - i + 1
            }
        }
    }

    return s.substring(begin, begin + maxLen)
};
~~~

