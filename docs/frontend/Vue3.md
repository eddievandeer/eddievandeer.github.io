---
layout: ArticleDetail
---

# Vue3笔记

## setup函数

- 调用时机：在初始化属性之后， `beforeCreate` （此钩子已不存在）之前调用

- 使用：

  若setup函数返回的是一个对象，则对象的属性将会被合并到组件模板的渲染上下文

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
                // 直接return state需要使用{{ state.count }}调用其中属性，使用...toRefs则直接使用{{ count }}
                // 没有用toRefs包裹直接...state会丧失响应式
                ...toRefs(state)
            }
        },
    }
</script>
```

- 渲染函数

  setup函数可以返回渲染函数

~~~js

~~~

