# CSS笔记

## border-radius

给border-radius设置八个参数时，可以创建不同的图案。

例如：

~~~css
{
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}
~~~

## clip-path

clip-path是一个css3新属性 , 一般用在svg元素上 , 但是也可以作为普通元素裁剪使用。

语法：

```css
/* Keyword values */clip-path: none;

/* <clip-source> values */ 
clip-path: url(resources.svg#c1);

/* <geometry-box> values */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: ellipse(100px 100px at 50% 50%);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

/* Box and shape values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```



## background-clip

- border-box

  默认值。背景绘制在边框方框内（剪切成边框方框）。

- padding-box

  背景绘制在衬距方框内（剪切成衬距方框，即padding及以内，不包括边框）。

- content-box

  背景绘制在内容方框内（剪切成内容方框，只保留内容部分，不包括padding及边框）。

- -webkit-background-clip: text;   **（预览阶段，需要加前缀）**

  沿文字部分剪切。

  

## position

- static：默认，没有定位

- absolute：绝对定位，相对于static以外的第一个父元素
- relative：相对定位
- fixed：固定定位，相对于浏览器窗口，脱离正常的流，相当于一个固定的absolute
- sticky：粘性定位不脱离流，保留元素在流中的位置，基于滚动的位置，超过当前页面显示时固定在之前的位置。（兼容差）

- inherit：继承父元素的position
- initial：初始化，设为默认值



## border-style

用border做一个小三角：

~~~css
.xxx{
    border-width: 8px;
    border-style: solid dashed dashed;
    border-color: #000 transparent transparent;
}
~~~



## text-overflow

- text-overflow：clip

  溢出时修剪溢出的文本

- text-overflow：ellipsis

  溢出时使用省略号代表被修剪的文本

