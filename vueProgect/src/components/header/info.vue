<template>
    <div id="avatarInfoIL09">
        <!--信息弹出框-->
        <el-popover
                ref="popover2"
                placement="bottom"
                width="360"
                trigger="click">
            <el-dialog
                    title="通知"
                    :modal='false'
                    :visible.sync="dialogNotificationVisible">
                {{notiContent}}
            </el-dialog>
            <div id="noticeInfoIL09">
                <div v-for="item in notifications"
                     @click="handleNotification(item)">
                    <p v-if="item.answer!==undefined"
                       style="color: #14c1e9">
                        {{item.user}}：{{item.answer}}
                    </p>
                    <p v-else style="color: red">{{item.user}}：</p>
                    <p>{{item.content}}</p>
                    <p class="el-icon-time">&nbsp;{{item.time}}</p>
                </div>
            </div>
        </el-popover>
        <el-badge :value="10"
                  :max="100"
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
                class="popper"
                width="335"
                trigger="hover">
            <div id="avatarInfOpopper">
                <div class="line1">
                    <img :src="avatarUrl"/>
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
                    <div class="fa fa-info-circle item"
                         @click="handleChoose('userInfo')">
                        &nbsp;个人信息
                    </div>
                </div>
                <div class="line3">
                    <div v-if="records.length===0" style="text-align: center;color: #9b9b9b">暂无</div>
                    <div
                            class="content"
                            v-for="content in records">
                        <div class="contentText">{{content.content}}</div>
                        <div class="el-icon-time">&nbsp;{{content.time}}</div>
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
        <img :src="avatarUrl"
             v-popover:popover1>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {mapState} from 'vuex';

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
                //当前打开的通知的内容
                notiContent: '',
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
                //todo 模拟记录的数据
                this.records = [
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                    {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
                ];
                //todo 模拟通知的数据
                this.notifications = [
                    {
                        user: '李敏',
                        answer: '回答了你的问题',
                        content: '泰国神级广告导演Thanonchai Sornsriwichai亲自操刀，马云大佬buff加持，然而不能改变我对这则广告很弱智的看法。难道我们现在对一个人的认识，不是注重个人对人接物的态度和自身良好的素养品德了吗？这则广告，在我看来就是在传达这么一个意思，有车有房才能结婚。广告的最后，才让人恍然醒悟，原来是滴滴出行，然而有啥关联吗？',
                        time: '2013-12-3 22:33'
                    },
                    {user: '通知', content: '请开始学习"比特的原理"该文章', time: '2013-12-3 22:33'}
                ];
                //todo 加载推荐课程
                //todo 加载推荐文章
            },
            /**
             * 查看消息
             * @param item
             */
            handleNotification(item) {
                if (item.answer === undefined) {
                    this.dialogNotificationVisible = true;
                    this.notiContent = item.content;
                }
            }
        }
        ,
    }
</script>

<style lang="scss">
    #avatarInfoIL09 {
        display: flex;
        justify-content: center;
        align-items: center;
        border-color: inherit;
        .el-badge__content{
            right: 12px;
            top: 7px;
            border: none;
        }
        .el-badge__content.is-dot{
            height: 6px;
            width: 6px;
        }
        .noticeIcon {
            background-color: inherit;
            border-color: inherit;
            font-size: 16px;
            color: inherit;
        }
        img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-left: 40px;
            cursor: pointer
        }
    }

    #noticeInfoIL09 {
        div {
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
            img {
                border-radius: 50%;
                height: 50px;
                width: 50px
            }
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

