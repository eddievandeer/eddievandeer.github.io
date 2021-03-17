<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-index :sidebar="ifMobile()"></blog-index>
            <div class="article" @click="togglePagination()">
                  <div class="article-detail">
                        <Content />
                        <Valine></Valine>
                  </div>
            </div>
            <pagination :style="{opacity:showPagination?0:1}" :pages="pages"></pagination>
      </div>
</template>

<script>
      import blogIndex from '../components/blogIndex'
      import Pagination from '../components/Pagination'
      import {
            parsePage
      } from '../util/utils'

      export default {
            components: {
                  blogIndex,
                  Pagination
            },
            data() {
                  return {
                        showPagination: false,
                        pages: []
                  }
            },
            mounted() {
                  this.pages = parsePage(this.$site.pages, this.$page.path)
            },
            methods: {
                  togglePagination() {
                        this.showPagination = !this.showPagination
                  }
            },
            computed: {
                  ifMobile() {
                        const Reg =
                              /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i

                        // return navigator.platform.indexOf('Win') == 0
                        return Reg.test(navigator.userAgent)
                  }
            }
      }
</script>

<style lang="scss" scoped>
      .theme-container {
            position: relative;
      }

      .article {
            display: block;
            padding-left: 20rem;

            .article-detail {
                  max-width: 740px;
                  margin: 0 auto;
                  padding: 2rem 2rem;
            }
      }

      @media screen and (max-width: 768px) {
            .article {
                  padding-left: 0;
            }
      }
</style>