<template>
      <div class="blog-footer">
            <div class="beian">
                  <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
                        rel="noopener noreferrer">闽ICP备2021005292号-1</a>
            </div>
            <p>MIT Licensed | Copyright © 2020-present Vivek</p>
            <div class="support">
                  <span>本网站由</span>
                  <a href="https://www.upyun.com/" target="_blank" rel="noopener noreferrer">
                        <img height="30px"
                              src="https://cdn.jsdelivr.net/gh/eddievandeer/eddievandeer.github.io/docs/.vuepress/public/assets/img/upyun-logo.png"
                              alt="">
                  </a>
                  <span>提供 <b>CDN</b> 加速</span>
            </div>
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
            font-size: .9rem;
            background-color: #e9e9e9;
            border-top: 1px solid #d1d1d1;
            flex-direction: column;

            .beian a {
                  color: #0078e7;
                  transition: color .1s;

                  &:hover {
                        color: #db2828;
                  }
            }

            .support {
                  @extend .flex;
                  width: 100%;
                  height: 30px;

                  a {
                        @extend .flex;
                        margin: .2rem;
                  }
            }

            p {
                  text-align: center;
                  line-height: 26px;
            }
      }
</style>