<template>
    <div class="theme-container">
        <blog-header></blog-header>
        <blog-index></blog-index>
        <div class="about">
            <Content />
        </div>
        <blog-articles :filted="filted" :pageNumber="pageNumber"></blog-articles>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import blogArticles from '../components/blogArticles'
    import blogIndex from '../components/blogIndex'

    export default {
        components: {
            blogArticles,
            blogIndex,
        },
        props: ['pageNumber'],
        data() {
            return {
                filted: []
            }
        },
        methods: {
            filtPage() {
                this.filted = this.$site.pages.filter(v => {
                    return v.path.endsWith('html') && v.regularPath.split('/')[1] == window.location.pathname
                        .split('/')[1]
                })

                this.filted.sort((a, b) => {
                    return (new Date(b.frontmatter.postTime) - new Date(a.frontmatter.postTime))
                })
            }
        },
        beforeMount() {
            this.filtPage()
        },
        watch: {
            $route(to, from) {
                if (to.path !== from.path) {
                    this.filtPage()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        width: 50%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 768px) {
        .about {
            width: 100%;
            padding: 0 30px;
            box-sizing: border-box;
        }
    }
</style>