<template>
    <div class="tool-bar">
        <div class="tool-bar-1">
            <navigation-bar></navigation-bar>
        </div>
        <mobile-bar></mobile-bar>
        <div class="search">
            <SearchBox />
        </div>
        <div class="tool-bar-2">
            <bar-item v-for="item in bar2" :item="item"></bar-item>
        </div>
    </div>
</template>

<script>
    import mobileBar from '../components/mobileBar'
    import navigationBar from './navBar/navigationBar'
    import barItem from './navBar/barItem'
    import SearchBox from '@SearchBox'

    export default {
        name: 'toolBar',
        components: {
            mobileBar,
            SearchBox,
            navigationBar,
            barItem
        },
        data() {
            return {
                bar2: [{
                        text: 'CodePen',
                        link: 'https://codepen.io/eddievandeer',
                        target: '_blank'
                    },
                    {
                        text: 'GitHub',
                        link: 'https://github.com/eddievandeer/eddievandeer.github.io',
                        target: '_blank'
                    }
                ]
            }
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