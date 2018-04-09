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
                        categories: [],
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
                            data: []
                        }, {
                            name: '点赞数',
                            data: []
                        }, {
                            name: '收藏数',
                            data: []
                        }, {
                            name: '问题数',
                            data: []
                        }]
                }
            }
        },
        methods:{
            initChart() {
                //课程名称
                this.options.xAxis.categories = this.chartData[0];
                //观看数
                this.options.series[0].data = this.chartData[1];
                //点赞数
                this.options.series[1].data = this.chartData[2];
                //收藏数
                this.options.series[2].data = this.chartData[3];
                //问题数
                this.options.series[3].data = this.chartData[4];
                //显示暂无数据
                this.notData = !(this.chartData[0].length);
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

