<template>
    <div class="manageStyle">
        <!--面包屑-->
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-document"> 我的学习</el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">学习记录</span></el-breadcrumb-item>
            <el-breadcrumb-item
                    v-if="ifSearch">搜索
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <!--搜索-->
            <el-input
                    style="width: 300px;"
                    size="small"
                    v-model="searchInput"
                    placeholder="请输入内容">
                <span slot="suffix"
                      @click="handleSearch"
                      class="el-icon-search searchIcon"></span>
            </el-input>
            <!--更多功能切换-->
            <el-button type="primary"
                       size="small"
                       @click="handleShowMore"
                       style="margin-left: 10px"
                       title="更多功能"
                       icon="el-icon-menu">
            </el-button>
            <!--图表类型选择-->
            <el-select
                    @change="handleChartChange"
                    style="width: 120px;position: absolute;right: 40px"
                    v-model="selectValue"
                    size="small"
                    placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--更多功能-->
        <div class="moreFun"
             v-if='ifMoreFun'>
            <el-button
                    :disabled="ifDelect"
                    @click="handleDelectRows"
                    type="primary"
                    size="small"
                    icon="el-icon-delete">
                批量删除
            </el-button>
            <el-button
                    @click="handleDelectAll"
                    type="danger"
                    size="small"
                    icon="el-icon-delete">
                全部删除
            </el-button>
        </div>
        <!--主体内容-->
        <div class="content">
            <!--表格-->
            <el-table
                    ref="table"
                    height="100%"
                    v-show="ifTable"
                    @select-all="handleSelectAll"
                    @select="handleSelectBatch"
                    :data="tableData"
                    border>
                <el-table-column type="selection"
                                 fixed
                                 align='center'
                                 width="45">
                </el-table-column>

                <el-table-column prop="date"
                                 align='center'
                                 label="日期"
                                 width="100">
                </el-table-column>

                <el-table-column prop="name"
                                 align='center'
                                 label="名称"
                                 min-width="120">
                </el-table-column>

                <el-table-column label="上传传者"
                                 align='center'
                                 :show-overflow-tooltip="true"
                                 width="200">
                    <div slot-scope="scope"
                         style="display: flex;justify-content: center;align-items: center;">
                        <infoDetail :avatarUrl="scope.row.avatar"
                                    :account="scope.row.nickName"
                                    :size="35"
                                    style="cursor: pointer;margin-right: 8px">
                        </infoDetail>
                        <span>{{scope.row.nickName}}</span>
                    </div>
                </el-table-column>

                <el-table-column prop="type"
                                 align='center'
                                 label="类型"
                                 width="50">
                </el-table-column>

                <el-table-column prop="category"
                                 align='center'
                                 label="类别"
                                 width="100">
                </el-table-column>

                <el-table-column prop="newDate"
                                 align='center'
                                 label="最近访问"
                                 width="100">
                </el-table-column>

                <el-table-column label="操作"
                                 align='center'
                                 fixed="right"
                                 width="110">
                    <template slot-scope="scope">
                        <el-button
                                @click="handleSee('record',scope)"
                                type="text"
                                size="small">
                            查看
                        </el-button>
                        <el-button
                                @click="handleDeleteRow(scope)"
                                type="text"
                                style="color: red;"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--图表-->
            <hightChart
                    v-if="!ifTable"
                    :chartData="chartData"></hightChart>
        </div>
        <!--分页-->
        <el-pagination
                style="align-self: center"
                @current-change="handlePage"
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="1"
                :total="listNow.page">
        </el-pagination>
    </div>
</template>

<script>
    import {manageMixin} from './manageMixin.js';
    import infoDetail from './infoDetail.vue';

    export default {
        mounted(){
            this.initData([{value: '学习记录'}, {value: '学习详情'}]);
        },
        methods:{
            /**
             * 设置获取数据的格式
             */
            setDataFormat(resDatas){
                let tableData=[];
                resDatas.history.forEach((data,index)=>{
                    let newData={};
                    if(data.course){
                        newData.courseId=data.course.id;
                        newData.type='课程';
                        newData.name=data.course.title;
                        newData.category=data.course.type;
                        newData.avatar=data.course.userIconUrl;
                        newData.nickName=data.course.uploadUsername;
                    }else{
                        newData.forumId=data.forum.id;
                        newData.type='文章';
                        newData.name=data.forum.title;
                        newData.category=data.forum.categorys;
                        newData.nickName=data.forum.userName;
                        newData.avatar=data.forum.userIconUrl;
                    }
                    newData.index=index;
                    newData.date=this.$formatDate(data.createTime);
                    newData.newDate=this.$formatDate(data.updateTime);
                    newData.useTime=Math.ceil(this.$formatMinutes(data.learnTime));
                    newData.accessTimes=data.visitTime;
                    tableData.push(newData);
                });
                return tableData;
            },
            /**
             * 单行删除
             * @param scope
             */
            handleDeleteRow(scope) {
                this.$ajax.create().post(this.urlDelect,[this.listNow.history[scope.$index]]).then(()=>{
                    this.$message.success('删除成功');
                    this.tableData.splice(scope.$index, 1);
                })
            },
            /**
             * 删除选择的数据
             */
            handleDelectRows() {
                //形成删除对象数组
                let deletes=this.delectRows.map((de)=>{
                    return this.listNow.history[de.index];
                });
                this.$ajax.create().post(this.urlDelect,deletes).then(()=>{
                    this.$message.success('删除成功');
                    //本地更新删除效果
                    //如果全部选择
                    if (this.ifSelecttALl) {
                        //清空数据
                        this.tableData = [];
                        //删除按钮禁用
                        this.ifDelect = true;
                        return;
                    }
                    //如果是部分选择，遍历出相同元素所处的位置并且删除
                    for (let i = 0; i < this.tableData.length; i++) {
                        for (let x = 0; x < this.delectRows.length; x++) {
                            if (this.delectRows[x] === this.tableData[i]) {
                                this.tableData.splice(i, 1);
                            }
                        }
                    }
                    //清空数据防止重复遍历
                    this.delectRows = [];
                });

            },
        },
        components: {
            hightChart:()=>import(/* webpackChunkName: "hightChart.vue" */ './hightChart.vue'),
            infoDetail
        },
        computed:{
            url(){
                return `/user/history/page=${this.page-1}/size=${this.itemCount}`;
            },
            urlSearch(){
                return `/user/history/page=${this.pageSearch-1}/size=${this.itemCount}/${this.searchInput}`;
            },
            urlDelect(){
                return `/user/history`
            }
        },
        watch:{
             //监听加载的数据变化
             listNow(){
                 this.tableData = this.setDataFormat(this.listNow);
             }
        },
        mixins: [manageMixin],
    }
</script>

<style scoped lang="scss">
    @import "./manageStyle.scss";
</style>

