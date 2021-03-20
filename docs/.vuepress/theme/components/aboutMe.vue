<template>
      <div class="about-me" id="about">
            <div class="about-content">
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
            min-height: calc(100vh - 60px);
            margin-top: 60px;
            padding-top: 2rem;
            @extend .flex;
            align-items: flex-start;

            .about-content {
                  width: 50%;
                  height: 100%;
                  padding-top: 1rem;
                  justify-content: center;
                  align-items: center;
            }

            @media screen and (max-width: 768px) {
                  .about-content {
                        width: 80%;
                  }
            }
      }
</style>