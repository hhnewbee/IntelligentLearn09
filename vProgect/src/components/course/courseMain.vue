<template>
    <div class="courseMain">
        <courseheader class="header"></courseheader>
        <course-center class="center"></course-center>
        <footer_></footer_>
    </div>
</template>

<script>
    import courseheader from './courseHeader.vue';
    import courseCenter from './courseCenter.vue';
    import footer_ from '../footer/footer.vue';
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
            footer_
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
            padding: 10px 40px;
        }
        .center{
            flex-grow: 1;
            height: 100%;
        }
    }
</style>

