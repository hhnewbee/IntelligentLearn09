webpackJsonp([21],{"38+V":function(e,t,a){"use strict";var n=a("NYxO"),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.a={mounted:function(){this.initMountedData()},data:function(){return{editarea:{},muneData:[["title",["fa-header"],"标题"],["bold",["fa-bold"],"加粗"],["line",["fa-minus"],"分割线"],["block",["fa-quote-left"],"引用块"],["link",["fa-link"],"链接"],["unlink",["fa-chain-broken"],"取消链接"],["removeFormat",["fa-eraser"],"去除格式"],["img",["fa-picture-o"],"添加图片"],["video",["fa-youtube-play"],"添加视频"],["file",["fa-file-text"],"添加资料"],["back",["fa-undo"],"回退"],["cancel",["fa-times fontSize"],"取消全部编辑"],["save",["fa-floppy-o"],"保存"]],editorSelec:{},range:{},addRange:{},uploadUrl:"",uploadType:"",uploadFinish:0,ifsave:!1,theme:"请输入标题",categorys:[],form:{dialogFormVisible:!1,buttonDisabled:!0},articleId:""}},computed:i({},Object(n.b)(["filterType"])),methods:{createRange:function(e){var t=document.createRange();return t.setStart(e.startContainer,e.startOffset),t.setEnd(e.endContainer,e.endOffset),this.editorSelec.removeAllRanges(),this.editorSelec.addRange(t),t},getSelection:function(){this.editorSelec=window.getSelection(),this.range=this.editorSelec.getRangeAt(0)},contentChange:function(){var e=this,t=void 0,a=this.editarea,n=new MutationObserver(function(){clearTimeout(t),t=setTimeout(function(){localStorage.editContent=e.editarea.innerHTML,e.ifsave=!0,setTimeout(function(){e.ifsave=!1},2e3)},3e3)}),i={childList:!0,subtree:!0,characterData:!0};n.observe(a,i)},beforeUpload:function(e){var t=this;setTimeout(function(){var e=t.$refs.uploadList.style;"block"!==e.display&&(t.uploadFinish||(e.display="block"))},2e3);var a=document.createElement("span");a.style.color="#3f87a6";var n=void 0;n="img"===this.uploadType?"fa-picture-o":"video"===this.uploadType?"fa-youtube-play":"fa-file-text",a.innerHTML=" <i class='fa "+n+"'></i> : "+e.name+" ";var i=this.createRange(this.range);i.insertNode(a),this.addRange=i.cloneRange()},resize:function(e){e[0].addEventListener("click",function(){function t(t){var s=t.pageX-i+n,r=t.pageY-o+a;e[0].style.width=s+"px",e[0].style.height=r+"px",e[2].innerText=s+"x"+r}var a=void 0,n=void 0,i=void 0,o=void 0;e[1].style.display="flex",e[2].style.display="block",e[3].style.display="block",a=e[0].offsetHeight,n=e[0].offsetWidth,e[2].innerText=a+"x"+n,e[3].addEventListener("mousedown",function(e){i=e.pageX,o=e.pageY,document.addEventListener("mousemove",t),document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",t)})}),e[4].addEventListener("click",function(){e[0].style.float="left",e[4].style.backgroundColor="rgb(153, 153, 153)",e[5].style.backgroundColor="white",e[6].style.backgroundColor="white"}),e[5].addEventListener("click",function(){e[0].style.float="",e[0].style.margin="auto",e[4].style.backgroundColor="white",e[5].style.backgroundColor="rgb(153, 153, 153)",e[6].style.backgroundColor="white"}),e[6].addEventListener("click",function(){e[0].style.float="right",e[0].style.margin="auto",e[4].style.backgroundColor="white",e[5].style.backgroundColor="white",e[6].style.backgroundColor="rgb(153, 153, 153)"})}),e[0].addEventListener("blur",function(){e[1].style.display="none",e[2].style.display="none",e[3].style.display="none"},!0)},upScuccess:function(e,t,a){var n=void 0;if("img"===this.uploadType||"video"===this.uploadType){var i=document.createElement("div"),o=document.createElement("div"),s=document.createElement("div"),r=document.createElement("div"),l=document.createElement("div"),c=document.createElement("div"),d=document.createElement("div");i.tabIndex=1,i.contentEditable=!1,i.className="resizeDiv",c.className="res",d.className="resS",o.className="posC",s.className="fa fa-align-left pos",r.className="fa fa-align-center pos",l.className="fa fa-align-right pos","img"===this.uploadType?this.createImg(i,e):this.createVideo(i,e),o.appendChild(s),o.appendChild(r),o.appendChild(l),i.appendChild(o),i.appendChild(d),i.appendChild(c),this.resize([i,o,d,c,s,r,l]),n=i}else{var u=document.createElement("a");u.style.color="#3f87a6",u.href=e.url,u.innerHTML=" <i class='fa fa-file-text'></i> : "+t.name+" ",n=u}this.addRange.deleteContents();var m=this.createRange(this.addRange);m.insertNode(n),m.collapse(!1),this.$refs.upload.clearFiles(),1!==a.length&&0!==a.length||(this.$refs.uploadList.style.display="none"),this.uploadFinish=1},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},publish:function(){var e=this;this.$ajaxJava.post("upload/forum",{title:this.theme,categorys:this.categorys.join("/"),content:this.editarea.innerHTML}).then(function(){e.$message({type:"success",message:"发表成功"}),e.editarea.innerHTML="",localStorage.removeItem("editContent"),localStorage.removeItem("editContentId"),e.theme="文章标题"}).catch(function(){e.$message({type:"error",message:"网络异常，发表失败"})}),this.form.buttonDisabled=!0,this.form.dialogFormVisible=!1},handleBackManage:function(){this.$router.push({path:"/userCenter/articlesManage/#articlesManage"})},createVideo:function(e,t){var a=' <video\n                        class="video-js vjs-big-play-centered"\n                        controls\n                        preload="auto"\n                        data-setup=\'{"playbackRates": [0.7, 1, 1.5, 1.7, 2]}\'>\n                            <source src="'+t.url+'">\n                        </video>';e.innerHTML=a},createImg:function(e,t){var a='<img src="'+t.url+'">';e.innerHTML=a},initMountedData:function(){if(this.editarea=this.$refs.editarea,localStorage.editContent)this.editarea.innerHTML=localStorage.editContent,this.articleId=localStorage.editContentId;else{var e=Date.now();this.articleId=e,localStorage.editContentId=e}this.contentChange()},editCommand:function(e){var t=this;if("img"===e|"video"===e|"file"===e)return this.uploadType=e,this.uploadUrl="http://172.16.148.27:8080/upload/forumFile",void document.querySelector("#uploadButton").click();switch(e){case"title":"H2"===this.createRange(this.range).startContainer.parentElement.nodeName?document.execCommand("formatBlock",!1,"<div>"):document.execCommand("formatBlock",!1,"<h2>");break;case"bold":document.execCommand("bold",!1,0);break;case"line":document.execCommand("insertHTML",!1,"<hr><p><br></p>");break;case"block":"PRE"===this.createRange(this.range).startContainer.parentElement.nodeName?document.execCommand("formatBlock",!1,"<DIV>"):document.execCommand("formatBlock",!1,"<PRE>");break;case"link":this.$prompt("请输入URL",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var a=e.value,n=document.createElement("a");n.href=a,n.title=a;var i=t.createRange(t.range),o="新建链接";i.collapsed||(o=i.cloneContents().textContent),n.innerHTML="&nbsp;"+o+"&nbsp",i.insertNode(n),i.collapse(!1)});break;case"unlink":document.execCommand("unlink");break;case"removeFormat":document.execCommand("removeFormat");break;case"back":document.execCommand("undo");break;case"cancel":this.$confirm("永久删除编辑内容, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$message({type:"success",message:"删除成功!"}),localStorage.removeItem("editContent"),localStorage.removeItem("editContentId"),t.editarea.innerHTML="<div><br></div>"}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"save":localStorage.editContent=this.editarea.innerHTML,this.ifsave=!0,setTimeout(function(){t.ifsave=!1},2e3)}}},watch:{categorys:function(){this.form.buttonDisabled=0===this.categorys.length}}}},WkdQ:function(e,t,a){"use strict";function n(e){s||a("m9we")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("38+V"),o=a("e4n/"),s=!1,r=a("VU/8"),l=n,c=r(i.a,o.a,!1,l,null,null);c.options.__file="vueProgect\\src\\components\\edit\\myEditor.vue",t.default=c.exports},"e4n/":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"myEditor09IL"}},[a("el-breadcrumb",{staticClass:"breadcrumb"},[a("el-breadcrumb-item",{staticClass:"el-icon-setting"},[e._v("\n             后台管理\n        ")]),e._v(" "),a("el-breadcrumb-item",[a("span",{on:{click:e.handleBackManage}},[e._v("\n                文章管理\n            ")])]),e._v(" "),a("el-breadcrumb-item",[e._v("\n            文章编辑\n        ")])],1),e._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"richEdit"},[a("div",{staticStyle:{position:"relative"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.theme,expression:"theme"}],staticClass:"head",domProps:{value:e.theme},on:{input:function(t){t.target.composing||(e.theme=t.target.value)}}}),e._v(" "),a("transition",{attrs:{name:"el-fade-in"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.ifsave,expression:"ifsave"}],staticClass:"savetip"},[e._v("已保存")])])],1),e._v(" "),a("div",{staticClass:"command"},[e._l(e.muneData,function(t,n){return a("div",{key:n,staticClass:"fa mune",class:t[1],attrs:{title:t[2]},on:{mousedown:function(a){e.editCommand(t[0])}}})}),e._v(" "),a("div",{staticClass:"fa fa-mail-forward mune",staticStyle:{display:"flex","justify-content":"center","align-items":"center"},on:{click:function(t){e.form.dialogFormVisible=!0}}},[a("div",{staticClass:"publish"},[e._v(" 发布")])])],2),e._v(" "),a("div",{ref:"editarea",staticClass:"editarea",attrs:{spellcheck:"false",contenteditable:"true"},on:{click:e.getSelection}},[a("div")])]),e._v(" "),a("div",{ref:"uploadList",staticClass:"uploadList"},[a("el-upload",{ref:"upload",attrs:{action:e.uploadUrl,name:e.uploadType,"with-credentials":!0,"before-remove":e.beforeRemove,"before-upload":e.beforeUpload,"on-success":e.upScuccess,multiple:""}},[a("el-button",{staticStyle:{display:"none"},attrs:{id:"uploadButton",size:"small",type:"primary"}}),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("文件上传中")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提交",width:"500px",visible:e.form.dialogFormVisible},on:{"update:visible":function(t){e.$set(e.form,"dialogFormVisible",t)}}},[a("el-select",{staticStyle:{width:"250px","margin-left":"105px"},attrs:{placeholder:"请选择文章类别",multiple:""},model:{value:e.categorys,callback:function(t){e.categorys=t},expression:"categorys"}},e._l(e.filterType("全部"),function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.form.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.form.buttonDisabled},on:{click:e.publish}},[e._v("确 定")])],1)],1)],1)],1)},i=[];n._withStripped=!0;var o={render:n,staticRenderFns:i};t.a=o},m9we:function(e,t){}});