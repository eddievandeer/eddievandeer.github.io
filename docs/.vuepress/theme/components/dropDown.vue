<template>
      <div class="drop-container">
            <div class="down">
                  <a href="#about">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </a>
            </div>
      </div>
</template>

<script>
      export default {
            name: 'dropDown',
            mounted() {
                  let down = document.querySelector('.down')
                  down.addEventListener('click', () => {
                        let header = document.querySelector('.blog-header')
                        header.classList.remove('hide')
                  })
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .drop-container {
            width: 100%;
            height: 80px;
            position: absolute;
            bottom: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
      }

      .down {
            width: 60px;
            height: 80px;
            font-size: 45px;
            animation: anima 1.5s cubic-bezier(0.6, 0.04, 0.52, 1.01) infinite;

            a {
                  width: 100%;
                  height: 100%;
                  color: $primary-background;
                  text-decoration: none;
                  display: flex;
                  justify-content: center;
                  align-items: center;
            }
      }

      @keyframes anima {
            0% {
                  transform: translateY(0px);
            }

            60% {
                  transform: translateY(30px);
            }

            100% {
                  transform: translateY(0px);
            }
      }
</style>