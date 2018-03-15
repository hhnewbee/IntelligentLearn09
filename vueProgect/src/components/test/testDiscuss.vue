<template>
    <div class="test">
        <discuss1 :discussInfo="discussInfo1"></discuss1>
        <discuss2 :discussInfo="discussInfo2"></discuss2>
    </div>
</template>

<script>
    import discuss1 from '../article/discuss.vue';
    import discuss2 from '../article/discuss.vue';
    import config from '../../config/config';
    export default {
        data(){
            return{
                discussInfo1:{
                    theme:'vue与webpack的学习',
                    nickName:'newbee',
                    avatarUrl:config.avatarUrl},
                discussInfo2:{
                    theme:'vue与webpack的学习',
                    nickName:'lscs',
                    avatarUrl:config.avatarUrl}
            }
        },
        components:{
            discuss1,
            discuss2
        }
    }
</script>

<style>

</style>

