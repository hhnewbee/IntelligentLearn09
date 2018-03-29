<template>
    <div class="manageStyle">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">
                    用户管理
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

            <!--添加用户-->
            <el-button type="success"
                       style="margin-left: 10px"
                       size="small">
                添加管理员
            </el-button>

            <!--更多功能-->
            <el-button type="primary"
                       size="small"
                       @click="handleShowMore"
                       style="margin-left: 10px"
                       icon="el-icon-menu">
            </el-button>

            <!--用户类型切换-->
            <el-select
                    @change="handleUserTypeChange"
                    style="width: 110px;position: absolute;right: 160px"
                    v-model="userSelectV"
                    size="small"
                    placeholder="请选择">
                <el-option
                        v-for="item in userTypes"
                        :key="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

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
            <el-button
                    type="success"
                    style="margin-left: 10px"
                    size="small">
                全局信息
            </el-button>
            <el-button
                    type="success"
                    style="margin-left: 10px"
                    size="small">
                批量信息
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
                <el-table-column fixed
                                 align='center'
                                 type="selection"
                                 width="45">
                </el-table-column>

                <el-table-column prop="date"
                                 align='center'
                                 label="开通时间"
                                 width="100">
                </el-table-column>

                <el-table-column prop="account"
                                 align='center'
                                 label="账号"
                                 min-width="200">
                </el-table-column>

                <el-table-column prop="name"
                                 align='center'
                                 label="姓名"
                                 width="200">
                </el-table-column>

                <el-table-column prop="areaFocus"
                                 align='center'
                                 label="专注领域"
                                 width="130">
                </el-table-column>

                <el-table-column align='center'
                                 label="用户状态"
                                 width="150">
                    <div slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status"
                                active-text="开通"
                                inactive-text="关闭"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>

                    </div>
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
            <hightChart
                    v-if="!ifTable"
                    :chartData="chartData"></hightChart>
        </div>

        <el-pagination
                style="align-self: center"
                @current-change="handlePage"
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>

        <!--查看用户时的弹出框-->
        <el-dialog :visible.sync="dialogUserVisible">
        </el-dialog>
    </div>
</template>

<script>
    import {manageMixin} from './manageMixin.js';

    export default {
        mounted() {
            this.initData(
                [
                    {
                        date: '2016-05-03',
                        account: '154091333',
                        name: 'newbee',
                        areaFocus: '金融',
                        status: true,
                        accessTimes: 40,
                        useTime: 200,
                    },
                ],
                [{value: '学习记录'}, {value: '学习详情'}]
            );
        },
        data() {
            return {
                //用户类型选项值
                userSelectV: '普通用户',
                //查看用户弹出框
                dialogUserVisible:false
            }
        },
        computed:{
            url(){
                return `/admin/users/page=${this.page}/size=${this.itemCount}`;
            },
            urlSearch(){
                return `/admin/users/page=${this.pageSearch}/size=${this.itemCount}`;
            }
        },
        methods: {
            /**
             * 用户类型切换
             * @param value
             */
            handleUserTypeChange(value) {
                //todo 根据不同的类型取查找不同的数据
                //this.tableData=this.pageData=this.$ajax.get();
            },
            /**
             * 设置获取数据的格式
             */
            setDataFormat(resDatas){
                let tableData=[];
                resDatas.history.forEach((data)=>{
                    let newData={};
                        newData.date=this.$formatDate(data.createTime);
                        newData.account=data.course.title;
                        newData.name='课程';
                        newData.areaFocus=data.course.type;
                        newData.useTime=this.$formatMinutes(data.learnTime);
                        newData.accessTimes=data.visitTime;
                        tableData.push(newData);
                });
                return tableData;
            }
        },
        mixins: [manageMixin],
        components: {
            hightChart: () => import(/* webpackChunkName: "hightChart.vue" */ './hightChart.vue')
        }
    }
</script>

<style scoped lang="scss">
    @import "./manageStyle.scss";
</style>

