<template>
    <div style="height: 100%">
        <comments :commentsInfo="commentsInfo"></comments>
    </div>
</template>

<script>
import comments from '../article/comments.vue';
import config from '../../config.js';
export default {
    data(){
        return{
            commentsInfo:{
                nickName:'newbee',
                avatarUrl:config.avatarUrl,
                targetId:'123',
                tag:'普通用户'
            }
        }
    },
    components:{
        comments
    }
}
</script>

<style>

</style>

