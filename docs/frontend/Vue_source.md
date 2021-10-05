---
title: Vue源码学习笔记
postTime: 2020-10-20
categories: Vue源码学习笔记
tags: 
- Vue
- 源码
- 深入学习
---

::: slot abstract

![image.png](https://i.loli.net/2020/10/25/W5HPJ4gNG7OKb2y.png)

Vue源码中的数据劫持部分，属于**面试常考内容**。

涉及到 `Object.defineProperty` 和 ES6中的 `Proxy` ，两者分别为 [Vue2](https://cn.vuejs.org/) 和 [Vue3](https://v3.vuejs.org/) 在实现数据劫持时所使用的关键技术

> 文中只记录了 `Object.defineProperty` 的实现，后续会更新 `Proxy` 的实现

:::

## 数据劫持

### 原理流程图

![image.png](https://i.loli.net/2020/10/25/W5HPJ4gNG7OKb2y.png)

### 初始化 init

将创建Vue对象时传入的 `options` 对象和options中的 `data` 挂载到vm示例上

~~~js
function Vue(options) {
    this._init(options)
}

Vue.prototype._init = function (options) {
    const vm = this
    // 将options对象挂载到vm示例上
    vm.$options = options

    initState(vm)
}

function initState(vm) {
      var options = vm.$options

      if (options.data) {
            // 初始化data
            initData(vm)
      }
}

function initData(vm) {
    var data = vm.$options.data

    // 将data()函数返回的数据绑定到实例的_data上
    vm._data = data = typeof data == 'function' ? data.call(vm) : data || {}

    for (var key in data) {
        // 代理数据
        proxyData(vm, '_data', key)
    }

    // 使用数据的观察者观察数据
    observe(vm._data)
}
~~~

将 `options` 以 `$options` 形式， `data` 以 `_data_` 形式，挂载在实例上

![image.png](https://i.loli.net/2020/10/26/sOAYtQkwcy7pzH9.png)



### 代理 proxy

代理就是使用 `vm.xxx` 去获取或更改 `vm._data.xxx` ，同时也将 `data` 上的所有属性挂载在实例上

~~~js
function proxyData(vm, target, key) {
      // 此处的前两个参数可以理解为：vm.xxx(key为.后xxx)
      Object.defineProperty(vm, key, {
            // 使用代理后可以直接使用vm.xxx来获取或修改vm._data.xxx
            get() {
                  return vm[target][key]
            },
            set(newValue) {
                  vm[target][key] = newValue
            }
      })
}

// 官方源码
function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }
~~~



### 观察者 observer

对data及其内部的属性进行观察，由于对对象和数组的处理方法不一样，需要分两部分处理：

- 处理对象使用 `Object.defineProperty` 方法

~~~js
function observe(data) {
    // 只观察引用类型，即对象或数组
    if (typeof data !== 'object' || data === null) return
    var ob
    // 已被观察则返回data.__ob__，省去多余操作
    if (data.__ob__ && data.__ob__ instanceof Observer) {
        ob = data.__ob__;
    }
    else {
        ob = new Observer(data)
    }
    return ob
}

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

function Observer(data) {
    // 将Observer对象挂载到被观察的对象上，标识是否已被观察
    def(data, '__ob__', this);
    if (Array.isArray(data)) {
        data.__proto__ = arrMethods
        observeArr(data)
    }
    else {
        this.walk(data)
    }
}

Observer.prototype.walk = function (data) {
    var keys = Object.keys(data)
    // 遍历data的所有key和value
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            value = data[key]

        defineReactiveData(data, key, value)
    }
}
~~~



- 添加响应式数据处理

~~~js
function defineReactiveData(data, key, value) {
    // 递归观察
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            // 响应式数据获取
            console.log('响应式数据获取: ', value);
            return value
        },
        set(newValue) {
            // 响应式数据设置
            console.log('响应式数据设置');
            if (newValue === value) return
            // 观察新值
            observe(newValue)
            value = newValue
        }
    })
}
~~~



- 若是数组，则需要对数组方法进行拦截，重写所有会改变原数组的方法

~~~js
// 存放所有会改变原数组的方法
var ARR_METHODS = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

// 继承Array类
var originArrMethods = Array.prototype,
    arrMethods = Object.create(originArrMethods)

// 遍历ARR_METHODS，一个一个重写里面的方法
ARR_METHODS.forEach(m => {
    arrMethods[m] = function () {
        console.log('数组新方法', arguments);
        var args = Array.prototype.slice.call(arguments),
            rt = originArrMethods[m].apply(this, args)

        var newArr

        switch (m) {
            case 'push':
            case 'unshift':
                newArr = args
                break
            case 'splice':
                newArr = args.slice(2)
                break
            default:
                break
        }

        newArr && observeArr(newArr)
        return rt
    }
})

function observeArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        observe(arr[i])
    }
}
~~~

重写所有会改变原数组的方法后：

![image.png](https://i.loli.net/2020/10/26/xrNTctaFl8PVBnI.png)



## 模板编译

### 原理流程图

![image.png](https://i.loli.net/2020/10/25/VsgfWzO1rAT2m8X.png)



### 编译入口

通过**el**或**template**或**render**来获取HTML模板（template）

~~~js
let inBrowser = typeof window !== 'undefined';

Vue.prototype.$mount = function (el) {
    const vm = this,
          options = vm.$options

    el = el && inBrowser ? document.querySelector(el) : undefined
    vm.$el = el

    if (!options.render) {
        let template = options.template

        if (!template && el) {
            template = el.outerHTML
        }

        const render = compileToRenderFunction(template)
        options.render = render
    }
}
~~~



### 渲染函数编译入口

生成渲染函数，需要先将HTML模板解析为AST树，再由AST树通过拼接字符串的方式去生成渲染函数的函数体字符串，最后通过 `new Function()` 传入函数题字符串来生成渲染函数

~~~js
function compileToRenderFunction(html) {
    const ast = parseHtmlToAST(html),
          code = ast ? generate(ast) : '_c("div")',
          render = new Function(`
              with(this){ return ${code} }
		  `)

    return render
}
~~~

生成渲染函数的过程（第一个为HTML模板字符串）：

![image.png](https://i.loli.net/2020/11/01/YWUldSJ3V9bkwri.png)



### 构建AST树

通过获取的template来生成AST树（Abstract Syntax Tree 抽象语法树）

- 使用正则去匹配标签名、属性等：

~~~js
// 匹配属性：id="app" | id='app | id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 匹配标签名
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// 匹配开始标签：<div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// 匹配结束标签：> | />
const startTagClose = /^\s*(\/?)>/
// 匹配整个结束标签：</div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
~~~

- 使用解析函数将HTML模板转换为AST树，工作原理：

  从头开始匹配第一个标签或文本，每匹配到一次就将匹配到的标签或文本解析为一个AST树节点，并将其从HTML模板中删去；

  若匹配到的是一个开始标签，则将标签名压入栈中；

  若为结束标签，则对应的解析出的AST树节点将会以相应的父子关系添加进AST树中，然后继续从头匹配下一个标签或文本，直到HTML模板长度为0结束

~~~js
function parseHtmlToAST(html) {
    let text,
        root,
        currentParent,
        stack = []

    while (html) {
        let textEnd = html.indexOf('<')
        // 以 < 开头时才去匹配标签
        if (textEnd === 0) {
            const startTagMatch = parseStartTag()

            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }

            const endTagMatch = html.match(endTag)

            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }

        if (textEnd > 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length)
            chars(text)
        }
    }

    // 通过开始标签（例如：<div）来匹配到每一个标签
    function parseStartTag() {
        let end,
            attr

        const start = html.match(startTagOpen)

        // match()匹配失败时返回一个null
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)

            // 获取标签的所有属性
            // 赋值语句会返回所赋给变量的值，以此判断是否匹配到相应内容
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }

            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }

    function advance(n) {
        html = html.substring(n)
    }

    // 匹配到开始标签，则将该标签压入栈中
    function start(tagName, attrs) {
        const element = createASTElement(tagName, attrs)

        if (!root) {
            root = element
        }

        // 将当前节点存为currentParent，以便进入子节点后使用
        currentParent = element
        stack.push(element)
    }

    // 匹配到结束标签时，将该标签弹出栈，设置其父节点为当前父节点，并存入当前父节点的子节点数组中
    function end(tagName) {
        const element = stack.pop()
        currentParent = stack[stack.length - 1]

        if (currentParent) {
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }

    // 处理纯文本，直接存入当前父节点的子节点数组中
    function chars(text) {
        text = text.trim()

        if (text.length > 0) {
            currentParent.children.push({
                type: 3,
                text
            })
        }
    }

    // 生成AST树节点
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent
        }
    }

    return root
}
~~~

解析过程中，HTML模板字符串的变化（部分）：

![image.png](https://i.loli.net/2020/11/02/grMNlvusAHdWh4C.png)

栈内元素的变化情况：

![image.png](https://i.loli.net/2020/11/01/GzdB1nKCP7TbmVZ.png)

最终解析出的AST树：

![image.png](https://i.loli.net/2020/11/01/3kqDV4CI2WhAiNl.png)



### 生成渲染函数

~~~js
function generate(el) {
    let children = getChildren(el)
    let code = `_c('${el.tag}', ${el.attrs.length > 0
        ?
        `${formatProps(el.attrs)}`
        :
        'undefined'
        }${children ? `,${children}` : ''
        })`

    return code
}
~~~



### 虚拟DOM

通过AST树解析出虚拟DOM，再用 `patch()` 函数以打补丁的形式将虚拟DOM转换为真实的DOM

~~~js
function renderMixin(Vue) {
    // 创建节点函数
    Vue.prototype._c = function () {
        return createElement(...arguments)
    }

    // 处理{{ }}中的值，若为对象则转为字符串
    Vue.prototype._s = function (value) { 
        if (value === null) return
        return typeof value === 'object' ? JSON.stringify(value) : value
    }

    // 处理纯文本内容
    Vue.prototype._v = function (text) {
        return createTextVnode(text)
    }

    Vue.prototype._render = function () {
        const vm = this,
              render = vm.$options.render,
              vnode = render.call(vm)

        return vnode
    }
}
~~~





## 依赖收集