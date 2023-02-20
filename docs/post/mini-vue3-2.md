---
title: mini-vue3项目（二）——reactive和effect
postTime: 2023-01-20
categories:
- 前端笔记
- Vue
tags:
- Vue
- 学习笔记
- 源码
---



::: slot abstract

手写 mini-vue3 项目的第二期，在第一期的前置准备工作完成后，将正式开始 Vue3 源码的编码之旅

这一期我们主要看 `reactive` 这个创建响应式对象的函数，以及注册副作用的 `effect` 函数，这两者共同组成了 Vue 的响应式，其工作原理大概是：

> `effect` 函数接收一个回调函数作为参数，如果在这个回调函数里使用了 `reactive` 创建的对象的某个属性，则会在每一次修改该属性时，执行一遍我们传入的回调函数

具体是如何实现的，就让我们到正文部分好好探讨吧~~

:::



## 前言

上一期我们完成了 mini-vue3 的前期准备工作，那么这一期就要进入正题，开始手写 Vue3 核心代码了。

这一期我们主要看 `reactive` 这个创建响应式对象的函数，以及注册副作用的 `effect` 函数，这两者共同组成了 Vue 的响应式，其工作原理大概是：

> `effect` 函数接收一个回调函数作为参数，如果在这个回调函数里使用了 `reactive` 创建的对象的某个属性，则会在每一次修改该属性时，执行一遍我们传入的回调函数



## reactive

我们都知道，在 Vue2 中数据的响应式是通过 `Object.defineProperty` 这个 API 实现的，而在 Vue3 中，使用的是 `Proxy` 这个 ES6 新增的 API，其原理是：

> Proxy 对象用于创建一个目标对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）——来自 MDN

知道这个 Proxy 是什么，看一下 MDN 了解了用法后，我们就可以通过下面的代码创建出一个 `reactive` 函数的雏形了：

~~~typescript
export function reactive<T extends object>(raw: T): T {
    return new Proxy(raw, {
        get(target, key) {
            // 拦截属性读取操作
            return target[key]
        },
        set(target, key, value) {
            // 拦截属性的赋值操作
            target[key] = value
            return true
        },
    })
}
~~~

在这个 `get` 和 `set` 中，我们就可以去做一些额外的操作了。Vue2 和 Vue3 在这块都是一样的，使用了发布订阅模式来做到对象属性改变时自动触发对应回调的执行，从源码的角度上来说，就是在 `get` 中去进行订阅，也就是注册回调，而在 `set` 中去发布，也就是执行对应回调。

这一过程需要结合 `effect` 来实现，这里先暂停一下，让我们先来看看 `effect`



## effect

在 Vue3 当中，`effect.ts` 这个文件可谓是核心部分，它承载着 Vue 响应式的核心逻辑。这个文件内的所有代码主要做的事情就是：

> 使用 `effect` 函数注册和执行副作用函数
>
> 在读取 reactive 对象上的属性（get）时，将副作用函数放进一个 “桶” 里，并与这个属性关联起来
>
> 在修改 reactive 对象上的属性时（set），从 “桶” 中取出对应的副作用函数并执行

因此，我们需要先创建一个 “桶” 。同时，当我们要从这个桶中区分副作用函数需要被谁触发时，涉及到下面这三个角色：

- reactive 创建的代理对象 `target`
- 被读取或修改的字段名 `key`
- 被 effect 函数注册的副作用函数 `effectFn`

他们三者的关系应该是：

![image-20230220173914122](https://upyun.cavalheiro.cn/images/image-20230220173914122.png)

因此这个桶的数据结构应该为一个树形结构。同时因为 `target` 是唯一的，每个 `target` 中 `key` 也是唯一的，我们可以使用 Map 来处理。而 `effectFn` 则是多个的，且需要保证它的唯一性，因此我们可以使用 Set 来处理

数据结构确定了，那我们就可以来写 **将副作用函数放进桶里和从桶中取出对应的副作用函数** 这部分的代码了：

~~~typescript
// 该变量用于暂时存储要被注册的副作用函数
let activeEffect

type Dep = Set<Function>
type KeyToDepMap = Map<any, Dep>

/**
 * 这个 targetMap 就是我们的 ”桶“
 * 之所以使用 WeakMap 是因为作为 key 的 target 是一个对象，
 * 为了避免因为对象不再使用但被 Map 引用导致的无法被回收
 */
const targetMap = new WeakMap<any, KeyToDepMap>()

export function track(target: any, key: string | symbol) {
    if (activeEffect === undefined) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
}

export function trigger(target: any, key: string | symbol) {
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        // never been tracked, just for ts check
        return
    }
    
    const effects = depsMap.get(key)
    
    effects && effects.forEach((effect) => effect())
}
~~~

有了 `track ` 和 `trigger` 这两个函数之后，我们就可以在前面写的 `reactive` 函数中使用它们，来为代理对象添加收集依赖、发布通知的能力：

~~~typescript
export function reactive<T extends object>(raw: T): T {
    return new Proxy(raw, {
        get(target, key) {
            // 将副作用函数放入桶中
            track(target, key)
            return target[key]
        },
        set(target, key, value) {
            // 从桶中拿出对应副作用函数并执行
      		trigger(target, key)
            target[key] = value
            return true
        },
    })
}
~~~

然后我们来看一下 `effect` 函数的内容，我们前面定义了 `activeEffect` 这个变量来临时存储要被注册的副作用函数，而它的值就是在 `effect` 函数中去设置的，大致实现如下：

~~~typescript
export function effect<T>(fn: () => T) {
    const effect = function reactiveEffect(): unknown {
        activeEffect = effect
        return fn()
    }
    return effect
}
~~~

在 `effect` 返回的函数里，我们先将 `activeEffect` 指向当前的 `effect` 函数，然后去执行传入的回调函数

此时如果回调函数中去读取了一个 `reactive` 对象的属性，就会触发他的 `get`，并以此触发副作用函数的收集，将 `activeEffect` 也就是当前的 `effect` 放入桶中

之后被注册了副作用函数的 `reactive` 对象的属性被修改时，就会触发 `set` 和发布通知，与之相关联的 `effect` 就会从桶里拿出并执行，这样就大体实现了 Vue3 的响应式



## 结语

这里我们还只是大体的实现了 Vue3 的响应式，因为上述代码还存在许多问题。而在下一期，将会把这些问题一一罗列出来，并剖析问题成因、提出解决方案来处理，以此来实现一个更加完善的相应系统