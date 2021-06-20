<template>
    <div>
        <blog-header></blog-header>
        <div class="categories-container">
            <h2>分类</h2>
            <p>共计 {{total}} 个分类</p>
            <ul class="category-list">
                <li class="category-list-item" v-for="(category, index) in $categories" :key="index">
                    <div v-if="category[1].children">
                        <div class="category-list-primary">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <a :href="category[0]">
                                <span>{{category[0]}}</span>
                            </a>
                            <span class="category-list-count">（{{category[1].length}}）</span>
                        </div>
                        <div class="category-list-child" v-for="(child, childIndex) in category[1].children"
                            :key="childIndex">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <a :href="category[0]+'/'+child[0]"><span>{{child[0]}}</span></a>
                            <span class="category-list-count">（{{child[1].length}}）</span>
                        </div>
                    </div>
                    <div class="category-list-primary" v-else>
                        <i class="fa fa-folder-o" aria-hidden="true"></i>
                        <a :href="category[0]">
                            <span>{{category[0]}}</span>
                        </a>
                        <span class="category-list-count">（{{category[1].length}}）</span>
                    </div>
                </li>
            </ul>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import blogIndex from '../components/blogIndex'

    export default {
        name: 'Categories',
        components: {
            blogIndex
        },
        data() {
            return {
                total: 0
            }
        },
        mounted() {
            this.total = this.$categories.size
            for (const category of this.$categories.values()) {
                if (category.children !== undefined) {
                    this.total += category.children.size
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .categories-container {
        padding: 1rem 5rem 2rem;
        @extend .flex-column;

        // p {
        //     color: $black;
        // }

        .category-list {
            list-style: none;

            .category-list-primary,
            .category-list-child {
                margin: .3rem 0;
                font-size: 17px;

                a {
                    color: $word-color-light;
                    margin-left: .2rem;

                    :hover {
                        color: $word-color-blue-light;
                    }
                }

                .category-list-count {
                    font-size: 14px;
                    color: #a3a3a3;
                }
            }

            .category-list-child {
                margin-left: 2.8rem;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .categories-container {
            padding: 1rem 1rem 2rem;

            .category-list {
                padding: 0;
            }
        }
    }
</style>