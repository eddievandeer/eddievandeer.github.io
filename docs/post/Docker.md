---
title: Docker使用笔记
postTime: 2021-02-01
categories: 常用工具
tags:
- Docker
- 工具
- 后端
---

::: slot abstract

![docker](http://upyun.cavalheiro.cn/images/xMZBDCJ4nPfmFOp.png)

记一些Docker的常用命令，只涉及Docker的简单使用，适合~~菜鸡~~前端开发人员查阅

:::

![docker](http://upyun.cavalheiro.cn/images/xMZBDCJ4nPfmFOp.png)

## Docker常用命令

### 帮助命令

~~~shell
docker version			# 显示docker的版本信息
docker info				# 显示docker的系统信息，包括镜像和容器的数量
docker 命令 --help	  # 帮助命令
~~~



### 镜像命令

**docker images：** 查看所有本地主机上的镜像

~~~shell
[root@xxx /]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker.io/mysql     latest              db2b37ec6181        3 months ago        545 MB
docker.io/mysql     8.0.18              ed1ffcb5eff3        13 months ago       456 MB

# REPOSITORY	镜像的仓库源
# TAG			镜像的标签
# IMAGE ID		镜像ID
# CREATED		镜像的创建时间
# SIZE			镜像大小
~~~

**docker search：** 搜索镜像

~~~shell
[root@xxx /]# docker search mysql
INDEX       NAME                                        DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
docker.io   docker.io/mysql                             MySQL is a widely used, open-source relati...   10414     [OK]       
docker.io   docker.io/mariadb                           MariaDB is a community-developed fork of M...   3866      [OK]       
docker.io   docker.io/mysql/mysql-server                Optimized MySQL Server Docker images. Crea...   762                  [OK]
~~~

**docker pull：** 下载镜像

~~~shell
# 默认下载最新版本，即：latest
[root@xxx /]# docker pull mysql

# 通过tag选择要下载的版本
[root@xxx /]# docker pull mysql:8.0.18
~~~

**dicker rmi：** 删除镜像

~~~shell
# 通过镜像的id进行删除
[root@xxx /]# docker rmi -f IMAGE_ID
~~~

**docker build：** 创建镜像

~~~shell
# 根据Dockerfile创建镜像
[root@xxx /]# docker build -t ImageName:TagName path
# ImageName：镜像名
# TagName：镜像的tag名
# path：Dockerfile所在的路径
~~~



### 容器命令

**有了镜像才可以创建容器**

**下载镜像：**

~~~shell
[root@xxx /]# docker pull centos
~~~

**新建容器并启动：**

~~~shell
[root@xxx /]# docker run [可选参数] image

# 参数说明
--name="Name"	# 容器名字
-d				# 后台方式运行
-it				# 示用交互方式运行，进入容器查看内容
-p				# 指定容器的端口，使用方式有如下几种：
	-p ip:主机端口:容器端口
	-p 主机端口:容器端口（常用）
	-p 容器端口
	容器端口
-P				# 随机指定端口

# 启动centos容器
[root@xxx /]# docker run -it centos /bin/bash
~~~

**退出容器：**

~~~shell
# 停止容器并从容器中退回主机
[root@xxx /]# docker exit

# 容器不停止退出
Ctrl + P + Q
~~~

**列出所有运行中的容器：**

~~~shell
[root@xxx /]# docker ps
~~~

**删除容器：**

~~~shell
# 删除指定的容器，不能删除运行中的容器，如要强制删除使用rm -f
[root@xxx /]# docker rm 容器id
~~~

**启动和停止容器：**

~~~shell
docker start 容器id		# 启动容器
docker restart 容器id		# 重启容器
docker stop 容器id		# 停止当前正在运行的容器
docker kill 容器id		# 强制停止当前容器
~~~



### 常用的其他命令

**后台启动容器：**

~~~shell
[root@xxx /]# docker run -d 镜像名
~~~

**查看日志：**

~~~shell
# 显示所有日志
[root@xxx /]# docker logs -tf 容器id
# 显示指定条数的日志
[root@xxx /]# docker logs -tf --tail 条数 容器id
~~~

**查看镜像的元数据：**

~~~shell
[root@xxx /]# docker inspect 容器id
~~~

**进入当前正在运行的容器：**

~~~shell
# 容器通常使用后台方式运行
# 方式一
[root@xxx /]# docker exec -it 容器id /bin/bash

# 方式二
[root@xxx /]# docker attach 容器id

# 两个方式的区别：
# docker exec		进入容器后开启一个新的终端，可以在里面操作（操作）
# docker attach		进入容器正在执行的终端，不会启动新的进程
~~~

**从容器内拷贝文件到主机：**

~~~shell
[root@xxx /]# docker cp 容器id:/目录/源文件 /目标目录
~~~

