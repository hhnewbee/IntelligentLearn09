<template>
    <div class="courseHeader">
        <div class="title">
            <div class="title1">
                {{title1}}
            </div>
            <div class="title2">
                {{title2}}
            </div>
        </div>
        <div class="detail">
            <span class="fa fa-heart"></span>
            <span class="fa fa-user"></span>
            <span class="fa fa-television"></span>
        </div>
        <div class="info">
            <info></info>
        </div>
    </div>
</template>

<script>
import info from '../header/info.vue';
export default {
    data(){
        return{
            title1:'',
            title2:'',
            likes:'',
            users:'',
            onlines:'',
        }
    },
    components:{
        info
    }
}
</script>

<style scoped lang="scss">
    .courseHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title1{

            }
        }
    }
</style>

