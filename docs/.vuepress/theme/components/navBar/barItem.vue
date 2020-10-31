<template>
    <div class="bar-item">
        <router-link :to="item.link" v-if="!item.target">
            <button type="button">{{item.text}}</button>
        </router-link>
        <a :href="item.link" v-else :target="item.target">
            <button type="button">
                {{item.text}}
                <i class="fa fa-external-link" aria-hidden="true"></i>
            </button>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'barItem',
        props: ['item']
    }
</script>