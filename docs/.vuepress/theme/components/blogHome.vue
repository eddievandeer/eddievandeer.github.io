<template>
      <div class="home-page">
            <div class="blog-home">
                  <div class="home-content">
                        <!-- <div class="blog-icon"></div> -->
                        <div class="blog-description">
                              <h1>{{ $page.frontmatter.title }}</h1>
                              <p>本博客网站基于HTML5开发，若无法正常访问请更换高版本浏览器</p>
                        </div>
                  </div>
                  <drop-down></drop-down>
            </div>
            <about-me></about-me>
      </div>
</template>

<script>
      import dropDown from './dropDown'
      import aboutMe from './aboutMe'

      export default {
            name: 'blogHome',
            mounted() {
                  let home = document.querySelector('.blog-home')
                  let screenWidth = window.screen.width || document.body.clientWidth
                  let screenHeight = window.screen.height || document.body.clientHeight
                  if (screenWidth <= 768) {
                        home.style.height = screenHeight
                  }
            },
            components: {
                  dropDown,
                  aboutMe
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .blog-home {
            @extend .flex;
            width: 100%;
            height: 100vh;

            &::before {
                  content: '';
                  z-index: -10;
                  width: 100%;
                  height: 100%;
                  // background-image: url(https://i.loli.net/2020/09/11/ElcNrtJVkPWamOo.jpg);
                  background-image: url("../../public/assets/img/background.jpg");
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center top;
                  filter: brightness(80%);
                  position: absolute;
            }

            .home-content {
                  @extend .flex-column;

                  // .blog-icon {
                  //       width: 260px;
                  //       height: 260px;
                  //       // background-image: url(https://i.loli.net/2020/09/12/wdN45JRBkQtsfhj.jpg);
                  //       background-image: url("../../public/assets/img/logo.jpg");
                  //       background-size: cover;
                  //       box-sizing: border-box;
                  //       border-radius: 20px;
                  //       border: 5px solid white;
                  //       display: none;
                  // }

                  .blog-description {
                        @extend .flex-column;
                        margin-top: 150px;

                        h1 {
                              font-size: 48px;
                              color: rgb(148, 188, 218);
                        }

                        p {
                              color: rgb(209, 209, 209);
                              text-align: center;
                              line-height: 26px;
                        }
                  }
            }
      }

      @media screen and (max-width: 768px) {
            // .blog-icon {
            //       display: none;
            // }

            .blog-description {
                  margin-top: 80px;

                  p {
                        width: 80%;
                  }
            }
      }
</style>