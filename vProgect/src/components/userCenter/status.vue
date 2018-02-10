<template>
    <div class="status">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item class="el-icon-document"> 我的学习</el-breadcrumb-item>
            <el-breadcrumb-item>
                <span>学习状态</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-select
                @change="handleChartChange"
                style="width: 125px;position: absolute;right: 40px;z-index: 100"
                v-model="selectValue"
                placeholder="请选择">
            <el-option
                    v-for="item in changeOptions"
                    :key="item.value"
                    :value="item.value">
            </el-option>
        </el-select>
        <hightChart style="padding: 40px;box-sizing: border-box" :chartData="chartData"></hightChart>
    </div>
</template>

<script>
    import hightChart from './hightChart.vue'

    export default {
        created(){
            //todo ajax初始化数据
            this.chartData[0]= ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            this.chartData[1]= [132,213,133,111,423,33,12];
            this.chartData[2]=[12,13,13,31,43,33,22];
        },
        data() {
            return {
                selectValue:'以天为单位',
                //改变图表的x轴参数
                changeOptions: [
                    {value: '最近一周'},
                    {value: '最近一月'},
                    {value: '最近一年'}
                ],
                //图表数据
                chartData:[[],[],[]]
            }
        },
        methods: {
            /**
             * 图表单位切换
             * @param value
             */
            handleChartChange(value) {
                if (value === '以天为单位') {
                    this.chartData.splice(0,1,['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
                }else if(value ==='以周为单位'){
                    this.chartData.splice(0,1,['第一周', '第二周', '第三周', '第四周']);
                    this.chartData.splice(1,1,[132,213,133,111]);
                    this.chartData.splice(2,1,[12,13,13,31]);
                }else{
                    this.chartData.splice(0,1,['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']);
                    this.chartData.splice(1,1,[132,213,133,111,11,212,11,12,11,121,112,22]);
                    this.chartData.splice(2,1,[12,13,13,31,21,12,21,22,32,33,35,12]);
                }
            }
        },
        components: {
            hightChart
        }
    }
</script>

<style scoped lang="scss">
    .status{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
</style>

