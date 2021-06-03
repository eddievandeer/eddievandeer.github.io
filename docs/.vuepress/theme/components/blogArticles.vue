<template>
    <keep-alive>
        <div class="article-list">
            <div class="article-item" v-for="(page, index) in pages" :key="index">
                <div class="detail">
                    <a :href="page.regularPath">
                        <h1>{{page.title}}</h1>
                    </a>
                    <div class="post-meta">
                        <div class="post-time">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <time>{{page.frontmatter.postTime.substr(0, 10)}}</time>
                        </div>
                    </div>
                    <!-- <div class="detail-item" v-for="(item, index2) in getPageItems(page)"
                                    :key="index2">
                                    <span>{{ item }}</span>
                              </div> -->
                    <Content :pageKey="page.key" slot-key="abstract" />
                </div>
                <article-footer :page="page"></article-footer>
            </div>
            <page-controller :pageSize="pageSize" :total="total" :current-page="parseInt(pageNumber)"
                @page-change="handlePageChange($event)"></page-controller>
        </div>
    </keep-alive>
</template>

<script>
    export default {
        name: 'blogArticles',
        props: ['filted', 'pageNumber', 'path'],
        data() {
            return {
                pages: [],
                pageSize: 8,
                total: 0,
                start: 0,
                end: 0
            }
        },
        methods: {
            setPage(pageNumber = 1) {
                this.total = this.filted.length

                this.setRange(pageNumber)
            },
            setRange(pageNumber) {
                this.start = (pageNumber - 1) * this.pageSize
                this.end = pageNumber * this.pageSize

                if (this.end > this.total) this.end = this.total

                this.pages.length = 0

                for (let i = this.start; i < this.end; i++) {
                    if (this.filted[i] == undefined) break
                    this.pages.push(this.filted[i])
                }
            },
            handlePageChange({
                pageNumber
            }) {
                this.setPage(pageNumber)
                this.$router.push({
                    path: !this.path ? 
                        `/${window.location.pathname.split('/')[1]}/page/${pageNumber}` :
                        `/${this.path}/${pageNumber}`
                })
            }
        },
        beforeMount() {
            this.setPage(this.pageNumber ? this.pageNumber : 1)
        },
        watch: {
            $route(to, from) {
                if (to.path !== from.path) {
                    this.setPage(this.pageNumber ? this.pageNumber : 1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/detail.scss';
</style>