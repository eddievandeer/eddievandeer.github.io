<template>
    <client-only>
        <div class="tag-container">
            <blog-header></blog-header>
            <div class="blog-tag">
                <div class="tag-tile">
                    <h1><i class="fa fa-tag" aria-hidden="true"></i>{{tag}}</h1>
                </div>
                <Archive :pages="pages"></Archive>
                <page-controller :pageSize="pageSize" :total="total" :current-page="parseInt(pageNumber)"
                    @page-change="handlePageChange($event)">
                </page-controller>
            </div>
            <blog-footer></blog-footer>
        </div>
    </client-only>
</template>

<script>
    import blogArticles from '../components/blogArticles'
    import Archive from '../components/Archive'

    export default {
        components: {
            blogArticles,
            Archive
        },
        props: [
            'tag',
            'pageNumber'
        ],
        data() {
            return {
                pages: new Map(),
                pageSize: 6,
                total: 0
            }
        },
        methods: {
            setPage(pageNumber) {
                let start = (pageNumber - 1) * this.pageSize
                let end = pageNumber * this.pageSize

                const filted = this.$tags.get(this.tag).pages

                this.total = filted.length

                this.pages.clear()

                for (let i = start; i < end; i++) {
                    if (filted[i] == undefined) break
                    const postYear = filted[i].frontmatter.postTime.slice(0, 4)

                    if (this.pages.has(postYear)) {
                        this.pages.get(postYear).push(filted[i])
                    } else {
                        this.pages.set(postYear, [filted[i]])
                    }
                }
            },
            handlePageChange({
                pageNumber
            }) {
                this.setPage(pageNumber)
                this.$router.push({
                    path: `/tags/${this.tag}/page/${pageNumber}`
                })
            }
        },
        beforeMount() {
            this.setPage(this.pageNumber ? this.pageNumber : 1)
            document.title = this.tag
        },
        watch: {
            $route(to, from) {
                if (to.path !== from.path) {
                    this.setPage(this.pageNumber)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .tag-container {
        min-height: 100vh;
        @extend .flex-column;
        justify-content: space-between;

        .blog-tag {
            min-width: 30%;
            flex: 1;
            @extend .flex-column;
            justify-content: space-between;

            .tag-tile {
                width: fit-content;

                i {
                    margin-right: .6rem;
                }
            }
        }
    }
</style>