---
title: CSS animations 和 transitions的性能问题
postTime: 2021-04-07
categories: 
- 前端笔记
- CSS
tags:
- CSS动画
- 浏览器原理
- 优化
---

## 浏览器内部

现代浏览器内部一般会有两个重要的执行线程：**主线程**，**合成线程**

通过 height 设置动画

![animate-height](https://segmentfault.com/img/bVDc96?w=958&h=1479)



通过 transform 设置动画

![transform](https://segmentfault.com/img/bVDda8?w=958&h=1209)
