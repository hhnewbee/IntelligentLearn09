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
                            @mousedown="handleChatChange(user.nickName)">
                        <img class="avatar" :src="user.avatarUrl"/>
                        <div class="name">
                            {{user.nickName}}
                        </div>
                        <div v-if="user.messages!==0">
                            {{user.messages}}
                        </div>
                    </div>
                </div>
                <div class="item"
                     v-if="usersOnlineList.length===0"
                     style="font-size: 12px">
                    暂无用户在线
                </div>
            </vue-scrollbar>

            <!--用户列表切切换-->
            <div
                    tabindex="1"
                    class="users fa fa-user"
                    @blur="handleShowList(false,$event)"
                    @click="handleShowList(true,$event)"></div>
            <!--大厅的信息-->
            <div class="onlines" v-if="areaNow.target===discussInfo.theme">
                <div class="small fa fa-television">
                    &nbsp;{{usersOnlineList.length}}人在线
                </div>
            </div>
            <!--个体用户信息-->
            <div class="user" v-if="areaNow.target!==discussInfo.theme">
                <div class="name">{{areaNow.target}}</div>
            </div>
            <!--切回大厅-->
            <div class="backHome fa fa-home"
                 @click="handleChatChange(discussInfo.theme)"
                 v-if="areaNow.target!==discussInfo.theme">
            </div>
        </div>

        <!--信息显示区-->
        <vue-scrollbar
                class="my-scrollbar"
                v-for="area in chatAreas"
                :key="area.target"
                :ref="area.target"
                v-show="area.show">
            <div class="message">
                <div
                        class="item item-left"
                        v-for="messageItem in area.messageItems"
                        v-if="messageItem.type==='get'">
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
                        v-if="messageItem.type==='send'"
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
    import { mapState } from 'vuex';
    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                discussInfo:{
                    theme:'vue',
                    nickName:'newbeee111',
                    avatarUrl:'http://localhost:3100/img/avatar/avatar.jpg'
                },
                //websocket实例
                wss: {},
                //是否打开用户列表
                showUserList: false,
                //当前在线用户列表
                usersOnlineList: [
                    {
                        nickName:'',
                        avatarUrl:'',
                        messages: 0
                    }
                ],
                //讨论区的集合
                chatAreas: [
                    {
                        //target（用户昵称/文章或视频标题）是区分不同讨论区的标识
                        target: '',
                        //是否显示当前讨论区
                        show:false,
                        //消息的集合
                        messageItems: []
                    }
                ],
                //当前讨论区的信息的标识，用于区分和切换讨论区
                areaNow: {
                    target:'',
                },
                //当前讨论区的items
                messageItemsNow: [
                    {
                        nickName: '',
                        avatarUrl:'',
                        //是发送还是接受信息，用于前端显示的区分
                        type: 'get/send',
                        content: ''
                    }
                ],
                //发送的数据
                sendData: '',
            }
        },
        computed:{
            ...mapState('info',['account'])
        },
        methods: {
            /**
             * 是否展示用户列表
             * @param boole
             * @param e
             */
            handleShowList(boole,e) {
                let ts = e.target.style;
                if (!this.showUserList) {
                    ts.color = "#495a6c";
                } else {
                    ts.color = '#748eab';
                }
                this.showUserList = boole;
            },
            /**
             * 切户讨论区
             * @param target
             */
            handleChatChange(target) {
                //确定当前用户信息
                this.areaNow.target = target;
                //讨论框的切换,判断当前讨论框是否打开过，如果已打开，复用，否则新添加
                let ifExit = false;
                this.chatAreas.forEach((item) => {
                    if (item.show = item.target === target) {
                        this.messageItemsNow = item.messageItems;
                        ifExit = true;
                    }
                });
                //如果当前讨论区没好有存在，则加入
                if (!ifExit) {
                    let newArea = {target: target, show: true, messageItems: []};
                    this.chatAreas.push(newArea);
                    this.messageItemsNow = newArea.messageItems;
                }
                //清除显示的信息数
                this.usersOnlineList.forEach((user)=>{
                    if(user.nickName===target){
                        user.messages=0;
                    }
                })
            },

            /**
             * 发送消息
             */
            handleSend() {
                //发送信息
                this.wss.send(JSON.stringify({
                    //头像
                    //发送者的昵称
                    //文章或视频的标题
                    ...this.discussInfo,
                    //发送的对象
                    target:this.areaNow.target,
                    //消息的类型
                    type: "message",
                    //内容
                    content: this.sendData
                }));
                //本地信息处理
                this.messageLocalSet({
                    ...this.discussInfo,
                    type: 'send',
                    content: this.sendData
                })
            },

            /**
             * webSocket链接
             */
            webso() {
                this.wss = new WebSocket("ws://localhost:3200/");
                //链接成功后回调
                this.wss.onopen = (event) => {
                    this.wss.send(JSON.stringify({
                        ...this.discussInfo,
                        type:'join'
                    }));
                };
                //收到服务器数据后回调
                this.wss.onmessage = (event) => {
                    //获取的数据
                    let data=JSON.parse(event.data);
                    //如果是用户加入，就是在用户数组中追加一个用户
                    if (data.type === 'join') {
                        this.usersOnlineList.push(
                            {
                                nickName: data.nickName,
                                avatarUrl:data.avatarUrl,
                                messages: 0
                            });
                        //获取私人信息
                    }else if(data.type === 'exit'){
                        this.usersOnlineList.forEach(function (user) {
                            if(user.nickName===data.nickName){
                                //移除用户在用户列表中，但讨论区并未移除
                                this.splice(this.findIndex(user),1);
                            }
                        })
                    } else{
                        let ifHas = false;
                        //如果当前区域正好为该用户讨论区域
                        if (this.areaNow.target ===data.nickName) {
                            //显示信息并且下拉到底部
                            this.messageLocalSet(data);
                        } else {
                            //如果不在当前区域，则加入到对应的信息数组中
                            this.chatAreas.forEach((chatArea) => {
                                if (chatArea.target === data.target) {
                                    chatArea.messageItems.push({
                                        nickName: data.nickName,
                                        avatarUrl: data.avatarUrl,
                                        type: 'get',
                                        content: data.content
                                    },);
                                    ifHas = true;
                                }
                            });
                            //如果该信息数组没有被创建,则重新创建
                            if (!ifHas) {
                                this.chatAreas.push({
                                    target: data.nickName, show: false, messageItems: [
                                        {
                                            nickName: data.nickName,
                                            avatarUrl: data.avatarUrl,
                                            type: 'get',
                                            content: data.content
                                        },
                                    ]
                                })
                            }
                            //在用户列表中显示信息数
                            this.usersOnlineList.forEach(user=>{
                                if(user.nickName===data.nickName){
                                    user.messages++;
                                    if(user.messages>=99){
                                        user.messages='99+'
                                    }
                                }
                            })
                        }
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
            initData() {
                //初始化当前讨论的信息
                this.discussInfo.nickName=this.account;
                //初始化大厅讨论区
                this.chatAreas = [
                    {
                        target: this.discussInfo.theme, show: true, messageItems: []
                    }
                ];
                //将讨论区的信息items赋给当前信息items
                this.messageItemsNow = this.chatAreas[0].messageItems;
                this.areaNow.target=this.discussInfo.theme;
                this.usersOnlineList=[];
                //链接websock
                this.webso();
            },
            /**
             * 本地信息处理
             * @param message
             */
            messageLocalSet(message) {
                //本地信息的更新
                this.messageItemsNow.push(message);

                //下拉到最底部
                this.messageScrollTo(this.$refs[this.areaNow.target][0]);
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    $borderColor: #e8e3e3;
    @mixin center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .discuss {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f0f4f7;
        border: 1px solid $borderColor;
        /*头部*/
        .header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            border-bottom: 1px solid $borderColor;
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
                    div:nth-child(3) {
                        margin-left: 40px;
                        background-color: #f56c6c;
                        border-radius: 10px;
                        color: #fff;
                        display: inline-block;
                        font-size: 12px;
                        height: 18px;
                        line-height: 18px;
                        padding: 0 6px;
                        text-align: center;
                        white-space: nowrap;
                        border: 1px solid #fff;
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
            width: 100%;
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
            border-top: 1px solid $borderColor;
            box-sizing: border-box;
        }
    }
</style>

