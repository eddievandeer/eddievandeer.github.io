<template>
    <client-only>
        <div class="category-container">
            <blog-header></blog-header>
            <div class="blog-category">
                <div class="category-tile">
                    <h1><i class="fa fa-folder-o" aria-hidden="true"></i>{{child ? child : category}}</h1>
                </div>
                <Archive :pages="pages"></Archive>
            </div>
            <page-controller :pageSize="pageSize" :total="total" :current-page="parseInt(pageNumber)"
                @page-change="handlePageChange($event)">
            </page-controller>
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
            'category',
            'child',
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

                const filted = this.child ?
                    this.$categories.get(this.category).children.get(this.child).pages :
                    this.$categories.get(this.category).pages

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
                    path: `/categories/${this.category}${this.child ? '/' + this.child : ''}/page/${pageNumber}`
                })
            }
        },
        beforeMount() {
            this.setPage(this.pageNumber ? this.pageNumber : 1)
            document.title = this.child ? this.child : this.category
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

    .category-container {
        min-height: 100vh;
        @extend .flex-column;
        justify-content: space-between;

        .blog-category {
            min-width: 30%;
            flex: 1;
            padding: 0 2rem;
            box-sizing: border-box;
            @extend .flex-column;
            justify-content: flex-start;

            .category-tile {
                width: fit-content;

                i {
                    margin-right: .6rem;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .blog-category {
            width: 100%;
        }
    }
</style>