<template>
    <div class="comments">
        <!--问题-->
        <vue-scrollbar
                class="my-scrollbar"
                v-show="!ifList">
            <div class="commentsContent">
                <div class="item" v-for="(comment,index) in commentItems" :key="index">
                    <div class="head">
                        <img :src="comment.avatar">
                        <div class="name">
                            {{comment.name}}
                        </div>
                        <div class="tag" v-if="comment.tag!=='normal'">
                            {{comment.tag}}
                        </div>
                        <div class="time">
                            {{comment.time | formatDate}}
                        </div>
                    </div>
                    <div class="content">
                        {{comment.content}}
                    </div>
                    <div class="footer">
                        <span class="count fa fa-heart">
                            {{ comment.likes}}
                        </span>

                        <span
                                @click="handleAreaChange(true,comment)"
                                class="count fa fa-comments"
                                style="margin-left: 10px">
                            {{ comment.replys}}
                        </span>

                        <span
                                @click="reply(comment.name)"
                                class="count fa fa-reply"
                                style="margin-left: 10px"> 回复
                        </span>
                    </div>
                </div>
            </div>
        </vue-scrollbar>
        <!--对话列表-->
        <div
                v-for="area in commentArea"
                v-show="area.show"
                :key="area.name"
                class="commentList">
            <div class="listHeader">
                <div
                        @click="handleAreaChange(false)"
                        class="home fa fa-home"></div>
                <div class="info">
                    <div class="listName">{{area.name}}</div>
                    <img class="listAvatar" :src="area.avatar">
                </div>
            </div>
            <div class="listContent">
                {{area.content}}
                <span class="cheart fa fa-heart"> 34</span>
            </div>
            <div class="listItem">
                <vue-scrollbar class="my-scrollbar">
                    <div class="itemList">
                        <div class="item" v-for="item in area.itemList">
                            <div class="header">
                                <img :src="item.avatar"/>
                                <div class="name">{{item.name}}</div>
                                <div class="time">{{item.time | formatDate}}</div>
                            </div>
                            <div class="content">
                                {{item.content}}
                            </div>
                            <div class="footer">
                        <span class="count fa fa-heart">
                            {{ item.likes}}
                        </span>

                                <span
                                        @click="handleAreaChange(item,true)"
                                        class="count fa fa-comments"
                                        style="margin-left: 10px">
                            {{ item.replys}}
                        </span>

                                <span
                                        @click="reply(item.name)"
                                        class="count fa fa-reply"
                                        style="margin-left: 10px"> 回复
                        </span>
                            </div>
                        </div>
                    </div>
                </vue-scrollbar>
            </div>
        </div>
        <!--发送-->
        <div class="control">
            <textarea v-model="sendContent"></textarea>
            <el-button type="primary" class="send" size="small" :disabled="buttonDis" @click="send">评论</el-button>
        </div>
    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import uuidv1 from 'uuid/v1';

    export default {
        created() {
            //todo 获取评论
//            this.$ajax.all([
//                this.$ajax.get('getComments/' + "主题1" + "?pageIndex=1"),
//            ]).then(this.$ajax.spread((resInfo) => {
//                this.commentItems = resInfo.data;
//            }))
            this.areaNow=this.commentItems;
        },

        data() {
            return {
                ifList: false,
                commentItems: [
                    {
                        theme: 't1',
                        name: 'newbee1',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        tag: 'auto',
                        time: Date(),
                        content: '这是个问题1',
                        likes: '3',
                        replys: '5',
                        id: "1"
                    },
                    {
                        theme: 't1',
                        name: 'newbee2',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        tag: 'normal',
                        time: Date(),
                        content: '这是个问题2',
                        likes: '3',
                        replys: '5',
                        id: '2'
                    },
                    {
                        theme: 't1',
                        name: 'newbee3',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        tag: 'auto',
                        time: Date(),
                        content: '这是个问题3',
                        likes: '3',
                        replys: '5',
                        id: '3'
                    },
                    {
                        theme: 't1',
                        name: 'newbee3',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        tag: 'auto',
                        time: Date(),
                        content: '这是个问题3',
                        likes: '3',
                        replys: '5',
                        id: '3'
                    }
                ],
                commentArea: [],
                areaNow:{},
                sendContent:''
            }
        },

        methods: {
            handleAreaChange(ifList, userInfo) {
                //首先判断是否打开对话列表
                this.ifList = ifList;
                if (!ifList) {
                    this.commentArea.forEach((item) => {
                        item.show = false;
                    });
                    this.areaNow=this.commentItems;
                } else {
                    //列表的切换,判断当前列表是否打开过，如果已打开，复用，否则新添加
                    let ifAddN = false;
                    this.commentArea.forEach((item) => {
                        if (item.nickName === userInfo.nickName) {
                            item.show = ifAddN = true;
                        } else {
                            item.show = false;
                        }
                    });
                    if (!ifAddN) {
                        //todo 获取列表
//                        this.$ajax.get('?id='+userInfo.id).then((response)=>{
//                            this.commentArea.push({nickName:userInfo.nickName,show:true,itemList:response.data})
//                        }
                        let newList={
                            ...userInfo, show: true, itemList: [
                                {
                                    theme: 't2',
                                    name: 'newbee1',
                                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                                    tag: '',
                                    time: Date(),
                                    content: '回复1',
                                    likes: '3',
                                    replys: '5',
                                    id: "1"
                                },
                                {
                                    theme: 't2',
                                    name: 'newbee2',
                                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                                    tag: '',
                                    time: Date(),
                                    content: '回复1',
                                    likes: '3',
                                    replys: '5',
                                    id: '2'
                                },
                                {
                                    theme: 't2',
                                    name: 'newbee3',
                                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                                    tag: 'auto',
                                    time: Date(),
                                    content: '回复1',
                                    likes: '3',
                                    replys: '5',
                                    id: '3'
                                }
                            ]
                        };
                        this.commentArea.push(newList);
                        this.areaNow=newList.itemList;
                    }
                }
            },
            send() {
                this.areaNow.unshift({
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    name: 'newbee',
                    time: Date(),
                    likes: 0,
                    replys: 0,
                    tag: "normal",
                    content: this.sendContent
                });
                this.sendContent= '';
            },
            reply(name) {
                this.sendContent = "@" + name + " "
            }
        },
        computed: {
            buttonDis() {
                return this.sendContent=== "";
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    .comments {
        height: inherit;
        display: flex;
        flex-direction: column;
        background-color: #14191e;
        .my-scrollbar {
            background-color: #14191e;
            max-height: 100%;
            height: 100%;
            margin-right: 5px;
            .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
                background: rgb(32, 40, 48);
            }
        }
        .commentsContent {
            width: 100%;
            height: 100%;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            padding: 10px;
            color: #b5b9bc;
            .item {
                min-width: 280px;
                margin-bottom: 20px;
                margin-right: 8px;
                box-shadow: 0px 0px 10px 1px #0b0e11;
                border-radius: 5px;
                padding: 10px 10px;
                .head {
                    display: flex;
                    align-items: center;
                    position: relative;
                    border-radius: 4px 4px 0 0;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid gray;
                        z-index: 2;
                    }
                    .name {
                        margin-left: 8px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .tag {
                        background: #F44336;
                        font-size: 12px;
                        padding: 3px 5px;
                        font-weight: 700;
                        margin-left: 10px;
                        border-radius: 3px;
                    }
                    .time {
                        font-size: 13px;
                        margin-left: 10px;
                    }
                }
                .content {
                    font-size: 15px;
                    /*强制英文断词*/
                    word-break: break-all;
                    padding: 15px 0;
                }
                .footer {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    span {
                        color: #495a6c;
                        font-size: 14px;
                        &:hover {
                            color: #b5b5b5;
                        }
                    }
                }
            }
        }
        /*评论列表*/
        .commentList {
            height: 1%;
            flex-grow: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            padding-bottom: 10px;
            .listHeader {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                border-bottom: 1px solid #0e1114;
                padding: 5px;
                .home {
                    margin-left: 20px;
                    font-size: 18px;
                }
                .info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    flex-grow: 1;
                    .listName {
                    }
                    .listAvatar {
                        margin-left: 10px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
            }
            .listContent {
                box-shadow: 1px 1px 1px 1px black;
                min-height: 100px;
                margin: 10px 15px;
                padding: 5px 10px;
                position: relative;
                .cheart{
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    color: #495a6c;
                    &:hover{
                        color:#b5b5b5;
                    }
                }
            }
            .listItem{
                height: 1%;
                flex-grow: 1;
                .itemList{
                    height: 100%;
                    .item {
                        margin: 10px 15px;
                        border-top: 1px solid #1d242b;
                        .header {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding-top: 10px;
                            img {
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;
                            }
                            .name {
                                margin-left: 10px;
                            }
                            .time {
                                margin-left: 10px;
                            }
                        }
                        .content {
                            margin: 10px 0;
                            font-size: 15px;
                        }
                        .footer {
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            margin: 10px 0;
                            span {
                                color: #495a6c;
                                font-size: 14px;
                                &:hover {
                                    color: #b5b5b5;
                                }
                            }
                        }
                    }
                }
            }
        }
        .control {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #0a0b0e;
            padding: 10px 10px;
            textarea {
                flex-grow: 1;
                width: 50%;
                height: 40px;
                border-radius: 5px;
                resize: none;
                padding: 5px;
                border: 1px solid #262e37;
                font-size: 14px;
                color: #b5b9bc;
                background-color: #262e37;
            }
            .send {
                border: 0;
                background-color: #a6adb4;
                margin-left: 10px;
                height: 30px;
            }
        }
    }
</style>

