webpackJsonp([20],{"/llD":function(e,t){},"9Um6":function(e,t,s){"use strict";function a(e,t){var s=this;return function(a){var i=a.type.startsWith(e);return i||s.$message.error(t),i}}t.a=a},AS60:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{key:e.flashKey,staticClass:"upload"},[s("el-breadcrumb",{staticClass:"breadcrumb"},[s("el-breadcrumb-item",{staticClass:"el-icon-setting"},[e._v("\n             后台管理\n        ")]),e._v(" "),s("el-breadcrumb-item",[s("span",{on:{click:e.handleBackManage}},[e._v("\n                课程管理\n            ")])]),e._v(" "),s("el-breadcrumb-item",[e._v("\n            课程上传\n        ")])],1),e._v(" "),s("div",{staticClass:"uploadContent"},[s("div",[s("div",{staticClass:"title item"},[s("div",{staticClass:"span"},[e._v("课程标题:")]),e._v(" "),s("el-input",{staticClass:"input content",attrs:{placeholder:"请输入内容"},model:{value:e.courseTitle,callback:function(t){e.courseTitle=t},expression:"courseTitle"}})],1),e._v(" "),s("div",{staticClass:"intr item"},[s("div",{staticClass:"span"},[e._v("课程简介:")]),e._v(" "),s("el-input",{staticClass:"textare content",attrs:{type:"textarea",resize:"none",autosize:{minRows:3},placeholder:"请输入内容"},model:{value:e.courseIntr,callback:function(t){e.courseIntr=t},expression:"courseIntr"}})],1),e._v(" "),s("div",{staticClass:"category item"},[s("div",{staticClass:"span"},[e._v("课程类型:")]),e._v(" "),s("el-select",{staticClass:"content",staticStyle:{width:"100%"},attrs:{multiple:"",placeholder:"请选择"},model:{value:e.categorys,callback:function(t){e.categorys=t},expression:"categorys"}},e._l(e.filterType("全部"),function(e){return s("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),s("div",{staticClass:"icon item"},[s("div",{staticClass:"span"},[e._v("课程图标:")]),e._v(" "),s("el-upload",{ref:"iconUpload",staticClass:"iconUpload content",attrs:{action:e.iconUrl,"list-type":"picture-card","auto-upload":!1,"on-preview":e.handlePictureCardPreview,"on-change":e.handleIconBefore,"before-upload":e.handleLimitFileType("image","只能上传文件"),handleIconUpload:e.handleIconUpload,"on-success":e.handleIconSuccess,"with-credentials":!0,"on-remove":e.handleIconRemove}},[s("i",{directives:[{name:"show",rawName:"v-show",value:e.iconAdd,expression:"iconAdd"}],staticClass:"el-icon-plus"})]),e._v(" "),s("el-dialog",{attrs:{visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)]),e._v(" "),s("div",{staticClass:"item",staticStyle:{height:"100%",display:"flex","flex-direction":"column"}},[s("div",{staticClass:"span"},[e._v("视频上传:")]),e._v(" "),s("div",{staticClass:"content",staticStyle:{display:"flex","align-items":"center"}},[s("el-input",{attrs:{size:"small",placeholder:"添加章节"},model:{value:e.chapterName,callback:function(t){e.chapterName=t},expression:"chapterName"}}),e._v(" "),s("el-button",{staticStyle:{"margin-left":"5px"},attrs:{disabled:e.chapterNameAdd,size:"small",type:"primary"},on:{click:e.handleAddChapter}},[e._v("\n                    添加章节\n                ")])],1),e._v(" "),s("div",{staticStyle:{overflow:"auto",height:"1%","flex-grow":"1","margin-top":"10px"}},e._l(e.videosUpload,function(t,a){return s("el-upload",{key:a,ref:"videoUpload"+a,refInFor:!0,staticClass:"content",attrs:{name:a+"-"+t.chapterName,action:e.courseUrl,"list-type":"text","on-success":e.handleVideoSuccess,multiple:!0,"with-credentials":!0,"auto-upload":!1}},[s("el-tag",{attrs:{closable:"","disable-transitions":!0},on:{close:function(s){e.handleCloseChapter(t)}}},[e._v(e._s(t.chapterName)+"\n                    ")])],1)}))]),e._v(" "),s("div",{staticClass:"sourceList item"},[s("div",{staticClass:"span"},[e._v("资料上传:")]),e._v(" "),s("div",{staticStyle:{height:"1%","flex-grow":"1",overflow:"auto"}},[s("el-upload",{ref:"sourceUpload",staticClass:"content",attrs:{action:e.sourseUrl,"list-type":"text","on-success":e.handleSourseSuccess,"before-upload":e.handleSourseUpload,multiple:!0,"with-credentials":!0,"auto-upload":!1}},[s("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择资料")])],1)],1)])]),e._v(" "),s("el-button",{staticClass:"uploadButton",attrs:{size:"small",type:"success"},on:{click:e.upload}},[e._v("\n        上传到服务器\n    ")])],1)},i=[];a._withStripped=!0;var l={render:a,staticRenderFns:i};t.a=l},"DFe/":function(e,t,s){"use strict";function a(e){n||s("/llD")}Object.defineProperty(t,"__esModule",{value:!0});var i=s("cRZh"),l=s("AS60"),n=!1,o=s("VU/8"),c=a,r=o(i.a,l.a,!1,c,"data-v-e6ca9f5a",null);r.options.__file="vueProgect\\src\\components\\userCenter\\coursesUpload.vue",t.default=r.exports},cRZh:function(e,t,s){"use strict";var a=s("9Um6"),i=s("NYxO"),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e};t.a={created:function(){this.initData()},mounted:function(){this.iconDivS=this.$refs.iconUpload.$el.lastChild.style},data:function(){return{courseTitle:null,courseIntr:null,iconDivS:{},iconAdd:!0,dialogImageUrl:"",dialogVisible:!1,chapterName:"",videosUpload:[],categorys:[],infoUrl:"upload/course",iconUrl:"",courseUrl:"",sourseUrl:"",sourseStatus:!0,iconStatus:!0,url:"http://172.16.148.27:8080/",uploadingMessage:{},flashKey:!1}},computed:l({chapterNameAdd:function(){return""===this.chapterName}},Object(i.b)(["filterType"])),methods:{handleIconBefore:function(){this.iconDivS.display="none",this.iconAdd=!0},handleIconRemove:function(){this.iconDivS.display="block",this.iconAdd=!0},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleLimitFileType:a.a,upload:function(){if(!this.courseTitle||!this.courseIntr)return void this.$message.error("标题和简介不能为空");this.$refs.iconUpload.submit();for(var e=0;e<this.videosUpload.length;e++)this.$refs["videoUpload"+e][0].submit();this.$refs.sourceUpload.submit(),this.uploadingMessage=this.$message({dangerouslyUseHTMLString:!0,message:'<span class="el-icon-loading"></span><span style="margin-left: 10px">课程正在上传中<span>',type:"warning",duration:0})},handleIconSuccess:function(){this.successAll()},handleVideoSuccess:function(e,t,s){for(var a=0;a<s.length;a++)if("success"!==s[a].status)return;this.videosUpload.splice(0,1),this.successAll()},handleSourseSuccess:function(){this.sourseStatus=!0,this.successAll()},handleBackManage:function(){this.$router.push({path:"/userCenter/coursesManage/#coursesManage"})},handleAddChapter:function(){this.videosUpload.push({chapterName:this.chapterName,status:!1})},handleCloseChapter:function(e){this.videosUpload.splice(this.videosUpload.indexOf(e),1)},successAll:function(){var e=this;this.iconStatus&&this.sourseStatus&&0===this.videosUpload.length&&this.$ajaxJava.post(this.infoUrl,{title:this.courseTitle,description:this.courseIntr,type:this.categorys.join("/")}).then(function(){e.uploadingMessage.close(),e.$message({message:"上传完成",type:"success"}),e.flashKey=!e.flashKey})},initData:function(){this.iconUrl=this.url+"upload/icon",this.courseUrl=this.url+"upload/videoFile",this.sourseUrl=this.url+"upload/officeFile"},handleSourseUpload:function(){this.sourseStatus=!1},handleIconUpload:function(){this.iconStatus=!1}}}}});