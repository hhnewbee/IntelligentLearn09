<template>
    <div class="comments">
        <!--问题items-->
        <vue-scrollbar
                class="my-scrollbar"
                v-show="!ifList">
            <div class="commentsContent">
                <div
                        class="item"
                        v-for="(comment,index) in commentItems" :key="index">
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
                            {{ comment.likes}}人喜欢
                        </span>

                        <span
                                @click="handleAreaChange(true,comment)"
                                class="count fa fa-comments"
                                style="margin-left: 10px">
                            {{ comment.replys}}人回答
                        </span>

                        <span
                                @click="reply(comment.name)"
                                class="count fa fa-reply"
                                style="margin-left: 10px"> 回答
                        </span>
                    </div>
                </div>
            </div>
        </vue-scrollbar>
        <!--回答列表items-->
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
                <span class="cheart el-icon-time" style="color:#b5b9bc;left: 10px;bottom: 5px">&nbsp;2015-1-1 10:10</span>
                <span class="cheart fa fa-heart">&nbsp;34</span>
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
            <el-input
                    resize="none"
                    type="textarea"
                    :autosize="{ minRows: 1}"
                    placeholder="请输入内容"
                    v-model="sendData">
            </el-input>
            <el-button
                    type="primary"
                    size="mini"
                    :disabled="buttonDis"
                    style="align-self: flex-end;margin-left: 10px"
                    @click="send">
                评论</el-button>
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
                sendData:''
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
                    content: this.sendData
                });
                this.sendData= '';
            },
            reply(name) {
                this.sendData = "@" + name + " "
            }
        },
        computed: {
            buttonDis() {
                return this.sendData=== "";
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    $primaryColor:#409EFF;
    .comments {
        height: 100%;
        width: 300px;
        display: flex;
        flex-direction: column;
        border: 1px solid #eeeeee;
        background-color: #eeeeee;
        .my-scrollbar {
            height: 100%;
            flex-grow: 1;
            background-color: #eeeeee;
            //问题的列表
            .commentsContent {
                width: 100%;
                height: 100%;
                display: flex;
                box-sizing: border-box;
                flex-direction: column;
                padding: 10px;
                color: #000000;
                /*问题的item*/
                .item {
                    width: 265px;
                    margin-right: 8px;
                    padding: 10px 10px;
                    margin-bottom: 20px;
                    background-color: white;
                    box-shadow: 1px 1px 5px 1px #b3b3b3;
                    .head {
                        display: flex;
                        align-items: center;
                        position: relative;
                        border-radius: 4px 4px 0 0;
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            z-index: 2;
                        }
                        .name {
                            margin-left: 8px;
                            font-size: 15px;
                            font-weight: 700;
                            color:$primaryColor;
                        }
                        .tag {
                            padding:2px 4px;
                            margin-left: 10px;
                            background: #409eff;
                            font-size: 12px;
                            font-weight: bold;
                            color: #ffffff;
                            border-radius: 3px;
                        }
                        .time {
                            font-size: 12px;
                            color: #9E9E9E;
                            margin-left: 10px;
                        }
                    }
                    .content {
                        font-size: 15px;
                        /*强制英文断词*/
                        word-break: break-all;
                        padding-top: 5px;
                        padding-bottom: 10px;
                    }
                    .footer {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        span {
                            color: #9E9E9E;
                            font-size: 12px;
                            &:hover {
                                color: #b5b5b5;
                            }
                        }
                    }
                }
            }
        }
        /*回答的列表*/
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
                border-bottom: 1px solid #ddd5d5;
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
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }
            }
            .listContent {
                box-shadow: 1px 1px 4px #c4c4c4;
                min-height: 100px;
                margin: 10px 15px;
                padding: 5px 10px;
                position: relative;
                font-size: 15px;
                color: black;
                .cheart{
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    color: #495a6c;
                    font-size: 12px;
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
                        margin: 5px 15px;
                        border-top: 1px solid #ddd5d5;
                        .header {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding-top: 10px;
                            img {
                                width: 30px;
                                height: 30px;
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
                            padding: 5px 0;
                            font-size: 15px;
                        }
                        .footer {
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            span {
                                color: #9E9E9E;
                                font-size: 12px;
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
            align-items: center;
            padding: 15px 10px;
            padding-bottom: 20px;
            border-top: 1px solid #ddd5d5;

        }
    }
</style>

