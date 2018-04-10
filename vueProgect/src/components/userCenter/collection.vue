<template>
    <div class="manageStyle">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-star-off">
                <span @click="handleBackSearch"> 我的收藏</span>
            </el-breadcrumb-item>
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
            <!--更多功能-->
            <el-button type="primary"
                       size="small"
                       @click="handleShowMore"
                       style="margin-left: 10px"
                       icon="el-icon-menu">
            </el-button>
            <!--图表类型切换-->
            <el-select
                    @change="handleChartChange"
                    style="width: 110px;position: absolute;right: 40px"
                    v-model="selectValue"
                    size="small">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
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
        <div class="content">
            <el-table
                    ref="table"
                    v-show="ifTable"
                    @select-all="handleSelectAll"
                    @select="handleSelectBatch"
                    :data="tableData"
                    height="100%"
                    border>
                <el-table-column
                        fixed
                        align='center'
                        type="selection"
                        width="45">
                </el-table-column>
                <el-table-column
                        align='center'
                        prop="date"
                        label="日期"
                        width="100">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="name"
                        label="名称"
                        min-width="120">
                </el-table-column>

                <el-table-column
                        align='center'
                        label="上传传者"
                        :show-overflow-tooltip="true"
                        width="160">
                    <div slot-scope="scope" style="display: flex;justify-content: center;align-items: center">
                        <img :src="scope.row.avatar"
                             style="width: 35px;height: 35px;border-radius: 50%;margin-right: 10px">
                        <span>{{scope.row.nickName}}</span>
                    </div>
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="type"
                        label="类型"
                        width="50">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="category"
                        label="类别"
                        width="150">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="newDate"
                        label="最近访问"
                        width="100">
                </el-table-column>

                <el-table-column
                        align='center'
                        fixed="right"
                        label="操作"
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
            <hightChart
                    v-if="!ifTable"
                    :chartData="chartData"></hightChart>
        </div>
        <el-pagination
                style="align-self: center"
                @current-change="handlePage"
                background
                layout="prev, pager, next"
                :page-size="1"
                :total="listNow.pages">
        </el-pagination>
    </div>
</template>

<script>
    import {manageMixin} from './manageMixin';
    export default {
        mounted() {
            //todo 模拟初始化请求数据
            this.initData([{value: '收藏记录'}, {value: '学习详情'}]);
        },
        methods:{
            /**
             * 设置获取数据的格式
             */
            setDataFormat(resDatas) {
                return resDatas.lists.map((resData)=>{
                        let collection={};
                        collection.date=this.$formatDate(resData.createTime);
                        collection.newDate=this.$formatDate(resData.updateTime);
                        collection.useTime=Math.ceil(this.$formatMinutes(resData.learnTime));
                        collection.accessTimes=resData.visitTime;
                    if(resData.course){
                        collection.type='课程';
                        collection.name=resData.course.title;
                        collection.category=resData.course.type;
                        collection.avatar=resData.course.userIconUrl;
                        collection.nickName=resData.course.uploadUsername;
                    }else{
                        collection.type='文章';
                        collection.name=resData.forum.title;
                        collection.category=resData.forum.type;
                        collection.avatar=resData.forum.userIconUrl;
                        collection.nickName=resData.forum.uploadUsername;
                    }
                    return collection;
                });
            }
        },
        computed: {
            url() {
                return `user/course/collections/page=${this.page - 1}/size=${this.itemCount}`;
            },
            urlSearch() {
                return `user/course/collections/page=${this.pageSearch - 1}/size=${this.itemCount}`;
            }
        },
        components: {
            hightChart:()=>import(/* webpackChunkName: "hightChart.vue" */ './hightChart.vue')
        },
        watch:{
            listNow() {
                if (this.ifSearch) {
                    this.tableData = this.setDataFormat(this.listNow);
                } else {
                    this.pageData = this.tableData = this.setDataFormat(this.listNow);
                }
            }
        },
        mixins:[manageMixin]
    }
</script>

<style scoped lang="scss">
    @import './manageStyle.scss';
</style>

