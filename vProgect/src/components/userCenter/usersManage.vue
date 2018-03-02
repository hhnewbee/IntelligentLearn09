<template>
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
                label="开通时间"
                width="100">
        </el-table-column>

        <el-table-column
                align='center'
                prop="account"
                label="账号"
                min-width="200">
        </el-table-column>

        <el-table-column
                align='center'
                prop="name"
                label="姓名"
                width="200">
        </el-table-column>

        <el-table-column
                align='center'
                prop="areaFocus"
                label="专注领域"
                width="130">
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
</template>

<script>
    import {tableBasicMixin} from './userCenterMixin.js';
    export default {
        created(){
            this.initData();
        },
        data(){
            return{
                //表格类型
                tableOptions_:{title1:'后台管理',title2:'用户管理',tableType:'usersManage'},
                //当前页数的数据
                pageData:[],
            }
        },
        mixins: [tableBasicMixin]
    }
</script>

<style>

</style>

