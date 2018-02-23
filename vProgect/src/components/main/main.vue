<template>
    <div class="main">
        <header_ class="header_"></header_>
        <!--用来占据空间的-->
        <div class="freeContent"></div>
        <!--主体内容-->
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import header_ from '../header/header.vue';
    import footer_ from '../footer/footer.vue';

    export default {
        components: {
            header_,
            footer_
        }
    }
</script>

<style scoped lang="scss">
    .main {
        height: 100%;
        display: flex;
        flex-direction: column;
        .freeContent {
            height: 62px;
        }
        .content{
            height: 1%;
            flex-grow: 1;
            overflow: auto;
        }
    }
</style>

