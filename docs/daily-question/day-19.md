---
title: Day-19 讲一下vue-router两个模式的区别和原理
postTime: 2022-02-03
categories: 每日一题
tags: 
- vue-router
- 原理
---
::: slot abstract

在 Vue 项目中我们经常需要使用 vue-router 来进行路由的管理，那么我们也都知道，vue-router 是有三个模式的，但我们常用的有两种，分别是：`hash` 和 `history` ，可以使用 `mode` 属性来进行配置。要讲解这两个模式的区别，实际上也涉及到了 vue-router 的实现原理，也算是一个比较有深度、有意思的知识点

:::



## 前言

首先我们要知道 vue-router 的有哪几种模式，它们分别是： `hash` ， `history` 和 `abstract` ，可以在创建路由对象时，使用 `mode` 属性来进行配置，这里只讲 `hash` 和 `history` 这两种

在 vue-router 的源码当中，它会维护一个对象 `this.history` ，通过判断当前配置的模式来为这个对象赋不同的值，源码片段如下：

~~~js
// 默认使用hash模式
let mode = options.mode || 'hash'

// 用于判断是否降级处理
this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false

// 若模式设置为history的情况下
// 浏览器不支持supportsPushState或设置fallback为true
// 模式降级为hash模式
if (this.fallback) {
    mode = 'hash'
}

if (!inBrowser) {
    mode = 'abstract'
}
this.mode = mode

switch (mode) {
    case 'history':
        this.history = new HTML5History(this, options.base)
        break
    case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
    case 'abstract':
        // 该模式用于非浏览器环境下
        this.history = new AbstractHistory(this, options.base)
        break
    default:
        if (process.env.NODE_ENV !== 'production') {
            assert(false, `invalid mode: ${mode}`)
        }
}
~~~

我们在使用 `this.$router` 对象的时候，明明是不同模式，却可以通过一样的 `this.$router.push` 等方法实现同样的效果，关键在于 `HTML5History` 和 `HashHistory` 两个类都继承了同样的接口，并使用自己特有的逻辑和方法进行实现



## hash模式

这个模式的是通过监听 `hashchange` 事件实现的，由于 url 的 hash 值（即 url 在 # 后的部分）变化并不会引起页面的刷新，我们就可以通过 hash 值来进行匹配，以加载不同的组件。通过 `hashchange` 事件来监听的用法大致如下：

~~~js
window.addEventListener('hashchange', (event) => {
    // 通过event事件对象可以获取url的变化情况：
    console.log(event.oldURL, event.newURL)
    
    // 通过这种方式可以获取路由值（location.hash会带#）
    const hash = location.hash.slice(1)
    
    // TODO
})
~~~

在 vue-router 的源码中，其实并不是直接就是用 `hashchange` 事件的，在支持 `window.history.pushState` 的情况下，会转而监听 `popstate` 事件：

~~~js
const handleRoutingEvent = () => {
    const current = this.current
    if (!ensureSlash()) {
        return
    }
    // 大致为切换组件
    this.transitionTo(getHash(), route => {
        if (supportsScroll) {
            handleScroll(this.router, route, current, true)
        }
        if (!supportsPushState) {
            replaceHash(route.fullPath)
        }
    })
}
const eventType = supportsPushState ? 'popstate' : 'hashchange'
window.addEventListener(
    eventType,
    handleRoutingEvent
)
~~~

在对 url 进行更改时，如： push 、 replace 等操作时，会先查询是否支持 `window.history.pushState` ，若支持直接使用 `history` 对象上的 Api ，若不支持则通过 `window.location` 来改变 url，这里贴一下 push 操作的代码：

~~~js
class HashHistory extends History {
    // ...
    push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
        const { current: fromRoute } = this
        this.transitionTo(
            location,
            route => {
                pushHash(route.fullPath)
                handleScroll(this.router, route, fromRoute, false)
                onComplete && onComplete(route)
            },
            onAbort
        )
    }
    // ...
}

function pushHash (path) {
    if (supportsPushState) {
        pushState(getUrl(path))
    } else {
        window.location.hash = path
    }
}
~~~



## history模式

其实这个模式和 hash 模式也基本上大差不差，只不过在监听事件的绑定上 history 模式是直接使用了 `popstate` 事件，在更改路由的时候也是直接使用 `history.pushState` 等方法

他与 hash 模式最大的不同点在于：不再需要丑丑的 `#` 符号了。不过这也是有代价的，这个模式下若是刷新了页面，则会真的向后端发出请求，请求的路径为当前的 url ，若是后端没有对此做出应对，则会导致返回 404 错误。为了解决这一问题，可以在后端让请求都返回 index 首页，这里使用 Nginx 当作例子，在它的配置文件中增加如下代码即可：

~~~
server {
    listen          80;
    server_name     xxx.com;

    location / {
        # 关键代码，添加后Nginx支持history模式
        try_files $uri $uri/ /index.html;
    }
}
~~~

