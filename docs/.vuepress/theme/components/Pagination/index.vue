<template>
    <div class="pagination-wrapper">
        <div class="pagination-pre" v-show="prePath.length > 0">
            <router-link :to="prePath">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                <span>{{preTitle}}</span>
            </router-link>
        </div>
        <div class="pagination-next" v-show="nextPath.length > 0">
            <router-link :to="nextPath">
                <span>{{nextTitle}}</span>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import parsePage from './parsePage'

    export default {
        name: 'Pagination',
        data() {
            return {
                prePath: '',
                nextPath: '',
                preTitle: '',
                nextTitle: ''
            }
        },
        mounted() {
            this.initPage()
        },
        watch: {
            $route(to, from) {
                this.initPage()
            }
        },
        methods: {
            initPage() {
                const nowPages = parsePage(this.$site.pages),
                    nowPageKey = this.$page.key

                for (let i = 0; i < nowPages.length; i++) {
                    const page = nowPages[i]
                    const prePage = nowPages[i - 1]
                    const nextPage = nowPages[i + 1]
                    if (page.key == nowPageKey) {
                        this.prePath = prePage ? prePage.path : ''
                        this.nextPath = nextPage ? nextPage.path : ''
                        this.preTitle = prePage ? prePage.title : ''
                        this.nextTitle = nextPage ? nextPage.title : ''
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/values.scss';

    .pagination-wrapper {
        width: 100%;
        min-height: 20px;
        margin-top: 3rem;
        transition: opacity .2s ease-in-out;
        pointer-events: none;

        .pagination-pre,
        .pagination-next {
            // height: 15%;
            max-width: 50%;
            // background-color: rgba(0, 0, 0, .2);
            cursor: pointer;
            pointer-events: auto;
            @extend .flex;

            a {
                color: $word-color;
                font-size: 14px;
                text-decoration: none;

                span {
                    max-width: 90%;
                    line-height: 1.4;
                }

                &:hover {
                    color: $word-color-blue;
                }
            }
        }

        .pagination-pre {
            float: left;
        }

        .pagination-next {
            float: right;
        }
    }
</style>