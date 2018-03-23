<template>
    <div id="articleIL09">
        <div class="left">
            <div class="title">{{articleData.theme}}</div>
            <div class="info">
                <img :src="articleData.avatar" style="width: 25px;height: 25px;border-radius: 50%"/>
                <div style="margin: 0 10px">{{articleData.nickName}}</div>
                <div style="margin-right: 10px">时间：{{articleData.time|formatDateTime}}</div>
                <div>类型：{{articleData.type}}</div>

                <div style="position: absolute;right: 0">
                    <el-checkbox-group v-model="checkboxGroup" size="small">
                        <el-checkbox-button
                                label="likes"
                                key="likes">
                            {{articleData.likes}}&nbsp;喜欢
                        </el-checkbox-button>
                        <el-checkbox-button
                                label="collections"
                                key="collections">
                            {{articleData.collections}}&nbsp;收藏
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="content" ref="content"></div>
        </div>
        <div class="right">
            <el-radio-group
                    @change="sideChange"
                    v-model="chatChange"
                    size="medium">
                <el-radio-button label="目录"></el-radio-button>
                <el-radio-button label="讨论"></el-radio-button>
                <el-radio-button label="问题"></el-radio-button>
            </el-radio-group>
            <div class="sideBarContent">
                <keep-alive>
                    <component
                            :commentsInfo="commentsInfo"
                            :discussInfo="discussInfo"
                            :headers="headers"
                            :is="changePop">
                    </component>
                </keep-alive>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        created() {
            this.initData();
        },
        mounted() {
            this.initDom();
        },
        data() {
            return {
                articleData: {},
                //喜欢和收藏的按钮
                checkboxGroup: [],
                //sidebar的选择
                chatChange: '目录',
                //加载的sidebar
                changePop: 'chapter',
                //传递给目录的变量
                headers:[],
                //讨论的信息
                discussInfo:{},
                //评论的信息
                commentsInfo:{}
            }
        },
        computed:{
            ...mapState('info',['account,avatarUrl']),
        },
        methods: {
            /**
             * 数据初始化
             */
            initData() {
                this.discussInfo={
                    theme:'vue与webpack的学习',
                    nickName:this.account,
                    avatarUrl:this.avatarUrl
                };
                this.commentsInfo={
                    nickName:this.account,
                    avatarUrl:this.avatarUrl,
                    targetId:'123',
                    tag:'普通用户'
                }
            },
            /**
             * 初始dom
             */
            initDom() {
                //从跳转的url中获取文章的id
                let articleId = this.$route.params.articleId;
                //请求获取文章
                this.$ajax.get(`http://localhost:3100/IL09api/posts/${articleId}`).then((response) => {
                    this.articleData = response.data[0];
                    //设置文章内容
                    this.$refs.content.innerHTML = this.articleData.content;
                    //生成目录
                    this.queryHeader();
                });
            },
            /**
             * 侧边的功能选择
             * @param label
             */
            sideChange(label) {
                switch (label) {
                    case '目录': {
                        this.changePop = 'chapter';
                        break;
                    }
                    case '讨论': {
                        this.changePop = 'discuss';
                        break;
                    }
                    case '问题': {
                        this.changePop = 'questions';
                        break;
                    }
                }
            },
            /**
             * 生成目录
             */
            queryHeader(){
                let i=0;
                this.$refs.content.querySelectorAll('h2').forEach((header)=>{
                    let hi=++i+'h';
                    header.id=hi;
                    this.headers.push({id:hi,label:header.textContent});
                })
            }
        },
        components: {
            'chapter': () => import(/* webpackChunkName: "chapter.vue" */ './chapter.vue'),
            'discuss': () => import(/* webpackChunkName: "discuss.vue" */ './discuss.vue'),
            'questions': () => import(/* webpackChunkName: "comments.vue" */ './comments.vue'),
        },
    }
</script>

<style lang="scss">
    #articleIL09 {
        display: flex;
        justify-content: center;
        background-color: $mainPageColor;
        .left {
            padding: 10px 20px;
            margin-left: 20px;
            margin-right: 350px;
            width: 850px;
            background-color: #ffffff;
            /*align-self如果不做设置，left布局无法被撑开*/
            align-self: start;
            .title {
                font-size: 28px;
                font-weight: bold;
                color: #45c9dd;
            }
            .info {
                display: flex;
                align-items: center;
                position: relative;
                margin: 10px 0;
                font-size: 13px;
                color: #ccc;
                height: 36px;
            }
            /*展示区*/
            .content {
                padding: 10px 20px;
                outline: none;
                overflow: auto;
                line-height: 1.6;
                font-size: 16px;
                text-align: justify;
                .resizeDiv {
                    padding: 10px;
                    height: 200px;
                    width: 300px;
                    position: relative;
                    cursor: default;
                    user-select: none;
                    outline: none;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                    video {
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
        }
        .right {
            height: 100%;
            width: 300px;
            position: fixed;
            right: 0;
            top: 0;
            padding-top: 20px;
            margin-right: 60px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            /*百分百是相对于html的，要减去头部的高度*/
            &::before{
                content: '';
                height: 62px;
                width: 100%;
            }
            .sideBarContent {
                height: 1%;
                width: 100%;
                flex-grow: 1;
                margin-top: 10px;
            }
        }
    }
</style>

