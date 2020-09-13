module.exports = {
      plugins: [
            // [
            //       '@vuepress/last-updated',
            //       {
            //             transformer: (timestamp, lang) => {
            //                   // 不要忘了安装 moment
            //                   const moment = require('moment')
            //                   moment.locale(lang)
            //                   return moment(timestamp).fromNow()
            //             }
            //       }
            // ],
            'vuepress-plugin-container',
            ['@vuepress/search', {
                  searchMaxSuggestions: 10
            }],
            '@vuepress/back-to-top',
            '@vuepress/nprogress'
      ]
}