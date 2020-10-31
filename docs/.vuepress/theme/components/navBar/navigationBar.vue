<template>
    <div class="navigation-bar">
        <bar-item v-for="item in nav" v-if="!item.items" :item="item"></bar-item>
        <bar-list v-else :list="item"></bar-list>
    </div>
</template>

<script>
    import barItem from './barItem'
    import barList from './barList'

    export default {
        name: 'navigationBar',
        data() {
            return {
                nav: this.$navConfig
            }
        },
        components: {
            barItem,
            barList
        }
    }
</script>