---
title: Day-15 矩阵中的路径
postTime: 2021-12-10
categories: 每日一题
tags: 
- 回溯
- DFS
---
::: slot abstract

**题目：**

~~~
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
~~~

这是一道典型的矩阵搜索问题，可以使用 DFS + 剪枝解决

:::



## 矩阵中的路径

### 题目

~~~
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
~~~



### 解答

这题很明显的，需要在一个矩阵里搜索是否存在对应的路径，这个路径符合如下条件：从开头到结尾的字母能够组成所传入的单词

实现的思路也很简单，可以使用 DFS 来对矩阵进行遍历，同时采用剪枝的方式，遇到不可能和目标字符串匹配成功的情况则直接返回，具体描述如下：

- 采用 DFS 的方式，从矩阵的第一个点开始，分别遍历它的上下左右节点
- 如果未超出矩阵范围、遍历到的节点上的值和当前遍历顺序上的字母相同，且该节点未被遍历过
  - 继续遍历该节点的上下左右，执行和上面一样的操作，
  - 将该节点的值设为空字符串，以此来标记这个节点已经被遍历过了
  - 在完成遍历后，将该节点的值复原，以此表示回溯
  - 重复上述操作直至找到目标路径或者全都不符合要求
- 若与之相反，则返回 `false` ，且阻止继续遍历
- 如果出现了不匹配的情况，回退到路径的第一个节点，然后切换到矩阵的下一个节点重复上述操作

通过上面的思路就可以写出如下代码：

~~~js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let n = board.length, m = board[0].length2
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            // 每一节点都将作为路径的起点进行遍历
            if(bfs(board, word, i, j, 0)) return true
        }
    }

    return false
};

const bfs = function(board, word, i, j, k) {
    let n = board.length, m = board[0].length
    if(i < 0 || i >= n || j < 0 || j >= m || board[i][j] !== word[k]) return false
    if(k == word.length - 1) return true

    board[i][j] = ''

    // 深度搜索当前节点的上下左右
    let result = bfs(board, word, i + 1, j, k + 1)
                || bfs(board, word, i - 1, j, k + 1)
                || bfs(board, word, i, j + 1, k + 1)
                || bfs(board, word, i, j - 1, k + 1)

    board[i][j] = word[k]

    return result
}
~~~

