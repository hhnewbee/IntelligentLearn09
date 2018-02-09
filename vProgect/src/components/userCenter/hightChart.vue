<template>
    <div class="highcharts-container"></div>
</template>

<script>
    import Highcharts from 'highcharts/highcharts';
    export default {
        props: [],
        name: 'highcharts',
        data() {
            return {
                chart: null,
                options:{
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '',
                    },
                    xAxis: [{
                        categories: [
                            'vue与webpack的学习1',
                            'vue与webpack的学习2',
                            'vue与webpack的学习3',
                            'vue与webpack的学习4',
                            'vue与webpack的学习5',
                            'vue与webpack的学习6'
                        ],
                        style: {
                            color: 'red'
                        },
                        labels: {
                            autoRotation: false
                        },
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
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
                        data: [49, 71, 106, 129, 144, 176],
                        maxPointWidth: 35,
                        tooltip: {
                            valueSuffix: '分钟'
                        }
                    }, {
                        name: '访问次数',
                        type: 'spline',
                        data: [7, 6, 10, 14, 18, 21],
                        tooltip: {
                            valueSuffix: '次'
                        }
                    }]
                }
            }
        },
        mounted() {
            this.initChart();
        },
        methods: {
            initChart() {
                this.chart = new Highcharts.Chart(this.$el, this.options);
            }
        }
    }
</script>

<style scoped lang="scss">
    .highcharts-container{
        height: 100%;
        width: 100%;
    }
</style>

