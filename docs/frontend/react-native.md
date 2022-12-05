---
title: 从零开始学习ReactNative
postTime: 2021-12-04
categories: 
- 前端笔记
- ReactNative
tags: 
- 跨端
- ReactNative
---
::: slot abstract

前段时间初步确定了自己毕设要做什么，大概需要一个 Web 端、一个 App 端、一个桌面应用（暂定，有可能不要了），这两天开始了技术选型，在 App 这块的技术经过原生、 [Weex](http://emas.weex.io/zh/) 、[React Native](https://reactnative.dev/) 的对比后，最后还是选择了甚至没用过的 **React Native** 

原生开发时，写样式真的太难受了，因此这个是我第一个就 Pass 掉了的，而 Weex 在之前安卓开发的课程期末大作业上尝试过，虽然会比原生好一些，但我还是觉得不太满意。然后就是我们今天的主角： React Native 了，最开始是因为在好多前端的招聘要求上都看到了会 React Native 优先考虑（如美团），那么我自然是要为将来找工作做准备啦，直接试水这项 “新技术”

:::



## 什么是React Native

React Naitve 是由 FaceBook 在 2015 年开源的混合应用开发框架，使传统前端开发者也可以基于 React 框架快速开发移动端 APP



## React Native的工作原理

在原生的 App 中使用 WebView 控件作为载体，直接承载着 Web 页面，然后通过 JSBridge 来完成 H5 端与 Native 端之间的通讯，使两者之间可以进行交互，从而赋予 H5 一定的原生能力，让我们的 App 不仅可以拥有原生 Native 极致的体验和性能，还能够享受 Web 技术的快速迭代能力，灵活开发的特点和线上热更新的机制

React 在这中间扮演的角色就是一个转换器，将 Web 中的 DOM 解析成 Virtual DOM ，并使用 JSON 格式将这些数据通过 JSBridge 传递给 Native 层进行解析，以此来生成 APP 的页面



## 开发环境搭建

开发安卓应用时，除了 Node 、 JDK 以外，还需要安装 AndroidStudio ，为的是获取编译 Android 应用所需的工具和环境

在开发 ios 应用时，需要 Node 、 Watchman 和 CocoaPods，同时还必须安装 XCode ，理由和安卓的一样。此外，苹果公司目前只允许在 Mac 电脑上开发 ios 应用，所以要进行 ios 开发还需要准备一台 Mac

因为我没有 mac 电脑，所以本篇文章只记录在 Windows 电脑上使用 React Native 开发 Android 应用的过程



### Node 和 JDK

这两个依赖直接百度一下就会有一大堆安装教程了，这里就不赘述了

注意 Node 的版本应大于等于 12，而 JDK 的版本必须是 1.8 。在安装完依赖后，可以将 npm 镜像设置为淘宝源加速后续下载 node 模块的过程，如果能够科学上网可以忽略这一步

> 不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

~~~bash
# 使用淘宝源
npm config set registryhttps://registry.npm.taobao.org/

# 如果之后需要切换回官方源可使用
npm config set registry https://registry.npmjs.org/

# OR
# 使用nrm工具切换淘宝源
npx nrm use taobao
npx nrm use npm
~~~



### Android 开发环境

这一步会比较繁琐，需要下载 Android Studio 以及 SDK ，可以参考 [React Native 中文网](https://www.react-native.cn/docs/environment-setup) 上面的文档

然后是配置环境变量：

新建一个名为 `ANDROID_HOME` 的环境变量，其值为 SDK 所在的目录，默认为： `C:\Users\你的用户名\AppData\Local\Android\Sdk`

最后将工具目录添加到环境变量 `Path` 上：

~~~powershell
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
~~~



### 创建新项目

为了避免因全局安装过旧版本的 `react-native-cli` 命令行工具导致的一些冲突，建议使用 `npx` 命令：

~~~powershell
npx react-native init ProjectName

# 使用--version参数指定版本
npx react-native init AwesomeProject --version X.XX.X

# 还可以使用--template来使用一些社区提供的模板，例如带有TypeScript配置的
npx react-native init AwesomeTSProject --template react-native-template-typescript
~~~



### 编译并运行

进入新建的项目中，运行如下命令启动项目：

~~~powershell
npx react-native run-android
~~~

跑起来以后，可以通过 `Ctrl + M` 调出开发菜单，其中 `Reload` 和 `Debug` 最常用，而 `Debug` 可以让我们开启浏览器来进行调试，`console.log()` 等都可以在浏览器的控制台看到



### 开发流程

开发 React Native 项目的流程其实就和普通 React 项目差不多，无非是把 div 等 HTML 标签换成了 React Native 官方提供的组件，本质上是一样的

如果有一些特殊功能官方没提供的，可以到 https://reactnative.directory 来搜索社区开源的第三方库