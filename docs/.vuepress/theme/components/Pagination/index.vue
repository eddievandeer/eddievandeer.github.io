<template>
    <div class="pagination-wrapper">
        <div class="pagination-pre" v-show="prePath.length > 0">
            <router-link :to="prePath">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </router-link>
        </div>
        <div class="pagination-next" v-show="nextPath.length > 0">
            <router-link :to="nextPath">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import parsePage from './parsePage'

    export default {
        name: 'Pagination',
        props: ['pages'],
        data() {
            return {
                prePath: '',
                nextPath: ''
            }
        },
        mounted() {
            this.initPage()
        },
        watch: {
            $route(to, from) {
                this.initPage()
                console.log(1);
            }
        },
        methods: {
            initPage() {
                const site = this.$site
                const nowPages = parsePage(site.pages, this.$page.path)
                const nowPageKey = this.$page.key

                for (let i = 0; i < nowPages.length; i++) {
                    const page = nowPages[i]
                    const prePage = nowPages[i - 1]
                    const nextPage = nowPages[i + 1]
                    if (page.key == nowPageKey) {
                        this.prePath = prePage ? prePage.path : ''
                        this.nextPath = nextPage ? nextPage.path : ''
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/values.scss';

    .pagination-wrapper {
        z-index: 10;
        width: 100%;
        height: calc(100vh - 60px);
        transition: opacity .2s ease-in-out;
        position: fixed;
        bottom: 0px;
        right: 0px;
        pointer-events: none;

        .pagination-pre,
        .pagination-next {
            height: 15%;
            width: 40px;
            background-color: rgba(0, 0, 0, .2);
            cursor: pointer;
            pointer-events: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;

            a {
                color: $primary-background;
                font-size: 30px;
            }
        }

        .pagination-pre {
            left: 0;
        }

        .pagination-next {
            right: 0;
        }
    }

    @media screen and (min-width: 1024px) {
        .pagination-wrapper {
            display: none;
        }
    }
</style>