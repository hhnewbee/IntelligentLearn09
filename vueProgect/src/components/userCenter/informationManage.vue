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
                    ref="table"
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
                    <div slot-scope="scope"
                         style="display: flex;align-items: center;">
                        <div v-if="scope.row.type.content==='我回复了'" style="display: flex">
                            {{scope.row.type.content}}&nbsp;
                            <info-detail :account="scope.row.type.account"
                                         :avatarUrl="scope.row.type.avatarUrl"
                                         :size="30">
                            </info-detail>
                        </div>
                        <div v-else-if="scope.row.type.content==='回复了我'">
                            <info-detail :account="scope.row.type.account"
                                         :avatarUrl="scope.row.type.avatarUrl"
                                         :size="25">
                            </info-detail>&nbsp;
                            {{scope.row.type.content}}
                        </div>
                        <div v-else>
                            {{scope.row.type}}
                        </div>
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
                                @click="handleSee('message',scope)"
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
    import {mapState} from 'vuex';
    import infoDetail from './infoDetail.vue';
    export default {
        mounted() {
            this.initData([
                {value: '所有信息'},
                {value: '我发布的'},
                {value: '回复我的'},
                {value: '给我点赞'},
                {value: '系统信息'},
            ],);
        },
        data() {
            return {
                //副标题
                subTitle: '全部信息',
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
            },
            /**
             * 设置获取数据的格式
             */
            setDataFormat(resDatas) {
                return resDatas.messages.map((resdata)=>{
                    return {
                        date:this.$formatDate(resdata.creationTimestamp),
                        content:resdata.content,
                        type:(()=>{
                            //判断信息的类型
                            switch(resdata.type){
                                case 'reply':{
                                    //判断是谁回谁
                                    if(this.account===resdata.from.account){
                                        return {
                                            content:'我回复了',
                                            account:resdata.to.account,
                                            avatarUrl:resdata.to.selfInformation.imgPath
                                        };
                                    }else{

                                        return {
                                            account:resdata.from.account,
                                            avatarUrl:resdata.from.selfInformation.imgPath,
                                            content:'回复了我'
                                        };
                                    }
                                }
                                case 'comment':{
                                    return '发表';
                                }
                                case 'system':{
                                    return '系统信息';
                                }
                            }
                        })()
                    }
                });
            }
        },
        computed: {
            ...mapState('info',['account']),
            url() {
                return `user/messages/page=${this.page - 1}/size=${this.itemCount}`;
            },
            urlSearch() {
                return `user/messages/page=${this.pageSearch - 1}/size=${this.itemCount}`;
            }
        },
        components:{
            infoDetail
        },
        watch:{
             listNow() {
                 if (this.ifSearch) {
                     this.tableData = this.setDataFormat(this.listNow);
                 } else {
                     this.pageData = this.tableData = this.setDataFormat(this.listNow);
                 }
             }
        },
        mixins: [manageMixin]
    }
</script>

<style lang="scss">
    @import './manageStyle.scss';
    .el-tooltip__popper{
        max-width: 30%;
        line-height: 1.5em;
    }
</style>

