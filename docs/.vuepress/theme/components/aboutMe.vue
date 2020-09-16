<template>
      <div class="about-me" id="about">
            <div>
                  <Content />
            </div>
            <my-works></my-works>
      </div>
</template>

<script>
      import myWorks from './myWorks'

      export default {
            name: 'aboutMe',
            components: {
                  myWorks
            }
            // TODO:展示个人信息
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .about-me {
            width: 100%;
            height: 100vh;
            margin-top: 60px;
            @extend .flex;
      }
</style>