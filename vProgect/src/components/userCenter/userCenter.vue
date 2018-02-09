<template>
    <div class="record" style="height: 100%">
        <div class="header">
            <div class="back fa fa-angle-left"></div>
            <div class="title">用户中心</div>
        </div>
        <div class="content">
            <div class="sidebar">
                <el-menu
                        ref="menu"
                        class="menu"
                        default-active="1">
                    <el-menu-item index="1">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-submenu
                            index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>我的学习</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                    index="2-1">
                                学习记录
                            </el-menu-item>
                            <el-menu-item index="2-2">学习状态</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-star-off"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-message"></i>
                        <span slot="title">我的信息</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>后台管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">课程管理</el-menu-item>
                            <el-menu-item index="5-2">文章管理</el-menu-item>
                            <el-menu-item index="5-3">用户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <keep-alive>
                <router-view class="chart"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            //路由到达时判断模拟点击的选择（用hash）
            let target=this.$route.hash;
            switch (target){
                case '#record':{
                    this.$refs.menu.open('2');
                    this.$refs.menu.activeIndex="2-1"
                }
            }

        },
        data() {
            return {}
        },
        methods:{
            handleChange(tar){
                switch (tar){
                    case "record":{

                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .record {
        display: flex;
        flex-direction: column;
        height: 100%;
        .header {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;
            height: 70px;
            .back {
                font-size: 25px;
                font-weight: bold;
                padding-right: 30px;
                padding-left: 20px;
            }
            .title {
                font-size: 22px;
                font-weight: bold;
            }
        }
        .content {
            display: flex;
            flex-grow: 1;
            height: 1%;
            .sidebar {
                width: 250px;
                height: 100%;
                .menu {
                    height: 100%;
                }
            }
            .chart {
                width: 1%;
                flex-grow: 1;
                padding: 20px;
            }
        }
    }
</style>

