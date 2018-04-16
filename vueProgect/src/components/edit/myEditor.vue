<template>
    <div id="myEditor09IL">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackManage">
                    文章管理
                </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                文章编辑
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="richEdit">
                <div style="position: relative">
                    <input class="head" v-model="theme">
                    <transition name="el-fade-in">
                        <div class="savetip" v-show="ifsave">已保存</div>
                    </transition>
                </div>
                <div class="command">
                    <div v-for="(item,index) in muneData"
                         class="fa mune"
                         :class="item[1]"
                         @mousedown="editCommand(item[0])"
                         :key="index"
                         :title="item[2]">
                    </div>
                    <div
                            style="display: flex;justify-content: center;align-items: center"
                            class="fa fa-mail-forward mune"
                            @click="form.dialogFormVisible = true">
                        <div class="publish"> 发布</div>
                    </div>
                </div>
                <div
                        spellcheck="false"
                        class="editarea"
                        contenteditable="true"
                        @click="getSelection"
                        ref="editarea">
                    <div></div>
                </div>
            </div>
            <div class="uploadList" ref="uploadList">
                <el-upload
                        :action='uploadUrl'
                        :name="uploadType"
                        :with-credentials="true"
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
            <el-dialog title="提交"
                       width="500px"
                       :visible.sync="form.dialogFormVisible">
                <el-select v-model="categorys"
                           style="width: 250px;margin-left:105px"
                           placeholder="请选择文章类别"
                           multiple>
                    <el-option v-for="item in filterType('全部')"
                               :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="form.dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="publish" :disabled="form.buttonDisabled">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        mounted() {
            this.initMountedData();
        },
        data() {
            return {
                editarea: {},
                muneData: [
                    ["title", ["fa-header"], "标题"],
                    ["bold", ["fa-bold"], "加粗"],
                    ["line", ["fa-minus"], "分割线"],
                    ["block", ["fa-quote-left"], "引用块"],
                    ["link", ["fa-link"], "链接"],
                    ["unlink", ["fa-chain-broken"], "取消链接"],
                    ['removeFormat', ["fa-eraser"], "去除格式"],
                    ["img", ["fa-picture-o"], "添加图片"],
                    ["video", ["fa-youtube-play"], "添加视频"],
                    ["file", ["fa-file-text"], "添加资料"],
                    ["back", ["fa-undo"], "回退"],
                    ["cancel", ["fa-times fontSize"], "取消全部编辑"],
                    ["save", ["fa-floppy-o"], "保存"],
                ],
                //鼠标选择的区域
                editorSelec: {},
                //保存选择的区块
                range: {},
                //下次需要使用的区块，主要是为了下载的占位文本
                addRange: {},
                uploadUrl: '',
                uploadType: '',
                uploadFinish: 0,
                ifsave: false,
                theme: '请输入标题',
                categorys: [],
                form: {
                    dialogFormVisible: false,
                    buttonDisabled: true,
                },
                //本文章的id
                articleId: ''
            }
        },
        computed: {
            //类型的过滤器
            ...mapGetters(['filterType']),
        },
        methods: {
            /**
             * 创建并返回新的位置，之所以要创建新的，是因为当的位置是处于选项位置的
             * @param range
             * @returns {Range}
             */
            createRange(range) {
                //创建新的区块
                let newRange = document.createRange();
                newRange.setStart(range.startContainer, range.startOffset);
                newRange.setEnd(range.endContainer, range.endOffset);
                //删除鼠标选择区域的全部range
                this.editorSelec.removeAllRanges();
                //添加上心的range
                this.editorSelec.addRange(newRange);
                return newRange;
            },

            /**
             * 每次点击编辑区时都会获取位置range
             */
            getSelection() {
                //获取鼠标选择的区域
                this.editorSelec = window.getSelection();
                //返回并且保存可编辑区域
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
                        //保存提示还要等两秒后才消失
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
                //创建文件占位字段
                let newNode = document.createElement("span");
                newNode.style.color = '#3f87a6';
                //判断要创建占位字段的文件类型
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
                //是创建视频和图片展示还是文件展示
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
                    //展示框
                    divC.appendChild(divCl);
                    divC.appendChild(divCc);
                    divC.appendChild(divCr);

                    div.appendChild(divC);
                    div.appendChild(divO);
                    div.appendChild(divR);

                    //添加事件注册
                    this.resize([div, divC, divO, divR, divCl, divCc, divCr]);
                    target = div;
                } else {
                    let a = document.createElement("a");
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
                //创建新的区块
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

            /**
             * 文章发布
             */
            publish() {
                this.$ajaxJava.post("upload/forum", {
                    title: this.theme,
                    categorys: this.categorys.join('/'),
                    content: this.editarea.innerHTML,
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '发表成功'
                    });
                    //清空编辑区和内存
                    this.editarea.innerHTML = '';
                    localStorage.removeItem('editContent');
                    localStorage.removeItem('editContentId');
                    this.theme='文章标题';
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '网络异常，发表失败'
                    });
                });
                this.form.buttonDisabled = true;
                this.form.dialogFormVisible = false;
            },

            /**
             * 返回文章管理
             */
            handleBackManage() {
                this.$router.push({path: '/userCenter/articlesManage/#articlesManage'});
            },
            /**
             * 生成video展示
             * @param target - 插入的位置
             * @param response - 上传后返回的链接
             */
            createVideo(target, response) {
                //展示时可以用video.js
                let tem = ` <video
                            class="video-js vjs-big-play-centered"
                            controls
                            preload="auto"
                            data-setup='{"playbackRates": [0.7, 1, 1.5, 1.7, 2]}'>
                                <source src="${response.url}">
                            </video>`;
                target.innerHTML = tem;
            },
            /**
             * 生成img展示
             * @param target
             * @param response
             */
            createImg(target, response) {
                let tem = `<img src="${response.url}">`;
                target.innerHTML = tem;
            },
            /**
             * 初始化dom生成时的数据
             */
            initMountedData() {
                this.editarea = this.$refs.editarea;
                //如果上次的还没有提交，则保存下来
                if (localStorage.editContent) {
                    this.editarea.innerHTML = localStorage.editContent;
                    this.articleId = localStorage.editContentId;
                } else {
                    //新的文章id,一开始就注册是为了视频和图片上传的标识
                    let editContentId = Date.now();
                    this.articleId = editContentId;
                    localStorage.editContentId = editContentId;
                }
                //开始监听内容变化1
                this.contentChange();
            },

            /**
             * 所有的编辑命令
             * @param type
             */
            editCommand(type) {
                if (type === 'img' | type === 'video' | type === 'file') {
                    this.uploadType = type;
                    this.uploadUrl = `http://127.0.0.1:8080/upload/forumFile`;//设置上传地址
                    //模拟点击上传组件的文件选择按钮
                    document.querySelector('#uploadButton').click();
                    return;
                }
                switch (type) {
                    case "title": {
                        //获取创建的代表当前的新区块
                        let newRange = this.createRange(this.range);
                        //获取dom来判断是否h2
                        if (newRange.startContainer.parentElement.nodeName === 'H2') {
                            document.execCommand('formatBlock', false, '<div>');
                        } else {
                            document.execCommand('formatBlock', false, '<h2>');
                        }
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
                    case "block": {
                        let newRange = this.createRange(this.range);
                        if (newRange.startContainer.parentElement.nodeName === 'PRE') {
                            document.execCommand('formatBlock', false, '<DIV>');
                        } else {
                            document.execCommand('formatBlock', false, '<PRE>');
                        }
                        break;
                    }
                    case 'link': {
                        this.$prompt('请输入URL', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({value}) => {
                            let a = document.createElement('a');
                            a.href = value;
                            a.title = value;
                            let newRange = this.createRange(this.range);
                            let content = '新建链接';
                            //如果有选择到内容，则用选择的内容作为连接
                            if (!newRange.collapsed) {
                                content = newRange.cloneContents().textContent;
                            }
                            a.innerHTML = '&nbsp;' + content + '&nbsp';
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
                    case "back": {
                        document.execCommand('undo');
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
                            //清空内存
                            localStorage.removeItem("editContent");
                            localStorage.removeItem('editContentId');
                            //清空编辑区
                            this.editarea.innerHTML = '<div><br></div>';
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
                }
            },

        },

        watch: {
            //监听类别是否选择，才可以激活上传按钮
            categorys() {
                this.form.buttonDisabled = this.categorys.length === 0;
            }
        }
    }
</script>

<style lang="scss">
    #myEditor09IL {
        display: flex;
        flex-direction: column;
        height: 100%;
        .content {
            display: flex;
            height: 1%;
            flex-grow: 1;
            margin-top: 10px;
        }
        .richEdit {
            position: relative;
            width: 75%;
            flex-grow: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            .savetip {
                position: absolute;
                top: 50%;
                right: 50px;
                transform: translateY(-50%);
                padding: 5px 15px;
                border-radius: 4px;
                color: #ffffff;
                font-size: 13px;
                background-color: rgba(0, 0, 0, 0.51);
            }
            .head {
                width: 100%;
                padding: 10px 20px;
                font-size: 20px;
                color: #607D8B;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border: none;
                outline: none;
                box-sizing: border-box;
                background-color: #f4f6fb;
            }
            .command {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #efefef;
                overflow: hidden;
                .mune {
                    transition: all 250ms;
                    position: relative;
                    padding: 10px 14px;
                    font-size: 16px;
                    color: #63656b;
                    cursor: pointer;
                    .publish {
                        width: 26px;
                        height: 13px;
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
            /*编辑区*/
            .editarea {
                height: 1%;
                flex-grow: 1;
                padding: 10px 20px;
                outline: none;
                overflow: auto;
                line-height: 1.6;
                font-size: 16px;
                text-align: justify;
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
                h2 {
                    font-weight: normal;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 10px;
                    margin: 10px 0;
                }
                hr {
                    margin: 20px 30px;
                    border: 0;
                    border-top: 1px solid #d9d9d9 !important
                }
                a {
                    padding: 2px 0;
                    margin: 0 5px;
                    text-decoration: none;
                    border: 1px solid #00a0e9;
                    border-radius: 4px;
                    color: rgb(63, 135, 166);
                    cursor: text;
                }
                pre {
                    padding: 20px;
                    background-color: #f2f2f2;
                    border-left: 6px solid #b3b3b3;
                    word-break: break-all;
                    font-family: "Coda", "Helvetica Neue", "Helvetica", Arial, sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;
                    margin: 0 0 20px;
                }
            }
        }
        /*上传列表*/
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