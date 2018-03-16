<template>
    <div :class="classes">
        <el-popover
                ref="popover1"
                placement="top"
                trigger="click">
            <div class="item">
                <div class="item2">名称：
                    <span>打竞技</span>
                </div>
                <div class="item2">职位：
                    <span>CEO</span>
                </div>
                <div class="item2">性别：
                    <span>男</span>
                </div>
            </div>
        </el-popover>
        <img
                style="border-radius: 50%;height: 100%;width: 100%"
                v-popover:popover1
                :src="avatarUrl">
    </div>
</template>

<script>
    export default {
        props:['classes','avatarUrl']
    }
</script>

<style scoped lang="scss">
    .item2{
        margin: 5px 0;
        font-size: 15px;
        font-weight: bold;
    }
</style>

