module.exports = {
    nav: require('./nav'),
    author: 'Vivek',
    license: 'CC BY-NC-SA 4.0',
    // sidebar: 'auto',
    filters: ['每日一题'],
    sidebarDepth: 2,
    valine: true,
    appId: 'eytWDTcVXxD6jB2TPPIFVljq-gzGzoHsz',
    appKey: 'sJRhu6ftXLC0eNR4vsjo3Euy',
    logo: '/assets/img/logo.jpg',
    background: 'http://upyun.cavalheiro.cn/images/background.jpg',
    externalLinks: [
        {
            text: 'CodePen',
            link: 'https://codepen.io/eddievandeer',
            target: '_blank'
        },
        {
            text: 'GitHub',
            link: 'https://github.com/eddievandeer/eddievandeer.github.io',
            target: '_blank'
        }
    ],
    footer: {
        // 页脚信息
        createYear: 2020, // 博客创建年份
        currentYear: new Date().getFullYear(), // 当前年份
        beian: {
            link: 'https://beian.miit.gov.cn/#/Integrated/index',
            context: '闽ICP备2021005292号-1'
        },
        copyrightInfo: 'MIT Licensed | Copyright © 2020-present Vivek',
        // 服务提供商信息，支持html标签
        support: ` <span>本网站由</span>
                    <a href="https://www.upyun.com/" target="_blank" rel="noopener noreferrer">
                        <img height="30px"
                            src="https://cdn.jsdelivr.net/gh/eddievandeer/eddievandeer.github.io/docs/.vuepress/public/assets/img/upyun-logo.png"
                            alt="">
                    </a>
                    <span>提供 <b>CDN</b> 加速</span>`,
    },
}