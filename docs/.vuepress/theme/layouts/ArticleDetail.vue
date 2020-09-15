<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <blog-index></blog-index>
            <div class="article">
                  <div class="article-detail">
                        <Content />
                  </div>
            </div>
      </div>
</template>

<script>
      import blogIndex from '../components/blogIndex'

      export default {
            components: {
                  blogIndex,
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
      }

      .article-detail {
            max-width: 740px;
            margin: 0 auto;
            padding: 2rem 2.5rem;
      }

      @media screen and (max-width: 768px) {
            .article {
                  padding-left: 0;
            }
      }
</style>