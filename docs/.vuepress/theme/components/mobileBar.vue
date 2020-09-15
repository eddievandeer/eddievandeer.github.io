<template>
      <div class="mobile-bar">
            <mobile-list></mobile-list>
            <div class="home-link">
                  <a href="/">
                        <h2 class="title">首页</h2>
                  </a>
            </div>
      </div>
</template>

<script>
      import mobileList from './mobileList'

      export default {
            data() {
                  return {

                  }
            },
            neme: 'mobileBar',
            components: {
                  mobileList
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .mobile-bar {
            display: none;

            .home-link {
                  @extend .flex;
                  width: 70%;
                  height: 100%;

                  a {
                        text-decoration: none;
                  }

                  .title {
                        font-size: 1.3rem;
                        margin-top: 0;
                        padding-top: 0;
                  }
            }
      }

      @media screen and (max-width: 768px) {
            .mobile-bar {
                  width: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
            }
      }
</style>