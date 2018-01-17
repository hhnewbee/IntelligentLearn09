<template>
    <div class="coContainer">
        <div class="comments">
            <div class="l1">
                <div class="item" v-for="(comment,index) in comments" :key="index">
                    <div class="portrial">
                        <img :src="comment.avatar">
                    </div>
                    <div class="box">
                        <div class="head">
                            <div class="name">
                                {{comment.name}}
                            </div>
                            <div class="tag" v-if="comment.auto">
                                auto
                            </div>
                            <div class="time">
                                {{comment.time | formatDate}}
                            </div>
                            <div class="button">
                                <i class="fa fa-heart"></i>
                                <span class="count">{{comment.likes}}</span>
                                <i class="strong fa fa-comments"></i>
                                <span class="count">{{comment.replys}}</span>
                                <i class="fa fa-reply" @click="reply(comment.name)"></i>
                            </div>
                        </div>
                        <div class="content">
                            {{comment.content}}
                        </div>
                        <div class="l1 l2">
                            <div class="item">
                                <div class="portrial">
                                    <img src="image/shazia-mirza-22259413.jpg">
                                </div>
                                <div class="box">
                                    <div class="head">
                                        <div class="name">
                                            name
                                        </div>
                                        <div class="tag">
                                            auto
                                        </div>
                                        <div class="time">
                                            1 hour late
                                        </div>
                                        <div class="button">
                                            <i class="fa fa-heart"></i>
                                            <span class="count">2</span>
                                            <i class="strong fa fa-comments"></i>
                                            <span class="count">3</span>
                                            <i class="fa fa-reply"></i>
                                            <span class="count">3</span>
                                        </div>
                                    </div>
                                    <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing edivt. Vedivt omnis animi et iure laudantium
                                        vitae, praesentium optio, sapiente distinctio illo?
                                    </div>
                                </div>
                                <div class="line-2"></div>
                            </div>
                        </div>
                    </div>
                    <div class="line-1"></div>
                </div>
            </div>
        </div>
        <div class="control">
            <el-input
                    class="cInput"
                    type="textarea"
                    autosize
                    placeholder="你的评论"
                    resize="none"
                    v-model="control.commentsC">
            </el-input>
            <el-button type="primary" class="send" size="small" :disabled="buttonDis" @click="send">评论</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comments: [],
                control: {
                    commentsC: "",
                }
            }
        },
        methods: {
            send() {
                this.comments.unshift({
                    avatar: 'avatar.jpg',
                    name: 'newbee',
                    time: Date(),
                    likes: 0,
                    replys: 0,
                    auto: 0,
                    content: this.control.commentsC
                });
                this.control.commentsC='';
            },
            reply(name){
                this.control.commentsC="@"+name+" "
            }
        },
        computed: {
            buttonDis() {
                return this.control.commentsC === "";
            }
        },
        created() {
            //合并请求
            this.$ajax.all([
                this.$ajax.get('getComments/' + "主题1" + "?pageIndex=1"),
            ]).then(this.$ajax.spread((resInfo) => {
                this.comments = resInfo.data;
            }))
        }
    }
</script>

<style scoped lang="scss">
    $rightb: #f2f5f8;
    $leftb: #444753;
    $gray: #92959E;
    $green: #86BB71;
    $blue: #94C2ED;
    .coContainer {
        height: inherit;
        display: flex;
        flex-direction: column;
        .comments {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            background-color: #f1f1f1;
            padding: 10px;
            .l1 {
                .item {
                    display: flex;
                    width: 100%;
                    justify-content: space-around;
                    position: relative;
                    .portrial {
                        width: 50px;
                        height: 50px;
                        border-radius: 4px;
                        //高度有js计算后再渲染
                        border: 3px solid $green;
                        //border-radius: 4px;
                        z-index: 2;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .box {
                        //占据剩余空间（中枢轴上的）
                        width: 1px;
                        flex-grow: 1;
                        margin-left: 20px;
                        position: relative;
                        .head {
                            display: flex;
                            align-items: center;
                            position: relative;
                            background: #FCFCFC;
                            padding: 7.5px 12px;
                            border-bottom: 1px solid #E5E5E5;
                            border-radius: 4px 4px 0 0;
                            .name {
                                font-size: 14px;
                                font-weight: 700;
                                //作者的颜色
                                //color: #F44336;
                                //楼主的颜色
                                //color:#3F51B5;
                                //普通颜色
                                color: #506873;
                            }
                            .tag {
                                background: #F44336;
                                color: #FFF;
                                font-size: 12px;
                                padding: 3px 5px;
                                font-weight: 700;
                                margin-left: 10px;
                                border-radius: 3px;
                            }
                            .time {
                                color: #999;
                                font-size: 13px;
                                margin-left: 10px;
                            }
                            .button {
                                position: absolute;
                                right: 12px;
                                display: flex;
                                align-items: center;
                                i {
                                    margin-left: 14px;
                                    color: #A6A6A6;
                                    transition: color 0.3s ease;
                                }
                                i:hover {
                                    color: #FF5722;
                                }
                                .strong {
                                    font-size: 17px;
                                }
                                span {
                                    margin-left: 6px;
                                    color: #A6A6A6;
                                    font-size: 13px;
                                }
                            }
                        }
                        .content {
                            background: #FFF;
                            padding: 12px;
                            font-size: 14px;
                            color: #595959;
                            border-radius: 0 0 4px 4px;
                            margin-bottom: 15px;
                            /*强制英文断词*/
                            word-break: break-all;
                        }
                    }
                    //三角形
                    .box:before {
                        content: '';
                        position: absolute;
                        display: block;
                        border-width: 10px 12px 10px 0;
                        border-style: solid;
                        border-color: transparent #FCFCFC;
                        top: 8px;
                        left: -12px;
                    }
                    .line-1 {
                        width: 2px;
                        height: 100%;
                        background: #607D8B;
                        position: absolute;
                        left: 25px;
                    }
                    .line-2 {
                        height: 2px;
                        background: #607D8B;
                        position: absolute;
                        left: 0;
                        top: 25px;
                        width: 45px;
                        transform: translate(-100%, -50%);
                    }
                }
            }
            .l2 {
                .item {
                    .portrial {
                        width: 45px;
                        height: 45px;
                    }
                }
            }
            .lm {
                .item {
                    .line-1 {
                        top: 25px;
                        left: -24px;
                        transform: translateY(-100%);
                    }
                    .line-2 {
                        width: 24px;
                    }
                }
            }
        }
        .control {
            display: flex;
            justify-content: space-around;
            margin: 10px 10px;
            background: white;
            .cInput {
                flex-grow: 1;
            }
            .send {
                margin-left: 10px;
                height: 30px;
            }
        }
    }
</style>

