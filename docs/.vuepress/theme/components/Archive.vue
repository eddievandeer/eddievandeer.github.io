<template>
    <div class="archive-detail">
        <div class="archive-item" v-for="(page, index) in pages" :key="index">
            <header class="archive-header">
                <p class="archive-year">{{page[0]}}</p>
            </header>
            <div class="archive-meta">
                <div class="archive-title" v-for="item in page[1]" :key="item.key">
                    <time>{{item.frontmatter.postTime.slice(5, 10)}}</time>
                    <a :href="item.path"><span>{{item.title}}</span></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Archive',
        props: ['pages'],
        watch: {
            $route(to, from) {
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .archive-detail {
        width: 100%;
        height: 100%;
    }

    .archive-item {
        .archive-header {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                width: 2px;
                height: 50%;
                background: $white;
            }
        }

        .archive-meta {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 2px;
                height: 100%;
                background: $white;
            }
        }

        .archive-year,
        .archive-title {
            box-sizing: border-box;
            position: relative;

            &::before {
                z-index: 10;
                content: ' ';
                border-radius: 50%;
                background-color: white;
                transform: translateY(-50%);
                transition: all .3s;
                position: absolute;
                top: 50%;
            }

            &:hover::before {
                background-color: $word-color-blue-light;
            }
        }

        .archive-year {
            width: fit-content;
            font-size: 30px;
            padding-left: 2rem;
            margin-bottom: 0;

            &::before {
                width: .6rem;
                height: .6rem;
                left: -10px;
                border: 5px solid $word-color-blue-light;
            }
        }

        .archive-title {
            height: 3.6rem;
            padding-left: 2rem;
            @extend .flex;
            justify-content: flex-start;

            time {
                color: $word-color-light;
                font-size: 14px;
            }

            a {
                color: $word-color-blue;
                font-size: 17px;
                padding-left: 1.2rem;
                transition: all .2s;

                &:hover {
                    color: $word-color-blue-light;
                }
            }

            &::before {
                width: .4rem;
                height: .4rem;
                left: -5px;
                border: 3px solid $word-color-blue-light;
            }
        }
    }
</style>