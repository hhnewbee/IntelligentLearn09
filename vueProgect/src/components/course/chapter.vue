<template>
    <vue-scrollbar class="my-scrollbar" ref="Scrollbar">
        <div>
            <div class="title">
                {{chapter.title}}
            </div>
            <div class="info">
                <img src="http://localhost:3100/img/avatar/avatar.jpg">
                <span>{{chapter.info.name}}</span>
                <span>时间：{{chapter.info.time}}</span>
            </div>
            <div class="intro">
                简介:{{chapter.intro}}
            </div>
            <div class="catalog"
                 v-for="(item1,index1) in chapter.chapters"
                 :key="index1">
                <div>{{'第'+ ++index1+'章&nbsp;'+item1.t1}}</div>
                <div class="fa fa-play"
                     v-for="(item2,index2) in item1.t2"
                     :key="index2"
                     :ref="item2.name"
                     @click="handleChapterChange(item2)">
                    {{index1+'-'+ ++index2}}&nbsp;&nbsp;{{item2.name}}
                </div>
            </div>
        </div>
    </vue-scrollbar>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";

    export default {
        created(){
            this.initData();
        },
        mounted(){
            this.initDom();
        },
        data() {
            return {
                //章节数组
                chapter: {
                    title: 'vue和webpack下的学习',
                    intro: '大数据背景下，对我们的系统性能提出了更高的要求，包括我们的数据存储和应用，都提出了性能上的需求，尤其是对IO通信方面，更是成为了大数据通信下的瓶颈，为此，我们对系统进行相关的分布式改造。那么，如何进一步提升我们的系统IO性能呢？这里，就为大家介绍大数据时代构建高可用分布式系统的利器——Netty',
                    info: {name: 'newbee', time: '2015-1-1'},
                    chapters: [
                        {
                            t1: '课程介绍 ',
                            t2: [
                                {name: '课程介绍 (06:47)', videoUrl: ''},
                                {name: '课程介绍 (06:46)', videoUrl: ''}
                            ]
                        },
                        {
                            t1: '课程介绍 ',
                            t2: [
                                {name: '课程介绍 (06:47)', videoUrl: ''},
                                {name: '课程介绍 (06:46)', videoUrl: ''}
                            ]
                        },
                        {
                            t1: '课程介绍 ',
                            t2: [
                                {name: '课程介绍 (06:47)', videoUrl: ''},
                                {name: '课程介绍 (06:46)', videoUrl: ''}
                            ]
                        },
                        {
                            t1: '课程介绍 ',
                            t2: [
                                {name: '课程介绍 (06:47)', videoUrl: ''},
                                {name: '课程介绍 (06:46)', videoUrl: ''}
                            ]
                        }
                    ],
                },
                //选择的章节状态保存
                lastCh: ''
            }
        },
        methods:{
            /**
             * 视频章节切换
             * @param t2
             */
            handleChapterChange(t2){
                //点击章节的状态改变
                this.$refs[this.lastCh][0].style.color='#b5b9bc';
                this.$refs[t2.name][0].style.color='#409EFF';
                this.lastCh=t2.name;
                //视频url的改变
                this.$emit('changeUrl',t2.url);
            },
            /**
             * 初始化数据
             */
            initData(){
                //初始化第一个选择章节
                let t2=((this.chapter.chapters)[0].t2)[0];
                this.lastCh=t2.name;
                //初始化视的url
                this.$emit('changeUrl',t2.url);
            },
            /**
             * 初始化dom
             */
            initDom(){
                this.$refs[this.lastCh][0].style.color='#409EFF';
            }
        },
        components: {
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    .my-scrollbar {
        background-color: #14191e;
        max-height: 100%;
        height: 100%;
        padding-left: 10px;
        .title {
            padding: 20px 10px;
            color: #b5b9bc;
            font-size: 18px;
            font-weight: bold;
        }
        .info {
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: #3f4d5b;
            img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            span {
                margin-left: 10px;
            }
            span:nth-child(2) {
                font-size: 14px;
            }
            span:nth-child(3) {
                font-size: 12px;
            }
        }
        .intro {
            text-align: justify;
            padding: 20px 30px 10px;
            font-size: 14px;
        }
        .catalog {
            padding: 10px;
            div:nth-child(1) {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 16px;
                margin: 20px 0;
            }
            div[class*="fa"] {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 13px;
                cursor: pointer;
                margin-left: 25px;
                margin-top: 15px;
                &:hover {
                    color: rgba(0, 171, 249, 0.87);
                }
            }
        }
    }
</style>

