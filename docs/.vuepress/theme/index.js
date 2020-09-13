module.exports = {
      plugins: [
            'vuepress-plugin-container',
            ['@vuepress/search', {
                  searchMaxSuggestions: 10
            }],
            '@vuepress/back-to-top',
            '@vuepress/nprogress'
      ]
}