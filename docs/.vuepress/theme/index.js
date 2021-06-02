module.exports = {
      head: [
            ['link', {
                  rel: 'icon',
                  href: '/assets/icon/favicon.ico'
            }]
      ],
      plugins: [
            'vuepress-plugin-container',
            ['@vuepress/search', {
                  searchMaxSuggestions: 10
            }],
            '@vuepress/back-to-top',
            '@vuepress/nprogress',
            '@vuepress/last-updated'
      ]
}