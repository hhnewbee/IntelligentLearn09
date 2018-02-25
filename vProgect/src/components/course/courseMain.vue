<template>
    <div class="courseMain">
        <courseheader class="header"></courseheader>
        <course-center class="center"></course-center>
    </div>
</template>

<script>
    import courseheader from './courseHeader.vue';
    import courseCenter from './courseCenter.vue';
    export default {
        created(){
            //TODO 获取数据
//        this.$ajax.get('').then((response)=>{
//            this.info=response.data;
//        })
        },
        data(){
            return{

            }
        },
        components:{
            courseheader,
            courseCenter,
        }
    }
</script>

<style scoped lang="scss">
    .courseMain{
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #14191e;
        color: #b5b9bc;
        .header{
            padding: 20px 0;
        }
        .center{
            flex-grow: 1;
            height: 100%;
        }
    }
</style>

