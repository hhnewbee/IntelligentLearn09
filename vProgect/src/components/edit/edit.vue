<template>
    <div>
        <el-upload
                :action="uploadUrl"
                :on-success='upScuccess'
                ref="upload"
                style="display:none">
            <el-button
                    id="imgInput"
                    size="small"
                    type="primary"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    element-loading-text="插入中,请稍候"
            >点击上传
            </el-button>
        </el-upload>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption">
        </quill-editor>
    </div>
</template>

<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    //图片上传
    import {quillRedefine} from 'vue-quill-editor-upload'
    import {quillEditor} from 'vue-quill-editor'

    export default {
        data() {
            return {
                content: '',
                editorOption: {},
                uploadUrl: '',// 上传视频地址
                uploadType: '', // 上传的文件类型（图片、视频）
                addRange:'',
                fullscreenLoading: false
            }
        },
        components: {
            quillEditor,
            quillRedefine
        },
        methods: {
            /**
             *
             * @param response -  上传成功后的返回值，（视频的链接地址）
             * @param file
             * @param fileList
             */
            upScuccess(response, file, fileList) {
                this.fullscreenLoading = false;//关闭上传进度显示
                let addRange = this.$refs.myQuillEditor.quill.getSelection(); // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
                this.$refs.myQuillEditor.quill.insertEmbed(addRange !== null ? addRange.index : 0, this.uploadType,response.url);// 调用编辑器的 insertEmbed 方法，插入URL
            this.$refs['upload'].clearFiles() //插入成功后清除input的内容
            },
            videoHandler(state) {
                if (state) {
                    this.addRange=this.$refs.myQuillEditor.quill.getSelection();
                    let fileInput = document.getElementById('imgInput');//获取上传的按钮
                    this.uploadUrl='http://localhost:3100/upload/video';//设置上传地址
                    this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0,"link","");
                    fileInput.click();// 加一个触发事件
                }
                this.uploadType = 'video'
            }
        },
        mounted() {
            // 为视频ICON绑定事件
            this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
        },
        created() {
            this.editorOption = quillRedefine({
                    // 图片上传的设置
                    uploadConfig: {
                        action: 'http://localhost:3100/upload/img',  // 必填参数 图片上传地址
                        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                        // 你必须把返回的数据中所包含的图片地址 return 回去
                        res: (respnse) => {
                            return respnse.url  // 这里切记要return回你的图片地址,返回的必须是json对象
                        }
                    },
                    placeholder: '请在这输入内容',
                }
            )
        }
    }
</script>

<style>

</style>

