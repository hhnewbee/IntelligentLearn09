<template>
    <div class="record">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-setting">
                &nbsp;后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">
                    账号管理
                </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item
                    v-if="ifSearch">搜索
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <el-button
                    :disabled="ifDelect"
                    @click="handleDelectRows"
                    type="primary"
                    icon="el-icon-delete"
                    style="width: 100px;padding: 10px 10px">
                批量删除
            </el-button>
            <el-button
                    @click="handleDelectAll"
                    type="danger"
                    icon="el-icon-delete"
                    style="width: 100px;padding: 10px 10px">
                全部删除
            </el-button>
            <input
                    class="searchInput"
                    v-model="searchInput"
                    placeholder="请输入内容"/>
            <el-button
                    @click="handleSearch"
                    type="primary"
                    size="medium"
                    style="margin-left: 5px;width:80px;padding: 10px 10px"
                    icon="el-icon-search">
                搜索
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

            <el-button
                    type="success"
                    style="margin-left: 10px;width: 80px;padding: 10px 10px"
                    size="medium">
                添加用户
            </el-button>

            <el-button
                    type="success"
                    style="margin-left: 10px;width: 90px;padding: 10px 10px"
                    size="medium">
                添加管理员
            </el-button>
        </div>
        <div class="content">
            <el-table
                    v-show="ifTable"
                    @select-all="handleSelectAll"
                    @select="handleSelect"
                    :data="tableData"
                    max-height="100%"
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
                        label="开通时间"
                        width="100">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="account"
                        label="账号"
                        width="130">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="name"
                        label="姓名"
                        min-width="150">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="sex"
                        label="性别"
                        width="60">
                </el-table-column>

                <el-table-column
                        align='center'
                        label="职位"
                        width="150">
                    <div
                            slot-scope="scope"
                            style="display: flex;align-items: center;justify-content: center">
                        <div
                                style="margin-right: 3px"
                                :ref="scope.row.account">
                            {{scope.row.position}}
                        </div>
                        <el-button
                                :ref="scope.row.account+'button'"
                                @click="handlSetPosition(scope)"
                                type="text"
                                size="small">
                            修改
                        </el-button>
                    </div>
                </el-table-column>

                <el-table-column
                        align='center'
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
                :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        created() {
            //todo 初始化时ajax请求数据
//            this.$ajax.get('').then((response)=>{
//                this.pageData=response.data;
//            });
            //todo 模拟初始化请求数据
            this.pageData= [
                {
                    date: '2016-05-03',
                    account:'154091333',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:true,
                    accessTimes:40,
                    useTime:200,
                },  {
                    date: '2016-05-03',
                    account:'154091334',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:true,
                    accessTimes:30,
                    useTime:150,
                },  {
                    date: '2016-05-03',
                    account:'154091335',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:true,
                    accessTimes:20,
                    useTime:120,
                },  {
                    date: '2016-05-03',
                    account:'154091336',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:true,
                    accessTimes:20,
                    useTime:101,
                },  {
                    date: '2016-05-03',
                    account:'154091337',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:false,
                    accessTimes:10,
                    useTime:101,
                },  {
                    date: '2016-05-03',
                    account:'154091338',
                    name: 'newbee',
                    sex: '男',
                    position: 'CEO',
                    status:true,
                    accessTimes:90,
                    useTime:181,
                }
            ];
                //初始化时的表格数据
                this.tableData = this.pageData;
        },
        data() {
            return {
                //要删除的行
                delectRows: [],
                //批量删除按钮是否可用
                ifDelect:true,
                //当前列表要显示的数据
                tableData: [],
                //正常分页时显示的数据,
                pageData:[],
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
                userSelectV:'普通用户',
                //图表类型切换
                userTypes: [{value:'管理员'}, {value:'普通用户'}],
                //用户类型切花
                ifManager:false,
                //图表的数据
                chartData:[[],[],[]],
            }
        },

        methods: {
            /**
             *选择的数据
             * @param selction
             * @param row
             */
            handleSelect(selction, row) {
                //把要删除的数据进行集合
                this.delectRows=selction;
            },
            /**
             * 删除选择的数据
             */
            handleDelectRows() {
                //如果全部选择
                if (this.ifSelecttALl) {
                    this.tableData = [];
                    //删除按钮不可用
                    this.ifDelect=true;
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
                this.delectRows=[];
            },
            /**
             * 选择所有时
             */
            handleSelectAll() {
                this.ifDelect=!this.ifDelect;
                this.ifSelecttALl = true;
            },
            /**
             * 单个删除
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
                this.tableData=this.pageData;
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
                this.tableData = [ {
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
             * @param datas
             */
            setChartData(){
                //清空之前的数据
                this.chartData=[[],[],[]];
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
            handleUserTypeChange(value){
                this.ifManager=value==='管理员';
            },
            /**
             * 编辑职位
             * @param scope
             */
            handlSetPosition(scope){
                //获取职位和按钮的dom
                let editor=this.$refs[scope.row.account];
                let button=this.$refs[scope.row.account+'button'];
                let tar=button.$el.innerText;
                //判断是否是确定按钮
                if(tar==='确定'){
                    //职位变成不可编辑状态
                    editor.contentEditable=false;
                    button.$el.innerText='修改';
                }else{
                    //职位变成可编辑状态
                    editor.contentEditable=true;
                    //自动获取焦点
                    editor.focus();
                    //编辑按钮变成确定
                    button.$el.innerText='确定';
                }
            }
        },
        watch:{
            //监听数据变化以更新视图
            tableData(){
                //更新图表
                this.setChartData();
            },
            //监听是否有删除的数据以显示删除按钮
            delectRows(){
                this.ifDelect = this.delectRows.length === 0;
            }
        },
        components: {
            hightChart:()=>import( './hightChart.vue')
        }
    }
</script>

<style scoped lang="scss">
    .record {
        display: flex;
        flex-direction: column;
        .header {
            display: flex;
            align-items: center;
            padding-left: 40px;
            padding-right: 40px;
            margin-top: 20px;
            position: relative;
            .searchInput {
                height: 36px;
                width: 200px;
                padding: 10px;
                border-radius: 5px;
                margin-left: 20px;
                border: 1px solid #e0e2e8;
                outline: none;
            }
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

