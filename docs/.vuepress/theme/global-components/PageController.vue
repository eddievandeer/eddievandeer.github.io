<template>
    <keep-alive>
        <div class="page-controller">
            <div class="prev-page">
                <button @click="handlePreClick" :class="{disabled: !(current > 1)}">
                    <i class="fa fa-angle-left" aria-hidden="true"></i> Previous
                </button>
            </div>
            <ul class="pager" @click="onPagerClick">
                <li class="number" :class="{ active: current === pager }" v-for="pager in pagers" :key="pager">
                    {{ pager }}
                </li>
            </ul>
            <div class="next-page">
                <button @click="handleNextClick" :class="{disabled: !(current < maxPageNumber)}">
                    Next <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </keep-alive>
</template>

<script>
    export default {
        props: {
            pageSize: {
                type: Number,
                default: 8
            },
            total: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number
            },
            pagerCount: {
                type: Number,
                default: 7
            }
        },
        data() {
            return {
                current: 1,
                url: '',
                prePageUrl: '',
                nextPageUrl: '',
                showPrevMore: false,
                showNextMore: false
            }
        },
        computed: {
            maxPageNumber() {
                return Math.ceil(this.total / this.pageSize)
            },
            pagers() {
                const pagerCount = this.pagerCount
                const halfPagerCount = (pagerCount - 1) / 2
                const currentPage = Number(this.currentPage)
                const pageCount = Number(this.maxPageNumber) + 1

                let showPrevMore = false
                let showNextMore = false

                if (pageCount > pagerCount) {
                    if (currentPage > pagerCount - halfPagerCount) {
                        showPrevMore = true
                    }
                    if (currentPage < pageCount - halfPagerCount) {
                        showNextMore = true
                    }
                }

                const array = []

                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (pagerCount - 2);
                    for (let i = startPage; i < pageCount; i++) {
                        array.push(i)
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 1; i < pagerCount; i++) {
                        array.push(i)
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pagerCount / 2) - 1
                    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                        array.push(i)
                    }
                } else {
                    for (let i = 1; i < pageCount; i++) {
                        array.push(i)
                    }
                }

                this.showPrevMore = showPrevMore
                this.showNextMore = showNextMore

                return array
            }
        },
        methods: {
            handlePreClick(event) {
                const target = event.target
                if (target.className.indexOf('disabled') !== -1 || target.parentNode.className.indexOf('disabled') !== -
                    1) {
                    return
                }

                this.current--
                this.$emit('page-change', {
                    pageNumber: this.current
                })
            },
            handleNextClick(event) {
                const target = event.target
                if (target.className.indexOf('disabled') !== -1 || target.parentNode.className.indexOf('disabled') !== -
                    1) {
                    return
                }

                this.current++
                this.$emit('page-change', {
                    pageNumber: this.current
                })
            },
            isDisabled() {

            },
            onPagerClick(event) {
                const target = event.target
                if (target.tagName === 'UL') {
                    return
                }

                let newPage = Number(event.target.textContent)
                const pageCount = this.pageCount

                if (!isNaN(newPage)) {
                    if (newPage < 1) {
                        newPage = 1
                    }
                    if (newPage > pageCount) {
                        newPage = pageCount
                    }
                }

                if (newPage !== this.current) {
                    this.current = newPage

                    this.$emit('page-change', {
                        pageNumber: this.current
                    })
                }
            }
        },
        mounted() {
            if (this.currentPage) {
                this.current = this.currentPage
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .page-controller {
        width: 100%;
        height: 3rem;
        // padding: 0 10rem;
        box-sizing: border-box;
        margin-top: 1rem;
        @extend .flex;

        a {
            color: #151515;
            font-size: 24px;
            text-decoration: none;
        }

        .prev-page {
            margin-right: 1rem;
        }

        .next-page {
            margin-left: 1rem;
        }

        .prev-page button,
        .next-page button {
            color: $word-color;
            font-size: 16px;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;

            i {
                margin: 0 .5rem;
            }

            &:hover {
                color: $word-color-blue-light;
            }

            &.disabled {
                color: #c0c4cc;
                cursor: not-allowed;
            }
        }

        .pager {
            width: fit-content;
            list-style: none;
            user-select: none;
            // display: inline-block;
            vertical-align: top;
            font-size: 0;
            padding: 0;
            margin: 0;

            li {
                display: inline-block;
                color: $word-color;
                font-size: 14px;
                font-weight: 400;
                min-width: 35.5px;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
                box-sizing: border-box;
                text-align: center;
                margin: 0;

                &:hover,
                &.active {
                    color: $word-color-blue-light;
                }
            }
        }
    }
</style>