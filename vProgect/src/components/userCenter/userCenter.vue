<template>
    <div class="record" style="height: 100%">
        <div class="header">
            <div class="back fa fa-angle-left"></div>
            <div class="title">用户中心</div>
        </div>
        <div class="content">
            <div class="sidebar">
                <el-menu
                        @select="handleChange"
                        ref="menu"
                        class="menu"
                        default-active="userInfo">
                    <el-menu-item index="userInfo">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-submenu
                            index="study">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>我的学习</span>
                        </template>
                        <el-menu-item-group class="children">
                            <el-menu-item index="record">学习记录
                            </el-menu-item>
                            <el-menu-item index="status">学习状态</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="collection">
                        <i class="el-icon-star-off"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="information">
                        <i class="el-icon-message"></i>
                        <span slot="title">我的信息</span>
                    </el-menu-item>
                    <el-submenu index="backManage">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>后台管理</span>
                        </template>

                        <el-menu-item-group class="children">

                            <el-menu-item index="courseManage">
                                课程管理
                            </el-menu-item>

                            <el-menu-item index="articleManage">
                                文章管理
                            </el-menu-item>

                            <el-menu-item index="userManage">
                                用户管理
                            </el-menu-item>

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
        mounted() {
            //路由到达时判断模拟点击的选择（用hash）的选项
            let target = this.$route.hash;
            //打开选项的item
            switch (target) {
                case '#userInfo': {
                    this.$refs.menu.activeIndex = "userInfo";
                    break;
                }
                case '#record': {
                    this.$refs.menu.open('study');
                    this.$refs.menu.activeIndex = "record";
                    break;
                }
                case '#status': {
                    this.$refs.menu.open('study');
                    this.$refs.menu.activeIndex = "status";
                    break;
                }
                case '#collection': {
                    this.$refs.menu.activeIndex = "collection";
                    break;
                }
                case '#information': {
                    this.$refs.menu.activeIndex = "information";
                    break;
                }
                case '#articleManage': {
                    this.$refs.menu.open('backManage');
                    this.$refs.menu.activeIndex = "articleManage";
                    break;
                }
                case '#courseManage': {
                    this.$refs.menu.open('backManage');
                    this.$refs.menu.activeIndex = "courseManage";
                    break;
                }
                case '#userManage': {
                    this.$refs.menu.open('backManage');
                    this.$refs.menu.activeIndex = "userManage";
                    break;
                }
            }

        },
        data() {
            return {}
        },
        methods: {
            /**
             * 侧边菜单的选择
             * @param tar
             */
            handleChange(tar) {
                switch (tar) {
                    case "userInfo": {
                        this.$router.push({path: '/userCenter/userInfo/#userInfo'});
                        break;
                    }

                    case "record": {
                        this.$router.push({path: '/userCenter/record/#record'});
                        break;
                    }

                    case "status": {
                        this.$router.push({path: '/userCenter/status/#status'});
                        break;
                    }

                    case "collection": {
                        this.$router.push({path: '/userCenter/collection/#collection'});
                        break;
                    }

                    case "information": {
                        this.$router.push({path: '/userCenter/information/#information'});
                        break;
                    }

                    case "courseManage": {
                        this.$router.push({path: '/userCenter/courseManage/#courseManage'});
                        break;
                    }

                    case "articleManage": {
                        this.$router.push({path: '/userCenter/articleManage/#articleManage'});
                        break;
                    }

                    case "userManage": {
                        this.$router.push({path: '/userCenter/userManage/#userManage'});
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
                    .children{
                        background-color: rgba(249, 249, 250, 0.65);
                    }
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

