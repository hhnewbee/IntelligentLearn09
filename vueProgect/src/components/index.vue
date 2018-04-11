<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
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
                'setAccount',
                'setAvatarUrl',
                'setAreaFocus',
                'setLimit'
            ]),
            /**
             * 初始化vuex的数据
             */
            initVuex() {
                //用户是否登录过的凭证
                let accountHashMap = localStorage["ifLogin"];
                //用户是否登录过
                if (accountHashMap) {
                    //是刷新还是第一次打开页面
                    if (!window.name) {
                        window.name = 'flash';
                        //初始化vuex的数据(用户基本信息)
                        this.$ajaxJava.post('login', {accountHashMap}).then((res) => {
                            localStorage["ifLogin"] = res.data.accountHashMap;
                            this.setAccount(res.data.account);
                            this.setAvatarUrl(res.data.avatarUrl);
                            this.setAreaFocus(res.data.areaFocus);
                        });
                    } else {
                        //如果是刷新，直接再次请求用户信息数据即可
                        this.$ajaxJava.get('user').then((res) => {
                            this.setAccount(res.data.user.account);
                            this.setAvatarUrl(res.data.user.selfInformation.imgPath);
                            this.setAreaFocus(res.data.user.selfInformation.position);
                        });
                    }
                } else {
                    this.$router.push({name: 'login'});
                }
            }
        }
    }
</script>

