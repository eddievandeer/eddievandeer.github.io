<template>
      <div class="tool-bar">
            <div class="tool-bar-1">
                  <div class="navigation-bar">
                        <div class="bar-item">
                              <router-link to="/">
                                    <button type="button">首页</button>
                              </router-link>
                        </div>
                        <div class="bar-item">
                              <router-link to="/frontend">
                                    <button type="button">前端笔记</button>
                              </router-link>
                        </div>
                        <div class="bar-item">
                              <router-link to="/album">
                                    <button type="button">画册</button>
                              </router-link>
                        </div>
                        <div class="bar-list" @click="showTools" @mouseleave="hideTools">
                              工具箱 &nbsp; <i class="fa fa-caret-down" aria-hidden="true"></i>
                              <div class="bar-item-list">
                                    <div class="bar-item">
                                          <a href="https://tinypng.com/" target="__blank">
                                                <button type="button">图片压缩 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                                    <div class="bar-item">
                                          <a href="https://sm.ms/" target="__blank">
                                                <button type="button">免费图床 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                                    <div class="bar-item">
                                          <a href="https://www.iconfont.cn/home/index" target="__blank">
                                                <button type="button">矢量图标库 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                                    <div class="bar-item">
                                          <a href="http://zhongguose.com/" target="__blank">
                                                <button type="button">中国色 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                                    <div class="bar-item">
                                          <a href="https://learngitbranching.js.org/?locale=zh_CN" target="__blank">
                                                <button type="button">Git可视化学习 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                                    <div class="bar-item">
                                          <a href="https://flatuicolors.com/" target="__blank">
                                                <button type="button">取色板 <i class="fa fa-external-link"
                                                            aria-hidden="true"></i></button>
                                          </a>
                                    </div>
                              </div>
                        </div>
                        <div class="bar-item">
                              <router-link to="/about">
                                    <button type="button">关于</button>
                              </router-link>
                        </div>
                  </div>
            </div>
            <mobile-bar></mobile-bar>
            <div class="search">
                  <SearchBox />
            </div>
            <div class="tool-bar-2">
                  <div class="bar-item">
                        <a href="https://codepen.io/eddievandeer" target="__blank">
                              <button type="button">CodePen <i class="fa fa-external-link"
                                          aria-hidden="true"></i></button>
                        </a>
                  </div>
                  <div class="bar-item">
                        <a href="https://github.com/eddievandeer/eddievandeer.github.io" target="__blank">
                              <button type="button">GitHub <i class="fa fa-external-link"
                                          aria-hidden="true"></i></button>
                        </a>
                  </div>
            </div>
      </div>
</template>

<script>
      import mobileBar from '../components/mobileBar'
      import SearchBox from '@SearchBox'

      export default {
            name: 'toolBar',
            methods: {
                  showTools() {
                        let barList = document.querySelector('.bar-item-list')
                        barList.classList.add('show')
                  },
                  hideTools() {
                        let barList = document.querySelector('.bar-item-list')
                        barList.classList.remove('show')
                  }
            },
            components: {
                  mobileBar,
                  SearchBox
            }
      }
</script>

<style lang="scss" scoped>
      @media screen and (max-width: 768px) {
            .tool-bar {
                  padding: 0 20px 0 0;
                  justify-content: space-between;

                  .tool-bar-1,
                  .tool-bar-2 {
                        display: none !important;
                  }
            }
      }
</style>