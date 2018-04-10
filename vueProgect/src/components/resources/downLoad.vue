<template>
    <div class="downLoad">
        <div class="header">
            <div class=" name">文件</div>
            <div class=" size">大小</div>
            <div class=" date">时间</div>
        </div>
        <div v-for="info in fileData"
             @click="handleDownload(info.url)"
             title="下载"
             class="item">
            <div class="fa fa-file" :title="info.file">&nbsp;{{info.file}}</div>
            <div>{{info.size}}M</div>
            <div>{{info.date}}</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        activated(){
            this.setSourcesFormat();
        },
        data() {
            return {
                fileData: []
            }
        },
        computed:{
            ...mapState('course',['sources']),
        },
        methods:{
            /**
             * 设置资源格式
             */
            setSourcesFormat(){
                this.fileData=this.sources.map((ss)=>{
                    return {
                        date:this.$formatDate(ss.creationTimestamp),
                        file:ss.title,
                        size:Math.ceil(ss.size/1024/1024),
                        url:ss.path
                    }
                })
            },
            /**
             * 资源下载
             */
            handleDownload(url){
                let a = document.createElement('a');
                a.href = url;
                a.download;
                a.click();
            }
        }
    }
</script>

<style scoped lang="scss">
    .downLoad {
        padding: 10px;
        .header, .item {
            font-size: 15px;
            padding: 10px 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #1c2329;
        }
        .item{
            padding: 20px 10px;
            font-size: 13px;
            div:nth-child(1){
                max-width: 6em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            &:hover{
                cursor: pointer;
                background-color: #1c2329;
            }
        }
    }
</style>

