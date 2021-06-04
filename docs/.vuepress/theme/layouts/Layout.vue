<template>
    <div class="theme-container">
        <blog-index></blog-index>
        <div class="blog-home">
            <div class="home-content">
                <!-- <div class="blog-icon"></div> -->
                <div class="blog-description">
                    <h1>{{ $page.frontmatter.title }}</h1>
                    <p>本博客网站基于HTML5开发，若无法正常访问请更换高版本浏览器</p>
                </div>
            </div>
            <drop-down></drop-down>
            <div class="cloud">
                <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" fill="white">
                        </path>
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" opacity="0.7">
                            <path id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                fill="white"></path>
                        </use>
                        <use xlink:href="#gentle-wave" x="48" y="3" opacity="0.5">
                            <path id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                fill="white"></path>
                        </use>
                        <use xlink:href="#gentle-wave" x="48" y="5" opacity="0.3">
                            <path id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                fill="white"></path>
                        </use>
                        <use xlink:href="#gentle-wave" x="48" y="7">
                            <path id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                fill="white"></path>
                        </use>
                    </g>
                </svg>
            </div>
        </div>
        <blog-home></blog-home>
    </div>
</template>

<script>
    import blogHome from '@theme/components/blogHome'
    import dropDown from '@theme/components/dropDown'
    import blogIndex from '../components/blogIndex'

    export default {
        components: {
            blogHome,
            blogIndex,
            dropDown
        },
        data() {
            return {
                interval: null,
                slidesLock: false
            }
        },
        methods: {
            mobileScroll() {
                if (window.location.pathname != '/') {
                    return
                }
                let header = document.querySelector('.blog-header')
                let home = document.querySelector('.blog-home')
                let scrolled = document.documentElement.scrollTop || document.body.scrollTop

                if (scrolled <= home.scrollHeight - 120) {
                    header.classList.add('hide')
                } else {
                    header.classList.remove('hide')
                }
                return false
            }
        },
        mounted() {
            let top = document.querySelector('.global-ui')
            let main = document.querySelector('.theme-container')

            top.addEventListener('click', () => {
                let header = document.querySelector('.blog-header')
                header.classList.add('hide')
            })
            main.addEventListener('touchmove', this.mobileScroll, false)
            console.log(this.$categories);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .blog-home {
        @extend .flex;
        width: 100%;
        height: 100vh;
        // background-image: url("../../public/assets/img/background.jpg");
        // background-size: cover;

        &::before {
            content: '';
            z-index: -10;
            width: 100%;
            height: 100%;
            // background-image: url(https://i.loli.net/2020/09/11/ElcNrtJVkPWamOo.jpg);
            background-image: url("http://upyun.cavalheiro.cn/images/background.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center top;
            filter: brightness(80%);
            position: absolute;
            top: 0;
            left: 0;
        }

        .home-content {
            @extend .flex-column;

            // .blog-icon {
            //       width: 260px;
            //       height: 260px;
            //       // background-image: url(https://i.loli.net/2020/09/12/wdN45JRBkQtsfhj.jpg);
            //       background-image: url("../../public/assets/img/logo.jpg");
            //       background-size: cover;
            //       box-sizing: border-box;
            //       border-radius: 20px;
            //       border: 5px solid white;
            //       display: none;
            // }

            .blog-description {
                @extend .flex-column;
                margin-top: 150px;

                h1 {
                    font-size: 46px;
                    color: rgb(148, 188, 218);
                }

                p {
                    color: rgb(209, 209, 209);
                    text-align: center;
                    line-height: 26px;
                }
            }
        }
    }

    .blog-articles {
        margin-top: 5rem;
    }

    @media screen and (max-width: 768px) {

        .blog-description {
            margin-top: 80px !important;

            p {
                width: 80%;
            }
        }
    }

    @media screen and (max-width: 320px) {
        .blog-description h1 {
            font-size: 40px;
        }
    }

    .cloud {
        display: flex;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: $cloud-z-index;
        box-sizing: border-box;
        mix-blend-mode: overlay;

        .waves {
            display: flex;
            position: relative;
            width: 100%;
            height: 100px;

            @media (max-width: 768px) {
                height: 40px;
            }
        }

        .parallax {
            >use {
                animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
            }

            >use:nth-child(1) {
                animation-delay: -2s;
                animation-duration: 7s;
            }

            >use:nth-child(2) {
                animation-delay: -3s;
                animation-duration: 10s;
            }

            >use:nth-child(3) {
                animation-delay: -4s;
                animation-duration: 13s;
            }

            >use:nth-child(4) {
                animation-delay: -5s;
                animation-duration: 20s;
            }
        }
    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }

        100% {
            transform: translate3d(85px, 0, 0);
        }
    }
</style>