<template>
    <div id="avatarInfoIL09">
        <!--信息弹出框-->
        <el-popover
                width="300"
                ref="popover2"
                placement="bottom"
                trigger="click">
            <!--查看详情-->
            <el-dialog :append-to-body='true'
                       :visible.sync="dialogNotificationVisible">
                {{notiContent}}
            </el-dialog>
            <div id="noticeInfoIL09"
                 v-if="notifications.length">
                <div class="notMessage" v-for="item in notifications"
                     @click="handleNotification(item)">
                    <div v-if="item.type.content==='回复了我'"
                       style="color: #14c1e9;display: flex;align-items: center">
                        <Avatar :username="item.type.account"
                                :src="item.type.avatarUrl"
                                style="margin-right: 6px"
                                :size="25">
                        </Avatar>
                        <span>{{item.type.account}}&nbsp;{{item.type.content}}</span>
                    </div>
                    <p v-else-if="item.type.content==='评论了我'"
                       style="color: #14c1e9;display: flex;align-items: center">
                        <Avatar :username="item.type.account"
                                :src="item.type.avatarUrl"
                                style="margin-right: 6px"
                                :size="25">
                        </Avatar>
                        <span>{{item.type.account}}&nbsp;{{item.type.content}}</span>
                    </p>
                    <p v-else style="color: red">{{item.type}}：</p>
                    <p>{{item.content}}</p>
                    <p class="el-icon-time">&nbsp;{{item.time | formatDateTime}}</p>
                </div>
            </div>
            <div class="notMessage" v-else style="color: #8a8a8a;display: flex;justify-content: center">暂无信息</div>
        </el-popover>
        <el-badge :max="100"
                  :hidden="!notifications.length"
                  :is-dot="true">
            <el-button icon="el-icon-message"
                       plain
                       size="mini"
                       class="noticeIcon "
                       v-popover:popover2>
            </el-button>
        </el-badge>
        <!--个人信息弹出框-->
        <el-popover
                ref="popover1"
                placement="bottom"
                width="335"
                trigger="hover">
            <div id="avatarInfOpopper">
                <div class="line1">
                    <Avatar :src="avatarUrl"
                            :username="account"
                            :size="50">
                    </Avatar>
                    <div class="info">
                        <div class="name">
                            {{account}}
                        </div>
                        <div class="position">
                            专注领域：{{areaFocus}}
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="fa fa-star-o item"
                         @click="handleChoose('collection')">
                        &nbsp;我的收藏
                    </div>
                    <div class="fa fa-file-text-o item"
                         @click="handleChoose('record')">
                        &nbsp;学习记录
                    </div>
                    <div class="fa fa-question-circle-o item"
                         @click="handleChoose('userInfo')">
                        &nbsp;个人信息
                    </div>
                </div>
                <div class="line3">
                    <div v-if="records.length===0" style="text-align: center;color: #9b9b9b">暂无学习记录</div>
                    <div class="content"
                         v-for="record in records">
                        <div class="contentText" @click="handleRecord(record)">{{record.content}}</div>
                        <div class="el-icon-time">&nbsp;{{record.time}}</div>
                    </div>
                </div>
                <div class="line4">
                    <div class="fa fa-user item"
                         style="font-weight: bold"
                         @click="handleChoose('userInfo')">
                        &nbsp;个人中心
                    </div>
                    <div
                            style="font-weight: bold"
                            class="fa fa-sign-out item"
                            @click="handleOut">
                        &nbsp;退出登录
                    </div>
                </div>
            </div>
        </el-popover>
        <Avatar :src="avatarUrl"
                :username="account"
                :size="45"
                style="margin-left: 40px;cursor: pointer"
                v-popover:popover1>
        </Avatar>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {mapState} from 'vuex';
    import infoDetail from '../userCenter/infoDetail.vue';
    import Avatar from 'vue-avatar';

    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                //记录的数据
                records: [],
                //通知的数据
                notifications: [],
                //通知信息的弹出框
                dialogNotificationVisible: false,
                //查看信息详情
                notiContent:''
            }
        },
        computed: {
            ...mapState('info', [
                'account',
                'avatarUrl',
                'areaFocus'
            ])
        },
        methods: {
            /**
             * 快捷选项跳转
             * @param tar
             */
            handleChoose(tar) {
                this.$router.push({path: `/userCenter/${tar}#${tar}`, query: {path: this.$route.path}});
            },
            /**
             * 退出登录
             */
            handleOut() {
                localStorage.removeItem("ifLogin");
                this.$router.push({name: 'login'});
            },
            /**
             * 初始化数据
             */
            initData() {
                //历史记录
                this.$ajaxJava.get('/user/history/page=0/size=3').then((res) => {
                    this.records = res.data.history.map((data) => {
                        let record = {};
                        if (data.course) {
                            record.id = data.course.id;
                            record.type = 'course';
                            record.content = data.course.title;
                        } else {
                            record.id = data.forum.id;
                            record.type = 'article';
                            record.content = data.forum.title;
                        }
                        record.time = this.$formatTime(data.updateTime);
                        return record;
                    });
                });
                //信息数据
                this.$ajaxJava.get('user/messages/page=0/size=6').then((res) => {
                    //格式化数据
                    res.data.messages.forEach((resdata) => {
                        //判断该信息是否未读
                        if (resdata.status === 'No Read') {
                            //判断是回复信息
                            if (this.account !== resdata.from.account||resdata.type==='system') {
                                this.notifications.push({
                                    id: resdata.id,
                                    time: resdata.creationTimestamp,
                                    content: resdata.content,
                                    type: (() => {
                                        //判断信息的类型
                                        switch (resdata.type) {
                                            case 'reply': {
                                                return {
                                                    content: '回复了我',
                                                    account: resdata.from.account,
                                                    avatarUrl: resdata.from.selfInformation.imgPath
                                                };
                                            }
                                            case 'comment':{
                                                return {
                                                    content: '评论了我',
                                                    account: resdata.from.account,
                                                    avatarUrl: resdata.from.selfInformation.imgPath
                                                };
                                            }
                                            case 'system': {
                                                return '系统通知';
                                            }
                                        }
                                    })()
                                });
                            }
                        }
                    })
                });
            },
            /**
             * 查看消息
             * @param item
             */
            handleNotification(item) {
                this.dialogNotificationVisible = true;
                //查看信息
                this.notiContent=item.content;
                this.$ajaxJava.get('message/' + item.id).then(() => {
                    //本地更新
                    this.notifications.splice(this.notifications.indexOf(item), 1);
                });
            },
            /**
             * 记录跳转
             */
            handleRecord(record) {
                if (record.type === 'course') {
                    this.$router.push({path: `/course/${record.id}`});
                } else {
                    window.open(`http://localhost:3000/#/main/articlePage/article/${record.id}`);
                }
            }
        },
        components: {
            infoDetail,
            Avatar
        }
    }
</script>

<style lang="scss">
    #avatarInfoIL09 {
        display: flex;
        justify-content: center;
        align-items: center;
        border-color: inherit;
        .el-badge__content {
            right: 12px;
            top: 7px;
            border: none;
        }
        .el-badge__content.is-dot {
            height: 6px;
            width: 6px;
        }
        .noticeIcon {
            background-color: inherit;
            border-color: inherit;
            font-size: 16px;
            color: inherit;
        }
    }

    #noticeInfoIL09 {
        .notMessage {
            padding: 10px 10px 5px;
            border-bottom: 1px solid #eeeeee;
            border-radius: 4px;
            cursor: pointer;
            p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 5px;
            }
            p:nth-child(2) {
                margin-left: 20px;
            }
            p:nth-child(3) {
                margin-left: 20px;
                font-size: 12px;
                color: #b0b0b0
            }
            &:hover {
                background-color: #eeeeee;
            }
        }
    }

    #avatarInfOpopper {
        .line1 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .info {
                margin-left: 10px;
                .name {
                    font-size: 16px;
                    font-weight: bold;
                }
                .position {
                    font-size: 10px;
                }
            }
        }
        .line2 {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 15px 0;
        }
        .line3 {
            margin-bottom: 10px;
            overflow: hidden;
            .content {
                margin-bottom: 10px;
                color: #787d82;
                max-width: 300px;
                padding: 0 15px;
                font-size: 10px;
                .contentText {
                    margin-right: 10px;
                    margin-bottom: 2px;
                    font-size: 13px;
                    font-weight: bold;
                    white-space: nowrap;
                    color: #666a6e;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    cursor: pointer;
                    &:hover {
                        color: #0457bb;
                    }

                }
            }
        }
        .line4 {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .item {
            width: 100%;
            height: 36px;
            line-height: 36px;
            cursor: pointer;
            padding: 0 8px;
            margin: 0 5px;
            text-align: center;
            background-color: #F8FAFC;
            color: #4d555d;
            border-radius: 4px;
            box-sizing: border-box;
            &:hover {
                background-color: #d9dde1;
            }
        }
    }
</style>

