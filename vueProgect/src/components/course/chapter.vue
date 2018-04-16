<template>
    <vue-scrollbar class="my-scrollbar" ref="Scrollbar">
        <div>
            <div class="title">
                {{chapter.title}}
            </div>
            <div class="info">
                <span>上传者：{{chapter.name}}</span>
                <span>时间：&nbsp;{{chapter.time | formatDateTime}}</span>
            </div>
            <div class="intro">
                简介：&nbsp;{{chapter.intro}}
            </div>
            <div class="catalog"
                 v-for="(chapterItem,index1) in chapter.chapters"
                 :key="chapterItem.name">
                <div>{{'第' + ++index1 + '章&nbsp;&nbsp;' + chapterItem.name}}</div>
                <div class="fa fa-play"
                     v-for="(item2,index2) in chapterItem.videos"
                     :key="item2.title"
                     :ref="index1+'to'+ ++index2"
                     @click="handleChapterChange(item2.videoUrl,index1+'to'+index2,item2.title,item2.id)">
                    &nbsp;&nbsp;{{index1 + '-' + index2}}&nbsp;&nbsp;{{item2.title}}
                </div>
            </div>
        </div>
    </vue-scrollbar>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";
    import { mapMutations } from 'vuex'
    import {recordLearning} from '../mixins.js';

    export default {
        activated() {
            this.initData();
        },
        deactivated(){
            //清楚心跳包
            clearInterval(this.heartTime);
        },
        data() {
            return {
                //章节数组
                chapter: {},
                //选择的章节状态保存
                lastCh: ''
            }
        },
        methods: {
            ...mapMutations('course',['setCourseTitle','setChapterTitle','setvideoUrl','setCourseData','setVideoId','setSources']),
            /**
             * 视频章节切换
             * @param url
             * @param index
             * @param chapterName
             * @param fileId
             */
            handleChapterChange(url, index,chapterName,fileId) {
                //点击章节的状态改变
                this.$refs[this.lastCh][0].style.color = '#b5b9bc';
                this.$refs[index][0].style.color = '#409EFF';
                this.lastCh = index;
                //设置章节名称
                this.setChapterTitle(chapterName);
                //视频url的改变
                this.setvideoUrl(url);
                //设置视频id，评论需要使用到
                this.setVideoId(fileId);
            },
            /**
             * 初始化数据
             */
            initData() {
                this.initChapter();
            },
            /**
             * 生成章节
             */
            initChapter() {
                //初始化章节信息
                this.$ajaxJava.get(`course/${this.$route.params.courseId}`).then((res) => {
                    //设置整个课程的数据
                    this.setCourseData(res.data);
                    //设置课程标题
                    this.setCourseTitle(res.data.title);
                    //初始化章节数据
                    this.chapter = {
                        title: res.data.title,
                        intro: res.data.description,
                        name: res.data.uploadUsername,
                        time: res.data.creationTimestamp,
                        chapters:[]
                    };
                    //课程资源
                    let sources=[];
                    //遍历每个视频文件
                    res.data.file.forEach((file) => {
                        //判断是否是章节,因为资源夹带在里面了
                        if (file.chapter&&file.chapter!=='file') {

//                            //判断该章节数组是否存在(旧的章节数据保存机制)
//                            if (!this.chapter.chapters[file.chapter]) {
//                                this.chapter.chapters[file.chapter] = [];
//                            }
//                            this.chapter.chapters[file.chapter].push(
//                                //切掉后缀名
//                                {
//                                    title: `${file.title.replace(`.${file.type}`, '')} (${file.totalTime})`,
//                                    videoUrl: file.path,
//                                    id:file.id
//                                }
//                            );


                            //判断数组中是否包含了目前的章节
                            //每个视频关联的信息
                            let video=
                                {
                                    //去掉视频的后缀，只保留名称，并加入视频时长
                                    title: `${file.title.replace(`.${file.type}`, '')} (${file.totalTime})`,
                                    videoUrl: file.path,
                                    id:file.id
                                };
                            //接收已经存在的章节对象，判断章节对象是否存在
                            let chapterO=this.chapter.chapters.find((chapter)=>{
                                return chapter.name===file.chapter;
                            });
                            //如果没有包含，undefined,则重新创建
                            if(!chapterO){
                                this.chapter.chapters.push({name:file.chapter,videos:[video]});
                            }else{
                                //如果有就直接添加
                                chapterO.videos.push(video);
                            }
                        }else{
                            sources.push(file);
                        }
                    });
                    //设置课程资源
                    this.setSources(sources);

                    //章节名称排序
                    this.chapter.chapters.sort((a,b)=>{
                        //切分章节的序号,章节排序
                        return a.name.split('-',1)-b.name.split('-',1);
                    });
                    //返回没有序号的章节名称
                    this.chapter.chapters=this.chapter.chapters.map((chapter)=>{
                        chapter.name=chapter.name.replace(/\d+-/,'');
                        return chapter;
                    });
                    //视频名称排序
                    this.chapter.chapters.forEach((chapter)=>{
                        chapter.videos.sort();
                    });

                    //初始化第一个选择章节的内容
                    this.lastCh = '1to1';
                    //初始化视频的url，等待数据加载完成在更新dom
                    this.$nextTick(()=>{
                        this.$refs[this.lastCh][0].click();
                    });
                    //课程学习时长心跳包
                    this.keepLearning(`/user/learnCourse/${res.data.id}`);
                });
            }
        },
        components: {
            VueScrollbar
        },
        mixins:[recordLearning]
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
            color: $secondaryText;
            font-size: 13px;
            img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            span {
                margin-left: 15px;
            }
            span:nth-child(2){
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

