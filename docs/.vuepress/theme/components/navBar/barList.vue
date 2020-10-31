<template>
    <div class="bar-list" @click="showTools" @mouseleave="hideTools">
        {{list.text}} &nbsp; <i class="fa fa-caret-down" aria-hidden="true"></i>
        <div class="bar-item-list">
            <bar-item v-for="item in list.items" :item="item"></bar-item>
        </div>
    </div>
</template>

<script>
    import barItem from './barItem'

    export default {
        name: 'barList',
        props: ['list'],
        components: {
            barItem
        },
        methods: {
            showTools() {
                let barList = document.querySelector('.bar-item-list')
                barList.classList.add('show')
            },
            hideTools() {
                let barList = document.querySelector('.bar-item-list')
                barList.classList.remove('show')
            }
        }
    }
</script>