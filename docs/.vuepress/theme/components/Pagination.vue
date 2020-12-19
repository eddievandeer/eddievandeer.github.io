<template>
    <div class="pagination-wrapper">
        <div class="pagination-pre">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div class="pagination-next">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['pages'],
        data() {
            return {
                prePath: '',
                nextPath: ''
            }
        },
        mounted() {
            const nowPage = this.$page.path
            this.pages
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/values.scss';

    .pagination-wrapper {
        z-index: 10;
        width: 100%;
        height: calc(100vh - 60px);
        transition: opacity .2s ease-in-out;
        position: fixed;
        bottom: 0px;
        right: 0px;
        pointer-events: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .pagination-pre,
        .pagination-next {
            height: 15%;
            width: 40px;
            color: $primary-background;
            font-size: 30px;
            background-color: rgba(0, 0, 0, .2);
            cursor: pointer;
            pointer-events: auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    @media screen and (min-width: 1024px) {
        .pagination-wrapper {
            display: none;
        }
    }
</style>