<template>
    <div id="myEditor09IL">
        <div class="richEdit">
            <input class="head" v-model="theme">
            <transition name="el-fade-in">
                <div class="savetip" v-show="ifsave">已保存</div>
            </transition>
            <div class="command">
                <div v-for="(item,index) in muneData"
                     class="fa mune"
                     :class="item[1]"
                     @mousedown="editCommand(item[0])"
                     :key="index"
                     :title="item[2]">
                </div>
                <div class="fa fa-mail-forward mune"  @click="form.dialogFormVisible = true">
                    <span class="publish"></span>
                    发布
                </div>
            </div>
            <div class="editarea"
                 contenteditable="true"
                 @click="getSelection"
                 ref="editarea">
                <p>
                    <br>
                </p>
            </div>
        </div>
        <div class="uploadList" ref="uploadList">
            <el-upload
                    :action='uploadUrl'
                    :before-remove="beforeRemove"
                    :before-upload='beforeUpload'
                    :on-success='upScuccess'
                    multiple
                    ref="upload">
                <el-button
                        id="uploadButton"
                        size="small"
                        type="primary"
                        style="display: none">
                </el-button>
                <div slot="tip" class="el-upload__tip">文件上传中</div>
            </el-upload>
        </div>
        <el-dialog title="提交" :visible.sync="form.dialogFormVisible">
            <el-form :model="form">
                <el-form-item label-width="80px">
                    <el-select v-model="category" placeholder="请选择类别">
                        <el-option label="前端" value="前端"></el-option>
                        <el-option label="后端" value="后端"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="publish" :disabled="form.buttonDisabled">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tipPop from '../edit/tipPop.vue';

    export default {
        mounted() {
            this.editarea = this.$refs.editarea;
            //如果上次的还没有提交，则保存下来
            if (localStorage.editContent) {
                this.editarea.innerHTML = localStorage.editContent;
            }
            this.contentChange();
        },
        data() {
            return {
                editarea: {},
                muneData: [
                    ["title", ["fa-header"],"标题"],
                    ["bold", ["fa-bold"],"加粗"],
                    ["line", ["fa-minus"],"分割线"],
                    ["link", ["fa-link"],"链接"],
                    ["unlink", ["fa-chain-broken"],"取消链接"],
                    ['removeFormat', ["fa-eraser"],"去除格式"],
                    ["img", ["fa-picture-o"],"添加图片"],
                    ["video", ["fa-youtube-play"],"添加视频"],
                    ["file", ["fa-file-text"],"添加资料"],
                    ["back", ["fa-undo"],"回退"],
                    ["cancel", ["fa-times fontSize"],"取消全部编辑"],
                    ["save", ["fa-floppy-o"],"保存"],
                    ["more", ["fa-chevron-down"],"跟多选项"]
                ],
                editorSelec: {},
                range: {},
                addRange: {},
                uploadUrl: '',
                uploadType: '',
                uploadFinish: 0,
                ifsave: false,
                theme:'请输入标题',
                category: '',
                form: {
                    dialogFormVisible:false,
                    buttonDisabled:true,
                },
            }
        },

        methods: {
            editCommand(type) {
                if (type === 'img' | type === 'video' | type === 'file') {
                    this.uploadType = type;
                    this.uploadUrl = `http://localhost:3100/upload/${type}`;//设置上传地址
                    document.querySelector('#uploadButton').click();
                    return;
                }
                switch (type) {
                    case "title": {
                        let h1 = document.createElement('h2');
                        let p = document.createElement('p');
                        p.innerHTML = '<br>';
                        let newRange = this.createRange(this.range);
                        let content = this.range.cloneContents();
                        h1.appendChild(content);
                        newRange.insertNode(p);
                        newRange.insertNode(h1);
                        break;
                    }
                    case "bold": {
                        document.execCommand('bold', false, 0);
                        break;
                    }
                    case "line": {
                        document.execCommand('insertHTML', false, '<hr><p><br></p>');
                        break;
                    }
                    case 'link': {
                        this.$prompt('请输入URL', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({value}) => {
                            let a = document.createElement('a');
                            a.href = value;
                            let newRange = this.createRange(this.range);
                            let content = document.createTextNode('新建链接');
                            if (!newRange.collapsed) {
                                content = newRange.cloneContents();
                            }
                            a.appendChild(content);
                            newRange.insertNode(a);
                            newRange.collapse(false);
                        });
                        break;
                    }
                    case "unlink": {
                        document.execCommand('unlink');
                        break;
                    }
                    case "removeFormat": {
                        document.execCommand('removeFormat');
                        break;
                    }
                    case "cancel": {
                        this.$confirm('永久删除编辑内容, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            localStorage.clear();
                            this.editarea.innerHTML = `<p><br></p>`;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                        break;
                    }
                    case "save": {
                        localStorage.editContent = this.editarea.innerHTML;
                        this.ifsave = true;
                        setTimeout(() => {
                            this.ifsave = false;
                        }, 2000);
                        break;
                    }
                    case "more": {
                        if(this.muneData[12][1][0]==='fa-chevron-up'){
                            this.muneData[12].splice(1,1,['fa-chevron-down']);
                        }else{
                            this.muneData[12].splice(1,1,['fa-chevron-up']);
                        }
                        break;
                    }
                }
            },

            /**
             * 创建并返回新的位置
             * @param range
             * @returns {Range}
             */
            createRange(range) {
                let newRange = document.createRange();
                newRange.setStart(range.startContainer, range.startOffset);
                newRange.setEnd(range.endContainer, range.endOffset);
                this.editorSelec.removeAllRanges();
                this.editorSelec.addRange(newRange);
                return newRange;
            },

            /**
             * 每次点击编辑区时都会获取位置range
             */
            getSelection() {
                this.editorSelec = window.getSelection();
                this.range = this.editorSelec.getRangeAt(0);
            },

            /**
             * 监听内容变化
             */
            contentChange() {
                let timeOut;
                let target = this.editarea;

                // 创建观察者对象
                let observer = new MutationObserver(() => {
                    /**
                     * 消抖
                     */
                    clearTimeout(timeOut);
                    timeOut = setTimeout(() => {
                        localStorage.editContent = this.editarea.innerHTML;
                        this.ifsave = true;
                        setTimeout(() => {
                            this.ifsave = false;
                        }, 2000);
                    }, 3000);
                });

                // 配置观察选项:
                let config = {childList: true, subtree: true, characterData: true};
                // 传入目标节点和观察选项
                observer.observe(target, config);
            },

            /**
             * 文件上传前
             * @param file
             */
            beforeUpload(file) {
                //延时打开上传列表
                setTimeout(() => {
                    let style = this.$refs.uploadList.style;//延时显示上传列表
                    if (style.display !== 'block') {//是否已张开
                        if (!this.uploadFinish) {//是否已近完成
                            style.display = 'block';
                        }
                    }
                }, 2000);
                let newNode = document.createElement("span");
                newNode.style.color = '#3f87a6';
                let tmp;
                if (this.uploadType === 'img') {
                    tmp = 'fa-picture-o'
                } else if (this.uploadType === 'video') {
                    tmp = 'fa-youtube-play'
                } else {
                    tmp = 'fa-file-text'
                }
                newNode.innerHTML = ` <i class='fa ${tmp}'></i> : ${file.name} `;

                let newRange = this.createRange(this.range);
                newRange.insertNode(newNode);
                this.addRange = newRange.cloneRange();//复制范围保存供下次使用
            },

            createVideo(target, response) {
                //展示时可以用video.js
                let tem = ` <video
                            class="video-js vjs-big-play-centered"
                            controls
                            preload="auto"
                            data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2],"techOrder": ["html5","flash"]}'>
                                <source src="${response.url}">
                            </video>`;
                target.innerHTML = tem;
            },

            createImg(target, response) {
                let tem = `<img src="${response.url}">`;
                target.innerHTML = tem;
            },

            /**
             * 图片调节
             */
            resize(targets) {
                //点击显示调节按钮
                targets[0].addEventListener("click", function () {
                    let height, width, ox, oy;
                    targets[1].style.display = 'flex';
                    targets[2].style.display = 'block';
                    targets[3].style.display = 'block';
                    height = targets[0].offsetHeight;
                    width = targets[0].offsetWidth;
                    targets[2].innerText = height + 'x' + width;
                    targets[3].addEventListener("mousedown", function (e) {
                        ox = e.pageX;
                        oy = e.pageY;
                        document.addEventListener("mousemove", resizeHandler);
                        document.addEventListener("mouseup", () => {
                            //鼠标抬起，出去移动监听事件
                            document.removeEventListener("mousemove", resizeHandler);
                        });

                    });
                    targets[4].addEventListener('click', function () {
                        targets[0].style.float = 'left';
                        targets[4].style.backgroundColor = 'rgb(153, 153, 153)';
                        targets[5].style.backgroundColor = 'white';
                        targets[6].style.backgroundColor = 'white';

                    });
                    targets[5].addEventListener('click', function () {
                        targets[0].style.float = '';
                        targets[0].style.margin = 'auto';
                        targets[4].style.backgroundColor = 'white';
                        targets[5].style.backgroundColor = 'rgb(153, 153, 153)';
                        targets[6].style.backgroundColor = 'white';
                    });
                    targets[6].addEventListener('click', function () {
                        targets[0].style.float = 'right';
                        targets[0].style.margin = 'auto';
                        targets[4].style.backgroundColor = 'white';
                        targets[5].style.backgroundColor = 'white';
                        targets[6].style.backgroundColor = 'rgb(153, 153, 153)';
                    });

                    function resizeHandler(e) {
                        let nW = e.pageX - ox + width;
                        let nH = e.pageY - oy + height;
                        targets[0].style.width = nW + "px";
                        targets[0].style.height = nH + "px";
                        targets[2].innerText = nW + 'x' + nH;
                    }
                });
                targets[0].addEventListener("blur", function () {
                    targets[1].style.display = 'none';
                    targets[2].style.display = 'none';
                    targets[3].style.display = 'none';
                }, true);
            },

            /**
             *文件上传成功时
             * @param response
             * @param file
             * @param fileList
             */
            upScuccess(response, file, fileList) {
                let target;
                if (this.uploadType === 'img' || this.uploadType === 'video') {
                    let div = document.createElement("div");//增加已建立好的链接
                    let divC = document.createElement("div");
                    let divCl = document.createElement("div");
                    let divCc = document.createElement("div");
                    let divCr = document.createElement("div");
                    let divR = document.createElement("div");
                    let divO = document.createElement("div");

                    div.tabIndex = 1; //使div可以获取焦点
                    div.contentEditable = false;//这个属性的获取注意要符合js书写规格（驼峰命名），e要大写的，
                    div.className = 'resizeDiv';
                    divR.className = 'res';
                    divO.className = 'resS';
                    divC.className = 'posC';
                    divCl.className = 'fa fa-align-left pos';
                    divCc.className = 'fa fa-align-center pos';
                    divCr.className = 'fa fa-align-right pos';

                    if (this.uploadType === 'img') {
                        this.createImg(div, response);
                    } else {
                        this.createVideo(div, response);
                    }

                    divC.appendChild(divCl);
                    divC.appendChild(divCc);
                    divC.appendChild(divCr);
                    div.appendChild(divC);
                    div.appendChild(divO);
                    div.appendChild(divR);

                    this.resize([div, divC, divO, divR, divCl, divCc, divCr]);
                    target = div;
                } else {
                    let a = document.createElement("a");
                    a.contentEditable = false;
                    a.style.color = '#3f87a6';
                    a.href = response.url;
                    a.innerHTML = ` <i class='fa fa-file-text'></i> : ${file.name} `;
                    target = a;
                }

                /**
                 * 插入
                 * @type {*|Range}
                 */
                this.addRange.deleteContents();//删除占位文本
                let newRange = this.createRange(this.addRange);
                newRange.insertNode(target);
                newRange.collapse(false); //叠该Range

                /**
                 * 上传列表处理
                 */
                this.$refs.upload.clearFiles();
                if (fileList.length === 1 || fileList.length === 0) {//如果所有文件上传完毕
                    this.$refs.uploadList.style.display = 'none';//收缩列表
                }
                this.uploadFinish = 1;
            },

            /**
             *是否停止上传
             * @param file
             * @param fileList
             * @returns {Promise<MessageBoxData> | *}
             */
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            publish(){
                this.$ajax.post("posts",{
                    theme:this.theme,
                    author:"name",
                    category:this.category,
                    content:this.editarea.innerHTML,
                    time:Date()
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '发表成功'
                    });
                }).catch(()=>{
                    this.$message({
                        type: 'error',
                        message: '网络异常，发表失败'
                    });
                });
                this.form.buttonDisabled=true;
                this.form.dialogFormVisible=false;
            },
        },

        watch:{
            category(){
                this.form.buttonDisabled=false;
            }
        }
    }
</script>

<style lang="scss">
    #myEditor09IL {
        height: 100%;
        display: flex;
        .richEdit {
            position: relative;
            width: 75%;
            flex-grow: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            .savetip {
                position: absolute;
                top: 23px;
                transform: translateY(-50%);
                right: 100px;
                padding: 5px 10px;
                border-radius: 4px;
                color: #efefef;
                font-size: 10px;
                background: rgba(3, 3, 3, 0.61);
            }
            .head {
                width: 100%;
                height: 8%;
                padding: 10px 30px 10px 40px;
                font-size: 25px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                border: none;
                outline: none;
                box-sizing: border-box;
                background-color: #f4f6fb;
            }
            .command {
                display: flex;
                justify-content: center;
                background-color: #efefef;
                height: 5.5%;
                .mune {
                    transition: all 250ms;
                    position: relative;
                    padding: 10px 14px;
                    line-height: 17px;
                    color: #63656b;
                    cursor: pointer;
                    .publish {
                        margin-left: 5px;
                        font-size: 13px;
                    }
                    &:hover {
                        background-color: #dadde6;
                    }
                }
                .fontSize {
                    font-size: 18px;
                }
            }
            .editarea {
                height: 65%;
                flex-grow: 1;
                padding: 10px 20px;
                outline: none;
                overflow: auto;
                .resizeDiv {
                    padding: 10px;
                    height: 200px;
                    width: 300px;
                    position: relative;
                    cursor: default;
                    user-select: none;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                    video {
                        height: 100%;
                        width: 100%;
                    }
                    .res {
                        position: absolute;
                        height: 12px;
                        width: 12px;
                        background-color: white;
                        border: 1px solid rgb(119, 119, 119);
                        box-sizing: border-box;
                        opacity: 0.8;
                        cursor: nwse-resize;
                        right: -6px;
                        bottom: -6px;
                        display: none;
                    }
                    .resS {
                        background-color: black;
                        border: none;
                        color: white;
                        position: absolute;
                        font-style: normal;
                        font-variant: normal;
                        font-weight: normal;
                        font-stretch: normal;
                        font-size: 12px;
                        line-height: 1;
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 4px 8px;
                        text-align: center;
                        box-sizing: border-box;
                        opacity: 0.8;
                        cursor: default;
                        right: 4px;
                        bottom: 4px;
                        left: auto;
                        display: none;
                        z-index: 2;
                    }
                    .posC {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: none;
                    }
                    .pos {
                        height: 19px;
                        width: 19px;
                        background: white;
                        font-size: 18px;
                        border: 1px solid rgb(153, 153, 153);
                    }
                }
                hr {
                    margin: 20px 20px;
                    border: 0;
                    border-top: 1px solid #d9d9d9 !important
                }
                a {
                    text-decoration: none;
                    border: 1px solid #00a0e9;
                    color: rgb(63, 135, 166);
                }
                p {
                    margin: 5px;
                }
            }
        }
        .uploadList {
            display: none;
            width: 25%;
            height: 100%;
            border-left: 1px solid #efefef;
            .el-upload__tip {
                margin-left: 10px;
                font-size: 16px;
            }
        }
    }
</style>