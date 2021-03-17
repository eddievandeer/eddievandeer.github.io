<template>
      <div class="home-page" ref="main">
            <div class="blog-home">
                  <div class="home-content">
                        <!-- <div class="blog-icon"></div> -->
                        <div class="blog-description">
                              <h1>{{ $page.frontmatter.title }}</h1>
                              <p>本博客网站基于HTML5开发，若无法正常访问请更换高版本浏览器</p>
                        </div>
                  </div>
                  <drop-down></drop-down>
            </div>
            <about-me></about-me>
      </div>
</template>

<script>
      import dropDown from './dropDown'
      import aboutMe from './aboutMe'

      export default {
            name: 'blogHome',
            components: {
                  dropDown,
                  aboutMe
            },
            data() {
                  return {
                        scrollOffset: 0,
                        mouseEvent: '',
                        inSlides: true,
                        slidesLock: false
                  }
            },
            mounted() {
                  this.bindEvent()
            },
            methods: {
                  bindEvent() {
                        let main = this.$refs.main
                        this.mouseEvent =
                              document.onmousewheel !== undefined ?
                              "mousewheel" :
                              "DOMMouseScroll"

                        if (this.mouseEvent == "mousewheel") {
                              main.addEventListener(
                                    "mousewheel",
                                    e => {
                                          let y = -0.83 * e.wheelDelta
                                          this.onMouseWheel(e, y)
                                    },
                                    false
                              );
                        } else if (this.mouseEvent == "DOMMouseScroll") {
                              main.addEventListener(
                                    "DOMMouseScroll",
                                    e => {
                                          console.log(e)
                                          this.onMouseWheel(e, e.detail)
                                    },
                                    false
                              );
                              main.addEventListener(
                                    "MozMousePixelScroll",
                                    e => {
                                          console.log(e)
                                          this.onMouseWheel(e, e.detail)
                                    },
                                    false
                              );
                        } else {
                              main.addEventListener(
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
                        let main = this.$refs.main
                        let offset = this.$refs.main.getBoundingClientRect().top

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

                        if (window.location.pathname != '/' || this.slidesLock) return

                        this.slidesLock = true

                        this.doScroll(deltaY)
                  },
                  doScroll(deltaY) {
                        let header = document.querySelector('.blog-header')
                        let home = document.querySelector('.blog-home')
                        let about = document.querySelector('#about')
                        if (deltaY > 0) {
                              window.scrollTo(0, about.scrollHeight)
                              header.classList.remove('hide')
                        } else {
                              window.scrollTo(0, 0)
                              header.classList.add('hide')
                        }

                        this.interval = setTimeout((scrolled) => {
                              this.slidesLock = false
                        }, 500)
                  },
                  ifInSlide(deltaY, offset) {
                        let about = document.querySelector('#about')
                        return deltaY > 0 ? (-offset < about.offsetHeight - 1) : (-offset <= about.scrollHeight + 80)
                  },
                  gsScrollControl() {
                        isScrolling = true;

                        // scroll end
                        if (scrollTimeCurrent > scrollTime) {
                              if (scrollLockTime > 0) {
                                    setTimeout(endScroll, scrollLockTime);
                                    return;
                              }
                              endScroll();
                              return;
                        }

                        let x = scrollTimeCurrent / scrollTime;
                        let y = 1 - Math.pow(1 - x, scrollScale);
                        scrollElement.scrollTop = scrollStart + y * scrollOffset;
                        scrollTimeCurrent += scrollInterval;

                        setTimeout(gsScrollControl, scrollInterval);
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