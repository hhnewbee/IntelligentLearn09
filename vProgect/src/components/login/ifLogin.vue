<template></template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'
export default {
    created() {
        //判断用户是否登录
        let account = localStorage["ifLogin"];
        if (account) {
            this.setAccount(account);
            //跳转到主页
            this.$router.push({path:'/main/recommend' });
        }else{
            this.$router.push({name:'login' });
        }
    },
    computed: {
        //判断是否进入登录界面
        ...mapState('info', [
            'account'
        ]),
    },
    methods: {
        ...mapMutations('info', [
            'setAccount',
        ]),
    },
}
</script>

