---
title: Day-12 一道关于CSS选择器的面试题
postTime: 2021-11-11
categories: 每日一题
tags:
- CSS
- 面试
---



::: slot abstract

**题目：**

HTML 和 CSS 代码如下，问文字的颜色是什么？

~~~html
<div class="lightblue">
    <div class="darkblue">
        <p>1、颜色是？</p>
    </div>
</div>
<div class="darkblue">
    <div class="lightblue">
        <p>1、颜色是？</p>
    </div>
</div>
~~~

~~~css
.lightblue p {
    color: lightblue;
}

.darkblue p {
    color: darkblue;
}
~~~

这道题的答案有一些反直觉，弄懂这道题也就能纠正对后代选择器的错误认识

:::



## 一道关于CSS选择器的面试题

### 题目

HTML 和 CSS 代码如下，问文字的颜色是什么？

~~~html
<div class="lightblue">
    <div class="darkblue">
        <p>1、颜色是？</p>
    </div>
</div>
<div class="darkblue">
    <div class="lightblue">
        <p>2、颜色是？</p>
    </div>
</div>
~~~

~~~css
.lightblue p {
    color: lightblue;
}

.darkblue p {
    color: darkblue;
}
~~~



### 解答

相信对于大多数人来说，都会觉得结果应该是： **1 是深蓝色，2 是浅蓝色** ，但是实际上，这道题的正确答案是： **1 和 2 都是深蓝色** 

会搞错这道题的原因是我们对于后代选择器有一个错误的认识，当包含后代选择器的时候，整个选择器的优先级 **与祖先元素的 DOM 层级没有任何关系** ，一切都 **取决于落地元素（即最终作用在哪个元素）的优先级**

在这个题目中，落地元素是 `<p>` 元素，从 DOM 层级上来看，两个 `<p>` 元素彼此分离，非嵌套，因此他们是平行的。再看选择器的优先级， `.lightblue p` 和 `.darkblue p` 都是由一个类选择器和一个标签选择器组成，因此优先级的计算值上，两个选择器是一样的，所以此时需要看他们在整个 css 中的位置。遵循 “后来者居上”  的原则，由于 `.darkblue p` 在后面，因此只要是 `.darkblue` 后代中的 `p` 都按照 `.darkblue p` 的样式设计来渲染，所以最终呈现出来的结果是 1 和 2 都是深蓝色

总结成一句话就是：

> 出现后代选择器时，祖先元素和落地元素之间在 DOM 层级上的距离与选择器的优先级无关，不会因为他们在 DOM 上离得近就优先级高



### 小测试

下面放两道以上面的题目为基础，只改变 css 代码的题目，可以作为对自己是否理解了的一个检验

#### 第一题

**题目：**

~~~css
:not(.darkblue) p {
    color: lightblue;
}

.darkblue p {
    color: darkblue;
}
~~~

**答案：**

由于 `:not()` 伪类的优先级为 0 ，所以 `:not(.darkblue) p` 和 `.darkblue p` 的优先级是一样的，因此显示结果为两个都是深蓝色



#### 第二题

**题目：**

~~~css
.lightblue.lightblue p {
    color: lightblue;
}

.darkblue p {
    color: darkblue;
}
~~~

**答案：**

因为 `.lightblue.lightblue p` 选择器的优先级更高，所以两个都是浅蓝色
