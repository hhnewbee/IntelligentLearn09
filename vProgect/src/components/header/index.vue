<template>
    <div class="header_">
        <el-popover
                ref="popover2"
                placement="bottom"
                width="200"
                trigger="hover">
            <div class="popoDiv">
                dewdwedwe
            </div>
        </el-popover>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" class="fa fa-comments-o" v-popover:popover2>
            </el-menu-item>
            <el-menu-item index="3">订单管理</el-menu-item>
            <el-menu-item index="2" class="iconfont icon-pinglun1">
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    .header_ {
        .el-menu--horizontal {
            display: flex;
            justify-content: center;
        }
        .el-menu--horizontal > .el-menu-item.is-active {
            border-bottom: 0px solid white;
            color: #909399;
        }
        .el-menu--horizontal .el-menu-item {
            &:hover {
                outline: 0;
                color: #409EFF;
            }
        }
    }
    .popoDiv {
        height: 100px;
    }
    .d{
        border: 1px solid aqua;
    }
</style>

