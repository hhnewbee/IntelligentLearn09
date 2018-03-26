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
                 v-for="(item1,chapterName,index1) in chapter.chapters"
                 :key="chapterName">
                <div>{{'第' + ++index1 + '章&nbsp;&nbsp;' + chapterName}}</div>
                <div class="fa fa-play"
                     v-for="(item2,index2) in item1"
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
    export default {
        created() {
            this.initData();
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
            ...mapMutations('course',['setCourseTitle','setChapterTitle','setvideoUrl','setCourseData','setVideoId']),
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
                        chapters: {}
                    };
                    res.data.file.forEach((file) => {
                        //判断是否是章节
                        if (file.chapter) {
                            //判断该章节数组是否存在
                            if (!this.chapter.chapters[file.chapter]) {
                                this.chapter.chapters[file.chapter] = [];
                            }
                            this.chapter.chapters[file.chapter].push(
                                //切掉后缀名
                                {
                                    title: `${file.title.replace(`.${file.type}`, '')} (${file.totalTime})`,
                                    videoUrl: file.path,
                                    id:file.id
                                }
                            )
                        }
                    });
                    //初始化第一个选择章节的内容
                    this.lastCh = '1to1';
                    //初始化视频的url，等待数据加载完成在更新dom
                    this.$nextTick(()=>{
                        this.$refs[this.lastCh][0].click();
                    });
                });
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

