<template>
    <div class="headerControl">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;{{tableOptions.title1}}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">
                    {{tableOptions.title2}}
                </span>
            </el-breadcrumb-item>
            <!--todo 添加的标题-->
            <el-breadcrumb-item
                    v-if="ifSearch">搜索
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <el-input
                    style="width: 300px;"
                    size="small"
                    v-model="searchInput"
                    placeholder="请输入内容">
                <span slot="suffix"
                      @click="handleSearch"
                      class="el-icon-search searchIcon"></span>
            </el-input>

            <!--todo 添加的功能-->
            <el-button
                    v-if="tableOptions.tableType==='usersManage'"
                    type="success"
                    style="margin-left: 10px"
                    size="small">
                添加管理员
            </el-button>

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
            <!--图标类型切换-->
            <el-select
                    @change="handleChartChange"
                    style="width: 110px;position: absolute;right: 40px"
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
            <!--<usersManage :ifTable='ifTable'-->
                         <!--:tableOptions.sync='tableOptions'-->
                         <!--:tableData.sync='tableData'-->
                         <!--@rowSee="handleSee"-->
                         <!--@rowDelete="handleDeleteRow"-->
                         <!--@selectBatch="handleSelectBatch"-->
                         <!--@selectAll="handleSelectAll">-->
            <!--</usersManage>-->
            <router-view :ifTable='ifTable'
                         :tableOptions.sync='tableOptions'
                         :tableData.sync='tableData'
                         @rowSee="handleSee"
                         @rowDelete="handleDeleteRow"
                         @selectBatch="handleSelectBatch"
                         @selectAll="handleSelectAll">
            </router-view>
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
    </div>
</template>

<script>
    import usersManage from './usersManage.vue';

    export default {
        created() {
            this.initData();
        },
        mounted() {

        },
        props: ['routerPath'],
        data() {
            return {
                //表格的配置
                tableOptions: {},
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
                //图表类型选项的值
                selectValue: '学习记录',
                //图表类型切换
                options: [{value: '学习记录'}, {value: '学习详情'}],
                //图表与表格的切换
                ifTable: true,
                //用户类型选项值
                userSelectV: '普通用户',
                //图表类型切换
                userTypes: [{value: '管理员'}, {value: '普通用户'}],
                //用户类型切花
                ifManager: false,
                //图表的数据
                chartData: [[], [], []],
                //显示更多功能
                ifMoreFun: false,
                //标题数组
                titleArray: [],
                //按钮数组
                buttonArray: [],
            }
        },
        methods: {
            /**
             *批量选择
             * @param selction
             */
            handleSelectBatch(selction) {
                //把要删除的数据进行集合
                this.delectRows = selction;
            },
            /**
             * 删除选择的数据
             */
            handleDelectRows() {
                //如果全部选择
                if (this.ifSelecttALl) {
                    //清空数据
                    this.tableData = [];
                    //删除按钮禁用
                    this.ifDelect = true;
                    return;
                }
                //遍历出相同元素所处的位置并且删除
                for (let i = 0; i < this.tableData.length; i++) {
                    for (let x = 0; x < this.delectRows.length; x++) {
                        if (this.delectRows[x] === this.tableData[i]) {
                            this.tableData.splice(i, 1);
                        }
                    }
                }
                //清空数据防止重复遍历
                this.delectRows = [];
            },
            /**
             * 选择所有时
             */
            handleSelectAll() {
                this.ifDelect = !this.ifDelect;
                this.ifSelecttALl = true;
            },
            /**
             * 单行删除
             * @param index
             */
            handleDeleteRow(index) {
                this.tableData.splice(index, 1);
            },
            /**
             * 删除所有数据
             */
            handleDelectAll() {
            },
            /**
             * 分页
             * @param size
             */
            handlePage(size) {
                this.pageData = [{
                    date: '2016-05-03',
                    name: 'vue与webpack初步7',
                    type: '课程',
                    category: '金融',
                    newDate: '2016-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 100,
                    accessTimes: 30,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步8',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 130,
                    accessTimes: 20,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步9',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-09',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 90,
                    accessTimes: 10,
                }];
                //先存入分页数据然后在赋予当前所展示的数据
                this.tableData = this.pageData;
            },
            /**
             * 判断是展示图表还是表格
             * @param value
             */
            handleChartChange(value) {
                this.ifTable = value !== '学习详情';
            },
            /**
             * 搜索数据
             */
            handleSearch() {
                this.tableData = [{
                    date: '2016-05-03',
                    name: 'vue与webpack初步1',
                    type: '课程',
                    category: '金融',
                    newDate: '2016-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 100,
                    accessTimes: 30,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步2',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-03',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    useTime: 130,
                    accessTimes: 20,
                },];
                //展示搜索的数据
                this.ifSearch = true;
            },
            /**
             * 搜索返回
             */
            handleBackSearch() {
                this.ifSearch = false;
                this.tableData = this.pageData;
            },
            /**
             * 查看记录
             * @param row
             */
            handleSee(row) {
                console.log(row);
            },
            /**
             * 设置图表数据
             */
            setChartData() {
                //清空之前的数据
                this.chartData = [[], [], []];
                this.tableData.forEach((data) => {
                    this.chartData[0].push(data.name);
                    this.chartData[1].push(data.useTime);
                    this.chartData[2].push(data.accessTimes);
                })
            },
            /**
             * 用户类型切换
             * @param value
             */
            handleUserTypeChange(value) {
                this.ifManager = value === '管理员';
            },
            /**
             * 编辑职位
             * @param scope
             */
            handlSetPosition(scope) {
                //获取职位和按钮的dom
                let editor = this.$refs[scope.row.account];
                let button = this.$refs[scope.row.account + 'button'];
                let tar = button.$el.innerText;
                //判断是否是确定按钮
                if (tar === '确定') {
                    //职位变成不可编辑状态
                    editor.contentEditable = false;
                    button.$el.innerText = '修改';
                } else {
                    //职位变成可编辑状态
                    editor.contentEditable = true;
                    //自动获取焦点
                    editor.focus();
                    //编辑按钮变成确定
                    button.$el.innerText = '确定';
                }
            },
            /**
             * 显示更多功能
             */
            handleShowMore() {
                this.ifMoreFun = !this.ifMoreFun;
            },
            /**
             * 数据初始化
             */
            initData() {
                this.pageData = this.tableData;
            },
        },
        watch: {
            //监听数据变化以更新视图
            tableData() {
                //更新图表
                this.setChartData();
            },
            //监听是否有删除的数据以显示删除按钮
            delectRows() {
                this.ifDelect = this.delectRows.length === 0;
            },
            //监听路由变化
            routerPath() {
                this.$router.push(this.routerPath);
            }
        },
        components: {
            hightChart: () => import( './hightChart.vue'),
            usersManage
        }
    }
</script>

<style scoped lang="scss">
    $primaryColor: #409EFF;
    .headerControl {
        display: flex;
        flex-direction: column;
        .header {
            display: flex;
            align-items: center;
            padding: 0 40px;
            margin-top: 20px;
            position: relative;
            .searchIcon {
                margin-right: 5px;
                line-height: 32px;
                cursor: pointer;
                &:hover {
                    color: $primaryColor;
                }
            }
        }
        .moreFun {
            padding: 0 40px;
            margin-top: 10px;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 40px;
        }
    }
</style>

