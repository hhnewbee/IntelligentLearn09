<template>
    <div :class="classes">
        <el-popover
                ref="popover1"
                placement="top"
                trigger="click">
            <div class="items">
                <div>名称：
                    <span>打竞技</span>
                </div>
                <div>专注领域：
                    <span>CEO</span>
                </div>
                <div>邮箱：
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
    .items > div{
        margin: 5px 0;
        font-size: 13px;
        font-weight: bold;
    }
</style>

