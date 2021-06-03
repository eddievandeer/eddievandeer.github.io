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
      import blogIndex from '../components/blogIndex'

      export default {
            components: {
                  blogHome,
                  blogIndex
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
                        let about = document.querySelector('#about')
                        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                        if (scrolled <= about.offsetTop - 120) {
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
            }
      }
</script>