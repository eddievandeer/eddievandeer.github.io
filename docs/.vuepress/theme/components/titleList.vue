<template>
    <div class="list-container hide">
        <div class="list-item" v-for="index in titles.length" :key="index" :class="{active: index-1==activeIndex}">
            <a v-if="titles[index - 1].url" :target="titles[index - 1].level == 3 ? '__blank' : ''"
                :href="titles[index - 1].url" :class="setLevel(titles[index - 1].level)">
                <p>{{ titles[index - 1].title }}</p>
            </a>
            <a v-else :href="'#' + titles[index - 1].slug" :class="setLevel(titles[index - 1].level)">
                <p>{{ titles[index - 1].title }}</p>
            </a>
        </div>
    </div>
</template>

<script>
    import {
        parseTitle
    } from "../util/utils";

    export default {
        name: "titleList",
        data() {
            return {
                titles: [],
                activeIndex: -1
            };
        },
        methods: {
            setLevel(level) {
                let index_level = "index-level-";
                return index_level + level;
            },
            onScroll() {
                const scrolled = Math.max(
                    window.pageYOffset,
                    document.documentElement.scrollTop,
                    document.body.scrollTop
                )
                // let scrolled = document.documentElement.scrollTop || document.body.scrollTop;

                const allTitles = document.querySelectorAll(".content__default h2,h3");

                for (let i = 0; i < allTitles.length; i++) {
                    const title = allTitles[i]
                    const nextTitle = allTitles[i + 1]

                    if (i === 0 && scrolled === 0 ||
                        scrolled >= title.offsetTop - 20 &&
                        (!nextTitle || scrolled < title.offsetTop + 20)) {
                        this.activeIndex = i
                        break;
                    }
                }
            },
        },
        mounted() {
            this.titles = parseTitle(this.$navConfig);
            let url = window.location.pathname.split("/")[1];
            // console.log(url);
            if (this.$page.headers) {
                this.activeIndex = 0
                this.titles = this.$page.headers
                // this.titles.push(...this.$page.headers);
            }
            if (!this.titles[0].url) {
                // this.onScroll()
                window.addEventListener("scroll", this.onScroll);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/values.scss";

    .list-container {
        z-index: 10;
        width: 320px;
        height: calc(100vh - 60px);
        font-size: 16px;
        margin: 0;
        padding: 0 15px;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        background-color: $primary-background;
        border-right: 1px solid #d1d1d1;
        transition: transform 0.15s ease-out;
        overflow-y: scroll;
        position: fixed;
        top: 60px;
        left: 0px;

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

        .list-item {
            width: 100%;
            min-height: 50px;
            margin: 10px 0;
            border-bottom: 1px solid #d1d1d1;
            background-color: $primary-background;
            transition-property: box-shadow, background-color;
            transition-duration: 0.2s, 0.2s;
            transition-timing-function: ease-in-out;

            a {
                width: 100%;
                height: 100%;
                color: #2c3e50;
                text-decoration: none;
                display: flex;
                align-items: center;
                box-sizing: border-box;

                &.index-level-2 {
                    font-size: 16px;
                    font-weight: 600;

                    p {
                        padding-left: 20px;
                    }
                }

                &.index-level-3 {
                    font-size: 14px;

                    p {
                        padding-left: 40px;
                    }
                }
            }

            &:hover,
            &.active {
                background-color: #f0f0f0;
                border-left: 4px solid #2a80b9;
                border-bottom: 1px solid transparent;
                border-radius: 5px;
                box-shadow: $primary-shadow;

                a {
                    color: #2a80b9;
                }
            }
        }

        @media screen and (max-width: 768px) {
            &.hide {
                transform: translateX(-320px);
            }
        }
    }
</style>