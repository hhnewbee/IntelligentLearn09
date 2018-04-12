<template>
    <el-tabs
            style="margin-top: 20px"
            v-model="tab"
            @tab-click="handleTabClick"
            tab-position="right">
        <el-tab-pane
                v-for="header in headers"
                :key="header.label"
                :name="header.id"
                :label="header.label">
        </el-tab-pane>
        <div v-if="headers.length===0" style="color: #8a8a8a">
            该文章无目录
        </div>
    </el-tabs>
</template>

<script>
    export default {
        props:['headers'],
        data(){
          return{
              //选项的保存值
              tab:"1h"
          }
        },
        methods:{
            /**
             * 目录选择
             * @param tar
             */
            handleTabClick(tar){
                //目录位置滚动
                document.getElementById(tar.name).scrollIntoView({block: "start",behavior: "smooth"});
            }
        }
    }
</script>

<style lang="scss">
    .el-tabs--left, .el-tabs--right{
        display: flex;
        justify-content: center;
    }
</style>

