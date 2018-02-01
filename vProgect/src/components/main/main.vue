<template>
    <el-container>
        <header_></header_>
        <el-main class="elmain">
            <router-view></router-view>
        </el-main>
    </el-container>
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
    .elmain{
        margin-top: 70px
    }
</style>

