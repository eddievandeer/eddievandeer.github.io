<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-index></blog-index>
            <div class="about">
                  <Content />
            </div>
            <blog-articles :pages="pages"></blog-articles>
            <blog-footer></blog-footer>
      </div>
</template>

<script>
      import blogArticles from '../components/blogArticles'
      import blogIndex from '../components/blogIndex'

      export default {
            components: {
                  blogArticles,
                  blogIndex
            },
            data() {
                  return {
                        pages: [],
                        url: ''
                  }
            },
            methods: {
                  setPage() {
                        this.pages = []
                        let path = ""
                        this.url = window.location.pathname.split('/')[1]
                        let filted = this.$site.pages.filter(v => {
                              return v.path.endsWith('html')
                        })
                        for (let i = 0; i < filted.length; i++) {
                              path = filted[i].regularPath.split('/')[1]
                              if (path == this.url) {
                                    this.pages.push(filted[i])
                              }
                        }
                  },
                  pageChange(to, from) {
                        this.url = window.location.pathname.split('/')[1]
                        this.setPage()
                  }
            },
            mounted() {
                  this.setPage()
            },
            watch: {
                  '$route': 'pageChange'
            }
      }
</script>

<style lang="scss" scoped>
      .about {
            width: 50%;
            height: auto;
            margin: 0 auto;
            margin-bottom: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
      }

      @media screen and (max-width: 768px) {
            .about {
                  width: 100%;
                  padding: 0 30px;
                  box-sizing: border-box;
            }
      }
</style>