<template>
    <div class="highchart">
        <span class="notData" v-if="notData">暂无数据</span>
        <div id="highcharts-container"></div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highcharts';

    export default {
        props: ["chartData","chartOptions"],
        name: 'highcharts',
        data() {
            return {
                chart: null,
                notData: false,
                options: {
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null,
                    },
                    xAxis: [{
                        categories: [],
                        style: {
                            color: 'red'
                        },
                        labels: {
                            autoRotation: false
                        },
                        crosshair: true
                    }],
                    yAxis: [
                        { // Primary yAxis
                            labels: {
                                format: '{value}',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '访问次数 (次)',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }, { // Secondary yAxis
                            title: {
                                text: '学习时间',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            labels: {
                                format: '{value} m',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            opposite: true
                        }],
                    tooltip: {
                        shared: true,
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                    },
                    series: [
                        {
                            name: '学习时间',
                            type: 'column',
                            yAxis: 1,
                            data: [],
                            maxPointWidth: 35,
                            tooltip: {
                                valueSuffix: '分钟'
                            }
                        }, {
                            name: '访问次数',
                            type: 'spline',
                            data: [],
                            tooltip: {
                                valueSuffix: '次'
                            }
                        }]
                }
            }
        },
        mounted() {
            //初始化图表
            this.initChart();
        },
        methods: {
            /**
             * 传进来新的数据并且生成新的图表
             */
            initChart() {
                //课程名称
                this.options.xAxis[0].categories = this.chartData[0];
                //学习时间
                this.options.series[0].data = this.chartData[1];
                //访问次数
                this.options.series[1].data = this.chartData[2];
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
    .highchart {
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

