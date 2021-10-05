---
title: Vue入门学习笔记
postTime: 2020-09-25
categories: 
- 前端笔记
- Vue
tags: 
- 前端
- Vue
- 笔记
---

::: slot abstract

<div style="width: 100%;height: 200px;display: flex;justify-content: center">
  <img style="width: auto;height: 100%" src="http://upyun.cavalheiro.cn/images/logo.png"/>  
</div>

[Vue2](https://cn.vuejs.org/) 入门笔记，适合刚接触Vue的新手阅读（部分过于基础的内容这里就不做记录了）

主要内容包括：

- Vue基础
- Vue工程化
- Vuex的使用

:::

## 1、Vue基础

### 1.1 Vue常用特性

**表单操作**

1. 文本框使用v-model双向数据绑定处理
2. @click.prevent="xxx"阻止submit按钮的默认提交行为
3. 单选框、多选框也使用v-model双向数据绑定控制value的值，多选需用列表并toString
4. 下拉框使用Multiple="true"即可多选；在select上使用v-model即可绑定列表
5. 表单域修饰符：
   - v-model.number：转为数值
   - v-model.trim：去掉开头和结尾的空格，不包括中间
   - v-model.lazy：将input事件改为change事件，失去焦点时触发，常用于验证用户名能否使用。



**自定义指令**

v-if，v-for等内置指令不满足需求时，可以进行自定义，语法：

~~~javascript
//全局指令
Vue.directive('指令名称', {
    //指令内容
    inserted: function(el) {
        //el为指令挂载的元素
    }
})

//局部指令写在组件中
var app = new Vue({
    directives: {
        //xxx为指令名
        xxx: {
            //指令内容
            inserted: function(el, binding) {
                //el为指令挂载的元素
            }
        }
    }
})

//在使用时需要加v-：<div v-指令名称></div>
~~~

钩子函数：

- bind：只在绑定到元素时调用一次，一般用于初始化设置
- inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中，与虚拟DOM有关）
- update：所在组件的VNode更新时调用，可能发生在其子VNode更新之前
- componentUpdate：指令所在组件的VNode及其子VNode全部更新后调用
- unbind：只在指令与元素解绑时调用

~~~javascript
//在 bind 和 update 时触发相同行为，而不关心其他钩子，可以这样简写：
Vue.directive('指令名', function(el, binding) {
    //TODO
})
~~~



钩子函数参数：

- el：指令绑定的元素，用于直接操作DOM
- binding：包含指令信息的对象
  - name：不带v-的指令名
  - value：指令的绑定指，即=后面的值
  - oldValue，expression，arg，modifiers
- vnode：Vue编译生成的虚拟节点
- oldVnode：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用



**计算属性**

缓存一次计算的结果，再次调用计算属性时返回缓存的内容，不需要再次执行计算过程；当依赖的数据发生变化时，才会重新执行计算。可以节省性能

~~~javascript
//在组件内部定义
var app = new Vue({
    computed: {
        fn: function(){
            //TODO
        }
    }
})
~~~



**过滤器**

用于格式化数据，如日期的格式转化

定义过滤器：

~~~javascript
//全局：
Vue.filter('filterNAme', function(val){
    //返回结果
    return xxx;
})

//局部：
var app = new Vue({
    filters: {
        filterName: function(val){
            //返回结果
            return xxx;
        }
        //带参数的过滤器
        filter2: function(val,arg1,arg2){
            return xxx;
        }
    }
})
~~~

使用过滤器：

~~~html
<!-- |为管道符号 -->
<!-- 使用单个过滤器 -->
<div>{{msg | filterName}}</div>

<!-- 使用多个过滤器，后一个过滤器处理前一个过滤器的结果 -->
<div>{{msg | filter1 | filter2}}</div>

<!-- 在属性种使用过滤器 -->
<div :id="id | idFilter"></div>

<!-- 使用带参数的过滤器 -->
<div>{{msg | filterName('abc','efg')}}</div>
~~~





**侦听器**

监听一个数据的变化，当数据发生变化时，触发执行绑定的函数，用于执行异步的或开销比较大的操作。用法：

~~~javascript
//在组件内部定义
var app = new Vue({
    //......
    watch: {
        //test为当前监听的属性
        test: function(val) {
            //val是当前监听属性的最新值
            //TODO
        }
    }
})
~~~

使用场景：验证用户名、邮箱的可用性等



**生命周期**

主要阶段

- 挂载（初始化相关属性）
  - beforeCreate：observer和event/watcher事件配置之前触发
  - created：实例创建完成立即触发
  - beforeMount：render渲染函数首次被调用时触发（**服务器端渲染期间不被调用**）
  - mounted：el被新创建的vm.$el替换，并挂载到实例上之后触发，常用于初始化
- 更新（元素或组件的变更操作）
  - beforeUpdate
  - update
- 销毁（销毁相关属性）
  - beforeDestroy
  - destroy

生命周期图示

![lifecycle.png](https://i.loli.net/2020/10/27/JFDgCikB1eSQhIA.png)

### 1.2 版本2.6.0新增

**动态参数**

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

~~~html
<!-- 动态参数预期会求出一个字符串,异常情况下值为null -->
<div v-bind:[attributename]="name"></div>
<button v-on:[eventname]="test"></button>
<!-- 动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。 -->
<!-- 同时要避免使用大写字母来命名，因为浏览器会把属性名强制转为小写 -->
~~~



**具名插槽的简写**

把参数前的内容，即 `v-slot:` 替换成字符 `#`

~~~html
<!-- 简写前 -->
<template v-slot:header="slotProps"></template>

<!-- 简写后 -->
<template #header="slotProps"></template>
~~~



**动态插槽名**

动态参数也可以用于 `v-slot` 上，来动态地定义插槽名

~~~html
<base-layout>
  <template v-slot:[slotname]></template>
</base-layout>
~~~



## 2、Vue组件

### 2.1 组件注册

每一个组件的数据都是独立的。组件注册语法：

~~~javascript
//组件命名：1. 驼峰式  2. 短横线式
//若使用驼峰式的命名方式，在使用的时候需要在标签中使用短横线的方式
//原因：在HTML中不区分大小写
//全局注册
Vue.component('组件名称',{
    //组件中data必须是个函数
    data: function(){
        return {
            count: 0
        }
    },
    //要保证有根元素
    template: `
			<div>
        		<button @click="handle">Test:{{count}}</button>
        	</div>
	`,
    method: {
        handle: function(){
            this.count++;
        }
    }
})

//局部注册
var app = new Vue({
    //只能在父组件中使用
	components: {
		'hello-world': {
            data: function(){
                return {
                    test: 0;
                }
            }
        },
        template: `
			<div>{{test}}</div>
		`
	}
})
~~~



### 2.2 组件中的数据交互

**父组件向子组件传递数据**

父组件通过属性传递值 :

~~~html
<menu-item title="xxx"></menu-item title>
<menu-item :title="title"></menu-item title>
<!-- 绑定时若数据为数值、布尔值、数组、对象，需要通过v-bind进行绑定，否则传递的都是字符串 -->
~~~

子组件通过props接收传递过来的值：

~~~javascript
Vue.component('item', {
    //porops是一个数组
    props: ['title'],
    template: `<div>{{title}}</div>`
})
~~~

props命名规则：若使用驼峰式的命名方式，在使用的时候需要在标签中使用短横线的方式。若在组件中以子组件的形式被使用，则可以直接使用驼峰命名

~~~javascript
//以下情况可以正常使用
//子组件
Vue.component('test-com',{
    props: ['testTitle'],
    template: `<div>{{testTitle}}</div>`
});

//父组件
Vue.component('parent-com',{
    template: `
        <div>
        	<test-com testTitle="test"></test-com>
        </div>
    `
});
~~~



**子组件向父组件传递数据**

props传递数据原则：单向数据流，只允许父组件向子组件传递数据，而不允许子组件直接操作数据

子组件向父组件传递数据可以通过自定义事件来实现：

~~~html
<!-- 子组件通过自定义事件向父组件传递数据 -->
<button v-on:click='$emit("自定义事件名", 参数)'>Test</button>

<!-- 在父组件模板内监听子组件的事件，通过$event接收来自子组件的值 -->
<menu-item v-on:自定义事件名='handle($event)'></menu-item>
~~~



**非父子组件间交互**

非父子组件间由单独的事件中心管理组件间的通信，通过$on()方法监听事件，$off()方法销毁事件。使用方法：

~~~javascript
//提供事件中心
var hub = new Vue();

//在组件中
Vue.component('test-com1',{
    data: function(){
        return {
            num: 1
        }
    },
    template: `
        <div>{{num}}</div>
    `,
    methods: {
        handle: function(){
            //触发兄弟组件的事件并传递数据
            hub.$emit('兄弟组件监听事件名',2);
        }
    },
    mounted: function(){
        //监听事件
        hub.$on('事件名', (val)=>{
            //val为传递的数据
            //此处执行响应事件
        });
    }
});

Vue.component('test-com2',{
    data: function(){
        return {
            num: 2
        }
    },
    methods: {
        handle: function(){
            //触发兄弟组件的事件并传递数据
            hub.$emit('兄弟组件监听事件名',1);
        }
    },
    mounted: function(){
        //监听事件
        hub.$on('事件名', (val)=>{
            //val为传递的数据
            //此处执行响应事件
        });
    }
    template: `
        <div>{{num}}</div>
    `
});
~~~



**组件插槽**

写在组件标签内的内容，如果在组件模板内没有使用插槽的话，则该组件起始标签和结束标签之间的任何内容都会被抛弃。要想呈现组件标签内的内容，需要在组件模板中使用插槽 <slot></slot> 

> 在 2.6.0 中，Vue为具名插槽和作用域插槽引入了一个新的统一的语法 (即 `v-slot` 指令)，它取代了 `slot` 和 `slot-scope` 这两个目前已被废弃的attribute

使用方法：

~~~html
<!-- 组件模板 -->
<div>
    <p>
        Alert:
    </p>
    <!-- 组件渲染时，会将<slot></slot>替换为标签内的内容 -->
    <slot>默认展示的内容，若标签内有内容将被标签内容替代，否则展示默认的</slot>
</div>

<!-- 合成组件，可以包含HTML及其他组件 -->
<test-com>
    <other-com>
        Test<span class="fa fa-cut"></span>
    </other-com>
</test-com>
~~~



**具名插槽**

当需要用到多个插槽时，需要使用具名插槽来进行区分：

~~~html
<!-- 组件模板 -->
<div>
    <div>
        <!-- <slot>元素有个特殊的attribute：name，可以为插槽命名，用来定义额外插槽 -->
        <slot name="header"></slot>
        <slot name="main"></slot>
        <slot name="footer"></slot>
        <slot>
            <p>That's default content</p>    
        </slot>
    </div>
</div>

<!-- 合成组件 -->
<base-layout>
    <!-- 在<template>元素上使用v-slot指令，并以参数的形式提供其名称 -->
    <!-- 在以前的版本中使用<template slot="header"，现已被废除且不会在Vue3中出现> -->
    <template v-slot:header>
        <h1>Here might be a page title</h1>
    </template>
    <template v-slot:main>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
    </template>
    <!-- 可以使用简写'#'，省略'v-slot:' -->
    <template #footer>
        <p>Here's some contact info</p>
    </template>
</base-layout>
~~~

一般来说 `v-slot` 只能用在 `<template>` 标签上，只有一种情况例外：当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用

~~~html
<!-- 在组件上使用v-slot -->
<current-user v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
</current-user>

<!-- 简写，省略后面的:default -->
<current-user v-slot="slotProps">
    {{ slotProps.user.firstName }}
</current-user>
~~~



**作用域插槽**

为了使组件中的数据在父级的插槽上可用，需要将数据作为<slot></slot>元素的一个属性（attribute）绑定上去，绑定在 `<slot>` 元素上的 attribute 被称为**插槽 prop**：

~~~html
<!-- 组件模板中定义插槽 -->
<slot v-bind:user="user">
    {{ user.firstName }}
</slot>

<!-- 组件中使用v-slot:default="自定义"获取 -->
<template v-slot:default="slotProps">
    {{ slotProps.user.lastName }}
</template>

<!-- 作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里 -->
<!-- 这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式 -->
<!-- 解构 -->
<template v-slot:default="{user}">
    {{ user.lastName }}
</template>
~~~



### 2.3 动态组件 & 异步组件

**动态组件**

在组件之间切换时，需要考虑保持这些组件的状态，以避免反复重渲染导致的性能问题。为解决该问题，可以使用一个 `<keep-alive` 元素包裹住动态组件：

~~~html
<!-- 组件实例能够在它们第一次被创建的时候被缓存下来，在切换组件之后保留其状态 -->
<keep-alive>
    <component v-bind:is="currentTabComponent"></component>
</keep-alive>
~~~

**异步组件**

在大型应用中，可能需要将应用分割成小的代码块，并且只在需要的时候才从服务器加载一个模块。Vue允许以一个工厂函数的方式定义组件，只有在这个组件需要被渲染的时候才会触发该工厂函数，且会缓存结果，以供未来重新渲染：

~~~javascript
Vue.conponent('async-example',function(resolve, reject){
    //TODO：官方建议将异步组件和webpack的code-splitting功能一起配合使用
    // 这个特殊的 `require` 语法将会告诉 webpack
    // 自动将你的构建代码切割成多个包，这些包
    // 会通过 Ajax 请求加载
    require(['./my-async-component'], resolve);
})
~~~



## 3、单文件组件

### 3.1 基本使用

单文件组件的组成结构为：

- template：组件的模板区域
- script：业务逻辑区域
- style：样式区域

~~~vue
<template>
	<!-- 用于定义模板内容 -->
</template>

<script>
	//用于定义业务逻辑
    export default {
        data () {
            return {
                message: 'hello world'
            }
        }, //私有数据
        methods: {} //处理函数
    	//...其他
    }
</script>

<style scoped>
    /* 添加scoped防止冲突 */
	/* 用于定义样式 */
</style>
~~~



### 3.2 在webpack项目中使用vue

**使用步骤**

安装vue：

~~~bash
npm install vue -D
~~~

index.js 入口函数中，添加：

~~~js
// 导入Vue
import Vue from 'vue';
// 导入根组件
import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    // 通过render函数渲染指定组件
    render: h => h(App)
})
~~~



**配置vue组件加载器**

由于webpack不能处理.vue文件，需要安装对应的loader：

~~~bash
npm install vue-loader vue-template-compiler -D
~~~

安装后在 `webpack.config.js` 配置文件中，添加 `vue-loader` 的配置项：

~~~js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    module: {
        rules: [
            //else
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    plugins: [
        //else
        new VueLoaderPlugin()//引入插件
    ]
}；
~~~



## 4、Vue脚手架

### 4.1 Vue脚手架的使用

用于快速生成Vue的项目基础架构

安装：

~~~bash
npm install -g @vue/cli
~~~

创建项目：

~~~bash
# 交互式命令行方式创建项目
vue create my-project

# 图形化界面方式创建项目
vue ui

# 基于就没模板创建项目
npm install -g @vue/cli-init
vue init webpack my-project
~~~

启动服务：

~~~bash
# vue-cli-service serve
npm run serve
~~~

编译打包：

~~~bash
# vue-cli-service build
npm run build
~~~



### 4.2 自定义配置

- 通过 `package.json` 配置（不推荐）：

  ~~~json
  // 将vue相关的配置放入该节点
  "vue": {
      "devServer": {
          "port": 8888, // 修改端口号
          "open": true // 打包成功后自动打开浏览器
      }
  }
  ~~~

- 通过单独的配置文件配置（推荐）：

  在根目录下创建 `vue.config.js` 文件，配置如下内容：

  ~~~js
  module.exports = {
      devServer: {
          port: 8888, // 修改端口号
          open: true // 打包成功后自动打开浏览器
      }
  }
  ~~~



### 4.3 环境变量

在根目录下创建 `.env` 文件，写入环境变量后使用process对象获取：

~~~js
// .env文件中写入：
// VUE_APP_URL=xxxxx

process.env.VUE_APP_URL
~~~

开发环境的环境变量放在 `.env.development` 文件下，在开发环境下使用该文件下的环境变量；

生产环境的环境变量放在 `.env.production` 文件下，也可以放在 `.env` 文件里，用于编译时使用



### 4.4 独立运行.vue文件

全局安装 `vue serve` ：

~~~bash
npm install -g @vue/cli-server-global
~~~

使用 `vue serve` ：

~~~bash
# 开启服务，运行.vue文件
vue serve XXX.vue
~~~



### 4.5 跨域问题

**开发环境下：**

在 `vue-config.js` 配置文件下的 `devServer` 中，添加字段 `proxy` ：

~~~js
module.exports = {
    baseUrl: '/',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8888,
        https: true,
        // 配置代理
        proxy: {
            '/api': {
                target: 'http//localhost:8080/api',
                ws: true,
                changeOringin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
~~~



## 5、Vuex的简单使用

使用Vuex：

~~~js
// main.js
import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex
Vue.use(Vuex)

// 创建store
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

new Vue({
    el: '#app',
    // 注入store
    store
})
~~~



### 5.1 State

Vuex使用单一状态树，一般使用计算属性获取状态：

~~~vue
<script>
    export default {
        computed: {
            computed: {
                count () {
                    return this.$store.state.count
                }
            }
        }
    }
</script>
~~~

**mapState辅助函数**

解决了反复声明计算属性的繁琐操作：

~~~vue
<script>
    export default {
        computed: mapState({
            count: state => state.count,
            // 传字符串参数，'count'等同于state => state.count
            countAlias: 'count',
        })
    }
</script>
~~~



### 5.2 Getters

store中的"**getter**"可以当作store中的计算属性，"getter"的返回值依赖于state中的值，当依赖值发生变动"getter"将会重新计算

定义"gatter"：

~~~js
// store.js 或 main.js
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            // 处理state中的值后返回
            return state.todos.filter(todo => todo.done)
        }
    }
})
~~~

访问"getter"：

~~~vue
<script>
    export default {
        computed: {
            doneTodosCount () {
                return this.$store.getters.doneTodos
            }
        }
    }
</script>
~~~

**mapGetters辅助函数**

使用对象展开运算符将store中的getter映射到计算属性上：

~~~vue
<script>
    // 要先引入mapGetters
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            // 返回一个对象
            ...mapGetters([
                'doneTodosCount',
                'anotherGetter',
            ])
        },
        // 或以对象的形式传参，用于起别名
        ...mapGetters({
            // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
            doneCount: 'doneTodosCount'
        })
    }
</script>
~~~



### 5.3 Mutations

store中的状态必须通过提交 `mutation` 才能变更，每一个 `mutation` 包含两个部分，一个是字符串的事件类型**type**，和一个回调函数**handler**。事件类型就是为这个mutation所起的名字，回调函数则是用于执行状态更改操作，并且默认接收 `state` 作为第一个参数

每一个mutation的**handler**都不能直接调用，需要调用 **store.commit()** 方法并传入相应的**type**来唤醒一个**handler**：

~~~js
// 创建一个mutation
const store = new Vuex.Store({
    // ...
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

// 触发一个type为'increment'的mutation
store.commit('increment')

// store.commit也可传入额外的参数，称为载荷
// 一般载荷应为一个对象，这样会更易读
const store = new Vuex.Store({
    // ...
    mutations: {
        increment (state, payload) {
            state.count += payload.amount
        }
    }
})

// 传参调用mutation
store.commit('increment', {
	amount: 10
})
~~~

创建mutation的时候也可以选择使用**常量**来替代mutation的事件类型，同时把这些常量放在单独的文件中可以让整个应用包含的mutation一目了然：

~~~js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutatino-types'

const store = new Vuex.Store({
    state: {
        // ...
    },
    mutations: {
        // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION] (state){
            // ...
        }
    }
})
~~~

:::tip

**Mutation 必须是同步函数**

:::

**mapMutations辅助函数**

使用mapMutations辅助函数可将组件中的 `methods` 映射为 `store.commit` ，提交mutation时可直接调用

~~~vue
<script>
    // 要先引入mapMutations
    import { mapMutations } from 'vuex'

    export default {
        // ...
        methods: {
            ...mapMutations([
                'increment',
                // 也支持载荷
                // this.incrementBy(amount) -> this.$store.commit('incrementBy', amount)
                'incrementBy'
            ])，
            // 或以对象的形式传参，用于起别名
            ...mapMutations({
            	// 将 `this.add()` 映射为 `this.$store.commit('increment')`
            	add: 'increment'
        	})
    	}
    }
</script>
~~~



### 5.4 Actions

Action提交的是mutation，不能直接变更状态，同时Action是可以包含任意异步操作的

**注册Action：**

~~~js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        // context是一个和store实例具有相同方法和属性的对象
        increment (context) {
            context.commit('increment')
        }
    },
    // 使用参数解构简化代码
    actions: {
    	increment ({ commit }) {
    	commit('increment')
	}
}
})
~~~

**分发Action：**

~~~js
// Action通过store.dispatch方法触发
store.dispatch('increment')

// 载荷形式分发
store.dispatch('incrementAsync', {
    amount: 10
})
~~~



### 5.5 Modules

Vuex也支持模块化，避免当状态数量庞大时store对象过于臃肿

~~~js
const moduleA = {
  	state: () => ({ ... }),
  	mutations: { ... },
 	actions: { ... },
 	getters: { ... }
}

const moduleB = {
  	state: () => ({ ... }),
  	mutations: { ... },
  	actions: { ... }
}

// 创建store实例时使用modules添加模块
const store = new Vuex.Store({
  	modules: {
    	a: moduleA,
    	b: moduleB
  	}
})

store.state.a // -> 获取moduleA 的状态
store.state.b // -> 获取moduleB 的状态
~~~

