<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-index></blog-index>
            <blog-home></blog-home>
            <blog-footer></blog-footer>
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

<style src="prismjs/themes/prism-tomorrow.css"></style>