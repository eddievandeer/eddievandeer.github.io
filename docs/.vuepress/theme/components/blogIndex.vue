<template>
      <div class="index-container">
            <title-list :sidebar="sidebar"></title-list>
      </div>
</template>

<script>
      import titleList from './titleList'

      export default {
            name: 'blogIndex',
            props: ['sidebar'],
            components: {
                  titleList
            }
      }
</script>

<style lang="scss" scoped>
      // @import '../styles/values.scss';

      // .index-container {
      //       font-size: 16px;
      //       width: 20rem;
      //       z-index: 10;
      //       margin: 0;
      //       padding: 0 15px;
      //       position: fixed;
      //       top: 60px;
      //       left: 0;
      //       bottom: 0;
      //       box-sizing: border-box;
      // }

      // @media screen and (min-width: 768px) {
      //       .index-container {
      //             display: none;
      //       }
      // }
</style>