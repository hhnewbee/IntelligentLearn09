<template>
    <div id="courseCenterIL09">
        <div class="videoItem">
            <video
                    class="video-js vjs-big-play-centered"
                    controls
                    preload="auto"
                    data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2],"techOrder": ["html5","flash"]}'>
                <source src="http://172.16.116.18:3100/video/studySource/video1.mp4">
            </video>
        </div>
        <div class="rightPop">
            <div class="operator">
                <div class="op chapter" @click="handlerChange(1,$event)">
                    <em class="fa fa-bars"></em>
                    章节
                </div>
                <div class="op discuss" @click="handlerChange(2,$event)">
                    <em class="fa fa-comments-o"></em>
                    讨论

                </div>
                <div class="op question" @click="handlerChange(3,$event)">
                    <em class="fa fa-question-circle-o"></em>
                    提问
                </div>
                <div class="op down" @click="handlerChange(4,$event)">
                    <em class="fa fa-cloud-download"></em>
                    下载
                </div>
            </div>
            <keep-alive>
                <component :is="changePop"
                           :commentsInfo="commentsInfo"
                           :discussInfo="discussInfo"
                           @changeUrl="changeVideoUrl">
                </component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import 'video.js/dist/video.min.js'
    import 'videojs-flash/dist/videojs-flash.min.js'
    import 'video.js/dist/video-js.min.css'
    import {mapState} from 'vuex'

    export default {
        created() {
            this.initData();
        },
        mounted() {
            this.reloadVideo();
            this.initDom();
        },
        data() {
            return {
                changePop: 'chapter',
                discuss: {},
                videoUrl: '',
                //讨论的信息
                discussInfo:{},
                //评论的信息
                commentsInfo:{}
            }
        },
        computed:{
            ...mapState('info',['account,avatarUrl']),
        },
        components: {
            chapter: () => import(/* webpackChunkName: "chapter.vue" */ './chapter.vue'),
            discuss: () => import(/* webpackChunkName: "discuss.vue" */ '../article/discuss.vue'),
            comments: () => import(/* webpackChunkName: "comments.vue" */ '../article/comments.vue'),
            downLoad: () => import(/* webpackChunkName: "downLoad.vue" */'../resources/downLoad.vue')
        },
        methods: {
            /**
             * 侧边的选择项
             */
            handlerChange(tar, e) {
                switch (tar) {
                    case 1: {
                        this.changePop = 'chapter';
                        break;
                    }
                    case 2: {
                        this.changePop = 'discuss';
                        break;
                    }
                    case 3: {
                        this.changePop = 'comments';
                        break;
                    }
                    case 4: {
                        this.changePop = 'downLoad';
                        break;
                    }
                }
                let t = e.currentTarget;
                document.querySelectorAll('.op').forEach((el) => {
                    if (el === t) {
                        t.style.backgroundColor = '#14191e';
                    } else {
                        el.style.backgroundColor = 'rgba(54, 60, 64, 0.67)';
                    }
                });
            },
            /**
             * 刷新出videojs，不然无法生效
             */
            reloadVideo() {
                //dom加载完毕的时候，该id还没有被附加，用js的事件循环机制放获取放到最后去
                setTimeout(() => {
                    //判断viedojs是否加载成功
                    if (document.querySelector('.videoItem').childNodes[0].id !== 'vjs_video_3') {
                        window.location.reload();
                    }
                }, 1)
            },
            /**
             * 改变视频的链接，切换视频
             * @param url
             */
            changeVideoUrl(url) {
                this.videoUrl = url;
            },
            /**
             * 初始化dom
             */
            initDom() {
                document.querySelector('.op').style.backgroundColor = '#14191e';
            },
            /**
             * 初始化数据
             */
            initData(){
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
            }
        },

    }
</script>

<style lang="scss">
    #courseCenterIL09 {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .videoItem {
            flex-grow: 1;
            height: 100%;
            width: 100%;
            .vjs_video_3-dimensions {
                height: 100%;
                width: 100%;
            }
        }
        .rightPop {
            border-top: 1px solid rgba(10, 10, 10, 0.41);
            border-bottom: 1px solid rgba(10, 10, 10, 0.41);
            background-color: #14191e;
            width: 30%;
            height: 100%;
            position: relative;
            .operator {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -50px;
                width: 50px;
                z-index: 100;
                .op {
                    position: relative;
                    height: 60px;
                    line-height: 82px;
                    font-size: 12px;
                    text-align: center;
                    color: #B5B9BC;
                    background-color: rgba(54, 60, 64, 0.67);
                    cursor: pointer;
                    margin: 2px 0;
                    em {
                        position: absolute;
                        left: 0;
                        top: 12px;
                        font-size: 15px;
                        width: 50px;
                    }
                }
            }
        }
    }
</style>

