<template>
      <div class="index-container">
            <div class="blog-indexes" v-for="index in titles.length" :key="index">
                  <a :href="'#'+titles[index-1].slug" :class="setLevel(titles[index-1].level)">
                        <p>{{titles[index-1].title}}</p>
                  </a>
            </div>
      </div>
</template>

<script>
      export default {
            name: 'blogIndex',
            props: ['titles'],
            methods: {
                  setLevel(level) {
                        let index_level = 'index-level-'
                        return index_level + level
                  },
                  setActive(index) {
                        let el = document.querySelectorAll('.blog-indexes')
                        if (typeof index == 'number') {
                              for (let i = 0; i < el.length; i++) {
                                    el[i].classList.remove('active');
                              }
                              el[index].classList.add('active');
                        }
                  },
                  onScroll() {
                        let el = document.querySelector('.index-container')
                        let elist = document.querySelectorAll('.blog-indexes')
                        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                        let allHash = document.querySelectorAll('.header-anchor')
                        if (!allHash) {
                              return
                        }
                        for (let i = 2; i < allHash.length; i++) {
                              if (scrolled <= allHash[i].offsetTop - 100) {
                                    this.setActive(i - 2)
                                    break
                              }
                        }
                  }
            },
            mounted() {
                  let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                  if (scrolled == 0) {
                        this.setActive(0)
                  }
                  window.addEventListener('scroll', this.onScroll)
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

      .blog-indexes {
            width: 100%;
            height: 50px;
            // padding: 10px 20px;
            margin: 10px 0;
            border-bottom: 1px solid #d1d1d1;
            background-color: $primary-background;
            transition-property: box-shadow, border-radius, background-color;
            transition-duration: .2s, .2s, .2s;
            transition-timing-function: ease-in-out;

            &.active,
            &:hover {
                  background-color: #f0f0f0;
                  border-left: 4px solid #2A80B9;
                  border-bottom: 1px solid transparent;
                  border-radius: 5px;
                  box-shadow: $primary-shadow;
            }

            &.active {
                  a {
                        color: #2A80B9;
                        font-weight: 500;
                  }
            }

            a {
                  width: 100%;
                  height: 100%;
                  color: #2c3e50;
                  text-decoration: none;
                  display: flex;
                  align-items: center;
                  box-sizing: border-box;

                  &:hover {
                        color: #2A80B9;

                  }
            }

            a.index-level-2 {
                  font-size: 16px;
                  font-weight: 600;

                  p {
                        padding-left: 20px;
                  }
            }

            a.index-level-3 {
                  font-size: 14px;

                  p {
                        padding-left: 40px;
                  }
            }
      }
</style>