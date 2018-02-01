<template>
    <div class="chapter">
        <div class="title">
            {{chapters.title}}
        </div>
        <div class="intro">
            简介:{{chapters.intro}}
        </div>
        <div class="t1" v-for="(item1,index1) in chapters.chapter" :key="index1">
            <div class="t11">{{item1.t1}}</div>
            <div class="t2 fa fa-play" v-for="(item2,index2) in item1.t2" :key="index2">
                {{item2}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['chapters']
    }
</script>

<style scoped lang="scss">
    .chapter{
        .title{
            padding: 10px;
            color: #b5b9bc;
            font-size: 18px;
            font-weight: bold;
        }
        .intro{
            padding: 0 10px;
            font-size: 14px;
        }
        .t1{
            padding: 10px;
            .t11{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 16px;
            }
            .t2{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 15px;
                cursor: pointer;
                margin-left: 25px;
                margin-top: 15px;
                &:hover{
                    color: rgba(0,171,249,0.87);
                }
            }
        }
    }
</style>

