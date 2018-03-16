<template>
    <div>
        <div>测试代码</div>
        <p v-for="a in maps">a</p>
        <p>{{maps}}</p>
        <p v-for="b in maps_">{{b}}</p>
        <p v-for="b in mapsC">{{b}}</p>
        <el-button @click="maps_.b='newAttributeB'"></el-button>
        <el-button @click="maps_.a='newAttributeA'"></el-button>
        <el-button @click="mapsC.c='newAttributeC'"></el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                maps:new Map([['a','1'],['b','2'],['b','3']]),
                maps_:{a:'oldAttribute'},
                mapsC:{c:'oldAttributeC'}
            }
        }
    }
</script>

<style>

</style>

