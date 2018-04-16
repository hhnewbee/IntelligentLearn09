webpackJsonp([18],{FZbI:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manageStyle"},[a("el-breadcrumb",{staticClass:"breadcrumb"},[a("el-breadcrumb-item",{staticClass:"el-icon-star-off"},[a("span",{on:{click:e.handleBackSearch}},[e._v(" 我的收藏")])]),e._v(" "),e.ifSearch?a("el-breadcrumb-item",[e._v("搜索\n        ")]):e._e()],1),e._v(" "),a("div",{staticClass:"header"},[a("el-input",{staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入内容"},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[a("span",{staticClass:"el-icon-search searchIcon",attrs:{slot:"suffix"},on:{click:e.handleSearch},slot:"suffix"})]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small",icon:"el-icon-menu"},on:{click:e.handleShowMore}}),e._v(" "),a("el-select",{staticStyle:{width:"110px",position:"absolute",right:"40px"},attrs:{size:"small"},on:{change:e.handleChartChange},model:{value:e.selectValue,callback:function(t){e.selectValue=t},expression:"selectValue"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{value:e.value}})}))],1),e._v(" "),e.ifMoreFun?a("div",{staticClass:"moreFun"},[a("el-button",{attrs:{disabled:e.ifDelect,type:"primary",size:"small",icon:"el-icon-delete"},on:{click:e.handleDelectRows}},[e._v("\n            批量删除\n        ")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-delete"},on:{click:e.handleDelectAll}},[e._v("\n            全部删除\n        ")])],1):e._e(),e._v(" "),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"show",rawName:"v-show",value:e.ifTable,expression:"ifTable"}],ref:"table",attrs:{data:e.tableData,height:"100%",border:""},on:{"select-all":e.handleSelectAll,select:e.handleSelectBatch}},[a("el-table-column",{attrs:{fixed:"",align:"center",type:"selection",width:"45"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"date",label:"日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"名称","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"上传传者","show-overflow-tooltip":!0,width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center"}},[a("img",{staticStyle:{width:"35px",height:"35px","border-radius":"50%","margin-right":"10px"},attrs:{src:t.row.avatar}}),e._v(" "),a("span",[e._v(e._s(t.row.nickName))])])}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"type",label:"类型",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"category",label:"类别",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"newDate",label:"最近访问",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"110"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.handleSee("record",t)}}},[e._v("\n                        查看\n                    ")]),e._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{type:"text",size:"small"},on:{click:function(a){e.handleDeleteRow(t)}}},[e._v("\n                        删除\n                    ")])]}}])})],1),e._v(" "),e.ifTable?e._e():a("hightChart",{attrs:{chartData:e.chartData}})],1),e._v(" "),a("el-pagination",{staticStyle:{"align-self":"center"},attrs:{background:"",layout:"prev, pager, next","page-size":1,total:e.listNow.pages},on:{"current-change":e.handlePage}})],1)},s=[];i._withStripped=!0;var n={render:i,staticRenderFns:s};t.a=n},IfJE:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var i=a("NuJq"),s={data:function(){return{delectRows:[],ifDelect:!0,tableData:[],ifSelecttALl:!1,ifSearch:!1,searchInput:"",selectValue:"",ifTable:!0,chartData:[],ifMoreFun:!1,options:[],itemCount:0,page:1,pageSearch:1,currentPage:1}},methods:{handleSelectBatch:function(e){this.delectRows=e},handleDelectRows:function(){var e=this,t=this.delectRows.map(function(e){return e.id});this.$ajax.create().post(this.urlDelect,t).then(function(){if(e.$message.success("删除成功"),e.ifSelecttALl)return e.tableData=[],void(e.ifDelect=!0);for(var t=0;t<e.tableData.length;t++)for(var a=0;a<e.delectRows.length;a++)e.delectRows[a]===e.tableData[t]&&e.tableData.splice(t,1);e.delectRows=[]})},handleSelectAll:function(e){this.delectRows=e,this.ifDelect=!this.ifDelect,this.ifSelecttALl=!0},handleDeleteRow:function(e){var t=this;this.$ajax.create().post(this.urlDelect,[e.row.id]).then(function(){t.$message.success("删除成功"),t.tableData.splice(e.$index,1)})},handleDelectAll:function(){},handlePage:function(e){this.ifSearch?(this.pageSearch=e,this.handleChangeArea("search"+e+this.searchInput,this.urlSearch)):(this.page=e,this.handleChangeArea("p"+e,this.url))},handleChartChange:function(e){this.ifTable=e!==this.options[1].value},handleSearch:function(){this.pageSearch=1,this.handleChangeArea("search1"+this.searchInput,this.urlSearch),this.ifSearch=!0,this.currentPage=this.pageSearch},handleBackSearch:function(){this.ifSearch=!1,this.handleChangeArea("p"+this.page,this.url),this.currentPage=this.page},handleSee:function(e,t){switch(e){case"course":this.$router.push({path:"/course/"+t.row.id});break;case"article":window.open("http://localhost:3000/#/main/articlePage/article/"+t.row.id);break;case"user":this.infoData=t.row,this.handleChangeArea("dialog"+t.row.id+"最近一周","admin/user/"+t.row.id+"/week"),this.dialogUserVisible=!0;break;case"message":this.$ajaxJava.get("message/"+t.row.id).then(function(){t.row.status="已读"}),this.dialogInfo=!0,this.dialogTime=t.row.time,this.dialogContent=t.row.content;break;case"record":t.row.courseId?this.$router.push({path:"/course/"+t.row.courseId}):window.open("http://localhost:3000/#/main/articlePage/article/"+t.row.forumId)}},setChartData:function(){var e=this;this.chartData=[[],[],[]],this.tableData.forEach(function(t){e.chartData[0].push(t.name),e.chartData[1].push(t.useTime),e.chartData[2].push(t.accessTimes)}),this.chartData[1]=[],this.chartData[1].push([20],[3],[10],[1],[5],[12])},handleShowMore:function(){this.ifMoreFun=!this.ifMoreFun},initData:function(e){this.setItemCount(),this.handleChangeArea("p1",this.url),this.options=e,this.selectValue=e[0].value},setItemCount:function(){this.itemCount=Math.floor((this.$refs.table.$el.clientHeight-48)/60)}},watch:{tableData:function(){this.setChartData()},delectRows:function(){this.ifDelect=0===this.delectRows.length}},mixins:[i.a]}},N6Ta:function(e,t,a){"use strict";function i(e){r||a("T6LJ")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("bVNT"),n=a("FZbI"),r=!1,o=a("VU/8"),l=i,c=o(s.a,n.a,!1,l,"data-v-213c2f14",null);c.options.__file="vueProgect\\src\\components\\userCenter\\collection.vue",t.default=c.exports},NuJq:function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"e",function(){return s}),a.d(t,"b",function(){return n}),a.d(t,"c",function(){return r}),a.d(t,"d",function(){return o});var i={data:function(){return{areas:new Map,oldTag:null,listNow:{}}},methods:{handleChangeArea:function(e,t){var a=this;this.oldTag&&(this.areas.get(this.oldTag).show=!1),this.areas.has(e)?(this.areas.get(e).show=!0,this.listNow=this.areas.get(e).itemList):this.$ajaxJava.get(t).then(function(t){a.listNow=t.data,a.areas.set(e,{show:!0,itemList:t.data})}),this.oldTag=e}}},s={data:function(){return{heartTime:""}},methods:{keepLearning:function(e){var t=this;this.heartTime=setInterval(function(){t.$ajax.create().get(e,function(e){})},2e3)},beginLearning:function(e){this.$ajaxJava.get("/"+e,function(e){})}}},n={methods:{handleLikeAcollect:function(e,t){var a=this;this.$ajaxJava.get(e+t.id).then(function(i){"0"===i.data.result?a.$message({message:e.match("liking")?"已经点赞过":"已经收藏过",type:"warning",duration:2e3,showClose:!0}):(a.$refs[e+t.id]&&(a.$refs[e+t.id].style.color="#409EFF"),t[e]++)})}}},r={methods:{handlePageBack:function(){this.$router.push({path:localStorage.backUrl})}}},o={data:function(){return{choose:"最新",typeChoose:"",url:""}},methods:{iniData:function(){-1!==this.areaFocus.indexOf("/")?this.typeChoose=this.areaFocus.split("/",1)[0]:this.typeChoose=this.areaFocus,this.handleChangeArea("new"+this.typeChoose+"P1",this.url+"/choose=new/type="+this.typeChoose+"/page=0/size=12")},handleChoose:function(e){var t="最新"===e?"new":"hot";this.handleChangeArea(t+this.typeChoose+"p1",this.url+"/choose="+t+"/type="+this.typeChoose+"/page=0/size=12")},hanleType:function(e){var t="最新"===this.choose?"new":"hot";this.handleChangeArea(t+e+"p1",this.url+"/choose="+t+"/type="+e+"/page=0/size=12")},handlePage:function(e){var t="最新"===this.choose?"new":"hot";this.handleChangeArea(t+this.typeChoose+"p"+e,this.url+"/choose="+t+"/type="+this.typeChoose+"/page="+(e-1))}}}},T6LJ:function(e,t){},bVNT:function(e,t,a){"use strict";var i=a("IfJE");t.a={mounted:function(){this.initData([{value:"收藏记录"},{value:"学习详情"}])},methods:{setDataFormat:function(e){var t=this;return e.lists.map(function(e){var a={};return a.id=e.id,a.date=t.$formatDate(e.createTime),a.newDate=t.$formatDate(e.updateTime),a.useTime=Math.ceil(t.$formatMinutes(e.learnTime)),a.accessTimes=e.visitTime,e.course?(a.courseId=e.course.id,a.type="课程",a.name=e.course.title,a.category=e.course.type,a.avatar=e.course.userIconUrl,a.nickName=e.course.uploadUsername):(a.forumId=e.forum.id,a.type="文章",a.name=e.forum.title,a.category=e.forum.type,a.avatar=e.forum.userIconUrl,a.nickName=e.forum.uploadUsername),a})}},computed:{url:function(){return"user/course/collections/page="+(this.page-1)+"/size="+this.itemCount},urlSearch:function(){return"user/course/collections/page="+(this.pageSearch-1)+"/size="+this.itemCount},urlDelect:function(){return"user/course/collections"}},components:{hightChart:function(){return a.e(27).then(a.bind(null,"F/t1"))}},watch:{listNow:function(){this.tableData=this.setDataFormat(this.listNow)}},mixins:[i.a]}}});