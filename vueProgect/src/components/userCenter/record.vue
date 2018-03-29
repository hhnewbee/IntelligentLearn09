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
                                    style="width: 35px;height: 35px;border-radius: 50%;margin-right: 10px;cursor: pointer"></infoDetail>
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
                                @click="handleSee(scope)"
                                type="text"
                                size="small">
                            查看
                        </el-button>
                        <el-button
                                @click="handleDeleteRow(scope.$index)"
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
                :total="1000">
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
                resDatas.history.forEach((data)=>{
                    let newData={};
                    if(data.course){
                        newData.date=this.$formatDate(data.createTime);
                        newData.name=data.course.title;
                        newData.type='课程';
                        newData.category=data.course.type;
                        newData.newDate=this.$formatDate(data.updateTime);
                        newData.avatar=data.course.userIconUrl;
                        newData.nickName=data.course.uploadUsername;
                        newData.useTime=this.$formatMinutes(data.learnTime);
                        newData.accessTimes=data.visitTime;
                    }else{
                        newData.date=this.$formatDate(data.createTime);
                        newData.name=data.forum.title;
                        newData.type='文章';
                        newData.category=data.forum.categorys;
                        newData.newDate=this.$formatDate(data.updateTime);
                        newData.avatar=data.forum.userIconUrl;
                        newData.nickName=data.forum.userName;
                        newData.useTime=this.$formatMinutes(data.learnTime);
                        newData.accessTimes=data.visitTime;
                    }
                    tableData.push(newData);
                });
                return tableData;
            }
        },
        components: {
            hightChart:()=>import(/* webpackChunkName: "hightChart.vue" */ './hightChart.vue'),
            infoDetail
        },
        computed:{
            url(){
                return `/user/history/page=${this.page}/size=${this.itemCount}`;
            },
            urlSearch(){
                return `/user/history/page=${this.pageSearch}/size=${this.itemCount}`;
            }
        },
        mixins: [manageMixin],
    }
</script>

<style scoped lang="scss">
    @import "./manageStyle.scss";
</style>

