<template>
    <el-tabs
            v-model="tab"
            @tab-click="handleTabClick"
            tab-position="right">
        <el-tab-pane
                v-for="header in headers"
                :key="header.label"
                :name="header.id"
                :label="header.label">
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        props:['headers'],
        data(){
          return{
              tab:"1h"
          }
        },
        methods:{
            /**
             * 目录选择
             * @param id
             */
            handleTabClick(tar){
                //目录位置滚动
                document.getElementById(tar.name).scrollIntoView({block: "start",behavior: "smooth"});
            }
        }
    }
</script>

<style>

</style>

