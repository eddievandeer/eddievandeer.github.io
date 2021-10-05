---
title: HTML笔记
postTime: 2020-08-09
categories: 
- 前端笔记
- HTML
tags:
- HTML
- 笔记
---

::: slot abstract

简单的介绍了一些HTML5新增的标签，及其相应的属性、DOM接口

:::

## H5新特性

### HTML5 视频

HTML5 规定了一种通过 **video** 元素来包含视频的标准方法。

使用方式：

~~~html
<video width="320" height="240" controls="controls">
  <source src="movie.ogg" type="video/ogg">
  <source src="movie.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
~~~

video标签的属性：

| 属性     | 值       | 描述                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| src      | *url*    | 要播放的视频的 URL。                                         |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| height   | *pixels* | 设置视频播放器的高度。                                       |
| width    | *pixels* | 设置视频播放器的宽度。                                       |
| autoplay | autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| loop     | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| preload  | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| muted    | muted    | 如果出现该属性，视频的音频输出为静音。                       |
| poster   | url      | 规定视频正在下载时显示的图像，直到用户点击播放按钮。         |

使用DOM控制video：

- 播放视频：play()

- 暂停视频：pause()

- 全屏与退出全屏：

  ~~~js
  // Webkit
  element.webkitRequestFullScreen();// 进入全屏
  document.webkitCancelFullScreen();// 退出全屏
  
  // Firefox
  element.mozRequestFullScreen();
  document.mozCancelFullScreen();
   
  // W3C 
  element.requestFullscreen();
  document.exitFullscreen();
  
  // 兼容性写法
  // 进入全屏
  function FullScreen() {
      var ele = document.documentElement;
      if (ele.requestFullscreen) {
          ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
          ele.webkitRequestFullScreen();
      }
  }
  // 退出全屏
  function exitFullscreen() {
      var de = document;
      if (de.exitFullscreen) {
          de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen();
      }
  }
  ~~~



### HTML5 音频