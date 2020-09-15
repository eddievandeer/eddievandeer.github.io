<template>
      <div class="blog-header">
            <tool-bar></tool-bar>
      </div>
</template>

<script>
      import toolBar from '../components/toolBar'
      import '../styles/header.scss'

      export default {
            name: 'blogHeader',
            mounted() {
                  if (window.location.pathname == '/') {
                        let header = document.querySelector('.blog-header')
                        header.classList.add('home')
                        header.classList.add('hide')
                  }
            },
            components: {
                  toolBar
            }
      }
</script>