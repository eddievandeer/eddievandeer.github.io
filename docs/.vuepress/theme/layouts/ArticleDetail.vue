<template>
    <div class="theme-container">
        <blog-header></blog-header>
        <blog-index :sidebar="!ifMobile"></blog-index>
        <div class="article">
            <div class="article-detail">
                <header class="post-header">
                    <div class="post-title">
                        <h1>{{$page.title}}</h1>
                    </div>
                    <div class="post-meta">
                        <div class="post-time">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <time>{{$page.frontmatter.postTime.substr(0, 10)}}</time>
                        </div>
                        <div class="post-count">
                            <i class="fa fa-file-word-o" aria-hidden="true"></i>
                            <span>{{wordCount > 1000 ? (wordCount / 1000).toString().match(/^\d+(?:\.\d{0,1})?/) + 'k' : wordCount}}</span>
                            <span>&nbsp;-&nbsp;</span>
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            <span>{{Math.round(wordCount/500) + Math.round(imageCount * 10 / 60) + 'm'}}</span>
                        </div>
                        <article-footer :page="$page"></article-footer>
                    </div>
                </header>
                <div class="article-content">
                    <Content />
                </div>
                <pagination></pagination>
                <Valine></Valine>
            </div>
            <blog-footer></blog-footer>
        </div>
    </div>
</template>

<script>
    import blogIndex from '../components/blogIndex'
    import Pagination from '../components/Pagination'
    import {
        parsePage
    } from '../util/utils'

    export default {
        components: {
            blogIndex,
            Pagination
        },
        data() {
            return {
                wordCount: 0,
                imageCount: 0,
                pages: [],
                ifMobile: false
            }
        },
        mounted() {
            const Reg =
                /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i

            this.pages = parsePage(this.$site.pages, this.$page.path)

            navigator.userAgent && (this.ifMobile = Reg.test(navigator.userAgent))

            this.countWords()
        },
        watch: {
            $route(to, from) {
                this.countWords()
            }
        },
        methods: {
            countWords() {
                const articleContent = document.querySelector('.article-content'),
                    articleImages = articleContent.querySelectorAll('.article-content img'),
                    articleText = articleContent.innerText.replace(
                        /<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,
                        ''
                    )
                    .replace(/<[^>]+?>/g, '')
                    .replace(/\s+/g, '')
                    .replace(/ /g, '')
                    .replace(/>/g, '')

                this.wordCount = articleText.length
                this.imageCount = articleImages.length
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .theme-container {
        position: relative;
    }

    .article {
        display: block;
        padding-left: 20rem;

        .article-detail {
            max-width: 740px;
            margin: 1.5rem auto;
            padding: 1rem 3rem;
            background-color: #fcfcfc;
            transition: box-shadow .1s ease-in-out;
            box-shadow: $card-shadow;

            .post-header {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .post-title {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .post-meta {
                    width: fit-content;
                    height: auto;
                    color: #555;
                    font-size: 14px;
                    font-family: Helvetica;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .post-time {
                        margin-bottom: .4rem;
                    }
                }
            }

            &:hover {
                box-shadow: $card-shadow-hover;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .article {
            padding-left: 0;

            .article-detail {
                padding: 1rem .6rem;

                .post-meta {
                    width: 100%;
                }
            }
        }
    }
</style>