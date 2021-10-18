---
title: Day-02 链表
postTime: 2021-10-01
categories: 每日一题
tags:
- 算法
- 链表
---

::: slot abstract

链表也是一种常用的数据结构，属于线性存储结构，通过指针来定位每一个节点，每个节点有自己的 `next` 指针指向下一个节点。也有一种每个节点具有两个指针的链表，该类型的链表被称为双向链表，一个指针指向上一个节点，一个指向下一个节点

每个链表的末尾节点的 `next` 指针一般指向的是空，即 `null` ，也有特例，指向的是链表中的其他节点，这时候就称该链表有环

:::

## 链表

链表也是一种常用的数据结构，属于线性存储结构，通过指针来定位每一个节点，每个节点有自己的 `next` 指针指向下一个节点。也有一种每个节点具有两个指针的链表，该类型的链表被称为双向链表，一个指针指向上一个节点，一个指向下一个节点

每个链表的末尾节点的 `next` 指针一般指向的是空，即 `null` ，也有特例，指向的是链表中的其他节点，这时候就称该链表有环



### 第一题

**题目：**

~~~
输入一个链表的头节点，从尾到头反过来返回每个节点的值
~~~



**解答：**

当链表的指针指向下一个节点时，是无法通过这个指针再去获取上一个节点的，因此我们需要在遍历链表的时候将每一个节点都存储在一个容器中，这里的容器选择的是数组，也可以说是一个栈

我们可以通过栈的特性，十分简便的将链表的每个节点反向输出：

~~~js
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    const stack = []

    while(head !== null) {
        // 节点值入栈
        stack.push(head.val)
        head = head.next
    }

    // 这里我用了js数组自带的反转方法reverse，不用reverse的话可以按照pop的顺序输出
    return stack.reverse()
};
~~~



### 第二题

**题目：**

~~~
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
~~~



**解答：**

反转一个链表，需要将其每个节点的 `next` 指针指向它的上一个节点，而初始的头节点的 `next` 指针指向空

要做到这点，我们需要一个 `pre` 来临时保存指向上一个节点的指针， `pre` 的初始值为 `null` ，终值就是我们要的反转后的链表的头节点，可以理解为最后一个节点是 `null` ，而 `pre` 指向的是 `null` 的上一个节点，也就是原数组的最末尾节点

~~~js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 由于反转后原本的头节点变为为末尾节点，所以pre的初始值为null
    let pre = null, cur

    while(head !== null) {
        cur = head
        head = cur.next
        // 当前节点的next指向上一节点
        cur.next = pre
        pre = cur
    }
    return pre
};
~~~



### 第三题

**题目：**

~~~
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof
~~~

示例：

![img](http://upyun.cavalheiro.cn/images/e1.png)



**解答：**

复制一个链表，需要我们取得每个节点的值来创建一个新的节点，即 `new Node(val)` ，而不是直接复制指针，那样得出来的结果还是同一个链表。这道题的关键点在于这个 `random` 指针，这个指针的指向是无规律的，需要想办法解决对它的复制

看到这道题，我最先想到的是使用一个哈希表，具体思路如下：

- 遍历链表，取每个节点的值来创建一个新的节点，并将其存入一个 `map` 中，该 `map` 的键和值分别为： `key: 当前节点, value: 新创建的节点 ` ，这时我们就有了一条全新的链表，以及 **原节点到新节点的映射** 的集合

- 接下来处理 `next` 指针和最麻烦的 `random` 指针的连接，它的指向可能重复，但节点不应该重复创建，所以就体现了使用 `map` 的价值：

  > 从头遍历链表，以每个节点的 `random` 指针为键，到 `map` 中去获取对应的新创建的节点，然后将当前新节点的 `random` 指向 `map` 中获取的节点

以这个思路编写的代码如下：

~~~js
// Node数据结构的定义
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(head === null) return head

    let cur = head
    const map = new Map()
    map.set(null, null)

    // 创建一条全新的链表，并获得原节点到新节点的映射
    while (cur !== null) {
        map.set(cur, new Node(cur.val))
        cur = cur.next
    }

    // 复位
    cur = head

    // 从map中去取当前的新节点和要作为random的新节点
    while(cur !== null) {
        const node = map.get(cur)			// 新节点
        node.next = map.get(cur.next)		// 作为next节点的新节点
        node.random = map.get(cur.random)	// 作为random节点的新节点
        
        cur = cur.next
    }

    return map.get(head)
};
~~~



其实这道题还有另一种解法，这种解法甚至不需要额外开辟空间来存放新的节点，但要比上面的这个方法多一个循环，该解法的思路如下：

- 首先在遍历原链表的每一个节点时，创建一个新节点并将其插入到当前节点 `cur` 和 `cur.next` 中，这时每一个新节点都是旧节点的 `next` ，相当于是有了映射，更新后的链表大致为： `原节点 1 -> 新节点 1 -> 原节点 2 -> 新节点 2 -> …… -> 原节点 n -> 新节点 n` 
-  再次遍历链表，不过这次是插入了新节点的链表，当前节点 `cur` 的 `next` 即为新节点 `target` ，设置 `target.random` 为 `cur.random.next` 即可完成 `random` 指针的连接
- 接下来就是较为简单的设置 `target.random` 了，同时为了不破坏原链表的结构，还需对原链表节点的 `next `指针进行还原

代码：

~~~js
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(head === null) return head

    let result
    let cur = head

    // 获取当前节点的值创建一个新的节点，并将其插入到cur和next之间
    while (cur !== null) {
        const next = cur.next
        const node = new Node(cur.val)
        cur.next = node
        node.next = next
        cur = next
    }

    // 头指针复位
    cur = head
    // 将作为结果返回的新链表表头指针
    result = head.next

    // 由于新节点是穿插在旧节点中的，所以cur.random.next即可获取到对应的新节点
    while (cur !== null) {
        const target = cur.next
        target.random = cur.random ? cur.random.next : null
        cur = target.next
    }

    // 头指针复位
    cur = head

    // 重新指定新链表的next，并复原旧节点的连接
    while (cur !== null) {
        const nodeNew = cur.next;
        cur.next = cur.next.next;
        nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
        cur = cur.next
    }

    return result
};
~~~

