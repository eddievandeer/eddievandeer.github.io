<template>
      <div class="mobile-bar">
            <div class="mobile-bar-list" @click="controlList" @mouseleave="hideList">
                  <button class="show-list">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                  </button>
            </div>
            <div class="home-link">
                  <a href="/">
                        <h2 class="title">首页</h2>
                  </a>
            </div>
      </div>
</template>

<script>
      export default {
            neme: 'mobileBar',
            data() {
                  return {

                  }
            },
            methods: {
                  controlList() {
                        let list = document.querySelector('.list-container')
                        list.classList.toggle('hide')
                  },
                  hideList() {
                        let list = document.querySelector('.list-container')
                        list.classList.add('hide')
                  },
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .mobile-bar {
            display: none;

            .mobile-bar-list {
                  position: absolute;
                  padding: .6rem;
                  top: .6rem;
                  left: 1rem;

                  .show-list {
                        color: $word-color;
                        font-size: 20px;
                  }
            }

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