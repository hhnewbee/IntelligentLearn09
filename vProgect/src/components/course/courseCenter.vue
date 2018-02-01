<template>
    <div id="courseCenterIL09">
        <div class="videoItem">
            <video
                    class="video-js vjs-big-play-centered"
                    controls
                    preload="auto"
                    data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2],"techOrder": ["html5","flash"]}'>
                <source src="http://localhost:3100/video/studySource/video1.mp4">
            </video>
        </div>
        <div class="rightPop">
            <div class="operator">
                <div class="op chapter light"><em class="fa fa-bars"></em>章节</div>
                <div class="op discuss"><em class="fa fa-comments-o"></em>讨论</div>
                <div class="op question"><em class="fa fa-question-circle-o"></em>提问</div>
                <div class="op down"><em class="fa fa-cloud-download"></em>下载</div>
            </div>
            <vue-scrollbar class="my-scrollbar" ref="Scrollbar">
                <chapter :chapters="chapters"></chapter>
            </vue-scrollbar>
        </div>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.min.css'
    import 'videojs-flash/dist/videojs-flash.min.js'
    import 'video.js/dist/video.min.js'

    import chapter from './chapter.vue';
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";

    export default {
        created() {
            //TODO 获取数据
//            this.$ajax.get('').then((response)=>{
//
//            });

        },
        data() {
            return {
                chapters: {
                    title: 'vue和webpack下的学习',
                    intro: '大数据背景下，对我们的系统性能提出了更高的要求，包括我们的数据存储和应用，都提出了性能上的需求，尤其是对IO通信方面，更是成为了大数据通信下的瓶颈，为此，我们对系统进行相关的分布式改造。那么，如何进一步提升我们的系统IO性能呢？这里，就为大家介绍大数据时代构建高可用分布式系统的利器——Netty',
                    chapter: [
                        {
                            t1: ' 第1章 课程介绍 ',
                            t2: [' 1-1 课程介绍 (06:47)', ' 1-2 课程介绍 (06:47)', ' 1-2 课程介绍 (06:47)']
                        },
                        {
                            t1: ' 第2章 课程介绍 ',
                            t2: [' 2-1 课程介绍 (06:47)', ' 2-2 课程介绍 (06:47)', ' 2-2 课程介绍 (06:47)']
                        },
                        {
                            t1: ' 第2章 课程介绍 ',
                            t2: [' 2-1 课程介绍 (06:47)', ' 2-2 课程介绍 (06:47)', ' 2-2 课程介绍 (06:47)']
                        }
                    ],
                }
            }
        },
        components: {
            chapter,
            VueScrollbar
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
                    &:hover {
                        background-color: #14191e;
                    }
                    em {
                        position: absolute;
                        left: 0;
                        top: 12px;
                        font-size: 15px;
                        width: 50px;
                    }
                }
            }
            .my-scrollbar {
                background-color: #14191e;
                max-height: 100%;
                padding-left:10px;
                .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
                    height: 100px;
                    background: rgba(109, 127, 151, 0.5);
                }
            }
        }
    }
</style>

