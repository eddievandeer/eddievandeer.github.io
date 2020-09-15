<template>
      <div class="mobile-bar-list" @click="controlList" @mouseleave="hideList">
            <button class="show-list">
                  <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
            <title-list></title-list>
      </div>
</template>

<script>
      import titleList from './titleList'

      export default {
            methods: {
                  controlList() {
                        let list = document.querySelector('.list-container')
                        list.classList.toggle('hide')
                  },
                  hideList() {
                        let list = document.querySelector('.list-container')
                        list.classList.add('hide')
                  },
            },
            name: 'mobileList',
            components: {
                  titleList
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

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
</style>