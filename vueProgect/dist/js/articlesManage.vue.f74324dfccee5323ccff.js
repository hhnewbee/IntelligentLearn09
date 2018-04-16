webpackJsonp([19],{"5/2Y":function(t,e,a){"use strict";function i(t){l||a("Au6c")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("n5mp"),n=a("7TxN"),l=!1,r=a("VU/8"),c=i,o=r(s.a,n.a,!1,c,"data-v-a178ed10",null);o.options.__file="vueProgect\\src\\components\\userCenter\\articlesManage.vue",e.default=o.exports},"7TxN":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"manageStyle"},[a("el-breadcrumb",{staticClass:"breadcrumb"},[a("el-breadcrumb-item",{staticClass:"el-icon-setting"},[t._v("\n             后台管理\n        ")]),t._v(" "),a("el-breadcrumb-item",[a("span",{on:{click:t.handleBackSearch}},[t._v("\n                文章管理\n            ")])]),t._v(" "),t.ifSearch?a("el-breadcrumb-item",[t._v("搜索\n        ")]):t._e()],1),t._v(" "),a("div",{staticClass:"header"},[a("el-input",{staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入内容"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}},[a("span",{staticClass:"el-icon-search searchIcon",attrs:{slot:"suffix"},on:{click:t.handleSearch},slot:"suffix"})]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"success",size:"small"},on:{click:t.pushArticle}},[t._v("\n            文章发布\n        ")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small",icon:"el-icon-menu"},on:{click:t.handleShowMore}}),t._v(" "),a("el-select",{staticStyle:{width:"110px",position:"absolute",right:"40px"},attrs:{size:"small"},on:{change:t.handleChartChange},model:{value:t.selectValue,callback:function(e){t.selectValue=e},expression:"selectValue"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{value:t.value}})}))],1),t._v(" "),t.ifMoreFun?a("div",{staticClass:"moreFun"},[a("el-button",{attrs:{disabled:t.ifDelect,type:"primary",size:"small",icon:"el-icon-delete"},on:{click:t.handleDelectRows}},[t._v("\n            批量删除\n        ")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-delete"},on:{click:t.handleDelectAll}},[t._v("\n            全部删除\n        ")])],1):t._e(),t._v(" "),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"show",rawName:"v-show",value:t.ifTable,expression:"ifTable"}],ref:"table",attrs:{data:t.tableData,height:"100%",border:""},on:{"select-all":t.handleSelectAll,select:t.handleSelectBatch}},[a("el-table-column",{attrs:{fixed:"",align:"center",type:"selection",width:"45"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"date",label:"上传时间",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"category",label:"类别",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"课程状态",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[a("el-switch",{attrs:{"active-text":"可以观看","inactive-text":"不可观看","active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})],1)}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleSee("article",e)}}},[t._v("\n                        查看\n                    ")]),t._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{type:"text",size:"small"},on:{click:function(a){t.handleDeleteRow(e)}}},[t._v("\n                        删除\n                    ")])]}}])})],1),t._v(" "),t.ifTable?t._e():a("courseChart",{attrs:{chartData:t.chartData}})],1),t._v(" "),a("el-pagination",{staticStyle:{"align-self":"center"},attrs:{background:"",layout:"prev, pager, next","page-size":1,total:t.listNow.page},on:{"current-change":t.handlePage}})],1)},s=[];i._withStripped=!0;var n={render:i,staticRenderFns:s};e.a=n},Au6c:function(t,e){},IfJE:function(t,e,a){"use strict";a.d(e,"a",function(){return s});var i=a("NuJq"),s={data:function(){return{delectRows:[],ifDelect:!0,tableData:[],ifSelecttALl:!1,ifSearch:!1,searchInput:"",selectValue:"",ifTable:!0,chartData:[],ifMoreFun:!1,options:[],itemCount:0,page:1,pageSearch:1,currentPage:1}},methods:{handleSelectBatch:function(t){this.delectRows=t},handleDelectRows:function(){var t=this,e=this.delectRows.map(function(t){return t.id});this.$ajax.create().post(this.urlDelect,e).then(function(){if(t.$message.success("删除成功"),t.ifSelecttALl)return t.tableData=[],void(t.ifDelect=!0);for(var e=0;e<t.tableData.length;e++)for(var a=0;a<t.delectRows.length;a++)t.delectRows[a]===t.tableData[e]&&t.tableData.splice(e,1);t.delectRows=[]})},handleSelectAll:function(t){this.delectRows=t,this.ifDelect=!this.ifDelect,this.ifSelecttALl=!0},handleDeleteRow:function(t){var e=this;this.$ajax.create().post(this.urlDelect,[t.row.id]).then(function(){e.$message.success("删除成功"),e.tableData.splice(t.$index,1)})},handleDelectAll:function(){},handlePage:function(t){this.ifSearch?(this.pageSearch=t,this.handleChangeArea("search"+t+this.searchInput,this.urlSearch)):(this.page=t,this.handleChangeArea("p"+t,this.url))},handleChartChange:function(t){this.ifTable=t!==this.options[1].value},handleSearch:function(){this.pageSearch=1,this.handleChangeArea("search1"+this.searchInput,this.urlSearch),this.ifSearch=!0,this.currentPage=this.pageSearch},handleBackSearch:function(){this.ifSearch=!1,this.handleChangeArea("p"+this.page,this.url),this.currentPage=this.page},handleSee:function(t,e){switch(t){case"course":this.$router.push({path:"/course/"+e.row.id});break;case"article":window.open("http://localhost:3000/#/main/articlePage/article/"+e.row.id);break;case"user":this.infoData=e.row,this.handleChangeArea("dialog"+e.row.id+"最近一周","admin/user/"+e.row.id+"/week"),this.dialogUserVisible=!0;break;case"message":this.$ajaxJava.get("message/"+e.row.id).then(function(){e.row.status="已读"}),this.dialogInfo=!0,this.dialogTime=e.row.time,this.dialogContent=e.row.content;break;case"record":e.row.courseId?this.$router.push({path:"/course/"+e.row.courseId}):window.open("http://localhost:3000/#/main/articlePage/article/"+e.row.forumId)}},setChartData:function(){var t=this;this.chartData=[[],[],[]],this.tableData.forEach(function(e){t.chartData[0].push(e.name),t.chartData[1].push(e.useTime),t.chartData[2].push(e.accessTimes)}),this.chartData[1]=[],this.chartData[1].push([20],[3],[10],[1],[5],[12])},handleShowMore:function(){this.ifMoreFun=!this.ifMoreFun},initData:function(t){this.setItemCount(),this.handleChangeArea("p1",this.url),this.options=t,this.selectValue=t[0].value},setItemCount:function(){this.itemCount=Math.floor((this.$refs.table.$el.clientHeight-48)/60)}},watch:{tableData:function(){this.setChartData()},delectRows:function(){this.ifDelect=0===this.delectRows.length}},mixins:[i.a]}},NuJq:function(t,e,a){"use strict";a.d(e,"a",function(){return i}),a.d(e,"e",function(){return s}),a.d(e,"b",function(){return n}),a.d(e,"c",function(){return l}),a.d(e,"d",function(){return r});var i={data:function(){return{areas:new Map,oldTag:null,listNow:{}}},methods:{handleChangeArea:function(t,e){var a=this;this.oldTag&&(this.areas.get(this.oldTag).show=!1),this.areas.has(t)?(this.areas.get(t).show=!0,this.listNow=this.areas.get(t).itemList):this.$ajaxJava.get(e).then(function(e){a.listNow=e.data,a.areas.set(t,{show:!0,itemList:e.data})}),this.oldTag=t}}},s={data:function(){return{heartTime:""}},methods:{keepLearning:function(t){var e=this;this.heartTime=setInterval(function(){e.$ajax.create().get(t,function(t){})},2e3)},beginLearning:function(t){this.$ajaxJava.get("/"+t,function(t){})}}},n={methods:{handleLikeAcollect:function(t,e){var a=this;this.$ajaxJava.get(t+e.id).then(function(i){"0"===i.data.result?a.$message({message:t.match("liking")?"已经点赞过":"已经收藏过",type:"warning",duration:2e3,showClose:!0}):(a.$refs[t+e.id]&&(a.$refs[t+e.id].style.color="#409EFF"),e[t]++)})}}},l={methods:{handlePageBack:function(){this.$router.push({path:localStorage.backUrl})}}},r={data:function(){return{choose:"最新",typeChoose:"",url:""}},methods:{iniData:function(){-1!==this.areaFocus.indexOf("/")?this.typeChoose=this.areaFocus.split("/",1)[0]:this.typeChoose=this.areaFocus,this.handleChangeArea("new"+this.typeChoose+"P1",this.url+"/choose=new/type="+this.typeChoose+"/page=0/size=12")},handleChoose:function(t){var e="最新"===t?"new":"hot";this.handleChangeArea(e+this.typeChoose+"p1",this.url+"/choose="+e+"/type="+this.typeChoose+"/page=0/size=12")},hanleType:function(t){var e="最新"===this.choose?"new":"hot";this.handleChangeArea(e+t+"p1",this.url+"/choose="+e+"/type="+t+"/page=0/size=12")},handlePage:function(t){var e="最新"===this.choose?"new":"hot";this.handleChangeArea(e+this.typeChoose+"p"+t,this.url+"/choose="+e+"/type="+this.typeChoose+"/page="+(t-1))}}}},n5mp:function(t,e,a){"use strict";var i=a("IfJE");e.a={mounted:function(){this.initData([{value:"文章记录"},{value:"文章详情"}])},methods:{pushArticle:function(){this.$router.push({path:"/userCenter/articlesManage/articleEdit/#articlesManage"})},setChartData:function(){var t=this;this.chartData=[[],[],[],[],[]],this.tableData.forEach(function(e){t.chartData[0].push(e.name),t.chartData[1].push(10),t.chartData[2].push(14),t.chartData[3].push(20),t.chartData[4].push(13)})},setDataFormat:function(t){var e=this;return t.forums.map(function(t){return{id:t.id,date:e.$formatDate(t.creationTimestamp),name:t.title,status:!0,category:t.categorys,accessTimes:t.visitTime,likes:t.liking,collection:t.collections,question:t.questions}})}},components:{courseChart:function(){return a.e(31).then(a.bind(null,"9WI4"))}},computed:{url:function(){return"admin/forums/page="+(this.page-1)+"/size="+this.itemCount},urlSearch:function(){return"admin/forums/page="+(this.pageSearch-1)+"/size="+this.itemCount},urlDelect:function(){return"/admin/forums"}},watch:{listNow:function(){this.tableData=this.setDataFormat(this.listNow)}},mixins:[i.a]}}});