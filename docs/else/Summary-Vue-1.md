---
title: 面试题目复习汇总-Vue-1
postTime: 2022-01-03
categories: 杂谈
tags:
- 面试
- 学习笔记
- 汇总
not: true
---







# Vue

## 减少首屏加载时间的方式

1. 图像格式的选择（GIF 提供的颜色较少，可用在一些对颜色要求不高的地方）
2. 优化 CSS ，如压缩合并 CSS
3. 使用雪碧图，减少 http 请求
4. 启用 GZIP 压缩 css 、 js 文件，可使用 `CompressionWebpackPlugin` 插件
5. 图片懒加载
6. 路由懒加载



## Vue Router 的模式

### hash 模式

通过监听 `hashchange` 事件来实现前端路由，利用 url 中的 hash 值来模拟一个 hash ，以保证 url 改变时，页面不会重新加载



### history 模式

利用 `history` 对象上的 `pushstate` 和 `replacestate` 方法来替换 url 且不刷新页面，同时可以通过 `history.state` 进行路由传参

但该方式有一个致命的缺点，一旦点击浏览器的刷新按钮，就可能会出现 404 ，这是因为通过该方式修改的 url 并没有真实路径，要解决这一问题需要后端配合，将不存在的路径重定向到入口文件



## 虚拟 DOM 的优缺点

### 优点

- 减少了 DOM 操作，从而减少回流
- 具备局部更新的能力
- 保证了性能的下限



### 缺点

首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 `innerHTML` 插入慢



## 讲一讲Vue的生命周期

### beforeCreate

此时刚刚初始化一个空的 Vue 实例对象，在这个对象上只有一些默认的生命周期函数和默认的事件，其他的均未创建

### created

创建完 Vue 的实例对象，并完成了 `data` 和 `methods` 等的初始化

### beforeMount

此时已完成模板编译，但还未将编译好的 HTML 挂载到相应位置，只是开始挂载的一个标记

### mounted

完成将编译好的 HTML 替换掉 el 属性所指向的 DOM 元素或替换对应 HTML 标签里面的内容

### beforeUpdate

挂载完毕后会实时监控 data 里面的数据变化，若修改了 data 中的数据，则先触发该钩子函数

### updated

触发 `beforeUpdate` 后会进行虚拟 DOM 重新渲染并更新应用，完成后触发该钩子，此时页面和 data 中的数据已经保持同步

### beforeDestroy

此时 Vue 实例对象已经从运行阶段进入销毁阶段，组件中的所有 data 、 methods 以及过滤器、指令等，都处于可用状态，还未真正执行销毁过程

### destroyed

此时已经完成了 Vue 实例的销毁，组件中的所有 data 、 methods 以及过滤器、指令等，都不可用了



## watch 和 计算属性有什么区别

计算属性，即 `computed` 拥有缓存的功能，能够将上一次计算的结果暂时存储起来，后续如果所依赖的值没有发生变化，则返回缓存的数据，若是所依赖值改变了，就会重新进行计算

`watch` 的话则是监听已经在 `data` 中定义的变量，当变量变化时，则会触发 `watch` 中的方法



## Vue 双向绑定原理

Vue 的数据双向绑定是通过 **数据劫持** 结合 **发布-订阅模式** 的方式来实现的，利用了 `Object.defineProperty()` 方法，劫持了对象获取属性 `get` 和设置属性 `set` ，分别在 `get` 中进行依赖收集，在 `set` 中通知依赖进行更新（调用 `Watcher` 上的 `update` 方法）

这里贴上部分 Vue 中的源码：

~~~js
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
            // 依赖收集
            dep.depend()
            if (childOb) {
                childOb.dep.depend()
                if (Array.isArray(value)) {
                    dependArray(value)
                }
            }
        }
        return value
    },
    set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
            return
        }
        /* eslint-enable no-self-compare */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
            customSetter()
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) return
        if (setter) {
            setter.call(obj, newVal)
        } else {
            val = newVal
        }
        childOb = !shallow && observe(newVal)
        // 通知更新
        dep.notify()
    }
})
~~~



## Vue 在 created 和 mounted 中请求数据有什么区别

在 `created` 阶段时，Vue 的实例已经完成了初始化，可以访问 `data` 和 `props` 等属性了，所以在这一阶段可以发送请求并修改状态。但是在这个阶段中，由于模板编译还未完成，更不用说 DOM 的渲染了，因此无法访问和操作 DOM

而在 `mounted` 阶段时，不仅可以访问 `data` 和 `props` 等属性，还因为此时已经完成渲染编译出来的 HTML 的工作，是可以访问和操作 DOM 的



