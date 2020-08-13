# VuePress笔记

# 1、安装

> 安装之前，需要确保Node.js的版本要在8或以上

## 1.1 全局安装

```bash
# 安装
npm install -g vuepress # 或者：cnpm install -g vuepress，yarn global add vuepress

# 创建项目目录并进入该目录
mkdir vuepress-starter && cd vuepress-starter

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

## 1.2 本地安装

```bash
# 将 VuePress 作为一个本地依赖安装
npm install -D vuepress # 或者：cnpm install -D vuepress，yarn add -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

> 如果你的现有项目依赖了 webpack 3.x，推荐使用 [Yarn](https://yarnpkg.com/en/) 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。

接着在 `package.json` 中加入脚本

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

开始使用：

```bash
# 开始写作
npm run docs:dev # 或者：yarn docs:dev

# 生成静态的HTML文件
npm run docs:build # 或者：yarn docs:build
```



# 2、目录结构

VuePress遵循约定大于配置的原则，推荐如下目录结构：

![image-20200807152422303.png](https://i.loli.net/2020/08/13/jfmBsHcInTrUG96.png)

各目录及文件的作用：

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。



自定义 `templates/ssr.html` 或 `templates/dev.html` 时，最好基于默认的模板文件来修改，否则可能会导致构建出错。模板文件内容如下：

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
~~~



## 默认的页面路由

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |



# 3、基本配置

## 3.1 配置文件

所有VuePress相关的配置都放在 `.vuepress` 目录下，一个 VuePress 网站必要的配置文件是 `.vuepress/config.js`，它应该导出一个 JavaScript 对象：

~~~javascript
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
~~~



## 3.2 主题配置

要使用一个主题时，可以在`.vuepress/config.js`配置文件中添加`theme`字段：

```js
module.exports = {
    //使用发布到npm上的主题
    theme: 'vuepress-theme-xx',
    //主题名以vuepress-theme开头的可以使用如下缩写
    theme: 'xxx',
    //适用于Scoped Packages
    theme: '@org/vuepress-theme-xxx',// 或者一个官方主题: '@vuepress/theme-xxx'
    //缩写
    theme: '@org/xxx'// 或者一个官方主题: '@vuepress/xxx'
}
```



## 3.3 常用配置

### 3.3.1 导航栏配置

在`.vuepress/config.js`配置文件中添加`themeConfig`，通过其中的`nav`来配置导航栏：

~~~js
themeConfig: {
    nav: require('./nav')//通常会将导航栏的配置放在另一个文件中
}

//nav.js文件内容：
//exports一个数组
module.exports = [
    {
        //可多级嵌套
        //test为标签的文字内容
        text: '测试',
        //items为子标签列表
        items: [
            {
                text: '内部链接',
                items: [
                    //link为导航栏链接，会自动识别内部链接与外部链接
                    { text: '测试1', link: '/test/one' },
                    { text: '测试2', link: '/test/two' }
                ]
            },
            {
                text: '外链',
                items: [
                    { text: '阿里云', link: 'https://www.aliyun.com/' },
                    { text: '腾讯云', link: 'https://cloud.tencent.com/' }
                ]
            }
        ]
    }
]
~~~



### 3.3.2 侧边栏配置

在`.vuepress/config.js`配置文件中添加`themeConfig`，通过其中的`sidebar`来配置导航栏：

~~~js
themeConfig: {
    sidebar: {
		'/frontend/': [
            ['', 'HTML'],
            'Sass',
            'Git'
        ],
        '/album': [
            ['', '写在前面'],
            '手绘',
            '板绘'
        ]
    }
}
~~~



# 4、静态资源

## 4.1 相对路径

在VuePress中，所有Markdown文件都会被webpack编译成Vue组件，因此在引用静态资源时**更倾向于**使用相对路径：

~~~markdown
![test image](./img/xxx.jpg)
~~~

也可以使用 `~` 前缀来明确指出这是一个webpack的模块请求，这样将允许通过webpack别名来引用文件或npm依赖：

~~~markdown
![image from alias](~@alias/xxx.jpg)
![image from dependency](~some-dependency/xxx.jpg)
~~~

webpack的别名可以通过 `.vuepress/config.js` 中的 **configureWebpack** 来配置：

~~~js
module.export = {
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'//某个路径
            }
        }
    }
}
~~~



## 4.2 公共文件

像favicons和PWA的图标等，并不直接被任何一个markdown文件或者主题组件引用的资源，可以放在 `.vuepress/public` 中，它们最终会被复制到生成的静态文件夹中



## 4.3 基础路径

当网站被部署到一个非根路径下，例如 `https://eddievandeer.github.io/docs/`，需要在 `.vuepress/config.js` 中设置 `base` 的值为 `/docs/` （注意：/开头，/结尾）。 `base` 一旦被设置，将作为前缀插入到 `.vuepress/config.js` 中所有的以/开始的路径

VuePress还提供了一个内置的helper `$withBase`，可以生成正确的路径：

~~~vue
<!-- 在Markdown文件中也是如此 -->
<!-- 因为每一个Markdown文件将首先被编译成HTML，接着作为一个Vue组件传入vue-loader -->
<img :src="$withBase('/xxx.png')" alt="xxx">
~~~



# 5、部署到Github

步骤：

- 若要将博客发布到 `https://<USERNAME>.github.io/<REPO>/`仓库，需要在 `config.js` 中将base设置为 `"/<REPO>/"` 。

- 使用Git新建一个分支gh-pages：

  ~~~bash
  git branch gh-pages
  ~~~

- 配置 `.gitignore` 文件，忽略 `node_modules` 目录和 `dist` 目录

- 在项目中创建一个 `deploy.sh` 文件：

  ~~~bash
  #!/usr/bin/env sh
  
  # 确保脚本抛出遇到的错误
  set -e
  
  # 生成静态文件
  npm run docs:build
  
  # 进入生成的文件夹
  cd docs/.vuepress/dist
  
  # 如果是发布到自定义域名
  # echo 'www.example.com' > CNAME
  
  git init
  git add -A
  git commit -m 'deploy'
  
  # 如果发布到 https://<USERNAME>.github.io
  git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master:gh-pages
  
  # 如果发布到 https://<USERNAME>.github.io/<REPO>
  git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
  
  cd -
  ~~~

- 使用Git将代码发布到主分支master上，并运行 `deploy.sh` 文件的脚本，将编译后的文件发布到gh-pages分支：

  ~~~bash
  git add -A
  git commit -m "message"
  git push
  yarn deploy
  ~~~

:::tip

完成以上步骤即可在 `https://<USERNAME>.github.io/` 或 `https://<USERNAME>.github.io/<REPO>` 访问自己的博客网站了

:::