<template>
    <div class="downLoad">
        <div class="header">
            <div class="info name">文件</div>
            <div class="info size">大小</div>
            <div class="info date">时间</div>
        </div>
        <div
                v-for="info in fileData"
                class="item">
            <div class="info name fa fa-file">&nbsp&nbsp{{info.file}}</div>
            <div class="info size">{{info.size}}</div>
            <div class="info date">{{info.date}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileData: [{
                    date: '2016-05-02',
                    file: '全部视频',
                    size: '100mb'
                }, {
                    date: '2016-05-04',
                    file: '全部视频',
                    size: '100mb'
                }, {
                    date: '2016-05-01',
                    file: '全部视频',
                    size: '100mb'
                }, {
                    date: '2016-05-03',
                    file: '全部视频',
                    size: '100mb'
                }]
            }
        }
    }
</script>

<style scoped lang="scss">
    .downLoad {
        padding: 10px;
        .header, .item {
            font-size: 15px;
            padding: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #2d3742;
        }
        .info {

        }
    }
</style>

