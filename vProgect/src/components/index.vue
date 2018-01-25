<template>
    <div class="indexVue">
        <container></container>
    </div>
</template>

<script>
    import header_ from './header/header.vue'
    import container from './container/container.vue';
    import edit from './edit/myEditor.vue'
    export default {
        data(){
            return {

            }
        },
        components:{
            header_,
            container,
            edit,
        }
    }
</script>

<style scoped lang="scss">
    .indexVue{
        height: 100%;
    }
</style>

