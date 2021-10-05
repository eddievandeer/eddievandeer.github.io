---
title: Vue3尝鲜记录
postTime: 2020-10-20
categories: 
- 前端笔记
- Vue
tags:
- 前端
- Vue
- 笔记
---

::: slot abstract

![vue3](http://upyun.cavalheiro.cn/images/vue3.jpg)

[Vue.js 3.0](https://v3.vuejs.org/) 于2020年9月正式发布，这个框架的新的主要版本提供了改进的性能、更小的捆绑大小、更好的 TypeScript 集成、用于处理大规模用例的新 API，以及为框架未来的长期迭代奠定了坚实的基础

> 本篇文章为Vue3的学习笔记，记录一些在Vue2中没有的新东西，以及Vue3中对Vue2原有的部分内容做出的更改

:::

## Composition API设计模式

Vue3中使用的是Composition API，即组合式API，相较于Vue2中使用的Options API（配置型API），Composition API更加自由，各个API可以在需要被使用的时候再引入



## setup函数

- 调用时机：在初始化属性之后， `beforeCreate` （此钩子和 `created` 已不存在）之前调用

- 使用：

  - 若setup函数返回的是一个对象，则对象的属性将会被合并到组件模板的渲染上下文**(Context)**
  
  - 只要是在 `<template>` 中使用到的，都需要在setup函数中返回
  - setup函数中不能使用this

```vue
<template>
    <div>
    	<h2>{{ num }}</h2>
        <span>{{ count }}</span>
    </div>
</template>

<script>
	// 从Vue中解构出Composition API
    import { ref, reactive, toRefs } from 'vue'

    export default {
        setup() {
            // 是一个RefImpl对象，在setup中调用值需要用.value，而在模板中会自动拆开不需要用.value
            const num = ref(0)
            const state = reactive({ 
                count: 1
            })

            // 暴露给模板
            return {
                num,
                // 直接return state需要在模板中使用{{ state.count }}调用其中属性，
                // 使用...toRefs则可在模板中直接使用{{ count }}
                // 没有用toRefs包裹直接...state会丧失响应式
                ...toRefs(state)
            }
        },
    }
</script>
```



### 渲染函数

setup函数可以返回一个函数来作为渲染函数

~~~vue
<script>
    import { h, watch } from 'vue'

    export default {
        setup(props) {
            let data = ref({
                title: 'Welcome to Your Vue.js App'
            })
            // 使用vue提供的h()函数
            return () => h('h1', [data.value.title])
        }
    }
</script>
~~~



### 参数

- setup函数接收的第一个参数为 `props` 对象，即父组件传入子组件的参数；该props对象是响应式的，可通过 `watchEffect` 或 `watch` 进行监视

~~~vue
<script>
    import { watch } from 'vue'

    export default {
        name: 'HelloWorld',
        props: {
            title: String
        },
        setup(props) {
            watch(() => props.title, (newValue) => {
                console.log(newValue);
            })
        }
    }
</script>
~~~

:::tip

不要解构props对象！会使其失去响应式！

在组件内部props是不可变的！只能从提供方修改

:::



- 第二个参数是一个 `context` 对象，他抛出三个属性：**attrs**， **emit**， **slots**

![image-20201119154106528](https://i.loli.net/2020/11/21/Qame3JFWV54biGn.png)

在子组件中可使用 `context.emit` 来向父组件发送数据：

~~~vue
<!-- 父组件 -->
<template>
	<!-- 绑定plus函数 -->
    <HelloWorld :count="count" @plus="plus" />
</template>

<script>
    import { ref } from 'vue'
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        // 需要注册emit
        emits: ['plus'],
        setup() {
            let count = ref(0)
            // 定义plus函数处理子组件发送过来的数据
            const plus = (num) => {
                count.value += num
            }

            return {
                count,
                plus
            }
        }
    }
</script>

<!-- 子组件 -->
<template>
    <div class="hello">
        <h1>{{ count }}</h1>
        <!-- 绑定点击事件，触发plus函数 -->
        <button @click="plus">Add</button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            count: Number
        },
        setup(props, context) {
            // 定义plus函数，用于向父组件发送数据
            const plus = () => {
                // 相当于Vue2.x的 this.$emit()
                context.emit('plus', 10)
            }

            return {
                plus
            }
        }
    }
</script>
~~~

:::tip

props不放在context中的原因：

1、props的使用更加频繁，甚至有的组件只用到了props

2、能够更好的对props进行类型推断

:::



## Reactivity APIs

Vue3的重点部分

在Vue2.x中使用Object.defineProperty来实现数据劫持，而在Vue3当中，使用的是ES2015中的**Proxy**对象

### reactive()

返回一个对传入数据**响应式代理**（reactive proxy）的对象，等效于Vue2.x中的 `Vue.observable()` 

~~~js
const proxyObj = reactive({
    a: 1,
    b: 2
})

console.log(proxyObj);
~~~

reactive()函数返回的是一个Proxy对象

![image-20201119173335954](https://i.loli.net/2020/11/21/tA4HsOBIbEfz1je.png)



### ref()

传入一个值作为内部值（inner value），返回一个ref对象，该对象只有一个属性：`value` ，指向这个内部值

~~~js
const data = ref(0)

console.log(data)
~~~

![image-20201121101711325](https://i.loli.net/2020/11/21/KnNHte8x7AXF1B3.png)

若传入的值是一个对象，则该对象将会被reactive函数包装一下，使其变成深度响应式的数据

~~~js
let data = ref({
    count: 0
})

console.log(data);
~~~

![image-20201121110820825](https://i.loli.net/2020/11/21/Nh1EHawP94xlRUX.png)