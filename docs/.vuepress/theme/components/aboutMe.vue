<template>
      <div class="about-me" id="about">
            <div>
                  <Content />
            </div>
      </div>
</template>

<script>
      export default {
            name: 'aboutMe',
            // TODO
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