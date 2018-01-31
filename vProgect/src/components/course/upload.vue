<template>
    <div class="upload">
        <div class="title item">
            <div class="span">课程标题:</div>
            <el-input
                    v-model="courseTitle"
                    placeholder="请输入内容"
                    class="input content"></el-input>
        </div>
        <div class="icon item">
            <div class="span">课程图标:</div>
            <el-upload
                    ref="iconUpload"
                    action="http://localhost:3100/upload/img"
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
        <div class="intr item">
            <div class="span">简介:</div>
            <el-input
                    type="textarea"
                    class="textare content"
                    resize="none"
                    :autosize="{minRows:3}"
                    placeholder="请输入内容"
                    v-model="courseIntr">
            </el-input>
        </div>
        <div class="viedoList item">
            <div class="span">视频上传:</div>
            <el-upload
                    ref="videoUpload"
                    action="http://localhost:3100/upload/video"
                    class="content"
                    list-type="text"
                    :on-success="handleVideoSuccess"
                    :multiple="true"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class="sourceList item">
            <div class="span">资料上传:</div>
            <el-upload
                    ref="sourceUpload"
                    action="http://localhost:3100/upload/file"
                    class="content"
                    list-type="text"
                    :multiple="true"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
            };
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
//                this.$ajax.post('',{courseTitle:this.courseTitle});
//                this.$ajax.post('',{courseTitle:this.courseIntr});
                this.$refs.iconUpload.submit();
            },
            /**
             * icon上传成功后
             */
            handleIconSuccess() {
                this.$refs.videoUpload.submit();
            },
            handleVideoSuccess(){
                this.$refs.sourceUpload.submit();
            },
        },
    }
</script>

<style scoped lang="scss">
    .upload {
        padding: 20px;
        .title {
            .input {
                width: 20%;
            }
        }
        .icon {
            .iconUpload {
            }
        }
        .intr {
            .textare {
                width: 30%;
            }
        }
        .item{
            margin-top: 20px;
        }
        .span {
            font-size: 16px;
            font-weight: bold;
        }
        .content{
            margin-left: 20px;
            margin-top: 5px;
            width: 250px;
        }
        .uploadButton {
            margin: 10px;
        }
    }
</style>

