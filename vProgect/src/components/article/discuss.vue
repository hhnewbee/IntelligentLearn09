<template>
    <div class="discuss">
        <div class="header">
            <!--用户列表-->
            <vue-scrollbar
                    class="userList"
                    v-show="showUserList">
                <div>
                    <!--不能用click，因为blur事件-->
                    <div
                            v-for="user in usersList"
                            class="item"
                            @mousedown="handleChatChange(user,true)">
                        <div class="avatar">
                            <img :src="user.avatarUrl"/>
                        </div>
                        <div class="name">
                            {{user.nickName}}
                        </div>
                    </div>
                </div>
            </vue-scrollbar>
            <!--用户列表切切换-->
            <div
                    tabindex="1"
                    class="users fa fa-user"
                    @blur="handleShowList"
                    @click="handleShowList"></div>
            <!--大厅的信息-->
            <div class="group" v-show="!priChat">
                <div class="small fa fa-television">
                    12人在线
                </div>
            </div>
            <!--用户信息-->
            <div class="user" v-show="priChat">
                <div class="name">{{userInfo.nickName}}</div>
            </div>
            <!--切回大厅-->
            <div
                    class="home fa fa-home"
                    @click="handleChatChange(home,false)"
                    v-show="priChat">
            </div>
        </div>
        <vue-scrollbar
                class="my-scrollbar"
                v-for="item in chats"
                :key="item.nickName"
                :ref="item.nickName"
                v-show="item.show">
            <div class="message">
                <div
                        class="item item-left"
                        v-for="messageItem in item.messageItems"
                        v-if="messageItem.type==='left'">
                    <div class="info">
                        <div class="avatar">
                            <img :src="messageItem.avatarUrl"/>
                        </div>
                        <div class="name">
                            {{messageItem.nickName}}
                        </div>
                    </div>
                    <div class="content">
                        {{messageItem.content}}
                    </div>
                </div>
                <div
                        v-for="messageItem in item.messageItems"
                        v-if="messageItem.type==='right'"
                        class="item item-right">
                    <div class="info">
                        <div class="avatar">
                            <img :src="messageItem.avatarUrl"/>
                        </div>
                        <div class="name">
                            {{messageItem.nickName}}
                        </div>
                    </div>
                    <div class="content">
                        <div class="tig"></div>
                        {{messageItem.content}}
                    </div>
                </div>
            </div>
        </vue-scrollbar>
        <!--发送部分-->
        <div class="control">
            <el-input
                    resize="none"
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    placeholder="请输入内容"
                    v-model="sendData">
            </el-input>
            <el-button
                    @click="handleSend"
                    type="primary"
                    size="mini"
                    style="margin-left: 10px;align-self: flex-end">
                发送
            </el-button>
        </div>
    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";
    import uuidv1 from 'uuid/v1';

    export default {
        created() {
            //防止用户名和房间名重复，所以用uuid做为房间名
            this.home = {nickName: uuidv1(), avatarUrl: ''};
            this.chats = [{
                nickName: this.home.nickName, show: true, messageItems: [
                    {
                        nickName: 'newbee1',
                        avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                        type: 'left',
                        content: '你好dewdwededawdawdewadeawdeawdaw'
                    },
                    {
                        nickName: 'newbee2',
                        avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                        type: 'left',
                        content: '你好dewdwededawdawdewadeawdeawdaw'
                    },
                    {
                        nickName: 'newbee3',
                        avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                        type: 'right',
                        content: '你好dewdwededawdawdewadeawdeawdaw'
                    },
                ]
            }];
            this.userInfo = this.home;
            this.messageItemsNow = this.chats[0].messageItems;
        },
        data() {
            return {
                //websocket实例
                wss: {},
                //是否打开用户列表
                showUserList: false,
                //用户列表
                usersList: [
                    {nickName: 'newbee1', avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg'},
                    {nickName: 'newbee2', avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg'}
                ],
                //是否私聊
                priChat: false,
                //主聊天区信息
                home: {},
                //不同聊天的内容区
                chats: [],
                //当前讨论用户信息
                userInfo: {},
                //当前讨论区的items
                messageItemsNow: {},
                //发送的数据
                sendData:''
            }
        },
        methods: {
            /**
             * 是否展示用户列表
             * @param e
             */
            handleShowList(e) {
                let ts = e.target.style;
                if (!this.showUserList) {
                    ts.color = "#748eab";
                } else {
                    ts.color = '#495a6c';
                }
                this.showUserList = !this.showUserList;
            },
            /**
             * 切户讨论区
             * @param user
             * @param ifPri
             */
            handleChatChange(user, ifPri) {
                //header切换到单个用户聊天模式
                this.priChat = ifPri;
                //确定当前用户信息
                this.userInfo = user;
                //聊天框的切换,判断当前聊天框是否打开过，如果已打开，复用，否则新添加
                let ifExit = false;
                this.chats.forEach((item) => {
                    if (item.show = item.nickName === user.nickName) {
                        this.messageItemsNow = item.messageItems;
                        ifExit = true;
                    }
                });
                if (!ifExit) {
                    let newItem = {nickName: user.nickName, show: true, messageItems: []};
                    this.messageItemsNow = newItem.messageItems;
                    this.chats.push(newItem);
                }

            },
            /**
             * 发送消息
             */
            handleSend() {
                //本地信息的更新
                this.messageItemsNow.push({
                    nickName: 'newbee1',
                    avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                    type: 'right',
                    content: '你好dewdwededawdawdewadeawdeawdaw'
                });

                //下拉到最底部
                this.messageScrollTo(this.$refs[this.userInfo.nickName][0]);
            },
            /**
             * webSocket链接
             */
            webso() {
                this.wss = new WebSocket("wss://localhost:3100");
                this.wss.onopen = (event) => {
                };
                this.wss.onmessage = (event) => {
                };
                this.wss.onclose = (event) => {
                };
            },
            /**
             * 消息自动下拉
             * @param target
             */
            messageScrollTo(target) {
                //延迟一些时间等待dom渲染完毕后再调用，否则无效
                setTimeout(() => {
                    target.scrollToY(target.$el.children[0].clientHeight);
                }, 100);
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    @mixin center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .discuss {
        height: 100%;
        display: flex;
        flex-direction: column;
        .header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #e8e3e3;
            .userList {
                z-index: 100;
                top: 38px;
                left: 10px;
                position: absolute;
                background-color: #14191e;
                border-radius: 5px;
                box-shadow: 1px 1px 15px 2px #040506;
                color: #b5b9bc;
                max-height: 80%;
                .item {
                    padding: 10px;
                    width: 200px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    .avatar {
                        img {
                            height: 50px;
                            width: 50px;
                            border-radius: 50%;
                        }
                    }
                    .name {
                        margin-left: 10px;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    &:hover {
                        background-color: #20282f;
                    }
                }
            }
            .users {
                font-size: 18px;
                color: #495a6c;
                margin-left: 20px;
                padding: 10px 5px;
                cursor: pointer;
                user-select: none;
                outline: none;
                &:hover {
                    color: #748eab;
                }
            }
            .home {
                font-size: 18px;
                color: #495a6c;
                margin-right: 20px;
                padding: 10px 5px;
                cursor: pointer;
                user-select: none;
                &:hover {
                    color: #748eab;
                }
            }
            .group {
                @include center;
                margin-left: 10px;
                user-select: none;
                .small {
                    color: #b5b9bc;
                    font-size: 10px;
                }
            }
            .user {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .name {
                    color: #b5b9bc;
                    font-size: 14px;
                    font-weight: bold;
                    margin-right: 10px;
                }
                img {
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    margin: 8px 10px;
                    margin-right: 20px;
                    border: 1px solid #323c47;
                }
            }
        }
        .my-scrollbar {
            height: 1%;
            flex-grow: 1;
            max-height: 100%;
            .message {
                //避免overfloat时会拉伸影响其他布局
                height: 100%;
                box-sizing: border-box;
                padding: 15px;
                padding-right: 20px;
                width: 100%;
                .item {
                    .info {
                        display: flex;
                        align-items: center;
                        margin-bottom: 8px;
                        .avatar {
                            margin-right: 10px;
                            img {
                                border-radius: 50%;
                                width: 35px;
                                height: 35px;
                            }
                        }
                        .name {
                            font-size: 15px;
                            font-weight: 600;
                            color: #b5b9bc;
                        }
                    }
                    .content {
                        padding: 6px;
                        margin-bottom: 16px;
                        background-color: #409EFF;
                        border-radius: 7px;
                        position: relative;
                        font-size: 14px;
                        color: #ffffff;
                        &::before {
                            bottom: 100%;
                            left: 4%;
                            content: " ";
                            position: absolute;
                            pointer-events: none;
                            border: solid transparent;
                            border-bottom-color: #409eff;
                            border-width: 7px;
                        }
                    }
                }
                .item-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    .info {
                        display: block;
                        .name {
                            margin-top: 9px;
                            margin-right: 10px;
                            float: right;
                        }
                        .avatar {
                            margin: 0;
                            float: right;
                        }
                    }
                    .content {
                        background-color: #67c23a;
                        &::before {
                            left: auto;
                            right: 4%;
                            border-bottom-color: #67c23a;
                        }
                    }
                }
            }
            .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
                background: rgb(32, 40, 48);
            }
        }
        .control {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 15px 10px;
            margin-bottom: 62px;
            border-top: 1px solid #ddd5d5;
            box-sizing: border-box;
        }
    }
</style>

