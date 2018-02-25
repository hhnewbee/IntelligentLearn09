<template>
    <vue-scrollbar class="my-scrollbar" ref="Scrollbar">
        <div>
            <div class="title">
                {{chapters.title}}
            </div>
            <div class="info">
                <img src="http://localhost:3100/img/avatar/avatar.jpg">
                <span>newbee</span>
                <span>时间：2015-12-21</span>
            </div>
            <div class="intro">
                简介:{{chapters.intro}}
            </div>
            <div class="catalog" v-for="(item1,index1) in chapters.chapter" :key="index1">
                <div>{{item1.t1}}</div>
                <div class="fa fa-play" v-for="(item2,index2) in item1.t2" :key="index2">
                    &nbsp;{{item2}}
                </div>
            </div>
        </div>
    </vue-scrollbar>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";

    export default {
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
                },
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
        .info{
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: #3f4d5b;
            img{
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            span{
                margin-left: 10px;
            }
            span:nth-child(2){
                font-size: 14px;
            }
            span:nth-child(3){
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

