<template>
    <div class="upload">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackManage">
                    课程管理
                </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                课程上传
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="uploadContent">
            <div>
                <div class="title item">
                    <div class="span">课程标题:</div>
                    <el-input
                            v-model="courseTitle"
                            placeholder="请输入内容"
                            class="input content"></el-input>
                </div>
                <div class="intr item">
                    <div class="span">课程简介:</div>
                    <el-input
                            type="textarea"
                            class="textare content"
                            resize="none"
                            :autosize="{minRows:3}"
                            placeholder="请输入内容"
                            v-model="courseIntr">
                    </el-input>
                </div>
                <div class="category item">
                    <div class="span">课程类型:</div>
                    <el-select v-model="categorys"
                               style="width: 100%"
                               class="content"
                               multiple
                               placeholder="请选择">
                        <el-option v-for="item in filterType('全部')"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="icon item">
                    <div class="span">课程图标:</div>
                    <el-upload
                            ref="iconUpload"
                            :action=iconUrl
                            class="iconUpload content"
                            list-type="picture-card"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :on-change="handleIconBefore"
                            :before-upload="handleLimitFileType('image','只能上传文件')"
                            :on-success="handleIconSuccess"
                            :on-remove="handleIconRemove">
                        <i class="el-icon-plus" v-show="iconAdd"></i>
                    </el-upload>
                    <!--visible是子组件的接收参数，sync是语法糖，即加sync的子组件参数可以通过子组显示的更改dialogVisible（父组件传递进来的值）-->
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt>
                    </el-dialog>
                </div>
            </div>
            <div style="height: 100%;display: flex;flex-direction: column" class="item">
                <div class="span">视频上传:</div>
                <div
                        class="content"
                        style="display: flex;align-items: center;">
                    <el-input
                            size="small"
                            v-model="chapterName"
                            placeholder="添加章节">
                    </el-input>
                    <el-button
                            :disabled="chapterNameAdd"
                            @click="handleAddChapter"
                            style="margin-left: 5px;"
                            size="small"
                            type="primary">
                        添加章节
                    </el-button>
                </div>
                <div style="overflow: auto;height: 1%;flex-grow: 1;margin-top: 10px;">
                    <el-upload
                            :name='chapterName'
                            :action='courseUrl'
                            v-for="(upload,index) in videosUpload"
                            :key="index"
                            :ref="'videoUpload'+index"
                            class="content"
                            list-type="text"
                            :on-success="handleVideoSuccess(upload)"
                            :multiple="true"
                            :auto-upload="false">
                        <el-tag
                                closable
                                :disable-transitions="true"
                                @close="handleCloseChapter(upload)">{{upload.chapterName}}</el-tag>
                    </el-upload>
                </div>
            </div>
            <div class="sourceList item">
                <div class="span">资料上传:</div>
                <div style="height:1%;flex-grow:1;overflow: auto">
                    <el-upload
                            :action="sourseUrl"
                            ref="sourceUpload"
                            class="content"
                            list-type="text"
                            :on-success="handleSourseSuccess"
                            :multiple="true"
                            :auto-upload="false">
                        <el-button size="small" type="primary">选择资料</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
        <el-button size="small"
                   type="success"
                   class="uploadButton"
                   @click="upload">
            上传到服务器
        </el-button>
    </div>
</template>


<script>
    import {handleLimitFileType} from '../../static/venders/unitUpload';
    import {mapGetters} from 'vuex'

    export default {
        mounted() {
            //upload组件自动添加的子元素的样式
            this.iconDivS = this.$refs.iconUpload.$el.lastChild.style;
        },
        data() {
            return {
                courseTitle: null,
                courseIntr: null,
                iconDivS: {},
                iconAdd: true,//手动添加的+号icon
                dialogImageUrl: '',
                dialogVisible: false,
                //章节名称
                chapterName:'',
                //各个章节的视频
                videosUpload:[],
                //课程类型
                categorys: [],
                //infoUrl
                infoUrl:'upload/course',
                //iconUrl
                iconUrl:'http://172.16.148.27:8080/upload/icon',
                //courseUrl
                courseUrl:'http://172.16.148.27:8080/upload/videoFile',
                //sourseUrl
                sourseUrl:'http://172.16.148.27:8080/upload/officeFile',
                //资料上传成功的标志
                sourseStatus:false
            };
        },
        computed: {
            //判断章节是否为空
            chapterNameAdd(){
                return this.chapterName==='';
            },
            //类型的过滤器
            ...mapGetters(['filterType']),
        },
        methods: {
            /**
             * 添加图标后移除添加图标
             */
            handleIconBefore() {
                this.iconDivS.display = "none";
                this.iconAdd = true;
            },
            /**
             * 重新添加图标
             */
            handleIconRemove(file, fileList) {
                this.iconDivS.display = "block";
                this.iconAdd = true;
            },
            /**
             * 图片预览
             */
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             * 文件类型过滤
             */
            handleLimitFileType,
            /**
             * 上传
             */
            upload() {
                if(!(this.courseTitle&&this.courseIntr)){
                    this.$message.error('标题和简介不能为空');
                    return;
                }
                //icon上传
                this.$refs.iconUpload.submit();
                //视频上传
                for(let i=0;i<this.videosUpload.length;i++){
                    this.$refs['videoUpload'+i][0].submit();
                }
                //资料上传
                this.$refs.sourceUpload.submit();
            },
            /**
             * icon上传成功后
             */
            handleIconSuccess() {
            },
            /**
             * 视频上传成功后
             */
            handleVideoSuccess(upload){
                upload.status=true;
                this.successAll();
            },
            /**
             * 资源上传成功后
             */
            handleSourseSuccess(){
                this.successAll();
            },
            /**
             * 返回课程管理
             */
            handleBackManage(){
                this.$router.push({path: '/userCenter/coursesManage/#coursesManage'});
            },
            /**
             * 添加章节
             */
            handleAddChapter(){
                this.videosUpload.push({chapterName:this.chapterName,status:false})
            },
            /**
             * 删除章节
             * @param tag
             */
            handleCloseChapter(tag) {
                this.videosUpload.splice(this.videosUpload.indexOf(tag), 1);
            },
            /**
             * 全部上传成功
             *
             */
            successAll(){
                //资料上传是否成功
                if(this.sourseStatus){
                    //再判断视频是否全部上传成功
                    this.videosUpload.forEach((uploadVideo)=>{
                        if(!uploadVideo.status){
                            return;
                        }
                    });
                }
                this.$ajaxJava.post(this.infoUrl,{
                    user:'newbee',
                    title:this.courseTitle,
                    description:this.courseIntr,
                    type:this.categorys.join('/')
                });
                this.$message({
                    message: '上传完成',
                    type: 'success'
                });
            }

        },
    }
</script>

<style scoped lang="scss">
    .upload {
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 100%;
        .uploadContent{
            height:1%;
            flex-grow: 1;
            display: flex;
            justify-content: space-around;
            flex-wrap: nowrap;
            margin-bottom: 20px;
            .title {
                .input {
                    width: 100%;
                }
            }
            .icon {
                .iconUpload {
                    width: 100%;
                }
            }
            .intr {
                .textare {
                    width: 100%;
                }
            }
            .item{
                width: 300px;
                margin-top: 15px;
                margin-left: 20px;
            }
            .span {
                font-size: 16px;
                font-weight: bold;
                color: #606266;
            }
            .sourceList{
                display: flex;
                flex-direction: column;
            }
            .content{
                margin-left: 20px;
                margin-top:8px;
            }
        }
        .uploadButton {
            font-weight: bold;
            margin: 0 20px;
        }
    }
</style>

