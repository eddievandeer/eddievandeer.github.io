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
            methods: {
                  onScroll(e) {
                        if (window.location.pathname != '/') {
                              return
                        }
                        let event = e || window.event
                        let header = document.querySelector('.blog-header')
                        let home = document.querySelector('.blog-home')
                        let about = document.querySelector('#about')
                        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                        if (event.wheelDelta < 0 || event.detail > 0) {
                              if (scrolled <= about.offsetTop - 1) {
                                    if (event.preventDefault) {
                                          event.preventDefault()
                                    } else {
                                          event.returnValue = false
                                    }
                                    window.scrollTo(0, about.offsetTop)
                                    header.classList.remove('hide')
                              }
                        } else {
                              if (scrolled <= about.offsetTop + 60) {
                                    if (event.preventDefault) {
                                          event.preventDefault()
                                    } else {
                                          event.returnValue = false
                                    }
                                    window.scrollTo(0, 0)
                                    header.classList.add('hide')
                              }
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
                  main.addEventListener('DOMMouseScroll', this.onScroll)
                  main.addEventListener('wheel', this.onScroll, false)
            },
            components: {
                  blogHome
            }
      }
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>