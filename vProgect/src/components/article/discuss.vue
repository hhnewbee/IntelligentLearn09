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
                            v-for="user in usersOnlineList"
                            class="item"
                            @mousedown="handleChatChange(user,true)">
                        <img class="avatar" :src="user.avatarUrl"/>
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
            <div class="onlines" v-show="!priChat">
                <div class="small fa fa-television">
                    &nbsp;{{usersOnlineList.length}}在线
                </div>
            </div>
            <!--个体用户信息-->
            <div class="user" v-show="priChat">
                <div class="name">{{areaInfo.nickName}}</div>
            </div>
            <!--切回大厅-->
            <div
                    class="backHome fa fa-home"
                    @click="handleChatChange(homeAreaInfo,false)"
                    v-show="priChat">
            </div>
        </div>
        <vue-scrollbar
                class="my-scrollbar"
                v-for="area in chatAreas"
                :key="area.nickName"
                :ref="area.nickName"
                v-show="area.show">
            <div class="message">
                <div
                        class="item item-left"
                        v-for="messageItem in area.messageItems"
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
                        v-for="messageItem in area.messageItems"
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
    import uuidv1 from 'uuid/v1';

    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                //websocket实例
                wss: {},
                //是否打开用户列表
                showUserList: false,
                //当前在线用户列表
                usersOnlineList: [
                    {nickName: 'newbee1', avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg'},
                    {nickName: 'newbee2', avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg'}
                ],
                //是否私聊
                priChat: false,
                //主聊天区的信息
                homeAreaInfo: {},
                //和不同用户聊天的内容区
                chatAreas: [],
                //当前讨论区的信息，用于区分和切换聊天区
                areaInfo: {},
                //当前讨论区的items
                messageItemsNow: [],
                //发送的数据
                sendData: '',
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
                    ts.color = "#495a6c";
                } else {
                    ts.color = '#748eab';
                }
                this.showUserList = !this.showUserList;
            },
            /**
             * 切户讨论区
             * @param info
             * @param ifPri
             */
            handleChatChange(info, ifPri) {
                //header切换到单个用户聊天模式
                this.priChat = ifPri;
                //确定当前用户信息
                this.areaInfo = info;
                //聊天框的切换,判断当前聊天框是否打开过，如果已打开，复用，否则新添加
                let ifExit = false;
                this.chatAreas.forEach((item) => {
                    if (item.show = item.nickName === user.nickName) {
                        this.messageItemsNow = item.messageItems;
                        ifExit = true;
                    }
                });
                //如果当前讨论区没好有存在，则加入
                if (!ifExit) {
                    let newArea = {nickName: user.nickName, show: true, messageItems: []};
                    this.messageItemsNow = newArea.messageItems;
                    this.chatAreas.push(newArea);
                }

            },

            /**
             * 发送消息
             */
            handleSend() {
                //发送信息
                this.wss.send(JSON.stringify({
                    //发送者的昵称
                    nickName:"newbee",
                    //消息的类型
                    type: "groupChat",
                    //头像
                    avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                    //内容
                    content:this.sendData
                }));
                //本地信息处理
                this.messageLocalSet({
                    nickName: 'newbee1',
                    avatarUrl: 'http://localhost:3100/img/avatar/avatar.jpg',
                    type: 'right',
                    content: this.sendData
                })
            },

            /**
             * webSocket链接
             */
            webso() {
                this.wss = new WebSocket("ws://localhost:3200/"+JSON.stringify({nickName:'newbee',avatarUrl:'http://localhost:3100/img/avatar/avatar.jpg'}));
                //链接成功后回调
                this.wss.onopen = (event) => {

                };
                //收到服务器数据后回调
                this.wss.onmessage = (event) => {
                    //如果是加入的数据，就是在数组中追加一个用户
                    if(event.data.type==='join'){
                        this.usersOnlineList.push();
                        //否则就是加入信息
                    }else{
                        //todo 如果已经队列存在，加入队列，如果队列不是当前队列，则显示信息数
                        //todo 如果队列不存在，则创建新的队列，并且显示信息数
                        this.messageLocalSet(JSON.parse(event.data));
                    }
                };
                //断开链接后回调
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
            },
            /**
             * 初始化数据
             */
            initData(){
                //防止用户名和房间名重复，所以用uuid做为房间名,主要是用做讨论区切换时的标识
                this.homeAreaInfo = {nickName: uuidv1()};
                //初始化大厅讨论区
                this.chatAreas = [{
                    nickName: this.homeAreaInfo.nickName, show: true, messageItems: [
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
                //初始化当前讨论区的信息，如头部等信息
                this.areaInfo = this.homeAreaInfo;
                //将讨论区的信息items赋给当前信息items
                this.messageItemsNow = this.chatAreas[0].messageItems;
                //链接websock
                this.webso();
            },
            /**
             * 本地信息处理
             * @param message
             */
            messageLocalSet(message){
                //本地信息的更新
                this.messageItemsNow.push(message);

                //下拉到最底部
                this.messageScrollTo(this.$refs[this.areaInfo.nickName][0]);
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
        background-color: #f0f4f7;
        border: 1px solid #e8e3e3;
        /*头部*/
        .header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            border-bottom: 1px solid #e8e3e3;
            /*用户列表*/
            .userList {
                z-index: 100;
                top: 39px;
                left: 0px;
                position: absolute;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 1px 1px 4px #040506;
                color: #b5b9bc;
                max-height: 300px;
                /*用户列表的item*/
                .item {
                    padding: 5px 10px;
                    width: 200px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    border-bottom: 1px solid #f6f6f6;
                    .avatar {
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                    }
                    .name {
                        margin-left: 10px;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    &:hover {
                        color: #3c3c3c;
                        background-color: #f6f6f6;
                    }
                }
            }
            /*用户列表切换*/
            .users {
                font-size: 18px;
                color: #748eab;
                margin-left: 20px;
                padding: 10px 5px;
                cursor: pointer;
                user-select: none;
                outline: none;
                &:hover {
                    color: #495a6c;
                }
            }
            .backHome {
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
            .onlines {
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
            }
        }
        .my-scrollbar {
            height: 1%;
            flex-grow: 1;
            background-color: #f0f4f7;
            .message {
                //避免overfloat时会拉伸影响其他布局
                height: 100%;
                width: 100%;
                padding: 15px;
                padding-right: 20px;
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
                        min-width: 50px;
                        padding: 10px;
                        margin-bottom: 16px;
                        background-color: #409EFF;
                        border-radius: 7px;
                        position: relative;
                        font-size: 14px;
                        color: #ffffff;
                        &::before {
                            bottom: 100%;
                            left: 8px;
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
                            right: 8px;
                            border-bottom-color: #67c23a;
                        }
                    }
                }
            }
        }
        .control {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 15px 10px;
            border-top: 1px solid #ddd5d5;
            box-sizing: border-box;
        }
    }
</style>

