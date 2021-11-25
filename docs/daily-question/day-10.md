---
title: Day-10 在Vue源码中遇到的几段代码
postTime: 2021-11-02
categories: 每日一题
tags:
- 格式
- 规范
---

::: slot abstract

这不是一道题，只是在看 Vue 源码时遇到的几段代码，这几段代码让我个人觉得写得很妙，让我感觉有所受益，主要是因为之前没想到过能这么写。但要是为了这几段代码单独写一篇笔记又显得篇幅太短，于是决定放到了每日一题里，当成一个小短篇记录一下

:::

## 第一段

废话不多说直接上代码：

~~~js
let i
const typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type
const typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type
~~~

这段代码出现在 `patch.js` 中的 `sameInputType` 函数，完整源码为：

~~~js
function sameInputType (a, b) {
  if (a.tag !== 'input') return true
  let i
  const typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type
  const typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type
  // 若属性定义情况不同则直接返回false，否则进一步判断
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}
~~~

代码的目的是：判断 `a` 和 `b` 上的属性的定义情况，而使用了 `i` 来进行赋值和判断，减少了代码量，也让整体可读性更好。如果是我可能会傻乎乎的这么写：

~~~js
const typeA = isDef(a.data) && isDef(a.data.attrs) && a.data.attrs.type
const typeB = isDef(b.data) && isDef(b.data.attrs) && b.data.attrs.type
~~~

这样写又臭又长，看起来都难受，而且这里只是三层，要是再多一点就更难看了



## 第二段

这段的话主要是它在代码风格上的一个规整让我觉得写得好，在 Vue 中很多地方都有类似的结构，这里就不具体到哪一个函数了，代码如下：

~~~js
child.key = child.key == null
  ? child.isComment
    ? id + 'comment'
    : id + child.tag
  : isPrimitive(child.key)
    ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
    : child.key
~~~

在使用三目运算符时，我们经常会遇到需要嵌套使用的场景，而嵌套的代码如果都写在一起的话不容易阅读，例如：

~~~js
child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key) : child.key
~~~

这时候就需要对它进行分行，用以往我的习惯来写的话会是这样的：

~~~js
child.key = child.key == null ? 
    (child.isComment ? id + 'comment' : id + child.tag) :
		isPrimitive(child.key) ?
    		(String(child.key).indexOf(id) === 0 ? child.key : id + child.key) :
            child.key
~~~

我写出来的这一段虽然分行了，但我一般只有超出显示范围出现滚动条的部分才会分行，能放得下的套个括号来辨别，而且符号的位置也不一样，我的是放在后面的，所以可读性还是比较差

而这段代码的分行写的就让我感觉很清晰明朗，通过缩进可以很清楚的看出，谁跟谁时属于同一层嵌套的，通过 `?` 和 `:` 也可以很轻易的分辨符号后面的内容是属于那一部分的