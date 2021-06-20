<template>
      <div class="theme-container">
            <blog-header></blog-header>
            <div class="content" id="wrapper">
                  <h1 id="part-1">404</h1>
                  <blockquote id="part-2">{{ getMsg }}</blockquote>
                  <router-link to="/">
                        <button>回到首页</button>
                  </router-link>
            </div>
            <blog-footer></blog-footer>
      </div>
</template>

<script>
      import blogIndex from '../components/blogIndex'
      const msgs = [
            `There's nothing here.`,
            `How did we get here?`,
            `That's a Four-Oh-Four.`,
            `Looks like we've got some broken links.`
      ]

      export default {
            components: {
                  blogIndex
            },
            mounted() {
                  let wrap = document.querySelector('#wrapper');

                  wrap.addEventListener('mousemove', (e) => {
                        let horizontal = e.clientX / parseInt(getComputedStyle(wrap).width, 10);
                        let vertical = e.clientY / parseInt(getComputedStyle(wrap).height, 10);

                        document.querySelector('#part-1').style.transform = calculateTransform(horizontal,
                              vertical, 10);
                        document.querySelector('#part-2').style.transform = calculateTransform(horizontal,
                              vertical, -10);
                  })

                  function calculateTransform(horizontal, vertical, offset) {
                        return `translate(${horizontal * offset / 0.5}px,${vertical * offset / 0.5}px)`
                  }
            },
            computed: {
                  getMsg() {
                        return msgs[Math.floor(Math.random() * msgs.length)]
                  }
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .content {
            width: 100%;
            height: calc(100vh - 220px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            h1 {
                  font-size: 80px;
                  text-shadow: $word-shadow;
                  margin-block-start: 0.67em;
                  margin-block-end: 0.67em;
                  margin-inline-start: 0px;
                  margin-inline-end: 0px;
                  padding: 0;
            }

            button {
                  width: 220px;
                  height: 65px;
                  font-size: 26px;
                  font-weight: bolder;
                  letter-spacing: 2px;
                  color: #424242;
                  cursor: pointer;
                  border: none;
                  border-radius: 50px;
                  background-color: $primary-background;
                  box-sizing: border-box;
                  box-shadow: $button-shadow;
                  transition: all .2s ease-out;

                  &:hover {
                        background-color: #efeeee;
                        box-shadow: $button-shadow-hover;
                  }

                  &:active,
                  &:focus {
                        background-color: #efeeee;
                        box-shadow: $button-shadow-active;
                        outline: none;
                  }
            }
      }
</style>