<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-index></blog-index>
            <div class="about">
                  <Content />
            </div>
            <blog-articles :pages="pages"></blog-articles>
            <div class="page-controller">
                  <div class="prev-page" v-if="pageNumber > 1">
                        <a :href="prePageUrl">
                              ←Prev Page
                        </a>
                  </div>
                  <div class="next-page" v-if="pageNumber < maxPageNumber">
                        <a :href="nextPageUrl">
                              Next Page→
                        </a>
                  </div>
            </div>
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
                        pageSize: 8,
                        pages: [],
                        url: '',
                        pageNumber: 1,
                        prePageUrl: '',
                        nextPageUrl: '',
                        maxPageNumber: 0
                  }
            },
            methods: {
                  setPage() {
                        const reg = /.?page=(.?)/
                        let pageHref = window.location.href

                        this.pageNumber = reg.test(pageHref) ? parseInt(pageHref.match(reg)[1]) : 1

                        this.pages = []

                        this.setRange()
                  },
                  setRange() {
                        let start = (this.pageNumber - 1) * this.pageSize
                        let end = this.pageNumber * this.pageSize

                        const filted = this.$site.pages.filter(v => {
                              return v.path.endsWith('html') && v.regularPath.split('/')[1] == this.url
                        })

                        filted.sort((a, b) => {
                              return (new Date(b.frontmatter.postTime) - new Date(a.frontmatter.postTime))
                        })

                        if (end > filted.length) end = filted.length

                        for (let i = start; i < end; i++) {
                              this.pages.push(filted[i])
                        }

                        this.maxPageNumber = Math.ceil(filted.length / this.pageSize)
                  },
                  setPageController() {
                        this.prePageUrl = '/' + this.url + '/?page=' + (this.pageNumber - 1)
                        this.nextPageUrl = '/' + this.url + '/?page=' + (this.pageNumber + 1)
                  },
                  pageChange(to, from) {
                        this.url = window.location.pathname.split('/')[1]
                        this.setPage()
                        this.setPageController()
                  }
            },
            mounted() {
                  this.url = window.location.pathname.split('/')[1]
                  this.setPage()
                  this.setPageController()
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

      .page-controller {
            width: 100%;
            height: 3rem;
            padding: 0 10rem;
            box-sizing: border-box;

            a {
                  color: #151515;
                  font-size: 14px;
                  text-decoration: none;
            }

            .prev-page {
                  float: left;
            }

            .next-page {
                  float: right;
            }
      }

      @media screen and (max-width: 768px) {
            .about {
                  width: 100%;
                  padding: 0 30px;
                  box-sizing: border-box;
            }
      }
</style>