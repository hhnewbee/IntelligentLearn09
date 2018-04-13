<template>
    <div id="questionIL09">
        <div class="left">
            <!--问题信息-->
            <div class="autorDetail">
                <img
                        class="avatar"
                        :src="question.userIconUrl">
                <div class="name">{{question.userName}}</div>
                <div class="time">时间：{{question.creationTimestamp | formatDateTime}}</div>
                <div class="type">类型：{{question.categorys}}</div>
            </div>
            <!--问题的内容-->
            <div class="article">
                <div class="content" ref="questionContent"></div>
                <div class="info">
                    <div class="likes fa fa-heart ic"
                         :ref="'question/liking/'+question.id"
                         @click="handleLikeAcollect('question/liking/',question)">
                        &nbsp;{{question.liking}}人喜欢
                    </div>
                    <div class="collection fa fa-star ic"
                         :ref="'question/collection/'+question.id"
                         @click="handleLikeAcollect('question/collection/',question)">
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
                    <el-radio-button label="最热" ></el-radio-button>
                </el-radio-group>
            </div>
            <!--答案列表-->
            <div v-for="answer in answerList.comments" class="article">
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
                    <div class="likes fa fa-heart ic">&nbsp;0人赞同</div>
                    <div @click="openChatList(answer)"
                         class="comments fa fa-comments ic">
                        &nbsp;{{answer.replies}}个回复
                    </div>
                </div>
            </div>
            <!--分页-->
            <el-pagination
                    style="margin-top: 20px;align-self: center"
                    background
                    layout="prev, pager, next"
                    @size-change="handleAnswerPage"
                    :total="answerList.pages">
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
                             :ref="'question/liking/'+replyData.id"
                             @click="handleLikeAcollect('question/liking/',replyData)">&nbsp;
                            {{replyData.liking}}
                        </div>
                    </div>
                    <div class="itemCount">
                        {{replyData.replies}}&nbsp;个回复
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
                                          :ref="'liking'+item.id">
                                        &nbsp;0人赞同
                                    </span>
                                    <span class="count fa fa-comments"
                                          @click="handleGetRR(item)"
                                          style="margin-left: 10px">
                                        &nbsp;{{item.replies}}人回复
                                     </span>
                                </div>
                            </div>
                        </div>
                    </vue-scrollbar>
                    <!--回答的回复列表-->
                </div>
                <div style="display: flex;justify-content: center;align-items: flex-end;margin-top: 20px">
                    <el-input style="width: 522px;margin-right: 10px;"
                              type="textarea"
                              :autosize="{minRows: 2}"
                              resize="none"
                              placeholder="请输入回复内容"
                              v-model="replyInput">
                    </el-input>
                    <el-button type="primary"
                               size="medium"
                               @click="handleReplyComment"
                               :disabled="replyInput===''">
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
                    :visible.sync="EditorVisible">
                <div style="display: flex;flex-direction: column">
                    <div style="align-self: flex-start;font-size: 14px;color: #8a8a8a;margin-bottom: 10px">编辑回答</div>
                    <el-input type="textarea" resize="none" :rows="6" v-model="answersContent"></el-input>
                    <el-button type="primary"
                               @click="handlePushAnswer"
                               :disabled="answersContent===''"
                               style="align-self: flex-end;margin-top: 10px">发布
                    </el-button>
                </div>
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
    import footer_ from '../footer/footer.vue';
    import {areaCaching, likeAcollect} from '../mixins.js';
    import VueScrollbar from 'vue2-scrollbar'
    import {mapState} from 'vuex';

    export default {
        mounted() {
            this.initData();
        },
        data() {
            return {
                //问题主体
                question: {},
                //类型的选择
                choose: '最新',
                //回答的内容
                answersContent:'',
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
                //请求获取问题
                this.$ajaxJava.get(`question/${this.$route.params.questionId}`).then((response) => {
                    this.question = response.data;
                    //加载问题内容
                    this.$refs.questionContent.innerHTML = this.question.content;
                });
                //获取答案列表
                this.handleChangeArea('answerP1',`question/${this.$route.params.questionId}/page=0/size=10`);
                //侧边推荐数据
                this.similarityQuestion = [];
            },
            /**
             * 打开对话列表，回去评论的回复
             * @param dataAnswer - 答案的内容
             */
            openChatList(dataAnswer) {
                this.replyData = dataAnswer;
                //直接向缓存区取数据
                this.handleChangeArea('replyComment'+dataAnswer.id,`comment/${dataAnswer.id}/page=0`);
                this.chatListVisible = true;
            },
            /**
             * 获取回复的回复
             */
            handleGetRR(replyData){
                this.replyData = replyData;
                //直接向缓存区取数据
                this.handleChangeArea('replyReply'+replyData.id,`reply/${replyData.id}/page=0`);
                //下拉组件抽风了
                document.querySelector('.vue-scrollbar__area').style.marginTop='0'
            },
            /**
             * 打开回答editor
             */
            openEditor() {
                this.EditorVisible = true;
            },
            /**
             * 确定回答
             */
            handlePushAnswer(){
                this.$ajaxJava.post('question/comment',{
                    question:{id:this.question.id},
                    content:this.answersContent
                }).then(()=>{
                    this.$message.success('回答成功');
                    this.answersContent='';
                    this.$forceUpdate();
                    //todo 应该用数据驱动刷新的
                    window.location.reload();
                });
            },
            /**
             * 回复回答的
             */
            handleReplyComment(){
                //如果是回复评论的
                let data={};
                if(!('parent' in this.replyData)){
                    data.comment={id:this.replyData.id};
                //如果是回复回复的
                }else{
                    data.parent={id:this.replyData.id};
                }
                data.content=this.replyInput;
                this.$ajaxJava.post('reply',data
                ).then(()=>{
                    this.$message.success('回复成功');
                    //清空发送区
                    this.replyInput='';
                    //本地更新
                    data.usreName=this.account;
                    data.userIconUrl=this.avatarUrl;
                    data.creationTimestamp=new Date();
                    data.replies=0;
                    this.replyList.unshift(data);
                });
            },
            /**
             * 答案分页
             * @param size
             */
            handleAnswerPage(size){
                this.handleChangeArea('answerP'+size,`question/${this.question.id}/page=${size-1}/size=10`);

            }
        },
        components: {
            rightItem,
            footer_,
            VueScrollbar
        },
        computed:{
            ...mapState('info',['account','avatarUrl'])
        },
        watch:{
            listNow(){
                //判断是弹出框的分页，还是主页的分页
                if(this.chatListVisible){
                    this.replyList =this.listNow;
                }else{
                    this.answerList= this.listNow;
                }
            }
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
                    font-size: 18px;
                    margin-right: 10px;
                    color: $primaryColor;
                }
                .time {
                    font-size: 12px;
                    color:$secondaryText;
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
                        color: $primaryColor;
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
                    .resizeDiv {
                        padding: 10px;
                        height: 200px;
                        width: 300px;
                        position: relative;
                        cursor: default;
                        user-select: none;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                        .res {
                            position: absolute;
                            height: 12px;
                            width: 12px;
                            background-color: white;
                            border: 1px solid rgb(119, 119, 119);
                            box-sizing: border-box;
                            opacity: 0.8;
                            cursor: nwse-resize;
                            right: -6px;
                            bottom: -6px;
                            display: none;
                        }
                        .resS {
                            background-color: black;
                            border: none;
                            color: white;
                            position: absolute;
                            font-style: normal;
                            font-variant: normal;
                            font-weight: normal;
                            font-stretch: normal;
                            font-size: 12px;
                            line-height: 1;
                            font-family: Arial, Helvetica, sans-serif;
                            padding: 4px 8px;
                            text-align: center;
                            box-sizing: border-box;
                            opacity: 0.8;
                            cursor: default;
                            right: 4px;
                            bottom: 4px;
                            left: auto;
                            display: none;
                            z-index: 2;
                        }
                        .posC {
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            display: none;
                        }
                        .pos {
                            height: 19px;
                            width: 19px;
                            background: white;
                            font-size: 18px;
                            border: 1px solid rgb(153, 153, 153);
                        }
                    }
                    h2 {
                        font-weight: normal;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                        margin: 10px 0;
                    }
                    hr {
                        margin: 20px 30px;
                        border: 0;
                        border-top: 1px solid #d9d9d9 !important
                    }
                    a {
                        padding: 2px 0;
                        margin: 0 5px;
                        text-decoration: none;
                        border: 1px solid #00a0e9;
                        border-radius: 4px;
                        color: rgb(63, 135, 166);
                        cursor: pointer;
                    }
                    pre {
                        padding: 20px;
                        background-color: #f2f2f2;
                        border-left: 6px solid #b3b3b3;
                        word-break: break-all;
                        font-family: "Coda", "Helvetica Neue", "Helvetica", Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 30px;
                        margin: 0 0 20px;
                    }
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
                            div:nth-child(3) {
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
                                height: 100%;
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
                                            color: $secondaryText;
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
                min-width: 40%;
            }
        }
    }
</style>

