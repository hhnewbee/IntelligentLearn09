<template>
    <div id="questionIL09">
        <div class="left">
            <!--问题信息-->
            <div class="autorDetail">
                <img
                        class="avatar"
                        :src="question.avatar">
                <div class="name">{{question.nickname}}</div>
                <div class="time">时间：{{question.time}}</div>
                <div class="type">类型：金融</div>
            </div>
            <!--问题的内容-->
            <div class="article">
                <div
                        class="content">
                    {{question.content}}
                </div>

                <div class="info">
                    <div class="likes fa fa-heart ic">
                        &nbsp;{{question.likes}}人喜欢
                    </div>
                    <div class="collection fa fa-star ic">
                        &nbsp;{{question.collections}}个收藏
                    </div>
                </div>

            </div>
            <!--展示选择-->
            <div class="answerDetail">
                <el-radio-group
                        v-model="choose"
                        size="small"
                        style="margin-right: 20px">
                    <el-radio-button label="最新"></el-radio-button>
                    <el-radio-button label="最热"></el-radio-button>
                </el-radio-group>
            </div>
            <!--答案列表-->
            <div v-for="answer in answerList" class="article">
                <div class="detail" style="position: relative">
                    <img class="avatar"
                         :src="answer.userIconUrl">
                    <div class="name">{{answer.username}}</div>
                    <div class="time" style="position:absolute;right: 0">
                        时间：{{answer.creationTimestamp | formatFromNow}}
                    </div>
                </div>
                <div
                        class="content">
                    {{answer.content}}
                </div>
                <div class="info" style="align-self: flex-start">
                    <div class="likes fa fa-heart ic">&nbsp;{{answer.likes}}人赞同</div>
                    <div @click="openChatList(answer)"
                         class="comments fa fa-comments ic">
                        &nbsp;{{answer.answers}}个回复
                    </div>
                </div>
            </div>
            <el-pagination
                    style="margin-top: 20px;align-self: center"
                    background
                    layout="prev, pager, next"
                    :total="answerList.length">
            </el-pagination>
            <!--答案回复列表-->
            <el-dialog :visible.sync="chatListVisible">
                <!--回复列表items-->
                <div class="replysList">
                    <div class="listHeader">
                        <img class="listAvatar" :src="replyData.userIconUrl">
                        <div class="listName">{{replyData.username}}</div>
                    </div>
                    <div class="listContent">
                        <p>{{replyData.content}}</p>
                        <div class="cheart el-icon-time">
                            &nbsp;{{replyData.creationTimestamp | formatDateTime}}
                        </div>
                        <div class="cheart fa fa-heart"
                             @click="handleSupport(area)">&nbsp;0
                        </div>
                    </div>
                    <div class="itemCount">
                        {{listNow.length}}&nbsp;个回答
                    </div>
                    <vue-scrollbar class="my-scrollbar">
                        <div class="itemsList">
                            <div class="item"
                                 v-for="item in replyList">
                                <div class="header">
                                    <img :src="item.userIconUrl"/>
                                    <div class="name">{{item.username}}</div>
                                    <div class="time">{{item.creationTimestamp | formatFromNow}}</div>
                                </div>
                                <div class="content" style="color:black">
                                    {{item.content}}
                                </div>
                                <div class="footer">
                                    <span class="count fa fa-heart"
                                          :ref="'liking'+item.id"
                                          @click="handleLikeAcollect('question/liking/',item)">
                                        &nbsp;0人赞同
                                    </span>
                                    <span class="count fa fa-comments"
                                          style="margin-left: 10px">
                                        &nbsp;{{item.replies}}人回复
                                     </span>
                                </div>
                            </div>
                        </div>
                    </vue-scrollbar>
                </div>
                <div style="display: flex;justify-content: center;align-items: flex-end;margin-top: 20px">
                    <el-input
                            style="width: 522px;margin-right: 10px;"
                            type="textarea"
                            :autosize="{minRows: 2}"
                            resize="none"
                            placeholder="请输入回复内容"
                            v-model="replyInput">
                    </el-input>
                    <el-button type="primary"
                               size="medium"
                               disabled>
                        回复
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div class="right">
            <el-button
                    @click="openEditor"
                    type="primary"
                    style="width: 100%">我要回答
            </el-button>
            <el-dialog
                    title="编辑回答"
                    :visible.sync="EditorVisible">
                <myLearnerEditor></myLearnerEditor>
            </el-dialog>
            <rightItem
                    :contents="similarityQuestion"
                    :option="{title:'相似问题'}"></rightItem>
        </div>
        <footer_></footer_>
    </div>
</template>

<script>
    import rightItem from '../main/rightItem.vue';
    import myLearnerEditor from '../edit/myLearnerEditor.vue';
    import footer_ from '../footer/footer.vue';
    import {areaCaching, likeAcollect} from '../mixins.js';
    import VueScrollbar from 'vue2-scrollbar'

    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                //问题主体
                question: {},
                //类型的选择
                choose: '最新',
                //答案列表
                answerList: [],
                //相似问题
                similarityQuestion: [],
                //对话列表是否打开
                chatListVisible: false,
                //对话列表内容
                replyList: [],
                //回复input
                replyInput: '',
                //回答编辑区显示
                EditorVisible: false,
                //回复主体内容
                replyData: {}
            }
        },
        methods: {
            /**
             * 初始化数据
             */
            initData() {
                this.question = {
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickname: 'newbee1',
                    time: '2018-1-1',
                    content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                    likes: '22',
                    answers: '22',
                    collections: '22'
                };
                this.answerList = [
                    {
                        id: "1",
                        username: 'newbee1',
                        userIconUrl: 'http://localhost:3100/img/avatar/softIcon.jpg',
                        creationTimestamp: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                    {
                        id: "1",
                        username: 'newbee1',
                        userIconUrl: 'http://localhost:3100/img/avatar/softIcon.jpg',
                        creationTimestamp: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                    {
                        id: "1",
                        username: 'newbee1',
                        userIconUrl: 'http://localhost:3100/img/avatar/softIcon.jpg',
                        creationTimestamp: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                ];
                this.similarityQuestion = [
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                    {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-1-4 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-12-23 22:33'}
                ]
                //todo 初始化答案列表 答案列表用question保存，防止被弹出大安回复的listNow覆盖
//                this.answerList=this.listNow;
            },
            /**
             * 打开对话列表
             * @param dataAnswer - 答案的内容
             */
            openChatList(dataAnswer) {
                this.replyData = dataAnswer;
                this.replyList = [
                    {
                        id: "2",
                        userIconUrl: 'http://localhost:3100/img/avatar/softIcon.jpg',
                        username: 'newbee1',
                        creationTimestamp: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        replies: '22',
                    },
                    {
                        id: "3",
                        userIconUrl: 'http://localhost:3100/img/avatar/softIcon.jpg',
                        username: 'newbee1',
                        creationTimestamp: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行',
                        likes: '22',
                        replies: '22',
                    },

                ];
                this.chatListVisible = true;
            },
            /**
             * 打开回答editor
             */
            openEditor() {
                this.EditorVisible = true;
            }
        },
        components: {
            rightItem,
            myLearnerEditor,
            footer_,
            VueScrollbar
        },
        mixins: [areaCaching, likeAcollect]
    }
</script>

<style lang="scss">
    #questionIL09 {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 40px 20px 0;
        background-color: $mainPageColor;
        .left {
            display: flex;
            flex-direction: column;
            margin-right: 60px;
            align-self: flex-start;
            .autorDetail {
                display: flex;
                justify-content: flex-start;
                position: relative;
                margin-bottom: 10px;
                align-items: center;
                font-size: 13px;
                color: rgba(57, 66, 79, 0.61);
                .avatar {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    border-radius: 50%
                }
                .name {
                    font-weight: bold;
                    font-size: 16px;
                    margin-right: 10px;
                    color: #1a1a1a;
                }
                .time {
                    font-size: 14px;
                }
                .type {
                    position: absolute;
                    font-weight: bold;
                    right: 5px;
                }
            }
            .article {
                display: flex;
                flex-direction: column;
                width: 800px;
                padding: 16px 20px;
                background-color: #ffffff;
                box-shadow: 2px 2px 10px rgba(136, 136, 136, 0.51);
                .detail {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 13px;
                    color: rgba(57, 66, 79, 0.61);
                    .avatar {
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        border-radius: 50%
                    }
                    .name {
                        font-weight: bold;
                        font-size: 16px;
                        margin-right: 10px;
                        color: #1a1a1a;
                    }
                    .time {
                        font-size: 12px;
                    }
                }
                .content {
                    margin-top: 5px;
                    margin-bottom: 10px;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.67;
                    color: #000000;
                }
                .info {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    align-self: flex-end;
                    color: rgba(57, 66, 79, 0.61);
                    font-size: 13px;
                    cursor: pointer;
                    .ic {
                        font-size: 14px;
                        margin-right: 20px;
                        &:hover {
                            color: rgba(17, 18, 22, 0.61);
                        }
                    }
                }
            }
            .answerDetail {
                align-self: flex-end;
                margin: 20px 0;
            }
            .el-dialog {
                display: flex;
                flex-direction: column;
                width: 600px;
                max-height: 90%;
                padding-top: 5px;
                .el-dialog__body {
                    padding-bottom: 15px;
                    height: 1%;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    /*回复的列表*/
                    .replysList {
                        height: 1%;
                        flex-grow: 1;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        padding-bottom: 10px;
                        background-color: white;
                        .listHeader {
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            .listName {
                                color: $primaryColor;
                                font-weight: bold;
                                font-size: 16px;
                                margin-left: 8px;
                            }
                            .listAvatar {
                                margin: 5px 0;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                            }
                        }
                        .listContent {
                            flex-shrink: 0;
                            box-shadow: 1px 1px 4px #c4c4c4;
                            margin: 5px 0;
                            min-height: 80px;
                            padding: 8px 10px;
                            position: relative;
                            font-size: 15px;
                            color: black;
                            p {
                                padding-bottom: 15px;
                            }
                            div:nth-child(2) {
                                color: #b5b9bc;
                                left: 10px;
                                bottom: 5px;
                            }
                            div:nth-child(3){
                                cursor: pointer;
                                right: 10px;
                                &:hover {
                                    color: #6a819c;
                                }
                            }
                            .cheart {
                                position: absolute;
                                bottom: 5px;
                                color: #b5b5b5;
                                font-size: 12px;
                            }
                        }
                        .itemCount {
                            flex-shrink: 0;
                            margin: 5px 15px;
                            color: #9e9e9e;
                            font-size: 13px;
                            border-bottom: 1px solid #ddd5d5;
                        }
                        .my-scrollbar {
                            height: 1%;
                            width: 100%;
                            flex-grow: 1;
                            .itemsList {
                                .item {
                                    width: 92%;
                                    padding: 10px 10px;
                                    background-color: white;
                                    .header {
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
                                            font-size: 16px;
                                            font-weight: 700;
                                            color: $primaryColor;
                                        }
                                        .tag {
                                            padding: 2px 4px;
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
                                .item {
                                    margin: 5px 15px;
                                    border-bottom: 1px solid #ddd5d5;
                                }
                            }
                        }
                    }
                }
            }
        }
        .right {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-dialog {
                min-width: 580px;
                height: 80%;
                .el-dialog__body {
                    height: 90%;
                }
            }
        }
    }
</style>

