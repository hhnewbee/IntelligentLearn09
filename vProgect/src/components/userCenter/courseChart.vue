<template>
    <div class="coursechart">
        <span class="notData" v-if="notData">暂无数据</span>
        <div id="highcharts-container"></div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highcharts';
    export default {
        mounted() {
            //初始化图表
            this.initChart();
        },
        props: ["chartData"],
        data() {
            return {
                chart: null,
                notData: false,
                options: {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        categories: [
                            '一月',
                            '二月',
                            '三月',
                            '四月',
                            '五月',
                            '六月',
                            '七月',
                            '八月',
                            '九月',
                            '十月',
                            '十一月',
                            '十二月'
                        ],
                        labels: {
                            autoRotation: false
                        },
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '个/次数'
                        },
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                    },
                    tooltip: {
                        shared: true,
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        },
                        series: {
                            maxPointWidth: 35,
                        }
                    },
                    series: [
                        {
                            name: '观看数',
                            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                        }, {
                            name: '点赞数',
                            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                        }, {
                            name: '收藏数',
                            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                        }, {
                            name: '问题数',
                            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                        }]
                }
            }
        },
        methods:{
            initChart() {
                //显示暂无数据
                this.notData = !(this.chartData[1].length || this.chartData[2].length);
                //生成图表
                this.chart = new Highcharts.Chart("highcharts-container", this.options);
            }
        },
        watch: {
            //监控数据的变化以随时生成新的图表
            chartData() {
                this.initChart();
            }
        }
    }
</script>

<style scoped lang="scss">
    .coursechart{
        height: 100%;
        width: 100%;
        position: relative;
        .highcharts-container {
            height: 100%;
            width: 100%;
        }
        .notData {
            position: absolute;
            font-size: 18px;
            z-index: 10000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
        }
    }
</style>

