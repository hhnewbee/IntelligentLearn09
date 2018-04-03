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
                        :key="item.value"
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
            <el-dialog :visible.sync="dialogPushInfo">
                <div style="display: flex;flex-direction: column">
                    <div style="align-self: flex-start;font-size: 14px;color: #8a8a8a;margin-bottom: 10px">{{typePushInfo}}</div>
                    <el-input type="textarea" resize="none" :rows="10" v-model="infoPush"></el-input>
                    <el-button type="primary"
                               :disabled="infoPush===''"
                               style="align-self: flex-end;margin-top: 10px">发布</el-button>
                </div>
            </el-dialog>
            <el-button
                    @click="handlePushInfoAll"
                    type="success"
                    style="margin-left: 10px"
                    size="small">
                全局信息
            </el-button>
            <el-button
                    @click="handlePushInfoBranch"
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
                                 width="100">
                </el-table-column>

                <el-table-column prop="areaFocus"
                                 align='center'
                                 label="专注领域"
                                 width="230">
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
                                @click="handleSee('user',scope)"
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
                    :chartData="chartData">
            </hightChart>
        </div>

        <el-pagination
                style="align-self: center"
                @current-change="handlePage"
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :total="tableMainPage">
        </el-pagination>

        <!--查看用户时的弹出框-->
        <el-dialog :visible.sync="dialogUserVisible">
            <div class="userInfo">
                <div class="item item1">
                    <div>
                        <img :src="infoData.avatarUrl">
                    </div>
                    <div style="margin: 0 15px">
                        <div style="margin-bottom: 3px">账号：
                            <span>{{infoData.account}}</span>
                        </div>
                        <div>专注领域：{{infoData.areaFocus}}</div>
                    </div>
                    <div class="learnInfo">
                        <div>学习时长：<span>48h</span></div>
                        <div>访问次数：<span>48次</span></div>
                    </div>
                </div>
                <div class="item">
                    <div class="item2">姓名：
                        <span ref="name" style="padding: 5px">{{infoData.name}}</span>
                    </div>
                    <div class="item2">邮箱：
                        <span ref="eMail" style="padding: 5px">{{infoData.eMail}}</span>
                    </div>
                </div>
                <div>
                    <div style="display: flex;justify-content: flex-end;">
                        <!--图表啦类型切换-->
                        <el-select
                                @change="handleTypeChange"
                                style="width: 110px;margin-right: 10px"
                                v-model="typeSelect"
                                size="small"
                                placeholder="请选择">
                            <el-option
                                    v-for="item in ['表格','图表']"
                                    :key="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <!--时间切换-->
                        <el-select
                                @change="handleTimeChange"
                                style="width: 110px;"
                                v-model="timeSelect"
                                size="small"
                                placeholder="请选择">
                            <el-option
                                    v-for="item in ['最近一周','最近一月','最近一年']"
                                    :key="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <!--表格和图表-->
                    <div style="display: flex;flex-direction: column;align-items: center">
                        <el-table
                                ref="table"
                                v-show="ifDialogTable"
                                @select-all="handleSelectAll"
                                @select="handleSelectBatch"
                                :data="tableData_"
                                height="400"
                                border>
                            <el-table-column prop="date"
                                             align='center'
                                             label="学习时间"
                                             width="100">
                            </el-table-column>

                            <el-table-column prop="name"
                                             align='center'
                                             label="名称"
                                             min-width="200">
                            </el-table-column>

                            <el-table-column prop="type"
                                             align='center'
                                             label="类别"
                                             width="230">
                            </el-table-column>

                            <el-table-column prop="time"
                                             align='center'
                                             label="学习时间"
                                             width="150">
                            </el-table-column>

                            <el-table-column prop="times"
                                             align='center'
                                             label="访问次数"
                                             width="150">
                            </el-table-column>

                            <el-table-column label="操作"
                                             align='center'
                                             fixed="right"
                                             width="110">
                                <template slot-scope="scope">
                                    <el-button
                                            @click="handleSee('user',scope)"
                                            type="text"
                                            size="small">
                                        查看
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <hightChart
                                style="padding: 0;"
                                v-if="!ifDialogTable"
                                :chartData="chatData_">
                        </hightChart>
                        <el-pagination
                                v-if="ifDialogTable"
                                style="align-self: center"
                                @current-change="handleDialogPage"
                                background
                                layout="prev, pager, next"
                                :total="listNow.page">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {manageMixin} from './manageMixin.js';
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

    export default {
        mounted() {
            this.initData([{value: '学习记录'}, {value: '学习详情'}]);
        },
        data() {
            return {
                //主页面的页数
                tableMainPage: 1,
                //图表类型切换
                userTypes: [{value: '管理员'}, {value: '普通用户'}],
                //用户类型选项值
                userSelectV: '普通用户',
                //查看用户弹出框
                dialogUserVisible: false,
                //弹出框的图表类型选择
                typeSelect: '图表',
                //弹出框的图表时间选择
                timeSelect: '最近一周',
                //dialog表格还是图表
                ifDialogTable: false,
                //dialog分页
                dialogPage: '',
                //详细信息
                infoData: {},
                //表格数据
                tableData_: [],
                //图表数据
                chatData_: [],
                //是否要发布信息
                dialogPushInfo: false,
                //要发布的信息类型
                typePushInfo: '',
                //要发布的信息
                infoPush:''
            }
        },
        computed: {
            url() {
                return `/admin/users/page=${this.page - 1}/size=${this.itemCount}`;
            },
            urlSearch() {
                return `/admin/users/page=${this.pageSearch - 1}/size=${this.itemCount}`;
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
            setDataFormat(resDatas) {
                let tableData = [];
                resDatas.forEach((data) => {
                    let newData = {};
                    newData.id = data.id;
                    newData.date = this.$formatDate(data.creationTimestamp);
                    newData.account = data.account;
                    newData.name = data.selfInformation.trueName;
                    newData.areaFocus = data.selfInformation.position;
                    newData.status = true;
                    //查看更多才显示的
                    newData.eMail = data.selfInformation.email;
                    newData.avatarUrl = data.selfInformation.imgPath;
                    newData.useTime = Math.ceil(this.$formatMinutes(data.learnTime));
                    newData.accessTimes = data.visitTime;
                    tableData.push(newData);
                });
                return tableData;
            },
            /**
             * 切换弹出框表格类型
             */
            handleTypeChange(value) {
                //todo 格式化不同类型的数据
                if (this.ifDialogTable = value === '表格') {
                    this.handleChangeArea('dialogTable' + this.infoData.id, `/user/history/page=0/size=6`);
                } else {
                    this.handleChangeArea('dialogChat最近一周' + this.infoData.id, `admin/user/${this.infoData.id}/week`);
                }
            },
            /**
             * 切换弹出框表格时间
             */
            handleTimeChange(value) {
                //todo 请求不同时间的数据
                this.handleChangeArea('dialog' + value + this.dialogPage, `admin/user/${this.infoData.id}/week`);
            },
            /**
             * 格式化表格数据
             */
            setTableData(datas) {
                datas.history.forEach((data) => {
                    this.tableData_.push({
                        date: this.$formatDate(data.createTime),
                        name: data.course.title,
                        type: data.course.type,
                        time: this.$formatMinutes(data.learnTime) + '分钟',
                        times: data.visitTime
                    })
                });
            },
            /**
             * 格式化图表数据
             */
            setChatData(datas) {
                //清空原来的数据
                this.chatData_ = [];
                //数据格式化
                let i = 0;
                let time = [];
                if (this.timeSelect === '最近一周') {
                    for (i = 6; i >= 0; i--) {
                        time.push(this.$moment().day(-i).fromNow());
                    }
                } else if (this.timeSelect === '最近一月') {
                    for (i = 29; i >= 0; i--) {
                        time.push(this.$moment().day(-i).fromNow());
                    }
                } else {
                    for (i = 11; i >= 0; i--) {
                        time.push(this.$moment().month(-i).fromNow());
                    }
                }
                this.chatData_.push(time);
                this.chatData_.push(
                    datas.learnTime.reverse().map((item) => {
                        return this.$formatMinutes(item);
                    }));
                this.chatData_.push(datas.visitTime.reverse());
            },
            /**
             * 弹出框分页
             */
            handleDialogPage(page) {
                this.dialogPage = page;
                this.handleChangeArea('dialog' + this.timeSelect + this.dialogPage, `${this.infoData.account + page}`);
            },
            /**
             * 发布全局信息
             */
            handlePushInfoAll() {
                this.dialogPushInfo = true;
                this.typePushInfo = '全部信息';
            },
            /**
             * 发布部分信息
             */
            handlePushInfoBranch(){
                this.dialogPushInfo = true;
                this.typePushInfo = '部分信息';
            }
        },

        watch: {
            //监听加载的数据变化
            listNow() {
                //如果是搜索的缓存数据
                if (this.ifSearch) {
                    this.tableData = this.setDataFormat(this.listNow.users);
                    this.tableMainPage = this.listNow.page;
                    //如果是弹出框的缓存数据
                } else if (this.dialogUserVisible) {
                    if (this.typeSelect === '表格') {
                        this.setTableData(this.listNow);
                    } else {
                        this.setChatData(this.listNow);
                    }
                }
                //如果主页的缓存数据
                else {
                    this.pageData = this.tableData = this.setDataFormat(this.listNow.users);
                    this.tableMainPage = this.listNow.page;
                }
            },
        },
        components: {
            ElInput,
            ElButton,
            hightChart: () => import(/* webpackChunkName: "hightChart.vue" */ './hightChart.vue')
        },
        mixins: [manageMixin]
    }
</script>

<style scoped lang="scss">
    @import "./manageStyle.scss";
    .userInfo {
        .item {
            padding: 8px;
            border-bottom: 1px solid #f8f4f4;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .item2 {
                margin: 8px;
                font-size: 13px;
                font-weight: bold;
            }
            .learnInfo {
                position: absolute;
                font-size: 14px;
                right: 20px;
                div:nth-child(1) {
                    margin-bottom: 5px;
                }
            }
        }
        .item:nth-child(2) {
            border-bottom: none;
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 15px;
            font-weight: bold;
        }
    }
</style>

