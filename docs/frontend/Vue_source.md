---
layout: ArticleDetail
---

# Vue源码笔记

## 数据劫持

### 原理流程图

![image.png](https://i.loli.net/2020/10/25/W5HPJ4gNG7OKb2y.png)

### 初始化

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
        // 代理
        proxyData(vm, '_data', key)
    }

    // 使用数据的观察者观察数据
    observe(vm._data)
}
~~~



### 代理

代理就是使用 `vm.xxx` 去获取或更改 `vm._data.xxx` ，

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



## 模板编译

![image.png](https://i.loli.net/2020/10/25/VsgfWzO1rAT2m8X.png)



## 依赖收集