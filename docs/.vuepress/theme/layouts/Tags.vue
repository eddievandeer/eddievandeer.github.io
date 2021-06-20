<template>
    <div class="tags-container">
        <blog-header></blog-header>
        <div class="blog-tags">
            <h2>标签</h2>
            <p>共计 {{total}} 个标签</p>
            <ul class="tag-list">
                <li class="tag-list-item" v-for="(tag, index) in $tags" :key="index">
                    <div class="tag-list-primary">
                        <a :href="tag[0]" :style="countSize(tag[1].pages.length)">
                            <span>{{tag[0]}}</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import blogIndex from '../components/blogIndex'

    export default {
        components: {
            blogIndex
        },
        data() {
            return {
                total: 0,
                tagSize: {
                    xs: 'font-size: 12px; color: hsl(204deg 20% 67%)',
                    s: 'font-size: 14px; color: hsl(204deg 36% 67%)',
                    m: 'font-size: 18px; color: hsl(204deg, 53%, 67%)',
                    l: 'font-size: 22px; color: hsl(204deg, 75%, 67%)',
                    xl: 'font-size: 30px; color: hsl(204deg, 100%, 67%)'
                }
            }
        },
        mounted() {
            this.total = this.$tags.size
        },
        methods: {
            countSize(tagNum) {
                if(tagNum == 1) {
                    return this.tagSize.xs
                } else if(tagNum < 3) {
                    return this.tagSize.s
                } else if(tagNum < 4) {
                    return this.tagSize.m
                } else if(tagNum < 5) {
                    return this.tagSize.l
                } else {
                    return this.tagSize.xl
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .tags-container {
        min-height: 100vh;
        @extend .flex-column;
        justify-content: space-between;
    }

    .blog-tags {
        flex: 1;
        padding: 1rem 5rem 2rem;
        box-sizing: border-box;
        @extend .flex-column;
        justify-content: flex-start;

        .tag-list {
            width: 60%;
            list-style: none;

            .tag-list-item {
                display: inline-block;
                margin: 0 .4rem;

                a {
                    text-decoration: none;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .blog-tags {
            padding: 1rem 1rem 2rem;

            .tag-list {
                width: 100%;
                padding: 0;
            }
        }
    }
</style>