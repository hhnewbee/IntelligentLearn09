<template>
    <div class="info">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item
                    class="el-icon-message">
                <span @click="handleBackSubTitle">&nbsp;我的信息</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item
                    v-if="ifSubTitle">{{subTitle}}
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
                    @change="handleTypeChange"
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
        <div class="content">
            <el-table
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
                        label="时间"
                        width="100">
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="position"
                        label="位置"
                        :show-overflow-tooltip="true"
                        width="190">
                </el-table-column>

                <el-table-column
                        align='left'
                        label="类型"
                        header-align="center"
                        width="220">
                    <div
                            slot-scope="scope"
                            style="display: flex;align-items: center">
                        <span>{{scope.row.type1}}&nbsp</span>
                        <img
                                :src="scope.row.avatar"
                                style="width: 20px;height: 20px;border-radius: 50%;">
                        <span>&nbsp<span style="color:#00abf9;">
                            {{scope.row.nickName}}</span>&nbsp{{scope.row.type2}}
                        </span>
                    </div>
                </el-table-column>

                <el-table-column
                        align='center'
                        prop="content"
                        label="内容"
                        :show-overflow-tooltip="true"
                        min-width="120">
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
                    position: 'vue与webpack初步1',
                    type1: '我回答了',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee',
                    type2: '的问题',
                    content:'通常情况下，我们用空格键来打出多个空格，而在编写代码时，通过空格键、Tab键以及回车键打出的空格，都会被HTML（超文本标记语言）自动忽略。HTML将这样的键视为空白字符，并显示为单个空白间隔。尽管CSS提供了多种样式的空格和缩进，但是在HTML中也有一些工具可以让你自己定义空格。'

                }, {
                    date: '2017-05-03',
                    position: 'vue与webpack初步2',
                    type1: '我向',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee1',
                    type2: '提问',
                    content:'插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2018-05-03',
                    position: 'vue与webpack初步3',
                    type1: '',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee2',
                    type2: '回答了我的问题',
                    content:'插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-05-03',
                    position: 'vue与webpack初步4',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee3',
                    type1: '',
                    type2: '向我提问',
                    content:'插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-09-03',
                    position: 'vue与webpack初步5',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: '系统信息',
                    content:'插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-09-03',
                    position: 'vue与webpack初步6',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: '通知信息',
                    content:'插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
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
                ifSubTitle: false,
                //搜索的字段
                searchInput: '',
                //类型选项的值
                selectValue: '所有信息',
                //图表类型切换
                options: [
                    {value: '所有信息'},
                    {value: '我的问题'},
                    {value: '我的回答'},
                    {value: '我的解答'},
                    {value: '向我提问'},
                    {value: '给我点赞'},
                    {value: '系统信息'},
                    {value: '通知信息'}
                ],
                //副标题
                subTitle:''
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
                this.subTitle='搜索';
                this.ifSubTitle = true;
            },
            /**
             * 搜索返回
             */
            handleBackSubTitle() {
                this.ifSubTitle = false;
                this.tableData = this.pageData;
            },
            /**
             * 查看记录
             * @param row
             */
            handleSee(row) {
                console.log(row);
            },
            handleTypeChange(value){
                switch (value){
                    case '所有信息':{
                        this.tableData = this.pageData;
                        break;
                    }
                    case '我的问题':{
                        this.tableData =[];
                        this.subTitle='我的问题';
                        break;
                    }
                }
                //标签的转换
                this.ifSubTitle = value !== '所有信息';
            }
        },
        watch:{
            /**
             * 监听是否有删除的数据以显示删除按钮
             */
            delectRows(){
                this.ifDelect = this.delectRows.length === 0;
            }
        },
    }
</script>

<style scoped lang="scss">
    .info {
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

