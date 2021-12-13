---
title: Day-13 什么是Redux
postTime: 2021-11-26
categories: 每日一题
tags:
- CSS
- 面试
---

::: slot abstract

这两天抓住了秋招的尾巴，投了好几家公司，结果大多数都沉了，为数不多到了面试阶段的那几家，也就一个中通的前端三次面了都过了，现在在等 hr 电话。也正是因为要应对各种笔试面试，每日一题又双叒叕鸽了好几天，昨天中通终面结束了，才记起来自己还做了这么个系列，想着就更一题终面被问到且答得不好的题吧

终面的面试官问我在实习时，参与的项目的技术栈、在项目中做了哪些事情，之后突然冷不丁的问了我 Redux 是什么（因为提到了项目里用了 Redux ）。说实话我 Redux 学的不好，就答了个状态管理、单一数据源，然后尴尬的跟面试官说不太会讲了

面试结束后，我直接打开 [Redux 官网](https://www.redux.org.cn/docs/introduction/Motivation.html) 看官方的描述，以及 [阮一峰的教程](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html) 辅助理解，打算好好复习一遍

:::



## 前言

这两天抓住了秋招的尾巴，投了好几家公司，结果大多数都沉了，为数不多到了面试阶段的那几家，也就一个中通的前端三次面了都过了，现在在等 hr 电话。也正是因为要应对各种笔试面试，每日一题又双叒叕鸽了好几天，昨天中通终面结束了，才记起来自己还做了这么个系列，想着就更一题终面被问到且答得不好的题吧

终面的面试官问我在实习时，参与的项目的技术栈、在项目中做了哪些事情，之后突然冷不丁的问了我 Redux 是什么（因为提到了项目里用了 Redux ）。说实话我 Redux 学的不好，就答了个状态管理、单一数据源，然后尴尬的跟面试官说不太会讲了

面试结束后，我直接打开 [Redux 官网](https://www.redux.org.cn/docs/introduction/Motivation.html) 看官方的描述，以及 [阮一峰的教程](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html) 辅助理解，打算好好复习一遍



## 什么是Redux

官网对 Redux 的定义是：

> Redux 是 JavaScript 状态容器，提供可预测化的状态管理

它是独立于 React 等框架的一个轻量级 js 库，而非框架插件，专门用于做状态管理。 

Redux 的原理和 flux 是差不多的，以 MVC 模式划分的话， React 属于 View ，而 flux 属于 Model 和 Control 。flux 包含四个部分：Store、Dispatch、Action、View ，其中 Store 就对应着 Model， Dispatch 、 Action 就组合成了 Control



### 设计思想

Redux 的设计思想很简单，就两句话：

>（1）Web 应用是一个状态机，视图与状态是一一对应的。
>
>（2）所有的状态，保存在一个对象里面。



### 三大原则

#### 单一数据源

整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中



#### state 是只读的

`state` 只能通过触发 ( `dispatch` ) 一个 `action` 来改变，而 `action` 是一个用于描述已发生事件的普通对象，如：

~~~js
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
})
~~~



#### 使用纯函数来执行修改

需要编写纯函数用于描述 `action` 如何改变 `state` ，这样的函数被称为 `reducers` 。 `reducers` 接受两个参数： `state` 和 `action` ，并返回一个新的 `state` ，例如：

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}
```



## Redux的作用

前面说过，Redux 是 JavaScript 状态容器，这里的状态指的是那些具有响应式作用，改变时会触发视图更新的变量。一般来说，要在组件中共享状态，都是使用 `props` 由父组件向子组件传递状态，若是兄弟组件之间共享，则可以通过将状态提取至最近公共父组件的方式实现

但若是项目的页面比较复杂，比如：组件层级太深，需要层层传递才可进行状态共享，继续使用 **提取状态到父组件** 的方式会非常复杂，而且还会导致异常排查也变得很困难

Redux ，或者说是状态管理的出现，就是为了解决这个场景而出现的。只有当项目复杂到必须使用 Redux 时才需要引入 Redux ，不然反而会增加复杂性

下面列出需要使用 Redux 的一些场景：

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了 WebSocket
- View 要从多个来源获取数据

从组件的角度来看，在以下场景下也可以考虑使用 Redux ：

- 某个组件的状态需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态
