<template>
    <div class="home-page">
        <blog-header></blog-header>
        <div class="blog-articles">
            <blog-articles :pageNumber="pageNumber" :filted="pages" path="page"></blog-articles>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import blogArticles from './blogArticles'

    export default {
        name: 'blogHome',
        components: {
            blogArticles
        },
        props: ['pageNumber'],
        data() {
            return {
                main: null,
                pages: [],
                scrollOffset: 0,
                mouseEvent: '',
                inSlides: true,
                slidesLock: false
            }
        },
        mounted() {
            this.bindEvent()
        },
        beforeMount() {
            this.pages = this.$site.pages.filter(v => {
                return v.path.endsWith('html')
            })
        },
        methods: {
            bindEvent() {
                this.main = document.querySelector('.theme-container')
                this.mouseEvent =
                    document.onmousewheel !== undefined ?
                    "mousewheel" :
                    "DOMMouseScroll"

                if (this.mouseEvent == "mousewheel") {
                    this.main.addEventListener(
                        "mousewheel",
                        e => {
                            let y = -0.83 * e.wheelDelta
                            this.onMouseWheel(e, y)
                        },
                        false
                    );
                } else if (this.mouseEvent == "DOMMouseScroll") {
                    this.main.addEventListener(
                        "DOMMouseScroll",
                        e => {
                            console.log(e)
                            this.onMouseWheel(e, e.detail)
                        },
                        false
                    );
                    this.main.addEventListener(
                        "MozMousePixelScroll",
                        e => {
                            console.log(e)
                            this.onMouseWheel(e, e.detail)
                        },
                        false
                    );
                } else {
                    this.main.addEventListener(
                        this.mouseEvent,
                        e => {
                            let y = e.deltaY
                            if (e.deltaMode == 1) {
                                y = e.deltaY * 32
                            }
                            this.onMouseWheel(e, y)
                        },
                        false
                    );
                }
            },
            onMouseWheel(e, deltaY) {
                let event = e || window.event
                let offset = this.main.getBoundingClientRect().top

                if (!this.ifInSlide(deltaY, offset)) return

                this.scrollOffset = document.documentElement.scrollTop || document.body.scrollTop

                if (event.preventDefault) {
                    event.preventDefault()
                    event.stopPropagation()
                } else if (document.all) {
                    event.cancelBubble = true
                    event.returnValue = false
                } else {
                    event.stopPropagation()
                }

                if ((window.location.pathname != '/' || this.slidesLock) && window.location.pathname.split('/')[1] != 'page') return

                this.slidesLock = true

                this.doScroll(deltaY)
            },
            doScroll(deltaY) {
                let header = document.querySelector('.blog-header')
                let home = document.querySelector('.blog-home')
                if (deltaY > 0) {
                    window.scrollTo(0, home.scrollHeight)
                    header.classList.remove('hide')
                } else {
                    window.scrollTo(0, 0)
                    header.classList.add('hide')
                }

                this.interval = setTimeout(() => {
                    this.slidesLock = false
                }, 500)
            },
            ifInSlide(deltaY, offset) {
                let home = document.querySelector('.blog-home')
                return deltaY > 0 ?
                    (-offset < home.offsetHeight - 1) :
                    (-offset <= home.scrollHeight + 80)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .blog-home {
        @extend .flex;
        width: 100%;
        height: 100vh;

        &::before {
            content: '';
            z-index: -10;
            width: 100%;
            height: 100%;
            // background-image: url(https://i.loli.net/2020/09/11/ElcNrtJVkPWamOo.jpg);
            background-image: url("../../public/assets/img/background.jpg");
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
</style>