(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{408:function(_,t,v){"use strict";v.r(t);var i=v(3),a=Object(i.a)({},(function(){var _=this,t=_.$createElement,v=_._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey},scopedSlots:_._u([{key:"abstract",fn:function(){return[v("p",[v("a",{attrs:{href:"https://git-scm.com/",target:"_blank",rel:"noopener noreferrer"}},[_._v("Git"),v("OutboundLink")],1),_._v(" 的基础使用，分支这块也只涉及一小部分基础知识")]),_._v(" "),v("blockquote",[v("p",[_._v("配合Github演示了对远程仓库的管理")])])]},proxy:!0}])},[v("h2",{attrs:{id:"_1、本地仓库"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、本地仓库"}},[_._v("#")]),_._v(" 1、本地仓库")]),_._v(" "),v("h3",{attrs:{id:"_1-1-工作流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-工作流程"}},[_._v("#")]),_._v(" 1.1 工作流程")]),_._v(" "),v("p",[v("strong",[_._v("Git的三个区域：")])]),_._v(" "),v("ul",[v("li",[_._v("Git仓库（Git Repository）保存从暂存区提交的最终版，成为一个新的版本")]),_._v(" "),v("li",[_._v("暂存区：已修改的文件暂存在此区域，最后统一提交到Git仓库中")]),_._v(" "),v("li",[_._v("工作区（Working Directory）：添加、编辑、修改文件等操作在此区域进行")])]),_._v(" "),v("p",[v("strong",[_._v("工作流程：")])]),_._v(" "),v("ol",[v("li",[v("p",[_._v("git status")])]),_._v(" "),v("li",[v("p",[_._v("git add xxx.html")]),_._v(" "),v("p",[_._v("git add xxx.css")])]),_._v(" "),v("li",[v("p",[_._v("git status")])]),_._v(" "),v("li",[v("p",[_._v('git commit -m "提交描述"')])]),_._v(" "),v("li",[v("p",[_._v("git status")])])]),_._v(" "),v("h3",{attrs:{id:"_1-2-本地仓库操作"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-本地仓库操作"}},[_._v("#")]),_._v(" 1.2 本地仓库操作")]),_._v(" "),v("ol",[v("li",[_._v("首次下载使用需要先进行全局配置")])]),_._v(" "),v("blockquote",[v("p",[_._v("git config --global user.name")]),_._v(" "),v("p",[_._v("git config --global user.email")])]),_._v(" "),v("p",[v("img",{attrs:{src:"E:%5C%E6%96%87%E6%A1%A3%5C%E7%AC%94%E8%AE%B0%5CGit%E7%AC%94%E8%AE%B0.assets%5Cimage-20200718161549825.png",alt:"image-20200718161549825"}})]),_._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[_._v("创建仓库")])]),_._v(" "),v("blockquote",[v("p",[_._v("mkdir RepositoryName")])]),_._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[_._v("初始化仓库")])]),_._v(" "),v("p",[_._v("让Git知道该目录需要它来管理")]),_._v(" "),v("blockquote",[v("p",[_._v("get init")])]),_._v(" "),v("p",[_._v("执行之后Git会自动创建一个.git文件夹，尽量不要随便乱动")]),_._v(" "),v("ol",{attrs:{start:"4"}},[v("li",[_._v("Git常用指令操作")])]),_._v(" "),v("ul",[v("li",[v("p",[_._v("查看当前状态："),v("strong",[_._v("git status")])])]),_._v(" "),v("li",[v("p",[_._v("将一个或多个文件从工作区添加至暂存区")]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("git add 文件名")]),_._v("（单个）")]),_._v(" "),v("li",[v("strong",[_._v("git add 文件名1 文件名2 文件名3")]),_._v("（多个，空格隔开）")]),_._v(" "),v("li",[v("strong",[_._v("git add .")]),_._v("（添加当前目录到暂存区）")])])]),_._v(" "),v("li",[v("p",[_._v("提交至版本库")]),_._v(" "),v("p",[v("strong",[_._v('git commit -m "注释"')])])])]),_._v(" "),v("h3",{attrs:{id:"_1-3-版本回退"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-版本回退"}},[_._v("#")]),_._v(" 1.3 版本回退")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("查看版本，确定需要回退到的时间点")]),_._v(" "),v("p",[_._v("指令：")]),_._v(" "),v("blockquote",[v("p",[_._v("git log（详细，比较喜欢这个）")]),_._v(" "),v("p",[_._v("git log --online（单行）")])]),_._v(" "),v("p",[_._v("黄字部分为提交编号")])]),_._v(" "),v("li",[v("p",[_._v("回退操作")]),_._v(" "),v("p",[_._v("指令：")]),_._v(" "),v("blockquote",[v("p",[_._v("git reset --head 提交编号（可以往前也可以往后）")])]),_._v(" "),v("p",[v("strong",[_._v("注意")]),_._v("：回退后使用查看版本指令无法查看所回退的版本之后的内容")])]),_._v(" "),v("li",[v("p",[_._v("查看历史操作")]),_._v(" "),v("p",[_._v("指令：")]),_._v(" "),v("blockquote",[v("p",[_._v("get reflog")])])])]),_._v(" "),v("h3",{attrs:{id:"_1-4-修改commit信息"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-修改commit信息"}},[_._v("#")]),_._v(" 1.4 修改commit信息")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("修改还未push的commit：")]),_._v(" "),v("blockquote",[v("p",[_._v("git commit --amend")])])]),_._v(" "),v("li",[v("p",[_._v("修改最近一次push的commit：")]),_._v(" "),v("p",[_._v("先修改commit的信息：")]),_._v(" "),v("blockquote",[v("p",[_._v("git commit --amend")])]),_._v(" "),v("p",[_._v("再使用git pull拉取并合并分支：")]),_._v(" "),v("blockquote",[v("p",[_._v("git pull")])]),_._v(" "),v("p",[_._v("最后提交本次修改")]),_._v(" "),v("blockquote",[v("p",[_._v("git push")])])]),_._v(" "),v("li",[v("p",[_._v("修改历史提交记录：")]),_._v(" "),v("p",[_._v("使用下列命令进入编辑页面（n表示要修改最近哪几条记录，如：n=2修改最近两条记录）")]),_._v(" "),v("blockquote",[v("p",[_._v("git rebase -i HEAD~n")])]),_._v(" "),v("p",[_._v("进入编辑页面后，将需要修改的commit信息前的 "),v("code",[_._v("pick")]),_._v(" 改为 "),v("code",[_._v("edit")]),_._v(" ，保存并退出")]),_._v(" "),v("p",[_._v("然后编辑commit的信息：")]),_._v(" "),v("blockquote",[v("p",[_._v("git commit --amend")])]),_._v(" "),v("p",[_._v("编辑完成后合并分支：")]),_._v(" "),v("blockquote",[v("p",[_._v("git rebase --continue")])]),_._v(" "),v("p",[_._v("最后强制提交到远程仓库：")]),_._v(" "),v("blockquote",[v("p",[_._v("git push --force origin master")])])])]),_._v(" "),v("p",[_._v("附带vim的简单使用方法：")]),_._v(" "),v("ul",[v("li",[_._v("启动后，vim处于Normal模式，在此模式中可输入命令")]),_._v(" "),v("li",[_._v("i  ==>  进入Insert模式，此时可以编辑文件内容")]),_._v(" "),v("li",[_._v("x  ==>  删除当前光标所在的字符")]),_._v(" "),v("li",[_._v(":wq  ==>  保存并退出，需要在输入完后回车")]),_._v(" "),v("li",[_._v("dd  ==>  删除当前行")])]),_._v(" "),v("h2",{attrs:{id:"_2、连接远程仓库"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、连接远程仓库"}},[_._v("#")]),_._v(" 2、连接远程仓库")]),_._v(" "),v("h3",{attrs:{id:"_2-1-基于https协议"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-基于https协议"}},[_._v("#")]),_._v(" 2.1 基于HTTPS协议")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("创建空目录")])]),_._v(" "),v("li",[v("p",[_._v("使用clone指令克隆线上仓库到本地")]),_._v(" "),v("p",[_._v("指令：")]),_._v(" "),v("blockquote",[v("p",[_._v("git clone 线上仓库地址")])])])]),_._v(" "),v("p",[v("img",{attrs:{src:"E:%5C%E6%96%87%E6%A1%A3%5C%E7%AC%94%E8%AE%B0%5CGit%E7%AC%94%E8%AE%B0.assets%5Cimage-20200718190508430.png",alt:"image-20200718190508430"}})]),_._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[v("p",[_._v("在仓库上做相应操作")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("提交暂存区")])]),_._v(" "),v("li",[v("p",[_._v("提交本地仓库")])]),_._v(" "),v("li",[v("p",[_._v("提交线上仓库：")]),_._v(" "),v("blockquote",[v("p",[_._v("git push（需鉴权）")])])]),_._v(" "),v("li",[v("p",[_._v("拉取线上仓库：")]),_._v(" "),v("blockquote",[v("p",[_._v("git pull")])])]),_._v(" "),v("li",[v("p",[_._v("提醒：")]),_._v(" "),v("p",[_._v("每天上班第一件事先 git pull 拉取线上最新版本，下班前先 git push 提交到线上仓库")])])])])]),_._v(" "),v("h3",{attrs:{id:"_2-2-基于ssh协议-推荐"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-基于ssh协议-推荐"}},[_._v("#")]),_._v(" 2.2 基于SSH协议（推荐）")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("生成客户端公私钥")]),_._v(" "),v("p",[_._v("指令：")]),_._v(" "),v("blockquote",[v("p",[_._v('ssh-keygen -t rsa -C "GitHub注册邮箱"')])]),_._v(" "),v("p",[_._v("执行完指令后将生成id_rsa.pub文件，使用文本打开，复制其中内容至GitHub的设置中")]),_._v(" "),v("p",[v("img",{attrs:{src:"E:%5C%E6%96%87%E6%A1%A3%5C%E7%AC%94%E8%AE%B0%5CGit%E7%AC%94%E8%AE%B0.assets%5Cimage-20200719200945117.png",alt:"image-20200719200945117"}})])]),_._v(" "),v("li",[v("p",[_._v("使用clone指令克隆远程仓库")]),_._v(" "),v("p",[_._v("线上仓库地址：")]),_._v(" "),v("p",[v("img",{attrs:{src:"E:%5C%E6%96%87%E6%A1%A3%5C%E7%AC%94%E8%AE%B0%5CGit%E7%AC%94%E8%AE%B0.assets%5Cimage-20200720075913580.png",alt:"image-20200720075913580"}})])]),_._v(" "),v("li",[v("p",[_._v("后续操作与基于HTTPS的一致")])])]),_._v(" "),v("h3",{attrs:{id:"_2-3-分支管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-分支管理"}},[_._v("#")]),_._v(" 2.3 分支管理")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("分支相关指令：")]),_._v(" "),v("blockquote",[v("p",[_._v("查看分支：git branch")]),_._v(" "),v("p",[_._v("创建分支：git branch 分支名")]),_._v(" "),v("p",[_._v("切换分支：git checkout 分支名")]),_._v(" "),v("p",[_._v("创建并切换分支：git checkout -b 分支名")]),_._v(" "),v("p",[_._v("删除分支：git branch -d 分支名")]),_._v(" "),v("p",[_._v("合并分支1：git merge 被合并的分支名（合并至当前分支）")]),_._v(" "),v("p",[_._v("合并分支2：git rebase 目标基底分支（将当前分支的历次修改移动到目标基底分支）")]),_._v(" "),v("p",[_._v("查看分支走势图形：git log --oneline --graph")])]),_._v(" "),v("p",[_._v("注意：在删除分支前，必须先退出待删除的分支")])]),_._v(" "),v("li",[v("p",[_._v("分支合并方式")]),_._v(" "),v("ul",[v("li",[v("p",[_._v("快速合并（Fast-forward）：")]),_._v(" "),v("p",[_._v("在主分支没有动的情况下，直接将主分支的指针直接指向被合并的分支")])]),_._v(" "),v("li",[v("p",[_._v("三方合并（the recursive strategy）")]),_._v(" "),v("p",[_._v("将主分支最新的提交点和被合并分支最新的提交点做一个合并，生成一个新的提交点")])])])])]),_._v(" "),v("h3",{attrs:{id:"_2-4-冲突的产生与解决"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-冲突的产生与解决"}},[_._v("#")]),_._v(" 2.4 冲突的产生与解决")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("冲突产生原因：")]),_._v(" "),v("p",[_._v("没有先执行 git pull 指令，获取当前线上最新版本")])]),_._v(" "),v("li",[v("p",[_._v("解决方法：")]),_._v(" "),v("p",[_._v("与产生冲突的文件的提交者进行商量，最后将修改后的文件上传")]),_._v(" "),v("p",[_._v("（上班先pull，下班先push）")])]),_._v(" "),v("li",[v("p",[_._v("多人协同时：")]),_._v(" "),v("p",[_._v("每次在push之前先做一次pull")]),_._v(" "),v("blockquote",[v("p",[_._v("commit > pull > push 循环")])])])]),_._v(" "),v("h2",{attrs:{id:"_3、git使用技能"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、git使用技能"}},[_._v("#")]),_._v(" 3、Git使用技能")]),_._v(" "),v("h3",{attrs:{id:"_3-1-git图形管理工具"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-git图形管理工具"}},[_._v("#")]),_._v(" 3.1 Git图形管理工具")]),_._v(" "),v("p",[v("strong",[_._v("GitHub Desktop")])]),_._v(" "),v("p",[_._v("Github出品的软件，了解这个足够了，其他不想看。")]),_._v(" "),v("h3",{attrs:{id:"_3-2-忽略文件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-忽略文件"}},[_._v("#")]),_._v(" 3.2 忽略文件")]),_._v(" "),v("ol",[v("li",[v("p",[_._v("创建.gitignore文件，无文件名需使用命令行创建")]),_._v(" "),v("blockquote",[v("p",[_._v("touch .gitignore")])])]),_._v(" "),v("li",[v("p",[_._v("编写文件中的规则")]),_._v(" "),v("p",[_._v("常见规则：")]),_._v(" "),v("blockquote",[v("p",[_._v("1）/目录名/\t\t\t\t过滤整个文件夹")]),_._v(" "),v("p",[_._v("2）*.zip\t\t\t\t\t  过滤所有.zip文件")]),_._v(" "),v("p",[_._v("3）/目录名/xxx.js\t  过滤某个具体文件")]),_._v(" "),v("p",[_._v("4）!index.html\t\t\t不过滤某个文件")])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);