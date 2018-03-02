<template>
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
                <img :src="scope.row.avatar"
                     style="width: 35px;height: 35px;border-radius: 50%;margin-right: 10px">
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
    export default {
        data(){
            return{
                //表格类型
                tableOptions_:{title1:'后台管理',title2:'用户管理',tableType:'usersManage'},
                //当前页数的数据
                pageData:[],
            }
        }
    }
</script>

<style>

</style>

