<template>
    <div class="record">
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
                    style="margin-left: 5px;width:80px;padding: 10px"
                    icon="el-icon-search">
                搜索
            </el-button>
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
                    @click="pushArticle"
                    type="success"
                    style="margin-left: 10px;width:80px;padding: 10px 10px"
                    size="medium">
                文章发布
            </el-button>
        </div>
        <div class="content">
            <el-table
                    v-show="ifTable"
                    @select-all="handleSelectAll"
                    @select="handleSelect"
                    :data="tableData"
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
                    name: 'vue与webpack初步1',
                    type: '课程',
                    category: '金融',
                    status:true,
                    chartData:{
                        accessTimes:'30',
                        likes:'22',
                        collection:'20',
                        question:'11'
                    }
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步2',
                    type: '课程',
                    category: '金融',
                    status:true
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
            ],
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
                //类型选项的值
                selectValue: '学习记录',
                //图表类型切换
                options: [{value: '学习记录'}, {value: '课程详情'}],
                //图表与表格的切换
                ifTable: true,
                //图表的数据
                chartData:[[],[],[]]
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
                this.ifTable = value !== '课程详情';
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
             *文章发布
             */
            pushArticle(){
                this.$router.push({path:'/userCenter/articleManage/articleEdit/#articleManage'});
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
            courseChart:()=>import( './courseChart.vue')
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

