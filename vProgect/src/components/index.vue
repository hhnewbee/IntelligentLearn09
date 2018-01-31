<template>
    <div class="index">
        <el-container
                v-if="ifLogin">
            <header_></header_>
            <el-main class="elmain">
                <router-view class="main"></router-view>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-container
                class="login"
                v-if="!ifLogin">
            <login></login>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        created() {
            //判断用户是否登录
            let account = localStorage["ifLogin"];
            if (account) {
                this.ifLogin = true;
                this.setAccount(account);
                //跳转到主页
                this.$router.addRoutes([{path:'/',redirect:{name:'main'}}]);
                this.$router.push({ name: 'main' });
            }
        },
        data() {
            return {
                ifLogin: false,
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
        components: {
            header_: () => import(/* webpackChunkName: "header.vue" */ './header/header.vue'),
            login: () => import(/* webpackChunkName: "login.vue" */ './login/login.vue')
        }
    }
</script>

<style scoped lang="scss">
    .index {
        height: 100%;
        .elmain{
            margin-top: 70px
        }
        .login {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>

