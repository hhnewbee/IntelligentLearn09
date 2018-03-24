<template>
    <div class="manageStyle">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-message">&nbsp;我的信息
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span @click="handleBackSearch">{{subTitle}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="ifSearch">搜索
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
            <!--信息类型切换-->
            <el-select
                    @change="handleTypeChange"
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
    import {manageMixin} from './manageMixin.js';

    export default {
        created() {
            //todo 模拟初始化请求数据
            this.initData([
                {
                    date: '2016-05-03',
                    position: 'vue与webpack初步1',
                    type1: '我回答了',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee',
                    type2: '的问题',
                    content: '通常情况下，我们用空格键来打出多个空格，而在编写代码时，通过空格键、Tab键以及回车键打出的空格，都会被HTML（超文本标记语言）自动忽略。HTML将这样的键视为空白字符，并显示为单个空白间隔。尽管CSS提供了多种样式的空格和缩进，但是在HTML中也有一些工具可以让你自己定义空格。'

                }, {
                    date: '2017-05-03',
                    position: 'vue与webpack初步2',
                    type1: '我向',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee1',
                    type2: '提问',
                    content: '插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2018-05-03',
                    position: 'vue与webpack初步3',
                    type1: '',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee2',
                    type2: '回答了我的问题',
                    content: '插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-05-03',
                    position: 'vue与webpack初步4',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee3',
                    type1: '',
                    type2: '向我提问',
                    content: '插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-09-03',
                    position: 'vue与webpack初步5',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: '系统信息',
                    content: '插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }, {
                    date: '2016-09-03',
                    position: 'vue与webpack初步6',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: '通知信息',
                    content: '插入一个非间断空格。一般来说，无论你按多少次空格键，HTML也只会在单词之间显示一个空白间隔。当你需要插入多个空格时，请输入&nbsp;或&#160;代码。[1] 它们名为“空格占位符”，你输入几个，就能在页面中显示几个空格。\n' +
                    '之所以称之为非间断空格，是因为这样不会产生换行符。如果你滥用这种空格，浏览器可能无法以整齐易读的方式插入换行符'
                }
            ], [
                {value: '所有信息'},
                {value: '我的问题'},
                {value: '我的回答'},
                {value: '我的解答'},
                {value: '向我提问'},
                {value: '给我点赞'},
                {value: '系统信息'},
                {value: '通知信息'}
            ],);
        },
        data() {
            return {
                //副标题
                subTitle: '全部信息'
            }
        },

        methods: {
            /**
             * 消息类型的选择
             * @param value
             */
            handleTypeChange(value) {
                //todo 根据信息类型去查找对应的数据
//                switch (value){
//                    case '所有信息':{
//                        this.tableData = this.pageData=this.$ajax.get();
//                        break;
//                    }
//                    case '我的问题':{
//                        this.tableData = this.pageData=this.$ajax.get();
//                        break;
//                    }
//                }
            }
        },
        mixins: [manageMixin]
    }
</script>

<style scoped lang="scss">
    @import './manageStyle.scss';
</style>

