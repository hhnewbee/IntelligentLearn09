<template>
    <keep-alive><router-view></router-view></keep-alive>
</template>

<script>
    /*
    * 如果是登录过了，服务器返回对应账号生成的字符序列，作为下次不用登录的依据
    * */
    import {mapMutations} from 'vuex'
    export default {
        created() {
            this.initVuex();
        },
        methods: {
            ...mapMutations('info', [
                'setAccountHashMap',
                'setAccount',
                'setAvatarUrl',
                'setAreaFocus'
            ]),
            /**
             * 初始化vuex的数据
             */
            initVuex() {
                //判断用户是否登录
                let accountHashMap = localStorage["ifLogin"];
                if (accountHashMap) {
                    //初始化vuex的数据(用户基本信息)
                    this.$ajaxJava.post('login', {accountHashMap}).then((res) => {
                        localStorage["ifLogin"]=res.data.accountHashMap;
                        this.setAccountHashMap(res.data.accountHashMap);
                        this.setAccount(res.data.account);
                        this.setAvatarUrl(res.data.avatarUrl);
                        this.setAreaFocus(res.data.areaFocus);
                    });
                } else {
                    this.$router.push({name: 'login'});
                }
            }
        }
    }
</script>

