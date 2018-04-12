<template>
    <el-select size="samll"
               remote
               filterable
               clearable
               v-model="valueSearch"
               :remote-method="remoteMethod"
               :loading="loading"
               placeholder="请搜索">
        <el-option-group
                v-for="group in responseData"
                :key="group.type"
                :label="group.type">
            <el-option
                    @click.native="searchFun(item)"
                    style="margin-left: 1em"
                    v-for="item in group.item"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
            </el-option>
        </el-option-group>
        <!--查看用户时的弹出框-->
        <el-dialog :visible.sync="dialogUserVisible"
                   :append-to-body="true"
                   width="40%">
            <div class="userInfo">
                <div class="item item1">
                    <div>
                        <img :src="infoData.avatarUrl">
                    </div>
                    <div style="margin: 0 15px">
                        <div style="margin-bottom: 3px">账号：
                            <span>{{infoData.account}}</span>
                        </div>
                        <div>专注领域：{{infoData.areaFocus}}</div>
                    </div>
                    <div class="learnInfo">
                        <div>学习时长：<span>48h</span></div>
                        <div>访问次数：<span>48次</span></div>
                    </div>
                </div>
                <div class="item">
                    <div class="item2">姓名：
                        <span ref="name" style="padding: 5px">{{infoData.name}}</span>
                    </div>
                    <div class="item2">邮箱：
                        <span ref="eMail" style="padding: 5px">{{infoData.eMail}}</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </el-select>
</template>

<script>
    export default {
        created() {
            this.initSearch();
        },
        data() {
            return {
                responseData: [],
                valueSearch: '',
                loading: false,
                timeOut: null,
                axiosSearch: {},
                //查看用户弹出框
                dialogUserVisible: false,
                //查看时的用户信息
                infoData: {}
            }
        },
        methods: {
            /**
             * 输入时监听
             * @param query - 当前输入值
             */
            remoteMethod(query) {

                //判断输入的是否为空
                if (query !== '') {
                    this.loading = true;
                    //消抖
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        //清空原来的数据
                        this.responseData = [];
                        this.axiosSearch.get('search/' + query).then((response) => {
                            this.loading = false;
                            let data = response.data;
                            //如果课程存在
                            if (data.courses.length) {
                                let courses = data.courses.map((cou) => {
                                    return {
                                        type: 'course',
                                        name: cou.title,
                                        id: cou.id
                                    }
                                });
                                this.responseData.push({type: '课程', item: courses});
                                //如果文章存在
                            }
                            if (data.forums.length) {
                                let forums = data.forums.map((foru) => {
                                    return {
                                        type: 'forum',
                                        name: foru.title,
                                        id: foru.id
                                    }
                                });
                                this.responseData.push({type: '文章', item: forums});
                                //如果是个用户
                            }
                            if (data.selfInformations.length) {
                                let users = data.selfInformations.map((user) => {
                                    return {
                                        type: 'user',
                                        name: user.name,
                                        id: user.name
                                    }
                                });
                                this.responseData.push({type: '用户', item: users});
                            }
                        });
                    }, 1000);
                }
            },
            /**
             * 搜索初始化
             */
            initSearch() {
                //不能用全局的ajax实例，因为去全局的搜索等待是全页面显示的
                this.axiosSearch = this.$ajax.create();
            },
            /**
             * 开始搜索
             * @param item
             */
            searchFun({type, id}) {
                switch (type) {
                    case 'course': {
                        this.$router.push({path: `/course/${id}`});
                        break;
                    }
                    case 'forum': {
                        window.open(`http://localhost:3000/#/main/articlePage/article/${id}`);
                        break;
                    }
                    case 'user': {
                        this.axiosSearch.get(`user/${id}/selfInformation`).then((res) => {
                            this.infoData.account = res.data.name;
                            this.infoData.avatarUrl = res.data.imgPath;
                            this.infoData.name = res.data.trueName;
                            this.infoData.focusArea = res.data.position;
                            this.infoData.eMail = res.data.email;
                            this.dialogUserVisible = true;
                        });
                        break;
                    }
                }
                //清空原来的数据
                this.responseData = [];
            }
        }
    }
</script>
<style lang="scss">
    .userInfo {
        .item {
            padding: 8px;
            border-bottom: 1px solid #f8f4f4;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .item2 {
                margin: 8px;
                font-size: 13px;
                font-weight: bold;
            }
            .learnInfo {
                position: absolute;
                font-size: 14px;
                right: 20px;
                div:nth-child(1) {
                    margin-bottom: 5px;
                }
            }
        }
        .item:nth-child(2) {
            border-bottom: none;
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 15px;
            font-weight: bold;
        }
    }
</style>

