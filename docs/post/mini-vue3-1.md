---
title: mini-vue3项目（一）——项目搭建
postTime: 2023-01-12
categories:
- 前端笔记
- Vue
tags:
- Vue
- 学习笔记
- 源码
---



::: slot abstract

离职前最后一次用公司的学习基金，购买了霍春阳大佬写的《Vuejs设计与实现》这本书，看着看着有了个想法，打算跟着书上的步骤一步一步的搭建一个属于自己的 mini-vue3 项目，从头到尾自己手打一遍  Vue3 的核心源码，这样既能加深自己对 Vue 源码的理解，还可以锻炼自己的项目搭建和维护的能力。同时，项目中使用了诸如 `monorepo`、`TDD(Test-Driven Development)` 的设计思想和对应的技术方案，也算是自己对未接触过的新内容的探索和记录。

由于 Vue 源码需要学习和整理的内容很多，我会将这个系列分成多个部分，并在 GitHub 上的 [mini-vue3](https://github.com/eddievandeer/mini-vue3) 项目中先更新这部分的代码，再总结笔记发布到博客网站上。这篇文章将会先进行 **项目搭建** 的过程记录，相信这部分对没有接触过 monorepo 的同志们来说，可以做一些学习上的参考。

:::



## 前言

离职前最后一次用公司的学习基金，购买了霍春阳大佬写的《Vuejs设计与实现》这本书，看着看着有了个想法，打算跟着书上的步骤一步一步的搭建一个属于自己的 mini-vue3 项目，从头到尾自己手打一遍  Vue3 的核心源码，这样既能加深自己对 Vue 源码的理解，还可以锻炼自己的项目搭建和维护的能力。同时，项目中使用了诸如 `monorepo`、`TDD(Test-Driven Development)` 的设计思想和对应的技术方案，也算是自己对未接触过的新内容的探索和记录。

由于 Vue 源码需要学习和整理的内容很多，我会将这个系列分成多个部分，并在 GitHub 上的 [mini-vue3](https://github.com/eddievandeer/mini-vue3) 项目中先更新这部分的代码，再总结笔记发布到博客网站上。这篇文章将会先进行 **项目搭建** 的过程记录，相信这部分对没有接触过 monorepo 的同志们来说，可以做一些学习上的参考。



## monorepo

本项目初次尝试了 **monorepo**，使用的是和官方的 Vue 一样的 `pnpm`，官方文档：https://pnpm.io。

这个工具简单来说就是一个软件包管理器，跟 `npm`、`yarn` 类似，只不过 `pnpm` 会更高效、快速，且节省磁盘空间，同时它还内置了对单个源码仓库中包含多个软件包的支持，也就是 **monorepo** 的功能。

使用 `pnpm` 前需要先用 `npm` 进行全局安装，可输入如下脚本：

~~~bash
npm install -g pnpm
~~~

安装完成后在项目的根目录下创建一个 `pnpm-workspace.yaml` 文件，在这个文件中可对要作为 monorepo 根目录的路径进行配置，通常这个放所有包的根目录会命名为 `packages`，配置的内容如下：

~~~yaml
packages:
  - 'packages/*'
~~~

配置完成后，我们就可以开始创建我们的子包了。以我在 mini-vue3 项目中的创建过程为例，先在 `packages` 目录下创建一个 `reactivity` 目录，在该目录下创建一个 `package.json` 文件，使用下面的模板进行一下初始化，模板中的包名、版本、script 等可以随意修改：

~~~json
{
    // 这个 name 就是后续我们使用 import 导入时输入的包名
    "name": "@mini-vue3/reactivity",
    "version": "1.0.0",
    "description": "@mini-vue3/reactivity",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
~~~

在这之后，我们就可以通过 `pnpm` 提供的命令行工具，为整个项目或某一个子包添加依赖。当为整个项目添加依赖时，被依赖的包会被安装到根目录下的 `node_modules` 下，而为某一个子包添加依赖时，则是将被依赖的包安装至该子包所处目录下的 `node_modules` 中。

下面举几个例子来演示如何操作：

~~~bash
# 为整个项目添加 TS，加后面的 -w 是为了防止报错
pnpm add typescript -w

# 为子包 @mini-vue3/reactivity 添加 TS
pnpm --filter @mini-vue3/reactivity add typescript

# 为子包 @mini-vue3/reactivity 添加另一个 workspace 中的子包
pnpm --filter @mini-vue3/reactivity add @mini-vue3/shared
~~~

在为整个项目添加依赖时，需要在脚本后加上 -w，否则会报如下错误（准确来说应该是提示）：

![image-20230128205605698](https://upyun.cavalheiro.cn/images/image-20230128205605698.png)

> 如果在上一步中没有在子包中添加 package.jso 的话，会报如下错误：
> ![image-20230127211927539](https://upyun.cavalheiro.cn/images/image-20230127211927539.png)
>
> PS：请忽略这个新建文件夹，只是我懒得改了，还是要用英文命名的哦~



## 集成 TS

使用如下脚本安装和初始化 TS：

~~~bash
pnpm add typescript -D -w

# 事先进行了 ts 全局安装的话可以直接用 tsc --init
npx tsc --init
~~~

这样 tsc 工具就会为我们创建并初始化一个 `tsconfig.json` 文件，每个配置项都会附带有对应的注释。

然后我们需要对这个文件进行修改，来让 TS 能够正确识别 `import` 引入本地子包，如：`import { reactive } from '@mini-vue3/reactivity'`，配置的内容其实就是设置一个别名，让引入的本地子包路径重定向为指定的目标目录，具体配置内容如下：

~~~json
{
    "compilerOptions": {
        ......
        "paths": {
            "@mini-vue3/*": ["./packages/*/src"]
        },
        ......
    },
}
~~~

这样我们在通过 `import` 导入本地的子包如：`@mini-vue3/reactivity` 时，就会被重定向到 `./packages/reactivity/src` 目录下，TS 也就不会再报找不到对应包的错误了。



## 集成单元测试

项目使用 `jest` 框架来进行单元测试，官方文档：https://jestjs.io。

使用如下脚本安装所需依赖：

~~~bash
pnpm add jest -D -w
~~~

因为项目集成了 TS，我们需要引入 jest 的类型定义（其实就是一些 `.d.ts` 文件）：

~~~bash
pnpm add @types/jest -D -w
~~~

之后再到 `tsconfig.json` 文件中修改配置，这样 TS 才能识别 jest 的方法并去除报错：

~~~json
{
    "compilerOptions": {
        ......
        "types": [
            "jest"
        ],
        ......
    }
}
~~~

同时因为 jest 的运行环境是 nodejs 环境，也就是使用的 commonjs 规范，在单元测试中要想用 `import`  这样的 ESM 规范的话，需要使用 `babel` 来进行转换，jest 的官网也有给出 [对应教程](https://jestjs.io/docs/getting-started#using-babel)，这里简单提一下。

首先需要安装对应的依赖：

~~~bash
pnpm add babel-jest @babel/core @babel/preset-env -D -w
~~~

然后在根目录下创建一个 `babel.config.js` 文件并输入如下内容即可：

~~~js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ],
        "@babel/preset-typescript"
    ]
}
~~~

由于我们使用了 pnpm 的 monorepo，还需要为 jest 配置路径别名才能够让 jest 运行代码时正确导入模块：

~~~js
import type { Config } from 'jest'

const config: Config = {
    moduleNameMapper: {
        // 
        '@mini-vue3/(.*)': '<rootDir>/packages/$1/src',
    },
}

export default config
~~~

到这 jest 的集成就完成了，接下来就可以根据 TDD 的思想，通过测试来驱动开发，先写测试用例明确功能及边缘场景，再以此来进行功能的开发。



## TDD

TDD 不是一种技术，而是一种思想，这一思想在我上一份工作的时候，我的导师一直给我强调这一点，它对于开发以及后续的维护来说，都很有帮助。

首先是在开发上，基于 TDD 的思想，我们应该在开始动手写代码之前先来写单元测试。我们可以把我们的函数希望被如何使用、需要怎么测试功能是否有达成、有哪些边缘场景都事先想好，然后通过测试描述的形式写下来，比如下面这个例子：

~~~js
describe('effect', () => {
    // 通过单侧描述告诉别人这个函数需要实现什么功能
    it('should return runner when call effect', () => {
        let foo = 10

        // 这里可以很容易的看出来我们的函数希望被如何使用
        const runner = effect(() => {
            foo++
            return 'foo'
        })
        expect(foo).toBe(11)
        expect(runner()).toBe('foo')
    })
})
~~~

接下来是在维护方面，可靠的、可信任的单元测试将为维护代码带来巨大的便利。

具体且详细的测试描述可以很大程度减少其他人阅读和理解的成本，方便别人接手代码。单元测试的描述应该当成 **Debug reporter** 来使用，将来在碰到错误的时候，**应该让即使是不熟悉业务背景的人，也能轻松的读懂错误信息，了解到这是关于什么 feature 的测试、出了什么样的错**。

同时，假设未来有人需要修改这一部分代码，可靠的单侧代码能够在开发阶段通过自动化测试的方式，避免因疏忽改坏了已有功能等导致的 bug。



:::tip

测试代码组织结构建议用 Arrange，Act， Assert，让阅读测试代码的人减小认知负荷，测试本身更好阅读从而更好维护

1st A - Arrange: 所有为了达到测试目的而去模拟环境的代码，比如 mocking，准备测试数据

2nd A - Act: 执行测试的代码，通常只有一行

3rd A - Assert:  保证测试得到期望的结果的代码，通常只需要一行，语义化以便于理解

:::



## git hook

当我们在使用 git 提交代码或者将代码推到远程仓库之前，经常需要进行一些检查，如跑一下 lint 或者单元测试。git hook 就是用来将这些事情自动化，让我们能够设置在触发 git 的某一个操作时自动的执行一些脚本，从而减少手动操作的成本。

我在项目中使用的是 `husky` 这一工具，官方文档：https://typicode.github.io/husky

首先使用 pnpm 安装依赖：

```bash
pnpm add husky -D -w
```

安装完成后，需要在 `package.json` 文件中增加一个 `prepare` 脚本，它是 npm 内置的特殊生命周期钩子，会在完成 `npm install` 等命令之后执行对应的脚本，这样就能确保我们的项目被克隆下来之后，在启动项目之前就能够使 git hook 可用。`prepare` 脚本内容如下：

~~~json
{
    "scripts": {
        "prepare": "husky install"
    },
}
~~~

然后我们运行一下 `npm run prepare`，之后会在项目根目录下生成一个 `.husky` 目录，里面初始化时会有 `_` 目录，目录下有两个文件，一个是`.gitignore`，另一个是 `husky.sh`，这两个是自动生成的，我们可以不用管他们。然后运行下面这个命令就可以为我们生成对应的 git hook：

~~~bash
npx husky add .husky/pre-commit "npm test"
~~~

这个 `pre-commit` 是 git 提供的一个 hook，是在提交之前执行配置的脚本，如果脚本执行失败，则会忽略本次提交。其他 hook 可以查看：[all Git hooks](https://git-scm.com/docs/githooks)。

在这之后，我们每一次 commit 操作时，都会先去执行一下所有单元测试，如果单测没有出错，则顺利提交代码。如果觉得这样太频繁了，也可以改用 `pre-push` 这个 hook，让其只在每次 push 代码的时候执行：

~~~bash
npx husky add .husky/pre-push "npm test"
~~~



## 结语

至此 mini-vue3 项目的前期准备工作就都完成了，后续就可以开始 Vue3 核心代码的编写了。

说实话项目最开始其实就是一个普通的 TS 项目，导入子包也是用的相对路径而不是 monorepo，是在写了一部分 reactivity 的代码后，才对项目进行上述的所有改造。我认为这是一次很好的尝试，学习到了不少内容，算是走出了舒适圈，对新东西进行探索，可以说是收获满满。希望这种勇于尝试、保持学习的精神我能够继续保持下去，也希望能够传递给正在看我文章的你，共同进步。