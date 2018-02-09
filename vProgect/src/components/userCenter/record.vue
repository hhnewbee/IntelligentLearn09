<template>
    <div class="record">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-document"> 我的学习</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleBackSearch">学习记录</span></el-breadcrumb-item>
            <el-breadcrumb-item
                    v-if="ifSearch">搜索</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <el-button
                    @click="handleDelectRows"
                    type="primary"
                    icon="el-icon-delete"
                    style="width: 100px;padding: 10px 10px">
                批量删除
            </el-button>
            <el-button
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
                    @change="chartChange"
                    ref="elSelect"
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
                        <img :src="scope.row.avatar" style="width: 35px;height: 35px;border-radius: 50%;margin-right: 10px">
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
                        width="50">
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
                            查看</el-button>
                        <el-button
                                @click="handleDeleteRow(scope.$index)"
                                type="text"
                                style="color: red;"
                                size="small">
                            删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <hightChart v-show="!ifTable"></hightChart>
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
    import hightChart from '../userCenter/hightChart.vue'
    export default {
        created(){
            this.tableData=this.pageData;
        },
        mounted(){

        },
        data() {
            return {
                //要删除的行
                delectRows: [],
                //当前列表要显示的数据
                tableData:[],
                //正常分页时显示的数据,
                pageData: [
                    {
                        date: '2016-05-03',
                        name: 'vue与webpack初步1',
                        type: '课程',
                        category: '金融',
                        newDate: '2016-05-03',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                        useTime:100,

                    }, {
                        date: '2016-05-03',
                        name: 'vue与webpack初步2',
                        type: '课程',
                        category: '金融',
                        newDate: '2017-05-03',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                    }, {
                        date: '2016-05-03',
                        name: 'vue与webpack初步3',
                        type: '课程',
                        category: '金融',
                        newDate: '2017-05-09',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                    }, {
                        date: '2016-05-03',
                        name: 'vue与webpack初步4',
                        type: '课程',
                        category: '金融',
                        newDate: '2018-05-03',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                    },{
                        date: '2016-05-03',
                        name: 'vue与webpack初步5',
                        type: '课程',
                        category: '金融',
                        newDate: '2018-05-03',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                    },{
                        date: '2016-05-03',
                        name: 'vue与webpack初步6',
                        type: '课程',
                        category: '金融',
                        newDate: '2018-05-03',
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickName:'newbee',
                    }
                ],
                //是否删除当前列表的所有数据
                ifSelecttALl:false,
                //显示搜索状态
                ifSearch:false,
                //搜索的字段
                searchInput:'',
                //类型选项的值
                selectValue:'学习记录',
                //图表类型切换
                options:[{value:'学习记录'},{value:'课程详情'}],
                //图表与表格的切换
                ifTable:true,
            }
        },

        methods: {
            /**
             *选择的数据
             * @param selction
             * @param row
             */
            handleSelect(selction, row) {
                this.delectRows.push(row);
            },
            /**
             * 删除选择的数据
             */
            handleDelectRows() {
                //如果全部选择
                if(this.ifSelecttALl){
                    this.tableData=[];
                    return;
                }
                //遍历出相同元素所处的位置并且删除
                for(let i=0;i<this.tableData.length;i++){
                    for(let x=0;x<this.delectRows.length;x++){
                        if(this.delectRows[x]===this.tableData[i]){
                            this.tableData.splice(i,1);
                        }
                    }
                }
            },
            /**
             * 选择所有时
             */
            handleSelectAll(){
                this.ifSelecttALl=true;
            },
            /**
             * 单个删除
             * @param index
             */
            handleDeleteRow(index){
                this.tableData.splice(index,1);
            },
            handleSearch(){
                this.tableData=[{
                    date: '2016-05-03',
                    name: 'vue与webpack初步9',
                    type: '课程',
                    category: '金融',
                    newDate: '2016-05-03',
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步10',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-03',
                }, ];
                this.ifSearch=true;
            },
            //搜索返回
            handleBackSearch(){
                console.log('aaa');
                this.ifSearch=false;
                this.tableData=this.pageData;
            },
            /**
             * 删除所有数据
             */
            handleDelectAlll(){
            },
            /**
             * 分页
             * @param size
             */
            handlePage(size){
                this.tableData=[ {
                    date: '2016-05-03',
                    name: 'vue与webpack初步7',
                    type: '课程',
                    category: '金融',
                    newDate: '2016-05-03',
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步8',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-03',
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步9',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-09',
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步10',
                    type: '课程',
                    category: '金融',
                    newDate: '2018-05-03',
                }];
                console.log(size);
            },
            chartChange(value){
                this.ifTable = value !== '课程详情';
            },
            handleSee(row){
                console.log(row);
            }
        },
        components:{
            hightChart
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

