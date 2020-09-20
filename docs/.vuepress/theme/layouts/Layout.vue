<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-home></blog-home>
            <blog-footer></blog-footer>
      </div>
</template>

<script>
      import blogHome from '@theme/components/blogHome'
      export default {
            data() {
                  return {
                        interval: null
                  }
            },
            methods: {
                  stopScroll(e) {
                        let event = e || window.event
                        if (event.preventDefault) {
                              event.preventDefault()
                        } else {
                              event.returnValue = false
                        }
                  },
                  onScroll(e) {
                        if (window.location.pathname != '/') {
                              return
                        }
                        let event = e || window.event
                        let header = document.querySelector('.blog-header')
                        let home = document.querySelector('.blog-home')
                        let about = document.querySelector('#about')
                        let scrolled = document.documentElement.scrollTop || document.body.scrollTop

                        let main = document.querySelector('.theme-container')

                        if (event.wheelDelta < 0 || event.detail > 0) {
                              if (scrolled <= about.offsetTop - 1) {
                                    if (event.preventDefault) {
                                          event.preventDefault()
                                          event.stopPropagation()
                                    } else {
                                          evt.cancelBubble = true
                                          event.returnValue = false
                                    }
                                    main.removeEventListener('mousewheel', this.onScroll, false)
                                    main.removeEventListener('DOMMouseScroll', this.onScroll, false)
                                    main.removeEventListener('wheel', this.onScroll, false)
                                    main.addEventListener('mousewheel', this.stopScroll, false)
                                    main.addEventListener('DOMMouseScroll', this.stopScroll, false)
                                    main.addEventListener('wheel', this.stopScroll, false)
                                    window.scrollTo(0, about.offsetTop)
                                    header.classList.remove('hide')
                              }
                        } else {
                              if (scrolled <= about.offsetTop + 60) {
                                    if (event.preventDefault) {
                                          event.preventDefault()
                                          event.stopPropagation()
                                    } else {
                                          evt.cancelBubble = true
                                          event.returnValue = false
                                    }
                                    main.removeEventListener('mousewheel', this.onScroll, false)
                                    main.removeEventListener('DOMMouseScroll', this.onScroll, false)
                                    main.removeEventListener('wheel', this.onScroll, false)
                                    main.addEventListener('mousewheel', this.stopScroll, false)
                                    main.addEventListener('DOMMouseScroll', this.stopScroll, false)
                                    main.addEventListener('wheel', this.stopScroll, false)
                                    window.scrollTo(0, 0)
                                    header.classList.add('hide')
                              }
                        }
                        this.interval = setTimeout((scrolled) => {
                              let main2 = document.querySelector('.theme-container')
                              main2.removeEventListener('mousewheel', this.stopScroll, false)
                              main2.removeEventListener('DOMMouseScroll', this.stopScroll,
                                    false)
                              main2.removeEventListener('wheel', this.stopScroll, false)
                              main2.addEventListener('mousewheel', this.onScroll, false)
                              main2.addEventListener('DOMMouseScroll', this.onScroll, false)
                              main2.addEventListener('wheel', this.onScroll, false)
                        }, 500)
                        return false
                  },
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

                  main.addEventListener('mousewheel', this.onScroll, false)
                  main.addEventListener('DOMMouseScroll', this.onScroll, false)
                  main.addEventListener('wheel', this.onScroll, false)
                  main.addEventListener('touchmove', this.mobileScroll, false)
            },
            components: {
                  blogHome
            }
      }
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>