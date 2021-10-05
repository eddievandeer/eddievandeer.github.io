---
title: Docker + Nginx部署前端项目
postTime: 2021-05-24
categories: 前端教程
tags: 
- 'Docker'
- 'Nginx'
---

::: slot abstract

前段时间买了个域名，于是打算将我的博客网站部署到个人服务器上。作为一个前端人，如何部署前端项目一直是个不太好解决的问题，主要是不太熟悉服务器端的各种操作（我太菜了:sob:）。在网上看了各种的解决方案后，最后挑选了 [Docker](http://www.docker.com/) + [Nginx](http://nginx.org/en/) 来进行部署。

> 在部署的过程中遇到了亿点点坑，这里从头梳理一遍部署过程，希望看到的有缘人能绕开我踩过的那些坑。

:::

## 准备工作

首先要准备一台服务器（*这里我使用的是CentOS 7*），然后就可以开始安装Docker了

如果装过旧版的Docker的话，可以使用以下命令卸载旧版本：

~~~shell
# 如果你是root用户的话可以不必加 sudo 
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
~~~

未安装过Docker或卸载完旧版本后，运行如下命令进行Docker的安装：

~~~shell
sudo yum install docker

# 验证安装是否成功
docker version
~~~

安装完毕后，启动Docker服务：

~~~shell
sudo systemctl start docker
~~~

成功安装并启动了Docker后，就可以开始安装Nginx镜像了：

~~~shell
docker pull nginx
~~~

查看安装的镜像：

~~~shell
docker images
~~~

![image-20210526092636183](http://upyun.cavalheiro.cn/images/image-20210526092636183.png)

到这里准备工作就已经做完了，接下来开始项目的部署



## 开始部署

这里记录两个部署的方式，一个是使用-v挂载，一个是使用Dockerfile

### -v挂载

先启动一个临时的容器，并取得他的容器ID：

~~~shell
docker run -d --name=nginx nginx
# -d 后台运行，--name 为容器命名

docker ps
~~~

启动完成后创建一个 **nginx** 文件夹（理论上在哪都行，我放在了 `/usr/local/server/nginx` 下）并进入，然后将容器内的默认配置文件拷贝到刚创建的文件夹下：

~~~shell
# 这里会在 nginx 目录下自动创建一个 conf 文件夹
docker cp [容器id]:/etc/nginx ./conf
~~~

> 拷贝完默认配置文件后，即可修改目录中的配置文件的内容来对Nginx进行配置

再创建一个 **html** 文件夹，用于放置资源文件

到这里为止，刚刚创建的容器已经没有用了，可以使用如下命令移除：

~~~shell
# 停止nginx
docker stop nginx

# 删除nginx
docker rm nginx
~~~

接下来的操作才是关键，使用下面的命令创建正式的容器：

~~~shell
docker run -d --name=nginx 
        -p 80:80 
        -p 443:443 
		-v /usr/local/server/nginx/conf:/etc/nginx 
		-v /usr/local/server/nginx/html:/usr/share/nginx/html 
		nginx
~~~

这里解释一下这个命令的各个配置项：

-  `-d` 后台运行
- `--name=nginx` 将容器命名为nginx

- `-p 80:80 -p 443:443` 将容器的端口映射到主机的端口

- `-v /usr/local/server/nginx/conf:/etc/nginx` 
  - 将主机中的 **/usr/local/server/nginx/conf** 目录挂载到容器的 **/etc/nginx** 下
  - 该目录下存放的是各个配置文件
  - 在主机目录下做出的改变会同步到容器中
- `-v /usr/local/server/nginx/html:/usr/share/nginx/html` 
  - 将主机中的 **/usr/local/server/nginx/html** 目录挂载到容器的 **/usr/share/nginx/html** 下
  - 该目录存放资源文件，即HTML，CSS，JS等
  - 在主机目录下做出的改变会同步到容器中

到这里 Docker + Nginx 的部署就已经完成了，可以直接在项目源码的目录下运行 `npm run build` 命令，然后将 `dist` 文件夹下的内容复制到主机的 `/usr/local/server/nginx/html` 目录下即可



### Dockerfile

使用 `Dockerfile` 即自己创建一个镜像，需要用到Docker的 `build` 命令。在运行命令之前，我们先来创建Dockerfile这么一个关键文件

Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。进入项目所在的文件夹中，创建 `Dockerfile` 文件，具体内容如下：

~~~dockerfile
FROM nginx:latest

COPY dist/ /usr/share/nginx/html/
~~~

> 这里的 `dist` 目录是用 `npm run build` 或其他形式的打包命令生成的，需要实现打包好再去执行上述命令

如果要对Nginx进行配置的话，可以创建一个 `default.conf.template` 文件，并将其COPY进镜像（这里我将文件放在了 **/config/nginx/** 目录下）

`default.conf.template` 可参考如下配置：

~~~
server {
    listen       ${NGINX_PORT};
    server_name  ${NGINX_DOMAIN};

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
~~~

修改一下Dockerfile，添加设置环境变量和COPY文件的操作：

~~~dockerfile
FROM nginx:latest

# 配置端口和域名的环境变量
ENV NGINX_PORT=80 NGINX_DOMAIN=localhost

COPY /config/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY dist/ /usr/share/nginx/html/
~~~

两个文件都准备完毕后，即可开始镜像的创建。运行如下命令：

~~~shell
# 运行build命令前先进入
docker build -t imageName:tagName . 
# imageName 镜像名
# tagName   镜像tag名
# . 		代表当前目录
~~~

待命令执行完成后，可以使用 `docker images` 查看自己创建的镜像

创建完镜像后，执行命令创建容器：

~~~shell
docker run -d --name=Name -p 80:80 imageName
# 配置项的含义见-v挂载篇
~~~

 然后使用 `docker ps` 就可以查看创建的容器了

到这一步就完成了前端项目的部署，进入浏览器输入域名或ip即可访问自己的网站



## 部分Nginx的配置

我在进行前端项目的部署时，用到了二级域名，还创建了一个监听8888端口的容器用于访问我写的[简历生成器](http://resume.cavalheiro.cn/)，但不想在访问时域名后加 `:端口号 ` （这里需要用到Nginx反向代理）

为实现刚才提到的这些需求，需要在 `conf/conf.d/default.conf` 的配置文件中进行如下配置：

~~~
server {
    listen       80;
    listen  [::]:80;
    # 配置域名
    server_name     cavalheiro.cn;

    location / {
    	# 配置该域名对应的根目录
        root    /usr/share/nginx/html/blog;
        index   index.html index.htm;
    }
}
server {
	listen       80;
	listen  [::]:80;
	# 配置二级域名
    server_name  ac.cavalheiro.cn;

    location / {
    	# 配置该域名对应的根目录
        root   /usr/share/nginx/html/ac;
        index  index.html index.htm;
    }
}
server {
	listen       80;
	listen  [::]:80;
	# 配置二级域名
    server_name  resume.cavalheiro.cn;

    location / {
    	# 配置反向代理
        proxy_pass   http://localhost:8888;
        index  index.html index.htm;
    }
}
~~~



> 若你在项目中使用了Vue-router的同时，Vue-router开的是history模式，会出现访问部分路由出现404的现象，需要再进行如下配置：

~~~
server {
    listen          80;
    server_name     cavalheiro.cn;

    location / {
        root    /usr/share/nginx/html/blog;
        index   index.html index.htm;
        # 关键代码，添加后Nginx支持history模式
        try_files $uri $uri/ /index.html;
    }
}
~~~

