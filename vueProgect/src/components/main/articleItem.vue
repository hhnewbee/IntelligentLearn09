<template>
    <div class="articleItem">

        <div class="title" v-if="itemData.title">{{itemData.title}}</div>

        <div class="detail">
            <infoDetail
                    :avatarUrl="itemData.userIconUrl"
                    :account="itemData.userName"
                    :size="25"
                    class="avatar">
            </infoDetail>
            <div class="name" v-if="itemData.title">{{itemData.userName}}</div>
            <div class="name" v-else style="color:#409EFF;font-size: 16px">{{itemData.userName}}</div>

            <div class="time">时间：{{itemData.creationTimestamp | formatFromNow}}</div>
        </div>
        <div class="content" @click="handleIn(itemData.id)">
            <!--有图片时-->
            <img
                    v-if="itemContent.img"
                    :src="itemContent.img"
                    class="media">

            <!--有视频时，实现预加载，但无播放控制相当于截图-->
            <video v-if="itemContent.video"
                   preload="auto">
                <source :src="itemContent.video"/>
            </video>

            <span class="text">
                {{itemContent.textContent}}
                <span v-if="itemContent.textContent.length>=205"
                      style="font-weight: bold">…</span>
            </span>
        </div>
        <!--文章的item-->
        <div class="info" v-if="itemData.title">
            <div class="likes fa fa-heart ic"
                 :ref="'forum/liking/'+itemData.id"
                 @click="handleLikeAcollect('forum/liking/',itemData)">
                &nbsp;{{itemData.liking}}人喜欢
            </div>
            <div class="comments fa fa-comments ic" @click="handleIn(itemData.id)">
                &nbsp;{{itemData.questions}}个问题
            </div>
            <div class="collection fa fa-star ic"
                 :ref="'forum/collection/'+itemData.id"
                 @click="handleLikeAcollect('forum/collection/',itemData)">
                &nbsp;{{itemData.collections}}个收藏
            </div>
        </div>
        <!--问题的item-->
        <div class="info" v-else>
            <div class="likes fa fa-heart ic"
                 :ref="'question/liking/'+itemData.id"
                 @click="handleLikeAcollect('question/liking/',itemData)">
                &nbsp;{{itemData.liking}}人喜欢
            </div>
            <div class="comments fa fa-comments ic" @click="handleIn(itemData.id)">
                &nbsp;{{itemData.questions}}个问题
            </div>
            <div class="collection fa fa-star ic"
                 :ref="'question/liking/'+itemData.id"
                 @click="handleLikeAcollect('question/collection/',itemData)">
                &nbsp;{{itemData.collections}}个收藏
            </div>
        </div>
    </div>
</template>

<script>
    import infoDetail from '../userCenter/infoDetail.vue';
    import {likeAcollect} from '../mixins.js';

    export default {
        props: ['itemData'],
        mounted() {
            this.setContent(this.itemContent, this.itemData);
        },
        data() {
            return {
                //item要显示的内容
                itemContent: {
                    textContent: '',
                    img: null,
                    video: null
                },
            }
        },
        methods: {
            /**
             * 进入文章
             * @param articleId
             */
            handleIn(articleId) {
                if(this.itemData.title){
                    window.open(`http://localhost:3000/#/main/articlePage/article/${articleId}`);
                }else{
                    window.open(`http://localhost:3000/#/main/questionPage/question/${articleId}`);
                }
            },
            /**
             * 设置获取的数据
             */
            setContent(itemContent, itemData) {
                let src = null;
                //获取所有文本，图片，视频链接
                itemContent.textContent = this.delHtmlTag(itemData.content).substring(0,205);
                //如果图片存在的话
                if (src = itemData.content.match(/<img.*?(?:>|\/>)/)) {
                    itemContent.img = src[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/)[1];
                    //否则用视频
                } else {
                    if (src = itemData.content.match(/<sourse.*?(?:>|\/>)/)) {
                        itemContent.video = src[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/)[1];
                    }
                }
            },
            /**
             * 去掉所有的html标记
             * @param description
             */
            delHtmlTag(description) {
                description = description.replace(/(\n)/g, "");
                description = description.replace(/(\t)/g, "");
                description = description.replace(/(\r)/g, "");
                description = description.replace(/<\/?[^>]*>/g, "");
                description = description.replace(/\s*/g, "");
                description = description.replace(/&nbsp;/ig, '');
                return description;
            },
        },
        components: {
            infoDetail
        },
        mixins:[likeAcollect]
    }
</script>

<style scoped lang="scss">
    .articleItem {
        width: 800px;
        padding: 16px 20px;
        margin: 15px 0;
        background-color: #ffffff;
        box-shadow: 2px 2px 10px rgba(136, 136, 136, 0.51);
        .title {
            margin-bottom: 5px;
            font-size: 19px;
            font-weight: bold;
            color: #00a0e9;
        }
        .detail {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            color: rgba(57, 66, 79, 0.61);
            .avatar {
                margin-right: 10px;
                cursor: pointer;
            }
            .name {
                font-weight: bold;
                font-size: 14px;
                margin-right: 10px;
                color: #9b9b9b;
            }
            .time {
                font-size: 12px;
            }
        }
        .content {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 5px;
            margin-bottom: 10px;
            .media {
                width: 190px;
                height: 105px;
                margin-right: 15px;
                border-radius: 5px
            }
            .text {
                width: 1%;
                max-height: 105px;
                flex-grow: 1;
                font-size: 15px;
                font-weight: 400;
                line-height: 1.67;
                color: #000000;
                overflow: hidden;
                cursor: pointer;
                &:hover {
                    color: #6a6a6a
                }
            }
        }
        .info {
            display: flex;
            color: rgba(57, 66, 79, 0.61);
            justify-content: flex-start;
            align-items: center;
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
</style>



