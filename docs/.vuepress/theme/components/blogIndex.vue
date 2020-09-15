<template>
      <div class="index-container">
            <title-list></title-list>
      </div>
</template>

<script>
      import titleList from './titleList'

      export default {
            name: 'blogIndex',
            components: {
                  titleList
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .index-container {
            font-size: 16px;
            width: 20rem;
            z-index: 10;
            margin: 0;
            padding: 0 15px;
            position: fixed;
            top: 60px;
            left: 0;
            bottom: 0;
            box-sizing: border-box;
            border-right: 1px solid #eaecef;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
            }

            &::-webkit-scrollbar-track {
                  background-color: #adadad3f;
            }

            &::-webkit-scrollbar-thumb {
                  background-color: #cacaca;
            }
      }

      @media screen and (max-width: 768px) {
            .index-container {
                  display: none;
            }
      }
</style>