<template>
    <div class="article-footer">
        <div class="article-category">
            <div class="article-category-custom" v-if="page.frontmatter.categories">
                <span v-if="!Array.isArray(page.frontmatter.categories)">
                    <a :href="'/categories/' + page.frontmatter.categories">
                        <i class="fa fa-folder-o" aria-hidden="true"></i>
                        {{page.frontmatter.categories}}
                    </a>
                </span>
                <span v-else v-for="(category, index) in page.frontmatter.categories" :key="index">
                    <a :href="'/categories/' + category">
                        <i class="fa fa-folder-o" aria-hidden="true" v-if="index == 0"></i>
                        <i class="fa fa-angle-double-right" aria-hidden="true" v-else></i>
                        {{category}}
                    </a>
                </span>
            </div>
            <a href="/categories/默认分类" v-else>
                <i class="fa fa-folder-o" aria-hidden="true"></i>
                <span>默认分类</span>
            </a>
        </div>
        <div class="article-tags">
            <div :class="['article-tag', getColor()]" v-for="(tag, index) in page.frontmatter.tags" :key="index">
                <a class="tag-name" href="">
                    <i class="fa fa-tag" aria-hidden="true"></i>
                    <span>{{tag}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'articleFooter',
        props: {
            page: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                colors: ['cyan', 'green', 'magenta', 'yellow', 'blue', 'black', 'white']
            }
        },
        methods: {
            getColor() {
                return this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .article-footer {
        width: 100%;
        min-height: 3rem;
        padding: 0 8px;
        box-sizing: border-box;
        @extend .flex;
        justify-content: space-between;

        .article-category {
            font-size: .8rem;
            text-align: center;

            a {
                width: fit-content;
                padding: 4px 2px;
                color: $word-color-blue-light;
                position: relative;

                &::after {
                    background-color: rgba(0, 120, 231, .08);
                }
            }
        }

        .article-tags {
            margin-left: 1rem;
            @extend .flex;
            flex-wrap: wrap;

            .article-tag {
                font-size: .8rem;
                text-align: center;
                padding: 4px 2px;
                // border-radius: 20px;
                // border: 1px solid;
                cursor: pointer;
                position: relative;

                @each $color,
                $hash in $colors {
                    &.#{$color} a {
                        color: $hash;
                    }

                    &.#{$color}::after {
                        background: transparentize($hash, .82);
                    }
                }
            }
        }

        .article-category a,
        .article-tags .article-tag {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                height: 100%;
                width: 0;
                right: 0;
                border-radius: 4px;
                transition: width .2s ease;
            }

            &:hover::after {
                width: 104%;
                left: -2%;
            }
        }
    }
</style>