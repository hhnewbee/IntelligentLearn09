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
                            v-for="user in Array.from(this.usersOnlineList)"
                            class="item"
                            @mousedown="handleChatChange(user[0])">
                        <info-detail :account="user[0]"
                                     :avatarUrl="user[1].avatarUrl"
                                     :size="28">
                        </info-detail>
                        <div class="name">
                            {{user[0]}}
                        </div>
                        <div v-if="user[1].messages!==0">
                            {{user[1].messages}}
                        </div>
                    </div>
                </div>
                <div class="item"
                     v-if="usersOnlineList.size===0"
                     style="font-size: 12px">
                    暂无用户在线
                </div>
            </vue-scrollbar>
            <!--用户列表切切换-->
            <div tabindex="1"
                 class="users fa fa-user"
                 @blur="handleShowList(false,$event)"
                 @click="handleShowList(true,$event)"></div>
            <!--大厅的信息-->
            <div class="onlines" v-if="areaNow.target===discussInfo.theme">
                <div class="small fa fa-television">
                    &nbsp;{{usersOnlineList.size}}人在线
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
                v-for="area in Array.from(chatAreas)"
                :key="area[0]"
                :ref="area[0]"
                v-show="area[1].show">
            <div class="message">
                <div
                     v-for="messageItem in messageItemsNow">
                    <div v-if="messageItem.type==='get'"
                         class="item">
                        <div class="info">
                            <div class="avatar">
                                <info-detail :avatarUrl="messageItem.avatarUrl"
                                             :account="messageItem.nickName"
                                             :size="35">
                                </info-detail>
                            </div>
                            <div class="name">
                                {{messageItem.nickName}}
                            </div>
                        </div>
                        <div class="content">
                            {{messageItem.content}}
                        </div>
                    </div>
                    <div v-if="messageItem.type==='send'"
                         class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <info-detail :avatarUrl="messageItem.avatarUrl"
                                             :account="messageItem.nickName"
                                             :size="35">
                                </info-detail>
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
            </div>
        </vue-scrollbar>

        <!--发送部分-->
        <div class="control">
            <div class="expandingArea ">
                <div>{{sendData}}<br></div>
                <textarea placeholder="请输入内容"
                          @keyup.enter.prevent="handleSend"
                          v-model="sendData">
                </textarea>
            </div>
            <el-button
                    @click="handleSend"
                    type="primary"
                    size="mini"
                    style="margin-left: 10px;align-self: flex-end">
                发送
            </el-button>
        </div>

        <!--帮助vue对map做响应-->
        <div v-show="statusHelp"></div>

    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import infoDetail from '../userCenter/infoDetail.vue';
    export default {
        created() {
            this.initData();
        },
        props:['discussInfo'],
        data() {
            return {
                //websocket实例
                wss: {},
                //是否打开用户列表
                showUserList: false,
                //当前在线用户列表
                usersOnlineList: new Map(),
                //讨论区的集合
                chatAreas:new Map(),
                //当前讨论区的信息的标识，用于区分和切换讨论区
                areaNow:{},
                //当前讨论区的items
                messageItemsNow:[],
                //发送的数据
                sendData: '',
                //用来帮助map监听状态的响应
                statusHelp:false
            }
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
                //关闭之前的讨论区
                this.chatAreas.get(this.areaNow.target).show=false;
                //确定当前用户信息
                this.areaNow.target = target;
                //判断当前讨论区是否打开过，如果已打开，复用，否则新添加
                let chatArea=this.chatAreas.get(target);
                if(chatArea!==undefined){
                    chatArea.show=true;
                    this.messageItemsNow=chatArea.messageItems;
                    //如果当前讨论区没好有存在，则加入
                }else{
                    let newArea={show:true,messageItems:[]};
                    this.chatAreas.set(target,newArea);
                    this.messageItemsNow = newArea.messageItems;
                }
                //如果不是切回主页
                if(this.discussInfo.theme!==target){
                    //清除显示的信息数
                    this.usersOnlineList.get(target).messages=0;
                }
            },

            /**
             * 发送消息
             */
            handleSend() {
                //发送信息
                this.wss.send(JSON.stringify({
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
                });
                //信息清空
                this.sendData='';
            },

            /**
             * webSocket链接
             */
            webso() {
                this.wss = new WebSocket("ws://172.16.116.18:3200");
                //链接成功后回调，通知后端有用户加入
                this.wss.onopen = () => {
                    this.wss.send(JSON.stringify({
                        ...this.discussInfo,
                        type:'join'
                    }));
                };
                //收到服务器数据后回调
                this.wss.onmessage = (event) => {
                    //获取的数据
                    let data=JSON.parse(event.data);
                    //如果是用户加入，就是在用户集合中追加一个用户
                    if (data.type === 'join') {
                        this.usersOnlineList.set(
                            data.nickName,
                            {avatarUrl:data.avatarUrl,messages: 0}
                        );
                    //如果是用户退出，就是在用户集合删减一个用户
                    }else if(data.type === 'exit'){
                        this.usersOnlineList.delete(data.nickName);
                    //如果是发送消息
                    }else{
                        //设置本地消息类型为接收
                        data.type='get';
                        //如果是群聊信息
                        if(this.discussInfo.theme ===data.target){
                            //如果当前讨论区为群聊
                            if (this.areaNow.target ===data.target) {
                                //本地信息的显示处理
                                this.messageLocalSet(data);
                            }else{
                                this.chatAreas.get(data.target).messageItems.push(data);
                            }
                            //如果是个人信息
                        }else{
                            //如果当前区域正好为该用户讨论区域
                            if (this.areaNow.target ===data.nickName) {
                                this.messageLocalSet(data);
                            } else {
                                //如果不在当前区域，则加入到对应的信息数组中
                                if(this.chatAreas.has(data.nickName)){
                                    this.chatAreas.get(data.nickName).messageItems.push(data);
                                    //如果该信息数组没有被创建,则重新创建
                                }else{
                                    this.chatAreas.set(data.nickName, {
                                        show: false,
                                        messageItems: [data]
                                    });
                                }
                                //在用户列表中显示信息数
                                let user=this.usersOnlineList.get(data.nickName);
                                if(user.messages++>99){
                                    user.messages='99+'
                                }
                            }
                        }
                    }
                    this.statusHelp=!this.statusHelp;
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
                //初始化大厅讨论区
                this.chatAreas.set(
                    this.discussInfo.theme,
                    {show: true, messageItems: []}
                );
                //将讨论区的信息items赋给当前信息items
                this.messageItemsNow = this.chatAreas.get(this.discussInfo.theme).messageItems;
                //设置当前讨论区
                this.areaNow.target=this.discussInfo.theme;
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
            VueScrollbar,
            infoDetail
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
        max-width: 500px;
        display: flex;
        flex-direction: column;
        background-color: #f0f4f7;
        border: 1px solid $borderColor;
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
                        @include HHVcenter;
                        margin-left: 65px;
                        background-color: $primaryColor;
                        font-size: 12px;
                        height: 1.5em;
                        width: 1.5em;
                        color: white;
                        border-radius: 50%;
                        white-space: nowrap;
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
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    .info {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                        .avatar {
                            margin-right: 10px;
                        }
                        .name {
                            font-size: 15px;
                            font-weight: 600;
                            color: #b5b9bc;
                        }
                    }
                    .content {
                        min-width: 50px;
                        max-width: 80%;
                        max-height: 280px;
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
            .expandingArea{
                display: inline-block;
                position:relative;
                width: 100%;
                min-height: 52px;
                font-size: 14px;
                vertical-align: bottom;
                div{
                    padding: 5px 15px;
                    line-height: 1.5;
                    word-break:break-all;
                    visibility:hidden;
                }
                textarea{
                    position:absolute;
                    top:0;
                    left:0;
                    width: 100%;
                    height:100%;
                    resize: none;
                    padding: 5px 15px;
                    line-height: 1.5;
                    color: #606266;
                    background-color: #fff;
                    border: 1px solid #dcdfe6;
                    border-radius: 4px;
                    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                }
            }
            display: flex;
            align-items: center;
            width: 100%;
            padding: 15px 10px;
            border-top: 1px solid $borderColor;
            box-sizing: border-box;
        }
    }
</style>

