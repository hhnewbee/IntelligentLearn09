<template>
    <div class="comments">
        <div class="commentsHeader"
             v-if="!ifReplysList">
            <span class=" fa fa-question-circle-o"
                  style="font-size: 15px;margin-left: 5px">
            </span>
            &nbsp;{{commentItems.length}}个问题
        </div>

        <!--评论列表items-->
        <vue-scrollbar v-show="!ifReplysList"
                       class="my-scrollbar">
            <div class="commentsList">
                <div v-if="commentItems.length===0">暂无问题</div>
                <div class="item"
                     v-for="(comment,index) in commentItems"
                     :key="index">
                    <div class="header">
                        <img :src="comment.avatarUrl">
                        <div class="name">
                            {{comment.nickName}}
                        </div>
                        <div class="tag" v-if="comment.tag">
                            {{comment.tag}}
                        </div>
                        <div class="time">
                            {{comment.time | formatFromNow}}
                        </div>
                    </div>
                    <div class="content">
                        {{comment.content}}
                    </div>
                    <div class="footer">
                        <span class="count fa fa-heart"
                              :ref="comment.id"
                              @click="handleSupport(comment)">
                            {{comment.supports}}人喜欢
                        </span>

                        <span
                                @click="handleAreaChange(true,comment)"
                                class="count fa fa-comments"
                                style="margin-left: 10px">
                            {{ comment.replys}}人回答
                        </span>

                        <span
                                @click="reply(comment)"
                                class="count fa fa-reply"
                                style="margin-left: 10px"> 回答
                        </span>
                    </div>
                </div>
                <!--加载内容中-->
                <div v-if="loadDown.ifLongding" class="loadMore el-icon-loading">&nbsp;加载中</div>
                <div v-else-if="commentItems.length!==0" class="loadMore">
                    <div v-if="loadDown.ifNothing">已经全部加载</div>
                    <div v-else @click="handleLoadMore">加载更多</div>
                </div>
            </div>
        </vue-scrollbar>
        <!--回复列表items-->
        <div v-for="area in replysAreas"
             v-show="area.show"
             :key="area.id"
             class="replysList">
            <div class="listHeader">
                <div class="home fa fa-home"
                     @click="handleAreaChange(false)"></div>
                <div class="info">
                    <img class="listAvatar" :src="area.avatarUrl">
                    <div class="listName">{{area.nickName}}</div>
                </div>
            </div>
            <div class="listContent">
                {{area.content}}
                <span class="cheart el-icon-time"
                      style="color:#b5b9bc;left: 10px;bottom: 5px">
                    &nbsp;{{area.time | formatDateTime}}
                </span>
                <span class="cheart fa fa-heart"
                      @click="handleSupport(area)">
                    &nbsp;{{area.supports}}
                </span>
            </div>
            <div class="itemCount">
                {{area.itemsList.length}}个回答
            </div>
            <vue-scrollbar class="my-scrollbar"
                           style="background-color: white">
                <div class="itemsList">
                    <div class="item"
                         v-for="item in area.itemsList">
                        <div class="header">
                            <img :src="item.avatarUrl"/>
                            <div class="name">{{item.nickName}}</div>
                            <div class="time">{{item.time | formatFromNow}}</div>
                        </div>
                        <div class="content">
                            {{item.content}}
                        </div>
                        <div class="footer">
                            <span class="count fa fa-heart"
                                  @click="handleSupport(item)">
                                &nbsp;{{ item.supports}}人赞同
                            </span>

                            <span class="count fa fa-comments"
                                  @click="handleAreaChange(true,item)"
                                  style="margin-left: 10px">
                                &nbsp;{{ item.replys}}人回复
                            </span>

                            <span class="count fa fa-reply"
                                  @click="reply(item)"
                                  style="margin-left: 10px">
                                &nbsp;回复
                            </span>
                        </div>
                    </div>
                </div>
            </vue-scrollbar>
        </div>

        <!--发送-->
        <div class="control"
             ref="commentSend">
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
                评论
            </el-button>
        </div>
    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'

    export default {
        created() {
            this.initData();
        },
        //当前评论的基本信息
        props: ['commentsInfo'],
        data() {
            return {
                //不能用全局的ajax实例，因为去全局的搜索等待是全页面显示的
                ajxaComments:{},
                //是否打开回复列表
                ifReplysList: false,
                //评论的列表
                commentItems: [],
                //不同的用户回复区
                replysAreas: [],
                //当前的回复/评论列表
                itemsListNow: [],
                //发送评论/回复的数据
                sendData: '',
                //当前评论区的id，用于回复的标识
                targetId:'',
                //评论的页数
                pageComment:0,
                //下拉加载跟多
                loadDown: {
                    //是否正在加载
                    ifLongding: false,
                    //是否没有内容了
                    ifNothing: false,
                    //下拉加载的axios
                    ajax: {}
                },
            }
        },

        methods: {
            /**
             * 切换评论区
             * @param ifReplysList
             * @param commentInfo
             */
            handleAreaChange(ifReplysList, commentInfo) {
                //首先判断是否打开对话列表
                this.ifReplysList = ifReplysList;
                //如果不是
                if (!ifReplysList) {
                    this.replysAreas.forEach((area) => {
                        area.show = false;
                    });
                    this.itemsListNow = this.commentItems;
                    //切换回复的评论区id
                    this.targetId=this.commentsInfo.targetId;
                } else {
                    //列表的切换,判断当前列表是否打开过，如果已打开，复用，否则新添加
                    let ifAddN = false;
                    this.replysAreas.forEach((area) => {
                        if (area.id === commentInfo.id) {
                            area.show = ifAddN = true;
                            this.itemsListNow = area.itemsList;
                        } else {
                            area.show = false;
                        }
                    });
                    if (!ifAddN) {
                        this.$ajax.get('getComments/' + commentInfo.id+ "?pageIndex=0").then((response) => {
                            let newArea = {...commentInfo, show: true, itemsList: response.data};
                            this.replysAreas.push(newArea);
                            this.itemsListNow = newArea.itemsList;
                        });
                    }
                    this.targetId=commentInfo.id;
                }
            },
            /**
             * 发送评论
             */
            send() {
                this.commentsInfo.postData.content=this.sendData;
                //确定当前评论区的id
//                data.targetId=this.targetId;
                //如果不是回复当前评论区的
                if(this.ajxaComments.targetId){
//                    data.targetId=ajxaComments.targetId;
                    //更新对应评论的回复显示数目
                    this.itemsListNow.forEach(item=>{
                        if(item.id===data.targetId){
                            item.replys++;
                        }
                    })
                }
                //本地添加数据
                this.itemsListNow.unshift(data);
                //发送数据
                this.ajxaComments.post(this.commentsInfo.postCommentUrl, this.commentsInfo.postData);
                //清空发送的临时设置数据
                this.sendData = '';
                this.ajxaComments.targetId=null;
            },
            /**
             * 回复
             * @param comment
             */
            reply(comment) {
                this.sendData = "@" + comment.nickName + " ";
                //每个评论的id
                this.ajxaComments.targetId=comment.id;
            },
            /**
             * 支持
             * @param comment
             */
            handleSupport(comment){
                let style=this.$refs[comment.id][0].style;
                //判断是否已经点赞
                if(style.color==='rgb(64, 158, 255)'){
                    //本地显示更新
                    style.color='#9E9E9E';
                    comment.supports--;
                    this.ajxaComments.delete('deleteSupporter/'+comment.id);
                }else{
                    style.color='#409EFF';
                    comment.supports++;
                    this.ajxaComments.post('addSupporter',{
                        commentsId:comment.id,
                        nickName:this.commentsInfo.nickName
                    });
                }
            },
            /**
             * 初始化数据
             */
            initData(){
                //新的请求拦截器
                this.ajxaComments=this.$ajax.create({withCredentials:true});
                this.ajxaComments.get(this.commentsInfo.getCommentUrl+this.pageComment).then((response) => {
                    this.itemsListNow = this.commentItems = response.data;
                });
                this.targetId=this.commentsInfo.targetId;
            },
            /**
             * 下拉加载
             */
            handleLoadMore() {
                //todo 下拉加载
                this.loadDown.ajax.get('', (res) => {
                    //是否有新的数据
                    if (res.data.length === 0) {
                        this.loadDown.ifNothing = true;
                    } else {
                        this.loadDown.ifNothing = false;
                        this.commentItems.push(...(res.data));
                    }
                });
            },
        },
        computed: {
            buttonDis() {
                return this.sendData === "";
            }
        },
        watch:{
            /**
             * 监听章节的切换，对应的评论组
             * @param newV
             * @param oldV
             */
            commentsInfo(newV,oldV){
                if(newV.targetId!==oldV.targetId){
                    this.ajxaComments.get(this.commentsInfo.getCommentUrl+this.pageComment).then((response) => {
                        this.itemsListNow = this.commentItems = response.data;
                    });
                    this.targetId=this.commentsInfo.targetId;
                }
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    $primaryColor: #409EFF;
    $borderColor: #e5dddd;
    .comments {
        min-width: 300px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid $borderColor;
        background-color: #eeeeee;
        .commentsHeader {
            font-size: 14px;
            padding: 10px;
            border-bottom: 1px solid $borderColor;
        }
        .my-scrollbar {
            height: 100%;
            width: 100%;
            flex-grow: 1;
            background-color: #eeeeee;
        }

        /*评论/回复的item*/
        .item {
            width: 88%;
            padding: 10px 10px;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 1px 1px 5px 1px #b3b3b3;
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

        //评论的列表
        .commentsList {
            width: 100%;
            height: 100%;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            color: #000000;
        }
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
                display: flex;
                align-items: center;
                justify-content: flex-start;
                border-bottom: 1px solid #ddd5d5;
                padding: 5px;
                .home {
                    margin-left: 20px;
                    font-size: 18px;
                    cursor: pointer;
                    color: rgba(60, 60, 60, 0.61);
                }
                .info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    flex-grow: 1;
                    .listName {
                        color: $primaryColor;
                        font-size: 18px;
                    }
                    .listAvatar {
                        margin: 5px 0;
                        margin-right: 5px;
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
                .cheart {
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    color: #495a6c;
                    font-size: 12px;
                    &:hover {
                        color: #b5b5b5;
                    }
                }
            }
            .itemCount{
                margin: 5px 15px;
                color: #9e9e9e;
                font-size: 13px;
            }
            .itemsList {
                    height: 100%;
                    .item {
                        margin: 5px 15px;
                        border-top: 1px solid #ddd5d5;
                        box-shadow: none;
                    }
                }
        }

        .control {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            border-top: 1px solid $borderColor;
        }
    }
</style>

