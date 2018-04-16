<template>
    <div id="myEditorLearner09IL">
        <div class="richEdit">
            <div class="command">
                <div v-for="(item,index) in muneData"
                     class="fa mune"
                     :class="item[1]"
                     @mousedown="editCommand(item[0])"
                     :key="index"
                     :title="item[2]">
                </div>
                <div
                        style="width: 80px"
                        class="fa fa-mail-forward mune"
                        @click="form.dialogFormVisible = true">
                    <span class="publish"></span>
                    发布
                </div>
            </div>
            <div
                    spellcheck="false"
                    class="editarea"
                    contenteditable="true"
                    @click="getSelection"
                    ref="editarea">
                <div><br></div>
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
                   append-to-body
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
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        mounted(){
          this.initDom();
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
                    ["back", ["fa-undo"],"回退"],
                    ["cancel", ["fa-times fontSize"],"取消全部编辑"],
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
                categorys: [],
                form: {
                    dialogFormVisible:false,
                    buttonDisabled:true,
                },
            }
        },
        computed: {
            //类型的过滤器
            ...mapGetters(['filterType']),
        },
        methods: {
            editCommand(type) {
                if (type === 'img' | type === 'video' | type === 'file') {
                    this.uploadType = type;
                    //todo 设置上传地址
                    this.uploadUrl = `http://127.0.0.1:8080/upload/questionFile`;
                    document.querySelector('#uploadButton').click();
                    return;
                }
                switch (type) {
                    case "title": {
                        let newRange = this.createRange(this.range);
                        let content = this.range.cloneContents();
                        let p = document.createElement('p');
                        p.innerHTML = '<br>';
                        //删除该区块的全部内容
                        newRange.deleteContents();
                        //是取消标题还是加上标题
                        if(content.nodeName==='h2'){
                            p.innerText=content.innerText;
                            newRange.insertNode(p);
                        }else{
                            let h2 = document.createElement('h2');
                            h2.appendChild(content);
                            //添加p便签。防止内容格式变化
                            newRange.insertNode(p);
                            newRange.insertNode(h2);
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
                        //命令式的消除格式有些不起作用
                        document.execCommand('removeFormat');
                        break;
                    }
                    case "back":{
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
                            this.editarea.innerHTML = `<p><br></p>`;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                        break;
                    }
                }
            },

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
                }, 1000);
                let newNode = document.createElement("span");
                newNode.style.color = '#3f87a6';
                let tmp;
                if (this.uploadType === 'img') {
                    tmp = 'fa-picture-o'
                } else if (this.uploadType === 'video') {
                    tmp = 'fa-youtube-play'
                } else {
                    tmp = 'fa-file-test'
                }
                newNode.innerHTML = ` <i class='fa ${tmp}'></i> : ${file.name} `;

                let newRange = this.createRange(this.range);
                newRange.insertNode(newNode);
                this.addRange = newRange.cloneRange();//复制范围保存供下次使用
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
                //todo 设置发布地址
                this.$ajaxJava.post("upload/question",{
                    title:'',
                    categorys: this.categorys.join('/'),
                    content:this.editarea.innerHTML,
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '发表成功'
                    });
                    //清空内容
                    this.editarea.innerHTML = '';
                    //刷新出上的内容
                    window.location.reload();
                }).catch(()=>{
                    this.$message({
                        type: 'error',
                        message: '网络异常，发表失败'
                    });
                });
                this.form.buttonDisabled=true;
                this.form.dialogFormVisible=false;
            },
            /**
             * 初始化编辑器dom
             */
            initDom(){
                this.editarea = this.$refs.editarea;
            }
        },

        watch:{
            //监听类别是否选择，才可以激活上传按钮
            categorys() {
                this.form.buttonDisabled = this.categorys.length === 0;
            }
        }
    }
</script>

<style lang="scss">
    #myEditorLearner09IL {
        height: 100%;
        display: flex;
        .richEdit {
            position: relative;
            width: 75%;
            flex-grow: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
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
                height: 37px;
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
                line-height: 1.6;
                font-size: 16px;
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