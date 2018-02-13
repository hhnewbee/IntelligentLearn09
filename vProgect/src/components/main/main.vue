<template>
    <div class="main">
        <header_ class="header_"></header_>
        <!--占据空间使用-->
        <div class="freeContent"></div>
        <div class="elmain">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import header_ from '../header/header.vue';
export default {
    components:{
        header_
    }
}
</script>

<style scoped lang="scss">
    .main{
        display: flex;
        flex-direction: column;
        height: 100%;
        .freeContent{
            height: 70px;
        }
        .elmain{
            height: 1%;
            flex-grow: 1;
        }
    }
</style>

