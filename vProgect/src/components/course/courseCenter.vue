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
                <component :is="changePop">
                </component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.min.css'
    import 'videojs-flash/dist/videojs-flash.min.js'
    import 'video.js/dist/video.min.js'

    export default {
        created() {
            //TODO 获取数据
//            this.$ajax.get('').then((response)=>{
//
//            });
            //todo 获取discuss的数据，discuss只做展现作用

        },
        mounted(){
//            this.initDom();
        },
        data() {
            return {
                changePop: 'downLoad',
                reload:false,
                discuss:{}
            }
        },
        components: {
            chapter:()=>import('./chapter.vue'),
            discuss:()=>import('../article/discuss.vue'),
            comments:()=>import('../article/comments.vue'),
            downLoad:()=>import('../resources/downLoad.vue')
        },
        methods: {
            //侧边选项的切换
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
                    case 3:{
                        this.changePop = 'comments';
                        break;
                    }
                    case 4:{
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
            initDom(){
                if(!this.reload) {
                    this.reload=true;
                }
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

