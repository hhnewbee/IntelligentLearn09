<template>
    <div class="question">
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
                    <div class="likes fa fa-heart ic">&nbsp;{{question.likes}}人喜欢</div>
                    <div class="collection fa fa-star ic">&nbsp;{{question.collections}}个收藏</div>
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
            <div
                    v-for="answer in answerList"
                    class="article">
                <div class="detail" style="position: relative">
                    <img
                            class="avatar"
                            :src="answer.avatar">
                    <div class="name">{{answer.nickname}}</div>
                    <div class="time" style="position:absolute;right: 0">时间：{{answer.time}}</div>
                </div>
                <div
                        class="content">
                    {{answer.content}}
                </div>
                <div class="info" style="align-self: flex-start">
                    <div class="likes fa fa-heart ic">&nbsp;{{answer.likes}}人赞同</div>
                    <div
                            @click="openChatList(answer.id)"
                            class="comments fa fa-comments ic">&nbsp;{{answer.answers}}个回复</div>
                    <div class="comments fa fa-reply ic">&nbsp;回复</div>
                </div>
            </div>
            <!--答案回复列表-->
            <el-dialog
                    :title="'回复：'+replyList.length+'条'"
                    :visible.sync="chatListVisible">
                <div class="replyList">
                    <div
                            v-for="reply in replyList"
                            class="article">
                        <div class="detail" style="position: relative">
                            <img
                                    class="avatar"
                                    :src="reply.avatar">
                            <div class="name">{{reply.nickname}}</div>
                            <div class="time" style="position:absolute;right: 0px">时间：{{reply.time}}</div>
                        </div>
                        <div
                                class="content">
                            {{reply.content}}
                        </div>
                        <div class="info" style="align-self: flex-start">
                            <div class="likes fa fa-heart ic">&nbsp;{{reply.likes}}人赞同</div>
                            <div
                                    @click="openChatList(reply.id)"
                                    class="comments fa fa-comments ic">&nbsp;{{reply.answers}}个回复</div>
                            <div class="comments fa fa-reply ic">&nbsp;回复</div>
                        </div>
                    </div>
                    <div
                            style="display: flex;justify-content: center;align-items: flex-end;align-self: center;margin-top: 20px">
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
                </div>
            </el-dialog>
        </div>
        <div class="right">
            <el-button
                    @click="openEditor"
                    type="primary"
                    style="width: 100%">我要回答</el-button>
            <el-dialog
                    title="编辑回答"
                    :visible.sync="EditorVisible">
                <myLearnerEditor></myLearnerEditor>
            </el-dialog>
            <rightItem
                    :contents="similarityQuestion"
                    :option="{title:'相似问题'}"></rightItem>
        </div>
    </div>
</template>

<script>
    import rightItem from '../main/rightItem.vue';
    import myLearnerEditor from '../edit/myLearnerEditor.vue';
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
                chatListVisible:false,
                //对话列表内容
                replyList:[],
                //回复input
                replyInput:'',
                //回答编辑区显示
                EditorVisible:false
            }
        },
        methods: {
            /**
             * 初始化数据
             */
            initData() {
                this.question = {
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickname: 'newbee1',
                    time: '2018-1-1',
                    content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                    likes: '22',
                    answers: '22',
                    collections: '22'
                };
                this.answerList = [
                    {
                        id:"1",
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                    {
                        id:"2",
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                    {
                        id:"3",
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    }
                ];
                this.similarityQuestion = [
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                    {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-1-4 22:33'},
                    {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-12-23 22:33'}
                ]
            },
            /**
             * 打开对话列表
             * @param id - 答案的id
             */
            openChatList(id){
                this.replyList=[
                    {
                        id:"2",
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                    },
                    {
                        id:"3",
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行',
                        likes: '22',
                        answers: '22',
                    }
                ];
                this.chatListVisible=true;
            },
            /**
             * 打开回答editor
             */
            openEditor(){
                this.EditorVisible=true;
            }
        },
        components:{
            rightItem,
            myLearnerEditor
        }
    }
</script>

<style lang="scss">
    .question {
        display: flex;
        justify-content: center;
        padding: 40px 20px;
        background-color: #f6f6f6;
        overflow: hidden;
        .left {
            display: flex;
            flex-direction: column;
            margin-right: 60px;
            align-self: start;
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
            .el-dialog{
                width: 700px;
                .replyList{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .article{
                        width: 600px;
                    }
                }
            }
        }
        .right {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>

