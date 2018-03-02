<template></template>
<script>
    /*
    * 如果是登录过了，服务器返回对应账号生成的字符序列，作为下次不用登录的依据
    * */
    import {mapMutations} from 'vuex'
export default {
    created() {
        //判断用户是否登录
        let accountHashMap = localStorage["ifLogin"];
        if (accountHashMap) {
            this.setAccountHashMap(accountHashMap);
            //跳转到主页
            this.$router.push({path:'/main/recommend' });
        }else{
            this.$router.push({name:'login' });
        }
    },
    methods: {
        ...mapMutations('info', [
            'setAccountHashMap',
        ]),
    },
}
</script>

