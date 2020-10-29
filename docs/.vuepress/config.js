module.exports = {
      title: 'Vivek的博客小站',
      description: 'May the force be with you',
      plugins: [
            // 这是 VuePress 默认主题使用这个插件的方式
            [
                  'vuepress-plugin-container',
                  {
                        type: 'tip',
                        defaultTitle: {
                              '/': 'TIP',
                              '/zh/': '提示',
                        },
                  },
            ],
            // [
            //       '@vssue/vuepress-plugin-vssue', {
            //             // 设置 `platform` 而不是 `api`
            //             platform: 'github-v4',
            //             locale: 'zh',
            //             // 其他的 Vssue 配置
            //             owner: 'eddievandeer',
            //             repo: 'eddievandeer.github.io',
            //       },
            // ]
      ],
      head: [
            ['link', {
                  rel: 'icon',
                  href: '/assets/icon/favicon.ico'
            }]
      ],
      // markdown: {
      //       lineNumbers: true
      // },
      // plugins: [
      //       '@vuepress/back-to-top',
      //       '@vuepress/nprogress'
      // ],
      // themeConfig: {
      //       nav: require('./nav'),
      //       sidebar: require('./sidebar'),
      //       // sidebar: 'auto',
      //       sidebarDepth: 2,
      //       logo: '/assets/img/logo.jpg'
      // },
      // smoothScroll: true,
      // lastUpdated: 'Last Updated',
      // //github的配置
      // repo: 'eddievandeer',
      // repoLabel: 'Github',
      // docsDir: 'docs',
      // docsBranch: 'master',
      // editLinks: true,
      // editLinkText: 'Edit this page'
}