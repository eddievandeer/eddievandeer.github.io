---
layout: ArticleDetail
---
# 面试题

## Object.defineProperty()

### 第一题

**题目：**

~~~js
// 让下列代码打印出结果
if(a === 1 && a === 2 && a === 3){
    console.log('You win!')
}
~~~

**解答：**

~~~js
//  定义一个变量，用于控制返回的内容
let _default = 0

// a未定义，因此挂载在window上
// 覆盖window对象的a属性的取值行为
Object.difineProperty(window, 'a', {
    get(){
        return ++_default
    }
})

// 每次取值_default自增，因此每次判断时a的值都不一样
if(a === 1 && a === 2 && a === 3){
    console.log('You win!')
}
~~~

