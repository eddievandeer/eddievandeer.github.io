---
title: Git的简单使用
postTime: 2020-08-09
categories: 常用工具
tags:
- git
- 工具
---

::: slot abstract

[Git](https://git-scm.com/) 的基础使用，分支这块也只涉及一小部分基础知识

> 配合Github演示了对远程仓库的管理

:::

## 1、本地仓库

### 1.1 工作流程

**Git的三个区域：**

- Git仓库（Git Repository）保存从暂存区提交的最终版，成为一个新的版本
- 暂存区：已修改的文件暂存在此区域，最后统一提交到Git仓库中
- 工作区（Working Directory）：添加、编辑、修改文件等操作在此区域进行

**工作流程：**

1. git status

2. git add xxx.html

   git add xxx.css

3. git status

4. git commit -m "提交描述"

5. git status



### 1.2 本地仓库操作

1. 首次下载使用需要先进行全局配置

> git config --global user.name
>
> git config --global user.email

![image-20200718161549825](E:\文档\笔记\Git笔记.assets\image-20200718161549825.png)

2. 创建仓库

> mkdir RepositoryName

3. 初始化仓库

让Git知道该目录需要它来管理

> get init

执行之后Git会自动创建一个.git文件夹，尽量不要随便乱动

4. Git常用指令操作

- 查看当前状态：**git status**

- 将一个或多个文件从工作区添加至暂存区

  - **git add 文件名**（单个）
  - **git add 文件名1 文件名2 文件名3**（多个，空格隔开）
  - **git add .**（添加当前目录到暂存区）

- 提交至版本库

  **git commit -m "注释"**



### 1.3 版本回退

1. 查看版本，确定需要回退到的时间点

   指令：

   > git log（详细，比较喜欢这个）
   >
   > git log --online（单行）

   黄字部分为提交编号

2. 回退操作

   指令：

   > git reset --head 提交编号（可以往前也可以往后）

   **注意**：回退后使用查看版本指令无法查看所回退的版本之后的内容

3. 查看历史操作

   指令：

   > get reflog



### 1.4 修改commit信息

1. 修改还未push的commit：

   > git commit --amend

   

2. 修改最近一次push的commit：

   先修改commit的信息：

   > git commit --amend

   再使用git pull拉取并合并分支：

   > git pull

   最后提交本次修改

   > git push

   

3. 修改历史提交记录：

   使用下列命令进入编辑页面（n表示要修改最近哪几条记录，如：n=2修改最近两条记录）
   
   > git rebase -i HEAD~n
   
   进入编辑页面后，将需要修改的commit信息前的 `pick` 改为 `edit` ，保存并退出
   
   然后编辑commit的信息：
   
   > git commit --amend
   
   编辑完成后合并分支：
   
   > git rebase --continue
   
   最后强制提交到远程仓库：
   
   > git push --force origin master



附带vim的简单使用方法：

- 启动后，vim处于Normal模式，在此模式中可输入命令
- i  ==>  进入Insert模式，此时可以编辑文件内容
- x  ==>  删除当前光标所在的字符
- :wq  ==>  保存并退出，需要在输入完后回车
- dd  ==>  删除当前行



## 2、连接远程仓库

### 2.1 基于HTTPS协议

1. 创建空目录

2. 使用clone指令克隆线上仓库到本地

   指令：

   > git clone 线上仓库地址

![image-20200718190508430](E:\文档\笔记\Git笔记.assets\image-20200718190508430.png)

3. 在仓库上做相应操作

   1. 提交暂存区

   2. 提交本地仓库

   3. 提交线上仓库：

      > git push（需鉴权）

   4. 拉取线上仓库：

      > git pull

   5. 提醒：

      每天上班第一件事先 git pull 拉取线上最新版本，下班前先 git push 提交到线上仓库



### 2.2 基于SSH协议（推荐）

1. 生成客户端公私钥

   指令：

   > ssh-keygen -t rsa -C "GitHub注册邮箱"
   
   执行完指令后将生成id_rsa.pub文件，使用文本打开，复制其中内容至GitHub的设置中
   
   ![image-20200719200945117](E:\文档\笔记\Git笔记.assets\image-20200719200945117.png)

2. 使用clone指令克隆远程仓库

   线上仓库地址：

   ![image-20200720075913580](E:\文档\笔记\Git笔记.assets\image-20200720075913580.png)

3. 后续操作与基于HTTPS的一致



### 2.3 分支管理

1. 分支相关指令：

   > 查看分支：git branch
   >
   > 创建分支：git branch 分支名
   >
   > 切换分支：git checkout 分支名
   >
   > 创建并切换分支：git checkout -b 分支名
   >
   > 删除分支：git branch -d 分支名
   >
   > 合并分支1：git merge 被合并的分支名（合并至当前分支）
   >
   > 合并分支2：git rebase 目标基底分支（将当前分支的历次修改移动到目标基底分支）
   >
   > 查看分支走势图形：git log --oneline --graph

   注意：在删除分支前，必须先退出待删除的分支

2. 分支合并方式

   - 快速合并（Fast-forward）：

     在主分支没有动的情况下，直接将主分支的指针直接指向被合并的分支

   - 三方合并（the recursive strategy）

     将主分支最新的提交点和被合并分支最新的提交点做一个合并，生成一个新的提交点

   

### 2.4 冲突的产生与解决

1. 冲突产生原因：

   没有先执行 git pull 指令，获取当前线上最新版本

2. 解决方法：

   与产生冲突的文件的提交者进行商量，最后将修改后的文件上传

   （上班先pull，下班先push）

3. 多人协同时：

   每次在push之前先做一次pull

   > commit > pull > push 循环

   

## 3、Git使用技能

### 3.1 Git图形管理工具

**GitHub Desktop**

Github出品的软件，了解这个足够了，其他不想看。



### 3.2 忽略文件

1. 创建.gitignore文件，无文件名需使用命令行创建

   > touch .gitignore

2. 编写文件中的规则

   常见规则：

   > 1）/目录名/				过滤整个文件夹
   >
   > 2）*.zip					  过滤所有.zip文件
   >
   > 3）/目录名/xxx.js	  过滤某个具体文件
   >
   > 4）!index.html			不过滤某个文件

