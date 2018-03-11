<template>
    <div class="comments">
        <div class="questionHeader">
            <span class=" fa fa-question-circle-o" style="font-size: 15px;margin-left: 5px"></span>
            &nbsp;{{commentItems.length}}个问题
        </div>
        <!--问题列表items-->
        <vue-scrollbar v-show="!ifReplysList"
                       class="my-scrollbar">
            <div class="commentsContent">
                <div v-if="commentItems.length===0">暂无问题</div>
                <div class="item"
                     v-for="(comment,index) in commentItems"
                     :key="index">
                    <div class="head">
                        <img :src="comment.avatarUrl">
                        <div class="name">
                            {{comment.nickName}}
                        </div>
                        <div class="tag" v-if="comment.tag!=='普通用户'">
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
            </div>
        </vue-scrollbar>
        <!--回答列表items-->
        <div v-for="area in replysAreas"
             v-show="area.show"
             :key="area.id"
             class="commentList">
            <div class="listHeader">
                <div
                        @click="handleAreaChange(false)"
                        class="home fa fa-home"></div>
                <div class="info">
                    <div class="listName">{{area.nickName}}</div>
                    <img class="listAvatar" :src="area.avatarUrl">
                </div>
            </div>
            <div class="listContent">
                {{area.content}}
                <span class="cheart el-icon-time"
                      style="color:#b5b9bc;left: 10px;bottom: 5px">&nbsp;2015-1-1 10:10</span>
                <span class="cheart fa fa-heart">&nbsp;34</span>
            </div>
            <div class="listItem">
                <vue-scrollbar class="my-scrollbar"
                               style="background-color: white">
                    <div class="itemsList">
                        <div class="item" v-for="item in area.itemsList">
                            <div class="header">
                                <img :src="item.avatarUrl"/>
                                <div class="name">{{item.nickName}}</div>
                                <div class="time">{{item.time | formatDate}}</div>
                            </div>
                            <div class="content">
                                {{item.content}}
                            </div>
                            <div class="footer">
                        <span class="count fa fa-heart"
                              @click="handleSupport(item)">
                            {{ item.supports}}
                        </span>

                                <span
                                        @click="handleAreaChange(item,true)"
                                        class="count fa fa-comments"
                                        style="margin-left: 10px">
                            {{ item.replys}}
                        </span>

                                <span @click="reply(item)"
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
    import uuidv1 from 'uuid/v1';

    export default {
        created() {
            this.ajxaComments.get('getComments/' + this.commentsInfo.targetId + "?pageIndex=0").then((response) => {
                this.itemsListNow = this.commentItems = response.data;
            });
            this.targetId=this.commentsInfo.targetId;
        },
        //当前评论的基本信息
        props: ['commentsInfo'],
        data() {
            return {
                //不能用全局的ajax实例，因为去全局的搜索等待是全页面显示的
                ajxaComments: this.$ajax.create(),
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
                targetId:''
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
                let data = {
                    ...this.commentsInfo,
                    time: Date(),
                    replys:0,
                    supports:0,
                    content: this.sendData
                };
                //确定当前评论区的id
                data.targetId=this.targetId;
                //如果不是回复当前评论区的
                if(this.$refs['commentSend'].targetId){
                    data.targetId=this.$refs['commentSend'].targetId;
                    //更新本地显示
                    this.itemsListNow.forEach(item=>{
                        if(item.id===data.targetId){
                            item.replys++;
                        }
                    })
                }
                //本地添加数据
                this.itemsListNow.unshift(data);
                //发送数据
                this.ajxaComments.post('addComments', data);
                //清空发送的临时设置数据
                this.sendData = '';
                this.$refs['commentSend'].targetId=null;
            },
            /**
             * 回复
             * @param comment
             */
            reply(comment) {
                this.sendData = "@" + comment.nickName + " ";
                this.$refs['commentSend'].targetId=comment.id;
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
            }
        },
        computed: {
            buttonDis() {
                return this.sendData === "";
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
        .questionHeader {
            font-size: 14px;
            padding: 10px;
            border-bottom: 1px solid $borderColor;
        }
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid $borderColor;
        background-color: #eeeeee;
        .my-scrollbar {
            height: 100%;
            width: 100%;
            flex-grow: 1;
            background-color: #eeeeee;
            //问题的列表
            .commentsContent {
                width: 100%;
                height: 100%;
                display: flex;
                box-sizing: border-box;
                flex-direction: column;
                align-items: center;
                padding: 10px 0;
                color: #000000;
                /*问题的item*/
                .item {
                    width: 265px;
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
            .listItem {
                height: 1%;
                flex-grow: 1;
                .itemsList {
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
            border-top: 1px solid $borderColor;
        }
    }
</style>

