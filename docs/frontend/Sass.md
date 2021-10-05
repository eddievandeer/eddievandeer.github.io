---
title: CSS预处理器Sass的简单使用
postTime: 2020-08-09
categories: 
- 前端笔记
- CSS
tags: 
- Sass
- Scss
---

## 1、Sass的安装（Windows）

### 1.1 安装Ruby

由于Sass是基于Ruby语言开发的，所以在安装Sass前需要先安装Ruby。



### 1.2 安装Sass

Ruby自带一个叫做`RubyGems`的系统，用来安装基于`Ruby`的软件，因此可以使用这个系统进行Sass和Compass的安装。

~~~groovy
gem install sass
gem install compass
~~~

安装完成后，使用 `sass -v` 和 `compass -v` 查看版本。

![image-20200723111308311](E:\文档\笔记\SASS笔记.assets\image-20200723111308311.png)



## 2、编译Sass

### 2.1 命令行编译

~~~groovy
//单文件转换
sass xxx/要编译的sass文件.scss:xxx/目标CSS文件.css

//单文件监听
sass --watch 要编译的sass文件.scss:目标CSS文件.csa

//监听整个目录
sass --watch xxx/sass:xxx/css
~~~



### 2.2 编译格式

假设未编译的sass代码如下：

~~~scss
.box {
  width: 300px;
  height: 400px;
  &-title {
    height: 30px;
    line-height: 30px;
  }
}
~~~

-  **nested：** 嵌套格式（默认）

  - 保留sass中的嵌套格式，以缩进的形式展示嵌套。

  - > sass --watch xxx/sass:xxx/css --style nested

  - 格式预览：

~~~css
.box {
    width: 300px;
    height: 400px; }
.box-title {
    height: 30px;
    line-height: 30px; }
~~~



-  **compact：** 紧凑格式

  - 每一块样式都独立的放置在一行。

  - > sass --watch xxx/sass:xxx/css --style compact

  - 格式预览：

~~~css
.box { width: 300px; height: 400px; }
.box-title { height: 30px; line-height: 30px; }
~~~



- **expanded：**扩展格式

  - 和平常写的css文件格式一致。

  - > sass --watch xxx/sass:xxx/css --style expanded

  - 格式预览：

~~~css
.box {
    width: 300px;
    height: 400px;
}
.box-title {
    height: 30px;
    line-height: 30px;
}
~~~

​    

-  **compressed：** 压缩格式

  - 所有内容写在一行，占用的空间较小。

  - > sass --watch xxx/sass:xxx/css --style compressed

  - 格式预览：

~~~css
.box{width:300px;height:400px}.box-title{height:30px;line-height:30px}
~~~

​    

## 3、Sass语法

### 3.1 变量

Sass的变量定义相较于CSS3会更加便利，不需要再使用变量的时候加var()。Sass使用$符号作为变量的标识，给变量命名的时候使用 `-` 和 `_` 分割多个单词，同时两种方式互相兼容，可以使用 `$xxx-xxx` 去引用 `xxx_xxx` ，反之亦然。定义方式：

~~~scss
//单个值
$primary-color: #1269b5;
//多个值，在变量中可以使用其他变量
$primary-border: 1px solid $primary-color;

div{
    background-color: $primary-color;
    border: $primary-border;
}
~~~



### 3.2 嵌套

Sass可以直接将子选择器嵌套在父选择器中，使结构更加清晰。

Sass代码：

~~~scss
div{
    //div's style
    ul{
        //ul's style
        li{
            //li's style
        }
    }
}
~~~

编译后的css代码：

~~~css
div{
    /*div's style*/
}
div ul{
	/*ul's style*/
}
div ul li{
    /*li's style*/
}
~~~

在嵌套中可以使用&符号作为父选择器的标识符，在为父选择器添加伪类时很有用。

~~~scss
//该写法Sass无法正常工作，会编译成：div :hover{}
div{
    :hover{
        xxx:xxx;
    }
}

//使用父类选择器标识符后，编译结果为：div:hover{}，中间没有空格隔开
div{
    &:hover{
        xxx:xxx;
    }
}
~~~

嵌套也可以用在属性上：

~~~scss
body{
    font: {
        family: xxxxxx;
        size: 16px;
        weight: normal;
    }
}
~~~



### 3.3 Mixin混合

可以理解为有名字的定义好的样式，可以使用参数，相当于函数，使用@mixin定义，@include调用。mixin在定义时可以包含其他的mixin，也可以进行嵌套。定义方式：

~~~scss
//定义mixin：@mixin 名字(参数1,参数2...){...}
@mixin test($text-color){
	color: $text-color;
    //可使用嵌套
    a{
        //darken函数加深指定颜色
        color: darken($text-color, 10%);
    }
}

//调用mixin：@include mixin的名字;
div{
    @include test(#FFFFFF);
}
~~~



### 3.4 继承

让一个选择器继承另一个选择器和其相关选择器的样式内容，使用方式：

~~~scss
.parent{
    color: #FFFFFF;
    a{
        font-size: 18px;
    }
}

.son{
    @extend .parent;
    background-color: #333333;
}
~~~

编译结果：

~~~css
.parent, .son{
    color: #FFFFFF;
}

/*同时son选择器下的子选择器继承parent选择器下的子选择器样式*/
.parent a, .son a{
	font-size: 18px;
}

.son{
    background-color: #333333;
}
~~~



### 3.5 导入

CSS原生的导入方式@import会产生额外的HTTP请求，Sass对原生导入方式进行了优化。

Sass的@import会尝试找到对应的Sass文件并导入，被导入的文件称为Partial（局部文件），若导入的是css文件，则会使用CSS原生的@import。通常不希望局部文件被编译，可以让文件名以 `_` 开头。

由于Sass语法兼容css，因此需要导入css文件时，可以将其文件名后缀改为：`.scss` 便可直接导入。

~~~scss
@import "base";//导入_base.scss局部文件，可以不写_和后缀.scss
~~~



### 3.6 数据类型

**3.6.1 数字**

- 运算：

  Sass中的数字能够进行加减乘除的运算，可以带单位。

  进行除法时，若直接运算得到的结果会是 `10/2` 格式的，因为在CSS中一些属性的值有这样的用法，Sass会保留，如：`font：16px/1.8 serif` ，16px为字号，1.8表示行间距。要使用数值需要使用括号包围。

  带单位进行乘除法运算时，单位会参与运算，需要注意乘法 `5px * 2px` 得到的结果为: `10px*px` ，不是可用单位。而除法 `10px / 2px` 得到的结果为: `5` ，单位被约掉了。

- 数字函数：

  - 绝对值函数：

    > abs(-10) -> 10

  - 四舍五入函数：

    > round(3.6) - > 4

  - 进位函数：

    >ceil(3.1) -> 4

  - 退位函数：

    >floor(3.9) -> 3

  - 百分数函数：

    >percentage(65 / 100) -> 65%

  - 最小值函数：

    > min(1,2,3,...,9) -> 1

  - 最大值函数：

    > max(1,2,3,...,9) -> 9

    

**3.6.2 字符串类型**

可以使用+ 、- 、/ 连接字符串，+直接连接，-连接后为 `xxx-xxx` 格式，/连接为 `xxx/xxx` 格式。

字符串函数：

- 大写函数：

  > to-upper-case("Hello Word") -> HELLO WORD

- 小写函数：

  > to-lower-case("Hello Word") -> hello word

- 字符串长度：

  > str-length("Hello Word") -> 10，带空格

- 获取子字符串的开头索引：

  > str-index("Hello Word", Word) -> 7，此处索引值是以1开始

- 插入字符串：

  > str-insert("Hello Word", "要插入的字符串", 插入的索引值)



**3.6.3 颜色类型**

关于颜色的函数有很多，详情可到官方文档查看

[https://www.sass.hk/docs/#t6-3-4](https://www.sass.hk/docs/#t6-3-4)



**3.6.4 列表**

列表指的是被分隔的一个值，可以使用空格、逗号、括号分隔开。

列表函数：

- 返回列表长度：

  > length(5px 10px) -> 2 表示该列表有两个项目

- 返回列表的第n个项目：

  > nth(5px 10px 5px 10px, 2) -> 10px

- 返回列表项目的位置：

  > index(1px solid red, solid) -> 2

- 插入新项目：a

  > append(5px 10px, 要插入的项目)

- 组合两个列表：

  > join(列表1, 列表2, 分隔符号) 分割符号space为空格，coma为逗号



**3.6.5 Map类型**

Map类型的格式： `$map: (key1: value1, key2: value2, key3, value3)` 

Map类型的函数：

- 返回Map键值对数：

  > length(light-color: #F3F3F3, dark-color: #888888) -> 2

- 返回key对应的值：

  > map-get(传入Map, 传入key值) -> 对应的value

- 返回所有key值：

  > map-keys(传入Map) -> 所有key

- 返回所有value值：

  > map-values(传入Map) -> 所有value

- 判断是否含有某个key：

  > map-has-key(传入Map, 传入key值) -> true or false

- 合并两个Map：

  > map-merge()

- 移出Map中的某个项目：

  > map-remove()



**3.6.6 布尔值**

与：and，或：or，取反：not



### 3.7 Interpolation

可以让我们把一个值插入到另一个值里，类似于ES6中模板字符串的插值。

使用：

~~~scss
$version: "0.0.1";
// 可以在注释中插入变量或表达式: #{$version}

$name: "info";
$attr: "border";

//也可以在选择器中插入
.alert-#{$info} {
    //还可以在属性名中插入
    #{$attr}-color: #FFFFFF;
}
~~~



### 3.8 控制指令

**3.8.1 @if**

判断语句，通常与else if和else一起使用。用法：

~~~scss
.ClassName {
    @if $color == dark {
    	background: black;
	}
    @else if $color == light {
        background: white;
    }
    @else{
        background: gray;
    }
}
~~~



**3.8.2 @for**

循环语句，重复一定次数输出带有某种规律的样式，有from...through和from...to两种使用方式。用法：

~~~scss
$colums: 4;

//through包含结束值，输出为1到4
@for $i from 1 through $colums {
    .col-#{$i} {
        width: 100% / $colums * $i;
    }
}

//to不包含结束值，输出为1到3
@for $i from 1 to $colums {
    .col-#{$i} {
        width: 100% / $colums * $i;
    }
}
~~~



**3.8.3 @each**

根据列表里的每一个项目去生成特定的样式。用法：

~~~scss
$icons: success error warming;

@each $icon in $icons {
    .icon-#{$icon} {
        background-image: url(../img/#{$icon}.jpg);
    }
}
~~~



**3.8.4 @while**

当判断条件不为false时，循环执行。用法：

~~~scss
$index: 5;

@while $index > 0 {
    .item-#{$index} {
        width: 10px * $index;
    }
    //样式定义完后，修改被循环的值，否则会死循环
    $index: $index - 1;
}
~~~



### 3.9 自定义函数

定义方法：

~~~scss
$colors: (light: #FFFFFF, dark: #000000);

@function setColor($key) {
    @if not map-has-key($colors, $key) {
        //警告信息（显示在控制台）
        @warn "在Map中找不到#{$key}这个key";
        
        //错误信息（显示在输出文件）
        @error "找不到key";
    }
    @return map-get($colors, $key);
}

div {
    background-color: setColor(light);//函数返回#FFFFFF
}
~~~