---
title: 《CSS选择器世界》读书笔记
postTime: 2021-11-12
categories: 
- 前端笔记
- CSS
tags:
- CSS
- 读书笔记
---



::: slot abstract

前几天逛学校图书馆的时候，偶然发现了这本《CSS选择器世界》，这 **“CSS世界三部曲”** 之前也从B站上关注的程序员 up 主那听说过，也算是有些兴趣，没想到让我在这一大片老旧书籍的图书馆里撞见了这本书。不过可惜的是找了好久也没找到《CSS世界》和《CSS新世界》，最后就只借了这一本书，回去花了一个星期左右的时间看完了。

刚开始还没看的时候，在想 CSS 选择器能有什么好讲的啊，能写这么厚一本书？看完之后可谓收获良多，甚至有一些内容刷新了我对 CSS 选择器的认识。因此我决定在这里整理一下对这本书的读书笔记，不过只记录我个人觉得比较关键的一些点，太过基础的或者我个人认为没有太大必要记录的就略过了

> 刚看完这本书的时候正好赶上了双十一特惠，这本书勾起了我对其他同系列书籍的兴趣，直接下单《CSS世界》和《CSS新世界》，花了我九十多块钱，希望它的内容不要让我失望~~

:::



## 前言

最开始的我以为 CSS 的选择器就是一些特定的选择符号，看起来没什么内容，但看完这本书之后，作者丰富的 CSS 研究经验和独到的个人理解，让我对 CSS 选择器有了新的认识，下面引用下书里对 CSS 选择器的描述：

>实际上，CSS 选择器非常强大，它不仅设计视觉表现，而且与用户安全、用户体验有非常密切的联系
>
>对于 CSS 选择器，它作为 CSS 世界的支柱，其作用好比人类的脊柱，与 HTML 结构、浏览器行为、用户行为以及整个 CSS 世界相互依存、相互作用，这必然会产生很多碰撞，让 CSS 选择器变得非常强悍

接下来让我们开始进入正题



## 优先级

书中在概述后紧接着的就是 **CSS 选择器的优先级** 

> 几乎所有的 CSS 样式冲突、样式覆盖等问题都与 CSS 声明的优先级错位有关

这是本节内容开头的第一句话，点明了优先级的重要性



### 优先级等级制度

CSS 优先级有着不可逾越的等级制度，主要分为如下几个等级：

**0级**

通配选择器 `*` ，选择符 `空格 + > ~ ||` ，逻辑组合伪类 `:not() :is() :where() 等`

**1级**

标签选择器 `div span p 等`

**2级**

类选择器 `.foo` ，属性选择器 `[foo]` ，伪类 `:hover :active :focus 等`

**3级**

ID选择器 `#foo`

**4级**

style 属性内联 `<span style="color: #ccc"></span>`

**5级**

这一级别的是 CSS 的一个特殊规则：`!important` ，当在一个样式声明中使用一个 `!important` 规则时，此声明将覆盖任何其他声明

对于 `!important` 只有唯一一个推荐使用的场景，那就是 使 **JavaScript 设置的样式无效** ，其他场景没有使用它的理由，切勿滥用！

> 上述等级中，只有 0 ~ 3 级是属于 CSS 选择器优先级部分的内容



### 优先级计算规则

对于优先级的计算，业界流传甚广的是数值计数法，计算得出的数值越大，对应的优先级越高。通常会假设：

- **0级** 选择器优先级数值+0
- **1级** 选择器优先级数值+1
- **2级** 选择器优先级数值+10
- **3级** 选择器优先级数值+100

对于数值相同的情况，采用 “后来居上” 规则，后渲染的选择器优先级更高

这里有个需要注意的点，假设现在有 10 个类选择器嵌套，和一个 ID 选择器，他们的计算数值都是 100 ，那么他们的优先级就一样吗？事实上，它们的优先级还是不一样，因为不同等级的选择器之间的差距是无法跨越的， **就算是 100 个类选择器嵌套，他的优先级也比不上 ID 选择器**

因此，数值计数法其实是不严谨的，不过平常开发一般不会弄个 10 层嵌套，所以对于一般情况下的优先级判定还是方便的



## 选择器命名

选择器的命名可以说是前端开发者最头疼的一件事情了，甚至可以说，这是一个哲学问题。这里大致记录一下书中作者多年经验总结出来的 **最佳实践**



### 命名书写

1. 命名使用小写英文单词或缩写，对于专有名词才使用拼英
2. 组合命名（多个单词）使用 `- 或 -- 或 _ 或 __` ，只要在项目中风格保持一致即可随意组合
3. 设置统一前缀，可有效避免样式冲突



### 选择器类型

根据选择器的使用类型，可将网站 CSS 分为 3 个部分：CSS 重置样式，CSS 基础样式，CSS 交互变化样式

- 重置样式可以使用标签选择器或者属性选择器

- 基础样式全部使用类选择器，没有层级，没有标签

  > 不要偷懒，在所有用到的 HTML 标签上都写上不会冲突的类名
  >
  > 所有标签都需要重新命名的情况，可以通过面向属性命名的 CSS 样式库解决

- 只有在交互样式发生变化的时候，才使用选择器嵌套、选择器级联、伪类

- 无论什么情况都没有使用 ID 选择器的必要，因为优先级太高了，且容易造成和 JavaScript 的耦合

- 平常不要使用嵌套选择器，有如下缺点：

  - 渲染性能糟糕（ **相对而言并不严重，优先关注另外两个** ）

  > 标签选择器的性能较差，CSS 选择器的匹配是从右往左进行的，所以在使用嵌套时，右边是标签选择器会优先匹配大量标签，使用多层嵌套会增加计算量，都会使性能下降

  - 优先级混乱
  - 样式布局脆弱

- 正确使用状态类名：状态类名本身不包含任何样式，只是一个标识符
- 正视面向属性的命名：用于特殊场景的微调、可以给 UI 组件或模块快速打补丁



### CSS选择器分布

选择器设计策略的参考表格：

| 选择器       | 规模项目 | 规模项目（含外部引入） | 微小项目 |
| ------------ | -------- | ---------------------- | -------- |
| 重置样式     | **√**    | **√**                  | **？**   |
| 无层级       | **√**    | **√**                  | **？**   |
| 统一前缀     | **？**   | **√**                  | **√**    |
| 面向属性命名 | **√**    | **√**                  | **×**    |

表格中， **√** 表示需要使用与遵循，**？** 表示可用可不用， **×** 表示不建议使用



## 选择符

目前 CSS 的选择符只有五个：

1. 后代选择符（ 空格 ）
2. 子选择符（ > ）
3. 相邻兄弟选择符（ + ）
4. 随后兄弟选择符（ ~ ）
5. 列选择符（ || ）

最后一个列选择符由于兼容性问题暂不讨论，而其他四个都是很早就出现了，兼容性好



### 后代选择符

后代选择符可以说是最常见的选择符， **它选择的是整个网页上所有满足选择器中的后代关系的元素** ，即使是在 JavaScript 的 `querySelector()` 中也是如此，例如：

有以下 HTML 结构：

~~~html
<div id="myId">
    <div class="lonely">1</div>
    <div class="outer">
        2
        <div class="inner">
            3
        </div>
    </div>
</div>
~~~

通过下面的 js 代码来选择：

~~~js
document.querySelector('#myId').querySelector('div div')
~~~

由于其全局的特性，这边选择出来的结果是：在整个页面上满足 `div div` 这种后代关系的元素，然后再从中挑出属于 `#myId` 后代的元素



### 子选择符

**子选择符只会匹配第一代后代元素** ，即子元素。虽然子选择符的性能优于后代选择符，但会带来日后的维护成本，这是因为一旦使用了子选择符，那么元素的层级关系就固定了，日后要调整层级关系则需要连同 CSS 代码一起更改，所以一般能不用就不用

但其也有适用的场景，如状态类名控制时，使用 `.active` 类名进行状态切换，会遇到祖先和后代都存在 `.active` 切换的场景，这时要使用子选择符来避免影响后代元素

书中的原话是这么说的：

> 子选择符就是把双刃剑，它通过限制关系使得结构更加稳固，但同时也失去了弹性和变化



### 相邻兄弟选择符

**相邻兄弟选择符会匹配后面紧跟着的第一个兄弟元素** ，同时还会忽略中间出现的文本节点和注释节点。这里举个例子：

~~~css
.cs-li + li {
    color: red;
}
~~~

在这个例子中，该选择器会选择和 `.cs-li` 同层级且标签为 `li` 的元素



#### 实现类似 :first-child 的效果

相邻兄弟选择符还可以用于实现类似 `:first-child` 的效果：

~~~css
.cs-li {
    color: blue;
}

.cs-li + .cs-li {
    color: red;
}
~~~

因其特性只能匹配每一个 `.cs-li` 的后一个元素，所以最后只有第一个元素不会被匹配到，因此会覆盖第一个往后的所有元素的样式，实现 `:first-child` 的效果

这样的实现在某些场景下有着比 `:first-child` 还要广的适用性，例如，当容器的第一个元素不是 `.cs-li` 时， `:first-child` 就无法匹配到目标，而相邻兄弟选择符依然有效



#### 众多高级选择器技术的核心

> 相邻兄弟选择符最硬核的应用还是配合诸多伪类低成本实现很多实用的交互效果，是众多高级选择器技术的核心

这些交互效果包括：聚焦时显示文字提示、搭配 `:checked` 伪类和 `lable` 标签使用等，具体如何实现将会在后续对输入伪类的介绍中详细描述



### 随后兄弟选择符

随后兄弟选择符和相邻兄弟选择符的关系很近，他们的区别在于：相邻兄弟选择符匹配的是紧接着的后一个兄弟元素，而 **随后兄弟选择符会匹配后续的所有兄弟元素**



#### 实现前面兄弟选择符的效果

我们知道，CSS 中是没有 **前面兄弟选择符** 和 **父选择符** 的，这是因为浏览器的渲染规则的限制。浏览器在解析 HTML 文档时，是从前往后、由外及里的，因此，若是要支持前面兄弟选择符和父选择符的话，就必须等到所有子元素加载完毕了才可以渲染 HTML 文档。这是因为，这两种选择符本质上是让后面的 DOM 元素影响前面的 DOM 元素，如果后面的元素没有加载并处理，是不能影响前面的元素样式。若真支持这种选择符，则会导致网页呈现速度减慢，浏览器长时间的白板，会导致很差的用户体验

但也不是没办法办到，我们可以通过随后兄弟选择符来实现

随后兄弟选择符匹配的是代码层面上的 “后面” ，因此，我们可以让代码层面在 “后面” 的元素视觉层面上显示在 “前面” ，但要如何做到定义的元素在后面却显示在前面呢？这里列举几种方法，不做详细介绍，感兴趣的可以自行搜索

1. float 浮动实现
2. absolute 绝对定位实现
3. margin 负值实现
4. flex 布局实现
5. direction 改变文档流顺序



## 属性选择器

书中这里的内容是元素选择器，但其较为简单，没什么内容好说的，就跳过了

属性选择器指的就是 `[type="radio"]` 的这类选择器，其实我们常用的类选择器和 ID选择器也算是属性选择器的一种，只是因为这两个属性使用广泛，几乎所有元素都支持这两个属性，就给提出来给了他们特殊待遇

前面提到的 `[type="radio"]` 其实只不过是属性选择器中的一种匹配选择器，总共有七类选择器，且兼容性都不错，这里稍微介绍一下但不做深究



### [attr]

`[attr]` 表示只要有这个属性就可以匹配，适用于一些 HTML 布尔值属性，如 `disabled` 等，但对于 `checked` 属性不建议使用，因为在表单元素 `checked` 状态发生变化的时候，并不会同步修改 `checked` 属性的值，这会导致严重的样式显示错误



### [attr="val"]

`[attr="val"]` 被称为属性值完全匹配选择器，顾名思义，需要元素的 `attr` 属性值和 `"val"` 完全相等才可以匹配。里面的引号可以是 `""` 也可以是 `''` ，甚至可以不用引号



### [attr~="val"]

 `[attr~="val"]` 是属性值单词完全匹配选择器，匹配的是属性值中用空格隔开的单词，例如：

~~~html
<div class="test box"></div>
~~~

使用如下选择器可以匹配该元素：

~~~css
[class~="test"] {
    color: red;
}
/* 或者： */
[class~="box"] {
    color:red;
}
~~~



#### 最佳实践

使用自定义属性的多种组合属性值管理样式，如：

~~~html
<div data-align="top"></div>
<div data-align="top right"></div>
<div data-align="bottom"></div>
<div data-align="bottom left"></div>
<div data-align="center"></div>
~~~

可以使用下面这种方式进行样式管理：

~~~css
[data-align] { left: 50%; top: 50%; }
[data-align~="top"] { top: 0; }
[data-align~="right"] { right: 0; }
[data-align~="bottom"] { bottom: 0; }
[data-align~="left"] { left: 0; }
~~~

这样的代码足够精简且互不干扰，有专属的命名空间，代码可读性强，且选择器的优先级和类选择器一致，很好管理



### [attr|="val"]

`[attr|="val"]` 是属性起始片段完全匹配选择器，其匹配的元素需要具有 `attr` 属性，同时属性值要么正好为 `"val"` ，要么是以 `"val"` 加短横 `- (U+002D)` 开头的，下面是匹配的示例：

~~~html
<!-- 匹配 -->
<div attr="val"></div>
<!-- 匹配 -->
<div attr="val-foo"></div>
<!-- 匹配 -->
<div attr="val-foo bar"></div>
<!-- 不匹配 -->
<div attr="value"></div>
<!-- 不匹配 -->
<div attr="val bar"></div>
<!-- 不匹配 -->
<div attr="bar val-foo"></div>
~~~



#### AMCSS 开发模式

AMCSS 全称为 Attribute Modules for CSS ，表示借助 HTML 属性来进行 CSS 相关开发。目前主流的开发模式是多个模块由多个类名控制，例如：

~~~html
<button class="cs-button cs-button-large cs-button-blue"></button>
~~~

而 AMCSS 是基于属性控制的：

~~~html
<!-- 为了防止属性名称冲突，建议加一个前缀 -->
<button am-button="large blue"></button>
~~~

然后借助 `[attr|="val"]` 进行匹配：

~~~css
[am-button] {}
[am-button="large"] {}
[am-button="blue"] {}
~~~

这种模式的优点是：每个属性有效的声明了一个单独的命名空间，用于封装样式信息，从而产生更易于阅读和维护的 HTML 和 CSS



### [attr^="val"]

接下来的这三个都属于属性值正则匹配选择器，完全就是 **字符匹配** 而非单词匹配了，同时，在使用时添加一个 `i` 即可实现忽略属性值的大小写，如： `[attr^="val" i]` 

第一个 `[attr^="val"]` 是前匹配，只会匹配 `attr` 属性值以 `"val"` 开头的元素

~~~html
<!-- 匹配 -->
<div attr="val"></div>
<!-- 不匹配 -->
<div attr="foo val"></div>
<!-- 匹配 -->
<div attr="value"></div>
<!-- 匹配 -->
<div attr="val-ue"></div>
~~~

### [attr$="val"]

接下来的 `[attr$="val"]` 是后匹配，只会匹配 `attr` 属性值以 `"val"` 结尾的元素

~~~html
<!-- 匹配 -->
<div attr="val"></div>
<!-- 匹配 -->
<div attr="foo val"></div>
<!-- 不匹配 -->
<div attr="value"></div>
<!-- 不匹配 -->
<div attr="val-ue"></div>
~~~



### [attr*="val"]

最后的 `[attr$="val"]` 是任意匹配，只要 `attr` 属性值包含 `"val"` 的元素都可以匹配

~~~html
<!-- 匹配 -->
<div attr="val"></div>
<!-- 匹配 -->
<div attr="foo val"></div>
<!-- 匹配 -->
<div attr="value"></div>
<!-- 匹配 -->
<div attr="val-ue"></div>
~~~



### 使用属性选择器实现搜索过滤

对于通讯录、城市列表等的搜索过滤功能，我们可以借助属性选择器来控制对应元素的显隐，从而达到过滤的目的，这样做性能高，代码少

例如，有如下 HTML 结构：

~~~html
<input type="search" placeholder="输入城市名称或拼音"/>
<ul>
    <li data-search="重庆 chongqing"></li>
    <li data-search="哈尔滨 haerbin"></li>
    <li data-search="长春 changchun"></li>
    <!-- ...... -->
</ul>
~~~

只要我们在输入时，根据输入的值动态创建一段 CSS 代码，通过这段代码来控制 `data-search` 符合过滤要求的元素显示，而不符合的隐藏，具体实现如下：

~~~js
const eleStyle = document.createElement('style')
document.head.appendChild(eleStyle)
// 监听文本框输入
input.addEventListener('input', () => {
    const value = input.value.trim()
    eleStyle.innerHTML = value
    						? `[data-search]:not([data-search*=${value}]) {
    								display: none;
    							}`
    						: ''
})
~~~



## 伪类

### 用户行为伪类

#### 手型经过伪类 :hover

`:hover` 是浏览器最早支持的伪类之一，有着良好的兼容性，可以在所有 HTML 元素上使用，包括自定义元素

使用 `:hover` 伪类需要注意以下几个点：

-  `:hover` 不适用于移动端
- 可使用  `transition` 的延时来优化 `:hover` 的交互体验
- 对于带交互的行为，不能只用 `:hover` 还需要其他处理，因为 `:hover` 在用户用不了或没有鼠标的情况下直接失效了，而键盘的选中无法触发 `:hover` ，可以增加 `:focus` 伪类进行优化



#### 激活状态伪类 :active

当用户点击鼠标左键，或是用户手指点击触摸屏时，只在那很短的一段时间内，会触发激活状态展示 `:active` 伪类设置的样式，因此不适合做复杂交互

和 `:hover` 一样， `:active` 也无法被键盘行为触发，其主要的作用反馈点击交互，让用户知道自己的点击行为已经成功触发。该伪类常作用于链接、按钮这类元素，特别是移动端，因为移动端不适用通过 `:hover` 来让用户感知状态变化，需要用 `:active` 进行代替

`:active` 有一个小技巧，可以实现 CSS 数据上报，统计按钮的点击率，且不需要使用 JavaScript ：

~~~css
#button-1:active::after {
    content: url(./pixel.gif?action=click&id=button1);
    display: none;
}
#button-2:active::after {
    content: url(./pixel.gif?action=click&id=button2);
    display: none;
}
~~~

当用户点击对应的按钮时，就会将相关数据上传至服务器，就算把 JavaScript 禁用也无法阻止，方便快捷，适合 A/B 测试



#### 焦点伪类 :focus

`:focus` 从 IE8 开始被支持，用于匹配处于聚焦状态下的元素，只支持如下几种特定的元素：

- 非 `disabled` 的表单元素
- 包含 `href` 的超链接元素
- `<area>` 元素，但能生效的 CSS 较为有限
- `<summary>` 元素

 `:focus` 和 `outline` 的关系有一些暧昧，通常来说，不建议为了不让按钮点击时出现外边框而将 `button` 或 `a` 标签的 `outline` 属性设置为 `none` ，因为这样一来点击键盘 `Tab` 键切换聚焦时，用户就无法得知现在的焦点在何处，反而带来了糟糕的用户体验

对于上述这种问题，有一个很好的解决方案：`:focus-visible` 伪类，这里不做过多介绍



#### 整体焦点伪类 :focus-within

`:focus-within` 和 `:focus` 的区别在于： `:focus` 只有在当前元素处于聚焦状态时才可匹配，而 `:focus-within` 只要当前元素或是它的任意子元素处于聚焦状态即可匹配，相当于其拥有着通过子元素状态改变父元素的能力，本质上是一种父选择器行为

`:focus-within` 对无障碍访问也有着很好的支持，对于一些下拉框中有其他按钮或链接时，也能正常聚焦



### URL 定位伪类

#### 链接历史伪类 :link 和 :visited

`:link` 匹配的是 href 链接没有被访问过的 `<a>` 标签，而 `:visited` 则相反，这点从它的命名就可以看出来

通常我们都会给链接元素添加 `:hover` 伪类，在鼠标经过时提示用户这是一个链接，若是同时也设置了其他伪类如 `:link` ，则需要按照特定顺序排列，否则会造成意想不到的样式覆盖。这里提一下著名的 “love-hate 顺序” ，即 `:link` → `:visited` → `:hover` → `:active` 的顺序

但因为 `:link` 和 `a` 标签选择器的效果一致，且使用 `a` 标签选择器还无需编写额外代码处理上述情况，因此在如今开发实际项目时很少使用 `:link` 

另一个 `:visited` 虽然使用广泛，但也有不少缺点，，比如：

- 只支持部分与颜色相关的 CSS 属性
- 不支持半透明
- 只能重置 `:link` 和 `a` 标签选择器设置过的样式，不能凭空添加
- 使用 JavaScript 无法获取 `:visited` 改变后的颜色值



#### 超链接伪类 :any-link

这一后起之秀与 `:link` 有许多相似之处，同时可以说它弥补了 `:link` 的所有缺点

`:any-link` 支持匹配所有支持 `href` 属性的元素，同时已被访问过的元素也会被匹配并显示出 `:any-link` 设置的样式



#### 目标伪类 :target

该伪类被所有 IE9 以上的浏览器支持，他的匹配规则是这样的：当 `:target` 前面的元素 ID 值和 URL 地址中的锚点定位 ID 一致时匹配该元素

举个例子：

设现在的 URL 为：`http://www.example.com/#cs-anchor` ，而页面的 HTML 结构为：

~~~html
<div>
    <span id="cs-first">1</span>
    <span id="cs-anchor">2</span>
    <span id="cs-last">3</span>
</div>
~~~

下面代码的匹配结果为第二个 `span` 元素：

~~~css
span:target {
    color: red;
}
/* 若URL为：http://www.example.com/#cs-first，则匹配第一个span元素 */
~~~

通过 `:target` 的这一特性，我们可以实现很多原本需要 JavaScript 才能做到的效果，如：

- 展开与收起效果
- 选项卡效果



### 输入伪类

#### 可用状态 :enabled 与禁用状态 :disabled

`:enabled` 匹配可用状态的元素，它在 CSS 开发中作用不大，常用于 JavaScript 开发中通过 `querySelector(form :enabled)` 查询表单中可用的表单元素，以实现自定义的表单序列化方法

`:disabled` 匹配禁用状态的元素，最常用在按钮上，同时浏览器的内置行为会让禁用状态下的按钮的点击事件失效



#### 读写特性 :read-only 和 :read-write

我们通过一个简单的例子来快速了解这两个伪类：

~~~html
<textarea>默认</textarea>
<textarea readonly>只读</textarea>
<textarea disabled>禁用</textarea>
~~~

CSS 代码：

~~~css
textarea:read-write {
    border: 1px solid black;
    background: gray;
}

textarea:read-only {
    border: 1px solid gray;
    background: lightgray;
}
~~~

执行的结果为：默认的输入框和禁用的输入框呈现同样的样式，即 `:read-write` 伪类的样式，而设置了只读属性的输入框展示 `:read-only` 伪类的样式



#### 占位符显示伪类 :placeholder-shown

`:placeholder-shown` 匹配占位符 placeholder 属性内容显示时的输入框，默认情况下输入框的值为空，这时占位符是显示的，因此这一伪类可以用于实现空值判断

此外，还可以使用该伪类实现 Metarial Design 风格的占位符交互效果（触发聚焦时占位符的动画）：

![image-20211114184421369](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20211114184421369.png)

实现代码大致如下：

HTML 模板：

~~~html
<div class="input-control-x">
    <input calss="input-control" placeholder="毕业院校"/>
    <lable class="input-lable">毕业院校</lable>
</div>
~~~

CSS 代码：

~~~css
/* 默认占位符不显示 */
.input-control:placeholder-shown::placeholder {
    color: transparent;
}

.input-control-x {
    position: relative;
}

.input-lable {
    position: absolute;
    top: 14px;
    left: 16px;
    pointer-events: none;
}

/* 在输入框聚焦和占位符不显示时将lable元素缩小并移动到上方 */
.input-control:not(:placeholder-shown) + .input-lable,
.input-control:focus + .input-lable {
    tranform: scale(0.75) translate(0, -32px);
}
~~~



#### 选中选项伪类 :checked

基于 `:checked` 伪类的交互技术可以说是整个 CSS 伪类交互技术中最实用、满意度最高的，它只会匹配标准表单控件元素中，支持并设置了 `checked` 属性的元素

 `:checked` 和前面的 `:disabled` 伪类一样，都可以通过属性选择器来实现相似的效果，但因为属性选择器能够支持所有元素，属性的变化不是实时更新的，且伪类可以正确匹配从祖先元素继承过来的状态而属性不行，所以还是要使用对应的伪类

作者以他多年的经验告诉我们，单复选框搭配 `:checked` 伪类的最佳实践：

- 自定义单复选框
- 开关效果
- 标签/列表/素材的选择



#### 不确定值伪类 :indeterminate

该伪类用于复选框的半选状态，即同一组复选框有的选了有的没选时的状态。该状态只能由 JavaScript 设置，常用于展示复选框是否全部被选择，设置方式为：

~~~js
checkbox.indeterminate = true
~~~



### 输入值验证伪类

#### 有效性验证伪类 :valid 和 :invalied

`:valid` 和 `:invalied` 常用于验证表单元素的输入或选择是否合法、有效，例如一个验证码的输入框：

~~~html
<input required pattern="\w(4, 6)"/>
~~~

当输入的验证码为空或者不符合 4 ~ 6 个字符的要求时，会匹配 `:invalied` 伪类，而完全符合所有要求时，则会匹配 `:valid` 伪类

乍一看好像很适合用于替代 JavaScript 实现的验证用户输入的功能，但实际上，由于初始状态是没有任何输入的，就会被判定成非法输入，这样会造成用户的困扰。虽然不能直接替代掉 JavaScript 的实现，但可以通过结合 JavaScript 来对这两个伪类进行优化：

~~~js
form.addEventListener('submit', (event) => {
    // 通过添加相应的类名来激活验证
    this.classList.add('valid')
    
    // 通过form元素原生的checkValidity判断验证是否通过
    if(this.checkValidity && this.checkValidity()) {
        // 验证通过，发送请求
    }
    
    event.preventDefault()
})
~~~



#### 范围验证伪类 :in-range 和 :out-of-range

这两个伪类与 min 和 max 两个属性密切相关，用于匹配 `number` 类型的，数字在设定的范围内的输入框，但在实际开发中使用的不多，了解即可



#### 可选性伪类 :required 和 :optional

`:required` 用于匹配设置了 required 属性的表单元素，对应的 `:optional` 用于匹配所有非 required 的表单元素，常用于标记表单中必选与可选的元素，如为必选项前面添加一个红色 * 表示此项必须填写或选择

这里放一个应用的例子：

~~~html
<form action="">
    <div class="form-item">
        <input type="text" required>
        <h4 class="form-item-text">必填项：</h4>
    </div>
</form>
~~~

CSS 部分代码：

~~~css
.form-item {
    display: table;
    position: relative;
}

/* 使在后面的标题显示在上方 */
.form-item-text {
    display: table-caption;
    caption-side: top;
}

:required ~ .form-item-text::before {
    content: "*";
    color: red;
    position: absolute;
    left: -10px;
}
~~~



### 树结构伪类

#### :root 伪类

这个伪类表示的就是 `html` 元素，且在 ShadowDOM 中不能匹配

常见的应用场景：

- 滚动条出现时页面不跳动

  ~~~css
  /* IE9+ */
  :root {
      overflow: hidden;
  }
  
  :root body {
      position: absolute;
      width: 100vw;
      overflow: hidden;
  }
  ~~~

- CSS 变量

  `html` 负责样式，`:root` 负责变量，这是约定俗成的，而且写在 `:root` 中也可以让代码可读性更好

  ~~~css
  :root {
      --blue: #2486ff;
      --layer-width: 1190px;
  }
  ~~~



#### :empty 伪类

该伪类匹配如下几种元素：

- 空标签元素，如：`<div class="empty"></div>`
- 前后闭合的替换元素，如 `<textarea>`
- 非闭合元素，如 `<input>` 、 `<img>` 和 `<hr>` 等元素

但是它不能匹配标签带空格、注释或换行的，同时也不会受到 `::after` 和 `::before` 伪元素的影响

`:empty` 伪类的主要应用场景：

- 隐藏空元素，避免空元素上的 `padding` 或 `margin` 影响布局

  ~~~css
  .test-box:empty {
      display: none;
  }
  ~~~

- 字段缺失提示，如下：

  ~~~css
  .test-box:empty::before {
      content: '暂无';
      color: gray;
  }
  ~~~

  

### 子索引伪类

子索引伪类和后面的匹配类型的子索引伪类都同属于树结构伪类这一部分的内容，但因为它们包含的种类较多，这里我就给它单独提出来了



#### :first-child 和 :last-child

当前元素若是其父元素的第一个子元素，则匹配 `:first-child` 伪类，同理，`:last-child` 匹配最后一个子元素。可以用于做列表每个项上下都有间距之类的需求



#### :only-child

匹配没有任何兄弟元素的元素，在处理动态数据的时候非常好用。根据场景的不同，一个模块里面可能是一个子元素，也可能是多个子元素，这时就可以使用 `:only-child` 伪类来控制布局的切换

这里举个例子，有一个 `loading` 组件，这个组件的内部可以是一个加载图片，也可以是一个加载的提示文字，还可以是两个同时出现，就可以通过如下代码来实现让所有情况都居中：

~~~css
.cs-loading {
    height: 150px;
    position: relative;
    text-align: center;
}

.cs-loading-img {
    width: 32px;
    height: 32px;
    margin-top: 45px;
    vertical-align: bottom;
}

.cs-loading-p {
    /* 图文同时存在时在中间留点间隙 */
    margin: .5em 0 0;
    color: gray;
}

/* 只有图片时绝对定位居中 */
.cs-loading-img:only-child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

/* 只有文字时行高近似垂直居中 */
.cs-loading-p:only-child {
    line-height: 150px;
    margin: 0;
}
~~~



#### :nth-child() 和 :nth-last-child()

`:nth-child()` 匹配从头数第 n 个元素，`:nth-last-child()` 匹配从末尾数第 n 个元素。注意这里的这两个伪类有一个 `()` ，它看起来就和 JavaScript 的函数一样，接受一个参数，这个参数可以是关键字或者函数符号两种类型

1. 关键字

   关键字有两种，一个是 `odd` 匹配第奇数个元素，另一个是 `even` 匹配第偶数个元素

2. 函数符号

   函数符号的形式为： `An+B` ，其中 `A` 和 `B` 都是一个写死的数字，而 `n` 是一个从 0 开始的自然序列（0，1，2，3，......，n）。若计算结果小于 1 ，则会被忽略。举个例子：`nth-child(-n+3)`：只匹配前三个元素，因为 -0+3=3，-1+3=2，-2+3=1，其余小于 1 的都被忽略不计了



### 匹配类型的子索引伪类

#### :first-of-type() 和 :last-of-type()

`:first-of-type` 表示当前标签类型的第一个元素，如：`dl > dt:first-of-type` 表示 `dl` 下的第一个 `dt` 类型的元素

而 `:last-of-type` 与之相反，表示最后一个该类型的元素



#### :only-of-type

当该元素的标签类型唯一时，即兄弟节点中只有它是这个类型的，那么就匹配这个元素

匹配 `:only-child` 的元素一定匹配 `:only-of-type` ，但匹配 `:only-of-type` 的元素不一定匹配 `:only-child` 



#### :nth-of-type 和 :nth-last-of-type

这两个伪类的用法跟 `:nth-child()` 和 `:nth-last-child()` 一样，区别在于这两个伪类匹配的是第几个该类型的元素，如：`p:nth-of-type(3n)` 匹配第 3 的倍数个 `p` 标签

该伪类的适用于特定标签组合，且这些组合会不断重复的场景，这样的组合元素并不多见，也就：

- dt + dl 组合

  ~~~html
  <dl>
      <dt>标题1</dt>
      <dd>内容1</dd>
      <dt>标题2</dt>
      <dd>内容2</dd>
  </dl>
  ~~~

- details > summary 组合

  ~~~html
  <details>
  	<summary>订单中心</summary>
      <a href>我的订单</a>
      <a href>我的活动</a>
      <a href>评价晒单</a>
  </details>
  ~~~

  

### 逻辑组合伪类

这种类型的伪类有四个，分别是：`:not()` 、 `:is()` 、 `:where()` 、 `:has()`。这四个伪类的优先级都是 0 ，但只有 `:not()` 从 IE9 就开始支持，而其他的都处于不稳定的实验阶段，因此这里只记录 `:not()` 伪类



#### :not()

`:not()` 是否定伪类，若当前元素与括号里的选择器不匹配，则该伪类会进行匹配，例如：`:not(p)` 会匹配所有不是 `p` 标签的元素。该伪类还可以不断级联，例如：`input:not(:disabled):not(:read-only)` 会匹配所有既不是禁用状态也不是只读状态的 `input` 标签元素。但 `:not()` 不支持多个表达式，也不支持出现选择符

该伪类的最大作用在于优化重置 CSS 样式的策略，比如我们要在一个元素处于 `active` 状态下时显示，不处于该状态则隐藏，通常我们会这么写：

~~~css
.cs-panel {
    display: none;
}

.cs-panel.active {
    display: block;
}
~~~

但有了 `:not()` 伪类后，能够让 **代码更加简洁，更好理解，同时还保护了原类名的优先级，扩展性更强，更利于维护** ，这是最重要的：

~~~css
.cs-panel:not(.active) {
    display: none;
}
~~~

又比如，对于禁用按钮不能有 `:hover` 的样式，传统实现是：

~~~css
.cs-button {
    background-color: #fff;
}

.cs-button:hover {
    background-color: #eee;
}

.cs-button:disabled,
.cs-button:disabled:hover {
    background-color: #ddd;
}
~~~

而使用 `:not()` 伪类后：

~~~css
.cs-button {
    background-color: #fff;
}

.cs-button:not(:disabled):hover {
    background-color: #eee;
}

.cs-button:disabled {
    background-color: #ddd;
}
~~~

代码更清晰、更简洁



## 写在最后

以上就是我在读完了《CSS选择器世界》后所总结的所有内容了，不得不说这本书还是有不少为了让读者更好理解的 “废话” ，我在整理笔记的时候，都会直接把这些 “废话” 直接忽略了，但即使这样也还是有很多干货，让我受益匪浅

其实写这篇笔记还有一个很重要的原因，这本书是我从图书馆借来的，看完就该还回去了，以后如果不自己买一本的话就没办法再复习了。因此我选择直接将书中自己觉得有用的内容都 “抄” 下来，以后想要复习了看这篇笔记就够了，这就是我的省钱之道，233

在写这篇笔记的过程中，我买的 **“CSS世界三部曲”** 系列中的另外两本也到手了，在写笔记的间隙中也稍微读了些《CSS世界》的内容。怎么说呢，感觉它的 “废话” 更多了，而且经常会出现一些奇奇怪怪的比喻和例子，但这些也同时让这本书变得有趣、独特，只能说不愧是鑫神，很有自己的风格
