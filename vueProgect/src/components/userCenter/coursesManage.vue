<template>
    <div class="manageStyle">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">
                    课程管理
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
            <!--上传课程-->
            <el-button
                    @click="handleUpload"
                    type="success"
                    style="margin-left: 10px"
                    size="small">
                上传课程
            </el-button>
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
                        prop="type"
                        label="类型"
                        width="60">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="category"
                        label="类别"
                        width="60">
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
            <courseChart
                    v-if="!ifTable"
                    :chartData="chartData"></courseChart>
        </div>
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
    export default {
        created() {
            this.initData([
                {
                    date: '2016-05-03',
                    name: 'vue与webpack初步1',
                    type: '课程',
                    category: '金融',
                    status: true,
                    chartData: {
                        accessTimes: '30',
                        likes: '22',
                        collection: '20',
                        question: '11'
                    }
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步2',
                    type: '课程',
                    category: '金融',
                    status: true
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步3',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-09',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 90,
                    accessTimes: 10,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步4',
                    type: '课程',
                    category: '金融',
                    newDate: '2018-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 30,
                    accessTimes: 20,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步5',
                    type: '课程',
                    category: '金融',
                    newDate: '2018-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 10,
                    accessTimes: 20,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步6',
                    type: '课程',
                    category: '金融',
                    newDate: '2018-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 40,
                    accessTimes: 20,
                }
            ], [{value: '课程记录'}, {value: '课程详情'}]);
        },
        data() {
            return {
                //要删除的行
                delectRows: [],
                //批量删除按钮是否可用
                ifDelect: true,
                //当前列表要显示的数据
                tableData: [],
                //正常分页时显示的数据,
                pageData: [],
                //是否删除当前列表的所有数据
                ifSelecttALl: false,
                //显示搜索状态
                ifSearch: false,
                //搜索的字段
                searchInput: '',
                //类型选项的值
                selectValue: '学习记录',
                //图表类型切换
                options: [{value: '学习记录'}, {value: '课程详情'}],
                //图表与表格的切换
                ifTable: true,
                //图表的数据
                chartData: [[], [], []],
            }
        },

        methods: {
            /**
             * 上传课程
             */
            handleUpload() {
                this.$router.push({path: '/userCenter/coursesManage/coursesUpload/#coursesManage'});
            }
        },
        components: {
            courseChart: () => import( './courseChart.vue'),
        },
        mixins:[manageMixin]
    }
</script>

<style scoped lang="scss">
    @import './manageStyle.scss';
</style>

