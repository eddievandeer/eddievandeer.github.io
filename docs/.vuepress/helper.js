import ArticleList from './theme/layouts/ArticleList.vue'
import Category from './theme/layouts/Category.vue'
import Tag from './theme/layouts/Tag.vue'
import blogHome from './theme/components/blogHome.vue'

export function countCategories(page, siteCategories) {
    let key, childCategory = null

    if (page.frontmatter.categories) {
        const categories = page.frontmatter.categories

        if (Array.isArray(categories)) {
            if (categories.length > 2) throw RangeError('分类的层级不能超过2层！')
            key = categories[0]
            childCategory = categories[1]
        }
        else {
            key = categories
        }
    } else {
        key = '默认分类'
        console.log(page);
    }

    if (siteCategories.has(key)) {
        siteCategories.get(key).length++
        siteCategories.get(key).pages.push(page)

        if (childCategory != null) {
            const children = siteCategories.get(key).children

            if (children.has(childCategory)) {
                children.get(childCategory).length++
                children.get(childCategory).pages.push(page)
            } else {
                children.set(childCategory, {
                    length: 1,
                    pages: [page]
                })
            }
        }
    } else {
        const categoryObj = {
            length: 1,
            pages: [page]
        }
        if (childCategory != null) {
            categoryObj.children = new Map()

            categoryObj.children.set(childCategory, {
                length: 1,
                pages: [page]
            })
        }
        siteCategories.set(key, categoryObj)
    }
}

export function countTags(page, siteTags) {
    if (page.frontmatter.tags) {
        const tags = page.frontmatter.tags
        for (let tag of tags) {
            if (siteTags.has(tag)) {
                siteTags.get(tag).length++
                siteTags.get(tag).pages.push(page)
            }
            else {
                const categoryObj = {
                    length: 1,
                    pages: [page]
                }
                siteTags.set(tag, categoryObj)
            }
        }
    }
}

export function setRouter(router, siteCategories, siteTags) {
    router.addRoutes([{
        path: '/categories/:category',
        component: Category,
        props: true,
        beforeEnter: (to, from, next) => {
            if (siteCategories.has(to.params.category)) {
                next()
            } else {
                next('/404')
            }
        }
    }, {
        path: '/categories/:category/page/:pageNumber',
        component: Category,
        props: true
    }, {
        path: '/categories/:category/:child',
        component: Category,
        props: true
    }, {
        path: '/categories/:category/:child/page/:pageNumber',
        component: Category,
        props: true
    }, {
        path: '/tags/:tag',
        component: Tag,
        props: true,
        beforeEnter: (to, from, next) => {
            if (siteTags.has(to.params.tag)) {
                next()
            } else {
                next('/404')
            }
        }
    }, {
        path: '/tags/:tag/page/:pageNumber',
        component: Tag,
        props: true
    }, {
        name: 'page',
        path: '/page/:pageNumber',
        component: blogHome,
        props: true
    }, {
        path: '/*/page/:pageNumber',
        component: ArticleList,
        props: true
    }])
}