<template>
      <div class="blog-footer">
            <p>MIT Licensed | Copyright © 2020-present eddievandeer</p>
      </div>
</template>

<script>
      export default {
            name: 'blogFooter'
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .blog-footer {
            @extend .flex;
            width: 100%;
            height: 160px;
            background-color: #e9e9e9;
            border-top: 1px solid #d1d1d1;

            p {
                  text-align: center;
                  line-height: 26px;
            }
      }
</style>