<template>
    <div class="manageStyle">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">
                    文章管理
                </span>
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

            <!--文章发布-->
            <el-button
                    @click="pushArticle"
                    type="success"
                    style="margin-left: 10px;"
                    size="small">
                文章发布
            </el-button>

            <!--更多功能-->
            <el-button type="primary"
                       size="small"
                       @click="handleShowMore"
                       style="margin-left: 10px"
                       icon="el-icon-menu">
            </el-button>

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
                        label="上传时间"
                        width="150">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="name"
                        label="名称"
                        min-width="120">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="category"
                        label="类别"
                        width="180">
                </el-table-column>

                <el-table-column
                        align='center'
                        label="课程状态"
                        width="200">
                    <div slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status"
                                active-text="可以观看"
                                inactive-text="不可观看"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>

                    </div>
                </el-table-column>

                <el-table-column
                        align='center'
                        fixed="right"
                        label="操作"
                        width="110">
                    <template slot-scope="scope">
                        <el-button
                                @click="handleSee('article',scope)"
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
            <courseChart
                    v-if="!ifTable"
                    :chartData="chartData"></courseChart>
        </div>
        <el-pagination
                style="align-self: center"
                @current-change="handlePage"
                background
                layout="prev, pager, next"
                :page-size="1"
                :total="listNow.page">
        </el-pagination>
    </div>
</template>

<script>
    import {manageMixin} from './manageMixin';
    export default {
        mounted() {
            //todo 模拟初始化请求数据
            this.initData([{value: '文章记录'}, {value: '文章详情'}]);
        },
        methods: {
            /**
             *文章发布
             */
            pushArticle(){
                this.$router.push({path:'/userCenter/articlesManage/articleEdit/#articlesManage'});
            },
            /**
             * 设置图表数据
             */
            setChartData() {
                //清空之前的数据
                this.chartData = [[],[],[],[],[]];
                this.tableData.forEach((data) => {
                    this.chartData[0].push(data.name);
                    this.chartData[1].push(data.accessTimes);
                    this.chartData[2].push(data.likes);
                    this.chartData[3].push(data.collection);
                    this.chartData[4].push(data.question);
                })
            },
            /**
             * 设置获取数据的格式
             */
            setDataFormat(resDatas) {
                return resDatas.forums.map((resdata)=>{
                    return {
                        id:resdata.id,
                        date:this.$formatDate(resdata.creationTimestamp),
                        name:resdata.title,
                        status:true,
                        category:resdata.categorys,

                        accessTimes: resdata.visitTime,
                        likes: resdata.liking,
                        collection: resdata.collections,
                        question: resdata.questions
                    }
                });
            },
        },
        components: {
            courseChart:()=>import(/* webpackChunkName: "courseChart.vue" */ './courseChart.vue')
        },
        computed:{
            url(){
                return `admin/forums/page=${this.page-1}/size=${this.itemCount}`;
            },
            urlSearch(){
                return `admin/forums/page=${this.pageSearch-1}/size=${this.itemCount}`;
            }
        },
        watch:{
            //监听加载的数据变化
            listNow(){
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


