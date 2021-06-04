import '@theme/styles/main.scss'
import 'font-awesome/css/font-awesome.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import navConfig from './nav'
import { countCategories, countTags, setRouter } from './helper'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    // ...做一些其他的应用级别的优化
    Vue.prototype.$navConfig = navConfig

    siteData.pages.sort((a, b) => {
        return (new Date(b.frontmatter.postTime) - new Date(a.frontmatter.postTime))
    })

    const siteCategories = new Map(),
        siteTags = new Map()

    siteData.pages.forEach((page) => {
        if (page.path.endsWith('html')) {
            countCategories(page, siteCategories)
            countTags(page, siteTags)
        }
    })

    Vue.prototype.$categories = siteCategories
    Vue.prototype.$tags = siteTags

    setRouter(router, siteCategories, siteTags)
}