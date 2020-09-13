<template>
      <div class="article-list">
            <div class="article-item" v-for="index in pages.length" :key="index">
                  <a :href="pages[index-1].regularPath">
                        <h1>{{pages[index-1].title}}</h1>
                        <div class="detail">
                              <div class="detail-item" v-for="item in getPageItems(pages[index-1])">
                                    <span>{{ item }}</span>
                              </div>
                        </div>
                  </a>
            </div>
      </div>
</template>

<script>
      export default {
            name: 'blogArticles',
            props: ['pages'],
            methods: {
                  getPageItems(page) {
                        let allItems = page.headers
                        let results = []
                        if (!allItems) {
                              return results
                        }
                        for (let i = 0; i < allItems.length; i++) {
                              let level = allItems[i].level
                              if (parseInt(allItems[i].level) <= 2) {
                                    results.push(allItems[i].title)
                              }
                        }
                        return results
                  }
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/detail.scss';
</style>