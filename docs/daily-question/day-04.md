---
title: Day-04 两道较为经典的字符串操作题
postTime: 2021-10-04
categories: 每日一题
tags:
- 算法
- 字符串
---

::: slot abstract

字符串操作一般都很简单，但很常见，也是需要熟练掌握的一个内容

::::

## 两道较为经典的字符串操作题

字符串操作一般都很简单，但很常见，也是需要熟练掌握的一个内容



### 第一题

**题目：**

~~~
实现一个函数，将字符串中的所有空格替换为'%20'
~~~



**解答：**

这里我们只需要遍历这个字符串，然后将每一个字符添加至新的字符串 `result` 的末尾，遇到空格的时候将 `%20` 而不是原来的空格添加到 `result` 即可，代码实现如下：

~~~js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    let result = ''
    for(let i = 0; i < s.length; i++) {
        let item = s[i]
        if(item === ' ') {
            item = '%20'
        }
        result += item
    }

    return result
};
~~~

在js中还有一个更加简便的方法，直接使用 `replace` 函数搭配正则即可实现，不过这种方法可不要在面试的时候使用哦~~

~~~js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/g, '%20')
};
~~~



### 第二题

**题目：**

~~~
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof
~~~



**解答：**

要将字符串左旋转 n 位，即找到字符串的第 n 个位置，将前 n 个字符原封不动的移动到字符串的最后面

这里我们用一个变量 `result` 来存放最终结果，它的初始值为第 n 个位置往后的所有字符，然后再去遍历前 n 个字符，将其添加至 `result` 后面，代码实现如下：

~~~js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    let result = ''

    for(let i = n; i < s.length; i++) {
        result += s[i]
    }
    
    for(let i = 0; i < n; i++) {
        result += s[i]
    }
    
    return result
};
~~~

