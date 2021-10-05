---
title: DOM笔记
postTime: 2020-10-02
categories: 
- 前端笔记
- JavaScript
tags:
- 前端
- DOM
- JavaScript
---

::: slot abstract

DOM方面的笔记，记录了一些常用的功能和一些使用DOM相关知识制作的有意思的小玩意儿

:::

## DOM：toggle()

### 作用

判断指定的类是否存在，若存在则移除，不存在则添加。

### 用法

~~~javascript
document.queryselector("#id || .class").classList.toggle("classname");
~~~



## DOM：旋转拖拽

### 过程

- 获取鼠标拖动前后的左边
- 计算拖动的距离差
- 计算旋转角度

### 代码

~~~javascript
let nowX,nowY,//现在鼠标的坐标
	lastX,lastY,//上一次鼠标的坐标
    minusX,minusY,//距离差
    roX,roY;//旋转度数
let El = document.getElementById("id");

document.onmousedown = function(e){
    let e1 = e || window.event;//兼容问题，IE不能直接获取
    lastX = e1.clientX;
	lastY = e1.clientY;
    
    this.onmousemove = function(e){
        let e2 = e || window.event;
        nowX = e2.clientX;
        nowY = e2.clientY;
        
        minusX = nowX - lastX;
        minusY = nowY - lastY;
        
        //TODO
        roX = roX - minusY;//上下拖动沿X轴旋转
        roY = roY + minusX;//左右拖动沿Y轴旋转
        
        El.style.transform = "rotateX(" +roX+ "deg)rotateY(" + roY + "deg)";
        
        lastX = nowX;
        lastY = nowY;
    }
}
~~~



## DOM：HTML5新增元素获取方式

- queryElementByClassname()：
  - 返回所有同类名的元素（集合）
- querySelector()：
  - 返回指定选择器的第一个元素
- querySelectorAll()：
  - 返回指定选择器的所有元素（集合）
- 获取父元素中的子元素：
  - querySelector('.parentClass').querySelectorAll('img');
- 特殊元素的获取：
  - body：document.body
  - html：document.documentElement



## DOM：排他算法

遍历排除其他，然后处理自身

~~~javascript
let el = document.querySelector('.className').querySelector('li');

for(let i = 0;i < el.length;i++){
    el[i].onclick = function(){
        //遍历排除其他
        for(let i = 0;i < el.length;i++){
            el[i].classList.remove('active');
        }
        //处理自身
        this.classList.add('active');
    }
}
~~~



## DOM：H5新增自定义属性

- 规范：自定义的属性以 **data-** 开头

- 获取：

  - 兼容性获取：

    ~~~javascript
    element.getAttribute('data-xxx');
    element.getAttribute('data-list-first');
    ~~~

  - H5新增获取方法（只能获取**data-**开头的）：

    ~~~javascript
    element.dataset.xxx;
    element.dataset.listFirst;//-改驼峰
    ~~~



## DOM：事件流

描述的是从页面中接收事件的顺序，指事件在元素节点之间按照特定的顺序传播的过程。

JS代码只能执行捕获或冒泡其中的一个阶段。

![image-20200711211958556.png](https://i.loli.net/2020/10/01/DJlhZ6pwbARzin4.png)

~~~javascript
//第三个参数设置为true则处于捕获阶段
document.querySelector('.son').addEventListener('click',function(){
    //TODO
},true)

document.querySelector('.parent').addEventListener('click',function(){
    //TODO
},true)
//执行结果先parent，再son


//第三个参数设置为false或者不设置（默认false），则处于冒泡阶段
document.querySelector('.son').addEventListener('click',function(){
    //TODO
})

document.querySelector('.parent').addEventListener('click',function(){
    //TODO
})
//执行结果先son，再parent
~~~



## DOM：事件对象

常写作event，作为侦听函数的形参，可以通过事件对象获取和事件相关的信息，如点击事件时获取鼠标位置，键盘事件获取按下了哪个键。

兼容性问题：IE678通过window.event

~~~javascript
document.querySelector('.xxx').addEventListener('click',function(event){
    //TODO
    e = e || window.event;//兼容性问题，一般不考虑
})
~~~

e.target和this的区别：

- e.target：返回触发事件的对象
- this：返回绑定事件的对象（相似：e.currentTarget）



## DOM：动态锚点

### 过程

- 获取鼠标滚轮滚动距离
- 通过传入的event事件对象，获取滚动的方向

### 代码

~~~js
let onScroll = function(e){
    let event = e || window.event // e的兼容性问题
    
    let home = document.querySelector('.blog-home')
    let about = document.querySelector('#about')
    
    // 获取滚动距离
    let scrolled = document.documentElement.scrollTop || document.body.scrollTop
    
    // wheelDelta主要针对ie和Chrome，detail只针对FireFox
    // wheelDelta值为正，滚动条向上滚动；值为负，滚动条向下滚动，
    // detail值刚好相反，值为正，滚动条向下滚动；值为负，滚动条向上滚动
    if (event.wheelDelta < 0 || event.detail > 0) {
        if (scrolled <= about.offsetTop - 1) {
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
            
            // window.scrollTo(x, y)
            window.scrollTo(0, about.offsetTop)
        }
    } else {
        if (scrolled <= about.offsetTop + 60) {
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
            window.scrollTo(0, 0)
        }
    }
}

let main = document.querySelector('.container')

main.addEventListener('mousewheel', onScroll, false)// 兼容FireFox外的浏览器
main.addEventListener('DOMMouseScroll', onScroll)// 针对FireFox的非标准事件
main.addEventListener('wheel', onScroll, false)// 针对Chrome的非标准事件，ie不兼容
~~~



## DOM：简易弹幕功能

### 原理

- 使用canvas覆盖在`<video>`标签内容上，通过js绘制弹幕内容
- 使用 `getContext("2d")` 获取一个 `CanvasRenderingContext2D` 对象，使用它可以绘制到 `Canvas` 元素中
- 使用CanvasRenderingContext2D对象中的 `font()` ， `fillStyle()` ， `fillText()` 方法设置字体属性，设置文字样式，绘制被填充的文字
- 使用 `requestAnimationFrame()` 方法执行一个动画，传入一个回调函数控制下一帧的绘制

### 代码

- 封装视频弹幕类：

~~~js
/**
 * 构造函数
 * @param {Object} video 
 * @param {Object} canvas 
 * @param {Object} options 
 */
constructor(video, canvas, options) {
    // 传入的视频、幕布对象不能为空，同时传入的设置选项要是个对象(isObj，isArray为自己写的工具类方法)
    if (!video || !canvas || !options || !isObj(options)) return;
    // 传入的设置选项要有数据，同时数据格式要是数组
    if (!options.danmuData || !isArray(options.danmuData)) return;

    this.video = video;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.canvas.width = video.offsetWidth;
    this.canvas.height = video.offsetHeight;
    // 用于判断视频是否暂停
    this.paused = true;

    Object.assign(this, options, {
        speed: 2,
        runTime: 0,
        color: '#fff'
    })

    // 定义弹幕池，将弹幕
    this.danmuPool = this.danmuData.map(dm => new Danmu(dm, this));
    this.render();
}
~~~

  - 视频弹幕类的渲染弹幕方法：

~~~js
// 渲染函数，作为requestAnimationFrame的回调函数
render() {
    this.clearRect();
    this.drawDanmu();
    // 判断视频是否处于播放状态，并设置动画
    !this.paused && requestAnimationFrame(this.render.bind(this));
}

// 清除内容
clearRect() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// 绘制弹幕
drawDanmu() {
    let currentTime = this.video.currentTime;
    this.danmuPool.map((danmu) => {
        if (!danmu.stopDrawing && currentTime >= danmu.runTime) {
            if (!danmu.isInitialized) {
                danmu.initialize();
                danmu.isInitialized = true;
            }
            danmu.X -= danmu.speed;
            danmu.draw();

            if (danmu.X <= danmu.width * -1) {
                danmu.stopDrawing = true;
            }
        }
    })

}
~~~

- 封装单条弹幕类：

~~~js
class Danmu {
    /**
     * 构造函数
     * @param {Object} danmu 弹幕内容
     * @param {Object} fCtx 父类Context
     */
    constructor(danmu, fCtx) {
        // 获取弹幕文本内容
        this.content = danmu.content;
        // 获取弹幕出现时间
        this.runTime = danmu.runTime;
        this.danmu = danmu;
        // 
        this.ctx = fCtx;

        this.initialize();
    }

    // 初始化
    initialize() {
        // 设置默认属性
        this.color = this.danmu.color || this.ctx.color;
        this.speed = this.danmu.speed || this.ctx.speed;
        this.fontSize = 26;
        this.width = getTextWidth(this.content, this.fontSize);
        // 设置弹幕位置
        getTextPosition(this.ctx.canvas, this.fontSize, this);
    }

    // 调用canvas接口绘制弹幕
    draw() {
        this.ctx.canvasCtx.font = this.fontSize + 'px Microsoft Yahei';
        this.ctx.canvasCtx.fillStyle = this.color;
        this.ctx.canvasCtx.fillText(this.content, this.X, this.Y);
    }
}
~~~

- 整合使用：

~~~js
;((doc) => {
    const oDanmuVideo = doc.querySelector('#J_Video'),
          oDanmuCanvas = doc.querySelector('#J_Canvas'),
          oDanmuInput = doc.querySelector('.danmu-input'),
          oDanmuBtn = doc.querySelector('.danmu-btn'),
          oColorInput = doc.querySelector('.color-input');

    //模块初始化函数
    const init = () => {
        //实例化弹幕插件并挂载到window
        window.videoDanmu = new VideoDanmu(
            oDanmuVideo,
            oDanmuCanvas, {
                danmuData
            }
        );

        bindEvent();
    }

    //绑定事件处理函数的管理函数
    function bindEvent() {
        oDanmuVideo.addEventListener('play', handleVideoPlay, false);
        oDanmuVideo.addEventListener('pause', handleVideoPause, false);
        oDanmuVideo.addEventListener('seeked', handleVideoSeek, false);
        oDanmuBtn.addEventListener('click', handleDanmuBtnClick, false);
    }

    function handleVideoPlay() {
        videoDanmu.paused = false;
        videoDanmu.render();
    }

    function handleVideoPause() {
        videoDanmu.paused = true;
    }

    function handleVideoSeek() {
        videoDanmu.reset();
    }

    function handleDanmuBtnClick() {
        //暂停状态不能发送弹幕
        if (videoDanmu.paused) return;

        const inputValue = oDanmuInput.value.trim();

        if (inputValue.length == 0) return;

        const colorValue = oColorInput.value,
              currentTime = oDanmuVideo.currentTime;
        const _data = {
            content: inputValue,
            color: colorValue,
            runTime: currentTime
        }
        videoDanmu.addDanmu(_data);
        oDanmuInput.value = '';
    }
    init();
})(document);
~~~
