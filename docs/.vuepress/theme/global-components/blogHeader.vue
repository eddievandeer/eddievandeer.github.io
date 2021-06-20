<template>
      <div class="blog-header">
            <tool-bar></tool-bar>
            <blog-index></blog-index>
      </div>
</template>

<script>
      import toolBar from '../components/toolBar'
      import blogIndex from '../components/blogIndex'
      import {
            visibilityChange
      } from '../util/utils'
      import '../styles/header.scss'

      export default {
            name: 'blogHeader',
            mounted() {
                  let title = document.title

                  document.addEventListener(visibilityChange(document), function (evnet) {
                        let hidden = event.target.hidden
                        document.title = hidden ? '记得回来哦！' : title
                  })
                  if (window.location.pathname == '/') {
                        let header = document.querySelector('.blog-header')
                        header.classList.add('home')
                        header.classList.add('hide')
                  }
            },
            components: {
                  toolBar,
                  blogIndex
            }
      }
</script>