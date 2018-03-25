<template>
    <div id="courseCenterIL09">
        <div class="videoItem">
            <video
                    id="videojs"
                    style="height: 100%;width: 100%"
                    class="video-js vjs-big-play-centered"
                    controls
                    preload="auto"
                    :src="videoUrl"
                    data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2]}'>
                <source :src="videoUrl"/>
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
                           :discussInfo="discussInfo">
                </component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import videojs from 'video.js/dist/video.min.js';
    import 'video.js/dist/video-js.min.css'
    import {mapState} from 'vuex'

    export default {
        mounted() {
            this.reloadVideo();
            this.initDom();
        },
        data() {
            return {
                changePop: 'chapter',
                discuss: {},
                //讨论的信息
                discussInfo: {},
                //评论的信息
                commentsInfo: {},
                //videoJs的实例
                videoJs: {}
            }
        },
        computed:{
            ...mapState('info',['account,avatarUrl']),
            ...mapState('course',['videoUrl','courseData','videoId']),
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
                        this.discussInfo = {
                            theme: 'vue与webpack的学习',
                            nickName: this.account,
                            avatarUrl: this.avatarUrl
                        };
                        this.changePop = 'discuss';
                        break;
                    }
                    case 3: {
                        this.commentsInfo = {
                            getCommentUrl:`course/${this.courseData.id}/video/${this.videoId}?page=`,
                            postCommentUrl:`course/comment`,
                            postData:{course:{id:''},file:{id:''},content:''},
                            targetId:this.videoId,
                        };
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
                    if (document.querySelector('.videoItem').childNodes[0].childNodes[0].id !== 'videojs_html5_api') {
                        window.location.reload();
                    }
                }, 1)
            },
            /**
             * 初始化dom
             */
            initDom() {
                document.querySelector('.op').style.backgroundColor = '#14191e';
            },
        },
        watch: {
            videoUrl() {
                this.videoJs.pause();
                //获取视频节点（也就是video元素）
                //值的注意的是，想通过id或者class获取该节点的时候，要注意video前后渲染的时候id和class改变了
                //请使用渲染后的id或者class
                //比如，这个原来的id是video，渲染后变成了video1_html5_api
                //$video.attr('src', newVideo)
                //重载视频
                this.videoJs.load();
                //开始视频
                this.videoJs.play();
            }
        }
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

